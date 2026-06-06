import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { SORT_OPTIONS } from '../../../utils/test-data';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Sort Products by Price (High to Low)', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.sortBy(SORT_OPTIONS.PRICE_HIGH_TO_LOW);
    await page.waitForLoadState('networkidle');

    // Assert
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([49.99, 29.99, 15.99, 15.99, 9.99, 7.99]);
  });
});
