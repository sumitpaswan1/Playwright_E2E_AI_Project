# Playwright E2E AI Project

This repository contains an end-to-end test suite built with Playwright for the Sauce Demo application. The tests are organized by functional areas and validate login, cart, checkout, navigation, and product behavior.

## Project structure

- `fixtures/` - shared test fixtures and setup logic.
- `pages/` - Page Object Model classes for the application pages.
- `tests/feature-based/` - feature-based test suites grouped by domain:
  - `auth/`
  - `cart/`
  - `checkout/`
  - `e2e/`
  - `navigation/`
  - `products/`
  - `users/`
- `utils/` - helper functions and test data.
- `spec/` - high-level test plan documentation.
- `playwright.config.ts` - Playwright test configuration.

## Requirements

- Node.js 18 or later
- npm

## Install dependencies

```bash
npm install
```

## Run tests

Run the full suite:

```bash
npx playwright test
```

Run a specific folder or file:

```bash
npx playwright test tests/feature-based/auth
npx playwright test tests/feature-based/cart/add-single-item.spec.ts
```

## Open the Playwright report

After tests run successfully, open the HTML report with:

```bash
npx playwright show-report
```

## Notes

- The project uses the Page Object Model pattern to keep page interactions reusable.
- Test data and helpers are stored under `utils/`.
- Add new tests under the appropriate feature folder for consistent organization.

## Repository

This project is pushed to:

`https://github.com/sumitpaswan1/Playwright_E2E_AI_Project`
