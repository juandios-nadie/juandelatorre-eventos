import { getFacebookPageUrl } from "@/lib/facebook";
import FacebookPageEmbed from "./FacebookPageEmbed";

interface FacebookEventsSectionProps {
  facebookUrl?: string | null;
}

export default function FacebookEventsSection({
  facebookUrl,
}: FacebookEventsSectionProps) {
  const pageUrl = getFacebookPageUrl(facebookUrl);

  return (
    <section className="bg-brand-champagne/35 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_500px] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-brand-ruby">Desde Facebook</p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            Eventos recientes
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-charcoal/70">
            Lo más nuevo de montajes, fechas y eventos se publica primero en
            Facebook. Aquí aparece la actividad reciente de la página del
            negocio.
          </p>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 w-fit items-center justify-center rounded-full bg-brand-charcoal px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 focus:ring-offset-brand-champagne active:translate-y-px"
          >
            Ver Facebook
          </a>
        </div>

        <FacebookPageEmbed pageUrl={pageUrl} />
      </div>
    </section>
  );
}
