<script lang="ts">
	import { t } from '$lib/i18n.svelte';

	let { code, label }: { code: string; label?: string } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard can be unavailable (e.g. http); the text is still selectable.
		}
	}
</script>

<div class="relative rounded-xl border border-line bg-black/40">
	{#if label}
		<div class="border-b border-line px-4 py-1.5 text-sm text-mist">{label}</div>
	{/if}
	<button
		class="absolute top-1.5 right-2 rounded-md px-2 py-1 text-sm text-mist hover:bg-panel hover:text-white"
		onclick={copy}
		aria-label="Copy to clipboard"
	>
		{copied ? t('Copied ✓', 'Kopieret ✓') : t('Copy', 'Kopiér')}
	</button>
	<pre class="overflow-x-auto px-4 py-3 pr-20 text-[0.95rem] leading-relaxed"><code>{code}</code
		></pre>
</div>
