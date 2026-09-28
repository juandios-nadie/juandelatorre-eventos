import { getFacebookPageUrl } from "@/lib/facebook";
import FacebookPageEmbed from "./FacebookPageEmbed";
import SectionReveal from "./SectionReveal";

interface FacebookEventsSectionProps {
  facebookUrl?: string | null;
}

export default function FacebookEventsSection({
  facebookUrl,
}: FacebookEventsSectionProps) {
  const pageUrl = getFacebookPageUrl(facebookUrl);

  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <SectionReveal>
          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-gold-ink">
            <span className="h-2 w-2 rounded-full bg-brand-gold-ink" aria-hidden="true" />
            Actividad reciente
          </div>
          <h2 className="display-type mt-5 max-w-xl text-4xl leading-[0.98] text-brand-charcoal sm:text-6xl">
            Lo último sucede en Facebook.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-brand-charcoal/62">
            Nuevos montajes, fechas y eventos aparecen primero en nuestra página.
            Aquí puedes comprobar la actividad reciente del negocio.
          </p>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-brand-charcoal px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand-gold hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98]"
          >
            Abrir Facebook
          </a>
        </SectionReveal>

        <SectionReveal className="relative" delay={0.08}>
          <span className="pointer-events-none absolute -right-8 -top-16 hidden text-[8rem] font-extrabold leading-none tracking-[-0.08em] text-brand-warm-white lg:block" aria-hidden="true">
            LIVE
          </span>
          <div className="relative border-l border-brand-charcoal/16 pl-5 sm:pl-10">
            <FacebookPageEmbed pageUrl={pageUrl} />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
