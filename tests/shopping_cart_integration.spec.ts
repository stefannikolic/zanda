import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto(process.env.URL);
    await pm.usingUtility().waitForTitle('Home Page');
});

test('shopping cart integration @end2end', async ({ page }) => {

    const pm = new PageManager(page);

    // Sign In with regular user
    await pm.onLoginPage().signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    // Search for "jackets"
    await pm.usingUtility().searchStore('jackets');

    // Click on Image "Jade Yoga Jacket"
    await page.locator('img[alt="Jade Yoga Jacket"]').click();
    await expect(page.locator('.product-info-main')).toBeVisible();

    // Verify there is no counter next to shopping cart icon
    const counterNumber = page.locator('.counter-number');
    await expect(counterNumber).not.toBeVisible();

    // Select options and click on "Add to Cart" button
    await page.locator('[option-label="L"]').click();
    await page.locator('[option-label="Gray"]').click();
    await page.locator('#product-addtocart-button').click();

    // Wait for counter loader to be hidden
    await expect(page.locator('.counter.qty._block-content-loading')).toBeHidden();

    // Verify counter number is equal "1"
    await expect(counterNumber).toHaveText('1');

    // Verify success message
    await pm.usingUtility().infoMessage('You added Jade Yoga Jacket to your shopping cart.');

    // Click on counter number
    await counterNumber.click();

    // Within content window click "View and Edit Cart"
    const blockcontent = page.locator('.block-content');
    await blockcontent.locator('span', { hasText: 'View and Edit Cart'}).click();

    // Verify cart "Summary: title text
    await expect(page.locator('.summary.title')).toHaveText('Summary');

    // Open shipping dropdown menu
    await page.locator('#block-shipping').click();

    // Verify title "Flat Rate"
    const coShippingMethodForm = page.locator('#co-shipping-method-form');
    const flatRateTitle = coShippingMethodForm.locator('dl.items.methods dt.item-title').first();
    await expect(flatRateTitle).toHaveText('Flat Rate');

    // Verify flat rate value "$5.00"
    const flatRateValue = coShippingMethodForm.locator('dl.items.methods dd.item-options').first();
    await expect(flatRateValue.locator('span.price').first()).toHaveText('$5.00');

    // Delete item from shopping cart
    const shoppingCartTable = page.locator('#shopping-cart-table');
    await shoppingCartTable.locator('.action-delete').click();

    // Verify deleted item message
    await expect(page.locator('.cart-empty')).toContainText('You have no items in your shopping cart.');
});