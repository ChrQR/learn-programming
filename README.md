# Learn Programming · Coding Pirates

A slide-deck style website that introduces programming with Python to kids aged 11–14.
Built with SvelteKit 2, Svelte 5 and Tailwind 4. Python runs **in the browser** via
[Pyodide](https://pyodide.org) (loaded from the jsDelivr CDN), so every lesson has code the
learners can edit, run and get checked, without anything installed.

## Sections

| Route             | What it is                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `/`               | Intro: what the course is, what we learn, language options afterwards                           |
| `/setup`          | Dev environment: GitHub account, bun, clone + run these lessons, Zed, uv, ruff + ty, Zed config |
| `/project`        | Creating the `learn-python` project used throughout the course                                  |
| `/lessons`        | Index of the seven lessons                                                                      |
| `/lessons/<slug>` | Variables, constants, types, operators & decisions, loops, functions, project structure         |

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
All routes are prerendered (`src/routes/+layout.ts`), so the build output is a static site.

## Project layout

```
src/
├── lib/
│   ├── deck/            Deck.svelte, Slide.svelte, Code.svelte, OsTabs.svelte (+ os.svelte.ts)
│   ├── py/              In-browser Python: pyodide.worker.ts, runtime.svelte.ts, PyRunner.svelte
│   └── nav.ts           Section links and the lesson list (add new lessons here)
└── routes/
    ├── +page.svelte     Intro deck
    ├── setup/           Setup deck
    ├── project/         First-project deck
    └── lessons/         Lesson index + one folder per lesson
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

- `src/lib/config.ts` holds `REPO_URL`, the GitHub URL the kids clone in setup step 3. **Update it
  once this repo is pushed to GitHub.**

- The Python version comes from the Pyodide release pinned in `src/lib/py/pyodide.worker.ts`.
- The tool instructions in `/setup` were checked against the official docs of Zed, uv, ruff and ty
  in September 2026. Re-check them before each course run.
