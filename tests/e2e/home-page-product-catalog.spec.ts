import { expect, test } from "@playwright/test";

test.use({ storageState: "C:\\Users\\omarc\\ai-qa-pipeline\\.live-runs\\customer-storage.json" });
test("TC-001 - Verify product card displays name and price", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "KAN-TC-42" },
}, async ({ page, request }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await expect(page.getByText("Combination Pliers")).toBeVisible();
  await expect(page.getByText("$14.15")).toBeVisible();
  await expect(page.getByText("$14.15")).toBeVisible();
  await page.goto("https://practicesoftwaretesting.com/");
});

test("TC-002 - Search for product and verify result", {
  tag: ["@smoke", "@ticket-AIQA-142"],
  annotation: { type: "test_management_id", description: "KAN-TC-43" },
}, async ({ page, request }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByRole("textbox", { name: "Search" }).fill("Combination Pliers");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Combination Pliers")).toBeVisible();
  await page.goto("https://practicesoftwaretesting.com/");
});
