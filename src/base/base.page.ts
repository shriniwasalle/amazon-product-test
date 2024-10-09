import { Locator, Page } from "@playwright/test";

export class BaseClass {
  constructor(public page: Page) {
    this.page = page;
  }

  async clickOnElement(selector: string) {
    await this.page.locator(selector).click();
  }

  async clickOnElementByRole(role: any, elementName: string) {
    await this.page.getByRole(role, { name: elementName }).click();
  }

  async clickOnElementByText(text: string) {
    await this.page.getByText(text).click();
  }

  async enterText(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  async getElementText(selector: string) {
    return await this.page.locator(selector).textContent();
  }

  async clearText(selector: string) {
    await this.page.locator(selector).clear();
  }

  async clickAndWaitForNewWindow(page: Page, locator: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      locator.click(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }

  async getAllElements(
    parentLocator: Locator,
    childSelector: string
  ): Promise<Locator> {
    return parentLocator.locator(childSelector);
  }
}
