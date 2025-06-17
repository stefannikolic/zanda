import { Page, expect } from '@playwright/test';


export class Utility {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForTitle(title: string) {
        const pageTitle = this.page.locator('.page-title');
        await expect(pageTitle).toBeVisible();
        await expect(pageTitle).toHaveText(title);
    }

    async searchStore(item: string) {
        const searchInput = this.page.locator('input#search');
        await searchInput.fill(item);
        await this.page.keyboard.press('Enter');
    }

    async infoMessage(message_text: string) {
        const info_message = this.page.getByRole('alert');
        await expect(info_message).toBeVisible();
        await expect(info_message).toContainText(message_text);
    }

}