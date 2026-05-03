import Link from "next/link";
import type { RentalItem } from "@/lib/sanity";
import ProductCard from "./ProductCard";

interface FeaturedGalleryProps {
  items: RentalItem[];
}

export default function FeaturedGallery({ items }: FeaturedGalleryProps) {
  if (items.length === 0) {
    return null;
  }

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

        {/* Grid */}
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
      </div>
    </section>
  );
}
