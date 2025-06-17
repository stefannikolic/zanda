import { Page, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

export class LoginPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async signIn(email: string, password: string) {
        
        const pm = new PageManager(this.page);

        await this.page.locator('header').locator('li.authorization-link a', { hasText: 'Sign In' }).click();
        await pm.usingUtility().waitForTitle('Customer Login');

        const emailInputfield = this.page.locator('#email');
        await emailInputfield.fill(email);

        const passwordInputfield = this.page.locator('#pass').first();
        await passwordInputfield.fill(password);

        await this.page.getByRole('button', { name: 'Sign in' }).click();
        await this.page.waitForTimeout(1000);

        await pm.usingUtility().waitForTitle('Home Page');
    }
}