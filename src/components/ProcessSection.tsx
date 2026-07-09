const PROCESS = [
  {
    title: "Manda fecha, zona y cantidad",
    body: "Con esos tres datos se puede revisar disponibilidad y evitar idas y vueltas.",
  },
  {
    title: "Elige piezas o comparte una idea",
    body: "Puedes llegar con artículos del catálogo o pedir orientación para armar el montaje.",
  },
  {
    title: "Se confirma disponibilidad",
    body: "La cotización se cierra por WhatsApp con lo necesario para apartar el servicio.",
  },
  {
    title: "Entrega, montaje y recolección",
    body: "El objetivo es que el evento se vea listo sin que tengas que perseguir detalles.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-brand-charcoal px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-bold text-brand-gold">
              Cómo se cotiza mejor
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight sm:text-5xl">
              Menos mensajes sueltos, más claridad desde el inicio.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65">
              Cuando el primer mensaje trae artículos, fecha, invitados y zona,
              la disponibilidad se revisa más rápido.
            </p>
          </div>

          <div className="grid gap-4">
            {PROCESS.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6"
              >
                <h3 className="font-playfair text-2xl font-bold text-brand-champagne">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
