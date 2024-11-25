import {Locator, Page} from "@playwright/test";

export class HomeInfoPage {
    readonly homeModelText: Locator;
    readonly monthlyPaymentText: Locator;
    readonly veryGoodCreditLbl: Locator;
    readonly twentyPercentDownPaymentLbl: Locator;
    readonly manualDownPaymentInput: Locator;
    readonly calculateDownPaymentBtn: Locator;
    readonly deliveryEstInput: Locator;
    readonly calculateDeliveryPaymentBtn: Locator;

    constructor(page: Page) {
        this.homeModelText = page.locator('h1.text06-b');
        this.monthlyPaymentText = page.locator('aside .shadow-card .text07-b');
        this.veryGoodCreditLbl = page.getByText('Very Good');
        this.twentyPercentDownPaymentLbl = page.locator('.text02-r', {hasText: '20%'});
        this.manualDownPaymentInput = page.getByPlaceholder('Enter Down Payment');
        this.calculateDownPaymentBtn = page.getByRole('button', {name: 'Calculate'}).first();
        this.deliveryEstInput = page.getByPlaceholder('Enter Zip Code');
        this.calculateDeliveryPaymentBtn = page.getByRole('button', {name: 'Calculate'}).nth(1);
    }

    async getMonthlyPaymentAmount() {
        return this.monthlyPaymentText.textContent();
    }

    async selectVeryGoodCredit() {
        await this.veryGoodCreditLbl.click();
    }

    async select20PercentDownPayment() {
        await this.twentyPercentDownPaymentLbl.click();
    }

    async manuallyUpdateDownPayment(percent: Number) {
        await this.manualDownPaymentInput.fill(String(percent))
        await this.calculateDownPaymentBtn.click({force: true});
    }

    async calculateDeliveryEst(zip: Number) {
        await this.deliveryEstInput.fill(String(zip));
        await this.calculateDeliveryPaymentBtn.click({force: true});
    }
}