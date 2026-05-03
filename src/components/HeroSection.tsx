import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { WHATSAPP_URL } from "@/lib/constants";
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
    "Renta de mobiliario y escenarios para eventos en Guadalajara";

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src={heroImageUrl ?? "/images/hero.jpeg"}
        alt="Juan de la Torre Eventos — ambientación de evento"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(28,28,30,0.58)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Location tag */}
        <p className="text-brand-champagne/70 text-xs tracking-[0.45em] uppercase mb-5">
          Guadalajara, Jalisco · México
        </p>

        {/* Wordmark */}
        <h1 className="font-playfair text-brand-gold font-bold leading-none">
          <span className="block text-4xl sm:text-6xl md:text-7xl tracking-wide">
            Juan de la Torre
          </span>
        </h1>

        <div className="flex items-center gap-3 justify-center my-4">
          <div className="h-px flex-1 bg-brand-gold/40" />
          <span className="text-brand-champagne text-xs tracking-[0.45em] uppercase font-light">
            Eventos
          </span>
          <div className="h-px flex-1 bg-brand-gold/40" />
        </div>

        {/* Tagline */}
        <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
          {tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/catalogo"
            className="bg-brand-gold hover:bg-brand-gold/85 text-white font-medium px-8 py-3.5 rounded-full transition-all text-sm tracking-wide w-full sm:w-auto text-center"
          >
            Ver Catálogo
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-8 py-3.5 rounded-full transition-all text-sm w-full sm:w-auto"
          >
            <WhatsAppIcon size={18} />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
