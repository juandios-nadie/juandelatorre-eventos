import QuickQuoteForm from "./QuickQuoteForm";

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

        <div className="rounded-[1.5rem] bg-brand-charcoal p-6 text-white sm:p-8">
          <QuickQuoteForm
            submitLabel="Enviar por WhatsApp"
            secondaryAction={{
              href: "/catalogo",
              label: "Armar cotización",
              placement: "before",
              variant: "gold",
            }}
          />
        </div>
      </div>
    </section>
  );
}
