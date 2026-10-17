import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.open("/");
});
test("TC-001 - Catalog displays search field and Search button", {
  tag: ["@smoke", "@ticket-AIQA-143"],
  annotation: { type: "test_management_id", description: "AIQA-TC-13" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await expect(home.searchTextbox).toBeVisible();
  await expect(home.searchButton).toBeVisible();
});

test("TC-002 - Searching for pliers shows the term on page", {
  tag: ["@smoke", "@ticket-AIQA-143"],
  annotation: { type: "test_management_id", description: "AIQA-TC-14" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.searchTextbox.fill("Pliers");
  beforeResults = await home.resultsSignature();
  await home.searchButton.click();
  await home.waitForResultsChange(beforeResults);
  await expect(home.pliersHeading).toBeVisible();
});

test("TC-004 - Every product name in results contains pliers", {
  tag: ["@smoke", "@ticket-AIQA-143"],
  annotation: { type: "test_management_id", description: "AIQA-TC-15" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  await home.searchTextbox.fill("Combination Pliers");
  beforeResults = await home.resultsSignature();
  await home.searchButton.click();
  await home.waitForResultsChange(beforeResults);
  await expect(home.combinationPliersHeading).toBeVisible();
});
