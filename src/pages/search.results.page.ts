import { Page } from "@playwright/test";
import { BaseClass } from "../base/base.page";

export class SearchResultsPage extends BaseClass {
  constructor(public page: Page) {
    super(page);
  }

  async openFirstProduct(): Promise<Page> {
    const locator = this.page
      .locator('//div[@data-cy="title-recipe"]//h2//span')
      .nth(0);
    return this.clickAndWaitForNewWindow(this.page, locator);
  }
}
