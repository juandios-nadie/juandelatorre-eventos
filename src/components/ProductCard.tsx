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
}

export default function ProductCard({ item, localImageSrc, localImageSrcs }: ProductCardProps) {
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
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-brand-champagne hover:border-brand-gold/40 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-64 bg-brand-champagne/40 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
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
        <div className="absolute top-3 left-3">
          <span className="bg-brand-ruby/90 text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
            {item.category?.name}
          </span>
        </div>

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
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-playfair font-bold text-brand-charcoal text-base mb-1 leading-snug">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-brand-charcoal/60 text-xs leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        <a
          href={whatsappItemUrl(item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors"
        >
          <WhatsAppIcon size={14} />
          Cotizar este artículo
        </a>
      </div>
    </article>
  );
}
