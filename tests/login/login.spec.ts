import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { accountData } from '../../data/account';
import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';

test('TC_LOGIN_POS_01 - Login with valid credentials',
    { tag: ['@automation', '@login'] }, 
    async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
    });

    await test.step('Verify dashboard is shown', async () => {
      await expect(page).toHaveURL(/dashboard/);
    });

    await context.close();
  }
);

test(
  'TC_LOGIN_NEG_01 - Login with invalid username',
  { tag: ['@automation', '@login'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with invalid username', async () => {
      await loginPage.login('wrongUser', 'admin123');
    });

    await test.step('Verify error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain('Invalid credentials');
    });

    await context.close();
  }
);

test(
  'TC_LOGIN_NEG_02 - Login with invalid password',
  { tag: ['@automation', '@login'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with invalid password', async () => {
      await loginPage.login('Admin', 'wrongPass');
    });

    await test.step('Verify error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain('Invalid credentials');
    });

    await context.close();
  }
);

test(
  'TC_LOGIN_NEG_03 - Login with empty username',
  { tag: ['@automation', '@login'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with empty username', async () => {
      await loginPage.login('', 'admin123');
    });

    await test.step('Verify required message', async () => {
      const requiredMessages = await loginPage.getRequiredMessages();
      expect(requiredMessages.join(' ')).toContain('Required');
    });

    await context.close();
  }
);

test(
  'TC_LOGIN_NEG_04 - Login with empty password',
  { tag: ['@automation', '@login'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with empty password', async () => {
      await loginPage.login('Admin', '');
    });

    await test.step('Verify required message', async () => {
      const requiredMessages = await loginPage.getRequiredMessages();
      expect(requiredMessages.join(' ')).toContain('Required');
    });

    await context.close();
  }
);

test(
  'TC_LOGIN_NEG_05 - Login with SQL injection attempt',
  { tag: ['@automation', '@login'] },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Login with SQL injection attempt', async () => {
      await loginPage.login("' OR 1=1 -- /", "' OR '1'='1");
    });

    await test.step('Verify error message', async () => {
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain('Invalid credentials');
    });

    await context.close();
  }
);