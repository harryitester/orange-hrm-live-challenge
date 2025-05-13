import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly localization: any;

  constructor(page: Page) {
    this.page = page;
  }

  /* ============ Methods =============== */

  async goto(path: string) {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) throw new Error('BASE_URL is not defined in environment variables');
    await this.page.goto(`${baseUrl}${path}`, {
      waitUntil: "domcontentloaded",
    });
  }

  async clickItemByText(text: string) {
    await this.waitAndClick(`text='${text}'`);
  }

  async waitAndClick(locator: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.click();
  }

  async waitAndFill(locator: string, value: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.fill(value);
  }

  async waitAndVerifyText(locator: string, text: string, index: number = 0) {
    const element = this.page
      .locator(locator, {
        hasText: `/^${text}$/g`,
      })
      .nth(index);
    await element.waitFor({
      state: "visible",
    });
  }
  /*==================Verification==============*/

  async verifyElementVisible(
    locator: string,
    index: number = 0,
    timeout?: number
  ) {
    const element = this.page.locator(locator).nth(index);
    if (timeout) {
      await expect(element).toBeVisible({ timeout: timeout });
    } else {
      await expect(element).toBeVisible();
    }
  }

  async verifyElementDisabled(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).toBeDisabled({ timeout: timeout });
    } else await expect(element).toBeDisabled({ timeout: timeout });
  }
}
