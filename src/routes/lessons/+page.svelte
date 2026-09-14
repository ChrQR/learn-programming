<script lang="ts">
	import { resolve } from '$app/paths';
	import { lessons } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';
</script>

<div
	class="mx-auto flex h-full w-full max-w-5xl flex-col gap-6 overflow-y-auto px-6 py-10 md:px-12"
>
	<header>
		<p class="text-sm font-bold tracking-[0.2em] text-gold uppercase">
			{t('Lessons', 'Lektioner')}
		</p>
		<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">
			{t('The basics of Python', 'Det grundlæggende i Python')}
		</h1>
		<p class="mt-3 max-w-2xl text-lg text-mist">
			{t(
				'Seven short lessons. Each one explains an idea, lets you play with real code in the browser, and ends with an exercise. Do them in order.',
				'Syv korte lektioner. Hver af dem forklarer en idé, lader dig lege med rigtig kode i browseren og slutter med en opgave. Tag dem i rækkefølge.'
			)}
		</p>
	</header>
	<ol class="grid gap-3 md:grid-cols-2">
		{#each lessons as lesson, i (lesson.slug)}
			<li>
				<a href={resolve(lesson.href)} class="card h-full transition-colors hover:border-gold">
					<h3>{lesson.emoji} {i + 1}. {L(lesson.title)}</h3>
					<p class="text-mist">{L(lesson.blurb)}</p>
				</a>
			</li>
		{/each}
	</ol>
	<p class="text-base text-mist/80">
		{t(
			'Your edits in the code blocks are remembered in this browser, so you can come back later.',
			'Dine ændringer i kodeblokkene bliver husket i denne browser, så du kan komme tilbage senere.'
		)}
	</p>
</div>
