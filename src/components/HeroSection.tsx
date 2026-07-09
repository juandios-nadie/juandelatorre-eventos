import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

interface HeroSectionProps {
  settings: SiteSettings | null;
}

const HERO_PROOF = [
  { label: "Inventario", value: "Piezas listas para renta" },
  { label: "Entrega", value: "Montaje puntual" },
  { label: "Cobertura", value: "Guadalajara y Zapopan" },
];

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).quality(85).url()
    : null;

  const tagline =
    settings?.tagline ??
    "Sillas, mesas, toldos y montajes completos para eventos sociales y empresariales.";

  return (
    <section className="relative isolate min-h-[calc(100dvh-6rem)] overflow-hidden bg-brand-charcoal text-white">
      <Image
        src={heroImageUrl ?? "/images/hero.jpeg"}
        alt="Montaje real con toldo, periqueras y mobiliario para evento en exterior"
        fill
        className="object-cover object-center opacity-[0.58]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,22,21,0.94)_0%,rgba(24,22,21,0.78)_42%,rgba(24,22,21,0.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-charcoal to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-6rem)] max-w-7xl items-center px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.58fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
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
              Mobiliario limpio, completo y listo para tu evento.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_50px_rgba(37,211,102,0.28)] transition hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
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
          </div>

          <div className="hidden rounded-[2rem] border border-white/14 bg-white/10 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md lg:block">
            <p className="text-sm leading-6 text-white/72">
              La mayoría de los clientes llegan por Facebook y WhatsApp. Esta
              página ahora funciona como puente: ven el catálogo, entienden el
              servicio y llegan con una cotización más clara.
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
