import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface RentalItem {
  _id: string;
  name: string;
  description?: string;
  category: { _id?: string; name: string; slug: string };
  photo?: SanityImageSource;
}

export interface SiteSettings {
  tagline: string;
  phone: string;
  whatsapp: string;
  facebookUrl: string;
  heroImage?: SanityImageSource;
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const ISR_OPTS = { next: { revalidate: 3600 } } as const;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{tagline,phone,whatsapp,facebookUrl,heroImage}`,
      {},
      ISR_OPTS
    );
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch<Category[]>(
      `*[_type == "category"] | order(name asc){_id,name,"slug":slug.current}`,
      {},
      ISR_OPTS
    );
  } catch {
    return [];
  }
}

export async function getFeaturedItems(): Promise<RentalItem[]> {
  try {
    return await client.fetch<RentalItem[]>(
      `*[_type == "rentalItem" && featured == true] | order(name asc){
        _id, name,
        category->{_id, name, "slug": slug.current},
        "photo": photos[0]
      }`,
      {},
      ISR_OPTS
    );
  } catch {
    return [];
  }
}

export async function getAllItems(): Promise<RentalItem[]> {
  try {
    return await client.fetch<RentalItem[]>(
      `*[_type == "rentalItem"] | order(name asc){
        _id, name, description,
        category->{_id, name, "slug": slug.current},
        "photo": photos[0]
      }`,
      {},
      ISR_OPTS
    );
  } catch {
    return [];
  }
}
