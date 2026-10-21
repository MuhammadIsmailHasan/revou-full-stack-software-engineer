import { test, expect } from "@playwright/test";

// REFACTOR the three locators to use getByTestId() instead of role/text.
test("home → products (resilient, testid-based)", async ({ page }) => {
	await page.goto("http://localhost:3000");

	// TODO 1: refactor to page.getByTestId('home-heading')
	await expect(page.getByTestId("home-heading")).toBeVisible();

	// TODO 2: refactor to page.getByTestId('nav-products')
	await page.getByTestId("nav-products").click();

	// TODO 3: keep the URL assertion as-is
	await expect(page).toHaveURL("/products");
});
