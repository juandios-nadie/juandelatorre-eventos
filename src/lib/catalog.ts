import type { Category } from "./sanity";
import type { StaticItem } from "./staticData";

export interface CatalogSection {
  category: Category;
  items: StaticItem[];
  featuredItem: StaticItem | null;
}

export interface CatalogStats {
  categoryCount: number;
  itemCount: number;
}

export function buildCatalogSections(
  categories: Category[],
  items: StaticItem[]
): CatalogSection[] {
  return categories
    .map((category) => {
      const sectionItems = items.filter(
        (item) => item.category?.slug === category.slug
      );

      return {
        category,
        items: sectionItems,
        featuredItem: sectionItems[0] ?? null,
      };
    })
    .filter((section) => section.items.length > 0);
}

export function getCatalogStats(sections: CatalogSection[]): CatalogStats {
  return {
    categoryCount: sections.length,
    itemCount: sections.reduce((total, section) => total + section.items.length, 0),
  };
}
