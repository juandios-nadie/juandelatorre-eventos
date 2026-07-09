"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, RentalItem } from "@/lib/sanity";
import {
  STATIC_ITEMS,
  STATIC_CATEGORIES,
  type StaticItem,
} from "@/lib/staticData";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildQuoteUrl } from "@/lib/quote";
import ProductCard from "./ProductCard";
import WhatsAppIcon from "./WhatsAppIcon";

interface CatalogGridProps {
  categories: Category[];
  items: RentalItem[];
}

interface QuoteDetails {
  eventType: string;
  guestCount: string;
  location: string;
}

export default function CatalogGrid({ categories, items }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string>(
    () => searchParams.get("categoria") ?? "todos"
  );
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>({
    eventType: "",
    guestCount: "",
    location: "",
  });

  const usingSanity = items.length > 0;
  const displayItems: StaticItem[] = usingSanity
    ? items.map((i) => ({ ...i, localImage: "" }))
    : STATIC_ITEMS;
  const displayCategories =
    categories.length > 0 ? categories : STATIC_CATEGORIES;

  const showingAll = activeSlug === "todos";

  const filteredItems = showingAll
    ? displayItems
    : displayItems.filter((item) => item.category?.slug === activeSlug);

  const selectedSet = useMemo(() => new Set(selectedNames), [selectedNames]);

  const groupedSections = showingAll
    ? displayCategories
        .map((cat) => ({
          category: cat,
          items: displayItems.filter((i) => i.category?.slug === cat.slug),
        }))
        .filter((g) => g.items.length > 0)
    : null;

  const quoteUrl = buildQuoteUrl({
    number: WHATSAPP_NUMBER,
    items: selectedNames,
    eventType: quoteDetails.eventType,
    guestCount: quoteDetails.guestCount,
    location: quoteDetails.location,
  });

  function toggleItem(name: string) {
    setSelectedNames((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  function updateQuoteDetails(field: keyof QuoteDetails, value: string) {
    setQuoteDetails((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Page title */}
      <div className="grid gap-6 pb-10 lg:grid-cols-[0.85fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-bold text-brand-ruby">Lo que rentamos</p>
          <h1 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            Catálogo para armar tu cotización.
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-8 text-brand-charcoal/68 lg:justify-self-end">
          Agrega artículos, completa los datos básicos del evento y manda un
          solo WhatsApp. También puedes cotizar una pieza directamente desde su
          tarjeta.
        </p>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-20 -mx-4 border-y border-brand-champagne/70 bg-brand-warm-white/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:px-0">
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

      {selectedNames.length > 0 && (
        <QuoteSummary
          selectedNames={selectedNames}
          quoteDetails={quoteDetails}
          quoteUrl={quoteUrl}
          onChange={updateQuoteDetails}
          onRemove={toggleItem}
          onClear={() => setSelectedNames([])}
        />
      )}

      {/* Content */}
      {showingAll && groupedSections ? (
        <div className="mt-12 space-y-16">
          {groupedSections.map(({ category, items: catItems }) => (
            <section key={category._id}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="shrink-0 font-playfair text-2xl font-bold text-brand-charcoal">
                  {category.name}
                </h2>
                <div className="h-px flex-1 bg-brand-champagne" />
                <button
                  type="button"
                  onClick={() => setActiveSlug(category.slug)}
                  className="shrink-0 text-sm font-bold text-brand-gold transition-colors hover:text-brand-ruby"
                >
                  Ver categoría
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {catItems.map((item, index) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    localImageSrc={
                      !usingSanity && item.localImage ? item.localImage : undefined
                    }
                    localImageSrcs={
                      !usingSanity && item.localImages?.length
                        ? item.localImages
                        : undefined
                    }
                    selected={selectedSet.has(item.name)}
                    onToggle={() => toggleItem(item.name)}
                    priority={index < 3 && category.slug === "sillas"}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center text-brand-charcoal/58">
          <p className="text-lg font-medium">
            No hay artículos en esta categoría todavía.
          </p>
          <button
            type="button"
            onClick={() => setActiveSlug("todos")}
            className="mt-4 text-sm font-bold text-brand-gold hover:text-brand-ruby"
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <ProductCard
              key={item._id}
              item={item}
              localImageSrc={
                !usingSanity && item.localImage ? item.localImage : undefined
              }
              localImageSrcs={
                !usingSanity && item.localImages?.length
                  ? item.localImages
                  : undefined
              }
              selected={selectedSet.has(item.name)}
              onToggle={() => toggleItem(item.name)}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteSummary({
  selectedNames,
  quoteDetails,
  quoteUrl,
  onChange,
  onRemove,
  onClear,
}: {
  selectedNames: string[];
  quoteDetails: QuoteDetails;
  quoteUrl: string;
  onChange: (field: keyof QuoteDetails, value: string) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
}) {
  return (
    <section className="sticky top-[7.8rem] z-10 mt-6 rounded-[1.75rem] border border-brand-champagne bg-white p-5 shadow-[0_22px_70px_rgba(24,22,21,0.12)]">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold text-brand-ruby">
            {selectedNames.length} artículo
            {selectedNames.length === 1 ? "" : "s"} seleccionado
            {selectedNames.length === 1 ? "" : "s"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNames.map((name) => (
              <button
                type="button"
                key={name}
                onClick={() => onRemove(name)}
                className="rounded-full bg-brand-warm-white px-3 py-1.5 text-xs font-bold text-brand-charcoal transition hover:bg-brand-champagne"
                aria-label={`Quitar ${name}`}
              >
                {name} x
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <InputField
            label="Tipo de evento"
            value={quoteDetails.eventType}
            onChange={(value) => onChange("eventType", value)}
          />
          <InputField
            label="Invitados"
            value={quoteDetails.guestCount}
            inputMode="numeric"
            onChange={(value) => onChange("guestCount", value)}
          />
          <InputField
            label="Zona"
            value={quoteDetails.location}
            onChange={(value) => onChange("location", value)}
          />
        </div>

        <div className="flex gap-2 lg:flex-col">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 active:translate-y-px lg:flex-none"
          >
            <WhatsAppIcon size={17} />
            Enviar
          </a>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-brand-champagne px-5 py-3 text-sm font-bold text-brand-charcoal transition hover:border-brand-ruby hover:text-brand-ruby lg:flex-none"
          >
            Limpiar
          </button>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  inputMode,
  onChange,
}: {
  label: string;
  value: string;
  inputMode?: "numeric";
  onChange: (value: string) => void;
}) {
  const id = `quote-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-xs font-bold text-brand-charcoal/58">{label}</span>
      <input
        id={id}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-full border border-brand-champagne bg-brand-warm-white px-4 py-2.5 text-sm font-semibold text-brand-charcoal outline-none transition focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20"
      />
    </label>
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
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${
        active
          ? "bg-brand-ruby text-white shadow-sm"
          : "border border-brand-champagne bg-white text-brand-charcoal/72 hover:border-brand-gold hover:text-brand-gold"
      }`}
    >
      {label}
    </button>
  );
}
