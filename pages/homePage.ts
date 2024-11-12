import {Locator, Page} from "@playwright/test";

export class HomePage {
    readonly shopAllModelsBtn: Locator;

    constructor(page: Page) {
        this.shopAllModelsBtn = page.getByRole('button').filter({ hasText: 'Shop All Models' });
    }

    async clickShopAllModelsBtn() {
        await this.shopAllModelsBtn.click();
    }


}