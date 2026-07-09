import type { SiteSettings } from "@/lib/sanity";
import {
  WHATSAPP_NUMBER,
  DEFAULT_PHONE,
  FACEBOOK_URL,
  buildWhatsappContactUrl,
} from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

interface ContactSectionProps {
  settings: SiteSettings | null;
}

const CONTACT_HINTS = [
  "Fecha",
  "Zona",
  "Invitados",
  "Artículos de interés",
];

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_PHONE;
  const whatsapp = settings?.whatsapp ?? WHATSAPP_NUMBER;
  const facebookUrl = settings?.facebookUrl ?? FACEBOOK_URL;
  const whatsappUrl = buildWhatsappContactUrl(whatsapp);

  return (
    <section
      id="contacto"
      className="bg-brand-charcoal px-4 py-20 text-white scroll-mt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-bold text-brand-gold">
            Atención directa
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight sm:text-5xl">
            Cuéntanos qué evento estás armando.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/62">
            Si vienes de Facebook, puedes continuar aquí: revisa el catálogo,
            selecciona piezas y manda todo en un solo WhatsApp.
          </p>

          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="mt-9 inline-block font-playfair text-4xl font-bold text-brand-gold transition hover:text-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal sm:text-6xl"
          >
            {phone}
          </a>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {CONTACT_HINTS.map((hint) => (
              <div
                key={hint}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-brand-champagne"
              >
                {hint}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
            >
              <WhatsAppIcon size={18} />
              Escribir por WhatsApp
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/16 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
            >
              <FacebookIcon />
              Ver Facebook
            </a>
          </div>

          <p className="mt-8 text-sm leading-7 text-white/42">
            Guadalajara, Jalisco. Servicio para eventos sociales, bodas, XV años
            y empresas en zona metropolitana.
          </p>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl text-xs text-white/30">
        © {new Date().getFullYear()} Juan de la Torre Eventos. Guadalajara,
        Jalisco.
      </p>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
