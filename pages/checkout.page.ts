import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private zipCodeInput: Locator;
  private continueButton: Locator;
  private cancelButton: Locator;
  private errorMessage: Locator;
  private checkoutTitle: Locator;
  private cartBadge: Locator;
  private finishButton: Locator;
  private cartItems: Locator;
  private subtotal: Locator;
  private tax: Locator;
  private total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[data-test="firstName"]');
    this.lastNameInput = page.locator('input[data-test="lastName"]');
    this.zipCodeInput = page.locator('input[data-test="postalCode"]');
    this.continueButton = page.locator('input[data-test="continue"]');
    this.cancelButton = page.locator('button[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutTitle = page.locator('span.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.finishButton = page.locator('button[data-test="finish"]');
    this.cartItems = page.locator('.cart_item');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
  }

  async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.zipCodeInput.fill(zipCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async getCheckoutTitle(): Promise<string | null> {
    return await this.checkoutTitle.textContent();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badgeText = await this.cartBadge.textContent();
      return badgeText ? parseInt(badgeText) : 0;
    } catch {
      return 0;
    }
  }

  async getSubtotal(): Promise<string | null> {
    return await this.subtotal.textContent();
  }

  async getTax(): Promise<string | null> {
    return await this.tax.textContent();
  }

  async getTotal(): Promise<string | null> {
    return await this.total.textContent();
  }

  async isFirstNameFieldVisible(): Promise<boolean> {
    return await this.firstNameInput.isVisible();
  }

  async isLastNameFieldVisible(): Promise<boolean> {
    return await this.lastNameInput.isVisible();
  }

  async isZipCodeFieldVisible(): Promise<boolean> {
    return await this.zipCodeInput.isVisible();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async isOnCheckoutStepOne(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('checkout-step-one');
  }

  async isOnCheckoutStepTwo(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('checkout-step-two');
  }

  async isOnCheckoutComplete(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('checkout-complete');
  }
}
