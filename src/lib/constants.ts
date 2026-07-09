import { buildQuoteMessage, buildQuoteUrl } from "./quote";

// ─── Site-wide constants ──────────────────────────────────────────────────────

export const BASE_URL = "https://juandelatorreeventos.com";

// ─── Contact defaults (used when Sanity CMS has no data) ─────────────────────

export const WHATSAPP_NUMBER = "523334469044";
export const DEFAULT_PHONE = "333-446-90-44";
export const FACEBOOK_URL =
  "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/";

// ─── WhatsApp URL helpers ─────────────────────────────────────────────────────

/** Pre-built URL for the generic "contact us" WhatsApp link. */
export const WHATSAPP_URL = buildQuoteUrl({ number: WHATSAPP_NUMBER });

/** URL for quoting a specific catalog item via WhatsApp. */
export function whatsappItemUrl(itemName: string): string {
  return buildQuoteUrl({ number: WHATSAPP_NUMBER, items: [itemName] });
}

/** URL for contacting via WhatsApp using a dynamic phone number (e.g. from CMS). */
export function buildWhatsappContactUrl(number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(
    buildQuoteMessage({})
  )}`;
}
