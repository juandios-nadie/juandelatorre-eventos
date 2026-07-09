import assert from "node:assert/strict";
import test from "node:test";
import { WHATSAPP_NUMBER } from "./constants";
import { buildQuoteMessage, buildQuoteUrl } from "./quote";

test("buildQuoteMessage includes selected items and event context", () => {
  const message = buildQuoteMessage({
    items: ["Silla Crossback Madera Nogal", "Toldo Árabe 6m x 6m"],
    eventType: "boda",
    guestCount: "120",
    location: "Zapopan",
  });

  assert.equal(
    message,
    [
      "Hola, los vi en su página web y me interesa cotizar mobiliario para mi evento.",
      "",
      "Artículos:",
      "- Silla Crossback Madera Nogal",
      "- Toldo Árabe 6m x 6m",
      "",
      "Tipo de evento: boda",
      "Invitados aproximados: 120",
      "Zona del evento: Zapopan",
    ].join("\n")
  );
});

test("buildQuoteMessage keeps the generic message concise without items", () => {
  assert.equal(
    buildQuoteMessage({}),
    "Hola, los vi en su página web y me interesa cotizar mobiliario para mi evento."
  );
});

test("buildQuoteMessage includes quick quote form details", () => {
  const message = buildQuoteMessage({
    eventDate: "12 de octubre",
    guestCount: "80",
    location: "Colonia Americana",
    items: ["Sillas Tiffany y mesas redondas"],
  });

  assert.equal(
    message,
    [
      "Hola, los vi en su página web y me interesa cotizar mobiliario para mi evento.",
      "",
      "Artículos:",
      "- Sillas Tiffany y mesas redondas",
      "",
      "Fecha del evento: 12 de octubre",
      "Invitados aproximados: 80",
      "Zona del evento: Colonia Americana",
    ].join("\n")
  );
});

test("buildQuoteUrl encodes the message for WhatsApp", () => {
  const url = buildQuoteUrl({
    items: ["Mesa de Novios"],
    number: WHATSAPP_NUMBER,
  });

  assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`));
  assert.ok(decodeURIComponent(url).includes("- Mesa de Novios"));
});
