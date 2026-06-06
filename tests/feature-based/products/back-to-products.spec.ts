import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Back to Products from Details Page', async ({ page, inventoryPage, productPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.clickProductByName('sauce-labs-backpack');
    await page.waitForLoadState('networkidle');

    // Act
    await productPage.backToProducts();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory.html');
    const productCount = await inventoryPage.getAllProductsCount();
    expect(productCount).toBe(6);
  });
});
