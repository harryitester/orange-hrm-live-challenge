# Test info

- Name: TC_SEARCH_POS_01 - Search existing employee by full name
- Location: /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:14:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

    at LoginPage.gotoLoginPage (/Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/pages/login-page/login-page.ts:32:21)
    at loginAsAdmin (/Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:8:19)
    at /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:22:13
    at /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/search/search.spec.ts:21:16
```

# Test source

```ts
   1 | import { Page } from '@playwright/test';
   2 | import { BasePage } from '../base-pages';
   3 |
   4 | export class LoginPage extends BasePage {
   5 |   // Locators
   6 |   private usernameInput = '[name="username"]';
   7 |   private passwordInput = '[name="password"]';
   8 |   private loginButton = 'button[type="submit"]';
   9 |
  10 |   constructor(page: Page) {
  11 |     super(page);
  12 |   }
  13 |
  14 |   // Actions
  15 |   async login(username: string, password: string) {
  16 |     await this.waitAndFill(this.usernameInput, username);
  17 |     await this.waitAndFill(this.passwordInput, password);
  18 |     await this.waitAndClick(this.loginButton);
  19 |   }
  20 |
  21 |   async getErrorMessage() {
  22 |     // Adjust the selector if your error message uses a different one
  23 |     return this.page.textContent('.oxd-alert-content-text');
  24 |   }
  25 |
  26 |   async getRequiredMessages() {
  27 |     // Adjust the selector if your required field message uses a different one
  28 |     return this.page.locator('.oxd-input-field-error-message').allTextContents();
  29 |   }
  30 |
  31 |   async gotoLoginPage() {
> 32 |     await this.page.goto('/');
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  33 |   }
  34 | }
```