import { Page, Locator } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private productImage: Locator;
  private productName: Locator;
  private productDescription: Locator;
  private productPrice: Locator;
  private addToCartButton: Locator;
  private removeButton: Locator;
  private backButton: Locator;
  private cartIcon: Locator;
  private cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productImage = page.locator('.inventory_details_img');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('button[data-test*="add-to-cart"]');
    this.removeButton = page.locator('button[data-test*="remove"]');
    this.backButton = page.locator('button[data-test="back-to-products"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async isProductImageVisible(): Promise<boolean> {
    return await this.productImage.isVisible();
  }

  async isProductNameVisible(): Promise<boolean> {
    return await this.productName.isVisible();
  }

  async isProductDescriptionVisible(): Promise<boolean> {
    return await this.productDescription.isVisible();
  }

  async isProductPriceVisible(): Promise<boolean> {
    return await this.productPrice.isVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  async backToProducts() {
    await this.backButton.click();
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<number> {
    try {
      const badgeText = await this.cartBadge.textContent();
      return badgeText ? parseInt(badgeText) : 0;
    } catch {
      return 0;
    }
  }

  async isBackButtonVisible(): Promise<boolean> {
    return await this.backButton.isVisible();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}
