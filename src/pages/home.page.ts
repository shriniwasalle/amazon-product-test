import { expect, Page } from "@playwright/test";
import { BaseClass } from "../base/base.page";

export class HomePage extends BaseClass {
  private elements = {
    txtSearchBox: "//*[@id='twotabsearchtextbox']",
    containerSearchResults: '//div[@class="s-suggestion-container"]',
  };

  constructor(public page: Page) {
    super(page);
  }

  async searchProduct(productName: string): Promise<void> {
    await this.enterText(this.elements.txtSearchBox, productName);
  }

  async getSearchResults(): Promise<string[]> {
    await this.page.waitForTimeout(2000);

    const products = await (
      await this.getAllElements(
        this.page.locator(this.elements.containerSearchResults),
        "//div[@role]"
      )
    ).all();

    let allProducts: string[] = [];

    for (let product of products) {
      const productText: string =
        (await product.getAttribute("aria-label")) ?? "";
      allProducts.push(productText);
    }

    return allProducts;
  }

  async clearSearchText(): Promise<void> {
    await this.clearText(this.elements.txtSearchBox);
  }

  async selectProductFromSearchResults(productName: string): Promise<void> {
    await (
      await this.getAllElements(
        this.page.locator(this.elements.containerSearchResults),
        `//div[text()='${productName}'][not(descendant::span)]`
      )
    ).click();
  }
}
