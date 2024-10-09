# Amazon Product Test Project Using Playwright

## Table of Contents

- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Reporting](#reporting)

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js

## Directory Structure

```plaintext
PLAYWRIGHT-TEST
│
├── allure-report               # Generated Allure reports
├── allure-results              # Temporary results for Allure
├── node_modules                # Node.js modules
├── playwright-report            # Playwright HTML reports
├── screenshots                  # Captured screenshots during tests
│
└── src                         # Source code
    ├── base                    # Base page class
    │   └── base.page.ts
    ├── fixtures                 # Test fixtures
    │   └── fixtures.ts
    ├── pages                   # Page object model classes
    │   ├── apple.store.page.ts
    │   ├── apple.watches.page.ts
    │   ├── home.page.ts
    │   ├── index.ts
    │   ├── product.page.ts
    │   └── search.results.page.ts
    ├── tests
    |   ├──test-data                   # Test cases and Test Data
    └── playwright.config.ts     # Playwright configuration
├── .gitignore              #ignored allure-reports, allure-results, screenshots
```

## Installation

```plaintext
git clone https://github.com/shriniwasalle/amazon-product-test.git
```

```plaintext
cd playwright-test
```

```plaintext
npm install
```

## Running Tests

To run all tests, use the following command:

```plaintext
npm run test
```

## Reporting

Allure Reports: After running the tests, you can generate Allure reports using the following command:

```plaintext
npm run test-generate-report
```

Open the Allure report:

```plaintext
npm run test-open-report
```
