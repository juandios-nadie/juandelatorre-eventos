"use client";

import Image from "next/image";
import { useState } from "react";
import type { RentalItem } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { whatsappItemUrl } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

interface ProductCardProps {
  item: RentalItem;
  localImageSrc?: string;
  localImageSrcs?: string[];
  selected?: boolean;
  onToggle?: () => void;
  priority?: boolean;
  quoteTrayHref?: string;
}

export default function ProductCard({
  item,
  localImageSrc,
  localImageSrcs,
  selected = false,
  onToggle,
  priority = false,
  quoteTrayHref = "#quote-tray",
}: ProductCardProps) {
  const sanityUrl = item.photo
    ? urlFor(item.photo).width(720).height(620).fit("crop").quality(82).url()
    : null;

  const images: string[] = localImageSrcs?.length
    ? localImageSrcs
    : localImageSrc
    ? [localImageSrc]
    : sanityUrl
    ? [sanityUrl]
    : [];

  const [current, setCurrent] = useState(0);
  const imageUrl = images[current] ?? null;
  const cue = getItemCue(item);

  return (
    <article
      className={`group flex min-h-full flex-col overflow-hidden rounded-xl border bg-white transition duration-300 ${
        selected
          ? "border-brand-gold ring-2 ring-brand-gold/16"
          : "border-brand-charcoal/12 hover:border-brand-charcoal/30"
      }`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-brand-champagne/32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-champagne/40 to-brand-champagne/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30">
              <div className="h-2 w-2 rounded-full bg-brand-gold/40" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-charcoal/30">
              Foto próximamente
            </span>
          </div>
        )}

        <div className="absolute right-0 top-0 flex items-start justify-end p-3">
          {selected && (
            <span className="rounded-full bg-brand-gold px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-brand-charcoal shadow-sm">
              Agregado
            </span>
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Ver foto ${i + 1} de ${item.name}`}
                className={`h-2.5 w-2.5 rounded-full border border-white/80 transition-colors ${
                  i === current ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="min-h-[4.6rem]">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-gold-ink">
            {item.category?.name}
          </p>
          {cue && (
            <p className="mb-2 text-xs font-bold text-brand-charcoal/68">
              {cue}
            </p>
          )}
          <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.035em] text-brand-charcoal">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-brand-charcoal/62">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-5 grid gap-2">
          {onToggle && !selected && (
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-charcoal px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-gold hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:scale-[0.98]"
              aria-pressed={selected}
            >
              Agregar a cotización
              <span className="sr-only">: {item.name}</span>
            </button>
          )}

          {onToggle && selected && (
            <div className="grid gap-2">
              <a
                href={quoteTrayHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-gold px-4 py-3 text-sm font-extrabold text-brand-charcoal transition hover:bg-brand-charcoal hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:scale-[0.98]"
              >
                Ver cotización
                <span className="sr-only"> con {item.name}</span>
              </a>
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-charcoal/16 px-4 py-3 text-sm font-extrabold text-brand-charcoal/64 transition hover:border-brand-charcoal hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:scale-[0.98]"
              >
                Quitar
                <span className="sr-only"> {item.name} de la cotización</span>
              </button>
            </div>
          )}

          {!selected && (
            <a
              href={whatsappItemUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-charcoal/16 px-4 py-3 text-sm font-extrabold text-brand-charcoal transition hover:border-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:scale-[0.98]"
            >
              <WhatsAppIcon size={14} />
              Cotizar solo este
              <span className="sr-only"> artículo: {item.name}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function getItemCue(item: RentalItem): string | null {
  const name = item.name.toLowerCase();
  const category = item.category?.slug;

  if (name.includes("infantil")) return "Zona infantil";
  if (name.includes("novios") || name.includes("luis")) return "Mesa principal";
  if (name.includes("crossback") || name.includes("nogal")) {
    return "Bodas y jardín";
  }
  if (category === "toldos" || name.includes("calentador")) return "Exterior";
  if (category === "cristaleria") return "Mesa vestida";
  if (category === "periqueras") return "Coctel y terraza";
  if (category === "escenarios") return "Ceremonia";
  return null;
}
