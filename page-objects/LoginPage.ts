import { Page, Locator } from '@playwright/test';
import { USERS, UserRole } from '../utils/users';

/**
 * Page Object representing the LoginPage.
 * Contains selectors and helper methods to perform login actions.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the base URL configured in the environment.
   */
  async goto() {
    const url = process.env.BASE_URL;
    if (!url) {
      throw new Error('BASE_URL environment variable is missing.');
    }
    await this.page.goto(url);
  }

  /**
   * General login helper.
   * @param username - The username to enter.
   * @param pass - The password to enter.
   */
  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  /**
   * Helper to login with a specific UserRole defined in utils/users.ts.
   * @param role - The UserRole representing the persona to login as.
   */
  async loginAs(role: UserRole) {
    const username = USERS[role];
    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await this.login(username, password);
  }
}
