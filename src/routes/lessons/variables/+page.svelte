<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('variables');

	const example = {
		en: `name = "Ada"
age = 12
print(f"Hi, I am {name} and I am {age} years old.")

age = age + 1
print(f"Next year I will be {age}.")

# Variables can hold the result of a calculation
minutes = 3 * 60
print(f"3 hours is {minutes} minutes.")`,
		da: `navn = "Ada"
alder = 12
print(f"Hej, jeg hedder {navn} og jeg er {alder} år.")

alder = alder + 1
print(f"Næste år bliver jeg {alder}.")

# Variabler kan gemme resultatet af en udregning
minutter = 3 * 60
print(f"3 timer er {minutter} minutter.")`
	};

	const starter = {
		en: `# 1. Make three variables: pirate_name (text), ship (text) and gold (a number)
pirate_name = ...
ship = ...
gold = ...

# 2. Print a sentence like:  Redbeard sails the Black Pearl with 100 gold coins.
print(f"...")`,
		da: `# 1. Lav tre variabler: pirat_navn (tekst), skib (tekst) og guld (et tal)
pirat_navn = ...
skib = ...
guld = ...

# 2. Skriv en sætning som:  Rødskæg sejler med Sorte Perle med 100 guldmønter.
print(f"...")`
	};

	const check = {
		en: `assert isinstance(pirate_name, str) and pirate_name not in ("", "..."), "pirate_name should be text in quotes, like \\"Redbeard\\""
assert isinstance(ship, str) and ship not in ("", "..."), "ship should be text in quotes"
assert isinstance(gold, int) and not isinstance(gold, bool), "gold should be a whole number, like 100 (no quotes)"
assert pirate_name in __output__, "Print the pirate's name using {pirate_name} inside the f-string"
assert ship in __output__, "Print the ship's name using {ship} inside the f-string"
assert str(gold) in __output__, "Print the gold using {gold} inside the f-string"`,
		da: `assert isinstance(pirat_navn, str) and pirat_navn not in ("", "..."), "pirat_navn skal være tekst i anførselstegn, som \\"Rødskæg\\""
assert isinstance(skib, str) and skib not in ("", "..."), "skib skal være tekst i anførselstegn"
assert isinstance(guld, int) and not isinstance(guld, bool), "guld skal være et helt tal, som 100 (uden anførselstegn)"
assert pirat_navn in __output__, "Skriv piratens navn ud med {pirat_navn} inde i f-strengen"
assert skib in __output__, "Skriv skibets navn ud med {skib} inde i f-strengen"
assert str(guld) in __output__, "Skriv guldet ud med {guld} inde i f-strengen"`
	};

	const hint = {
		en: 'Replace each ... with a value. Text needs quotes, numbers do not. Inside the f-string, write the variable names in curly braces: {pirate_name}.',
		da: 'Erstat hvert ... med en værdi. Tekst skal have anførselstegn, tal skal ikke. Inde i f-strengen skriver du variablernes navne i krøllede parenteser: {pirat_navn}.'
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide kicker={t('Lesson 1', 'Lektion 1')} title={t('Variables', 'Variabler')}>
		{#snippet en()}
			<p>
				A <strong>variable</strong> is a name for a value. Think of it as a labelled box: you put something
				in, and later you can look at it or swap it for something else.
			</p>
			<Code code={`name = "Ada"\nage = 12`} />
			<ul>
				<li>
					The <code>=</code> means <strong>"put this value in the box"</strong>. It is not the same
					as "equals" in math.
				</li>
				<li>Text goes in quotes: <code>"Ada"</code>. Numbers do not: <code>12</code>.</li>
				<li>
					Names use small letters and underscores: <code>favorite_game</code>, not
					<code>Favorite Game</code>.
				</li>
				<li>
					To put a variable into text, use an <strong>f-string</strong>:
					<code>f"Hi &#123;name&#125;"</code>.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<p>
				En <strong>variabel</strong> er et navn for en værdi. Tænk på den som en kasse med en label: du
				lægger noget i, og senere kan du kigge på det eller bytte det ud med noget andet.
			</p>
			<Code code={`navn = "Ada"\nalder = 12`} />
			<ul>
				<li>
					<code>=</code> betyder <strong>"læg denne værdi i kassen"</strong>. Det er ikke det samme
					som "er lig med" i matematik.
				</li>
				<li>Tekst skrives i anførselstegn: <code>"Ada"</code>. Tal gør ikke: <code>12</code>.</li>
				<li>
					Navne skrives med små bogstaver og bundstreger: <code>yndlings_spil</code>, ikke
					<code>Yndlings Spil</code>.
				</li>
				<li>
					For at sætte en variabel ind i tekst bruger du en <strong>f-streng</strong>:
					<code>f"Hej &#123;navn&#125;"</code>.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 1 · Try it', 'Lektion 1 · Prøv selv')}
		title={t('Play with variables', 'Leg med variabler')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>Change the name and the age.</li>
				<li>Add a variable <code>favorite_game</code> and print it.</li>
				<li>What happens if you remove the quotes around <code>"Ada"</code>?</li>
			</ul>
			<PyRunner id="variables-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så at:</p>
			<ul class="text-base">
				<li>Ændre navnet og alderen.</li>
				<li>Tilføje en variabel <code>yndlings_spil</code> og skrive den ud.</li>
				<li>Hvad sker der, hvis du fjerner anførselstegnene omkring <code>"Ada"</code>?</li>
			</ul>
			<PyRunner id="variables-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 1 · Exercise', 'Lektion 1 · Opgave')}
		title={t('Meet the pirate', 'Mød piraten')}
	>
		{#snippet en()}
			<p>
				Make three variables: <code>pirate_name</code>, <code>ship</code> and <code>gold</code>.
				Then print one sentence that uses all three, for example:
				<em>Redbeard sails the Black Pearl with 100 gold coins.</em>
			</p>
			<PyRunner id="variables-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				Lav tre variabler: <code>pirat_navn</code>, <code>skib</code> og <code>guld</code>. Skriv så
				én sætning ud, der bruger alle tre, for eksempel:
				<em>Rødskæg sejler med Sorte Perle med 100 guldmønter.</em>
			</p>
			<PyRunner id="variables-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 1', 'Lektion 1')}
		title={t('Add it to your project', 'Læg det i dit projekt')}
	>
		{#snippet en()}
			<p>
				Open your <code>learn-python</code> project in Zed and make a new file called
				<code>pirate.py</code>.
			</p>
			<p>Copy your exercise code into it and run it from the terminal:</p>
			<Code code="uv run pirate.py" />
			<p class="tip">
				Notice how Zed colours the variable names and the text differently. That helps you spot
				missing quotes.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Åbn dit <code>learn-python</code>-projekt i Zed og lav en ny fil, der hedder
				<code>pirat.py</code>.
			</p>
			<p>Kopiér din kode fra opgaven ind i den, og kør den fra terminalen:</p>
			<Code code="uv run pirat.py" />
			<p class="tip">
				Læg mærke til, at Zed farver variabelnavne og tekst forskelligt. Det hjælper dig med at få
				øje på manglende anførselstegn.
			</p>
		{/snippet}
	</Slide>
</Deck>
