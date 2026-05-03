// ─── Site-wide constants ──────────────────────────────────────────────────────

export const BASE_URL = "https://juandelatorreventos.com";

// ─── Contact defaults (used when Sanity CMS has no data) ─────────────────────

export const WHATSAPP_NUMBER = "523334469044";
export const DEFAULT_PHONE = "333-446-90-44";
export const FACEBOOK_URL =
  "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/";

// ─── WhatsApp URL helpers ─────────────────────────────────────────────────────

const GENERIC_MESSAGE =
  "Hola, los vi en su página web y me interesa cotizar un servicio.";

/** Pre-built URL for the generic "contact us" WhatsApp link. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  GENERIC_MESSAGE
)}`;

/** URL for quoting a specific catalog item via WhatsApp. */
export function whatsappItemUrl(itemName: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, los vi en su página web y me interesa cotizar: ${itemName}`
  )}`;
}

/** URL for contacting via WhatsApp using a dynamic phone number (e.g. from CMS). */
export function buildWhatsappContactUrl(number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(GENERIC_MESSAGE)}`;
}
