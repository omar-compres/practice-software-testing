import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.open("/");
});
test("TC-001 - Hammer category checkbox is displayed in catalog", {
  tag: ["@smoke", "@ticket-AIQA-144"],
  annotation: { type: "test_management_id", description: "AIQA-TC-16" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await expect(home.hammerCheckbox).toBeVisible();
  await home.open("/");
});

test("TC-002 - Checking Hammer filter shows Hammer products", {
  tag: ["@smoke", "@ticket-AIQA-144"],
  annotation: { type: "test_management_id", description: "AIQA-TC-17" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  beforeResults = await home.resultsSignature();
  await home.hammerCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await expect(home.text("Thor Hammer")).toBeVisible();
  await expect(home.priceFor("Thor Hammer")).toBeVisible();
  await home.open("/");
});

test("TC-003 - Checking Hammer filter hides Combination Pliers product", {
  tag: ["@smoke", "@ticket-AIQA-144"],
  annotation: { type: "test_management_id", description: "AIQA-TC-18" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  let beforeResults = "";
  beforeResults = await home.resultsSignature();
  await home.hammerCheckbox.check();
  await home.waitForResultsChange(beforeResults);
  await expect(home.text("Combination Pliers")).toHaveCount(0);
  await home.expectResultsChanged(beforeResults);
  await home.open("/");
});
