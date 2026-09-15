<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import { t } from '$lib/i18n.svelte';
</script>

<Deck next={{ href: '/setup', label: { en: 'Set up your tools', da: 'Sæt dine værktøjer op' } }}>
	<Slide>
		{#snippet en()}
			<div class="flex flex-col items-center gap-6 text-center">
				<img
					src="/Coding-Pirate-Logo-512px.png"
					alt="Coding Pirates"
					class="h-40 w-40 rounded-3xl"
				/>
				<h1 class="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
					Learn Programming
				</h1>
				<p class="max-w-2xl text-xl md:text-2xl">
					An introduction to programming with <strong>Python</strong>, the way real developers work.
				</p>
				<p class="text-base text-mist/70">Press <kbd>→</kbd> or <kbd>Space</kbd> to begin</p>
			</div>
		{/snippet}
		{#snippet da()}
			<div class="flex flex-col items-center gap-6 text-center">
				<img
					src="/Coding-Pirate-Logo-512px.png"
					alt="Coding Pirates"
					class="h-40 w-40 rounded-3xl"
				/>
				<h1 class="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
					Lær at programmere
				</h1>
				<p class="max-w-2xl text-xl md:text-2xl">
					En introduktion til programmering med <strong>Python</strong>, sådan som rigtige udviklere
					arbejder.
				</p>
				<p class="text-base text-mist/70">
					Tryk <kbd>→</kbd> eller <kbd>Mellemrum</kbd> for at begynde
				</p>
			</div>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('The course', 'Kurset')}
		title={t('What is this course?', 'Hvad er det her for et kursus?')}
	>
		{#snippet en()}
			<ul>
				<li>A course for people to learn how to make computers do what they say.</li>
				<li>
					We start with <strong>Python</strong>: a friendly language that is also used by real
					companies, scientists and game makers.
				</li>
				<li>
					We use <strong>real developer tools</strong> from day one: a code editor, a type checker, tests
					and GitHub.
				</li>
				<li>
					First an <strong>introduction</strong> with small lessons and exercises. Then you
					<strong>build your own project</strong>.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<ul>
				<li>Et kursus for alle, der vil lære at få computere til at gøre, som de siger.</li>
				<li>
					Vi starter med <strong>Python</strong>: et venligt sprog, som også bruges af rigtige
					virksomheder, forskere og spiludviklere.
				</li>
				<li>
					Vi bruger <strong>rigtige udviklerværktøjer</strong> fra dag ét: en kodeeditor, en typechecker,
					tests og GitHub.
				</li>
				<li>
					Først en <strong>introduktion</strong> med små lektioner og opgaver. Derefter
					<strong>bygger du dit eget projekt</strong>.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide kicker={t('The course', 'Kurset')} title={t('What will we learn?', 'Hvad skal vi lære?')}>
		{#snippet en()}
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>📦 Variables, constants and types</h3>
					<p>
						How a program remembers things, and the difference between text, numbers and true/false.
					</p>
				</div>
				<div class="card">
					<h3>🧮 Operators and decisions</h3>
					<p>Doing math, comparing things, and letting the program choose with if/else.</p>
				</div>
				<div class="card">
					<h3>🔁 Loops</h3>
					<p>Making the computer repeat things, which is what computers are best at.</p>
				</div>
				<div class="card">
					<h3>🧰 Functions</h3>
					<p>Building your own commands so you can reuse them.</p>
				</div>
				<div class="card">
					<h3>🗂️ Project structure</h3>
					<p>How a modern Python project is organized, with tests and everything.</p>
				</div>
				<div class="card">
					<h3>🛠️ The tools</h3>
					<p>Zed, uv, ruff, ty, pytest and GitHub. The same tools professionals use.</p>
				</div>
			</div>
		{/snippet}
		{#snippet da()}
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>📦 Variabler, konstanter og typer</h3>
					<p>Hvordan et program husker ting, og forskellen på tekst, tal og sandt/falsk.</p>
				</div>
				<div class="card">
					<h3>🧮 Operatorer og beslutninger</h3>
					<p>At regne, sammenligne ting og lade programmet vælge med if/else.</p>
				</div>
				<div class="card">
					<h3>🔁 Løkker</h3>
					<p>At få computeren til at gentage ting. Det er det, computere er bedst til.</p>
				</div>
				<div class="card">
					<h3>🧰 Funktioner</h3>
					<p>At bygge dine egne kommandoer, så du kan bruge dem igen og igen.</p>
				</div>
				<div class="card">
					<h3>🗂️ Projektstruktur</h3>
					<p>Hvordan et moderne Python-projekt er organiseret, med tests og det hele.</p>
				</div>
				<div class="card">
					<h3>🛠️ Værktøjerne</h3>
					<p>Zed, uv, ruff, ty, pytest og GitHub. De samme værktøjer, som professionelle bruger.</p>
				</div>
			</div>
		{/snippet}
	</Slide>

	<Slide kicker={t('The course', 'Kurset')} title={t('How do we work?', 'Hvordan arbejder vi?')}>
		{#snippet en()}
			<ul>
				<li>
					<strong>Every lesson has code you can run</strong> right here in the browser. Change it, break
					it, fix it.
				</li>
				<li>
					<strong>Every lesson has a small exercise.</strong> The page tells you when you get it right.
				</li>
				<li>
					<strong>You also write code on your own computer</strong> in the editor Zed, in a project that
					grows during the course.
				</li>
				<li>
					<strong>Ask for help</strong> whenever you are stuck. Being stuck is part of programming.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<ul>
				<li>
					<strong>Hver lektion har kode, du kan køre</strong> lige her i browseren. Lav den om, ødelæg
					den, reparer den.
				</li>
				<li>
					<strong>Hver lektion har en lille opgave.</strong> Siden fortæller dig, når du har løst den
					rigtigt.
				</li>
				<li>
					<strong>Du skriver også kode på din egen computer</strong> i editoren Zed, i et projekt, der
					vokser i løbet af kurset.
				</li>
				<li>
					<strong>Bed om hjælp</strong>, når du sidder fast. At sidde fast er en del af at
					programmere.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('After the introduction', 'Efter introduktionen')}
		title={t('Pick a language for your own project', 'Vælg et sprog til dit eget projekt')}
	>
		{#snippet en()}
			<p>
				When the introduction is done, you choose what to build, and which language to build it in:
			</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>🐍 Python</h3>
					<p>
						Keep going with what you know. Great for games with pygame, bots, data and small web
						apps.
					</p>
				</div>
				<div class="card">
					<h3>🟨 JavaScript / TypeScript</h3>
					<p>
						The language of the web. Build websites and web apps. This presentation is built with
						it.
					</p>
				</div>
				<div class="card">
					<h3>🐹 Go</h3>
					<p>A fast, simple language made at Google. Great for command-line tools and servers.</p>
				</div>
			</div>
			<p class="text-base text-mist/80">
				All three work in Zed, so the tools you set up next will still be useful.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Når introduktionen er færdig, vælger du, hvad du vil bygge, og hvilket sprog du vil bygge
				det i:
			</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>🐍 Python</h3>
					<p>Fortsæt med det, du kender. Godt til spil med pygame, bots, data og små webapps.</p>
				</div>
				<div class="card">
					<h3>🟨 JavaScript / TypeScript</h3>
					<p>Webbets sprog. Byg hjemmesider og webapps. Denne præsentation er bygget med det.</p>
				</div>
				<div class="card">
					<h3>🐹 Go</h3>
					<p>
						Et hurtigt og enkelt sprog lavet hos Google. Godt til kommandolinjeværktøjer og servere.
					</p>
				</div>
			</div>
			<p class="text-base text-mist/80">
				Alle tre virker i Zed, så de værktøjer, du sætter op nu, kan du stadig bruge.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t("Let's go", 'Kom i gang')}
		title={t('First: set up your tools', 'Først: sæt dine værktøjer op')}
	>
		{#snippet en()}
			<p>Before we can write code, we need a few programs on your computer. We will install:</p>
			<ol>
				<li>A <strong>GitHub</strong> account, to save and share your code</li>

				<li><strong>git</strong> and the <strong>GitHub CLI</strong>, to fetch and share code</li>
				<li><strong>Zed</strong>, the editor we write code in</li>
				<li><strong>uv</strong>, which installs Python and manages projects</li>
				<li>
					<strong>ruff</strong>, <strong>ty</strong> and <strong>pytest</strong>, which check and
					test your code
				</li>
				<li>Tell Zed to use ruff and ty</li>
			</ol>
			<p>Press <kbd>→</kbd> to start.</p>
		{/snippet}
		{#snippet da()}
			<p>Før vi kan skrive kode, skal vi have et par programmer på din computer. Vi installerer:</p>
			<ol>
				<li>En <strong>GitHub</strong>-konto, til at gemme og dele din kode</li>

				<li><strong>git</strong> og <strong>GitHub CLI</strong>, til at hente og dele kode</li>
				<li><strong>Zed</strong>, den editor vi skriver kode i</li>
				<li><strong>uv</strong>, som installerer Python og styrer projekter</li>
				<li>
					<strong>ruff</strong>, <strong>ty</strong> og <strong>pytest</strong>, som tjekker og
					tester din kode
				</li>
				<li>Fortæl Zed, at den skal bruge ruff og ty</li>
			</ol>
			<p>Tryk <kbd>→</kbd> for at starte.</p>
		{/snippet}
	</Slide>
</Deck>
