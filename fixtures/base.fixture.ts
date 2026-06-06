import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { TEST_USERS, TEST_PASSWORD } from '../utils/test-data';

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: typeof base;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.context().clearCookies();
    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD_USER, TEST_PASSWORD);
    await page.waitForURL(/inventory\.html/);
    await use(base);
  },
});

export { expect };
