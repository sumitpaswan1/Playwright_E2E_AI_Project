import { test, expect } from '../../../fixtures/base.fixture';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('End-to-End Complete Purchase Flow', () => {
  test('Complete Purchase Flow', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    // Arrange - Navigate and login
    await loginPage.goto();

    // Act & Assert - Login
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/inventory.html');

    // Act - Add items to cart
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);

    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(2);

    // Act - Go to cart
    await inventoryPage.clickCartIcon();
    await page.waitForLoadState('networkidle');

    // Assert - Verify cart
    expect(page.url()).toContain('/cart.html');
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(2);

    // Act - Checkout
    await cartPage.clickCheckout();
    await page.waitForLoadState('networkidle');

    // Assert - Checkout step one
    expect(page.url()).toContain('/checkout-step-one.html');

    // Act - Fill checkout info
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await page.waitForTimeout(300);
    await checkoutPage.clickContinue();
    await page.waitForLoadState('networkidle');

    // Assert - Checkout step two
    expect(page.url()).toContain('/checkout-step-two.html');
    const itemsOnReview = await checkoutPage.getCartItemsCount();
    expect(itemsOnReview).toBe(2);
  });
});
