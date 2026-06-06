import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { SORT_OPTIONS, EXPECTED_PRODUCT_ORDER } from '../../../utils/test-data';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Sort Products by Price (Low to High)', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.sortBy(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
    await page.waitForLoadState('networkidle');

    // Assert
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([7.99, 9.99, 15.99, 15.99, 29.99, 49.99]);

    const productNames = await inventoryPage.getProductNames();
    expect(productNames).toEqual(EXPECTED_PRODUCT_ORDER.PRICE_LOW_TO_HIGH);
  });
});
