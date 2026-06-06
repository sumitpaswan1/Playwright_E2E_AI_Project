import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('View Product Details', async ({ page, inventoryPage, productPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.clickProductByName('sauce-labs-backpack');
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory-item.html');
    expect(await productPage.isProductImageVisible()).toBeTruthy();
    expect(await productPage.isProductNameVisible()).toBeTruthy();
    expect(await productPage.isProductDescriptionVisible()).toBeTruthy();
    expect(await productPage.isProductPriceVisible()).toBeTruthy();

    const productName = await productPage.getProductName();
    expect(productName).toContain('Sauce Labs Backpack');

    const productPrice = await productPage.getProductPrice();
    expect(productPrice).toContain('$29.99');

    expect(await productPage.isBackButtonVisible()).toBeTruthy();
  });
});
