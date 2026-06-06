import { test, expect } from '../../../fixtures/base.fixture';
import { TEST_USERS, TEST_PASSWORD } from '../../../utils/test-data';

test.describe('Different User Accounts', () => {
  test('Visual User Account', async ({ page, loginPage, inventoryPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(TEST_USERS.VISUAL_USER, TEST_PASSWORD);
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory.html');

    const productCount = await inventoryPage.getAllProductsCount();
    expect(productCount).toBeGreaterThan(0);

    const productNames = await inventoryPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
  });
});
