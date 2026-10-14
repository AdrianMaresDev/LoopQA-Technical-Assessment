# LoopQA Technical Assessment

Data-driven Playwright test suite, written in TypeScript, for the demo project board app at https://create-asana-like-pr-39y5.bolt.host/.

Each test logs in, opens a project, and verifies that a task card is in the expected column with the expected tags. The test cases come from a JSON file, so a single test body covers every case.

## Prerequisites

Node.js 20 or later.

## Setup

```bash
npm install
npx playwright install
```

`npx playwright install` downloads the browsers Playwright runs against (Chromium, Firefox and WebKit).

## Running the tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headless on Chromium, Firefox and WebKit |
| `npx playwright test --project=chromium` | Run on a single browser |
| `npx playwright test --headed` | Run with a visible browser window |
| `npx playwright test --ui` | Open UI mode to run tests and step through each action |
| `npx playwright show-report` | Open the HTML report from the last run |

## Project structure

```text
data/
  testData.json                      Test cases: project, task, status (column) and tags
  credentials.ts                     Login credentials
pages/
  LoginPage.ts                       Page object for the login form
  ProjectsPage.ts                    Page object for the project board (navigation, columns, cards, tags)
tests/
  verify-task-card-content.spec.ts   Generates one test per entry in testData.json
playwright.config.ts                 Base URL, browsers and reporter
```

## Adding a test case

Add an entry to `data/testData.json`. No code changes are needed: 

```json
{
  "project": "<project name>",
  "task": "<task title>",
  "status": "<column name>",
  "tags": ["<tag>", "<tag>"]
}
```

`status` is the column name as shown on the board, without the task count.

## Credentials

The credentials are read from the `DEMO_USERNAME` and `DEMO_PASSWORD` environment variables and fall back to the demo values provided in the assessment brief, so the suite runs without any setup. In a real project, credentials would come only from environment variables or a secrets manager, with no defaults committed.

## Notes on locators

The board's columns and task cards have no roles, test IDs or other semantic attributes, so they are located by their CSS classes and then narrowed by their headings (column title and task title). Tags are matched with exact text, scoped to their card, so that tags such as "Design" and "Bug" do not also match task titles.
