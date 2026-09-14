<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { sections } from '$lib/nav';
	import { i18n, L, t, setLang, initLang } from '$lib/i18n.svelte';

	let { children } = $props();

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	onMount(initLang);
</script>

<svelte:head>
	<link rel="icon" href="/Coding-Pirate-Logo-512px.png" />
	<title>{t('Learn Programming', 'Lær at programmere')} · Coding Pirates</title>
</svelte:head>

<div class="grid h-dvh grid-rows-[auto_1fr] bg-ink text-white">
	<header class="flex items-center gap-4 border-b border-line px-4 py-2 text-sm">
		<a href={resolve('/')} class="flex items-center gap-2 font-bold">
			<img src="/Coding-Pirate-Logo-512px.png" alt="Coding Pirates" class="h-7 w-7 rounded" />
			<span class="hidden sm:inline">{t('Learn Programming', 'Lær at programmere')}</span>
		</a>
		<nav class="flex gap-1">
			{#each sections as s (s.href)}
				<a
					href={resolve(s.href)}
					class="rounded-md px-3 py-1 {isActive(s.href)
						? 'bg-panel text-gold'
						: 'text-mist hover:text-white'}">{L(s.label)}</a
				>
			{/each}
		</nav>
		<div
			class="ml-auto flex overflow-hidden rounded-md border border-line"
			role="group"
			aria-label="Language"
		>
			<button
				class="px-2.5 py-1 font-semibold {i18n.lang === 'en'
					? 'bg-gold text-ink'
					: 'text-mist hover:text-white'}"
				aria-pressed={i18n.lang === 'en'}
				onclick={() => setLang('en')}
				lang="en">English</button
			>
			<button
				class="px-2.5 py-1 font-semibold {i18n.lang === 'da'
					? 'bg-gold text-ink'
					: 'text-mist hover:text-white'}"
				aria-pressed={i18n.lang === 'da'}
				onclick={() => setLang('da')}
				lang="da">Dansk</button
			>
		</div>
	</header>
	<div class="min-h-0">
		{@render children()}
	</div>
</div>
