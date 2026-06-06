import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe.serial('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Remove Item from Products Page', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    // Act
    await inventoryPage.removeFromCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    // Assert
    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(0);

    // Verify button changed back to Add to cart
    const addButton = page.locator(
      `button[data-test="add-to-cart-${PRODUCTS.SAUCE_LABS_BACKPACK.dataTest}"]`
    );
    expect(await addButton.isVisible()).toBeTruthy();
  });
});
