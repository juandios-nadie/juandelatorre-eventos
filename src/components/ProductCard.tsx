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
      className={`group flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected
          ? "border-brand-ruby ring-2 ring-brand-ruby/18"
          : "border-brand-champagne hover:border-brand-gold/50"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-champagne/32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
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

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
          <span className="rounded-full bg-brand-charcoal/82 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {item.category?.name}
          </span>
          {selected && (
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-ruby shadow-sm">
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

      <div className="flex flex-1 flex-col p-5">
        <div className="min-h-[4.6rem]">
          {cue && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-ruby">
              {cue}
            </p>
          )}
          <h3 className="font-playfair text-2xl font-bold leading-tight text-brand-charcoal">
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
              className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:translate-y-px"
              aria-pressed={selected}
              aria-label={`Agregar ${item.name} a la cotización`}
            >
              Agregar a cotización
            </button>
          )}

          {onToggle && selected && (
            <div className="grid gap-2">
              <a
                href={quoteTrayHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-gold px-4 py-3 text-sm font-bold text-brand-charcoal transition hover:bg-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 active:translate-y-px"
                aria-label={`Ver cotización con ${item.name}`}
              >
                Ver cotización
              </a>
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center justify-center rounded-full border border-brand-champagne px-4 py-3 text-sm font-bold text-brand-ruby transition hover:border-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 active:translate-y-px"
                aria-label={`Quitar ${item.name} de la cotización`}
              >
                Quitar
              </button>
            </div>
          )}

          {!selected && (
            <a
              href={whatsappItemUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Cotizar solo este artículo: ${item.name}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-champagne px-4 py-3 text-sm font-bold text-brand-charcoal transition hover:border-[#25D366] hover:text-[#128C4A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 active:translate-y-px"
            >
              <WhatsAppIcon size={14} />
              Cotizar solo este
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
