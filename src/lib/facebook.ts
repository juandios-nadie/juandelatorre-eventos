import { FACEBOOK_URL } from "./constants";

export const FACEBOOK_SDK_SRC =
  "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v25.0";

const FACEBOOK_HOSTNAMES = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "web.facebook.com",
]);

export function normalizeFacebookPageUrl(
  value: string | null | undefined
): string | null {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }

    if (!FACEBOOK_HOSTNAMES.has(parsed.hostname.toLowerCase())) {
      return null;
    }

    parsed.protocol = "https:";
    parsed.search = "";
    parsed.hash = "";

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getFacebookPageUrl(value: string | null | undefined): string {
  return normalizeFacebookPageUrl(value) ?? FACEBOOK_URL;
}
