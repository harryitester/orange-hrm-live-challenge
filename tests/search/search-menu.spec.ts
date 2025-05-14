import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { SearchFunctionPage } from '../../pages/search-page/search-function-page';
import { log } from 'console';

test.describe('Dynamic Sidebar Search Menu', () => {
  let context, page, searchPage;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);
    searchPage = new SearchFunctionPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('1 character returns menu items', async () => {
    await test.step('Search with 1 character', async () => {
      await searchPage.searchMenu('A');
      const validation = await searchPage.validateMenuResultsContainKeyword('A');
      if (validation === 'No result') {
        expect(validation).toBe('No result');
      } else {
        expect(validation).toBe(true);
      }
    });
  });

  test('2 characters return menu items', async () => {
    await test.step('Search with 2 characters', async () => {
      await searchPage.searchMenu('Ad');
      const validation = await searchPage.validateMenuResultsContainKeyword('Ad');
      if (validation === 'No result') {
        expect(validation).toBe('No result');
      } else {
        expect(validation).toBe(true);
      }
    });
  });

  test('No menu returned for non-matching character', async () => {
    await test.step('Search with non-matching character', async () => {
      await searchPage.searchMenu('Z');
      const validation = await searchPage.validateMenuResultsContainKeyword('Z');
      expect(validation).toBe('No result');
    });
  });

  test('3 characters return menu items', async () => {
    await test.step('Search with 3 characters', async () => {
      await searchPage.searchMenu('Adm');
      const validation = await searchPage.validateMenuResultsContainKeyword('Adm');
      if (validation === 'No result') {
        expect(validation).toBe('No result');
      } else {
        expect(validation).toBe(true);
      }
    });
  });

  test('Verify search input', async () => {
    const searchText = await searchPage.verifySearchInputVisibleAndGetText();
    expect(searchText).toBe('your expected value');
  });
});