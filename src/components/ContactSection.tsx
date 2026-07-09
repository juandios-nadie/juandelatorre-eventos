import type { SiteSettings } from "@/lib/sanity";
import {
  WHATSAPP_NUMBER,
  DEFAULT_PHONE,
  FACEBOOK_URL,
} from "@/lib/constants";
import QuickQuoteForm from "./QuickQuoteForm";

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_PHONE;
  const whatsapp = settings?.whatsapp ?? WHATSAPP_NUMBER;
  const facebookUrl = settings?.facebookUrl ?? FACEBOOK_URL;

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
          <QuickQuoteForm
            number={whatsapp}
            submitLabel="Escribir por WhatsApp"
            secondaryAction={{
              href: facebookUrl,
              label: "Ver Facebook",
              external: true,
              icon: "facebook",
              placement: "after",
              variant: "ghost",
            }}
          />

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
