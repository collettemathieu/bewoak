import { After, Before, Given, setDefaultTimeout, Then } from '@cucumber/cucumber';
import { type Browser, chromium, expect, type Page } from '@playwright/test';

setDefaultTimeout(60 * 1000);

let page: Page, browser: Browser;

Before(async () => {
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext();

    page = await context.newPage();
});

Given('User navigates to the Homepage', async () => {
    await page.goto('http://localhost:4000');
});

Then('It should show the test component', async () => {
    expect(await page.locator('p').innerText()).toContain('Test works!');
});

After(async () => {
    await browser.close();
});
