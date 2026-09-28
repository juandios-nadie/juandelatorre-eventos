import type { SiteSettings } from "@/lib/sanity";
import { DEFAULT_PHONE, FACEBOOK_URL } from "@/lib/constants";
import { getFacebookPageUrl } from "@/lib/facebook";
import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";
import SectionReveal from "./SectionReveal";

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_PHONE;
  const facebookUrl = getFacebookPageUrl(settings?.facebookUrl ?? FACEBOOK_URL);

  return (
    <section id="contacto" className="bg-brand-charcoal py-24 text-white sm:py-32">
      <div className="section-shell">
        <SectionReveal className="grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-end lg:gap-20">
          <div>
            <p className="editorial-kicker">Atención directa</p>
            <h2 className="display-type mt-4 max-w-4xl text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">
              Hablemos de tu evento.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/58">
              Guadalajara y zona metropolitana. Cuéntanos fecha, ubicación,
              cantidad de invitados y las piezas que tienes en mente.
            </p>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="mt-10 inline-block text-[clamp(2.35rem,7vw,5rem)] font-extrabold leading-none tracking-[-0.055em] text-brand-gold transition hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-4 focus:ring-offset-brand-charcoal"
            >
              {phone}
            </a>
          </div>

          <div className="border-l border-white/16 pl-6 sm:pl-10">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-gold">
              ¿Ya tienes los datos?
            </span>
            <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-[-0.035em] sm:text-3xl">
              Termina la cotización o revisa nuestros montajes recientes.
            </h3>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="#cotizar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-extrabold text-brand-charcoal transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:scale-[0.98]"
              >
                <WhatsAppIcon size={17} />
                Preparar cotización
              </Link>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:scale-[0.98]"
              >
                <FacebookIcon />
                Ver Facebook
              </a>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Juan de la Torre Eventos.</p>
          <p>Guadalajara, Jalisco.</p>
        </div>
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
