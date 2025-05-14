import { Page } from '@playwright/test';
import { BasePage } from '../base-pages';

export class SearchFunctionPage extends BasePage {
  private searchInput = 'input[placeholder="Search"]';
  private menuItems = 'ul.oxd-main-menu > li, .oxd-main-menu-item'; 

  constructor(page: Page) {
    super(page);
  }

  async searchMenu(keyword: string) {
    await this.waitAndClick(this.searchInput);
    await this.waitAndFill(this.searchInput, ''); // Clear previous value
    if (keyword) {
      await this.waitAndFill(this.searchInput, keyword);
    }
    // Wait for the menu to update
    await this.page.waitForTimeout(200);
  }

  async getMenuResults(): Promise<string[]> {
    return this.page.locator(this.menuItems).allTextContents();
  }

  async verifySearchInputVisibleAndGetText(): Promise<string | null> {
    await this.verifyElementVisible(this.searchInput);
    return this.waitAndGetText(this.searchInput);
  }

  async validateMenuResultsContainKeyword(keyword: string): Promise<true | string> {
    const results = await this.getMenuResults();
    if (results.length === 0) {
      return 'No result';
    }
    for (const item of results) {
      if (!item.toLowerCase().includes(keyword.toLowerCase())) {
        throw new Error(`Menu item "${item}" does not contain keyword "${keyword}"`);
      }
    }
    return true;
  }
}