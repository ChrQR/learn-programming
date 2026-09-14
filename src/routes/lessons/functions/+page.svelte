<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('functions');

	const example = {
		en: `def greet(name: str) -> str:
    """Make a greeting for someone."""
    return f"Ahoy, {name}!"


def area(width: float, height: float) -> float:
    return width * height


print(greet("Ada"))
print(greet("Linus"))
print(area(3, 4))

# A parameter can have a default value
def cheer(times: int = 3) -> None:
    for _ in range(times):
        print("Hip hip hooray!")


cheer()
cheer(1)`,
		da: `def hils(navn: str) -> str:
    """Lav en hilsen til nogen."""
    return f"Ohøj, {navn}!"


def areal(bredde: float, hoejde: float) -> float:
    return bredde * hoejde


print(hils("Ada"))
print(hils("Linus"))
print(areal(3, 4))

# En parameter kan have en standardværdi
def jubel(gange: int = 3) -> None:
    for _ in range(gange):
        print("Hip hip hurra!")


jubel()
jubel(1)`
	};

	const starter = {
		en: `def is_even(number: int) -> bool:
    """Return True if the number is even, otherwise False."""
    ...


def biggest(a: int, b: int) -> int:
    """Return the bigger of the two numbers."""
    ...


print(is_even(4))
print(is_even(7))
print(biggest(3, 9))`,
		da: `def er_lige(tal: int) -> bool:
    """Returnér True, hvis tallet er lige, ellers False."""
    ...


def stoerst(a: int, b: int) -> int:
    """Returnér det største af de to tal."""
    ...


print(er_lige(4))
print(er_lige(7))
print(stoerst(3, 9))`
	};

	const check = {
		en: `assert is_even(4) is True, "is_even(4) should return True. Even numbers have no remainder when divided by 2"
assert is_even(7) is False, "is_even(7) should return False"
assert is_even(0) is True, "is_even(0) should return True"
assert biggest(3, 9) == 9, "biggest(3, 9) should return 9"
assert biggest(10, 2) == 10, "biggest(10, 2) should return 10"
assert biggest(5, 5) == 5, "biggest(5, 5) should return 5"`,
		da: `assert er_lige(4) is True, "er_lige(4) skal returnere True. Lige tal har ingen rest, når man dividerer med 2"
assert er_lige(7) is False, "er_lige(7) skal returnere False"
assert er_lige(0) is True, "er_lige(0) skal returnere True"
assert stoerst(3, 9) == 9, "stoerst(3, 9) skal returnere 9"
assert stoerst(10, 2) == 10, "stoerst(10, 2) skal returnere 10"
assert stoerst(5, 5) == 5, "stoerst(5, 5) skal returnere 5"`
	};

	const hint = {
		en: 'A number is even when number % 2 == 0, and that comparison is already True or False, so you can return it directly. For biggest, use if a > b: return a, else return b.',
		da: 'Et tal er lige, når tal % 2 == 0, og den sammenligning er allerede True eller False, så du kan returnere den direkte. I stoerst: brug if a > b: return a, ellers return b.'
	};

	const intro = {
		en: `def greet(name: str) -> str:\n    return f"Ahoy, {name}!"\n\nmessage = greet("Ada")\nprint(message)`,
		da: `def hils(navn: str) -> str:\n    return f"Ohøj, {navn}!"\n\nbesked = hils("Ada")\nprint(besked)`
	};

	const testFile = {
		en: `from main import biggest, greet, is_even


def test_greet():
    assert greet("Ada") == "Hello, Ada!"


def test_is_even():
    assert is_even(4) is True
    assert is_even(7) is False


def test_biggest():
    assert biggest(3, 9) == 9`,
		da: `from main import er_lige, greet, stoerst


def test_greet():
    assert greet("Ada") == "Hello, Ada!"


def test_er_lige():
    assert er_lige(4) is True
    assert er_lige(7) is False


def test_stoerst():
    assert stoerst(3, 9) == 9`
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide kicker={t('Lesson 6', 'Lektion 6')} title={t('Functions', 'Funktioner')}>
		{#snippet en()}
			<p>
				A <strong>function</strong> is a command you make yourself. You give it a name, tell it what it
				needs, and say what it should give back. Then you can use it as many times as you like.
			</p>
			<Code code={L(intro)} />
			<ul>
				<li><code>def</code> starts a function. <code>greet</code> is its name.</li>
				<li>
					<code>name: str</code> is a <strong>parameter</strong>: something the function needs. The
					<code>: str</code> says it should be text.
				</li>
				<li><code>-> str</code> says the function <strong>returns</strong> text.</li>
				<li><code>return</code> sends the answer back to whoever called the function.</li>
				<li>
					Calling <code>greet("Ada")</code> runs the function with <code>name</code> set to
					<code>"Ada"</code>.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<p>
				En <strong>funktion</strong> er en kommando, du selv laver. Du giver den et navn, fortæller, hvad
				den skal bruge, og siger, hvad den skal give tilbage. Så kan du bruge den lige så mange gange,
				du vil.
			</p>
			<Code code={L(intro)} />
			<ul>
				<li><code>def</code> starter en funktion. <code>hils</code> er dens navn.</li>
				<li>
					<code>navn: str</code> er en <strong>parameter</strong>: noget, funktionen skal bruge.
					<code>: str</code> siger, at det skal være tekst.
				</li>
				<li><code>-> str</code> siger, at funktionen <strong>returnerer</strong> tekst.</li>
				<li><code>return</code> sender svaret tilbage til den, der kaldte funktionen.</li>
				<li>
					Når du kalder <code>hils("Ada")</code>, kører funktionen med <code>navn</code> sat til
					<code>"Ada"</code>.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 6 · Try it', 'Lektion 6 · Prøv selv')}
		title={t('Play with functions', 'Leg med funktioner')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>Call <code>greet</code> with your own name.</li>
				<li>
					Write a function <code>double(number: int) -> int</code> that returns the number times two.
				</li>
				<li>What does <code>print(cheer())</code> print, and why? (Hint: <code>-> None</code>)</li>
			</ul>
			<PyRunner id="functions-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så at:</p>
			<ul class="text-base">
				<li>Kalde <code>hils</code> med dit eget navn.</li>
				<li>
					Skrive en funktion <code>dobbelt(tal: int) -> int</code>, der returnerer tallet gange to.
				</li>
				<li>Hvad skriver <code>print(jubel())</code>, og hvorfor? (Hint: <code>-> None</code>)</li>
			</ul>
			<PyRunner id="functions-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 6 · Exercise', 'Lektion 6 · Opgave')}
		title={t('Two small functions', 'To små funktioner')}
	>
		{#snippet en()}
			<p>
				Finish the two functions. <code>is_even</code> should return <code>True</code> for even
				numbers. <code>biggest</code> should return the bigger of two numbers.
			</p>
			<PyRunner id="functions-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				Gør de to funktioner færdige. <code>er_lige</code> skal returnere <code>True</code> for lige
				tal. <code>stoerst</code> skal returnere det største af to tal.
			</p>
			<PyRunner id="functions-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 6', 'Lektion 6')}
		title={t('Add it to your project and test it', 'Læg det i dit projekt og test det')}
	>
		{#snippet en()}
			<p>
				Put <code>is_even</code> and <code>biggest</code> into <code>main.py</code> in your project. Then
				add tests:
			</p>
			<Code code={L(testFile)} label="tests/test_main.py" />
			<Code code="uv run pytest" />
			<p class="tip">
				That is exactly what the exercise checker on this page does: it calls your functions and
				checks the answers.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Læg <code>er_lige</code> og <code>stoerst</code> ind i <code>main.py</code> i dit projekt. Tilføj
				så tests:
			</p>
			<Code code={L(testFile)} label="tests/test_main.py" />
			<Code code="uv run pytest" />
			<p class="tip">
				Det er præcis det, opgavetjekket på denne side gør: det kalder dine funktioner og tjekker
				svarene.
			</p>
		{/snippet}
	</Slide>
</Deck>
