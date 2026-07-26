import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo - First Login Test', () => {
  
  test('should login successfully as standard_user', async ({ page }) => {
    // 1. Initialize the Page Object
    const loginPage = new LoginPage(page);

    // 2. Navigate to SauceDemo
    await loginPage.goto();

    // 3. Log in using standard_user and the password from .env
    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('standard_user', password);

    // 4. Assert: Verify we landed on the inventory/products page
    await expect(page).toHaveURL(/.*inventory.html/);

    // 5. Assert: Verify the page header shows "Products"
    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

    test('should not be able to login with locked_out_user', async ({ page }) => {
    // 1. Initialize the Page Object
    const loginPage = new LoginPage(page);

    // 2. Navigate to SauceDemo
    await loginPage.goto();

    // 3. Log in using locked_out_user and the password from .env
    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('locked_out_user', password);

    // 4. Assert: Verify we receive text for locked out user
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

});
