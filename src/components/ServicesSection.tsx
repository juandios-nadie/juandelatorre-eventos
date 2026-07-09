import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/sanity";
import { STATIC_CATEGORIES, getCategoryImage } from "@/lib/staticData";

interface ServicesSectionProps {
  categories: Category[];
}

const CATEGORY_COPY: Record<string, string> = {
  sillas: "Tiffany, Versalles, Crossback, Luis XV e infantiles.",
  mesas: "Redondas, rectangulares, infantiles y madera nogal.",
  cristaleria: "Copas, platos, cubiertos, servilletas y mesa vestida.",
  periqueras: "Cristal o madera para coctel, jardines y terrazas.",
  toldos: "Toldos árabes con luz, cielo y cortinas laterales.",
  escenarios: "Tarimas, pódium, soportes y calentadores de exterior.",
  kits: "Montajes listos para mesa principal y eventos completos.",
};

export default function ServicesSection({ categories }: ServicesSectionProps) {
  const items = categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <section className="bg-brand-warm-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold text-brand-ruby">
              Catálogo de renta
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
              Lo que más preguntan por Facebook, ordenado para cotizar.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-brand-charcoal/68 lg:justify-self-end">
            La intención es simple: que cada cliente vea rápido si hay lo que
            necesita y llegue a WhatsApp con una selección inicial.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((cat, index) => (
            <Link
              key={cat._id}
              href={`/catalogo?categoria=${cat.slug}`}
              className={`group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-brand-champagne bg-brand-charcoal shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-warm-white ${
                index === 0 || index === 1 ? "lg:col-span-2" : ""
              }`}
            >
              <Image
                src={getCategoryImage(cat.slug)}
                alt={cat.name}
                fill
                sizes={
                  index === 0 || index === 1
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 25vw"
                }
                className="object-cover opacity-[0.82] transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/34 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-playfair text-2xl font-bold text-white">
                  {cat.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/68">
                  {CATEGORY_COPY[cat.slug] ?? "Piezas para completar tu evento."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 focus:ring-offset-brand-warm-white active:translate-y-px"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
