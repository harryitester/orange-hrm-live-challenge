import { Page } from '@playwright/test';
import { BasePage } from '../base-pages';

export class DashboardPage extends BasePage {
  private adminMenu = 'a.oxd-main-menu-item:has-text("Admin")';
  private usernameInput = 'input[placeholder="Username"]';
  private searchButton = 'button:has-text("Search")';
  private userRows = 'div.oxd-table-body > div.oxd-table-card';

  constructor(page: Page) {
    super(page);
  }

  async navigateTo() {
    await this.waitAndClick(this.adminMenu);
  }

  async searchByUsername(username: string) {
    await this.waitAndFill(this.usernameInput, username);
    await this.waitAndClick(this.searchButton);
  }

  async getUsernames(): Promise<string[]> {
    const rows = await this.page.$$(this.userRows);
    const usernames: string[] = [];
    for (const row of rows) {
      const username = await row.$eval('div:nth-child(2)', el => el.textContent?.trim() || '');
      usernames.push(username);
    }
    return usernames;
  }

  async getNoRecordsMessage() {
    // Adjust the selector if your "No Records Found" message uses a different one
    return this.page.textContent('.oxd-table-body .oxd-table-row .oxd-table-cell');
  }
}