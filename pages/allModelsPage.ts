import {Locator, Page} from "@playwright/test";

export class AllModelsPage {
    readonly navSecondaryAllModelsLink: Locator;

    constructor(page: Page) {
        this.navSecondaryAllModelsLink = page.locator('[href^="/shop/all-models?"]') // Not an optimal locator
    }
}