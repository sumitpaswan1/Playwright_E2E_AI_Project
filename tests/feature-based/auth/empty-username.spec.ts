import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Authentication & Login', () => {
  test('Empty Username Shows Validation Error', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });
});
