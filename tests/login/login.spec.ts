import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { accountData } from '../../data/account'
import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';

let context;
let page;
let loginPage;
let dashboardPage;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.gotoLoginPage();
});

test.afterEach(async () => {
    await context.close();
});

test('[Functional][Positive Case] Ensure Admin user account login success @login @new', async () => {
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(accountData.validUser.username, accountData.validUser.password);
    });

    await test.step('Admin user login success to see the Dashboard as default behavious', async () => {
        await dashboardPage.verifyDashboardPageUrl();
        await dashboardPage.verifyDashboardPageTitle();
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid username and password @login', async () => {
    await test.step('Login with invalid username and password', async () => {
        await loginPage.login(accountData.invalidUser.username, accountData.invalidUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid username @login', async () => {
    await test.step('Login with invalid username', async () => {
        await loginPage.login(accountData.invalidUser.username, accountData.validUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid password @login', async () => {
    await test.step('Login with valid username and invalid password', async () => {
        await loginPage.login(accountData.validUser.username, accountData.invalidUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure a user cannot login with blank Username and Password @login', async () => {
    await test.step('Login with empty username and password', async () => {
        await loginPage.login('', '');
    });

    await test.step('Warning message "Required" showing below Username and Password textbox.', async () => {
        const expectedMessage = 'Required';
        await loginPage.verifyUsernameRequiredMessage(expectedMessage);
        await loginPage.verifyPasswordRequiredMessage(expectedMessage);
    });
});

test('[UI/UX][Positive Case] Ensure the "Orangehrm-Logo-Branding" and "Orangehrm-Logo-Branding-Image" visible on the login page @login', async () => {
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(accountData.validUser.username, accountData.validUser.password);
    });

    await test.step('Should see "Orangehrm-Logo-Branding" and "Orangehrm-Logo-Branding-Image" visible on the login page', async () => {
        await loginPage.isOrangehrmLogoBrandingVisible();
        await loginPage.isOrangehrmLogoBrandingImageVisible();
    });
});

test('[UI/UX][Positive Case] Ensure the "Orangehrm-demo-credentials" page showing correct as design @login', async () => {
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(accountData.validUser.username, accountData.validUser.password);
    });

    await test.step('Verify "Orangehrm-demo-credentials" page showing correct as design', async () => {
        await loginPage.isDemoAccountTextCorrect();
    });
});

test('[UI/UX][Positive Case] Ensure hint text in Username and Password textbox showing correct as design @login', async () => {

    await test.step('Verify the Hint text in Username and Password textbox showing correct as design', async () => {
        await loginPage.isUsernameAndPasswordPlaceholderCorrect();
    });
});