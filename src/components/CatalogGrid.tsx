"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, RentalItem } from "@/lib/sanity";
import ProductCard from "./ProductCard";

interface CatalogGridProps {
  categories: Category[];
  items: RentalItem[];
}

export default function CatalogGrid({ categories, items }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string>("todos");

  // Sync with URL param on mount (e.g. from ServicesSection link)
  useEffect(() => {
    const param = searchParams.get("categoria");
    if (param) setActiveSlug(param);
  }, [searchParams]);

  const filtered =
    activeSlug === "todos"
      ? items
      : items.filter((item) => item.category?.slug === activeSlug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Page title */}
      <div className="mb-12 text-center">
        <p className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
          Lo que rentamos
        </p>
        <h1 className="font-playfair text-brand-charcoal text-3xl sm:text-4xl font-bold">
          Catálogo de Artículos
        </h1>
        <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto mt-5" />
      </div>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <FilterPill
            label="Todos"
            active={activeSlug === "todos"}
            onClick={() => setActiveSlug("todos")}
          />
          {categories.map((cat) => (
            <FilterPill
              key={cat._id}
              label={cat.name}
              active={activeSlug === cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
            />
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Empty state when no items at all */}
      {items.length === 0 && (
        <div className="text-center py-24 text-brand-charcoal/40">
          <p className="text-xl font-light mb-2">Catálogo en preparación</p>
          <p className="text-sm">
            Pronto agregaremos nuestros artículos disponibles.
          </p>
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
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-brand-ruby text-white shadow-sm"
          : "bg-white border border-brand-champagne text-brand-charcoal/70 hover:border-brand-gold hover:text-brand-gold"
      }`}
    >
      {label}
    </button>
  );
}
