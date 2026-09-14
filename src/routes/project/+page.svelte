<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import OsTabs from '$lib/deck/OsTabs.svelte';
	import { t, L } from '$lib/i18n.svelte';

	const tree = {
		en: `learn-python/
├── .git/              ← history of your changes (hidden folder)
├── .gitignore         ← files git should ignore
├── .python-version    ← which Python version this project uses
├── README.md          ← a description of the project
├── main.py            ← your program starts here
└── pyproject.toml     ← the project's name, settings and packages`,
		da: `learn-python/
├── .git/              ← historik over dine ændringer (skjult mappe)
├── .gitignore         ← filer, git skal ignorere
├── .python-version    ← hvilken Python-version projektet bruger
├── README.md          ← en beskrivelse af projektet
├── main.py            ← dit program starter her
└── pyproject.toml     ← projektets navn, indstillinger og pakker`
	};

	const mainPy = `def greet(name: str) -> str:
    return f"Hello, {name}!"


def main() -> None:
    print(greet("pirate"))


if __name__ == "__main__":
    main()`;

	const testPy = `from main import greet


def test_greet():
    assert greet("Ada") == "Hello, Ada!"`;

	const pytestConfig = `[tool.pytest.ini_options]
pythonpath = ["."]`;
</script>

<Deck
	prev={{ href: '/setup', label: { en: 'Setup', da: 'Opsætning' } }}
	next={{ href: '/lessons', label: { en: 'Start the lessons', da: 'Start lektionerne' } }}
>
	<Slide
		kicker={t('First project', 'Første projekt')}
		title={t('Create your first project', 'Lav dit første projekt')}
	>
		{#snippet en()}
			<p>
				We now create the project you will use during the whole introduction. Every lesson ends with
				something you can add to it.
			</p>
			<ol>
				<li>Create the project with uv</li>
				<li>Run it</li>
				<li>Open it in Zed</li>
				<li>Add pytest and write your first test</li>
				<li>Check your code with ruff and ty</li>
				<li>Bonus: put it on GitHub</li>
			</ol>
		{/snippet}
		{#snippet da()}
			<p>
				Nu laver vi det projekt, du skal bruge gennem hele introduktionen. Hver lektion slutter med
				noget, du kan tilføje til det.
			</p>
			<ol>
				<li>Lav projektet med uv</li>
				<li>Kør det</li>
				<li>Åbn det i Zed</li>
				<li>Tilføj pytest og skriv din første test</li>
				<li>Tjek din kode med ruff og ty</li>
				<li>Bonus: læg det på GitHub</li>
			</ol>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('First project · 1', 'Første projekt · 1')}
		title={t('Create the project', 'Lav projektet')}
	>
		{#snippet en()}
			<p>Open a terminal and go to the folder where you keep your stuff, for example Documents:</p>
			<OsTabs>
				{#snippet linux()}<Code code="cd ~/Documents" />{/snippet}
				{#snippet macos()}<Code code="cd ~/Documents" />{/snippet}
				{#snippet windows()}<Code code="cd ~\Documents" />{/snippet}
			</OsTabs>
			<p>Then let uv create the project and step into it:</p>
			<Code code={`uv init --no-package learn-python\ncd learn-python`} />
			<p class="text-base">
				<code>--no-package</code> keeps things simple: your code lives right in the folder, in
				<code>main.py</code>. Without it, uv puts the code in a <code>src/</code> folder instead, which
				you will meet in the last lesson.
			</p>
			<p>uv made a folder with these files:</p>
			<Code code={L(tree)} />
		{/snippet}
		{#snippet da()}
			<p>Åbn en terminal og gå til den mappe, hvor du har dine ting, for eksempel Dokumenter:</p>
			<OsTabs>
				{#snippet linux()}<Code code="cd ~/Documents" />{/snippet}
				{#snippet macos()}<Code code="cd ~/Documents" />{/snippet}
				{#snippet windows()}<Code code="cd ~\Documents" />{/snippet}
			</OsTabs>
			<p>Lad så uv lave projektet, og gå ind i det:</p>
			<Code code={`uv init --no-package learn-python\ncd learn-python`} />
			<p class="text-base">
				<code>--no-package</code> holder det simpelt: din kode ligger direkte i mappen, i
				<code>main.py</code>. Uden det lægger uv koden i en <code>src/</code>-mappe i stedet, og den
				møder du i den sidste lektion.
			</p>
			<p>uv har lavet en mappe med disse filer:</p>
			<Code code={L(tree)} />
		{/snippet}
	</Slide>

	<Slide kicker={t('First project · 2', 'Første projekt · 2')} title={t('Run it', 'Kør det')}>
		{#snippet en()}
			<Code code="uv run main.py" />
			<p>
				The first time, uv downloads Python and sets everything up. That can take a minute. Then you
				should see:
			</p>
			<Code code="Hello from learn-python!" />
			<p class="tip">
				<code>uv run</code> is how we always start programs in this course. It makes sure the right Python
				and the right packages are used.
			</p>
		{/snippet}
		{#snippet da()}
			<Code code="uv run main.py" />
			<p>
				Første gang henter uv Python og sætter det hele op. Det kan tage et minut. Så skulle du
				gerne se:
			</p>
			<Code code="Hello from learn-python!" />
			<p class="tip">
				<code>uv run</code> er sådan, vi altid starter programmer på dette kursus. Det sørger for, at
				den rigtige Python og de rigtige pakker bliver brugt.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('First project · 3', 'Første projekt · 3')}
		title={t('Open it in Zed', 'Åbn det i Zed')}
	>
		{#snippet en()}
			<OsTabs>
				{#snippet linux()}
					<p>In the terminal, inside the project folder:</p>
					<Code code="zed ." />
				{/snippet}
				{#snippet macos()}
					<p>
						Open Zed, choose <strong>File → Open…</strong> and pick the <code>learn-python</code> folder.
					</p>
					<p class="text-base">
						Tip: in Zed's command palette, run <strong>cli: install</strong>. After that you can
						type <code>zed .</code> in the terminal to open the current folder.
					</p>
				{/snippet}
				{#snippet windows()}
					<p>
						Open Zed, choose <strong>File → Open Folder…</strong> and pick the
						<code>learn-python</code> folder.
					</p>
				{/snippet}
			</OsTabs>
			<p>
				Open <code>main.py</code> in the file list on the left. Replace everything in it with this:
			</p>
			<Code code={mainPy} label="main.py" />
			<p>
				Save with <kbd>Ctrl</kbd> + <kbd>S</kbd> (Mac: <kbd>⌘</kbd> + <kbd>S</kbd>) and run it again
				with <code>uv run main.py</code>.
			</p>
		{/snippet}
		{#snippet da()}
			<OsTabs>
				{#snippet linux()}
					<p>I terminalen, inde i projektmappen:</p>
					<Code code="zed ." />
				{/snippet}
				{#snippet macos()}
					<p>
						Åbn Zed, vælg <strong>File → Open…</strong> og vælg mappen <code>learn-python</code>.
					</p>
					<p class="text-base">
						Tip: kør <strong>cli: install</strong> i Zeds kommandopalet. Derefter kan du skrive
						<code>zed .</code> i terminalen for at åbne den mappe, du står i.
					</p>
				{/snippet}
				{#snippet windows()}
					<p>
						Åbn Zed, vælg <strong>File → Open Folder…</strong> og vælg mappen
						<code>learn-python</code>.
					</p>
				{/snippet}
			</OsTabs>
			<p>Åbn <code>main.py</code> i fillisten til venstre. Erstat alt i den med dette:</p>
			<Code code={mainPy} label="main.py" />
			<p>
				Gem med <kbd>Ctrl</kbd> + <kbd>S</kbd> (Mac: <kbd>⌘</kbd> + <kbd>S</kbd>) og kør det igen
				med <code>uv run main.py</code>.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('First project · 4', 'Første projekt · 4')}
		title={t('Add pytest and write a test', 'Tilføj pytest og skriv en test')}
	>
		{#snippet en()}
			<p>A test is a small program that checks that your code works. Add pytest to the project:</p>
			<Code code="uv add --dev pytest" />
			<p>Make a folder called <code>tests</code> with a file <code>test_main.py</code> inside:</p>
			<Code code={testPy} label="tests/test_main.py" />
			<p>
				Add these two lines at the bottom of <code>pyproject.toml</code>, so pytest knows where your
				code lives:
			</p>
			<Code code={pytestConfig} label="pyproject.toml" />
			<p>Now run the tests:</p>
			<Code code="uv run pytest" />
			<p>
				You should see <strong>1 passed</strong> in green. Try changing <code>"Hello, Ada!"</code> in
				the test and run it again. What happens?
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				En test er et lille program, der tjekker, at din kode virker. Tilføj pytest til projektet:
			</p>
			<Code code="uv add --dev pytest" />
			<p>Lav en mappe, der hedder <code>tests</code>, med en fil <code>test_main.py</code> i:</p>
			<Code code={testPy} label="tests/test_main.py" />
			<p>
				Tilføj disse to linjer nederst i <code>pyproject.toml</code>, så pytest ved, hvor din kode
				er:
			</p>
			<Code code={pytestConfig} label="pyproject.toml" />
			<p>Kør nu testene:</p>
			<Code code="uv run pytest" />
			<p>
				Du skulle gerne se <strong>1 passed</strong> med grønt. Prøv at ændre
				<code>"Hello, Ada!"</code> i testen og kør den igen. Hvad sker der?
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('First project · 5', 'Første projekt · 5')}
		title={t('Check your code with ruff and ty', 'Tjek din kode med ruff og ty')}
	>
		{#snippet en()}
			<p>ruff looks for mistakes and untidy code. ty checks that the types make sense.</p>
			<Code code={`ruff check .\nruff format .\nty check`} />
			<p>
				Try to break something on purpose. In <code>main.py</code>, change the last line of
				<code>greet</code> to:
			</p>
			<Code code={`    return f"Hello, {name}!" + 1`} />
			<p>
				Zed should underline it in red before you even run it. That is ty telling you that you
				cannot add a number to text. Change it back afterwards.
			</p>
		{/snippet}
		{#snippet da()}
			<p>ruff leder efter fejl og rodet kode. ty tjekker, at typerne giver mening.</p>
			<Code code={`ruff check .\nruff format .\nty check`} />
			<p>
				Prøv at ødelægge noget med vilje. Ændr den sidste linje i <code>greet</code> i
				<code>main.py</code> til:
			</p>
			<Code code={`    return f"Hello, {name}!" + 1`} />
			<p>
				Zed skulle gerne understrege den med rødt, før du overhovedet kører den. Det er ty, der
				fortæller dig, at du ikke kan lægge et tal til tekst. Ret det tilbage bagefter.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('First project · 6', 'Første projekt · 6')}
		title={t('Bonus: put it on GitHub', 'Bonus: læg det på GitHub')}
	>
		{#snippet en()}
			<p>uv already prepared git for you. Save a snapshot of your project:</p>
			<Code code={`git add .\ngit commit -m "My first project"`} />
			<p>
				You logged in with the GitHub CLI during setup, so one command creates the repository on
				GitHub and uploads your code:
			</p>
			<Code code="gh repo create learn-python --source=. --public --push" />
			<p>Then open it in the browser:</p>
			<Code code="gh repo view --web" />
			<p>
				Your code is online! 🎉 Next time you change something, it is just <code>git add .</code>,
				<code>git commit -m "what I did"</code>
				and <code>git push</code>.
			</p>
			<p class="tip">
				If <code>gh</code> says you are not logged in, run <code>gh auth login</code> again like in the
				setup.
			</p>
		{/snippet}
		{#snippet da()}
			<p>uv har allerede gjort git klar for dig. Gem et øjebliksbillede af dit projekt:</p>
			<Code code={`git add .\ngit commit -m "Mit første projekt"`} />
			<p>
				Du loggede ind med GitHub CLI under opsætningen, så én kommando laver repositoriet på GitHub
				og lægger din kode op:
			</p>
			<Code code="gh repo create learn-python --source=. --public --push" />
			<p>Åbn det så i browseren:</p>
			<Code code="gh repo view --web" />
			<p>
				Din kode er online! 🎉 Næste gang du ændrer noget, er det bare <code>git add .</code>,
				<code>git commit -m "hvad jeg gjorde"</code>
				og <code>git push</code>.
			</p>
			<p class="tip">
				Siger <code>gh</code>, at du ikke er logget ind, så kør <code>gh auth login</code> igen ligesom
				i opsætningen.
			</p>
		{/snippet}
	</Slide>
</Deck>
