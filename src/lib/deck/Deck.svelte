<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	export interface DeckContext {
		register(): number;
		readonly active: number;
		readonly total: number;
	}
	const KEY = Symbol('deck');
	export const getDeck = () => getContext<DeckContext>(KEY);
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { goto, replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { detectOs } from './os.svelte';
	import type { Link } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	let { children, next, prev }: { children: Snippet; next?: Link; prev?: Link } = $props();

	let active = $state(0);
	let total = $state(0);
	const last = $derived(Math.max(0, total - 1));

	setContext<DeckContext>(KEY, {
		register: () => total++,
		get active() {
			return active;
		},
		get total() {
			return total;
		}
	});

	function go(n: number, sync = true) {
		active = Math.min(last, Math.max(0, n));
		// On first mount the router is not ready yet, so only sync the hash on user navigation.
		// eslint-disable-next-line svelte/no-navigation-without-resolve -- hash-only update of the current page
		if (sync) replaceState(`#${active + 1}`, {});
	}
	function forward() {
		if (active < last) go(active + 1);
		else if (next) goto(resolve(next.href));
	}
	function back() {
		if (active > 0) go(active - 1);
		else if (prev) goto(resolve(`${prev.href}#last`));
	}

	function readHash() {
		if (location.hash === '#last') return go(last, false);
		const n = parseInt(location.hash.slice(1), 10);
		if (!Number.isNaN(n)) go(n - 1, false);
	}

	function inEditor(target: EventTarget | null) {
		const el = target as HTMLElement | null;
		if (!el) return false;
		if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return true;
		return el.isContentEditable || Boolean(el.closest?.('.cm-editor'));
	}

	function onKey(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		if (inEditor(e.target)) {
			if (e.key === 'Escape') (e.target as HTMLElement).blur();
			return;
		}
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
			case 'PageDown':
			case ' ':
			case 'Enter':
				e.preventDefault();
				forward();
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
			case 'PageUp':
				e.preventDefault();
				back();
				break;
			case 'Home':
				e.preventDefault();
				go(0);
				break;
			case 'End':
				e.preventDefault();
				go(last);
				break;
		}
	}

	onMount(() => {
		detectOs();
		readHash();
	});
</script>

<svelte:window onkeydown={onKey} onhashchange={readHash} />

<div class="flex h-full min-h-0 flex-col">
	<div class="h-1 w-full shrink-0 bg-panel">
		<div
			class="h-full bg-gold transition-[width] duration-300"
			style="width: {total ? ((active + 1) / total) * 100 : 0}%"
		></div>
	</div>

	<main class="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-y-auto px-6 py-6 md:px-12">
		{@render children()}
	</main>

	<footer
		class="flex shrink-0 items-center justify-between gap-4 border-t border-line px-6 py-2.5 text-sm text-mist"
	>
		<span class="hidden md:inline">
			<kbd>←</kbd> <kbd>→</kbd>
			{t('to move between slides', 'skifter slide')}
		</span>
		<div class="flex items-center gap-3">
			<button
				class="rounded-md border border-line px-3 py-1 hover:border-gold disabled:opacity-40"
				onclick={back}
				disabled={active === 0 && !prev}
				aria-label="Previous">‹ {t('Back', 'Tilbage')}</button
			>
			<span class="tabular-nums">{active + 1} / {total}</span>
			{#if active === last && next}
				<a
					href={resolve(next.href)}
					class="rounded-md bg-gold px-3 py-1 font-bold text-ink hover:bg-yellow-300"
					>{L(next.label)} ›</a
				>
			{:else}
				<button
					class="rounded-md border border-line px-3 py-1 hover:border-gold disabled:opacity-40"
					onclick={forward}
					disabled={active === last}
					aria-label="Next">{t('Next', 'Næste')} ›</button
				>
			{/if}
		</div>
	</footer>
</div>
