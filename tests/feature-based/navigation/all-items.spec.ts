import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';
import { PRODUCTS } from '../../../utils/test-data';

test.describe('Menu & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Navigate to All Items', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.SAUCE_LABS_BACKPACK.dataTest);
    await page.waitForTimeout(300);

    let cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    // Act
    await inventoryPage.openMenu();
    await page.waitForTimeout(300);
    await inventoryPage.clickAllItems();
    await page.waitForLoadState('networkidle');

    // Assert
    expect(page.url()).toContain('/inventory.html');
    const productCount = await inventoryPage.getAllProductsCount();
    expect(productCount).toBe(6);

    const cartCountAfter = await inventoryPage.getCartCount();
    expect(cartCountAfter).toBe(1);
  });
});
