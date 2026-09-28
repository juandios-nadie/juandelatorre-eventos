import Image from "next/image";
import SectionReveal from "./SectionReveal";

const EVENT_TYPES = [
  {
    title: "Bodas y mesas principales",
    body: "Ceremonia, recepción, mesa de novios y mobiliario de madera en una composición coherente.",
    image: "/images/mesa-novios.jpg",
  },
  {
    title: "XV años y fiestas familiares",
    body: "Sillas, mesas, mantelería y toldos para recibir a cada invitado con comodidad.",
    image: "/images/setup-rojo.jpeg",
  },
  {
    title: "Eventos empresariales",
    body: "Sillas acolchonadas, estrados y pódium para presentaciones con orden.",
    image: "/images/silla-acolchonada.jpg",
  },
  {
    title: "Jardines y terrazas",
    body: "Toldos árabes, periqueras y mobiliario preparado para exterior.",
    image: "/images/hero.jpeg",
  },
];

export default function EventTypesSection() {
  const [featured, ...rest] = EVENT_TYPES;

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="section-shell">
        <SectionReveal className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h2 className="display-type max-w-3xl text-4xl leading-[0.98] text-brand-charcoal sm:text-6xl">
            Cada evento pide un montaje distinto.
          </h2>
          <p className="max-w-lg text-base leading-8 text-brand-charcoal/62 lg:justify-self-end">
            No se trata de llenar un espacio. Se trata de elegir piezas que
            funcionen para el lugar, el ritmo y la cantidad de invitados.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:gap-16">
          <SectionReveal>
            <article>
              <div className="media-surface relative aspect-[16/11] bg-brand-warm-white">
                <Image
                  src={featured.image}
                  alt={`Montaje para ${featured.title.toLowerCase()}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 grid gap-3 border-b border-brand-charcoal/18 pb-6 sm:grid-cols-[3rem_1fr]">
                <span className="text-xs font-bold tabular-nums text-brand-gold">01</span>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.035em] text-brand-charcoal">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-brand-charcoal/58">
                    {featured.body}
                  </p>
                </div>
              </div>
            </article>
          </SectionReveal>

          <div className="border-t border-brand-charcoal/18">
            {rest.map((event, index) => (
              <SectionReveal key={event.title} delay={index * 0.04}>
                <article className="grid grid-cols-[5.5rem_1fr] gap-5 border-b border-brand-charcoal/18 py-6 sm:grid-cols-[7rem_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-warm-white">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold tabular-nums text-brand-gold">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-brand-charcoal">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-brand-charcoal/58">
                      {event.body}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
