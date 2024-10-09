import { test, expect } from "../src/fixtures/fixtures.ts";
import { AppleStorePage } from "../src/pages/apple.store.page.ts";
import { AppleWatchesPage } from "../src/pages/apple.watches.page.ts";
import { ProductPage } from "../src/pages/product.page.ts";
import { InputData } from "../resources/testData.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Amazon Products Test @regression", async ({
  homePage,
  searchResultsPage,
  productsPage,
  appleStorePage,
  appleWatchesPage,
}) => {
  await test.step("Search First Product", async () => {
    await homePage.selectCategoryFromDropdown(InputData.categoryName);
    await homePage.searchProduct(InputData.productName);
    const searchResults = await homePage.getSearchResults();
    searchResults.forEach((result) =>
      expect(result, "Searched Product Matched").toContain(
        InputData.productName
      )
    );
  });

  await test.step("Search Second Product", async () => {
    await homePage.clearSearchText();
    await homePage.searchProduct(InputData.newProductName);
    await homePage.selectProductFromSearchResults(InputData.newProductName);
  });

  const newPage =
    await test.step("Select Product and Navigate to Apple Store", async () => {
      let newPage = await searchResultsPage.openFirstProduct();
      productsPage = new ProductPage(newPage);
      await productsPage.navigateToAppleStore();
      appleStorePage = new AppleStorePage(newPage);

      return newPage;
    });

  await test.step("Select Watch Option from Apple Watch Dropdown", async () => {
    await appleStorePage.clickOnNavBarItem(InputData.navBarItemName);
    await appleStorePage.selectProductFromDropdown(
      InputData.navBarItemProductName
    );
  });

  await test.step("Apple watch quick look and verify modal title", async () => {
    appleWatchesPage = new AppleWatchesPage(newPage);
    await appleWatchesPage.quickLookFirstProduct();
    const productTitle = await appleWatchesPage.quickLookFirstProductTitle();
    const productModalTitle =
      await appleWatchesPage.quickLookFirstProductModalTitle();

    // To fetch "GPS + Cellular 40mm"
    const updatedProductTitle = productTitle
      ?.split("-")[1]
      .match(/\(.*?\)/)
      ?.at(0)
      ?.replace(/[(),]/g, "");

    expect(productModalTitle).toContain(updatedProductTitle);
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `screenshots/${testInfo.title}-failure.png`;
    await page.screenshot({
      path: screenshotPath,
    });
  }
  await page.close();
});
