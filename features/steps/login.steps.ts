import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/LoginPage';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am on the SauceDemo login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I log in as {string} with valid password', async ({ page }, username) => {
  const loginPage = new LoginPage(page);
  const password = process.env.SAUCE_PASSWORD;
  if (!password) {
    throw new Error('SAUCE_PASSWORD environment variable is missing.');
  }
  await loginPage.login(username, password);
});

Then('I should be redirected to the products inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
});

Then('the page header should display {string}', async ({ page }, expectedHeader) => {
  const headerTitle = page.locator('.title');
  await expect(headerTitle).toHaveText(expectedHeader);
});

Then('I should see the error message {string}', async ({ page }, expectedError) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.errorMessage).toHaveText(expectedError);
});
