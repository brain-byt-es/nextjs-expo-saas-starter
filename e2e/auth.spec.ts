import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login page renders with email and password fields", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("signup page renders", async ({ page }) => {
    await page.goto("/signup");

    await expect(page).toHaveURL("/signup");
    await expect(page.locator("form")).toBeVisible();
  });

  test("login with empty fields shows validation", async ({ page }) => {
    await page.goto("/login");

    // Submit empty form
    await page.locator("button[type=submit]").click();

    // Browser-native validation or custom error should prevent submission
    // The form should still be on the login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user is redirected from dashboard", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    // Middleware should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user is redirected from admin", async ({ page }) => {
    await page.goto("/admin");

    // Middleware should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("login page has link to signup", async ({ page }) => {
    await page.goto("/login");

    const signupLink = page.locator('a[href*="signup"]');
    await expect(signupLink).toBeVisible();
  });

  test("signup page has link to login", async ({ page }) => {
    await page.goto("/signup");

    const loginLink = page.locator('a[href*="login"]');
    await expect(loginLink).toBeVisible();
  });
});
