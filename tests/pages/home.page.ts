import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly searchButton = this.getByRole("button", { name: "Search" });
  readonly combinationPliersHeading = this.getByRole("heading", { name: "Combination Pliers" });
  readonly pliersHeading = this.getByRole("heading", { name: "Pliers" });
  readonly searchTextbox = this.getByRole("textbox", { name: "Search" });
}
