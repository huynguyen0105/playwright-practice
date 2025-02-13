import { Locator, Page } from "@playwright/test";

export class BasePage{
    page: Page;
    constructor(page: Page) {
        this.page = page
    }
    getLocator(locator: string): Locator {
        return this.page.locator(locator);
    }
}