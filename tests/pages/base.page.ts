import { expect, type Locator, type Page } from "@playwright/test";

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

  async resultsSignature(): Promise<string> {
    const main = this.page.getByRole("main");
    const scope = (await main.count()) > 0 ? main : this.page.locator("body");
    const links = scope.getByRole("link");
    const priced = links.filter({ hasText: currencyAmount });
    const rows = (await main.count()) > 0 && (await priced.count()) === 0 ? links : priced;
    return JSON.stringify(await rows.allInnerTexts());
  }

  async waitForResultsChange(previous: string): Promise<void> {
    await expect.poll(async () => this.resultsSignature()).not.toBe(previous);
  }

  async expectResultsChanged(previous: string): Promise<void> {
    const current = await this.resultsSignature();
    expect(current).not.toBe(previous);
    expect(current).not.toBe("[]");
  }

  async expectResultsSorted(previous: string, basis: "text" | "price", direction: "ascending" | "descending"): Promise<void> {
    const current = await this.resultsSignature();
    expect(current).not.toBe(previous);
    const rows = JSON.parse(current) as string[];
    const values = rows.map((row) => basis === "price" ? amountIn(row) : firstLine(row));
    expect(values.length).toBeGreaterThan(1);
    for (let index = 1; index < values.length; index += 1) {
      const left = values[index - 1];
      const right = values[index];
      const order = basis === "price"
        ? Number(left) - Number(right)
        : String(left).localeCompare(String(right));
      expect(direction === "ascending" ? order <= 0 : order >= 0).toBe(true);
    }
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

function firstLine(value: string): string {
  return value.split("\n").map((line) => line.trim()).find((line) => line !== "") ?? "";
}

function amountIn(value: string): number {
  const match = value.match(currencyAmount);
  return Number((match?.[0] ?? "").replace(/[^0-9.]/g, ""));
}
