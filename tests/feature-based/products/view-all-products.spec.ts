import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('View All Products', async ({ page, inventoryPage }) => {
    // Arrange & Act
    await inventoryPage.goto();

    // Assert - Verify all 6 products are displayed
    const productCount = await inventoryPage.getAllProductsCount();
    expect(productCount).toBe(6);

    // Assert - Verify product names
    const productNames = await inventoryPage.getProductNames();
    expect(productNames.length).toBe(6);
    expect(productNames[0]).toContain('Sauce Labs Backpack');

    // Assert - Verify add to cart buttons
    const addButtons = page.locator('button[data-test*="add-to-cart"]');
    expect(await addButtons.count()).toBe(6);
  });
});
