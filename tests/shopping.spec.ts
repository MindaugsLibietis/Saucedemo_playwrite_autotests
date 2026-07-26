import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('should add item to cart as problem_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // Clean, reusable login call:
  await loginPage.loginAs('standard');

  // Proceed with inventory testing...
});