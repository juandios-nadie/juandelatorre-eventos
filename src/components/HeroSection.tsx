import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import WhatsAppIcon from "./WhatsAppIcon";

interface HeroSectionProps {
  settings: SiteSettings | null;
}

const HERO_PROOF = [
  { label: "Inventario", value: "Propio y listo" },
  { label: "Entrega", value: "Montaje puntual" },
  { label: "Cobertura", value: "Guadalajara y Zapopan" },
];

const HERO_CHIPS = [
  "3.8k en Facebook",
  "GDL y Zapopan",
  "Inventario propio",
  "Montaje puntual",
];

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).quality(85).url()
    : null;

  const tagline =
    settings?.tagline ??
    "Mobiliario limpio, inventario propio y montaje puntual para bodas, XV años, jardines y empresas.";

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-brand-charcoal text-white sm:min-h-[calc(100dvh-5rem)]">
      <Image
        src={heroImageUrl ?? "/images/hero.jpeg"}
        alt="Montaje real con toldo, periqueras y mobiliario para evento en exterior"
        fill
        className="object-cover object-[72%_center] opacity-[0.6] sm:object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,22,21,0.94)_0%,rgba(24,22,21,0.78)_42%,rgba(24,22,21,0.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-charcoal to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 pb-10 pt-24 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:pb-14 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.58fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 hidden items-center gap-4 sm:flex">
              <Image
                src="/logo.jpg"
                alt="Juan de la Torre Eventos"
                width={72}
                height={72}
                className="h-14 w-14 rounded-2xl border border-white/15 object-cover shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:h-[72px] sm:w-[72px]"
                priority
              />
              <div>
                <p className="font-playfair text-lg font-bold leading-none text-brand-gold sm:text-2xl">
                  Juan de la Torre
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.32em] text-brand-champagne/78">
                  Eventos
                </p>
              </div>
            </div>

            <p className="mb-4 max-w-fit rounded-full border border-brand-gold/35 bg-brand-gold/12 px-4 py-2 text-xs font-semibold text-brand-champagne">
              Renta de mobiliario en Guadalajara
            </p>
            <h1 className="max-w-4xl font-playfair text-4xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Renta de sillas, mesas y toldos en Guadalajara.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cotizar"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#075E54] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_50px_rgba(7,94,84,0.34)] transition hover:bg-[#064D45] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
              >
                <WhatsAppIcon size={18} />
                Cotizar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
              >
                Ver catálogo
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:hidden">
              {HERO_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-brand-champagne"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden rounded-[2rem] border border-white/14 bg-white/10 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md lg:block">
            <p className="text-sm leading-6 text-white/72">
              Explora el catálogo, elige lo que necesitas y manda fecha, zona
              e invitados por WhatsApp para cotizar con más claridad.
            </p>
            <div className="mt-6 grid gap-3">
              {HERO_PROOF.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-t border-white/12 pt-3 text-sm"
                >
                  <span className="text-white/64">{item.label}</span>
                  <span className="font-semibold text-brand-champagne">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
