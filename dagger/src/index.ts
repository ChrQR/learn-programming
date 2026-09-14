/**
 * Build and publish the Learn Programming site.
 *
 * The site is built with bun into a self-contained SvelteKit Node server, packed
 * into a Bun image that serves it on port 3000, and pushed to the Zot registry at
 * registry.rannes.dev.
 *
 * Everything runs on the Dagger engine in the cluster (`dagger-connect` first).
 * A Dagger secret can only come from the CLI side, so the push key is passed as
 * a flag; with ZOT_API_KEY exported in your shell that is:
 *
 *   dagger call publish --password=env://ZOT_API_KEY
 *
 * (or `bun run deploy`, which also tags the image with the git short sha).
 */
import {
	dag,
	Container,
	Directory,
	Secret,
	Service,
	object,
	func,
	argument
} from '@dagger.io/dagger';

const BUN_IMAGE = 'oven/bun:1';
const RUNTIME_IMAGE = 'oven/bun:1-alpine';
const PORT = 3000;
const DEFAULT_REGISTRY = 'registry.rannes.dev';
const DEFAULT_IMAGE = 'learn-programming';
const DEFAULT_USERNAME = 'christian@rannes.dev';

@object()
export class LearnProgramming {
	source: Directory;

	constructor(
		/** The project directory (defaults to the repo root). */
		@argument({
			defaultPath: '/',
			ignore: ['node_modules', '.svelte-kit', 'build', '.git', '.claude', '.vscode', 'dagger']
		})
		source: Directory
	) {
		this.source = source;
	}

	/** A bun container with dependencies installed and the source mounted at /app. */
	private workspace(): Container {
		return dag
			.container()
			.from(BUN_IMAGE)
			.withWorkdir('/app')
			.withMountedCache('/root/.bun/install/cache', dag.cacheVolume('bun-install-cache'))
			.withFile('package.json', this.source.file('package.json'))
			.withFile('bun.lock', this.source.file('bun.lock'))
			.withExec(['bun', 'install', '--frozen-lockfile'])
			.withDirectory('/app', this.source);
	}

	/** Run the formatter check, eslint and svelte-check. Fails if any of them fail. */
	@func()
	async check(): Promise<string> {
		const ws = this.workspace();
		const lint = await ws.withExec(['bun', 'run', 'lint']).stdout();
		const check = await ws.withExec(['bun', 'run', 'check']).stdout();
		return `${lint}\n${check}`;
	}

	/** Build the SvelteKit Node server (the contents of build/: index.js + assets). */
	@func()
	build(): Directory {
		return this.workspace().withExec(['bun', 'run', 'build']).directory('/app/build');
	}

	/** The runnable image: the SvelteKit Node server on port 3000, as the non-root `bun` user. */
	@func()
	container(): Container {
		return dag
			.container()
			.from(RUNTIME_IMAGE)
			.withDirectory('/app', this.build())
			.withWorkdir('/app')
			.withEnvVariable('PORT', String(PORT))
			.withEnvVariable('HOST', '0.0.0.0')
			.withUser('bun')
			.withExposedPort(PORT)
			.withEntrypoint(['bun', './index.js']);
	}

	/**
	 * Serve the site for a preview (port-forwarded from the engine):
	 *   dagger call serve up --ports=3000:3000
	 */
	@func()
	serve(): Service {
		return this.container().asService({ useEntrypoint: true });
	}

	/**
	 * Build the image and push it. Returns the pushed references with their digests.
	 *
	 *   dagger call publish --password=env://ZOT_API_KEY
	 *
	 * @param password Registry password or API key, e.g. env://ZOT_API_KEY or op://Private/Zot push secret/credential
	 * @param username Registry user name.
	 * @param registry Registry host.
	 * @param image Image name inside the registry.
	 * @param tags Tags to push, e.g. --tags=latest,abc123
	 */
	@func()
	async publish(
		password: Secret,
		username = DEFAULT_USERNAME,
		registry = DEFAULT_REGISTRY,
		image = DEFAULT_IMAGE,
		tags: string[] = ['latest']
	): Promise<string> {
		return pushAll(
			this.container().withRegistryAuth(registry, username, password),
			registry,
			image,
			tags
		);
	}

	/**
	 * Same as publish, but authenticating with a Docker config JSON (the format of
	 * ~/.docker/config.json and kubernetes.io/dockerconfigjson secrets), for example
	 * the cluster's own `zot-push` secret:
	 *
	 *   dagger call publish-with-docker-config \
	 *     --docker-config="cmd://kubectl get secret zot-push -n dagger -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d"
	 *
	 * @param dockerConfig The Docker config JSON as a secret.
	 * @param registry Registry host; must have an entry in the Docker config.
	 * @param image Image name inside the registry.
	 * @param tags Tags to push, e.g. --tags=latest,abc123
	 */
	@func()
	async publishWithDockerConfig(
		dockerConfig: Secret,
		registry = DEFAULT_REGISTRY,
		image = DEFAULT_IMAGE,
		tags: string[] = ['latest']
	): Promise<string> {
		const { username, password } = await registryCredentials(dockerConfig, registry);
		return pushAll(
			this.container().withRegistryAuth(registry, username, password),
			registry,
			image,
			tags
		);
	}
}

async function pushAll(
	container: Container,
	registry: string,
	image: string,
	tags: string[]
): Promise<string> {
	const refs: string[] = [];
	for (const tag of tags) {
		refs.push(await container.publish(`${registry}/${image}:${tag}`));
	}
	return refs.join('\n');
}

/**
 * Pull the user name and password for one registry out of a Docker config JSON.
 * The password is re-wrapped as a Dagger secret so it is scrubbed from logs.
 */
async function registryCredentials(
	dockerConfig: Secret,
	registry: string
): Promise<{ username: string; password: Secret }> {
	type Auth = { username?: string; password?: string; auth?: string };
	const config = JSON.parse(await dockerConfig.plaintext()) as { auths?: Record<string, Auth> };
	const auths = config.auths ?? {};
	const entry =
		auths[registry] ??
		auths[`https://${registry}`] ??
		Object.entries(auths).find(([host]) => host.includes(registry))?.[1];
	if (!entry) {
		throw new Error(
			`Docker config has no entry for "${registry}" (found: ${Object.keys(auths).join(', ') || 'none'})`
		);
	}
	let username = entry.username;
	let password = entry.password;
	if ((!username || !password) && entry.auth) {
		const decoded = Buffer.from(entry.auth, 'base64').toString('utf8');
		const i = decoded.indexOf(':');
		username = username ?? decoded.slice(0, i);
		password = password ?? decoded.slice(i + 1);
	}
	if (!username || !password) {
		throw new Error(`Docker config entry for "${registry}" has no username/password`);
	}
	return { username, password: dag.setSecret(`registry-password-${registry}`, password) };
}
