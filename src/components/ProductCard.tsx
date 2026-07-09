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
}

export default function ProductCard({
  item,
  localImageSrc,
  localImageSrcs,
  selected = false,
  onToggle,
  priority = false,
}: ProductCardProps) {
  const sanityUrl = item.photo
    ? urlFor(item.photo).width(600).height(480).fit("crop").quality(80).url()
    : null;

  // Build the full list of images to show
  const images: string[] = localImageSrcs?.length
    ? localImageSrcs
    : localImageSrc
    ? [localImageSrc]
    : sanityUrl
    ? [sanityUrl]
    : [];

  const [current, setCurrent] = useState(0);
  const imageUrl = images[current] ?? null;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected
          ? "border-brand-ruby ring-2 ring-brand-ruby/18"
          : "border-brand-champagne hover:border-brand-gold/50"
      }`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-brand-champagne/32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-champagne/40 to-brand-champagne/80 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-gold/40" />
            </div>
            <span className="text-brand-charcoal/30 text-[9px] uppercase tracking-[0.3em]">
              Foto próximamente
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-brand-charcoal/82 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {item.category?.name}
          </span>
        </div>

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
              selected
                ? "bg-brand-ruby text-white"
                : "bg-white/92 text-brand-charcoal hover:bg-brand-champagne"
            }`}
            aria-pressed={selected}
          >
            {selected ? "Seleccionado" : "Agregar"}
          </button>
        )}

        {/* Dot navigation — only when multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Foto ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-playfair text-xl font-bold leading-snug text-brand-charcoal">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-2 mb-4 line-clamp-3 text-sm leading-6 text-brand-charcoal/62">
            {item.description}
          </p>
        )}

        <a
          href={whatsappItemUrl(item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 active:translate-y-px"
        >
          <WhatsAppIcon size={14} />
          Cotizar este artículo
        </a>
      </div>
    </article>
  );
}
