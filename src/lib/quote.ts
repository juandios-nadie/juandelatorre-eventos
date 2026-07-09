export interface QuoteMessageInput {
  items?: string[];
  eventDate?: string;
  eventType?: string;
  guestCount?: string;
  location?: string;
  number?: string;
}

const DEFAULT_MESSAGE =
  "Hola, los vi en su página web y me interesa cotizar mobiliario para mi evento.";

export function buildQuoteMessage({
  items = [],
  eventDate,
  eventType,
  guestCount,
  location,
}: QuoteMessageInput): string {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  const lines = [DEFAULT_MESSAGE];
  const detailLines: string[] = [];

  if (cleanItems.length > 0) {
    lines.push("", "Artículos:", ...cleanItems.map((item) => `- ${item}`));
  }

  if (eventDate?.trim()) {
    detailLines.push(`Fecha del evento: ${eventDate.trim()}`);
  }

  if (eventType?.trim()) {
    detailLines.push(`Tipo de evento: ${eventType.trim()}`);
  }

  if (guestCount?.trim()) {
    detailLines.push(`Invitados aproximados: ${guestCount.trim()}`);
  }

  if (location?.trim()) {
    detailLines.push(`Zona del evento: ${location.trim()}`);
  }

  if (detailLines.length > 0) {
    lines.push("", ...detailLines);
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
