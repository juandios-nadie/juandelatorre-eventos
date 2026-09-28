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
  await page.waitForFunction(() =>
    [...document.querySelectorAll("button")].some((button) =>
      Object.keys(button).some((key) => key.startsWith("__reactProps"))
    )
  );

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

test("quick quote preserves the WhatsApp message flow", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() =>
    [...document.querySelectorAll("button")].some((button) =>
      Object.keys(button).some((key) => key.startsWith("__reactProps"))
    )
  );

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "De la idea al mensaje, sin empezar de cero.",
    })
  ).toBeVisible();
  await page.getByRole("button", { name: "Boda", exact: true }).click();
  await page.getByRole("button", { name: "Sillas", exact: true }).click();
  await page.getByLabel("Fecha del evento").fill("12 de octubre");
  await page.getByLabel("Zona o colonia").fill("Zapopan Centro");
  await page.getByLabel("Cantidad aproximada de invitados").fill("120");

  const quoteLink = page.getByRole("link", {
    name: "Enviar datos por WhatsApp",
  });
  await expect
    .poll(async () =>
      decodeURIComponent((await quoteLink.getAttribute("href")) ?? "")
    )
    .toContain("Tipo de evento: Boda");
  const quoteHref = await quoteLink.getAttribute("href");
  const decodedHref = decodeURIComponent(quoteHref ?? "");

  expect(decodedHref).toContain("Tipo de evento: Boda");
  expect(decodedHref).toContain("- Sillas");
  expect(decodedHref).toContain("Fecha del evento: 12 de octubre");
  expect(decodedHref).toContain("Invitados aproximados: 120");
  expect(decodedHref).toContain("Zona del evento: Zapopan Centro");
  await expect(
    page.getByRole("heading", { level: 2, name: "Hablemos de tu evento." })
  ).toBeVisible();
});
