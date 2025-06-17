import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto(process.env.URL);
    await pm.usingUtility().waitForTitle('Home Page');
});

test('wishlist feature @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Navigate to header username dropdown and click on "My Wish List"
    const header_name = page.locator('.customer-name').first();
    await header_name.locator('.action.switch').click();
    await page.locator('.link.wishlist').first().click();

    // Verify title "My Wish List"
    await pm.usingUtility().waitForTitle('My Wish List');

    // Verify there in nothing inside wish list
    await expect(page.locator('.message.info')).toHaveText('You have no items in your wish list.');

    // Search for "jackets"
    await pm.usingUtility().searchStore('jackets');

    // Click on Image "Jade Yoga Jacket"
    await page.locator('img[alt="Jade Yoga Jacket"]').click();
    await expect(page.locator('.product-info-main')).toBeVisible();

    // Click on "Add to wish list"
    const productAddToLinks = page.locator('.product-addto-links');
    await productAddToLinks.locator('.action.towishlist').click();
    await page.waitForTimeout(1000);

    // Verify title "My Wish List"
    await pm.usingUtility().waitForTitle('My Wish List');

    // Verify successfull message
    await pm.usingUtility().infoMessage('Jade Yoga Jacket has been added to your Wish List.');

    // Verify that one or more products are displayed
    const productCount = await page.locator('ol.product-items li').count();
    expect(productCount).toBeGreaterThan(0);

    // Verify sidebar wish list is visible
    const sidebar_wishlist = page.locator('.block-wishlist');
    await expect(sidebar_wishlist).toBeVisible();

    // Verify title "My Wish List" and text "1 item" next to the title
    await expect(sidebar_wishlist.locator('.block-title strong')).toHaveText('My Wish List');
    await expect(sidebar_wishlist.locator('span.counter')).toHaveText('1 item');

    // Delete item from wish list
    const product_item_details = page.locator('.product-item-details');
    await product_item_details.locator('.actions-secondary a').click();

    // Verify message for deleted item from wish list
    await expect(page.locator('.message.info')).toHaveText('You have no items in your wish list.');
});