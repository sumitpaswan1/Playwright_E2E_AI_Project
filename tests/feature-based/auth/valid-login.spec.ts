import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Authentication & Login', () => {
  test('Valid Login with Standard User', async ({ page, loginPage }) => {
    // Arrange - Clear any existing sessions and navigate to login
    await page.context().clearCookies();
    await loginPage.goto();

    // Act & Assert - Navigate and verify login page
    expect(page.url()).toContain('/');
    expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();

    // Act - Enter credentials and login
    await loginPage.fillUsername('standard_user');
    expect(await loginPage.isUsernameFieldVisible()).toBeTruthy();

    await loginPage.fillPassword('secret_sauce');
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();

    await loginPage.clickLogin();

    // Assert - Verify successful login
    await page.waitForURL(/inventory\.html/);
    expect(page.url()).toContain('/inventory.html');

    const inventoryTitle = await page.locator('span.title').textContent();
    expect(inventoryTitle).toContain('Products');

    const cartIcon = page.locator('.shopping_cart_link');
    expect(await cartIcon.isVisible()).toBeTruthy();
  });
});
