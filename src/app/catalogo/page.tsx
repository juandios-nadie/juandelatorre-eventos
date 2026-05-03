import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CatalogGrid from "@/components/CatalogGrid";
import { getCategories, getAllItems } from "@/lib/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Catálogo de Artículos",
  description:
    "Explora nuestro catálogo de artículos para renta: sillas Versalles, Tiffany, Crossback, mesas de madera, periqueras y más. Contáctanos para cotizar.",
  openGraph: {
    title: "Catálogo | Juan de la Torre Eventos",
    description:
      "Sillas, mesas, periqueras y montajes para tu evento en Guadalajara. Cotiza por WhatsApp.",
    images: [{ url: "/images/sillas-crossback.jpeg" }],
  },
};

export default async function CatalogPage() {
  const [categories, items] = await Promise.all([
    getCategories(),
    getAllItems(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-warm-white pt-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64 text-brand-charcoal/40">
              Cargando catálogo…
            </div>
          }
        >
          <CatalogGrid categories={categories} items={items} />
        </Suspense>
      </main>
    </>
  );
}
