import { test, expect } from '@playwright/test'; //Browser - 
//'@playwright/test' is fixture library which is used to run the tests. 
// It provides a test runner, assertion library, and other utilities for 
// writing and running tests with Playwright.

test('has title', async ({ page }) => { //Page
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
}); //Context

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
