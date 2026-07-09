import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

const QUOTE_DETAILS = [
  "Fecha del evento",
  "Zona o colonia",
  "Cantidad aproximada de invitados",
  "Artículos que te gustaron del catálogo",
];

export default function QuoteGuideSection() {
  return (
    <section className="bg-brand-warm-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-brand-champagne bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[0.85fr_1fr] lg:p-10">
        <div>
          <p className="text-sm font-bold text-brand-ruby">
            Cotización rápida
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            Llega a WhatsApp con la información lista.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-charcoal/68">
            El catálogo ahora debe funcionar como una lista inteligente: eliges
            piezas, mandas un solo mensaje y la conversación empieza ordenada.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 rounded-[1.5rem] bg-brand-charcoal p-6 text-white sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {QUOTE_DETAILS.map((detail) => (
              <div
                key={detail}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-brand-champagne"
              >
                {detail}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-gold/88 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
            >
              Armar cotización
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px"
            >
              <WhatsAppIcon size={17} />
              WhatsApp directo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
