import QuickQuoteForm from "./QuickQuoteForm";
import SectionReveal from "./SectionReveal";

const STEPS = ["Elige piezas", "Agrega los datos", "Abre WhatsApp"];

export default function QuoteGuideSection() {
  return (
    <section id="cotizar" className="bg-brand-warm-white py-24 sm:py-32">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-20">
        <SectionReveal className="lg:sticky lg:top-28">
          <p className="editorial-kicker">Cotización directa</p>
          <h2 className="display-type mt-4 max-w-2xl text-4xl leading-[0.98] text-brand-charcoal sm:text-6xl">
            De la idea al mensaje, sin empezar de cero.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-brand-charcoal/62">
            Selecciona lo que ya sabes. El mensaje se prepara aquí y se abre en
            WhatsApp con la información útil para revisar disponibilidad.
          </p>

          <ol className="mt-10 border-t border-brand-charcoal/18">
            {STEPS.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[3rem_1fr] items-center border-b border-brand-charcoal/18 py-4 text-sm font-extrabold text-brand-charcoal"
              >
                <span className="text-xs tabular-nums text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="rounded-2xl bg-brand-charcoal p-6 text-white shadow-[0_28px_80px_rgba(20,20,17,0.16)] sm:p-10">
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
        </SectionReveal>
      </div>
    </section>
  );
}
