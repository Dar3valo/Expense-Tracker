import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
  // Clear localStorage before each test so they don't interfere with each other
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

// ---------------------------------------------------------------------------
// Summary Cards
// ---------------------------------------------------------------------------

// Working now (Summary Cards)
test("shows SGD$0.00 for balance, income, and expenses on load", async ({ page }) => {
  await expect(page.getByTestId("balance-label")).toBeVisible();
  await expect(page.getByTestId("income-label")).toBeVisible();
  await expect(page.getByTestId("expenses-label")).toBeVisible();

  const zeros = page.getByText(/\$0\.00/);
  await expect(zeros).toHaveCount(3);
});

// ---------------------------------------------------------------------------
// Transaction Form — validation
// ---------------------------------------------------------------------------

test("shows error when submitting with no description", async ({ page }) => {
  await page.getByPlaceholder("Amount (SGD)").fill("50");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Please add a description.")).toBeVisible();
});

test("shows error when submitting with no amount", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Lunch");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Please enter a valid amount.")).toBeVisible();
});

test("shows error when amount is zero", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Lunch");
  await page.getByPlaceholder("Amount (SGD)").fill("0");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Please enter a valid amount.")).toBeVisible();
});

test("clears error message when user starts typing", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Please add a description.")).toBeVisible();

  await page.getByPlaceholder("Description").fill("Dinner");
  await expect(page.getByText("Please add a description.")).not.toBeVisible();
});

// ---------------------------------------------------------------------------
// Adding transactions
// ---------------------------------------------------------------------------

test("adds an expense transaction and shows it in the list", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Grab ride");
  await page.getByPlaceholder("Amount (SGD)").fill("12.50");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText("Grab ride")).toBeVisible();
  await expect(page.getByText(/SGD\$12\.50/)).toBeVisible();
});

test("adds an income transaction and shows it in the list", async ({ page }) => {
  await page.getByRole("button", { name: "Income" }).click();
  await page.getByPlaceholder("Description").fill("Freelance payment");
  await page.getByPlaceholder("Amount (SGD)").fill("500");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText("Freelance payment")).toBeVisible();
  await expect(page.getByText(/\+SGD\$500\.00/)).toBeVisible();
});

test("resets form fields after a successful submission", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Coffee");
  await page.getByPlaceholder("Amount (SGD)").fill("5");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByPlaceholder("Description")).toHaveValue("");
  await expect(page.getByPlaceholder("Amount (SGD)")).toHaveValue("");
});

test("can select a category from the dropdown", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Bus fare");
  await page.getByPlaceholder("Amount (SGD)").fill("2");
  await page.getByRole("combobox").selectOption("Transport");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText(/Transport/)).toBeVisible();
});

// ---------------------------------------------------------------------------
// Summary Cards — update after transactions
// ---------------------------------------------------------------------------

test("updates income summary card after adding income", async ({ page }) => {
  await page.getByRole("button", { name: "Income" }).click();
  await page.getByPlaceholder("Description").fill("Salary");
  await page.getByPlaceholder("Amount (SGD)").fill("3000");
  await page.getByRole("button", { name: "Add" }).click();

  // Income and Balance should both show $3,000.00
  const incomeCard = page.locator("p.text-xl", { hasText: "SGD$3,000.00" });
  await expect(incomeCard).toHaveCount(2); // income + balance
});

test("updates expenses summary card after adding expense", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Groceries");
  await page.getByPlaceholder("Amount (SGD)").fill("80");
  await page.getByRole("button", { name: "Add" }).click();

  const expenseCard = page.locator("p.text-xl", { hasText: "SGD$80.00" });
  await expect(expenseCard).toHaveCount(2); // expenses + balance (as negative shown in red)
});

// ---------------------------------------------------------------------------
// Deleting transactions
// ---------------------------------------------------------------------------

test("deletes a transaction when the X button is clicked", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Test expense");
  await page.getByPlaceholder("Amount (SGD)").fill("20");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText("Test expense")).toBeVisible();

  await page.getByTitle("Delete").click();

  await expect(page.getByText("Test expense")).not.toBeVisible();
  await expect(page.getByText("No transactions yet. Add one above.")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

test("shows empty state message when there are no transactions", async ({ page }) => {
  await expect(page.getByText("No transactions yet. Add one above.")).toBeVisible();
});

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

test("persists transactions after a page reload", async ({ page }) => {
  await page.getByPlaceholder("Description").fill("Rent");
  await page.getByPlaceholder("Amount (SGD)").fill("1200");
  await page.getByRole("button", { name: "Add" }).click();

  await page.reload();

  await expect(page.getByText("Rent")).toBeVisible();
  await expect(page.getByText(/SGD\$1,200\.00/)).toBeVisible();
});
