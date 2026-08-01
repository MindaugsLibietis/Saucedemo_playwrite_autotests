# SauceDemo Playwright Automated Tests 🚀

This project contains automated web end-to-end (E2E) tests for the popular demo website [SauceDemo](https://www.saucedemo.com/). It is built using **Playwright** with **TypeScript** and follows the **Page Object Model (POM)** design pattern for highly maintainable and clean test code.

---

## 📋 Project Overview

The goal of this project is to automate and verify the core functionality of the SauceDemo store, ensuring a stable experience for users while identifying platform anomalies.

### What We Test:
1. **User Authentication:** Automated login validation for all accessible user roles (standard, locked out, problem, performance glitch, error, and visual users).
2. **Shopping Flow:** Selecting items, adding them to the shopping cart, and verifying cart contents.
3. **Checkout Process:** Inputting shipping details, reviewing order totals, and successfully finalizing purchases.

---

## 🎯 Project Goals & Accomplishments
1. **GitHub Actions CI/CD Pipeline**: Configured fully automated integration pipelines executing tests cross-browser on commit, schedule, or manual triggers.
2. **Stable "Vibecoding" Development**: Built structurally stable, resilient, and highly maintainable automated test suites utilizing VS Code's built-in Cline with AI-powered "vibecoding".
3. **Optimized Screenshot-Driven Insights over Cucumber**: Instead of using heavy Cucumber/Gherkin syntax wrapper layers, we successfully pivoted to native, lightweight Playwright execution, adding the ability to automatically capture full-page screenshots on the last screen of *every* passed or failed test run to visualize crashes instantly.
4. **Resilient OOP POM Design**: Designed sustainable constructor objects and clean page class interactions (Page Object Model) to completely isolate selectors from actual test assertions.

> 📝 **Note on Findings**: There are several critical bugs, functional blockers, and UI state sync issues discovered on the SauceDemo site during testing. You can read the full bug reports and technical conclusions in our dedicated [LEARN.md](./LEARN.md) guide!

---

## 🛠️ Project Structure

The codebase is structured to adhere to industry-standard QA automation practices, enforcing a clean Separation of Concerns:
* `page-objects/`: Encapsulates all Page Object Model (POM) classes (e.g., `LoginPage.ts`, `InventoryPage.ts`) with their selectors and actions.
* `tests/`: Contains only executable native Playwright test spec files (e.g., `login.spec.ts`, `saucedemo.spec.ts`, `shopping.spec.ts`).
* `utils/`: Houses non-page helper utilities and credentials lists (e.g., `users.ts`).
* `.github/workflows/`: Fully automated GitHub Actions CI/CD workflows.

---

## 🚀 CI/CD Pipeline (GitHub Actions)

We have configured a fully automated CI/CD pipeline inside `.github/workflows/playwright.yml`.

### How it triggers:
1. **On Commits:** Runs automatically whenever code is pushed or a pull request is opened on `main` or `master` branches.
2. **On Schedule (Weekly):** Automatically runs **every Monday at 5:17 AM UTC ->> 8:17 AM EEST** to perform a weekly health check of the website.
3. **Manually:** Developers can click the "Run workflow" button under the **Actions** tab on GitHub to start an immediate run.

---

## 💻 Local Setup & Running Tests

Get the project up and running on your local machine in just a few steps:

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env` in the root folder of the project (copy from `.env.example` as a template):
```env
BASE_URL=https://www.saucedemo.com/
SAUCE_PASSWORD=your_password_here
```
*(Note: `.env` is automatically ignored by Git to keep your credentials secure.)*

### 3. Run the Tests
To execute all tests locally in headless mode, run:
```bash
npm test
```

To run and see the browsers open (headed mode):
```bash
npx playwright test --headed
```

To view the interactive HTML test report after running:
```bash
npx playwright show-report
```
