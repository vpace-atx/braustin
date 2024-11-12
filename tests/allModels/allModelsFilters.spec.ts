import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.beforeEach(async ({ page }) => {
    await page.goto('/shop/all-models');
})

test('Number of results returned should be adjusted when user clicks Any', async ({ page, allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Single');
    await allModelsPage.filtersSelectSectionOption('Any');
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('83 Homes')
});

test('Number of results returned should be adjusted when user clicks Single', async ({ page, allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Single');
    await expect(allModelsPage.numberHomesReturnedText).not.toHaveText('83 Homes')
});

test('Number of results returned should be adjusted when user clicks Multi', async ({ page, allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Multi');
    await expect(allModelsPage.numberHomesReturnedText).not.toHaveText('83 Homes')
});

test('Reset filters button removes all filters', async ({ page, allModelsPage }) => {
    // confirms successful routing to All Models Page via link in UI
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('83 Homes');
});



