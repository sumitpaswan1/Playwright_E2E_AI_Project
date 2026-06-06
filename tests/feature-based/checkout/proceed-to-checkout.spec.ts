import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Proceed to Checkout with Items', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    // Act
    await cartPage.clickCheckout();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/checkout-step-one.html');
    expect(await checkoutPage.isFirstNameFieldVisible()).toBeTruthy();
    expect(await checkoutPage.isLastNameFieldVisible()).toBeTruthy();
    expect(await checkoutPage.isZipCodeFieldVisible()).toBeTruthy();

    const title = await checkoutPage.getCheckoutTitle();
    expect(title).toContain('Checkout');
  });
});
