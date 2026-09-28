import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/sanity";
import { STATIC_CATEGORIES, getCategoryImage } from "@/lib/staticData";
import SectionReveal from "./SectionReveal";

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
  const [featured, ...rest] = items;

  return (
    <section className="bg-brand-warm-white py-24 sm:py-28" id="catalogo">
      <div className="section-shell">
        <SectionReveal className="grid gap-8 border-b border-brand-charcoal/18 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="editorial-kicker">Catálogo de renta</p>
            <h2 className="display-type mt-4 max-w-xl text-4xl leading-[0.98] text-brand-charcoal sm:text-6xl">
              Un inventario amplio. Una decisión simple.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-brand-charcoal/62 lg:justify-self-end">
            Empieza por una familia de piezas. El catálogo conservará el filtro
            para que compares opciones y nos escribas con una idea más clara.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <SectionReveal>
            <Link
              href={`/catalogo?categoria=${featured.slug}`}
              aria-label={`Explorar ${featured.name}`}
              className="group block focus:outline-none"
            >
              <div className="media-surface relative aspect-[4/3] bg-brand-charcoal">
                <Image
                  src={getCategoryImage(featured.slug)}
                  alt={`Selección de ${featured.name.toLowerCase()} disponibles para renta`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 border-b border-brand-charcoal/18 pb-5">
                <div>
                  <p className="text-2xl font-extrabold tracking-[-0.035em] text-brand-charcoal sm:text-3xl">
                    {featured.name}
                  </p>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-brand-charcoal/58">
                    {CATEGORY_COPY[featured.slug]}
                  </p>
                </div>
                <span className="mt-1 text-2xl text-brand-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          </SectionReveal>

          <SectionReveal className="border-t border-brand-charcoal/18" delay={0.08}>
            {rest.map((cat, index) => (
              <Link
                key={cat._id}
                href={`/catalogo?categoria=${cat.slug}`}
                aria-label={`Explorar ${cat.name}`}
                className="group grid min-h-24 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-brand-charcoal/18 py-4 focus:outline-none focus-visible:bg-white/55 sm:grid-cols-[3rem_0.8fr_1.2fr_auto] sm:gap-5"
              >
                <span className="text-xs font-bold tabular-nums text-brand-gold">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span className="text-lg font-extrabold tracking-[-0.025em] text-brand-charcoal sm:text-xl">
                  {cat.name}
                </span>
                <span className="hidden text-sm leading-6 text-brand-charcoal/52 sm:block">
                  {CATEGORY_COPY[cat.slug] ?? "Piezas para completar tu evento."}
                </span>
                <span className="text-lg text-brand-charcoal transition duration-300 group-hover:translate-x-1 group-hover:text-brand-gold" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
            <Link
              href="/catalogo"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-charcoal px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand-gold hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-warm-white active:scale-[0.98]"
            >
              Ver catálogo completo
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
