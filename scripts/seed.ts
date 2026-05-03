/**
 * Seed script — populates initial Sanity content.
 *
 * Usage (after setting up .env.local with a real projectId):
 *   npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "your-project-id") {
  console.error(
    "❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local before seeding."
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  Set SANITY_API_TOKEN in .env.local before seeding.\n" +
      "    Create one at https://sanity.io/manage → API → Tokens (Editor or above)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Seed data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Mobiliario", slug: "mobiliario" },
  { name: "Escenarios", slug: "escenarios" },
  { name: "Sillas", slug: "sillas" },
  { name: "Mesas", slug: "mesas" },
  { name: "Decoración", slug: "decoracion" },
];

const SITE_SETTINGS = {
  _id: "siteSettings",
  _type: "siteSettings",
  tagline: "Renta de mobiliario y escenarios para eventos en Guadalajara",
  phone: "333-446-90-44",
  whatsapp: "523334469044",
  facebookUrl:
    "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/",
};

// ─── Runner ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱  Seeding Sanity project:", projectId);

  // Site settings (upsert)
  await client.createOrReplace(SITE_SETTINGS);
  console.log("  ✓  Site settings");

  // Categories
  for (const cat of CATEGORIES) {
    await client.createIfNotExists({
      _id: `category-${cat.slug}`,
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
    });
    console.log(`  ✓  Category: ${cat.name}`);
  }

  console.log("\n✅  Done! Open your Sanity Studio to add rental items.");
  console.log(
    "    Studio URL: http://localhost:3000/studio  (run npm run dev first)"
  );
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
