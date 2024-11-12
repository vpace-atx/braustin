import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

const validSearchText = 'Clayton Tempo Yesterday'
const invalidSearchText = 'Not a real house model'

test.beforeEach(async ({ page }) => {
    await page.goto('/shop/all-models');
})

test('Navigate to the Homes: All Models page directly via URL', async ({ page, allModelsPage }) => {
    // confirms successful routing to All Models Page via link in UI
    await expect(allModelsPage.navSecondaryAllModelsLink).toBeVisible();
});

test('Confirm that the search bar returns houses filtered by name', async ({ page, allModelsPage }) => {
    await expect(allModelsPage.searchHomesInput).toBeVisible();
    await allModelsPage.searchHomes(validSearchText);
    await expect(allModelsPage.filteredResultCardNameText).toHaveText(validSearchText);
    await expect(allModelsPage.numberHomesReturnedText).toBeVisible();
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('1 Home');
})

test('Confirm that an invalid name will not return results', async ({ page, allModelsPage }) => {
    await expect(allModelsPage.searchHomesInput).toBeVisible();
    await allModelsPage.searchHomes(invalidSearchText);
    await expect(allModelsPage.noItemsMatchFilterText).toBeVisible();
    await expect(allModelsPage.numberHomesReturnedText).toBeVisible();
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('0 Homes');
})

test('Confirm that clearing the search bar will return all results', async ({ page, allModelsPage }) => {
    await allModelsPage.searchHomes(invalidSearchText);
    await allModelsPage.clearHomesSearch();
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('83 Homes'); // Not great hardcoding 83 homes, this could be dynamic
})


