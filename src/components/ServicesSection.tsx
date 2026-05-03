import Link from "next/link";
import type { Category } from "@/lib/sanity";

interface ServicesSectionProps {
  categories: Category[];
}

const FALLBACK_CATEGORIES: Category[] = [
  { _id: "1", name: "Mobiliario", slug: "mobiliario" },
  { _id: "2", name: "Escenarios", slug: "escenarios" },
  { _id: "3", name: "Sillas", slug: "sillas" },
  { _id: "4", name: "Mesas", slug: "mesas" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  default: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  mobiliario: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h20M4 4v16M20 4v16M4 12h16" />
    </svg>
  ),
  escenarios: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="12" rx="1" />
      <path d="M6 8V5M12 8V4M18 8V5" />
    </svg>
  ),
  sillas: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M5 10h14M5 10v9M19 10v9M8 19h8" />
    </svg>
  ),
  mesas: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="3" rx="1" />
      <path d="M6 11v8M18 11v8" />
    </svg>
  ),
};

function getIcon(slug: string) {
  return CATEGORY_ICONS[slug.toLowerCase()] ?? CATEGORY_ICONS.default;
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
  const items = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

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
              className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-brand-gold/30 transition-all duration-200"
            >
              <div className="text-brand-ruby/70 group-hover:text-brand-gold mb-4 transition-colors">
                {getIcon(cat.slug)}
              </div>
              <span className="font-playfair text-brand-charcoal text-base font-bold group-hover:text-brand-ruby transition-colors">
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
