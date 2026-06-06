import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Authentication & Login', () => {
  test('Invalid Credentials Show Error', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('wrong_password');
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
    expect(page.url()).not.toContain('/inventory.html');
  });
});
