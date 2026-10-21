import { test, expect } from "@playwright/test";

// WRITE YOUR TEST HERE — this is real Playwright code.
test("home page heading is visible and Products link navigates", async ({
	page,
}) => {
	await page.goto("http://localhost:3000");

	// TODO 1: assert the heading "Welcome to RevoShop" is visible
	//         use expect(page.getByRole('heading', { name: '...' })).toBeVisible()

	await expect(page.getByTestId);
	// TODO 2: click the "Products" link in the nav
	//         use page.getByRole('link', { name: 'Products' }).click()

	// TODO 3: assert the URL changed to /products
	//         use expect(page).toHaveURL('/products')
});
