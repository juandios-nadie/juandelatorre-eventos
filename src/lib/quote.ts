export interface QuoteMessageInput {
  items?: string[];
  eventType?: string;
  guestCount?: string;
  location?: string;
  number?: string;
}

const DEFAULT_MESSAGE =
  "Hola, los vi en su página web y me interesa cotizar mobiliario para mi evento.";

export function buildQuoteMessage({
  items = [],
  eventType,
  guestCount,
  location,
}: QuoteMessageInput): string {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  const lines = [DEFAULT_MESSAGE];

  if (cleanItems.length > 0) {
    lines.push("", "Artículos:", ...cleanItems.map((item) => `- ${item}`));
  }

  if (eventType?.trim()) {
    lines.push("", `Tipo de evento: ${eventType.trim()}`);
  }

  if (guestCount?.trim()) {
    lines.push(`Invitados aproximados: ${guestCount.trim()}`);
  }

  if (location?.trim()) {
    lines.push(`Zona del evento: ${location.trim()}`);
  }

  return lines.join("\n");
}

export function buildQuoteUrl(input: QuoteMessageInput): string {
  if (!input.number) {
    throw new Error("A WhatsApp number is required to build a quote URL.");
  }

  return `https://wa.me/${input.number}?text=${encodeURIComponent(
    buildQuoteMessage(input)
  )}`;
}
