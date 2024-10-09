import { Page } from "@playwright/test";
import { BaseClass } from "../base/base.page";

export class AppleStorePage extends BaseClass {
  constructor(public page: Page) {
    super(page);
  }

  async clickOnNavBarItem(navItem: string) {
    await this.clickOnElementByRole("button", navItem);
  }

  async selectProductFromDropdown(productName: string) {
    await this.clickOnElementByText(productName);
  }
}
