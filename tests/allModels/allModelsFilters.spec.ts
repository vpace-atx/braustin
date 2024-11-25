import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

const searchText = 'Clayton';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop/all-models');
})

test('Number of results returned should be adjusted when user clicks Any', async ({ allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Single');
    await allModelsPage.filtersSelectSectionOption('Any');
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('83 Homes')
});

test('Number of results returned should be adjusted when user clicks Single', async ({ allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Single');
    await expect(allModelsPage.numberHomesReturnedText).not.toHaveText('83 Homes')
});

test('Number of results returned should be adjusted when user clicks Multi', async ({ allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Multi');
    await expect(allModelsPage.numberHomesReturnedText).not.toHaveText('83 Homes')
});

test('Reset filters button removes all filters', async ({ allModelsPage }) => {
    await allModelsPage.filtersSelectSectionOption('Multi');
    await allModelsPage.resetFilters();
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('83 Homes');
});

test('Confirm that out of range options result in no items match filter (ex. no Clayton homes over 2000/mo)', async ({allModelsPage}) => {
    await allModelsPage.searchHomes(searchText);
    await allModelsPage.enterMinimumPayment(2000);
    await expect(allModelsPage.numberHomesReturnedText).toHaveText('0 Homes');
    await expect(allModelsPage.noItemsMatchFilterText).toBeVisible();
})

test('Monthly payment validation', async ({ page, allModelsPage }) => {

})


