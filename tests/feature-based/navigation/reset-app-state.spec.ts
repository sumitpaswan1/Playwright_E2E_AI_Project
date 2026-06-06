import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe.serial('Menu & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Reset App State', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);

    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(2);

    // Act
    await inventoryPage.openMenu();
    await page.waitForTimeout(300);
    await inventoryPage.resetAppState();
    await page.waitForTimeout(500);

    // Assert
    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(0);

    expect(page.url()).toContain('/inventory.html');
  });
});
