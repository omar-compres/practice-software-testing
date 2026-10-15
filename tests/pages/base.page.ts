import type { Locator, Page } from "@playwright/test";

type AriaRole = Parameters<Page["getByRole"]>[0];

export class BasePage {
  constructor(private readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  getByTestId(value: string): Locator {
    return this.page.getByTestId(value);
  }

  getByRole(role: AriaRole, options: { name: string }): Locator {
    return this.page.getByRole(role, options);
  }

  getByText(value: string): Locator {
    return this.page.getByText(value);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
