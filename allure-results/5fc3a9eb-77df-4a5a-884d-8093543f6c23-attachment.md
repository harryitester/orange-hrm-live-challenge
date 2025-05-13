# Test info

- Name: TC_SEARCH_POS_01 - Search existing employee by full name
- Location: /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:14:5

# Error details

```
Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
Run "npx playwright install msedge"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { LoginPage } from '../../pages/login-page/login-page';
   3 | import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';
   4 |
   5 | // Helper function for login
   6 | async function loginAsAdmin(page) {
   7 |   const loginPage = new LoginPage(page);
   8 |   await loginPage.gotoLoginPage();
   9 |   await loginPage.login('Admin', 'admin123');
   10 |   await expect(page).toHaveURL(/dashboard/);
   11 | }
   12 |
   13 | // TC_SEARCH_POS_01: Search existing employee by full name
>  14 | test(
      |     ^ Error: browserType.launch: Chromium distribution 'msedge' is not found at /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
   15 |   'TC_SEARCH_POS_01 - Search existing employee by full name',
   16 |   { tag: ['@automation', '@search'] },
   17 |   async ({ browser }) => {
   18 |     const context = await browser.newContext();
   19 |     const page = await context.newPage();
   20 |
   21 |     await test.step('Login as Admin', async () => {
   22 |       await loginAsAdmin(page);
   23 |     });
   24 |
   25 |     const dashboardPage = new DashboardPage(page);
   26 |
   27 |     await test.step('Navigate to Admin page', async () => {
   28 |       await dashboardPage.navigateTo();
   29 |     });
   30 |
   31 |     await test.step('Search for "Paul Collings"', async () => {
   32 |       await dashboardPage.searchByUsername('Paul Collings');
   33 |       const usernames = await dashboardPage.getUsernames();
   34 |       expect(usernames.join(' ')).toContain('Paul Collings');
   35 |     });
   36 |
   37 |     await context.close();
   38 |   }
   39 | );
   40 |
   41 | // TC_SEARCH_POS_02: Search with partial name
   42 | test(
   43 |   'TC_SEARCH_POS_02 - Search with partial name',
   44 |   { tag: ['@automation', '@search'] },
   45 |   async ({ browser }) => {
   46 |     const context = await browser.newContext();
   47 |     const page = await context.newPage();
   48 |
   49 |     await test.step('Login as Admin', async () => {
   50 |       await loginAsAdmin(page);
   51 |     });
   52 |
   53 |     const dashboardPage = new DashboardPage(page);
   54 |
   55 |     await test.step('Navigate to Admin page', async () => {
   56 |       await dashboardPage.navigateTo();
   57 |     });
   58 |
   59 |     await test.step('Search for "Paul"', async () => {
   60 |       await dashboardPage.searchByUsername('Paul');
   61 |       const usernames = await dashboardPage.getUsernames();
   62 |       expect(usernames.some(name => name.includes('Paul'))).toBeTruthy();
   63 |     });
   64 |
   65 |     await context.close();
   66 |   }
   67 | );
   68 |
   69 | // TC_SEARCH_POS_03: Search by ID
   70 | test(
   71 |   'TC_SEARCH_POS_03 - Search by valid employee ID',
   72 |   { tag: ['@automation', '@search'] },
   73 |   async ({ browser }) => {
   74 |     const context = await browser.newContext();
   75 |     const page = await context.newPage();
   76 |
   77 |     await test.step('Login as Admin', async () => {
   78 |       await loginAsAdmin(page);
   79 |     });
   80 |
   81 |     const dashboardPage = new DashboardPage(page);
   82 |
   83 |     await test.step('Navigate to Admin page', async () => {
   84 |       await dashboardPage.navigateTo();
   85 |     });
   86 |
   87 |     await test.step('Search for "E123"', async () => {
   88 |       await dashboardPage.searchByUsername('E123'); // Replace 'E123' with a real ID if needed
   89 |       const usernames = await dashboardPage.getUsernames();
   90 |       expect(usernames.join(' ')).toContain('E123');
   91 |     });
   92 |
   93 |     await context.close();
   94 |   }
   95 | );
   96 |
   97 | // TC_SEARCH_NEG_01: Search with non-existent name
   98 | test(
   99 |   'TC_SEARCH_NEG_01 - Search with non-existent name',
  100 |   { tag: ['@automation', '@search'] },
  101 |   async ({ browser }) => {
  102 |     const context = await browser.newContext();
  103 |     const page = await context.newPage();
  104 |
  105 |     await test.step('Login as Admin', async () => {
  106 |       await loginAsAdmin(page);
  107 |     });
  108 |
  109 |     const dashboardPage = new DashboardPage(page);
  110 |
  111 |     await test.step('Navigate to Admin page', async () => {
  112 |       await dashboardPage.navigateTo();
  113 |     });
  114 |
```