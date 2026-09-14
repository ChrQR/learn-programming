/**
 * Build and publish the Learn Programming site.
 *
 * The site is prerendered to static files with bun, packed into an unprivileged
 * nginx image (port 8080), and pushed to the Zot registry at registry.rannes.dev.
 *
 * Everything runs on the Dagger engine in the cluster (see scripts/publish.sh).
 * The registry credential is the Kubernetes secret `zot-push` (a Docker config
 * JSON) in the `dagger` namespace, handed to `publish` as a Dagger secret:
 *
 *   dagger call publish \
 *     --docker-config="cmd://kubectl get secret zot-push -n dagger -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d"
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
const NGINX_IMAGE = 'nginxinc/nginx-unprivileged:alpine';
const PORT = 8080;
const DEFAULT_REGISTRY = 'registry.rannes.dev';
const DEFAULT_IMAGE = 'learn-programming';

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

	/** Build the prerendered static site (the contents of build/). */
	@func()
	build(): Directory {
		return this.workspace().withExec(['bun', 'run', 'build']).directory('/app/build');
	}

	/** The runnable image: unprivileged nginx serving the static site on port 8080. */
	@func()
	container(): Container {
		return dag
			.container()
			.from(NGINX_IMAGE)
			.withFile('/etc/nginx/conf.d/default.conf', this.source.file('docker/nginx.conf'))
			.withDirectory('/usr/share/nginx/html', this.build())
			.withExposedPort(PORT);
	}

	/**
	 * Serve the site for a preview (port-forwarded from the engine):
	 *   dagger call serve up --ports=8080:8080
	 */
	@func()
	serve(): Service {
		return this.container().asService({ useEntrypoint: true });
	}

	/**
	 * Build the image and push it, authenticating with a Docker config JSON
	 * (the same format as ~/.docker/config.json and kubernetes.io/dockerconfigjson secrets).
	 * Returns the pushed references with their digests.
	 *
	 * @param dockerConfig The Docker config JSON as a secret, e.g. cmd://kubectl get secret zot-push -n dagger -o jsonpath='{.data.\.dockerconfigjson}' | base64 -d
	 * @param registry Registry host; must have an entry in the Docker config.
	 * @param image Image name inside the registry.
	 * @param tags Tags to push, e.g. --tags=latest,abc123
	 */
	@func()
	async publish(
		dockerConfig: Secret,
		registry = DEFAULT_REGISTRY,
		image = DEFAULT_IMAGE,
		tags: string[] = ['latest']
	): Promise<string> {
		const { username, password } = await registryCredentials(dockerConfig, registry);
		return this.publishWithCredentials(username, password, registry, image, tags);
	}

	/**
	 * Build the image and push it with an explicit user name and password.
	 * Returns the pushed references with their digests.
	 *
	 * @param username Registry user name.
	 * @param password Registry password or API key, e.g. op://Private/Zot push secret/credential
	 * @param registry Registry host.
	 * @param image Image name inside the registry.
	 * @param tags Tags to push, e.g. --tags=latest,abc123
	 */
	@func()
	async publishWithCredentials(
		username: string,
		password: Secret,
		registry = DEFAULT_REGISTRY,
		image = DEFAULT_IMAGE,
		tags: string[] = ['latest']
	): Promise<string> {
		const container = this.container().withRegistryAuth(registry, username, password);
		const refs: string[] = [];
		for (const tag of tags) {
			refs.push(await container.publish(`${registry}/${image}:${tag}`));
		}
		return refs.join('\n');
	}
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
