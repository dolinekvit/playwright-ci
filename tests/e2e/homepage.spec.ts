import { expect, test } from "playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render counter", async ({ page }) => {
    await expect(page.getByText(/current count: 0/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "+" })).toBeVisible();
    await expect(page.getByRole("button", { name: "-" })).toBeVisible();
    await expect(page.getByRole("button", { name: /reset/i })).toBeVisible();
  });

  test("should add, subtract, and reset counter", async ({ page }) => {
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await expect(page.getByText(/current count: 2/i)).toBeVisible();
    await page.getByRole("button", { name: "-" }).click();
    await expect(page.getByText(/current count: 1/i)).toBeVisible();
    await page.getByRole("button", { name: /reset/i }).click();
    await expect(page.getByText(/current count: 0/i)).toBeVisible();
  });
});
