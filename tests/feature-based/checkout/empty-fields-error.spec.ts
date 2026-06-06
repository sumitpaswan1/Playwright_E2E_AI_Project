import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Checkout with Empty Fields Shows Error', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    await cartPage.clickCheckout();
    await page.waitForLoadState('networkidle');

    // Act
    await checkoutPage.clickContinue();
    await page.waitForTimeout(500);

    // Assert
    expect(await checkoutPage.isErrorDisplayed()).toBeTruthy();
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('is required');
  });
});
