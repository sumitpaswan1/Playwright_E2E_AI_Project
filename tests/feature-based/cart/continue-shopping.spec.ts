import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Continue Shopping from Cart', async ({ page, inventoryPage, cartPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    const cartBadgeCountBefore = await cartPage.getCartBadgeCount();
    expect(cartBadgeCountBefore).toBe(1);

    // Act
    await cartPage.clickContinueShopping();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory.html');

    const cartBadgeCountAfter = await inventoryPage.getCartCount();
    expect(cartBadgeCountAfter).toBe(1);
  });
});
