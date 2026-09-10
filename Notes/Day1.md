# Day 1 - Playwright Fundamentals

Welcome! This is a beginner-friendly note. Read it top to bottom and you will know
how to set up Playwright, how to run your first test file, and what every folder
in this project is for.

---

## 1. What is Playwright?

Playwright is a free tool made by Microsoft that opens a real browser
(Chrome, Firefox, Safari) and does things automatically - like clicking buttons,
typing text, and checking that the page looks correct.

In simple words:

> Playwright = a robot that uses a browser for you, so you can test websites
> without clicking everything by hand.

It can test in 3 ways:
- **UI / End-to-End** - click and type on a real page.
- **API** - send requests to a server and check the response.
- **Component** - test small pieces of a web app.

We are focusing on **UI testing** for now.

---

## 2. What do you need before starting? (Prerequisites)

Only two things:

1. **Node.js** (this also installs `npm`, the tool that installs other tools)
2. **VS Code** (a free code editor from Microsoft)

### Check if Node.js is already installed

Open a terminal (Command Prompt, PowerShell, or the VS Code terminal) and type:

```bash
node -v
npm -v
```

- If you see version numbers like `v20.11.0` and `10.2.3` -> you are ready.
- If you see an error like *"node is not recognized"* -> install it from
  https://nodejs.org (pick the **LTS** version, it is the stable one).

---

## 3. How to install Playwright from the terminal

### Option A - Brand new project (from scratch)

Go to the folder where you want the project, then run:

```bash
npm init playwright@latest
```

It will ask you a few questions. Safe answers for a beginner:

| Question | Answer |
| --- | --- |
| Do you want to use TypeScript or JavaScript? | **TypeScript** |
| Where to put your end-to-end tests? | **tests** |
| Add a GitHub Actions workflow? | **false** (for now) |
| Install Playwright browsers? | **true** |

This one command creates the project files AND downloads the browsers.

### Option B - This existing project

If the project already exists (like this one), you only install the packages:

```bash
npm install
npx playwright install
```

- `npm install` -> installs everything listed in `package.json` into `node_modules`.
- `npx playwright install` -> downloads the actual browsers Playwright controls.

> Note: `npx` means "run this tool from the project's node_modules folder".
> That is why we use `npx playwright ...` instead of just `playwright ...`.

---

## 4. File extension - what does `.spec.ts` mean?

Playwright finds test files by their **name pattern**, not by a special format.

| Extension | Meaning |
| --- | --- |
| `.ts` | TypeScript file (JavaScript with types). |
| `.js` | Plain JavaScript file. |
| `.spec.ts` / `.spec.js` | A **test** file. This is the popular convention. |
| `.test.ts` / `.test.js` | Also treated as a test file. Same thing, different habit. |

So:

- `example.spec.ts` -> **will be picked up** as a test.
- `helpers.ts` -> will **not** be run as a test (no `.spec` or `.test` in the name).

Because this project uses `"testDir: './tests'` in `playwright.config.ts`,
Playwright looks inside the `tests` folder and runs every `.spec.ts` it finds.

---

## 5. The VS Code extension (highly recommended)

The extension gives you green play buttons next to each test, so you can run a
single test with one click instead of typing commands.

Steps:

1. Open VS Code.
2. Press `Ctrl + Shift + X` to open the Extensions panel.
3. Search for **Playwright Test for VSCode** (publisher: Microsoft, id `ms-playwright.playwright`).
4. Click **Install**.
5. Open any `.spec.ts` file - you will now see a small green triangle ▶ next to each test.

Useful extra extensions:
- **Playwright Test for VSCode** - run/debug tests, pick locators, record steps.
- **ESLint** - warns you about code mistakes.

---

## 6. How to run your first Playwright file

The file `tests/example.spec.ts` already exists. Run it with:

```bash
npx playwright test
```

That runs **all** test files in the `tests` folder.

More useful ways to run:

```bash
# Run only one file
npx playwright test tests/example.spec.ts

# Run tests whose name contains "title"
npx playwright test -g "title"

# Run in UI mode (a visual app to pick and watch tests - best for learning)
npx playwright test --ui

# Run with the browser visible
npx playwright test --headed

# Run step by step with a debugger
npx playwright test --debug

# Run only on one browser
npx playwright test --project=chromium

# Open the last HTML report
npx playwright show-report
```

Quick tip: `--ui` mode is the friendliest one to start with. You can click a test
and watch it run in a real browser.

> Heads up about this project: `playwright.config.ts` currently has
> `headless: false`, which means the browser window **will be visible** while
> tests run. If you want them to run invisibly (faster, and it captures
> screenshots/video of failures), change it to `headless: true`.

> Another heads up: `package.json` has an empty `scripts` section, so
> `npm test` does **not** work yet. Use the `npx playwright test` commands above,
> or add this to `package.json` if you want shortcuts later:
> `"scripts": { "test": "playwright test", "report": "playwright show-report" }`

---

## 7. What is inside a test file? (Smallest example)

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

Line by line:

1. `import { test, expect }` - bring in the tools.
2. `test('has title', async ({ page }) => { ... })` - define one test with a name.
   The `page` object is a fresh browser tab.
3. `await page.goto(...)` - open a URL.
4. `await expect(...).toHaveTitle(...)` - check (assert) the result.

`await` means "wait for this step to finish before moving on". Almost everything
in Playwright uses `await`. If you forget it, your test will act too early.

---

## 8. What is each folder / file for?

| Name | What it is | Should you edit it? |
| --- | --- | --- |
| `tests/` | Your test files (`.spec.ts`). All the real work lives here. | **Yes** - this is your playground. |
| `node_modules/` | All the downloaded packages (Playwright itself, etc.). Big and auto-generated. | **No.** Never edit. Delete + `npm install` to rebuild. |
| `playwright.config.ts` | The settings file: which browsers, timeouts, headless on/off, base URL. | **Yes**, when you need to change settings. |
| `test-results/` | Auto-generated output of the last run: screenshots, videos, traces of failures. | **No.** It is deleted/refreshed each run. |
| `playwright-report/` | The HTML report you open with `npx playwright show-report`. | **No.** Auto-generated. |
| `package.json` | Lists the project name, the packages it needs, and shortcut scripts. | **Yes**, to add scripts/dependencies. |
| `package-lock.json` | Exact record of installed package versions so everyone gets the same ones. | **No.** Let `npm` manage it. |
| `.gitignore` | Tells Git which files NOT to upload (like `node_modules`, reports). | Rarely. |
| `Notes/` | Your own study notes, like this file. | **Yes** - add more notes here. |

### Why `node_modules`, `test-results`, and `playwright-report` are ignored by Git

They are huge and are produced automatically. Anyone can recreate them by running
`npm install` and `npx playwright test`. Keeping them out of Git keeps the repo
small and clean. That is exactly what `.gitignore` does.

---

## 9. The config file, explained simply

Open `playwright.config.ts`. The parts that matter most on Day 1:

- `testDir: './tests'` -> "look for tests in the `tests` folder".
- `fullyParallel: true` -> run test files at the same time (faster).
- `reporter: 'html'` -> build the nice HTML report after running.
- `headless: false` -> show the browser while running.
- `use.trace: 'on-first-retry'` -> when a test fails and is retried, save a
  trace you can open with `npx playwright show-trace`.
- `projects: [chromium, firefox, webkit]` -> each test runs on all three browsers.
  Delete the ones you do not want, or run one with `--project=chromium`.

---

## 10. Common beginner errors and fixes

| Problem | Fix |
| --- | --- |
| `node is not recognized` | Install Node.js (LTS) and reopen the terminal. |
| `npx playwright test` says no tests found | Make sure the file ends in `.spec.ts` and is inside `tests/`. |
| `Executable doesn't exist ... browser` | Run `npx playwright install`. |
| Test fails on the very first step | Website may be slow; avoid `waitForTimeout` and prefer Playwright's auto-waiting locators like `getByRole`. |
| `npm test` does nothing | `scripts` in `package.json` is empty; use `npx playwright test`. |

---

## 11. Day 1 checklist (tick these off)

- [ ] Node.js and npm show a version (`node -v`, `npm -v`)
- [ ] Project packages installed (`npm install`)
- [ ] Browsers installed (`npx playwright install`)
- [ ] Playwright VS Code extension installed
- [ ] Ran `npx playwright test` and saw it pass
- [ ] Opened the report with `npx playwright show-report`
- [ ] Know the difference: `tests/`, `node_modules/`, `test-results/`, `playwright-report/`

---

## 12. Handy command cheat sheet

```bash
npm init playwright@latest        # new Playwright project
npm install                       # install packages for an existing project
npx playwright install            # download browsers

npx playwright test               # run all tests
npx playwright test --ui          # visual UI mode (great for learning)
npx playwright test --headed      # show the browser
npx playwright test --debug       # step-by-step debugging
npx playwright test -g "title"    # run tests matching a name
npx playwright test --project=chromium
npx playwright show-report        # open the HTML report
npx playwright show-trace <file>  # open a saved trace
npx playwright codegen <url>      # record clicks and generate code for you
```

---

### Remember in one line

**Install Node -> `npm init playwright@latest` -> write `.spec.ts` files in `tests/`
-> run `npx playwright test` -> read the report.**
