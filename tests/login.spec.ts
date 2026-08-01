import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('SauceDemo - Login Tests', () => {
  
  test('should login successfully as standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('standard_user', password);

    await expect(page).toHaveURL(/.*inventory.html/);

    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

  test('should not be able to login with locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('locked_out_user', password);

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should login successfully as problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('problem_user', password);

    await expect(page).toHaveURL(/.*inventory.html/);

    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

  test('should login successfully as performance_glitch_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('performance_glitch_user', password);

    await expect(page).toHaveURL(/.*inventory.html/);

    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

  test('should login successfully as error_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('error_user', password);

    await expect(page).toHaveURL(/.*inventory.html/);

    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

  test('should login successfully as visual_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await loginPage.login('visual_user', password);

    await expect(page).toHaveURL(/.*inventory.html/);

    const headerTitle = page.locator('.title');
    await expect(headerTitle).toHaveText('Products');
  });

});
