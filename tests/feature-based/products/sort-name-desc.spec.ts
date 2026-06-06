import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { SORT_OPTIONS } from '../../../utils/test-data';

test.describe('Product Inventory & Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Sort Products by Name (Z to A)', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.sortBy(SORT_OPTIONS.NAME_Z_TO_A);
    await page.waitForLoadState('networkidle');

    // Assert
    const productNames = await inventoryPage.getProductNames();
    const expectedOrder = [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ];
    expect(productNames).toEqual(expectedOrder);
  });
});
