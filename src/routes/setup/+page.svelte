<script lang="ts">
	import Deck from '$lib/deck/Deck.svelte';
	import Slide from '$lib/deck/Slide.svelte';
	import Code from '$lib/deck/Code.svelte';
	import OsTabs from '$lib/deck/OsTabs.svelte';
	import { t } from '$lib/i18n.svelte';

	const uvWindows =
		'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"';

	const zedSettings = `{
  "languages": {
    "Python": {
      "language_servers": ["ty", "ruff"],
      "format_on_save": "on",
      "formatter": {
        "language_server": { "name": "ruff" }
      },
      "code_actions_on_format": {
        "source.organizeImports.ruff": true,
        "source.fixAll.ruff": true
      }
    }
  }
}`;
</script>

<Deck
	prev={{ href: '/', label: { en: 'Intro', da: 'Intro' } }}
	next={{
		href: '/project',
		label: { en: 'Create your first project', da: 'Lav dit første projekt' }
	}}
>
	<Slide kicker={t('Setup', 'Opsætning')} title={t('Set up your tools', 'Sæt dine værktøjer op')}>
		{#snippet en()}
			<p>
				Six steps. Do them in order, and ask for help if something looks different on your screen.
			</p>
			<ol>
				<li>Create a <strong>GitHub</strong> account</li>

				<li>Install <strong>git</strong> and the <strong>GitHub CLI</strong>, and log in</li>

				<li>Install <strong>Zed</strong></li>
				<li>Install <strong>uv</strong></li>
				<li>Install <strong>ruff</strong>, <strong>ty</strong> and <strong>pytest</strong></li>
				<li>Set up Zed to use ruff and ty</li>
			</ol>
			<p class="tip">
				Many steps use the <strong>terminal</strong>: a window where you type commands. The next
				slide shows how to open it on your computer.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Seks trin. Tag dem i rækkefølge, og bed om hjælp, hvis noget ser anderledes ud på din skærm.
			</p>
			<ol>
				<li>Opret en <strong>GitHub</strong>-konto</li>

				<li>Installér <strong>git</strong> og <strong>GitHub CLI</strong>, og log ind</li>

				<li>Installér <strong>Zed</strong></li>
				<li>Installér <strong>uv</strong></li>
				<li>Installér <strong>ruff</strong>, <strong>ty</strong> og <strong>pytest</strong></li>
				<li>Sæt Zed op til at bruge ruff og ty</li>
			</ol>
			<p class="tip">
				Mange trin bruger <strong>terminalen</strong>: et vindue, hvor du skriver kommandoer. Næste
				slide viser, hvordan du åbner den på din computer.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Setup', 'Opsætning')}
		title={t('Which computer do you have?', 'Hvilken computer har du?')}
	>
		{#snippet en()}
			<p>Pick your operating system. The rest of the slides will show the right commands for it.</p>
			<OsTabs>
				{#snippet linux()}
					<p>
						<strong>Open a terminal:</strong> press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>,
						or search for "Terminal" in your app menu.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						<strong>Open a terminal:</strong> press <kbd>⌘</kbd> + <kbd>Space</kbd>, type
						<strong>Terminal</strong>
						and press <kbd>Enter</kbd>.
					</p>
				{/snippet}
				{#snippet windows()}
					<p>
						<strong>Open a terminal:</strong> press the <kbd>Windows</kbd> key, type
						<strong>PowerShell</strong>
						and press <kbd>Enter</kbd>.
					</p>
				{/snippet}
			</OsTabs>
			<p class="tip">
				When a slide shows a command in a box, press <strong>Copy</strong>, paste it into the
				terminal and press <kbd>Enter</kbd>.
			</p>
		{/snippet}
		{#snippet da()}
			<p>Vælg dit styresystem. Resten af sliderne viser så de rigtige kommandoer til det.</p>
			<OsTabs>
				{#snippet linux()}
					<p>
						<strong>Åbn en terminal:</strong> tryk <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>,
						eller søg efter "Terminal" i din app-menu.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						<strong>Åbn en terminal:</strong> tryk <kbd>⌘</kbd> + <kbd>Mellemrum</kbd>, skriv
						<strong>Terminal</strong>
						og tryk <kbd>Enter</kbd>.
					</p>
				{/snippet}
				{#snippet windows()}
					<p>
						<strong>Åbn en terminal:</strong> tryk på <kbd>Windows</kbd>-tasten, skriv
						<strong>PowerShell</strong>
						og tryk <kbd>Enter</kbd>.
					</p>
				{/snippet}
			</OsTabs>
			<p class="tip">
				Når en slide viser en kommando i en boks, så tryk <strong>Kopiér</strong>, sæt den ind i
				terminalen og tryk <kbd>Enter</kbd>.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Step 1 of 6', 'Trin 1 af 6')}
		title={t('Create a GitHub account', 'Opret en GitHub-konto')}
	>
		{#snippet en()}
			<p>
				GitHub is where developers keep their code. These lessons live there too, and you will use
				it to save your own projects and show them to others.
			</p>
			<ol>
				<li>
					Go to <a href="https://github.com/signup" target="_blank" rel="noreferrer"
						>github.com/signup</a
					>
				</li>
				<li>
					Choose a <strong>username</strong>. Other people will see it, and it is hard to change, so
					pick something you will still like in a few years.
				</li>
				<li>Use an email address you can open, because GitHub sends you a code to confirm it.</li>
				<li>Pick a strong password and write it down somewhere safe.</li>
			</ol>
			<p class="tip">
				You need to be at least 13 years old to have a GitHub account. If you are younger, tell your
				instructor and we will find another way to save your code.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				GitHub er der, hvor udviklere gemmer deres kode. Disse lektioner bor der også, og du skal
				bruge det til at gemme dine egne projekter og vise dem til andre.
			</p>
			<ol>
				<li>
					Gå til <a href="https://github.com/signup" target="_blank" rel="noreferrer"
						>github.com/signup</a
					>
				</li>
				<li>
					Vælg et <strong>brugernavn</strong>. Andre kan se det, og det er svært at ændre, så vælg
					noget, du stadig kan lide om nogle år.
				</li>
				<li>
					Brug en e-mailadresse, du kan åbne, for GitHub sender dig en kode for at bekræfte den.
				</li>
				<li>Vælg et stærkt kodeord og skriv det ned et sikkert sted.</li>
			</ol>
			<p class="tip">
				Du skal være mindst 13 år for at have en GitHub-konto. Er du yngre, så sig det til din
				underviser, så finder vi en anden måde at gemme din kode på.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Step 2 of 6', 'Trin 2 af 6')}
		title={t('Install git and the GitHub CLI', 'Installér git og GitHub CLI')}
	>
		{#snippet en()}
			<p>
				<strong>git</strong> copies code to and from GitHub. The <strong>GitHub CLI</strong> (<code
					>gh</code
				>) logs you in, so git never asks for passwords.
			</p>
			<OsTabs>
				{#snippet linux()}
					<p>On Ubuntu or Debian:</p>
					<Code code="sudo apt install git gh" />
					<p class="text-base">
						Other Linux? See <a
							href="https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
							target="_blank"
							rel="noreferrer">the gh install guide</a
						> or ask your instructor.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						First git. Run this and click <strong>Install</strong> in the window that pops up (skip it
						if it says git is already installed):
					</p>
					<Code code="xcode-select --install" />
					<p>Then gh, with Homebrew:</p>
					<Code code="brew install gh" />
				{/snippet}
				{#snippet windows()}
					<Code code={`winget install --id Git.Git -e\nwinget install --id GitHub.cli -e`} />
					<p class="text-base">Then close PowerShell and open a new one.</p>
				{/snippet}
			</OsTabs>
			<p>Now log in. Answer the questions like this:</p>
			<Code code="gh auth login" />
			<ol class="text-base">
				<li><strong>Where do you use GitHub?</strong> GitHub.com</li>
				<li><strong>Preferred protocol?</strong> HTTPS</li>
				<li><strong>Authenticate Git with your GitHub credentials?</strong> Yes</li>
				<li><strong>How would you like to authenticate?</strong> Login with a web browser</li>
				<li>
					Copy the code it shows, press <kbd>Enter</kbd>, paste the code in the browser and click
					<strong>Authorize</strong>.
				</li>
			</ol>
			<p><strong>Check:</strong> <code>gh auth status</code> should say you are logged in.</p>
		{/snippet}
		{#snippet da()}
			<p>
				<strong>git</strong> kopierer kode til og fra GitHub. <strong>GitHub CLI</strong> (<code
					>gh</code
				>) logger dig ind, så git aldrig spørger om kodeord.
			</p>
			<OsTabs>
				{#snippet linux()}
					<p>På Ubuntu eller Debian:</p>
					<Code code="sudo apt install git gh" />
					<p class="text-base">
						Andet Linux? Se <a
							href="https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
							target="_blank"
							rel="noreferrer">gh's installationsguide</a
						> eller spørg din underviser.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						Først git. Kør dette og klik på <strong>Installér</strong> i det vindue, der dukker op (spring
						over, hvis den siger, at git allerede er installeret):
					</p>
					<Code code="xcode-select --install" />
					<p>Så gh, med Homebrew:</p>
					<Code code="brew install gh" />
				{/snippet}
				{#snippet windows()}
					<Code code={`winget install --id Git.Git -e\nwinget install --id GitHub.cli -e`} />
					<p class="text-base">Luk så PowerShell og åbn en ny.</p>
				{/snippet}
			</OsTabs>
			<p>Log nu ind. Svar sådan her på spørgsmålene:</p>
			<Code code="gh auth login" />
			<ol class="text-base">
				<li><strong>Where do you use GitHub?</strong> GitHub.com</li>
				<li><strong>Preferred protocol?</strong> HTTPS</li>
				<li><strong>Authenticate Git with your GitHub credentials?</strong> Yes</li>
				<li><strong>How would you like to authenticate?</strong> Login with a web browser</li>
				<li>
					Kopiér den kode, den viser, tryk <kbd>Enter</kbd>, sæt koden ind i browseren og klik på
					<strong>Authorize</strong>.
				</li>
			</ol>
			<p><strong>Tjek:</strong> <code>gh auth status</code> skal sige, at du er logget ind.</p>
		{/snippet}
	</Slide>

	<Slide kicker={t('Step 3 of 6', 'Trin 3 af 6')} title={t('Install Zed', 'Installér Zed')}>
		{#snippet en()}
			<p>
				Zed is the editor where we write code. It is fast, and it understands Python, JavaScript and
				Go.
			</p>
			<OsTabs>
				{#snippet linux()}
					<p>Paste this in the terminal:</p>
					<Code code="curl -f https://zed.dev/install.sh | sh" />
					<p>
						Then start Zed by typing <code>zed</code> in the terminal, or find it in your app menu.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						Download it from <a href="https://zed.dev/download" target="_blank" rel="noreferrer"
							>zed.dev/download</a
						>, open the file and drag Zed into <strong>Applications</strong>.
					</p>
					<p>If you have Homebrew, you can use the terminal instead:</p>
					<Code code="brew install --cask zed" />
				{/snippet}
				{#snippet windows()}
					<p>
						Download the installer from <a
							href="https://zed.dev/download"
							target="_blank"
							rel="noreferrer">zed.dev/download</a
						> and run it. Or paste this in PowerShell:
					</p>
					<Code code="winget install -e --id ZedIndustries.Zed" />
				{/snippet}
			</OsTabs>
			<p><strong>Check:</strong> open Zed. You should see a welcome screen.</p>
		{/snippet}
		{#snippet da()}
			<p>
				Zed er den editor, vi skriver kode i. Den er hurtig, og den forstår Python, JavaScript og
				Go.
			</p>
			<OsTabs>
				{#snippet linux()}
					<p>Sæt dette ind i terminalen:</p>
					<Code code="curl -f https://zed.dev/install.sh | sh" />
					<p>
						Start derefter Zed ved at skrive <code>zed</code> i terminalen, eller find den i din app-menu.
					</p>
				{/snippet}
				{#snippet macos()}
					<p>
						Hent den fra <a href="https://zed.dev/download" target="_blank" rel="noreferrer"
							>zed.dev/download</a
						>, åbn filen og træk Zed ind i <strong>Programmer</strong>.
					</p>
					<p>Har du Homebrew, kan du bruge terminalen i stedet:</p>
					<Code code="brew install --cask zed" />
				{/snippet}
				{#snippet windows()}
					<p>
						Hent installationsprogrammet fra <a
							href="https://zed.dev/download"
							target="_blank"
							rel="noreferrer">zed.dev/download</a
						> og kør det. Eller sæt dette ind i PowerShell:
					</p>
					<Code code="winget install -e --id ZedIndustries.Zed" />
				{/snippet}
			</OsTabs>
			<p><strong>Tjek:</strong> åbn Zed. Du skulle gerne se en velkomstskærm.</p>
		{/snippet}
	</Slide>

	<Slide kicker={t('Step 4 of 6', 'Trin 4 af 6')} title={t('Install uv', 'Installér uv')}>
		{#snippet en()}
			<p>
				uv installs Python for you, creates projects, and keeps track of the packages each project
				uses. One tool instead of five.
			</p>
			<OsTabs>
				{#snippet linux()}
					<Code code="curl -LsSf https://astral.sh/uv/install.sh | sh" />
				{/snippet}
				{#snippet macos()}
					<Code code="curl -LsSf https://astral.sh/uv/install.sh | sh" />
					<p class="text-base">Or, with Homebrew: <code>brew install uv</code></p>
				{/snippet}
				{#snippet windows()}
					<Code code={uvWindows} />
					<p class="text-base">Or: <code>winget install --id=astral-sh.uv -e</code></p>
				{/snippet}
			</OsTabs>
			<p>
				<strong>Close the terminal and open a new one</strong>, so it learns about uv. Then check
				that it works:
			</p>
			<Code code="uv --version" />
			<p class="text-base">
				You should see something like <code>uv 0.10.3</code>. The exact number does not matter.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				uv installerer Python for dig, laver projekter og holder styr på de pakker, hvert projekt
				bruger. Ét værktøj i stedet for fem.
			</p>
			<OsTabs>
				{#snippet linux()}
					<Code code="curl -LsSf https://astral.sh/uv/install.sh | sh" />
				{/snippet}
				{#snippet macos()}
					<Code code="curl -LsSf https://astral.sh/uv/install.sh | sh" />
					<p class="text-base">Eller med Homebrew: <code>brew install uv</code></p>
				{/snippet}
				{#snippet windows()}
					<Code code={uvWindows} />
					<p class="text-base">Eller: <code>winget install --id=astral-sh.uv -e</code></p>
				{/snippet}
			</OsTabs>
			<p>
				<strong>Luk terminalen og åbn en ny</strong>, så den lærer uv at kende. Tjek så, at det
				virker:
			</p>
			<Code code="uv --version" />
			<p class="text-base">
				Du skulle gerne se noget i stil med <code>uv 0.10.3</code>. Det præcise tal er ligegyldigt.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Step 5 of 6', 'Trin 5 af 6')}
		title={t('Install ruff, ty and pytest', 'Installér ruff, ty og pytest')}
	>
		{#snippet en()}
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>ruff</h3>
					<p>Finds mistakes and tidies up your code so it looks neat.</p>
				</div>
				<div class="card">
					<h3>ty</h3>
					<p>Checks that you do not mix up text and numbers, before you even run the program.</p>
				</div>
				<div class="card">
					<h3>pytest</h3>
					<p>Runs tests that prove your code does what you think it does.</p>
				</div>
			</div>
			<p>ruff and ty are installed once, for the whole computer, with uv:</p>
			<Code code={`uv tool install ruff@latest\nuv tool install ty@latest`} />
			<p>
				pytest is added to <strong>each project</strong> instead, so we do that in the next section
				when we create your project (with <code>uv add --dev pytest</code>).
			</p>
			<p><strong>Check:</strong></p>
			<Code code={`ruff --version\nty --version`} />
			<p class="tip">
				If the terminal says it cannot find <code>ruff</code>, run
				<code>uv tool update-shell</code>, then open a new terminal and try again.
			</p>
		{/snippet}
		{#snippet da()}
			<div class="grid gap-3 md:grid-cols-3">
				<div class="card">
					<h3>ruff</h3>
					<p>Finder fejl og rydder op i din kode, så den ser pæn ud.</p>
				</div>
				<div class="card">
					<h3>ty</h3>
					<p>Tjekker, at du ikke blander tekst og tal sammen, allerede før du kører programmet.</p>
				</div>
				<div class="card">
					<h3>pytest</h3>
					<p>Kører tests, der beviser, at din kode gør det, du tror.</p>
				</div>
			</div>
			<p>ruff og ty installeres én gang for hele computeren, med uv:</p>
			<Code code={`uv tool install ruff@latest\nuv tool install ty@latest`} />
			<p>
				pytest tilføjes i stedet til <strong>hvert projekt</strong>, så det gør vi i næste afsnit,
				når vi laver dit projekt (med <code>uv add --dev pytest</code>).
			</p>
			<p><strong>Tjek:</strong></p>
			<Code code={`ruff --version\nty --version`} />
			<p class="tip">
				Siger terminalen, at den ikke kan finde <code>ruff</code>, så kør
				<code>uv tool update-shell</code>, åbn en ny terminal og prøv igen.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Step 6 of 6', 'Trin 6 af 6')}
		title={t('Tell Zed to use ruff and ty', 'Fortæl Zed, at den skal bruge ruff og ty')}
	>
		{#snippet en()}
			<p>
				Zed comes with a Python checker called <strong>basedpyright</strong>. We switch it off and
				use <strong>ty</strong> and <strong>ruff</strong> instead, which are built into Zed too.
			</p>
			<ol>
				<li>
					Open Zed's settings: press <kbd>Ctrl</kbd> + <kbd>,</kbd> (on a Mac: <kbd>⌘</kbd> +
					<kbd>,</kbd>), or open the command palette and choose <strong>zed: open settings</strong>.
				</li>
				<li>
					A file called <code>settings.json</code> opens. Paste this inside it, so it is the only thing
					in the file:
				</li>
			</ol>
			<Code code={zedSettings} label="settings.json" />
			<p class="text-base">
				The <code>language_servers</code> list says which checkers Zed uses for Python. Anything not in
				the list (like pyright and basedpyright) is turned off. The rest makes ruff tidy your code every
				time you save.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Zed kommer med en Python-checker, der hedder <strong>basedpyright</strong>. Den slår vi fra
				og bruger <strong>ty</strong> og <strong>ruff</strong> i stedet. De er også indbygget i Zed.
			</p>
			<ol>
				<li>
					Åbn Zeds indstillinger: tryk <kbd>Ctrl</kbd> + <kbd>,</kbd> (på en Mac: <kbd>⌘</kbd> +
					<kbd>,</kbd>), eller åbn kommandopaletten og vælg <strong>zed: open settings</strong>.
				</li>
				<li>
					En fil, der hedder <code>settings.json</code>, åbner. Sæt dette ind i den, så det er det
					eneste i filen:
				</li>
			</ol>
			<Code code={zedSettings} label="settings.json" />
			<p class="text-base">
				Listen <code>language_servers</code> siger, hvilke checkere Zed bruger til Python. Alt, der ikke
				står på listen (som pyright og basedpyright), er slået fra. Resten får ruff til at rydde op i
				din kode, hver gang du gemmer.
			</p>
		{/snippet}
	</Slide>

	<Slide
		kicker={t('Setup', 'Opsætning')}
		title={t("All done? Let's check", 'Færdig? Lad os tjekke')}
	>
		{#snippet en()}
			<p>
				Run these in a new terminal. Each one should print a version number, and gh should say you
				are logged in:
			</p>
			<Code code={`git --version\ngh auth status\nuv --version\nruff --version\nty --version`} />
			<p>Then open Zed and make sure it starts.</p>
			<p>If everything works, you are ready to create your first project. 🏴‍☠️</p>
			<p class="tip">
				Something not working? That is normal. Raise your hand and we will fix it together.
			</p>
		{/snippet}
		{#snippet da()}
			<p>
				Kør disse i en ny terminal. Hver af dem skal skrive et versionsnummer, og gh skal sige, at
				du er logget ind:
			</p>
			<Code code={`git --version\ngh auth status\nuv --version\nruff --version\nty --version`} />
			<p>Åbn så Zed og se, at den starter.</p>
			<p>Virker det hele, er du klar til at lave dit første projekt. 🏴‍☠️</p>
			<p class="tip">
				Er der noget, der ikke virker? Det er helt normalt. Ræk hånden op, så ordner vi det sammen.
			</p>
		{/snippet}
	</Slide>
</Deck>
