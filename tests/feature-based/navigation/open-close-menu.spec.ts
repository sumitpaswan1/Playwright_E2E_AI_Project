import { test, expect } from '../../../fixtures/base.fixture';
import { loginAsStandardUser } from '../../../utils/helpers';

test.describe('Menu & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Open and Close Menu', async ({ page, inventoryPage }) => {
    // Arrange
    await inventoryPage.goto();

    // Act - Open menu
    await inventoryPage.openMenu();
    await page.waitForTimeout(300);

    // Assert
    expect(await inventoryPage.isMenuOpen()).toBeTruthy();

    // Act - Close menu
    await inventoryPage.closeMenu();
    // Wait for the logout link to become hidden after menu closes
    await page.locator('a[data-test="logout-sidebar-link"]').waitFor({ state: 'hidden', timeout: 5000 });

    // Assert
    expect(await inventoryPage.isMenuOpen()).toBeFalsy();
  });
});
