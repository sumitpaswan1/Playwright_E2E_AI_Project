import { test, expect } from '../../../fixtures/base.fixture';
import { TEST_USERS, TEST_PASSWORD, ERRORS } from '../../../utils/test-data';

test.describe('Authentication & Login', () => {
  test('Locked Out User Cannot Login', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act - Attempt login with locked out user
    await loginPage.fillUsername(TEST_USERS.LOCKED_OUT_USER);
    await loginPage.fillPassword(TEST_PASSWORD);
    await loginPage.clickLogin();

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(ERRORS.LOCKED_OUT);
    expect(page.url()).not.toContain('/inventory.html');
  });
});
