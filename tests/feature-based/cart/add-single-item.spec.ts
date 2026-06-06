import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe.serial('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Add Single Item to Cart', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();
    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(0);

    // Act
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(500);

    // Assert
    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    // Verify button changed to Remove
    const removeButton = page.locator(
      `button[data-test="remove-${PRODUCTS.SAUCE_LABS_BACKPACK.dataTest}"]`
    );
    expect(await removeButton.isVisible()).toBeTruthy();
  });
});
