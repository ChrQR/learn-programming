<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getDeck } from './Deck.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let {
		kicker,
		title,
		children,
		en,
		da
	}: {
		kicker?: string;
		title?: string;
		/** Language-independent body. */
		children?: Snippet;
		/** Or one body per language. */
		en?: Snippet;
		da?: Snippet;
	} = $props();

	const deck = getDeck();
	const index = deck.register();
	const active = $derived(deck.active === index);
	const body = $derived(i18n.lang === 'da' ? (da ?? en) : (en ?? da));
</script>

<section class="slide my-auto flex w-full flex-col gap-6" hidden={!active}>
	{#if kicker || title}
		<header class="flex flex-col gap-1">
			{#if kicker}
				<p class="text-sm font-bold tracking-[0.2em] text-gold uppercase">{kicker}</p>
			{/if}
			{#if title}
				<h2 class="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
			{/if}
		</header>
	{/if}
	<div class="prose-slide flex flex-col gap-5 text-lg text-mist md:text-xl">
		{#if body}
			{@render body()}
		{:else}
			{@render children?.()}
		{/if}
	</div>
</section>

<style>
	.slide {
		animation: slide-in 220ms ease-out;
	}
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
