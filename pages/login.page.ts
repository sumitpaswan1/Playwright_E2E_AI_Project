import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('button.error-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async closeError() {
    await this.errorCloseButton.click();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string | null> {
    return await this.page.locator('div.login_logo').textContent();
  }
}
