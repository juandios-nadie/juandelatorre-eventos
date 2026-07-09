import assert from "node:assert/strict";
import test from "node:test";
import type { Category } from "./sanity";
import type { StaticItem } from "./staticData";
import { buildCatalogSections, getCatalogStats } from "./catalog";

const categories: Category[] = [
  { _id: "cat-sillas", name: "Sillas", slug: "sillas" },
  { _id: "cat-mesas", name: "Mesas", slug: "mesas" },
  { _id: "cat-empty", name: "Vacía", slug: "vacia" },
];

const items: StaticItem[] = [
  {
    _id: "silla-crossback",
    name: "Silla Crossback",
    description: "Silla de madera",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/sillas-crossback.jpeg",
  },
  {
    _id: "mesa-redonda",
    name: "Mesa Redonda",
    description: "Mesa con mantel",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-redonda.jpg",
  },
  {
    _id: "silla-tiffany",
    name: "Silla Tiffany",
    description: "Silla blanca",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/sillas-tiffany.jpeg",
  },
];

test("buildCatalogSections groups items and omits empty categories", () => {
  const sections = buildCatalogSections(categories, items);

  assert.deepEqual(
    sections.map((section) => ({
      slug: section.category.slug,
      count: section.items.length,
      featured: section.featuredItem?.name,
    })),
    [
      { slug: "sillas", count: 2, featured: "Silla Crossback" },
      { slug: "mesas", count: 1, featured: "Mesa Redonda" },
    ]
  );
});

test("getCatalogStats summarizes visible catalog sections", () => {
  const sections = buildCatalogSections(categories, items);

  assert.deepEqual(getCatalogStats(sections), {
    categoryCount: 2,
    itemCount: 3,
  });
});
