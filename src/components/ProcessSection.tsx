import SectionReveal from "./SectionReveal";

const PROCESS = [
  {
    title: "Fecha",
    body: "El día del evento permite revisar disponibilidad real.",
  },
  {
    title: "Zona",
    body: "La ubicación ayuda a coordinar entrega, montaje y recolección.",
  },
  {
    title: "Invitados",
    body: "La cantidad define capacidades y combinaciones posibles.",
  },
  {
    title: "Piezas",
    body: "Elige del catálogo o comparte una referencia del montaje.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-brand-charcoal py-24 text-white sm:py-32">
      <div className="section-shell">
        <SectionReveal className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="editorial-kicker">Antes de escribir</p>
            <h2 className="display-type mt-4 max-w-3xl text-4xl leading-[0.98] sm:text-6xl">
              Cuatro datos. Una cotización más clara.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-8 text-white/58 lg:justify-self-end">
            Con esta información desde el primer mensaje podemos revisar el
            servicio con menos vueltas y darte una respuesta más útil.
          </p>
        </SectionReveal>

        <div className="mt-16 grid border-t border-white/16 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item, index) => (
            <SectionReveal
              key={item.title}
              delay={index * 0.05}
              className="border-b border-white/16 py-8 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="block text-5xl font-extrabold tracking-[-0.06em] text-brand-gold sm:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-12 text-xl font-extrabold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/52">{item.body}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
