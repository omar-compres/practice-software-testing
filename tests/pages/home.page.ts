import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly searchButton = this.getByRole("button", { name: "Search" });
  readonly searchTextbox = this.getByRole("textbox", { name: "Search" });
}
