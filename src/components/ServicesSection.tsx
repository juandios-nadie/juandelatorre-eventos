import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/sanity";
import { STATIC_CATEGORIES, getCategoryImage } from "@/lib/staticData";

interface ServicesSectionProps {
  categories: Category[];
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
  const items = categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <section className="py-20 px-4 bg-brand-warm-white">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
            Lo que ofrecemos
          </p>
          <h2 className="font-playfair text-brand-charcoal text-3xl sm:text-4xl font-bold">
            Nuestros Servicios
          </h2>
          <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto mt-5" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((cat) => (
            <Link
              key={cat._id}
              href={`/catalogo?categoria=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-[4/3]"
            >
              <Image
                src={getCategoryImage(cat.slug)}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-0 right-0 text-center font-playfair text-white text-sm sm:text-base font-bold drop-shadow-md px-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/catalogo"
            className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-medium px-8 py-3 rounded-full transition-all text-sm tracking-wide"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
