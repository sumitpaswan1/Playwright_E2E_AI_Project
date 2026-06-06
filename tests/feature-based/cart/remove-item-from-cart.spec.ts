import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Remove Item from Cart Page', async ({ page, inventoryPage, cartPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    let itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(2);

    // Act
    await cartPage.removeItemByName('Sauce Labs Backpack');
    await page.waitForTimeout(500);

    // Assert
    itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(1);

    const cartBadgeCount = await cartPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });
});
