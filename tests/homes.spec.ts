import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures'

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('Navigate to the Homes: All Models page via home page', async ({ page, homePage, allModelsPage  }) => {
  await homePage.clickShopAllModelsBtn();

  // confirm successful routing to All Models Page via link in UI
  await expect(allModelsPage.navSecondaryAllModelsLink).toBeVisible();

  // confirm successful routing to All Models Page via URL
  await expect(page).toHaveURL('/shop/all-models');
});