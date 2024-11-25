import { test as base } from '@playwright/test'
import {HomePage} from "../pages/homePage";
import {AllModelsPage} from "../pages/allModelsPage";
import {HomeInfoPage} from "../pages/homeInfoPage";

type MyFixtures = {
    homePage: HomePage;
    allModelsPage: AllModelsPage;
    homeInfoPage: HomeInfoPage;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    allModelsPage: async ({page}, use) => {
        await use(new AllModelsPage(page));
    },
    homeInfoPage: async ({page}, use) => {
        await use(new HomeInfoPage(page));
    }
})