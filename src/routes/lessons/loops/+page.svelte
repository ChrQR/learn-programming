<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('loops');

	const example = {
		en: `# Repeat 5 times. i counts 0, 1, 2, 3, 4
for i in range(5):
    print("Ahoy!", i)

# Do something for each item in a list
crew = ["Ada", "Linus", "Grace"]
for name in crew:
    print(f"Welcome aboard, {name}!")

# Repeat while something is true
countdown = 3
while countdown > 0:
    print(countdown)
    countdown -= 1
print("Blast off! 🚀")

# break stops a loop early
for number in range(100):
    if number * number > 50:
        print(f"{number} is the first number whose square is over 50")
        break`,
		da: `# Gentag 5 gange. i tæller 0, 1, 2, 3, 4
for i in range(5):
    print("Ohøj!", i)

# Gør noget for hvert element i en liste
besaetning = ["Ada", "Linus", "Grace"]
for navn in besaetning:
    print(f"Velkommen om bord, {navn}!")

# Gentag, så længe noget er sandt
nedtaelling = 3
while nedtaelling > 0:
    print(nedtaelling)
    nedtaelling -= 1
print("Affyring! 🚀")

# break stopper en løkke før tid
for tal in range(100):
    if tal * tal > 50:
        print(f"{tal} er det første tal, hvis kvadrat er over 50")
        break`
	};

	const starter = {
		en: `# Print the 7 times table, from 1 to 10, one line each, like:
# 1 x 7 = 7
# 2 x 7 = 14
# ...

for i in range(1, 11):
    # print one line of the table here
    pass`,
		da: `# Skriv 7-tabellen ud, fra 1 til 10, én linje for hver, sådan her:
# 1 x 7 = 7
# 2 x 7 = 14
# ...

for i in range(1, 11):
    # skriv én linje af tabellen her
    pass`
	};

	const check = {
		en: `for i in range(1, 11):
    assert f"{i} x 7 = {i * 7}" in __output__, f"I am missing the line:  {i} x 7 = {i * 7}"
lines = [line.strip() for line in __output__.splitlines() if line.strip()]
assert len(lines) == 10, f"Print exactly 10 lines, one for each row (you printed {len(lines)})"`,
		da: `for i in range(1, 11):
    assert f"{i} x 7 = {i * 7}" in __output__, f"Jeg mangler linjen:  {i} x 7 = {i * 7}"
lines = [line.strip() for line in __output__.splitlines() if line.strip()]
assert len(lines) == 10, f"Skriv præcis 10 linjer, én for hver række (du skrev {len(lines)})"`
	};

	const hint = {
		en: 'Replace pass with: print(f"{i} x 7 = {i * 7}")',
		da: 'Erstat pass med: print(f"{i} x 7 = {i * 7}")'
	};

	const forEx = {
		en: `for i in range(3):\n    print(i)   # 0, 1, 2`,
		da: `for i in range(3):\n    print(i)   # 0, 1, 2`
	};
	const listEx = {
		en: `for name in ["Ada", "Linus"]:\n    print(name)`,
		da: `for navn in ["Ada", "Linus"]:\n    print(navn)`
	};
	const whileEx = {
		en: `lives = 3\nwhile lives > 0:\n    print("still playing")\n    lives -= 1`,
		da: `liv = 3\nwhile liv > 0:\n    print("spiller stadig")\n    liv -= 1`
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide kicker={t('Lesson 5', 'Lektion 5')} title={t('Loops', 'Løkker')}>
		{#snippet en()}
			<p>
				Computers are great at doing the same thing over and over. A <strong>loop</strong> is how we ask
				for that.
			</p>
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>for: a known number of times</h3>
					<Code code={L(forEx)} />
					<Code code={L(listEx)} />
				</div>
				<div class="card">
					<h3>while: as long as something is true</h3>
					<Code code={L(whileEx)} />
				</div>
			</div>
			<ul>
				<li>The indented lines are the <strong>body</strong> of the loop. They run every time.</li>
				<li><code>range(1, 11)</code> counts from 1 up to 10. The last number is not included.</li>
				<li><code>break</code> stops the loop immediately.</li>
			</ul>
			<p class="tip">
				A <code>while</code> loop where the condition never becomes false runs
				<strong>forever</strong>. If that happens, press the <strong>■ Stop</strong> button.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Computere er gode til at gøre det samme igen og igen. En <strong>løkke</strong> er sådan, vi beder
				om det.
			</p>
			<div class="grid gap-3 md:grid-cols-2">
				<div class="card">
					<h3>for: et bestemt antal gange</h3>
					<Code code={L(forEx)} />
					<Code code={L(listEx)} />
				</div>
				<div class="card">
					<h3>while: så længe noget er sandt</h3>
					<Code code={L(whileEx)} />
				</div>
			</div>
			<ul>
				<li>De indrykkede linjer er løkkens <strong>krop</strong>. De kører hver gang.</li>
				<li><code>range(1, 11)</code> tæller fra 1 op til 10. Det sidste tal er ikke med.</li>
				<li><code>break</code> stopper løkken med det samme.</li>
			</ul>
			<p class="tip">
				En <code>while</code>-løkke, hvor betingelsen aldrig bliver falsk, kører
				<strong>for evigt</strong>. Sker det, så tryk på knappen <strong>■ Stop</strong>.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 5 · Try it', 'Lektion 5 · Prøv selv')}
		title={t('Play with loops', 'Leg med løkker')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>
					Change <code>range(5)</code> to <code>range(10)</code>. Then to <code>range(2, 6)</code>.
				</li>
				<li>Add yourself to the crew.</li>
				<li>
					Remove the line <code>countdown -= 1</code> and run it. What happens? Press Stop, then put the
					line back.
				</li>
			</ul>
			<PyRunner id="loops-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så at:</p>
			<ul class="text-base">
				<li>
					Ændre <code>range(5)</code> til <code>range(10)</code>. Og så til
					<code>range(2, 6)</code>.
				</li>
				<li>Tilføje dig selv til besætningen.</li>
				<li>
					Fjerne linjen <code>nedtaelling -= 1</code> og køre det. Hvad sker der? Tryk Stop, og sæt linjen
					tilbage.
				</li>
			</ul>
			<PyRunner id="loops-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 5 · Exercise', 'Lektion 5 · Opgave')}
		title={t('The 7 times table', '7-tabellen')}
	>
		{#snippet en()}
			<p>
				Print the 7 times table from 1 × 7 to 10 × 7, one line per row, exactly like <code
					>3 x 7 = 21</code
				>.
			</p>
			<PyRunner id="loops-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				Skriv 7-tabellen ud fra 1 × 7 til 10 × 7, én linje per række, præcis som <code
					>3 x 7 = 21</code
				>.
			</p>
			<PyRunner id="loops-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>
</Deck>
