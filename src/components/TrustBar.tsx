const TRUST_ITEMS = [
  {
    value: "3.8k+",
    label: "seguidores en Facebook",
    detail: "La conversación comercial ya vive ahí.",
  },
  {
    value: "Directo",
    label: "por WhatsApp",
    detail: "Sin formularios largos ni intermediarios.",
  },
  {
    value: "GDL",
    label: "y zona metropolitana",
    detail: "Servicio local para casas, jardines y salones.",
  },
  {
    value: "Propio",
    label: "inventario de renta",
    detail: "Sillas, mesas, toldos, cristalería y escenarios.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-charcoal px-4 pb-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="border-b border-white/10 p-5 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <p className="font-playfair text-3xl font-bold text-brand-gold">
              {item.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
