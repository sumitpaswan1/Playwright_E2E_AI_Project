import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('View Cart with Items', async ({ page, inventoryPage, cartPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act - Add items
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BOLT_T_SHIRT.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/cart.html');
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(3);

    const cartBadgeCount = await cartPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(3);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames.length).toBe(3);
    expect(itemNames[0]).toContain('Sauce Labs Backpack');
  });
});
