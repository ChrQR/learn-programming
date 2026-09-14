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
All routes are prerendered (`src/routes/+layout.ts`) and bundled by `adapter-node` into a
self-contained SvelteKit server in `build/` (run locally with `node build`).

## Deploying

Building and publishing is a [Dagger](https://dagger.io) module in `dagger/` (TypeScript). It
builds the SvelteKit Node server with bun, packs it into a Bun image that serves the app on port
**3000** as the non-root `bun` user, and pushes it to the Zot registry at `registry.rannes.dev`.
The container holds only the app; it is exposed via a NodePort and a separate Caddy proxy routes
traffic to it.

Nothing runs on a local engine: point the CLI at the engine pod in the cluster first
(`dagger-connect`). A Dagger secret can only be supplied from the CLI side, so the push key is
passed as a flag. With `ZOT_API_KEY` exported in your shell:

```sh
dagger-connect
dagger call publish --password=env://ZOT_API_KEY          # pushes :latest as christian@rannes.dev
bun run deploy                                            # same, plus a :<git short sha> tag
```

`env://` means the Dagger CLI reads the variable and hands it to the engine as a secret; it never
appears in logs or in the image. `bun run deploy` (`scripts/publish.sh`) also finds the engine pod
by itself, and falls back to the cluster's `zot-push` secret via `publish-with-docker-config` when
`ZOT_API_KEY` is not set. Other useful calls:

```sh
dagger functions                       # list what the module can do
dagger call check                      # prettier + eslint + svelte-check
dagger call serve up --ports=3000:3000 # preview the image (port-forwarded from the cluster)
```

The only runtime network dependency is Pyodide, which the browser loads from the jsDelivr CDN
(see `src/lib/py/pyodide.worker.ts`), so the kids need internet but the server does not.

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
scripts/publish.sh       `bun run deploy`: build on the cluster engine and push
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
