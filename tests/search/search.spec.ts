import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';

// Helper function for login
async function loginAsAdmin(page) {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);
}

// TC_SEARCH_POS_01: Search existing employee by full name
test(
  'TC_SEARCH_POS_01 - Search existing employee by full name',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search for "Paul Collings"', async () => {
      await dashboardPage.searchByUsername('Paul Collings');
      const usernames = await dashboardPage.getUsernames();
      expect(usernames.join(' ')).toContain('Paul Collings');
    });

    await context.close();
  }
);

// TC_SEARCH_POS_02: Search with partial name
test(
  'TC_SEARCH_POS_02 - Search with partial name',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search for "Paul"', async () => {
      await dashboardPage.searchByUsername('Paul');
      const usernames = await dashboardPage.getUsernames();
      expect(usernames.some(name => name.includes('Paul'))).toBeTruthy();
    });

    await context.close();
  }
);

// TC_SEARCH_POS_03: Search by ID
test(
  'TC_SEARCH_POS_03 - Search by valid employee ID',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search for "E123"', async () => {
      await dashboardPage.searchByUsername('E123'); // Replace 'E123' with a real ID if needed
      const usernames = await dashboardPage.getUsernames();
      expect(usernames.join(' ')).toContain('E123');
    });

    await context.close();
  }
);

// TC_SEARCH_NEG_01: Search with non-existent name
test(
  'TC_SEARCH_NEG_01 - Search with non-existent name',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search for "Ghost User"', async () => {
      await dashboardPage.searchByUsername('Ghost User');
      const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
      expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
    });

    await context.close();
  }
);

// TC_SEARCH_NEG_02: Search with empty input
test(
  'TC_SEARCH_NEG_02 - Search with empty input',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search with empty input', async () => {
      await dashboardPage.searchByUsername('');
      const usernames = await dashboardPage.getUsernames();
      expect(usernames.length).toBeGreaterThan(0); // Should show all or a validation
    });

    await context.close();
  }
);

// TC_SEARCH_NEG_03: Search with special characters
test(
  'TC_SEARCH_NEG_03 - Search with special characters',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search with special characters', async () => {
      await dashboardPage.searchByUsername('!@#$%');
      const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
      expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
    });

    await context.close();
  }
);

// TC_SEARCH_NEG_04: Search with SQL injection string
test(
  'TC_SEARCH_NEG_04 - Search with SQL injection string',
  { tag: ['@automation', '@search'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await test.step('Login as Admin', async () => {
      await loginAsAdmin(page);
    });

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to Admin page', async () => {
      await dashboardPage.navigateTo();
    });

    await test.step('Search with SQL injection string', async () => {
      await dashboardPage.searchByUsername("' OR 1=1 --");
      const noRecordsMsg = await dashboardPage.getNoRecordsMessage();
      expect(noRecordsMsg).toMatch(/No Records Found|No Records/);
    });

    await context.close();
  }
);