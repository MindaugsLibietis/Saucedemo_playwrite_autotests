import { Page, Locator } from '@playwright/test';
import { USERS, UserRole } from '../utils/users';

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

  async goto() {
    const url = process.env.BASE_URL;
    if (!url) {
      throw new Error('BASE_URL environment variable is missing.');
    }
    await this.page.goto(url);
  }

  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async loginAs(role: UserRole) {
    const username = USERS[role];
    const password = process.env.SAUCE_PASSWORD;
    if (!password) {
      throw new Error('SAUCE_PASSWORD environment variable is missing.');
    }
    await this.login(username, password);
  }
}
