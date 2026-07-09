import Image from "next/image";
import Link from "next/link";
import type { RentalItem } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { STATIC_PHOTOS } from "@/lib/staticData";

interface FeaturedGalleryProps {
  items: RentalItem[];
}

export default function FeaturedGallery({ items }: FeaturedGalleryProps) {
  const photos =
    items.length > 0
      ? items.slice(0, 6).map((item) => ({
          src: item.photo
            ? urlFor(item.photo).width(900).height(700).fit("crop").quality(82).url()
            : "/images/hero.jpeg",
          label: item.name,
        }))
      : STATIC_PHOTOS;

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-brand-ruby">
              Montajes reales
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
              El inventario se entiende mejor cuando se ve en evento.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex w-fit items-center justify-center rounded-full border border-brand-gold px-6 py-3 text-sm font-bold text-brand-charcoal transition hover:bg-brand-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-white active:translate-y-px"
          >
            Ver catálogo
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <figure
              key={`${photo.src}-${photo.label}`}
              className={`group relative overflow-hidden rounded-[1.75rem] bg-brand-charcoal ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              } ${index === 3 ? "lg:row-span-2" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 25vw"
                }
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/72 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 font-playfair text-xl font-bold text-white">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
