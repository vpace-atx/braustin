import {Locator, Page} from "@playwright/test";

export class AllModelsPage {
    readonly navSecondaryAllModelsLink: Locator;
    readonly searchHomesInput: Locator;
    readonly filteredResultCardNameText: Locator;
    readonly noItemsMatchFilterText: Locator;
    readonly numberHomesReturnedText: Locator;

    readonly filtersText: Locator;
    readonly resetFiltersBtn: Locator;
    readonly filtersSectionText: any;

    constructor(page: Page) {
        this.navSecondaryAllModelsLink = page.locator('[href^="/shop/all-models?"]'); // Not an optimal locator
        this.searchHomesInput = page.getByPlaceholder('Search homes').nth(1); // Not ideal to go off nth element
        this.filteredResultCardNameText = page.locator('#homecard-65540ac9edeb5cf98f79aa2f .text03-b'); // Not good class or ID names, since these are static they should be more descriptive as to what they're referencing
        this.noItemsMatchFilterText = page.locator('.text06-b', { hasText: 'No items match your filters' }); // Same as above
        this.numberHomesReturnedText = page.locator('.mt-3 .text03-b'); // Same as above

        this.filtersText = page.locator('.text05-b', { hasText: 'Filters' }); // Same as above
        this.resetFiltersBtn = page.getByText('Reset Filters');
        this.filtersSectionText = section => {
            return page.locator('aside section .text02-r', {hasText: section}).first();
        };
    }

    async searchHomes(searchText: string) {
        await this.searchHomesInput.fill(searchText);
    }

    async clearHomesSearch() {
        await this.searchHomesInput.fill('');
    }

    async filtersSelectSectionOption(section: string) {
        await this.filtersSectionText(section).click();
    }
}