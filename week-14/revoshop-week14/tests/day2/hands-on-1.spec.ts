import { test, expect } from "@playwright/test";

// WRITE YOUR VALIDATION TESTS HERE — this is real Playwright code.

test("empty form shows every required-field error", async ({ page }) => {
	await page.goto("http://localhost:3000/register");
	// TODO 1: click register-submit without filling anything
	// TODO 2: assert username-error, email-error and password-error are all visible

	await page.getByTestId("register-submit").click();
	await expect(page.getByTestId("username-error")).toBeVisible();
	await expect(page.getByTestId("email-error")).toBeVisible();
	await expect(page.getByTestId("password-error")).toBeVisible();
});

test("invalid email shows the email error", async ({ page }) => {
	await page.goto("http://localhost:3000/register");
	await page.getByTestId("username-input").fill("revouser");
	await page.getByTestId("email-input").fill("not-an-email");
	await page.getByTestId("password-input").fill("secret123");
	await page.getByTestId("confirm-password-input").fill("secret123");

	// TODO 3: submit, then assert email-error is visible
	await page.getByTestId("register-submit").click();
	await expect(page.getByTestId("email-error")).toBeVisible();
});

test("mismatched passwords shows the confirm-password error", async ({
	page,
}) => {
	await page.goto("http://localhost:3000/register");
	await page.getByTestId("username-input").fill("revouser");
	await page.getByTestId("email-input").fill("revouser@revou.co");
	await page.getByTestId("password-input").fill("secret123");
	await page.getByTestId("confirm-password-input").fill("secret999");

	// TODO 4: submit, then assert confirm-password-error is visible
	await page.getByTestId("register-submit").click();
	await expect(page.getByTestId("confirm-password-error")).toBeVisible();
});

test("errors clear as the user corrects each field", async ({ page }) => {
	await page.goto("http://localhost:3000/register");
	await page.getByTestId("register-submit").click(); // all errors show
	await page.getByTestId("username-input").fill("revouser"); // fix username

	// TODO 5: assert username-error is now hidden (toBeHidden)
	await expect(page.getByTestId("username-error")).toBeHidden();
});
