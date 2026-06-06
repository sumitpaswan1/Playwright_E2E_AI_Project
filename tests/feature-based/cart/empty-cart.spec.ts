import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('View Empty Cart', async ({ page, inventoryPage, cartPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/cart.html');
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(0);

    expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
    expect(await cartPage.isContinueShoppingButtonVisible()).toBeTruthy();
  });
});
