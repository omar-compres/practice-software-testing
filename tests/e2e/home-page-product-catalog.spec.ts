import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });
test("TC-001 - Verify product card displays name and price", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "KAN-TC-42" },
}, async ({ page, request }) => {
  const home = new HomePage(page);
  await home.open("https://practicesoftwaretesting.com/");
  await expect(home.text("Combination Pliers")).toBeVisible();
  await expect(home.priceFor("Combination Pliers")).toBeVisible();
  await home.open("https://practicesoftwaretesting.com/");
});

test("TC-002 - Searching for Combination Pliers displays Combination Pliers heading", {
  tag: ["@smoke", "@ticket-AIQA-191"],
  annotation: { type: "test_management_id", description: "AIQA-TC-19" },
}, async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByRole("textbox", { name: "Search", exact: true }).fill("Combination Pliers");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Combination Pliers", exact: true })).toBeVisible();
  await page.goto("https://practicesoftwaretesting.com/");
});
