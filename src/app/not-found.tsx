import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-warm-white flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <p className="text-brand-gold text-xs tracking-[0.45em] uppercase mb-4 font-light">
            Página no encontrada
          </p>
          <h1 className="font-playfair text-brand-charcoal text-7xl font-bold mb-2">
            404
          </h1>
          <div className="h-px bg-brand-gold/40 max-w-[60px] mx-auto my-5" />
          <p className="text-brand-charcoal/60 text-base font-light mb-8 leading-relaxed">
            Esta página no existe, pero nuestro catálogo sí. Encuentra las sillas, mesas y escenarios perfectos para tu evento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-brand-gold hover:bg-brand-gold/85 text-white font-medium px-7 py-3 rounded-full transition-all text-sm tracking-wide"
            >
              Ir al inicio
            </Link>
            <Link
              href="/catalogo"
              className="border border-brand-ruby text-brand-ruby hover:bg-brand-ruby hover:text-white font-medium px-7 py-3 rounded-full transition-all text-sm tracking-wide"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
