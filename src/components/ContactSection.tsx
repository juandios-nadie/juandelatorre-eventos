import type { SiteSettings } from "@/lib/sanity";

interface ContactSectionProps {
  settings: SiteSettings | null;
}

const DEFAULT_SETTINGS = {
  phone: "333-446-90-44",
  whatsapp: "523334469044",
  facebookUrl:
    "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/",
};

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_SETTINGS.phone;
  const whatsapp = settings?.whatsapp ?? DEFAULT_SETTINGS.whatsapp;
  const facebookUrl = settings?.facebookUrl ?? DEFAULT_SETTINGS.facebookUrl;

  const whatsappUrl = `https://wa.me/${whatsapp}?text=Hola%2C%20me%20interesa%20cotizar%20un%20servicio`;

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
            <WhatsAppIcon />
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
