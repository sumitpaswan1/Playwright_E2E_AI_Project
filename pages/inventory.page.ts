import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private cartIcon: Locator;
  private cartBadge: Locator;
  private sortDropdown: Locator;
  private menuButton: Locator;
  private closeMenuButton: Locator;
  private logoutLink: Locator;
  private allItemsLink: Locator;
  private aboutLink: Locator;
  private resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.getByText('Open Menu');
    this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
    this.logoutLink = page.locator('a[data-test="logout-sidebar-link"]');
    this.allItemsLink = page.locator('a[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('a[data-test="about-sidebar-link"]');
    this.resetAppStateLink = page.locator('a[data-test="reset-sidebar-link"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async getCartCount(): Promise<number> {
    try {
      const badgeText = await this.cartBadge.textContent();
      return badgeText ? parseInt(badgeText) : 0;
    } catch {
      return 0;
    }
  }

  async addToCart(productDataTest: string) {
    const addButton = this.page.locator(
      `button[data-test="add-to-cart-${productDataTest}"]`
    );
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();
  }

  async removeFromCart(productDataTest: string) {
    const removeButton = this.page.locator(
      `button[data-test="remove-${productDataTest}"]`
    );
    await removeButton.waitFor({ state: 'visible', timeout: 10000 });
    await removeButton.click();
  }

  async clickCartIcon() {
    await this.cartIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.cartIcon.click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async clickProductByName(productDataTest: string) {
    // Convert data-test format to product name (e.g., 'sauce-labs-backpack' -> 'Sauce Labs Backpack')
    const productName = productDataTest
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Click on the product image link using XPath to find the product by name
    const productLink = this.page.locator(
      `//a[descendant::img[contains(@alt, "${productName}")]]`
    );
    await productLink.click();
  }

  async openMenu() {
    await this.menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: 'visible', timeout: 10000 });
  }

  async closeMenu() {
    await this.closeMenuButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.closeMenuButton.click();
  }

  async logout() {
    await this.logoutLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.resetAppStateLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.resetAppStateLink.click();
  }

  async clickAllItems() {
    await this.allItemsLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.allItemsLink.click();
  }

  async clickAbout() {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.aboutLink.click(),
    ]);
    return popup;
  }

  async isMenuOpen(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async getPageTitle(): Promise<string | null> {
    return await this.page.locator('span.title').textContent();
  }

  async getAllProductsCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}
