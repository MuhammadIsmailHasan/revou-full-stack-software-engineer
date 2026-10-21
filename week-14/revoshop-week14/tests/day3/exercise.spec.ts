import { test, expect } from "@playwright/test";

// Draft this CRUD journey with AI, then VERIFY every locator
//    against the testid map before running.

test("an admin can create, edit, and delete a product", async ({ page }) => {
	await page.goto("http://localhost:3000/dashboard"); // already logged in as admin

	await page.getByTestId("add-product-button").click();
	await page.getByTestId("name-input").fill("Mouse");
	await page.getByTestId("price-input").fill("99000");
	await page.getByTestId("save-product").click();
	await expect(page.getByTestId("toast-success")).toBeVisible();
	await expect(page.getByTestId("product-row-7")).toBeVisible();
	await expect(page.getByTestId("product-row-7")).toContainText("Mouse");

	await page.getByTestId("edit-product-7").click();
	await page.getByTestId("price-input").fill("79000");
	await page.getByTestId("save-product").click();
	await expect(page.getByTestId("product-row-7")).toContainText("Rp 79.000");

	page.on("dialog", (d) => d.accept());
	await page.getByTestId("delete-product-7").click();
	await expect(page.getByTestId("product-row-7")).toBeHidden();
});
