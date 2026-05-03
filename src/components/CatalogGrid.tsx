"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, RentalItem } from "@/lib/sanity";
import { STATIC_ITEMS, STATIC_CATEGORIES, type StaticItem } from "@/lib/staticData";
import ProductCard from "./ProductCard";

interface CatalogGridProps {
  categories: Category[];
  items: RentalItem[];
}

export default function CatalogGrid({ categories, items }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string>(
    () => searchParams.get("categoria") ?? "todos"
  );

  const usingSanity = items.length > 0;
  const displayItems: StaticItem[] = usingSanity
    ? items.map((i) => ({ ...i, localImage: "" }))
    : STATIC_ITEMS;
  const displayCategories = categories.length > 0 ? categories : STATIC_CATEGORIES;

  const showingAll = activeSlug === "todos";

  const filteredItems = showingAll
    ? displayItems
    : displayItems.filter((item) => item.category?.slug === activeSlug);

  // For "Todos" view, group by category preserving canonical order
  const groupedSections = showingAll
    ? displayCategories
        .map((cat) => ({
          category: cat,
          items: displayItems.filter((i) => i.category?.slug === cat.slug),
        }))
        .filter((g) => g.items.length > 0)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Page title */}
      <div className="mb-10 text-center">
        <p className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
          Lo que rentamos
        </p>
        <h1 className="font-playfair text-brand-charcoal text-3xl sm:text-4xl font-bold">
          Catálogo de Artículos
        </h1>
        <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto mt-5" />
      </div>

      {/* Category filter — horizontally scrollable on mobile */}
      <div className="sticky top-0 z-20 bg-brand-warm-white/95 backdrop-blur-sm py-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-brand-champagne/60">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-x-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <FilterPill
            label="Todos"
            active={showingAll}
            onClick={() => setActiveSlug("todos")}
          />
          {displayCategories.map((cat) => (
            <FilterPill
              key={cat._id}
              label={cat.name}
              active={activeSlug === cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      {showingAll && groupedSections ? (
        // ── Grouped by category ──────────────────────────────────────────────
        <div className="space-y-14">
          {groupedSections.map(({ category, items: catItems }) => (
            <section key={category._id}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-playfair text-brand-charcoal text-xl font-bold shrink-0">
                  {category.name}
                </h2>
                <div className="h-px flex-1 bg-brand-champagne" />
                <button
                  onClick={() => setActiveSlug(category.slug)}
                  className="text-xs text-brand-gold hover:text-brand-ruby transition-colors shrink-0 font-medium"
                >
                  Ver todos →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catItems.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    localImageSrc={!usingSanity && item.localImage ? item.localImage : undefined}
                    localImageSrcs={!usingSanity && item.localImages?.length ? item.localImages : undefined}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        // ── Empty state ──────────────────────────────────────────────────────
        <div className="text-center py-20 text-brand-charcoal/50">
          <p className="text-lg font-light">
            No hay artículos en esta categoría todavía.
          </p>
          <button
            onClick={() => setActiveSlug("todos")}
            className="mt-4 text-brand-gold hover:underline text-sm"
          >
            Ver todos
          </button>
        </div>
      ) : (
        // ── Filtered single category ─────────────────────────────────────────
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              localImageSrc={!usingSanity && item.localImage ? item.localImage : undefined}
              localImageSrcs={!usingSanity && item.localImages?.length ? item.localImages : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-brand-ruby text-white shadow-sm"
          : "bg-white border border-brand-champagne text-brand-charcoal/70 hover:border-brand-gold hover:text-brand-gold"
      }`}
    >
      {label}
    </button>
  );
}
