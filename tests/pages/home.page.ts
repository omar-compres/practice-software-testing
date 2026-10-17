import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly page2Button = this.getByRole("button", { name: "Page-2" });
  readonly searchButton = this.getByRole("button", { name: "Search" });
  readonly chiselsCheckbox = this.getByRole("checkbox", { name: "Chisels" });
  readonly forgeflexToolsCheckbox = this.getByRole("checkbox", { name: "ForgeFlex Tools" });
  readonly sortCombobox = this.getByRole("combobox", { name: "sort" });
  readonly searchTextbox = this.getByRole("textbox", { name: "Search" });
}
