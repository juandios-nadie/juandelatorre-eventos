import Image from "next/image";
import Link from "next/link";
import type { RentalItem } from "@/lib/sanity";
import { STATIC_PHOTOS } from "@/lib/staticData";
import ProductCard from "./ProductCard";

interface FeaturedGalleryProps {
  items: RentalItem[];
}

export default function FeaturedGallery({ items }: FeaturedGalleryProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
            Galería
          </p>
          <h2 className="font-playfair text-brand-charcoal text-3xl sm:text-4xl font-bold">
            Trabajos Destacados
          </h2>
          <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto mt-5" />
        </div>

        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.slice(0, 6).map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
            {items.length > 6 && (
              <div className="text-center mt-10">
                <Link
                  href="/catalogo"
                  className="inline-block bg-brand-ruby hover:bg-brand-ruby/85 text-white font-medium px-8 py-3 rounded-full transition-all text-sm tracking-wide"
                >
                  Ver todos los artículos
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STATIC_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-wide drop-shadow-md">
                    {photo.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/catalogo"
                className="inline-block bg-brand-ruby hover:bg-brand-ruby/85 text-white font-medium px-8 py-3 rounded-full transition-all text-sm tracking-wide"
              >
                Ver catálogo completo
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
