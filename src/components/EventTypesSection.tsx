import Image from "next/image";

const EVENT_TYPES = [
  {
    title: "Bodas y mesas principales",
    body: "Montajes para ceremonia, recepción, mesa de novios y mobiliario de madera.",
    image: "/images/mesa-novios.jpg",
  },
  {
    title: "XV años y fiestas familiares",
    body: "Sillas, mesas, mantelería y toldos para recibir invitados con comodidad.",
    image: "/images/setup-rojo.jpeg",
  },
  {
    title: "Eventos empresariales",
    body: "Sillas acolchonadas, estrados, pódium y acomodo para presentaciones.",
    image: "/images/silla-acolchonada.jpg",
  },
  {
    title: "Jardines y terrazas",
    body: "Toldos árabes, periqueras y mobiliario resistente para exterior.",
    image: "/images/hero.jpeg",
  },
];

export default function EventTypesSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-brand-ruby">
            Para eventos reales, no solo fotos bonitas
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            El mobiliario tiene que verse bien y llegar completo.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-charcoal/68">
            Decide rápido qué tipo de montaje necesitas, qué estilo queda mejor
            y qué datos conviene mandar para cotizar sin vueltas.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {EVENT_TYPES.map((event, index) => (
            <article
              key={event.title}
              className={`group grid overflow-hidden rounded-[1.75rem] border border-brand-champagne bg-brand-warm-white shadow-sm md:grid-cols-2 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative min-h-64 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, 25vw"
                  }
                  className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-playfair text-2xl font-bold text-brand-charcoal">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-charcoal/68">
                  {event.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
