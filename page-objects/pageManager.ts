import { Page } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import { Utility } from '../page-objects/utility'


export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly utility: Utility

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.utility = new Utility(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    usingUtility() {
        return this.utility
    }

}