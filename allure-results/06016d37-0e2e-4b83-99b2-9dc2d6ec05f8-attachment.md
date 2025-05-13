# Test info

- Name: TC_LOGIN_POS_01 - Login with valid credentials
- Location: /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/login/login.spec.ts:7:5

# Error details

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[name="username"]').first() to be visible

    at LoginPage.waitAndFill (/Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/pages/base-pages.ts:62:19)
    at LoginPage.login (/Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/pages/login-page/login-page.ts:16:16)
    at /Users/admin/Desktop/automation-challenge/orange-hrm-live-challenge/tests/login/login.spec.ts:9:19
```

# Test source

```ts
   1 | import { expect, Page } from "@playwright/test";
   2 | import { environment } from '../env/environment';
   3 |
   4 | export class BasePage {
   5 |   readonly page: Page;
   6 |   readonly localization: any;
   7 |
   8 |   constructor(page: Page) {
   9 |     this.page = page;
   10 |   }
   11 |
   12 |   /* ============ Methods =============== */
   13 |
   14 |   async goto(path: string) {
   15 |     await this.page.goto(`${environment.baseUrl}${path}`, {
   16 |       waitUntil: "domcontentloaded",
   17 |     });
   18 |   }
   19 |
   20 |   async getColor(locator: string, index: number = 0) {
   21 |     let element = this.page.locator(locator).nth(index);
   22 |     const actualColor = await element.evaluate((value) => {
   23 |       return window.getComputedStyle(value).getPropertyValue("color");
   24 |     });
   25 |     return actualColor;
   26 |   }
   27 |
   28 |   async getBackGroundColor(locator: string) {
   29 |     let element = this.page.locator(locator);
   30 |     const actualColor = await element.evaluate((value) => {
   31 |       return window
   32 |         .getComputedStyle(value)
   33 |         .getPropertyValue("background-color");
   34 |     });
   35 |     return actualColor;
   36 |   }
   37 |
   38 |   async fillElementInFrame(
   39 |     frameLocator: string,
   40 |     locator: string,
   41 |     text: string
   42 |   ) {
   43 |     const element = this.page.frameLocator(frameLocator).locator(locator);
   44 |     await element.click();
   45 |     await element.fill(text);
   46 |   }
   47 |
   48 |   async clickItemByText(text: string) {
   49 |     await this.waitAndClick(`text='${text}'`);
   50 |   }
   51 |
   52 |   async waitAndClick(locator: string, index: number = 0) {
   53 |     const element = this.page.locator(locator).nth(index);
   54 |     await element.waitFor({
   55 |       state: "visible",
   56 |     });
   57 |     await element.click();
   58 |   }
   59 |
   60 |   async waitAndFill(locator: string, value: string, index: number = 0) {
   61 |     const element = this.page.locator(locator).nth(index);
>  62 |     await element.waitFor({
      |                   ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
   63 |       state: "visible",
   64 |     });
   65 |     await element.fill(value);
   66 |   }
   67 |
   68 |   async waitAndType(locator: string, value: string, index: number = 0) {
   69 |     const element = this.page.locator(locator).nth(index);
   70 |     await element.waitFor({
   71 |       state: "visible",
   72 |     });
   73 |     await element.click();
   74 |     await element.fill("");
   75 |
   76 |     for (const char of value) {
   77 |       await element.press(char);
   78 |     }
   79 |   }
   80 |
   81 |   async waitAndSelectByValue(
   82 |     locator: string,
   83 |     value: string,
   84 |     index: number = 0
   85 |   ) {
   86 |     const element = this.page.locator(locator).nth(index);
   87 |     await element.waitFor({
   88 |       state: "visible",
   89 |     });
   90 |     await element.selectOption({ value: value });
   91 |   }
   92 |
   93 |   async waitAndSelectByLabel(
   94 |     locator: string,
   95 |     value: string,
   96 |     index: number = 0
   97 |   ) {
   98 |     const element = this.page.locator(locator).nth(index);
   99 |     await element.waitFor({
  100 |       state: "visible",
  101 |     });
  102 |     await element.selectOption({ label: value });
  103 |   }
  104 |
  105 |   async waitAndSelectByIndex(
  106 |     locator: string,
  107 |     value: number,
  108 |     index: number = 0
  109 |   ) {
  110 |     const element = this.page.locator(locator).nth(0);
  111 |     await element.waitFor({
  112 |       state: "visible",
  113 |     });
  114 |     await element.selectOption({ index: value });
  115 |   }
  116 |
  117 |   async waitAndGetText(
  118 |     locator: string,
  119 |     index: number = 0
  120 |   ): Promise<string | null> {
  121 |     const element = this.page.locator(locator).nth(index);
  122 |     const isVisible = await element.isVisible();
  123 |     if (!isVisible) {
  124 |       return null;
  125 |     }
  126 |     let elementText = await element.innerText();
  127 |     if (elementText === null) {
  128 |       return "Element Text is null, Pls check element locator or its textContent";
  129 |     } else {
  130 |       return elementText;
  131 |     }
  132 |   }
  133 |
  134 |   async waitAndVerifyText(locator: string, text: string, index: number = 0) {
  135 |     const element = this.page
  136 |       .locator(locator, {
  137 |         hasText: `/^${text}$/g`,
  138 |       })
  139 |       .nth(index);
  140 |     await element.waitFor({
  141 |       state: "visible",
  142 |     });
  143 |   }
  144 |
  145 |   async waitForResponseSuccess(url: string) {
  146 |     await this.page.waitForResponse(
  147 |       (response) => response.url().includes(url) && response.status() === 200
  148 |     );
  149 |   }
  150 |
  151 |   async waitForPageLoaded(url: string) {
  152 |     await this.page.waitForResponse(
  153 |       (response) => response.url().includes(url) && response.status() === 304
  154 |     );
  155 |   }
  156 |
  157 |   async getInputValue(locator: string, index: number = 0) {
  158 |     const element = this.page.locator(locator).nth(index);
  159 |     return await element.inputValue();
  160 |   }
  161 |
  162 |   async waitForTimeout(time: number) {
```