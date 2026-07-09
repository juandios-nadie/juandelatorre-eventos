import QuickQuoteForm from "./QuickQuoteForm";

export default function QuoteGuideSection() {
  return (
    <section
      id="cotizar"
      className="bg-brand-warm-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-brand-ruby">
            Cotización rápida
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            Acelera tu cotización antes de escribir.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-charcoal/68">
            Mándanos fecha, zona, invitados y piezas de interés. El mensaje se
            arma aquí y llega a WhatsApp con lo necesario para revisar
            disponibilidad.
          </p>
          <div className="mt-7 grid gap-3 text-sm font-semibold text-brand-charcoal/76 sm:grid-cols-3 lg:max-w-xl">
            <span className="rounded-2xl border border-brand-champagne bg-white px-4 py-3">
              1. Elige piezas
            </span>
            <span className="rounded-2xl border border-brand-champagne bg-white px-4 py-3">
              2. Agrega datos
            </span>
            <span className="rounded-2xl border border-brand-champagne bg-white px-4 py-3">
              3. Envía por WhatsApp
            </span>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-brand-charcoal p-6 text-white sm:p-8">
          <QuickQuoteForm
            submitLabel="Enviar datos por WhatsApp"
            secondaryAction={{
              href: "/catalogo",
              label: "Ver catálogo",
              placement: "after",
              variant: "ghost",
            }}
          />
        </div>
      </div>
    </section>
  );
}
