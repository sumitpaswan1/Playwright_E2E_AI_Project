import { Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  private cartItems: Locator;
  private cartBadge: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;
  private removeButtons: Locator;
  private cartContainer: Locator;
  private cartItemNames: Locator;
  private cartItemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.locator('button[data-test="checkout"]');
    this.continueShoppingButton = page.locator('button[data-test="continue-shopping"]');
    this.removeButtons = page.locator('button[data-test*="remove"]');
    this.cartContainer = page.locator('.cart_list');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
  }

  async goto() {
    await this.page.goto('/cart.html');
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

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  async getCartItemPrices(): Promise<number[]> {
    const prices = await this.cartItemPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async removeItemByName(productName: string) {
    // Find the cart item containing the product and get its remove button
    const cartItems = this.page.locator('.cart_item');
    const itemCount = await cartItems.count();
    
    for (let i = 0; i < itemCount; i++) {
      const item = cartItems.nth(i);
      const itemName = await item.locator('.inventory_item_name').textContent();
      
      if (itemName && itemName.includes(productName)) {
        await item.locator('button[data-test*="remove"]').click();
        return;
      }
    }
    
    throw new Error(`Product "${productName}" not found in cart`);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.checkoutButton.isVisible();
  }

  async isContinueShoppingButtonVisible(): Promise<boolean> {
    return await this.continueShoppingButton.isVisible();
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.cartItems.count()) === 0;
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getCartTotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }
}
