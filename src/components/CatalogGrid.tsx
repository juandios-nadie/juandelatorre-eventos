"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, RentalItem } from "@/lib/sanity";
import {
  STATIC_ITEMS,
  STATIC_CATEGORIES,
  type StaticItem,
} from "@/lib/staticData";
import {
  buildCatalogSections,
  getCatalogStats,
  type CatalogSection,
} from "@/lib/catalog";
import { WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildQuoteUrl } from "@/lib/quote";
import ProductCard from "./ProductCard";
import WhatsAppIcon from "./WhatsAppIcon";

interface CatalogGridProps {
  categories: Category[];
  items: RentalItem[];
}

interface QuoteDetails {
  eventDate: string;
  eventType: string;
  guestCount: string;
  location: string;
}

const CATEGORY_SUMMARIES: Record<string, string> = {
  sillas: "Modelos para ceremonia, banquete, jardín y zona infantil.",
  mesas: "Redondas, cuadradas, rectangulares y madera nogal.",
  cristaleria: "Lo necesario para vestir la mesa con una línea completa.",
  periqueras: "Puntos altos para coctel, terrazas y recepciones.",
  toldos: "Cobertura para exterior con cielo, luz y cortinas opcionales.",
  escenarios: "Tarimas, pódium, soportes y apoyo para montajes formales.",
  kits: "Combinaciones listas para mesa principal y montajes completos.",
};

export default function CatalogGrid({ categories, items }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string>(
    () => searchParams.get("categoria") ?? "todos"
  );
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>({
    eventDate: "",
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

  const sections = useMemo(
    () => buildCatalogSections(displayCategories, displayItems),
    [displayCategories, displayItems]
  );
  const stats = useMemo(() => getCatalogStats(sections), [sections]);
  const selectedSet = useMemo(() => new Set(selectedNames), [selectedNames]);

  const showingAll = activeSlug === "todos";
  const activeSection = sections.find(
    (section) => section.category.slug === activeSlug
  );
  const visibleSections = showingAll
    ? sections
    : activeSection
    ? [activeSection]
    : [];

  const quoteUrl = buildQuoteUrl({
    number: WHATSAPP_NUMBER,
    items: selectedNames,
    eventDate: quoteDetails.eventDate,
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

  function renderProductCard(
    item: StaticItem,
    index: number,
    categorySlug?: string
  ) {
    return (
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
        priority={index < 3 && (showingAll ? categorySlug === "sillas" : true)}
        quoteTrayHref="#quote-tray"
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CatalogHero stats={stats} />

      <CategoryRail
        sections={sections}
        stats={stats}
        activeSlug={activeSlug}
        onSelect={setActiveSlug}
      />
      <CatalogStatus
        showingAll={showingAll}
        activeSection={activeSection}
        itemCount={stats.itemCount}
      />
      <p className="sr-only" aria-live="polite">
        {selectedNames.length} artículo
        {selectedNames.length === 1 ? "" : "s"} seleccionado
        {selectedNames.length === 1 ? "" : "s"} para cotizar.
      </p>

      <div
        id="catalog-items"
        className={`mt-8 grid gap-8 ${
          selectedNames.length > 0
            ? "pb-28 lg:grid-cols-[minmax(0,1fr)_390px] lg:pb-0"
            : ""
        }`}
      >
        <div className="order-2 lg:order-1">
          {visibleSections.length > 0 ? (
            <div className="space-y-16">
              {visibleSections.map((section) => (
                <ShowroomSection
                  key={section.category._id}
                  section={section}
                  showingAll={showingAll}
                  onViewCategory={() => setActiveSlug(section.category.slug)}
                >
                  {section.items.map((item, index) =>
                    renderProductCard(item, index, section.category.slug)
                  )}
                </ShowroomSection>
              ))}
            </div>
          ) : (
            <EmptyCatalogState onReset={() => setActiveSlug("todos")} />
          )}
        </div>

        {selectedNames.length > 0 && (
          <QuoteTray
            selectedNames={selectedNames}
            quoteDetails={quoteDetails}
            quoteUrl={quoteUrl}
            onChange={updateQuoteDetails}
            onRemove={toggleItem}
            onClear={() => setSelectedNames([])}
          />
        )}
      </div>

      {selectedNames.length > 0 && (
        <MobileQuoteBar selectedCount={selectedNames.length} quoteUrl={quoteUrl} />
      )}
    </div>
  );
}

function CatalogHero({
  stats,
}: {
  stats: { itemCount: number; categoryCount: number };
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-brand-champagne bg-brand-charcoal text-white shadow-[0_24px_80px_rgba(24,22,21,0.16)]">
      <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_0.72fr] lg:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-brand-gold">Showroom de renta</p>
          <h1 className="mt-3 font-playfair text-[2.35rem] font-bold leading-[0.95] sm:text-6xl">
            Elige piezas, arma tu lista y manda una cotización clara.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 sm:mt-5 sm:text-base sm:leading-8">
            Este catálogo está pensado para decidir rápido: revisa por familia,
            agrega lo que te interesa y llega a WhatsApp con la información
            ordenada.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <a
              href="#catalog-items"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold text-brand-charcoal transition hover:bg-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
            >
              Explorar catálogo
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center rounded-full border border-white/16 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:inline-flex"
            >
              WhatsApp directo
            </a>
          </div>
        </div>

        <div className="hidden content-end gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-1">
          <HeroStat value={`${stats.itemCount}`} label="artículos visibles" />
          <HeroStat value={`${stats.categoryCount}`} label="familias de renta" />
          <HeroStat value="1" label="mensaje para cotizar" />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4">
      <p className="font-playfair text-3xl font-bold text-brand-gold">
        {value}
      </p>
      <p className="mt-1 text-sm font-semibold text-white/78">{label}</p>
    </div>
  );
}

function CategoryRail({
  sections,
  stats,
  activeSlug,
  onSelect,
}: {
  sections: CatalogSection[];
  stats: { itemCount: number };
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <section
      className="sticky top-16 z-20 -mx-4 border-b border-brand-champagne/70 bg-brand-warm-white/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:px-0"
      aria-label="Categorías del catálogo"
    >
      <div className="mb-2 flex items-center justify-between text-xs font-bold text-brand-charcoal/58 lg:hidden">
        <span>Categorías</span>
        <span>Desliza</span>
      </div>
      <div
        className="flex snap-x gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible xl:grid-cols-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        role="group"
        aria-label="Filtrar artículos por categoría"
      >
        <CategoryButton
          name="Todos"
          count={stats.itemCount}
          active={activeSlug === "todos"}
          onClick={() => onSelect("todos")}
        />
        {sections.map((section) => (
          <CategoryButton
            key={section.category._id}
            name={section.category.name}
            count={section.items.length}
            active={activeSlug === section.category.slug}
            onClick={() => onSelect(section.category.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryButton({
  name,
  count,
  active,
  onClick,
}: {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`grid min-w-[9rem] shrink-0 snap-start gap-1 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-warm-white lg:min-w-0 ${
        active
          ? "border-brand-ruby bg-brand-ruby text-white shadow-sm"
          : "border-brand-champagne bg-white text-brand-charcoal hover:border-brand-gold"
      }`}
    >
      <span className="text-sm font-bold leading-tight">{name}</span>
      <span
        className={`text-xs font-semibold ${
          active ? "text-white/70" : "text-brand-charcoal/48"
        }`}
      >
        {count} {count === 1 ? "pieza" : "piezas"}
      </span>
    </button>
  );
}

function CatalogStatus({
  showingAll,
  activeSection,
  itemCount,
}: {
  showingAll: boolean;
  activeSection?: CatalogSection;
  itemCount: number;
}) {
  return (
    <div className="mt-5 flex flex-col gap-2 text-sm text-brand-charcoal/62 sm:flex-row sm:items-center sm:justify-between">
      <p>
        {showingAll
          ? `Mostrando todo el catálogo por familia: ${itemCount} piezas.`
          : `Mostrando solo ${
              activeSection?.category.name ?? "esta categoría"
            }.`}
      </p>
      <p className="font-semibold text-brand-charcoal/72">
        Agrega varias piezas y envía una sola cotización.
      </p>
    </div>
  );
}

function ShowroomSection({
  section,
  showingAll,
  onViewCategory,
  children,
}: {
  section: CatalogSection;
  showingAll: boolean;
  onViewCategory: () => void;
  children: React.ReactNode;
}) {
  const summary =
    CATEGORY_SUMMARIES[section.category.slug] ??
    "Piezas disponibles para integrar a tu montaje.";

  return (
    <section>
      <div className="mb-6 grid gap-4 border-b border-brand-champagne pb-5 lg:grid-cols-[0.72fr_1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ruby">
            {section.items.length} {section.items.length === 1 ? "pieza" : "piezas"}
          </p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-brand-charcoal sm:text-4xl">
            {section.category.name}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-brand-charcoal/62">
          {summary}
        </p>
        {showingAll && (
          <button
            type="button"
            onClick={onViewCategory}
            aria-label={`Ver solo ${section.category.name}`}
            className="inline-flex items-center justify-center rounded-full border border-brand-champagne bg-white px-5 py-3 text-sm font-bold text-brand-charcoal transition hover:border-brand-ruby hover:text-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 focus:ring-offset-brand-warm-white"
          >
            Ver solo esta familia
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

function QuoteTray({
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
    <aside
      id="quote-tray"
      className="order-1 scroll-mt-24 rounded-[2rem] border border-brand-champagne bg-white p-5 shadow-[0_22px_70px_rgba(24,22,21,0.12)] lg:sticky lg:top-28 lg:order-2 lg:self-start"
    >
      <div className="rounded-[1.5rem] bg-brand-charcoal p-5 text-white">
        <p className="text-sm font-bold text-brand-gold">Tu lista</p>
        <h2 className="mt-2 font-playfair text-2xl font-bold">
          {selectedNames.length} artículo
          {selectedNames.length === 1 ? "" : "s"} para cotizar
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedNames.map((name) => (
            <button
              type="button"
              key={name}
              onClick={() => onRemove(name)}
              className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white/84 transition hover:border-brand-gold hover:text-brand-champagne"
              aria-label={`Quitar ${name}`}
            >
              {name} x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <InputField
          label="Fecha"
          value={quoteDetails.eventDate}
          onChange={(value) => onChange("eventDate", value)}
        />
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

      <div className="mt-5 grid gap-2">
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ruby px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-ruby/90 focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 active:translate-y-px"
        >
          <WhatsAppIcon size={17} />
          Cotizar por WhatsApp
        </a>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center justify-center rounded-full border border-brand-champagne px-5 py-3 text-sm font-bold text-brand-charcoal transition hover:border-brand-ruby hover:text-brand-ruby"
        >
          Limpiar selección
        </button>
      </div>
    </aside>
  );
}

function MobileQuoteBar({
  selectedCount,
  quoteUrl,
}: {
  selectedCount: number;
  quoteUrl: string;
}) {
  return (
    <a
      href={quoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${selectedCount} artículo${
        selectedCount === 1 ? "" : "s"
      } seleccionado${
        selectedCount === 1 ? "" : "s"
      }. Cotizar por WhatsApp.`}
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex items-center justify-between rounded-full border border-white/16 bg-brand-charcoal px-5 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(24,22,21,0.28)] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-warm-white lg:hidden"
    >
      <span>
        {selectedCount} seleccionado{selectedCount === 1 ? "" : "s"}
      </span>
      <span className="rounded-full bg-brand-gold px-3 py-1.5 text-xs text-brand-charcoal">
        WhatsApp
      </span>
    </a>
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

function EmptyCatalogState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[2rem] border border-brand-champagne bg-white px-6 py-16 text-center text-brand-charcoal/62">
      <p className="font-playfair text-3xl font-bold text-brand-charcoal">
        No hay artículos en esta categoría todavía.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full bg-brand-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-ruby"
      >
        Ver catálogo completo
      </button>
    </div>
  );
}
