import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { SORT_OPTIONS, EXPECTED_PRODUCT_ORDER } from '../../../utils/test-data';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Sort Products by Name (A to Z)', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.sortBy(SORT_OPTIONS.NAME_A_TO_Z);
    await page.waitForLoadState('networkidle');

    // Assert
    const productNames = await inventoryPage.getProductNames();
    expect(productNames).toEqual(EXPECTED_PRODUCT_ORDER.NAME_A_TO_Z);
  });
});
