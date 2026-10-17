import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });
test("TC-001 - The home page lists product cards", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-6" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await home.open("https://practicesoftwaretesting.com/");
  await expect(home.text("Combination Pliers")).toBeVisible();
});

test("TC-002 - Each visible card shows a product name and a price", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-7" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await home.open("https://practicesoftwaretesting.com/");
  await expect(home.text("Combination Pliers")).toBeVisible();
  await expect(home.priceFor("Combination Pliers")).toBeVisible();
});

test("TC-003 - sort", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-8" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.open("https://practicesoftwaretesting.com/");
  beforeResults = await home.resultsSignature();
  await home.sortCombobox.selectOption({ label: "Price (Low - High)" });
  await home.waitForResultsChange(beforeResults);
  await home.expectResultsChanged(beforeResults);
});

test("TC-004 - search", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-9" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.open("https://practicesoftwaretesting.com/");
  await home.searchTextbox.fill("Combination Pliers");
  beforeResults = await home.resultsSignature();
  await home.searchButton.click();
  await home.waitForResultsChange(beforeResults);
  await home.expectResultsChanged(beforeResults);
});

test("TC-005 - category filters", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-10" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.open("https://practicesoftwaretesting.com/");
  beforeResults = await home.resultsSignature();
  await home.chiselsCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await home.expectResultsChanged(beforeResults);
});

test("TC-006 - brand filters", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-11" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.open("https://practicesoftwaretesting.com/");
  beforeResults = await home.resultsSignature();
  await home.forgeflexToolsCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await home.expectResultsChanged(beforeResults);
});

test("TC-007 - page controls", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "AIQA-TC-12" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.open("https://practicesoftwaretesting.com/");
  beforeResults = await home.resultsSignature();
  await home.page2Button.click();
  await home.waitForResultsChange(beforeResults);
  await home.expectResultsChanged(beforeResults);
});
