<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { EditorState } from '@codemirror/state';
	import { keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { python } from '@codemirror/lang-python';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { run, stop, preload, runtime, isBusy } from './runtime.svelte';
	import Code from '$lib/deck/Code.svelte';
	import { t, L } from '$lib/i18n.svelte';

	let {
		id,
		code,
		check,
		expected,
		files,
		hint
	}: {
		/** Unique id, used to remember the learner's edits in localStorage. */
		id: string;
		/** Starter code. */
		code: string;
		/** Python that runs after the learner's code and uses `assert` to check it. */
		check?: string;
		/** Alternatively: the exact output we expect. */
		expected?: string;
		/** Extra read-only files placed next to main.py. */
		files?: Record<string, string>;
		hint?: string;
	} = $props();

	type Line = { kind: 'out' | 'err'; text: string };

	let host: HTMLDivElement;
	let view: EditorView | undefined;
	let lines = $state<Line[]>([]);
	let running = $state(false);
	let hasRun = $state(false);
	let verdict = $state<{ ok: boolean; msg: string } | undefined>();
	let activeFile = $state('main.py');

	const storageKey = $derived(`py:${id}`);
	const isExercise = $derived(Boolean(check || expected));
	const fileNames = $derived(['main.py', ...Object.keys(files ?? {})]);

	function load(): string {
		try {
			return localStorage.getItem(storageKey) ?? code;
		} catch {
			return code;
		}
	}
	function save(text: string) {
		try {
			if (text === code) localStorage.removeItem(storageKey);
			else localStorage.setItem(storageKey, text);
		} catch {
			/* storage unavailable */
		}
	}

	onMount(() => {
		preload();
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: load(),
				extensions: [
					basicSetup,
					keymap.of([indentWithTab, { key: 'Mod-Enter', run: () => (execute(), true) }]),
					python(),
					oneDark,
					EditorView.updateListener.of((u) => {
						if (u.docChanged) save(u.state.doc.toString());
					})
				]
			})
		});
		return () => view?.destroy();
	});

	function source() {
		return view?.state.doc.toString() ?? code;
	}

	async function execute() {
		if (running || isBusy()) return;
		running = true;
		hasRun = true;
		lines = [];
		verdict = undefined;
		activeFile = 'main.py';
		let out = '';
		const src = source();
		const result = await run(
			{ code: src, check, files },
			{
				onOut: (text) => {
					out += text;
					lines.push({ kind: 'out', text });
				},
				onErr: (text) => lines.push({ kind: 'err', text })
			}
		);
		running = false;
		if (result.stopped) return;
		if (!result.ok) {
			if (isExercise)
				verdict = {
					ok: false,
					msg: t(
						'The program crashed. Read the red text to find out why.',
						'Programmet gik ned. Læs den røde tekst for at finde ud af hvorfor.'
					)
				};
			return;
		}
		if (expected !== undefined) {
			const ok = out.trim() === expected.trim();
			verdict = ok
				? { ok, msg: '' }
				: {
						ok,
						msg: t(
							'The output is not quite what we expected. Compare it with the task.',
							'Udskriften er ikke helt, som vi forventede. Sammenlign den med opgaven.'
						)
					};
			if (!ok) return;
		}
		if (result.check) verdict = result.check;
	}

	function reset() {
		view?.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } });
		lines = [];
		verdict = undefined;
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(source());
		} catch {
			/* ignore */
		}
	}

	const statusText = $derived.by(() => {
		if (running) return t('Running…', 'Kører…');
		switch (runtime.status) {
			case 'loading':
				return (
					L(runtime.message) +
					t(' (the first time takes a little while)', ' (første gang tager det lidt tid)')
				);
			case 'error':
				return L(runtime.message);
			case 'ready':
			case 'running':
				return `Python ${runtime.pythonVersion} ${t('ready', 'klar')}`;
			default:
				return '';
		}
	});
</script>

<div class="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-3 text-base">
	<div class="flex flex-wrap items-center gap-2">
		<button
			class="rounded-lg bg-gold px-4 py-1.5 font-bold text-ink hover:bg-yellow-300 disabled:opacity-50"
			onclick={execute}
			disabled={running || runtime.status === 'error'}
			title={t('Run (Ctrl+Enter)', 'Kør (Ctrl+Enter)')}
		>
			▶ {t('Run', 'Kør')}
		</button>
		<button
			class="rounded-lg border border-line px-3 py-1.5 text-mist hover:border-red-400 hover:text-white disabled:opacity-40"
			onclick={stop}
			disabled={!running}
			title={t('Stop a program that runs forever', 'Stop et program, der kører for evigt')}
		>
			■ Stop
		</button>
		<button
			class="rounded-lg border border-line px-3 py-1.5 text-mist hover:border-gold hover:text-white"
			onclick={reset}
		>
			↺ {t('Reset', 'Nulstil')}
		</button>
		<button
			class="rounded-lg border border-line px-3 py-1.5 text-mist hover:border-gold hover:text-white"
			onclick={copy}
		>
			{t('Copy', 'Kopiér')}
		</button>
		<span class="ml-auto text-sm text-mist">{statusText}</span>
	</div>

	{#if fileNames.length > 1}
		<div class="flex gap-1 text-sm" role="tablist">
			{#each fileNames as name (name)}
				<button
					role="tab"
					aria-selected={activeFile === name}
					class="rounded-t-md px-3 py-1 font-mono {activeFile === name
						? 'bg-black/40 text-gold'
						: 'text-mist hover:text-white'}"
					onclick={() => (activeFile = name)}
				>
					{name}{name === 'main.py' ? '' : ' 🔒'}
				</button>
			{/each}
		</div>
	{/if}

	<div class="overflow-hidden rounded-xl" hidden={activeFile !== 'main.py'} bind:this={host}></div>
	{#each Object.entries(files ?? {}) as [name, content] (name)}
		{#if activeFile === name}
			<Code code={content} label={`${name} ${t('(read only)', '(skrivebeskyttet)')}`} />
		{/if}
	{/each}

	<div class="rounded-xl bg-black/40 px-4 py-3">
		<div class="mb-1 text-xs font-bold tracking-wider text-mist uppercase">
			{t('Output', 'Udskrift')}
		</div>
		{#if lines.length === 0}
			<p class="text-mist/70">
				{hasRun
					? t('(the program printed nothing)', '(programmet skrev ikke noget)')
					: t('Press ▶ Run to see what happens.', 'Tryk ▶ Kør for at se, hvad der sker.')}
			</p>
		{:else}
			<pre
				class="max-h-64 overflow-auto leading-relaxed whitespace-pre-wrap">{#each lines as line, i (i)}<span
						class={line.kind === 'err' ? 'text-red-300' : 'text-white'}>{line.text}</span
					>{/each}</pre>
		{/if}
	</div>

	{#if verdict}
		<div
			class="rounded-xl px-4 py-3 font-semibold {verdict.ok
				? 'bg-emerald-500/20 text-emerald-200'
				: 'bg-amber-500/20 text-amber-100'}"
		>
			{verdict.ok
				? t('🎉 Correct! Great job.', '🎉 Rigtigt! Flot klaret.')
				: `${t('Not yet', 'Ikke endnu')}: ${verdict.msg}`}
		</div>
	{/if}

	{#if hint}
		<details class="text-mist">
			<summary class="cursor-pointer select-none"
				>💡 {t('Need a hint?', 'Brug for et hint?')}</summary
			>
			<p class="mt-2 pl-5">{hint}</p>
		</details>
	{/if}
</div>

<style>
	:global(.cm-editor) {
		font-size: 1rem;
		max-height: 45vh;
	}
	:global(.cm-editor .cm-scroller) {
		overflow: auto;
		line-height: 1.6;
	}
	:global(.cm-editor.cm-focused) {
		outline: 2px solid var(--color-gold);
	}
</style>
