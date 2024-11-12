import { test as base } from '@playwright/test'
import {HomePage} from "../pages/homePage";
import {AllModelsPage} from "../pages/allModelsPage";

type MyFixtures = {
    homePage: HomePage;
    allModelsPage: AllModelsPage;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    allModelsPage: async ({page}, use) => {
        await use(new AllModelsPage(page));
    }
})