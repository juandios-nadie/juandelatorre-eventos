import Image from "next/image";
import Link from "next/link";
import type { RentalItem } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { STATIC_PHOTOS } from "@/lib/staticData";
import SectionReveal from "./SectionReveal";

interface FeaturedGalleryProps {
  items: RentalItem[];
}

export default function FeaturedGallery({ items }: FeaturedGalleryProps) {
  const photos =
    items.length > 0
      ? items.slice(0, 6).map((item) => ({
          src: item.photo
            ? urlFor(item.photo).width(1000).height(900).fit("crop").quality(84).url()
            : "/images/hero.jpeg",
          label: item.name,
        }))
      : STATIC_PHOTOS;

  return (
    <section className="bg-brand-warm-white py-24 sm:py-32">
      <div className="section-shell">
        <SectionReveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker">Inventario en contexto</p>
            <h2 className="display-type mt-4 max-w-3xl text-4xl leading-[0.98] text-brand-charcoal sm:text-6xl">
              Piezas reales, montajes reales.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-brand-charcoal/25 px-6 py-3 text-sm font-extrabold text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-warm-white active:scale-[0.98]"
          >
            Ver todo el inventario
          </Link>
        </SectionReveal>

        <div className="mt-14 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-5 lg:grid-cols-4 lg:auto-rows-[13rem]">
          {photos.map((photo, index) => (
            <SectionReveal
              key={`${photo.src}-${photo.label}`}
              delay={(index % 3) * 0.04}
              className={`min-h-0 ${index === 0 ? "col-span-2 row-span-3" : "row-span-2"} ${index === 3 ? "col-span-2 lg:col-span-1 lg:row-span-3" : ""}`}
            >
              <figure className="flex h-full flex-col">
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-brand-charcoal">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover transition duration-700 hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <figcaption className="pt-3 text-xs font-bold uppercase tracking-[0.1em] text-brand-charcoal/68">
                  {photo.label}
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
