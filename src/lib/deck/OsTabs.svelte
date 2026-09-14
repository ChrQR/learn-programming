<script lang="ts">
	import type { Snippet } from 'svelte';
	import { os, osLabel, type Os } from './os.svelte';
	import { t } from '$lib/i18n.svelte';

	let { linux, macos, windows }: { linux?: Snippet; macos?: Snippet; windows?: Snippet } = $props();

	const order: Os[] = ['linux', 'macos', 'windows'];
	const panels = $derived({ linux, macos, windows });
	const current = $derived(panels[os.current]);
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-2" role="tablist" aria-label="Operating system">
		{#each order as key (key)}
			<button
				role="tab"
				aria-selected={os.current === key}
				class="rounded-full border px-4 py-1.5 text-base font-semibold transition-colors
				{os.current === key
					? 'border-gold bg-gold text-ink'
					: 'border-line bg-panel text-mist hover:border-gold/60'}"
				onclick={() => (os.current = key)}
			>
				{osLabel[key]}
			</button>
		{/each}
	</div>

	{#key os.current}
		<div role="tabpanel" class="flex flex-col gap-4">
			{#if current}
				{@render current()}
			{:else}
				<p class="text-mist">
					{t('Nothing special to do on', 'Ikke noget særligt at gøre på')}
					{osLabel[os.current]}.
				</p>
			{/if}
		</div>
	{/key}
</div>
