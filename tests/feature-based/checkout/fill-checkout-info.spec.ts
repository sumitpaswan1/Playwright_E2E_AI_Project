import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Fill Checkout Information Correctly', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    await cartPage.clickCheckout();
    await page.waitForLoadState('networkidle');

    // Act
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await page.waitForTimeout(300);
    await checkoutPage.clickContinue();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/checkout-step-two.html');
    expect(await checkoutPage.isOnCheckoutStepTwo()).toBeTruthy();
  });
});
