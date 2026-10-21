import { test, expect } from "@playwright/test";

// Draft this with AI, then VERIFY every locator against the testids below.
test("a user can register, log in, and log out", async ({ page }) => {
	// --- Register (given as the pattern to follow) ---
	await page.goto("http://localhost:3000/register");
	await page.getByTestId("username-input").fill("revouser");
	await page.getByTestId("email-input").fill("revouser@revou.co");
	await page.getByTestId("password-input").fill("secret123");
	await page.getByTestId("confirm-password-input").fill("secret123");
	await page.getByTestId("register-submit").click();
	await expect(page).toHaveURL("/login"); // registration redirects to login

	// --- Login ---
	// TODO 1: fill email-input + password-input with the SAME credentials, then click login-submit

	// TODO 2: assert toHaveURL('/') and nav-username has text 'revouser'

	// --- Logout ---
	// TODO 3: click nav-logout

	// TODO 4: assert toHaveURL('/login') and nav-username is hidden
});
