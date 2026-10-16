import type { Locator, Page } from "@playwright/test";

type AriaRole = Parameters<Page["getByRole"]>[0];
const currencyAmount = /[$€£¥]\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})/;

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  text(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }

  price(): Locator {
    return this.page.getByText(currencyAmount);
  }

  priceFor(label: string): Locator {
    return this.page.getByRole("link", { name: label }).getByText(currencyAmount);
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
