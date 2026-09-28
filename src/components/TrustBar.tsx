const TRUST_ITEMS = [
  {
    label: "Inventario propio",
    detail: "Piezas reales para elegir y combinar.",
  },
  {
    label: "Montaje puntual",
    detail: "Entrega, instalación y recolección coordinadas.",
  },
  {
    label: "Guadalajara y Zapopan",
    detail: "Servicio local para jardines, casas y salones.",
  },
  {
    label: "Cotización directa",
    detail: "Fecha, zona e invitados por WhatsApp.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-charcoal text-white" aria-label="Garantías del servicio">
      <div className="section-shell grid border-y border-white/12 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item, index) => (
          <div
            key={item.label}
            className="relative border-b border-white/10 py-6 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <span className="mb-8 block text-xs font-bold tabular-nums text-brand-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-base font-extrabold tracking-[-0.025em] text-white">
              {item.label}
            </p>
            <p className="mt-2 max-w-[16rem] text-sm leading-6 text-white/48">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
