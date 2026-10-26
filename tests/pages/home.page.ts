import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly chiselsCheckbox = this.getByRole("checkbox", { name: "Chisels" });
  readonly combinationPliersHeading = this.getByRole("heading", { name: "Combination Pliers" });
  readonly forgeflexToolsCheckbox = this.getByRole("checkbox", { name: "ForgeFlex Tools" });
  readonly hammerCheckbox = this.getByRole("checkbox", { name: "Hammer" });
  readonly page2Button = this.getByRole("button", { name: "Page-2" });
  readonly pliersHeading = this.getByRole("heading", { name: "Pliers" });
  readonly searchButton = this.getByRole("button", { name: "Search" });
  readonly searchTextbox = this.getByRole("textbox", { name: "Search" });
  readonly sortCombobox = this.getByRole("combobox", { name: "sort" });
}
