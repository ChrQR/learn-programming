<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('project-structure');
	const dunderTitle = 'if __name__ == "__main__"';

	const tree = {
		en: `learn-python/
├── pyproject.toml        ← name, Python version, packages (pytest lives here)
├── .python-version
├── main.py               ← the program starts here
├── pirates/              ← your own code, split into files (a "package")
│   ├── __init__.py       ← empty file that says: this folder is a package
│   └── treasure.py
└── tests/
    └── test_treasure.py  ← tests for the code in pirates/`,
		da: `learn-python/
├── pyproject.toml        ← navn, Python-version, pakker (pytest står her)
├── .python-version
├── main.py               ← programmet starter her
├── pirat/                ← din egen kode, delt op i filer (en "pakke")
│   ├── __init__.py       ← tom fil, der siger: denne mappe er en pakke
│   └── skat.py
└── tests/
    └── test_skat.py      ← tests for koden i pirat/`
	};

	const dunder = `def main() -> None:\n    ...\n\n\nif __name__ == "__main__":\n    main()`;

	const treasureFile = {
		en: `def share_treasure(coins: int, pirates: int) -> tuple[int, int]:
    """Return how many coins each pirate gets, and how many are left over."""
    each = coins // pirates
    left_over = coins % pirates
    return each, left_over
`,
		da: `def del_skat(moenter: int, pirater: int) -> tuple[int, int]:
    """Returnér hvor mange mønter hver pirat får, og hvor mange der er tilovers."""
    hver = moenter // pirater
    rest = moenter % pirater
    return hver, rest
`
	};

	const example = {
		en: `from pirates.treasure import share_treasure


def main() -> None:
    each, left_over = share_treasure(100, 7)
    print(f"Each pirate gets {each} coins, {left_over} left over.")


if __name__ == "__main__":
    main()`,
		da: `from pirat.skat import del_skat


def main() -> None:
    hver, rest = del_skat(100, 7)
    print(f"Hver pirat får {hver} mønter, {rest} tilovers.")


if __name__ == "__main__":
    main()`
	};

	const exampleFiles: { en: Record<string, string>; da: Record<string, string> } = {
		en: { 'pirates/__init__.py': '', 'pirates/treasure.py': treasureFile.en },
		da: { 'pirat/__init__.py': '', 'pirat/skat.py': treasureFile.da }
	};

	const shipFile = {
		en: `def crew_size(ship: str) -> int:
    """How many pirates sail on this ship?"""
    crews = {"Black Pearl": 5, "Flying Dutchman": 12, "Jolly Roger": 3}
    return crews.get(ship, 0)
`,
		da: `def besaetning(skib: str) -> int:
    """Hvor mange pirater sejler på dette skib?"""
    skibe = {"Sorte Perle": 5, "Den Flyvende Hollænder": 12, "Jolly Roger": 3}
    return skibe.get(skib, 0)
`
	};

	const exerciseFiles: { en: Record<string, string>; da: Record<string, string> } = {
		en: { 'pirates/__init__.py': '', 'pirates/ship.py': shipFile.en },
		da: { 'pirat/__init__.py': '', 'pirat/skib.py': shipFile.da }
	};

	const starter = {
		en: `# 1. Import crew_size from the file pirates/ship.py
...


def main() -> None:
    # 2. Use crew_size to find out how many pirates sail on the "Black Pearl",
    #    then print:  The crew has 5 pirates
    ...


# 3. Only run main() when this file is started directly
...`,
		da: `# 1. Importér besaetning fra filen pirat/skib.py
...


def main() -> None:
    # 2. Brug besaetning til at finde ud af, hvor mange pirater der sejler på "Sorte Perle",
    #    og skriv så:  Besætningen har 5 pirater
    ...


# 3. Kør kun main(), når denne fil startes direkte
...`
	};

	const check = {
		en: `assert "crew_size" in globals(), "Import it with:  from pirates.ship import crew_size"
assert "main" in globals() and callable(main), "Keep the main() function"
assert "__name__" in __source__ and "__main__" in __source__, 'Add:  if __name__ == "__main__":  followed by an indented  main()'
assert "The crew has 5 pirates" in __output__, "main() should print:  The crew has 5 pirates"`,
		da: `assert "besaetning" in globals(), "Importér den med:  from pirat.skib import besaetning"
assert "main" in globals() and callable(main), "Behold funktionen main()"
assert "__name__" in __source__ and "__main__" in __source__, 'Tilføj:  if __name__ == "__main__":  efterfulgt af en indrykket  main()'
assert "Besætningen har 5 pirater" in __output__, "main() skal skrive:  Besætningen har 5 pirater"`
	};

	const hint = {
		en: 'Line 1: from pirates.ship import crew_size. In main: size = crew_size("Black Pearl") and print an f-string. At the bottom: if __name__ == "__main__": main()',
		da: 'Linje 1: from pirat.skib import besaetning. I main: antal = besaetning("Sorte Perle") og skriv en f-streng ud. Nederst: if __name__ == "__main__": main()'
	};

	const testFile = {
		en: `from pirates.treasure import share_treasure


def test_share_treasure():
    assert share_treasure(100, 7) == (14, 2)
    assert share_treasure(10, 5) == (2, 0)`,
		da: `from pirat.skat import del_skat


def test_del_skat():
    assert del_skat(100, 7) == (14, 2)
    assert del_skat(10, 5) == (2, 0)`
	};
</script>

<Deck
	prev={links.prev}
	next={{
		href: '/lessons',
		label: { en: 'Back to all lessons', da: 'Tilbage til alle lektioner' }
	}}
>
	<Slide kicker={t('Lesson 7', 'Lektion 7')} title={t('Project structure', 'Projektstruktur')}>
		{#snippet en()}
			<p>
				One file is fine for a small program. Real projects grow, so we split the code into several
				files and folders. This is how a modern Python project looks:
			</p>
			<Code code={L(tree)} />
			<ul class="text-base">
				<li>
					A folder with an <code>__init__.py</code> file is a <strong>package</strong>. Each
					<code>.py</code>
					file in it is a <strong>module</strong>.
				</li>
				<li>
					You use code from a module with <code>from pirates.treasure import share_treasure</code>.
				</li>
				<li>
					Tests live in <code>tests/</code>, and pytest finds every file that starts with
					<code>test_</code>.
				</li>
			</ul>
			<p class="tip">
				Bigger projects and libraries put the packages in a <code>src/</code> folder:
				<code>src/learn_python/</code>. That is what <code>uv init</code> does when you leave out
				<code>--no-package</code>. Same idea, one folder deeper.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Én fil er fint til et lille program. Rigtige projekter vokser, så vi deler koden op i flere
				filer og mapper. Sådan ser et moderne Python-projekt ud:
			</p>
			<Code code={L(tree)} />
			<ul class="text-base">
				<li>
					En mappe med en <code>__init__.py</code>-fil er en <strong>pakke</strong>. Hver
					<code>.py</code>-fil i den er et <strong>modul</strong>.
				</li>
				<li>Du bruger kode fra et modul med <code>from pirat.skat import del_skat</code>.</li>
				<li>
					Tests bor i <code>tests/</code>, og pytest finder alle filer, der starter med
					<code>test_</code>.
				</li>
			</ul>
			<p class="tip">
				Større projekter og biblioteker lægger pakkerne i en <code>src/</code>-mappe:
				<code>src/learn_python/</code>. Det er det, <code>uv init</code> gør, når du udelader
				<code>--no-package</code>. Samme idé, bare én mappe dybere.
			</p>
		{/snippet}
	</Slide>

	<Slide kicker={t('Lesson 7', 'Lektion 7')} title={dunderTitle}>
		{#snippet en()}
			<p>You will see this at the bottom of almost every <code>main.py</code>:</p>
			<Code code={dunder} />
			<ul>
				<li>
					When you <strong>run</strong> a file (<code>uv run main.py</code>), Python sets
					<code>__name__</code>
					to <code>"__main__"</code>, so <code>main()</code> is called.
				</li>
				<li>
					When another file <strong>imports</strong> it, <code>__name__</code> is the file's name instead,
					so nothing runs by accident.
				</li>
				<li>
					That is what makes it possible to test your functions without starting the whole program.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<p>Det her ser du nederst i næsten alle <code>main.py</code>-filer:</p>
			<Code code={dunder} />
			<ul>
				<li>
					Når du <strong>kører</strong> en fil (<code>uv run main.py</code>), sætter Python
					<code>__name__</code>
					til <code>"__main__"</code>, så <code>main()</code> bliver kaldt.
				</li>
				<li>
					Når en anden fil <strong>importerer</strong> den, er <code>__name__</code> i stedet filens navn,
					så der ikke kører noget ved et uheld.
				</li>
				<li>
					Det er det, der gør det muligt at teste dine funktioner uden at starte hele programmet.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 7 · Try it', 'Lektion 7 · Prøv selv')}
		title={t('Two files working together', 'To filer, der arbejder sammen')}
	>
		{#snippet en()}
			<p>
				This example has two files. Click the tab <code>pirates/treasure.py</code> to read the
				locked file, then press <strong>Run</strong>. Try to:
			</p>
			<ul class="text-base">
				<li>Share 500 coins between 9 pirates instead.</li>
				<li>Remove the last two lines. What happens when you run it? Why?</li>
			</ul>
			<PyRunner id="structure-example" code={L(example)} files={L(exampleFiles)} />
		{/snippet}
		{#snippet da()}
			<p>
				Dette eksempel har to filer. Klik på fanen <code>pirat/skat.py</code> for at læse den låste
				fil, og tryk så <strong>Kør</strong>. Prøv at:
			</p>
			<ul class="text-base">
				<li>Dele 500 mønter mellem 9 pirater i stedet.</li>
				<li>Fjerne de sidste to linjer. Hvad sker der, når du kører det? Hvorfor?</li>
			</ul>
			<PyRunner id="structure-example" code={L(example)} files={L(exampleFiles)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 7 · Exercise', 'Lektion 7 · Opgave')}
		title={t('Use a module', 'Brug et modul')}
	>
		{#snippet en()}
			<p>
				The locked file <code>pirates/ship.py</code> has a function <code>crew_size</code>. Import
				it, use it in <code>main()</code> to print <strong>The crew has 5 pirates</strong>, and make
				sure <code>main()</code> only runs when the file is started directly.
			</p>
			<PyRunner
				id="structure-exercise"
				code={L(starter)}
				check={L(check)}
				files={L(exerciseFiles)}
				hint={L(hint)}
			/>
		{/snippet}
		{#snippet da()}
			<p>
				Den låste fil <code>pirat/skib.py</code> har en funktion <code>besaetning</code>. Importér
				den, brug den i <code>main()</code> til at skrive
				<strong>Besætningen har 5 pirater</strong>, og sørg for, at <code>main()</code> kun kører, når
				filen startes direkte.
			</p>
			<PyRunner
				id="structure-exercise"
				code={L(starter)}
				check={L(check)}
				files={L(exerciseFiles)}
				hint={L(hint)}
			/>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 7', 'Lektion 7')}
		title={t('Do it in your project', 'Gør det i dit projekt')}
	>
		{#snippet en()}
			<p>
				In your <code>learn-python</code> project, make the folder <code>pirates</code> with an
				empty <code>__init__.py</code> and this file:
			</p>
			<Code code={treasureFile.en.trim()} label="pirates/treasure.py" />
			<p>Add a test for it:</p>
			<Code code={L(testFile)} label="tests/test_treasure.py" />
			<Code code={`uv run pytest\nruff check .\nty check`} />
			<p>All green? Commit it with git. You now have a real, tested Python project. 🏴‍☠️</p>
		{/snippet}
		{#snippet da()}
			<p>
				Lav mappen <code>pirat</code> i dit <code>learn-python</code>-projekt med en tom
				<code>__init__.py</code> og denne fil:
			</p>
			<Code code={treasureFile.da.trim()} label="pirat/skat.py" />
			<p>Tilføj en test til den:</p>
			<Code code={L(testFile)} label="tests/test_skat.py" />
			<Code code={`uv run pytest\nruff check .\nty check`} />
			<p>Alt grønt? Commit det med git. Nu har du et rigtigt, testet Python-projekt. 🏴‍☠️</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('The end of the introduction', 'Introduktionen er slut')}
		title={t("What's next?", 'Hvad nu?')}
	>
		{#snippet en()}
			<p>
				You know variables, constants, types, operators, decisions, loops, functions and how a
				project is put together. That is the foundation of every program ever written.
			</p>
			<p>Now you choose what to build, and in which language:</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>🐍 Python</h3>
					<p>Games with pygame, bots, data, small web apps.</p>
				</div>
				<div class="card">
					<h3>🟨 JavaScript / TypeScript</h3>
					<p>Websites and web apps.</p>
				</div>
				<div class="card">
					<h3>🐹 Go</h3>
					<p>Fast command-line tools and servers.</p>
				</div>
			</div>
			<p>Talk to your instructor about your idea. 🏴‍☠️</p>
		{/snippet}
		{#snippet da()}
			<p>
				Du kender nu variabler, konstanter, typer, operatorer, beslutninger, løkker, funktioner og
				hvordan et projekt er sat sammen. Det er fundamentet under alle programmer, der nogensinde
				er skrevet.
			</p>
			<p>Nu vælger du, hvad du vil bygge, og i hvilket sprog:</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>🐍 Python</h3>
					<p>Spil med pygame, bots, data, små webapps.</p>
				</div>
				<div class="card">
					<h3>🟨 JavaScript / TypeScript</h3>
					<p>Hjemmesider og webapps.</p>
				</div>
				<div class="card">
					<h3>🐹 Go</h3>
					<p>Hurtige kommandolinjeværktøjer og servere.</p>
				</div>
			</div>
			<p>Snak med din underviser om din idé. 🏴‍☠️</p>
		{/snippet}
	</Slide>
</Deck>
