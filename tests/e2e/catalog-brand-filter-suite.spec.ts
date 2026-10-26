import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.open("/");
});
test("TC-001 - Catalog displays ForgeFlex Tools brand checkbox", {
  tag: ["@smoke", "@ticket-AIQA-145"],
  annotation: { type: "test_management_id", description: "AIQA-TC-20" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await expect(home.forgeflexToolsCheckbox).toBeVisible();
  await home.open("/");
});

test("TC-002 - Filtering by ForgeFlex Tools shows only its products", {
  tag: ["@smoke", "@ticket-AIQA-145"],
  annotation: { type: "test_management_id", description: "AIQA-TC-21" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  beforeResults = await home.resultsSignature();
  await home.forgeflexToolsCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await expect(home.combinationPliersHeading).toBeVisible();
  await expect(home.priceFor("Combination Pliers")).toBeVisible();
  await expect(home.text("Bolt Cutters")).toHaveCount(0);
  await home.expectResultsChanged(beforeResults);
  await home.open("/");
});

test("TC-003 - Product detail page displays ForgeFlex Tools brand after filter", {
  tag: ["@smoke", "@ticket-AIQA-145"],
  annotation: { type: "test_management_id", description: "AIQA-TC-22" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  beforeResults = await home.resultsSignature();
  await home.forgeflexToolsCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await home.combinationPliersHeading.click();
  await expect(home.text("ForgeFlex Tools")).toBeVisible();
  await home.open("/");
});
