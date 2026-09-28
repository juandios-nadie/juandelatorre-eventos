import { expect, test } from "playwright/test";

test("home hero keeps the commercial message focused", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cotizar por WhatsApp" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Ver catálogo", exact: true }).first()
  ).toBeVisible();
  await expect(page.getByText("3.8k en Facebook")).toHaveCount(0);
});

test("operational proof uses factual service promises", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Inventario propio", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Montaje puntual", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Guadalajara y Zapopan", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Cotización directa", { exact: true }).first()).toBeVisible();
});
