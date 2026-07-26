# SauceDemo Playwright Automated Tests 🚀

This project contains automated web end-to-end (E2E) tests for the popular demo website [SauceDemo](https://www.saucedemo.com/). It is built using **Playwright** with **TypeScript** and follows the **Page Object Model (POM)** design pattern for highly maintainable and clean test code.

---

## 📋 Project Overview

The goal of this project is to automate and verify the core functionality of the SauceDemo store, ensuring a bug-free experience for users. 

### What We Test:
1. **User Authentication:** Automated login validation for all accessible user roles (standard, locked out, problem, performance glitch, error, and visual users).
2. **Shopping Flow:** Selecting items, adding them to the shopping cart, and verifying cart contents.
3. **Checkout Process:** Inputting shipping details, reviewing order totals, and successfully finalizing purchases.

---

## 🛠️ Project Structure

The codebase is organized as follows:
* `pages/`: Page Object classes (e.g., `LoginPage.ts`, `CartPage.ts`, `InventoryPage.ts`, `CheckoutPage.ts`) containing selectors and page-specific actions. This keeps test files clean and readable.
* `tests/`: Actual automated test suites (e.g., `login.spec.ts`, `shopping.spec.ts`, `checkout.spec.ts`).
* `utils/`: Utility functions, user credentials list, and test data.
* `.github/workflows/`: CI/CD automation workflow for running tests in the cloud.

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

---

## 🚀 CI/CD Pipeline (GitHub Actions)

We have configured a fully automated CI/CD pipeline inside `.github/workflows/playwright.yml`.

### How it triggers:
1. **On Commits:** Runs automatically whenever code is pushed or a pull request is opened on `main` or `master` branches.
2. **On Schedule (Weekly):** Automatically runs **every Monday at 9:00 AM UTC** to perform a weekly health check of the website.
3. **Manually:** Developers can click the "Run workflow" button under the **Actions** tab on GitHub to start an immediate run.