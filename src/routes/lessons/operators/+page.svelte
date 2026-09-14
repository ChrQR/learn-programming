<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('operators');

	const example = {
		en: `# Math
print(7 + 3, 7 - 3, 7 * 3)
print(7 / 2)     # division always gives a decimal: 3.5
print(7 // 2)    # whole-number division: 3
print(7 % 2)     # the remainder: 1
print(2 ** 10)   # 2 to the power of 10: 1024

# Comparing gives True or False
gold = 50
print(gold > 30)
print(gold == 50 and gold < 100)
print(not gold > 30)

# Deciding with if / elif / else
if gold >= 100:
    print("You are rich!")
elif gold >= 50:
    print("Not bad!")
else:
    print("Keep looking for treasure.")

gold += 25   # short for: gold = gold + 25
print(gold)`,
		da: `# Regning
print(7 + 3, 7 - 3, 7 * 3)
print(7 / 2)     # division giver altid et decimaltal: 3.5
print(7 // 2)    # heltalsdivision: 3
print(7 % 2)     # resten: 1
print(2 ** 10)   # 2 opløftet i 10: 1024

# Sammenligning giver True eller False
guld = 50
print(guld > 30)
print(guld == 50 and guld < 100)
print(not guld > 30)

# At beslutte med if / elif / else
if guld >= 100:
    print("Du er rig!")
elif guld >= 50:
    print("Ikke dårligt!")
else:
    print("Bliv ved med at lede efter skatte.")

guld += 25   # kort for: guld = guld + 25
print(guld)`
	};

	const starter = {
		en: `# Share the treasure fairly!
coins = 100
pirates = 7

each = ...        # how many whole coins does each pirate get?
left_over = ...   # how many coins are left over?

print(f"Each pirate gets {each} coins, and {left_over} are left over.")

if left_over > 0:
    print("The captain keeps the rest!")`,
		da: `# Del skatten retfærdigt!
moenter = 100
pirater = 7

hver = ...   # hvor mange hele mønter får hver pirat?
rest = ...   # hvor mange mønter er der tilovers?

print(f"Hver pirat får {hver} mønter, og {rest} er tilovers.")

if rest > 0:
    print("Kaptajnen beholder resten!")`
	};

	const check = {
		en: `assert each == 14, "each should be 14. Use // to divide and keep only whole coins"
assert left_over == 2, "left_over should be 2. Use % to get the remainder"
assert "14" in __output__ and "2 are left over" in __output__, "Print both numbers"`,
		da: `assert hver == 14, "hver skal være 14. Brug // til at dividere og kun beholde hele mønter"
assert rest == 2, "rest skal være 2. Brug % til at få resten"
assert "14" in __output__ and "2 er tilovers" in __output__, "Skriv begge tal ud"`
	};

	const hint = {
		en: 'each = coins // pirates gives whole coins. left_over = coins % pirates gives what is left.',
		da: 'hver = moenter // pirater giver hele mønter. rest = moenter % pirater giver det, der er tilovers.'
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide
		kicker={t('Lesson 4', 'Lektion 4')}
		title={t('Operators and decisions', 'Operatorer og beslutninger')}
	>
		{#snippet en()}
			<p><strong>Operators</strong> are the symbols that do something with values.</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>Math</h3>
					<p><code>+</code> <code>-</code> <code>*</code> <code>/</code></p>
					<p><code>//</code> whole division, <code>%</code> remainder, <code>**</code> power</p>
				</div>
				<div class="card">
					<h3>Comparing</h3>
					<p><code>==</code> equal, <code>!=</code> not equal</p>
					<p><code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code></p>
					<p>The answer is always <code>True</code> or <code>False</code>.</p>
				</div>
				<div class="card">
					<h3>Combining</h3>
					<p><code>and</code> both must be true</p>
					<p><code>or</code> at least one</p>
					<p><code>not</code> flips it</p>
				</div>
			</div>
			<p>
				Comparisons are how a program <strong>decides</strong> things, with <code>if</code>.
				Everything indented under the <code>if</code> only runs when the comparison is
				<code>True</code>.
			</p>
			<Code
				code={`if gold >= 100:\n    print("You are rich!")\nelse:\n    print("Keep looking.")`}
			/>
		{/snippet}
		{#snippet da()}
			<p><strong>Operatorer</strong> er de tegn, der gør noget med værdier.</p>
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>Regning</h3>
					<p><code>+</code> <code>-</code> <code>*</code> <code>/</code></p>
					<p><code>//</code> heltalsdivision, <code>%</code> rest, <code>**</code> potens</p>
				</div>
				<div class="card">
					<h3>Sammenligning</h3>
					<p><code>==</code> lig med, <code>!=</code> ikke lig med</p>
					<p><code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code></p>
					<p>Svaret er altid <code>True</code> eller <code>False</code>.</p>
				</div>
				<div class="card">
					<h3>Kombination</h3>
					<p><code>and</code> begge skal være sande</p>
					<p><code>or</code> mindst én</p>
					<p><code>not</code> vender det om</p>
				</div>
			</div>
			<p>
				Sammenligninger er sådan, et program <strong>beslutter</strong> ting, med <code>if</code>.
				Alt, der er rykket ind under <code>if</code>, kører kun, når sammenligningen er
				<code>True</code>.
			</p>
			<Code code={`if guld >= 100:\n    print("Du er rig!")\nelse:\n    print("Led videre.")`} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 4 · Try it', 'Lektion 4 · Prøv selv')}
		title={t('Play with operators', 'Leg med operatorer')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>What is <code>17 % 5</code>? Guess first, then check.</li>
				<li>Change <code>gold</code> so that "You are rich!" is printed.</li>
				<li>
					Watch out: <code>=</code> puts a value in a box, <code>==</code> asks "are they equal?".
					Try <code>if gold = 50:</code> and read the error.
				</li>
			</ul>
			<PyRunner id="operators-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så:</p>
			<ul class="text-base">
				<li>Hvad er <code>17 % 5</code>? Gæt først, og tjek så.</li>
				<li>Ændr <code>guld</code>, så der bliver skrevet "Du er rig!".</li>
				<li>
					Pas på: <code>=</code> lægger en værdi i en kasse, <code>==</code> spørger "er de ens?".
					Prøv <code>if guld = 50:</code> og læs fejlen.
				</li>
			</ul>
			<PyRunner id="operators-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 4 · Exercise', 'Lektion 4 · Opgave')}
		title={t('Share the treasure', 'Del skatten')}
	>
		{#snippet en()}
			<p>
				100 gold coins must be shared between 7 pirates. Everyone gets the same number of whole
				coins. How many does each get, and how many are left over for the captain?
			</p>
			<PyRunner id="operators-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				100 guldmønter skal deles mellem 7 pirater. Alle får det samme antal hele mønter. Hvor mange
				får hver, og hvor mange er der tilovers til kaptajnen?
			</p>
			<PyRunner id="operators-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>
</Deck>
