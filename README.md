# Learn Programming · Coding Pirates

A slide-deck style website that introduces programming with Python to kids aged 11–14.
Built with SvelteKit 2, Svelte 5 and Tailwind 4. Python runs **in the browser** via
[Pyodide](https://pyodide.org) (loaded from the jsDelivr CDN), so every lesson has code the
learners can edit, run and get checked, without anything installed.

## Sections

| Route             | What it is                                                                              |
| ----------------- | --------------------------------------------------------------------------------------- |
| `/`               | Intro: what the course is, what we learn, language options afterwards                   |
| `/setup`          | Dev environment: GitHub account, git + gh login, Zed, uv, ruff + ty, Zed config         |
| `/project`        | Creating the `learn-python` project used throughout the course                          |
| `/lessons`        | Index of the seven lessons                                                              |
| `/lessons/<slug>` | Variables, constants, types, operators & decisions, loops, functions, project structure |

The whole site exists in **English and Danish**; the switch in the header is remembered in
localStorage and defaults to the browser language. Every page is a `Deck` of `Slide`s. Navigate with `←` `→`, `Space`, `Home`/`End`, or the buttons.
The current slide is kept in the URL hash (`/setup#4`), so slides can be linked to directly.
Pressing `→` on the last slide jumps to the next section.

## Developing

```sh
bun install
bun run dev -- --open
```

Other scripts: `bun run check` (svelte-check), `bun run lint`, `bun run format`, `bun run build`.
All routes are prerendered (`src/routes/+layout.ts`) with `adapter-static`, so `build/` is a plain
static site.

## Deploying

Building and publishing is a [Dagger](https://dagger.io) module in `dagger/` (TypeScript). It
prerenders the site with bun, packs it into an unprivileged nginx image listening on port **8080**
(non-root, so it works on a cluster with a restricted security context), and pushes it to the Zot
registry at `registry.rannes.dev`.

Nothing runs on a local engine: the CLI is pointed at the Dagger engine pod in the cluster, and the
registry credential is the existing Kubernetes secret `zot-push` (a Docker config JSON) in the
`dagger` namespace. The one-liner that does all of that:

```sh
scripts/publish.sh                 # pushes :latest and :<git short sha>
scripts/publish.sh --tags=v1.2     # override the tags
```

It finds the engine pod, sets `_EXPERIMENTAL_DAGGER_RUNNER_HOST` (the same thing the
`dagger-connect` shell function does), reads the secret with `kubectl` through Dagger's `cmd://`
secret provider, and calls `publish`. The credential goes from `kubectl` to the Dagger CLI to the
engine as a secret; it is never printed or written to disk. The module unpacks the user name and
password for the registry from the Docker config and uses them for the push.

Other useful calls after `dagger-connect`:

```sh
dagger functions                       # list what the module can do
dagger call check                      # prettier + eslint + svelte-check
dagger call serve up --ports=8080:8080 # preview the image (port-forwarded from the cluster)
dagger call publish-with-credentials \
  --username=<user> --password="op://Private/Zot push secret/credential"   # explicit creds
```

The nginx config lives in `docker/nginx.conf`. The image is fully static; the only runtime network
dependency is Pyodide, which the browser loads from the jsDelivr CDN (see
`src/lib/py/pyodide.worker.ts`), so the kids need internet but the server does not.

## Project layout

```
src/
├── lib/
│   ├── deck/            Deck.svelte, Slide.svelte, Code.svelte, OsTabs.svelte (+ os.svelte.ts)
│   ├── py/              In-browser Python: pyodide.worker.ts, runtime.svelte.ts, PyRunner.svelte
│   └── nav.ts           Section links and the lesson list (add new lessons here)
├── routes/
    ├── +page.svelte     Intro deck
    ├── setup/           Setup deck
    ├── project/         First-project deck
    └── lessons/         Lesson index + one folder per lesson
dagger/src/index.ts      Dagger module: check, build, container, serve, publish
scripts/publish.sh       Build on the cluster engine and push using the zot-push secret
docker/nginx.conf        nginx config used inside the image
```

### Writing a lesson

A lesson is a `Deck` with a few `Slide`s. Short strings use `t('English', 'Dansk')`, slide bodies
are given as an `en` and a `da` snippet, and code samples are `{ en, da }` objects picked with `L()`:

```svelte
<Slide kicker={t('Lesson 1', 'Lektion 1')} title={t('Variables', 'Variabler')}>
	{#snippet en()}<p>…</p>
		<PyRunner id="x" code={L(example)} />{/snippet}
	{#snippet da()}<p>…</p>
		<PyRunner id="x" code={L(example)} />{/snippet}
</Slide>
```

Runnable code uses `PyRunner`:

```svelte
<PyRunner
  id="loops-exercise"        <!-- unique; learner edits are saved in localStorage under it -->
  code={starter}             <!-- starter code -->
  check={checkCode}          <!-- optional Python run afterwards; use assert with a friendly message -->
  expected="..."             <!-- optional alternative: exact expected output -->
  files={{ 'pkg/mod.py': src }}  <!-- optional read-only extra files next to main.py -->
  hint="..."
/>
```

Inside `check`, the learner's variables and functions are available directly, `__output__` holds
everything they printed, and `__source__` holds their code. The first failing `assert` message is
shown to the learner as "Not yet: …".

`input()` is disabled in the browser runtime (it points learners to Zed instead), and the
**Stop** button terminates the worker, so infinite loops are safe to demonstrate.

### Notes

- The Python version comes from the Pyodide release pinned in `src/lib/py/pyodide.worker.ts`.
- The tool instructions in `/setup` were checked against the official docs of Zed, uv, ruff, ty and
  the GitHub CLI in September 2026. Re-check them before each course run.
