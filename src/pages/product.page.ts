import { Page } from "@playwright/test";
import { BaseClass } from "../base/base.page";

export class ProductPage extends BaseClass {
  private elements = {
    lnkVisitAppleStore: '//a[text()="Visit the Apple Store"]',
  };

  constructor(public page: Page) {
    super(page);
  }

  async navigateToAppleStore() {
    await this.clickOnElement(this.elements.lnkVisitAppleStore);
  }
}
