import Image from "next/image";
import type { RentalItem } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

interface ProductCardProps {
  item: RentalItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const imageUrl = item.photo
    ? urlFor(item.photo).width(600).height(480).fit("crop").quality(80).url()
    : null;

  const whatsappText = encodeURIComponent(
    `Hola, me interesa cotizar: ${item.name}`
  );
  const whatsappUrl = `https://wa.me/523334469044?text=${whatsappText}`;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-brand-champagne hover:border-brand-gold/40 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-brand-champagne/40 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-champagne">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-ruby/90 text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
            {item.category?.name}
          </span>
        </div>
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
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors"
        >
          <WhatsAppIcon />
          Cotizar este artículo
        </a>
      </div>
    </article>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
