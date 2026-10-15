import { expect, test } from "@playwright/test";
import { BasePage } from "../pages/base.page";

const storageState = process.env.STORAGE_STATE_PATH;
if (!storageState) throw new Error("STORAGE_STATE_PATH is required.");
test.use({ storageState });
test("TC-001 - Verify product card displays name and price", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "KAN-TC-42" },
}, async ({ page, request }) => {
  const app = new BasePage(page);
  await app.open("https://practicesoftwaretesting.com/");
  await expect(app.getByText("Combination Pliers")).toBeVisible();
  await expect(app.getByText("$14.15")).toBeVisible();
  await expect(app.getByText("$14.15")).toBeVisible();
  await app.open("https://practicesoftwaretesting.com/");
});

test("TC-002 - Search for product and verify result", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "KAN-TC-43" },
}, async ({ page, request }) => {
  const app = new BasePage(page);
  await app.open("https://practicesoftwaretesting.com/");
  await app.getByRole("textbox", { name: "Search" }).fill("Combination Pliers");
  await app.getByRole("button", { name: "Search" }).click();
  await expect(app.getByText("Combination Pliers")).toBeVisible();
  await app.open("https://practicesoftwaretesting.com/");
});
