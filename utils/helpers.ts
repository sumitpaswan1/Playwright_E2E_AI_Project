import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { TEST_USERS, TEST_PASSWORD, PRODUCTS } from './test-data';

export async function loginAsStandardUser(page: Page) {
  await loginAsUser(page, TEST_USERS.STANDARD_USER);
}

export async function loginAsUser(page: Page, username: string) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.isUsernameFieldVisible();
  await loginPage.login(username, TEST_PASSWORD);
  await page.waitForURL(/inventory\.html/, { timeout: 30000 });
  await page.waitForLoadState('networkidle');
}

export async function addProductToCart(page: Page, productKey: keyof typeof PRODUCTS) {
  const inventoryPage = new InventoryPage(page);
  const product = PRODUCTS[productKey];
  await inventoryPage.addToCart(product.dataTest);
}

export async function addMultipleProductsToCart(
  page: Page,
  productKeys: (keyof typeof PRODUCTS)[]
) {
  const inventoryPage = new InventoryPage(page);
  for (const productKey of productKeys) {
    const product = PRODUCTS[productKey as keyof typeof PRODUCTS];
    await inventoryPage.addToCart(product.dataTest);
  }
}

export async function calculateTotal(subtotal: number, taxRate: number = 0.08): Promise<number> {
  const tax = subtotal * taxRate;
  return Math.round((subtotal + tax) * 100) / 100;
}

export async function extractPrice(priceString: string): Promise<number> {
  return parseFloat(priceString.replace('$', ''));
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function isSorted(array: number[], ascending: boolean = true): boolean {
  for (let i = 1; i < array.length; i++) {
    if (ascending && array[i] < array[i - 1]) return false;
    if (!ascending && array[i] > array[i - 1]) return false;
  }
  return true;
}
