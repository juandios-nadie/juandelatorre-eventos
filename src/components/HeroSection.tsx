import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import WhatsAppIcon from "./WhatsAppIcon";

interface HeroSectionProps {
  settings: SiteSettings | null;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).quality(85).url()
    : null;

  const tagline =
    settings?.tagline ??
    "Mobiliario limpio, inventario propio y montaje puntual para bodas, XV años, jardines y empresas.";

  return (
    <section className="relative isolate flex min-h-[100dvh] overflow-hidden bg-brand-charcoal text-white">
      <Image
        src={heroImageUrl ?? "/images/hero.jpeg"}
        alt="Montaje real con toldo, periqueras y mobiliario para evento en exterior"
        fill
        className="object-cover object-[68%_center] opacity-[0.78] sm:object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,17,0.96)_0%,rgba(20,20,17,0.78)_44%,rgba(20,20,17,0.2)_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,20,17,0.86)_0%,transparent_56%)]" />

      <div className="section-shell relative z-10 flex min-h-[100dvh] items-end pb-12 pt-28 sm:pb-16 lg:pb-20">
        <div className="w-full max-w-4xl">
          <div className="mb-5 flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-brand-gold">
            <span>Juan de la Torre Eventos</span>
            <span className="h-px w-10 bg-brand-gold/60" aria-hidden="true" />
            <span>Guadalajara</span>
          </div>
          <h1 className="display-type max-w-6xl text-[clamp(3rem,5.6vw,5rem)] leading-[0.94] text-white">
            <span className="lg:block">Renta de mobiliario para </span>
            <span className="lg:block">eventos en Guadalajara.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/72 sm:text-lg sm:leading-8">
            {tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cotizar"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-4 text-sm font-extrabold text-brand-charcoal transition duration-300 hover:bg-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:scale-[0.98]"
            >
              <WhatsAppIcon size={18} />
              Cotizar por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/24 bg-white/8 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:scale-[0.98]"
            >
              Ver catálogo
            </Link>
          </div>
        </div>

        <p className="absolute bottom-5 right-0 hidden max-w-[18rem] text-right text-xs font-semibold leading-5 text-white/42 lg:block">
          Montajes reales, inventario propio y atención directa para eventos en
          la zona metropolitana.
        </p>
      </div>
    </section>
  );
}
