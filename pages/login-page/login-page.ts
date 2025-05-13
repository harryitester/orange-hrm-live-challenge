import { Page } from '@playwright/test';
import { BasePage } from '../base-pages';

export class LoginPage extends BasePage {
  // Locators
  private usernameInput = '[name="username"]';
  private passwordInput = '[name="password"]';
  private loginButton = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  // Actions
  async login(username: string, password: string) {
    await this.waitAndFill(this.usernameInput, username);
    await this.waitAndFill(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
  }

  async getErrorMessage() {
    // Adjust the selector if your error message uses a different one
    return this.page.textContent('.oxd-alert-content-text');
  }

  async getRequiredMessages() {
    // Adjust the selector if your required field message uses a different one
    return this.page.locator('.oxd-input-field-error-message').allTextContents();
  }

  async gotoLoginPage() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }
}