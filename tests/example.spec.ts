import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import {AllModelsPage} from "../pages/allModelsPage";

test('Navigate to Homes: All Models page directly via URL', async ({ page }) => {
  const allModelsPage: AllModelsPage = new AllModelsPage(page);

  await page.goto('/shop/all-models');

  // confirms successful routing to All Models Page via link in UI
  await expect(allModelsPage.navSecondaryAllModelsLink).toBeVisible();
});

test('Navigate to Homes: All Models page via home page', async ({ page}) => {
  const homePage = new HomePage(page);
  const allModelsPage: AllModelsPage = new AllModelsPage(page);

  await page.goto('/');
  await homePage.clickShopAllModelsBtn();

  // confirm successful routing to All Models Page via link in UI
  await expect(allModelsPage.navSecondaryAllModelsLink).toBeVisible();

  // confirm successful routing to All Models Page via URL
  await expect(page).toHaveURL('/shop/all-models');


});


