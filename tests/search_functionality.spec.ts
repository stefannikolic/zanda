import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto(process.env.URL);
    await pm.usingUtility().waitForTitle('Home Page');
});

test('search functionality @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Search for "jackets" 
    await pm.usingUtility().searchStore('jackets');

    // Wait for product to be visible
    await expect(page.locator('.products-grid')).toBeVisible();

    // Verify that one or more products are displayed
    const productCount = await page.locator('ol.products li').count();
    expect(productCount).toBeGreaterThan(0);

});

test('search functionality - no results @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Search for "noitemexist"
    await pm.usingUtility().searchStore('noitemexist');

    // Verify message with no results
    await expect(page.locator('.message.notice')).toContainText('Your search returned no results');

});

test('search functionality - special characters @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Search for "@#$%"
    await pm.usingUtility().searchStore('@#$%');

    // Verify message with no results
    await expect(page.locator('.message.notice')).toContainText('Your search returned no results');

});

test('search functionality - dropdown suggestions @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Search for "jackets", slow type
    const searchInput = page.locator('input#search');
    await searchInput.click();
    await page.keyboard.type('jackets', { delay: 150 });

    // Expected results
    const expectedSuggestions = [
        { name: 'Jackets', amount: '1' },
        { name: 'Jackets for women', amount: '13' },
        { name: 'jackets for men', amount: '11' },
        { name: 'Jackets for w', amount: '176' },
        { name: 'Jackets for me', amount: '13' },
        { name: 'jackets of men', amount: '18' },
        { name: 'jackets forDiva Gym Tee', amount: '11' },
        { name: 'Jackets+for+w', amount: '176' }
    ];

    // Verify expected results
    const items = page.locator('#search_autocomplete ul li');

    for (let i = 0; i < expectedSuggestions.length; i++) {
        const item = items.nth(i);
        const name = item.locator('.qs-option-name');
        const amount = item.locator('.amount');

        await expect(name).toHaveText(expectedSuggestions[i].name, { ignoreCase: true });
        await expect(amount).toHaveText(expectedSuggestions[i].amount);
    }
});