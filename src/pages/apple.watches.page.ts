import { Locator, Page } from "@playwright/test";
import { BaseClass } from "../base/base.page";

export class AppleWatchesPage extends BaseClass {
  private elements = {
    watches: '//div[@data-testid="editorial-tile-product-tile"]',
    productModalTitle: '//h2[@id="asin-title"]/a',
  };

  constructor(public page: Page) {
    super(page);
  }

  async quickLookFirstProduct() {
    const button = (
      await this.getAllElements(
        this.page.locator(this.elements.watches),
        "//h3"
      )
    ).nth(0);

    await this.page.waitForLoadState();
    await button.hover({ force: true });

    await this.page.waitForLoadState();

    (
      await this.getAllElements(
        this.page.locator(this.elements.watches),
        "//button[@data-testid='quick-look-button']"
      )
    )
      .nth(0)
      .click();
  }

  async quickLookFirstProductTitle(): Promise<string | null> {
    return (
      await this.getAllElements(
        this.page.locator(this.elements.watches),
        "//h3"
      )
    )
      .nth(0)
      .textContent();
  }

  async quickLookFirstProductModalTitle(): Promise<string | null> {
    return this.getElementText(this.elements.productModalTitle);
  }
}
