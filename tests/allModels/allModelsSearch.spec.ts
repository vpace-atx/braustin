import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'
import exp = require("constants");

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

test('Validate monthly payment is dynamic based off different parameters', async ({ page, allModelsPage, homeInfoPage }) => {
    await allModelsPage.selectFirstHouse();
    await homeInfoPage.homeModelText.isVisible();
    let initialPaymentAmt= await homeInfoPage.getMonthlyPaymentAmount();
    let veryGoodCreditPaymentAmt = initialPaymentAmt;

    // Adjust the Credit Score to confirm change to the expected monthly payment
    await homeInfoPage.selectVeryGoodCredit();
    do {
        veryGoodCreditPaymentAmt = await homeInfoPage.getMonthlyPaymentAmount();
    } while (veryGoodCreditPaymentAmt == initialPaymentAmt);
    expect(veryGoodCreditPaymentAmt).not.toBe(initialPaymentAmt);

    let twentyPercentDownPaymentAmt = veryGoodCreditPaymentAmt;

    // Adjust the down payment, both by percentage and monetary amount to confirm changes to the expected monthly payment
    await homeInfoPage.select20PercentDownPayment();
    do {
        twentyPercentDownPaymentAmt = await homeInfoPage.getMonthlyPaymentAmount();
    } while (twentyPercentDownPaymentAmt == veryGoodCreditPaymentAmt);
    expect(twentyPercentDownPaymentAmt).not.toBe(veryGoodCreditPaymentAmt);
    let manualDownPaymentAmt = twentyPercentDownPaymentAmt;
    await homeInfoPage.manuallyUpdateDownPayment(0);
    do {
        manualDownPaymentAmt = await homeInfoPage.getMonthlyPaymentAmount();
    } while (manualDownPaymentAmt == twentyPercentDownPaymentAmt);
    expect(manualDownPaymentAmt).not.toBe(twentyPercentDownPaymentAmt);
    let deliveryEstAmt = manualDownPaymentAmt;

    // Make adjustments under the “Delivery Est” to confirm changes to the estimated cost
    await homeInfoPage.calculateDeliveryEst(78758);
    do {
        deliveryEstAmt = await homeInfoPage.getMonthlyPaymentAmount();
    } while (deliveryEstAmt == manualDownPaymentAmt);
    expect(deliveryEstAmt).not.toBe(manualDownPaymentAmt);

    // Confirm behavior when an invalid zip code is added
    await homeInfoPage.calculateDeliveryEst(0);
    await homeInfoPage.getMonthlyPaymentAmount().then(deliveryAmt => {
        expect(deliveryAmt).toEqual(deliveryEstAmt);
    })
})


