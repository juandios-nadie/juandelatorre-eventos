import type { SiteSettings } from "@/lib/sanity";
import { DEFAULT_PHONE, FACEBOOK_URL } from "@/lib/constants";
import { getFacebookPageUrl } from "@/lib/facebook";
import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";

interface ContactSectionProps {
  settings: SiteSettings | null;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const phone = settings?.phone ?? DEFAULT_PHONE;
  const facebookUrl = getFacebookPageUrl(settings?.facebookUrl ?? FACEBOOK_URL);

  return (
    <section
      id="contacto"
      className="bg-brand-charcoal px-4 py-20 text-white sm:px-6 lg:px-8"
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
            Si vienes de Facebook, puedes revisar opciones, preparar tus datos
            y mandar un mensaje claro sin empezar desde cero.
          </p>

          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="mt-9 inline-block font-playfair text-[clamp(2.4rem,11vw,4rem)] font-bold leading-none text-brand-gold transition hover:text-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal"
          >
            {phone}
          </a>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
          <p className="text-sm font-bold text-brand-gold">
            Para cotizar más rápido
          </p>
          <h3 className="mt-3 font-playfair text-3xl font-bold leading-tight text-white">
            Ten lista fecha, zona, invitados y piezas de interés.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            Puedes llenar la cotización rápida o escribir directo si ya tienes
            esos datos a la mano.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#cotizar"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#075E54] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#064D45] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
            >
              <WhatsAppIcon size={18} />
              Cotizar por WhatsApp
            </Link>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border border-white/16 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
            >
              <FacebookIcon />
              Ver Facebook
            </a>
          </div>

          <p className="mt-8 text-sm leading-7 text-white/58">
            Guadalajara, Jalisco. Servicio para eventos sociales, bodas, XV años
            y empresas en zona metropolitana.
          </p>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl text-xs text-white/55">
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
