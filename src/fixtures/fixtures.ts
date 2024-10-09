import { test as base } from "@playwright/test";
import {
  HomePage,
  ProductPage,
  SearchResultsPage,
  AppleWatchesPage,
  AppleStorePage,
} from "../pages/";

type PageTypes = {
  homePage: HomePage;
  productsPage: ProductPage;
  searchResultsPage: SearchResultsPage;
  appleWatchesPage: AppleWatchesPage;
  appleStorePage: AppleStorePage;
};

export const test = base.extend<PageTypes>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductPage(page);
    await use(productsPage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },

  appleStorePage: async ({ page }, use) => {
    const appleStorePage = new AppleStorePage(page);
    await use(appleStorePage);
  },

  appleWatchesPage: async ({ page }, use) => {
    const appleWatchesPage = new AppleWatchesPage(page);
    await use(appleWatchesPage);
  },
});

export { expect } from "@playwright/test";
