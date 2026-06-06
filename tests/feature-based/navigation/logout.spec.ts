import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe.serial('Menu & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Logout from Menu', async ({ page, inventoryPage, loginPage }) => {
    // Arrange
    await inventoryPage.goto();
    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(0);

    // Act
    await inventoryPage.openMenu();
    await page.waitForTimeout(300);
    await inventoryPage.logout();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toBe('https://www.saucedemo.com/');
    expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();
  });
});
