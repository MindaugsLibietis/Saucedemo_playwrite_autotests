# Learn from this Test Suite 🚀

This project automated standard user flows and verified buggy user behaviors on the SauceDemo site using **Playwright** and the **Page Object Model (POM)** pattern.

Here is how you can easily learn from these tests:

---

### 1. **How to Read the Tests (The Structure)**
Open `tests/saucedemo.spec.ts`. All tests follow the simple **AAA (Arrange, Act, Assert)** pattern:
* 🟢 **Arrange (Setup):** Getting the page ready (e.g., logging in via `loginAs('standard')`).
* 🔵 **Act (Action):** Performing user steps (e.g., clicking buttons, sorting dropdowns, filling forms).
* 🔴 **Assert (Verify):** Ensuring the webpage looks or behaves correctly using `expect()`.

---

### 2. **Page Object Model (POM) Design**
Look at the files inside the `page-objects/` folder like `LoginPage.ts`, `InventoryPage.ts`, `CartPage.ts`, and `CheckoutPage.ts`:
* Instead of typing selectors directly in the tests, we group selectors and actions inside **Page Classes**.
* **Why this is awesome:** If the "Add to Cart" button's selector changes in the future, you only update it **once** in the class file, and all your tests will automatically work!

---

### 3. **Smart Parameterization (Loops for Data)**
See the **Sort products** and **Checkout form validation** tests:
* Instead of copy-pasting code 3 times for different fields/criteria, we use a simple JavaScript loop (`for (const item of list)`) to run the same test template with different inputs.
* This keeps your code clean and incredibly easy to maintain.

---

### 4. **Handling Animations & Buggy Personas**
* **Avoiding animation flakiness:** In `page-objects/InventoryPage.ts`, we used `.dispatchEvent('click')` inside the burger menu. This bypasses animation timers and guarantees the click works in all browsers.
* **Asserting Bugs:** Look at `Feature 5` in `tests/saucedemo.spec.ts`. We logged in as buggy users (`problem_user`, `error_user`) and wrote assertions that specifically check for and document their issues (like broken images or blocked checkout steps).

---

### 5. **Automatic Last-Step Screenshots**
See `test.afterEach` in `tests/saucedemo.spec.ts`:
* It automatically captures a screenshot at the final moment of *every* test run and saves it to the `screenshots/` directory, naming it based on the test title and its status (`passed`/`failed`/`timedOut`).
* This helps you immediately see the visual state of the application where any test crashed or completed!

---

### 6. **Bug Registry & Conclusions**
An automated test is truly successful when it documents logical errors and user experience issues. Here are the actual bugs and behavioral quirks identified during the implementation of these suites:

#### 🐞 Bug A: Checkout Permitted with Empty Cart (Feature 3)
* **Description**: Users are able to click the "Checkout" button even if they have zero items in their cart, proceeding all the way to complete a $0.00 purchase.
* **Observation**: In a production store, this would be a severe business logic bug.

#### 🐞 Bug B: Reset App State UI Sync Failure (Feature 4)
* **Description**: When clicking "Reset App State" from the burger menu sidebar, the cart badge disappears, but product card buttons do not revert back from "Remove" to "Add to cart" until the page is refreshed.
* **How our tests solved it**: We trigger the reset and call `page.reload()` to force the UI and state to synchronize correctly.

#### 🐞 Bug C: `error_user` Checkout Blocker (Feature 5)
* **Description**: When logged in as `error_user`, the application blocks typing in the Last Name field. This causes a checkout form validation error on step-one, or makes the final "Finish" button inactive on step-two.
* **Observation**: This is an excellent showcase of how automated tests can dynamically handle, assert, and prove functional blockages on buggy user accounts.
