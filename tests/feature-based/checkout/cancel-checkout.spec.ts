import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Cancel Checkout', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    let cartCountBefore = await cartPage.getCartBadgeCount();
    expect(cartCountBefore).toBe(1);

    await cartPage.clickCheckout();
    await page.waitForLoadState('networkidle');

    // Act
    await checkoutPage.clickCancel();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/cart.html');

    const cartCountAfter = await cartPage.getCartBadgeCount();
    expect(cartCountAfter).toBe(1);
  });
});
