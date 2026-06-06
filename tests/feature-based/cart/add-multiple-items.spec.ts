import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Shopping Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Add Multiple Items to Cart', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act - Add first item
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);
    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    // Act - Add second item
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BIKE_LIGHT.dataTest);
    await page.waitForTimeout(300);
    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(2);

    // Act - Add third item
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BOLT_T_SHIRT.dataTest);
    await page.waitForTimeout(300);

    // Assert
    cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(3);
  });
});
