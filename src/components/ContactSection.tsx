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

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_PHONE;
  const whatsapp = settings?.whatsapp ?? WHATSAPP_NUMBER;
  const facebookUrl = settings?.facebookUrl ?? FACEBOOK_URL;
  const whatsappUrl = buildWhatsappContactUrl(whatsapp);

  return (
    <section
      id="contacto"
      className="py-20 px-4 bg-brand-charcoal text-white scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <p className="text-brand-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
          Estamos para servirte
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-2">
          Contáctanos
        </h2>
        <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto mt-5 mb-10" />

        {/* Phone */}
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="inline-block font-playfair text-brand-gold text-4xl sm:text-5xl font-bold hover:text-brand-champagne transition-colors mb-8 tracking-wide"
        >
          {phone}
        </a>

        <p className="text-white/50 text-sm mb-10">
          Guadalajara, Jalisco · México · Atención siempre disponible
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-8 py-3.5 rounded-full transition-all text-sm w-full sm:w-auto justify-center"
          >
            <WhatsAppIcon size={18} />
            Escribir por WhatsApp
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#1464D8] text-white font-medium px-8 py-3.5 rounded-full transition-all text-sm w-full sm:w-auto justify-center"
          >
            <FacebookIcon />
            Ver en Facebook
          </a>
        </div>

        {/* Footer note */}
        <p className="text-white/30 text-xs mt-14 tracking-wide">
          © {new Date().getFullYear()} Juan de la Torre Eventos · Guadalajara,
          Jalisco
        </p>
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
