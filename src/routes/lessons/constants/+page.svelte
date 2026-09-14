<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import PyRunner from '$lib/py/PyRunner.svelte';
	import { lessonLinks } from '$lib/nav';
	import { t, L } from '$lib/i18n.svelte';

	const links = lessonLinks('constants');

	const example = {
		en: `from typing import Final

SECONDS_PER_MINUTE: Final = 60
MINUTES_PER_HOUR: Final = 60

minutes = 90
seconds = minutes * SECONDS_PER_MINUTE
print(f"{minutes} minutes is {seconds} seconds")

hours = minutes / MINUTES_PER_HOUR
print(f"{minutes} minutes is {hours} hours")`,
		da: `from typing import Final

SEKUNDER_PER_MINUT: Final = 60
MINUTTER_PER_TIME: Final = 60

minutter = 90
sekunder = minutter * SEKUNDER_PER_MINUT
print(f"{minutter} minutter er {sekunder} sekunder")

timer = minutter / MINUTTER_PER_TIME
print(f"{minutter} minutter er {timer} timer")`
	};

	const starter = {
		en: `from typing import Final

# Each cannon needs 3 cannonballs. Make that a constant called BALLS_PER_CANNON.
...

cannons = 8

# Calculate how many cannonballs the ship needs in total
total_balls = ...

print(f"{cannons} cannons need {total_balls} cannonballs")`,
		da: `from typing import Final

# Hver kanon skal bruge 3 kanonkugler. Lav det til en konstant, der hedder KUGLER_PER_KANON.
...

kanoner = 8

# Regn ud, hvor mange kanonkugler skibet skal bruge i alt
kugler_i_alt = ...

print(f"{kanoner} kanoner skal bruge {kugler_i_alt} kanonkugler")`
	};

	const check = {
		en: `assert "BALLS_PER_CANNON" in globals(), "Make a constant called BALLS_PER_CANNON (all capital letters)"
assert BALLS_PER_CANNON == 3, "BALLS_PER_CANNON should be 3"
assert "BALLS_PER_CANNON: Final" in __source__.replace(" ", "").replace(":Final", ": Final"), "Write it as  BALLS_PER_CANNON: Final = 3  so ty knows it must not change"
assert total_balls == 24, "total_balls should be cannons multiplied by BALLS_PER_CANNON (that is 24)"
assert "24" in __output__, "Print the total number of cannonballs"`,
		da: `assert "KUGLER_PER_KANON" in globals(), "Lav en konstant, der hedder KUGLER_PER_KANON (med store bogstaver)"
assert KUGLER_PER_KANON == 3, "KUGLER_PER_KANON skal være 3"
assert "KUGLER_PER_KANON: Final" in __source__.replace(" ", "").replace(":Final", ": Final"), "Skriv det som  KUGLER_PER_KANON: Final = 3  så ty ved, at den ikke må ændres"
assert kugler_i_alt == 24, "kugler_i_alt skal være kanoner ganget med KUGLER_PER_KANON (altså 24)"
assert "24" in __output__, "Skriv det samlede antal kanonkugler ud"`
	};

	const hint = {
		en: 'Write  BALLS_PER_CANNON: Final = 3  on the line with the ... and then  total_balls = cannons * BALLS_PER_CANNON',
		da: 'Skriv  KUGLER_PER_KANON: Final = 3  på linjen med ... og derefter  kugler_i_alt = kanoner * KUGLER_PER_KANON'
	};
</script>

<Deck prev={links.prev} next={links.next}>
	<Slide kicker={t('Lesson 2', 'Lektion 2')} title={t('Constants', 'Konstanter')}>
		{#snippet en()}
			<p>
				Some values should <strong>never change</strong> while the program runs: the number of seconds
				in a minute, the maximum number of players, the speed of light.
			</p>
			<Code
				code={`from typing import Final\n\nMAX_PLAYERS: Final = 4\nGAME_NAME: Final = "Treasure Hunt"`}
			/>
			<ul>
				<li>
					Constants are written in <strong>CAPITAL_LETTERS</strong>. That tells other programmers:
					"do not change this".
				</li>
				<li>
					Python does not lock the box by itself. Adding <code>: Final</code> tells
					<strong>ty</strong> to warn you in Zed if you accidentally change it anyway.
				</li>
				<li>
					Why bother? If the number 60 is used in ten places and you write <code
						>SECONDS_PER_MINUTE</code
					> instead, everyone can see what the number means.
				</li>
			</ul>
		{/snippet}
		{#snippet da()}
			<p>
				Nogle værdier må <strong>aldrig ændre sig</strong>, mens programmet kører: antallet af
				sekunder i et minut, det højeste antal spillere, lysets hastighed.
			</p>
			<Code
				code={`from typing import Final\n\nMAX_SPILLERE: Final = 4\nSPIL_NAVN: Final = "Skattejagt"`}
			/>
			<ul>
				<li>
					Konstanter skrives med <strong>STORE_BOGSTAVER</strong>. Det fortæller andre programmører:
					"lad være med at ændre den her".
				</li>
				<li>
					Python låser ikke kassen af sig selv. Skriver du <code>: Final</code>, advarer
					<strong>ty</strong> dig i Zed, hvis du alligevel kommer til at ændre den.
				</li>
				<li>
					Hvorfor gøre det? Hvis tallet 60 bruges ti steder, og du skriver <code
						>SEKUNDER_PER_MINUT</code
					> i stedet, kan alle se, hvad tallet betyder.
				</li>
			</ul>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 2 · Try it', 'Lektion 2 · Prøv selv')}
		title={t('Play with constants', 'Leg med konstanter')}
	>
		{#snippet en()}
			<p>Press <strong>Run</strong>, then try to:</p>
			<ul class="text-base">
				<li>Change <code>minutes</code> to 120. What do you get?</li>
				<li>
					Add a constant <code>HOURS_PER_DAY</code> and print how many minutes there are in a day.
				</li>
				<li>
					Add <code>SECONDS_PER_MINUTE = 100</code> at the bottom. Python allows it here, but Zed with
					ty would underline it. Try it in Zed later!
				</li>
			</ul>
			<PyRunner id="constants-example" code={L(example)} />
		{/snippet}
		{#snippet da()}
			<p>Tryk <strong>Kør</strong>, og prøv så at:</p>
			<ul class="text-base">
				<li>Ændre <code>minutter</code> til 120. Hvad får du?</li>
				<li>
					Tilføje en konstant <code>TIMER_PER_DAG</code> og skrive ud, hvor mange minutter der er på en
					dag.
				</li>
				<li>
					Tilføje <code>SEKUNDER_PER_MINUT = 100</code> nederst. Python tillader det her, men Zed med
					ty ville understrege det. Prøv det i Zed senere!
				</li>
			</ul>
			<PyRunner id="constants-example" code={L(example)} />
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Lesson 2 · Exercise', 'Lektion 2 · Opgave')}
		title={t('Cannonballs', 'Kanonkugler')}
	>
		{#snippet en()}
			<p>
				A pirate ship has 8 cannons, and each cannon needs 3 cannonballs. Make a constant <code
					>BALLS_PER_CANNON</code
				>, calculate <code>total_balls</code>, and print the answer.
			</p>
			<PyRunner id="constants-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
		{#snippet da()}
			<p>
				Et piratskib har 8 kanoner, og hver kanon skal bruge 3 kanonkugler. Lav en konstant <code
					>KUGLER_PER_KANON</code
				>, regn <code>kugler_i_alt</code> ud, og skriv svaret ud.
			</p>
			<PyRunner id="constants-exercise" code={L(starter)} check={L(check)} hint={L(hint)} />
		{/snippet}
	</Slide>
</Deck>
