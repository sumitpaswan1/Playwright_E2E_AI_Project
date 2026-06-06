import { test, expect } from '../../../fixtures/base.fixture';
import { TEST_USERS, TEST_PASSWORD } from '../../../utils/test-data';

test.describe('Different User Accounts', () => {
  test('Problem User Account', async ({ page, loginPage, inventoryPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(TEST_USERS.PROBLEM_USER, TEST_PASSWORD);
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory.html');

    const productCount = await inventoryPage.getAllProductsCount();
    expect(productCount).toBeGreaterThan(0);

    const title = await inventoryPage.getPageTitle();
    expect(title).toContain('Products');
  });
});
