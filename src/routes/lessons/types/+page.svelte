<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('types');

	const example = {
		en: `name: str = "Ada"          # text (a "string")
age: int = 12              # whole number
height: float = 1.55       # decimal number
is_pirate: bool = True     # True or False

print(type(name), type(age), type(height), type(is_pirate))

# Converting between types
age_text = "13"
print(age_text + "1")      # text + text glues them together: 131
print(int(age_text) + 1)   # number + number adds them: 14
print(str(age) + " years") # turn a number into text first`,
		da: `navn: str = "Ada"          # tekst (en "streng")
alder: int = 12            # helt tal
hoejde: float = 1.55       # decimaltal
er_pirat: bool = True      # True (sandt) eller False (falsk)

print(type(navn), type(alder), type(hoejde), type(er_pirat))

# At lave om mellem typer
alder_tekst = "13"
print(alder_tekst + "1")      # tekst + tekst limer dem sammen: 131
print(int(alder_tekst) + 1)   # tal + tal lægger dem sammen: 14
print(str(alder) + " år")     # lav tallet om til tekst først`
	};

	const starter = {
		en: `# This program should print:  You have 12 apples
apples = "10"
more = 2
total = apples + more   # 💥 something is wrong on this line
print(f"You have {total} apples")`,
		da: `# Dette program skal skrive:  Du har 12 æbler
aebler = "10"
flere = 2
i_alt = aebler + flere   # 💥 der er noget galt på denne linje
print(f"Du har {i_alt} æbler")`
	};

	const check = {
		en: `assert total == 12, "total should be the number 12. Turn apples into a number with int(...) before adding"
assert "You have 12 apples" in __output__, "The output should be exactly: You have 12 apples"`,
		da: `assert i_alt == 12, "i_alt skal være tallet 12. Lav aebler om til et tal med int(...) før du lægger sammen"
assert "Du har 12 æbler" in __output__, "Udskriften skal være præcis: Du har 12 æbler"`
	};

	const hint = {
		en: 'apples is text ("10"), not a number. Turn it into a number with int(apples) before adding.',
		da: 'aebler er tekst ("10"), ikke et tal. Lav den om til et tal med int(aebler), før du lægger sammen.'
	};

	const bug = {
		en: `apples = "10"\nmore = 2\ntotal = apples + more`,
		da: `aebler = "10"\nflere = 2\ni_alt = aebler + flere`
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide kicker={t('Lesson 3', 'Lektion 3')} title={t('Types', 'Typer')}>
		{#snippet en()}
			<p>
				Every value has a <strong>type</strong>: what kind of thing it is. The four you will use
				most:
			</p>
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>str</h3>
					<p>Text: <code>"Ahoy!"</code>. Always in quotes.</p>
				</div>
				<div class="card">
					<h3>int</h3>
					<p>Whole numbers: <code>42</code>, <code>-3</code>.</p>
				</div>
				<div class="card">
					<h3>float</h3>
					<p>Decimal numbers: <code>3.14</code>, <code>1.5</code>.</p>
				</div>
				<div class="card">
					<h3>bool</h3>
					<p>Yes or no: <code>True</code>, <code>False</code>.</p>
				</div>
			</div>
			<p>
				You can tell Python what type you mean with a <strong>type hint</strong>:
				<code>age: int = 12</code>. Python does not need it, but <strong>ty</strong> uses it to catch
				mistakes like adding text to a number before you run the program.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Enhver værdi har en <strong>type</strong>: hvilken slags ting den er. De fire, du kommer til
				at bruge mest:
			</p>
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>str</h3>
					<p>Tekst: <code>"Ohøj!"</code>. Altid i anførselstegn.</p>
				</div>
				<div class="card">
					<h3>int</h3>
					<p>Hele tal: <code>42</code>, <code>-3</code>.</p>
				</div>
				<div class="card">
					<h3>float</h3>
					<p>Decimaltal: <code>3.14</code>, <code>1.5</code>.</p>
				</div>
				<div class="card">
					<h3>bool</h3>
					<p>Ja eller nej: <code>True</code>, <code>False</code>.</p>
				</div>
			</div>
			<p>
				Du kan fortælle Python, hvilken type du mener, med et <strong>type hint</strong>:
				<code>alder: int = 12</code>. Python har ikke brug for det, men <strong>ty</strong> bruger det
				til at fange fejl som at lægge tekst til et tal, før du kører programmet.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 3 · Try it', 'Lektion 3 · Prøv selv')}
		title={t('Play with types', 'Leg med typer')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>What does <code>print(age + "1")</code> do? Read the error message carefully.</li>
				<li>What does <code>print(7 / 2)</code> print? And <code>type(7 / 2)</code>?</li>
				<li>What is <code>type(True)</code>? And <code>type("True")</code>?</li>
			</ul>
			<PyRunner id="types-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så:</p>
			<ul class="text-base">
				<li>Hvad gør <code>print(alder + "1")</code>? Læs fejlbeskeden grundigt.</li>
				<li>Hvad skriver <code>print(7 / 2)</code>? Og <code>type(7 / 2)</code>?</li>
				<li>Hvad er <code>type(True)</code>? Og <code>type("True")</code>?</li>
			</ul>
			<PyRunner id="types-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 3 · Exercise', 'Lektion 3 · Opgave')}
		title={t('Fix the bug', 'Ret fejlen')}
	>
		{#snippet en()}
			<p>
				This program crashes. Read the error, find the line, and fix it so it prints <strong
					>You have 12 apples</strong
				>. Only change the line with the 💥.
			</p>
			<PyRunner id="types-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				Dette program går ned. Læs fejlen, find linjen, og ret den, så programmet skriver <strong
					>Du har 12 æbler</strong
				>. Ændr kun linjen med 💥.
			</p>
			<PyRunner id="types-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>

	<Slide kicker={t('Lesson 3', 'Lektion 3')} title={t('See ty in action', 'Se ty i aktion')}>
		{#snippet en()}
			<p>
				Paste the broken program from the exercise into a file in Zed, <strong>before</strong> you fix
				it.
			</p>
			<Code code={L(bug)} label="bug.py" />
			<p>
				Zed underlines the third line in red, and hovering over it explains why. That is ty, and it
				is why we set it up: it finds this kind of mistake without running anything.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Sæt det ødelagte program fra opgaven ind i en fil i Zed, <strong>før</strong> du retter det.
			</p>
			<Code code={L(bug)} label="fejl.py" />
			<p>
				Zed understreger den tredje linje med rødt, og holder du musen over den, forklarer den
				hvorfor. Det er ty, og det er derfor, vi satte den op: den finder den slags fejl uden at
				køre noget som helst.
			</p>
		{/snippet}
	</Slide>
</Deck>
