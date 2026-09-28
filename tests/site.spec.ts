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

test("homepage follows the new editorial narrative", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Un inventario amplio. Una decisión simple.",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explorar Sillas" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Cada evento pide un montaje distinto.",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Cuatro datos. Una cotización más clara.",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Piezas reales, montajes reales.",
    })
  ).toBeVisible();
});

test("scroll motion never hides content before it enters the viewport", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForTimeout(500);

  const laterHeading = page.getByRole("heading", {
    level: 2,
    name: "Piezas reales, montajes reales.",
  });
  const effectiveOpacity = await laterHeading.evaluate((element) => {
    let opacity = 1;
    let current: Element | null = element;

    while (current && current.tagName !== "SECTION") {
      opacity *= Number.parseFloat(window.getComputedStyle(current).opacity);
      current = current.parentElement;
    }

    return opacity;
  });

  expect(effectiveOpacity).toBe(1);
});
