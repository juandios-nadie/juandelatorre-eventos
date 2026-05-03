import type { Category, RentalItem } from "./sanity";

// ─── Shared type ──────────────────────────────────────────────────────────────

/** RentalItem extended with a local image path for use when Sanity has no data. */
export type StaticItem = RentalItem & { localImage: string; localImages?: string[] };

// ─── Canonical categories ─────────────────────────────────────────────────────

export const STATIC_CATEGORIES: Category[] = [
  { _id: "static-sillas",      name: "Sillas",       slug: "sillas" },
  { _id: "static-mesas",       name: "Mesas",        slug: "mesas" },
  { _id: "static-cristaleria", name: "Cristalería y Cubertería",  slug: "cristaleria" },
  { _id: "static-periqueras",  name: "Periqueras",   slug: "periqueras" },
  { _id: "static-toldos",      name: "Toldos Árabes", slug: "toldos" },
  { _id: "static-escenarios",  name: "Escenarios",   slug: "escenarios" },
  { _id: "static-kits",        name: "Kits",         slug: "kits" },
];

// ─── Category slug → representative image ────────────────────────────────────

export const CATEGORY_IMAGES: Record<string, string> = {
  sillas:      "/images/sillas-versalles.jpeg",
  mesas:       "/images/mesas-rusticas.jpeg",
  cristaleria: "/images/setup-rojo.jpeg",
  periqueras:  "/images/hero.jpeg",
  toldos:      "/images/toldos.jpg",
  escenarios:  "/images/setup-fiesta.jpeg",
  kits:        "/images/mesas-rusticas.jpeg",
  default:     "/images/setup-rojo.jpeg",
};

export function getCategoryImage(slug: string): string {
  return CATEGORY_IMAGES[slug.toLowerCase()] ?? CATEGORY_IMAGES.default;
}

// ─── Static photo gallery (fallback for FeaturedGallery) ─────────────────────

export const STATIC_PHOTOS = [
  { src: "/images/sillas-versalles.jpeg", label: "Sillas Versalles" },
  { src: "/images/sillas-crossback.jpeg", label: "Sillas Crossback" },
  { src: "/images/sillas-tiffany.jpeg",   label: "Sillas Tiffany" },
  { src: "/images/mesas-rusticas.jpeg",   label: "Mesa de Madera" },
  { src: "/images/toldos.jpg",            label: "Toldos Árabes" },
  { src: "/images/hero.jpeg",             label: "Periqueras" },
];

// ─── Full catalog items ───────────────────────────────────────────────────────

export const STATIC_ITEMS: StaticItem[] = [

  // ── SILLAS ──────────────────────────────────────────────────────────────────
  {
    _id: "silla-infantil",
    name: "Silla Infantil",
    description: "Silla pequeña especial para niños. Cómoda y resistente, ideal para eventos familiares y celebraciones con los más chicos.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/silla-infantil.jpg",
  },
  {
    _id: "silla-acolchonada",
    name: "Silla Acolchonada",
    description: "Silla plegable con asiento y respaldo acolchonado en negro, estructura de aluminio. Ideal para auditorios, graduaciones y eventos corporativos.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/silla-acolchonada.jpg",
  },
  {
    _id: "silla-blanca",
    name: "Silla Blanca",
    description: "Silla blanca disponible en estilo Tiffany (sin cojín) y Versalles (con cojín). Ligera y elegante para todo tipo de evento.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/sillas-tiffany.jpeg",
  },
  {
    _id: "silla-chocolate",
    name: "Silla Chocolate",
    description: "Silla chocolate disponible en estilo Tiffany (sin cojín) y Versalles (con cojín). Elegante y resistente para cualquier ocasión.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/sillas-versalles.jpeg",
  },
  {
    _id: "silla-crossback",
    name: "Silla Crossback Madera Nogal",
    description: "Silla de madera nogal tipo crossback con cojín blanco. Estilo rústico-moderno, perfecta para bodas y eventos campestres.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/sillas-crossback.jpeg",
  },
  {
    _id: "silla-luisxv",
    name: "Silla Luis XV",
    description: "Silla Luis XV de lujo, el toque premium para mesas principales, ceremonias y eventos especiales.",
    category: { name: "Sillas", slug: "sillas" },
    localImage: "/images/silla-luisxv.jpg",
  },

  // ── MESAS ───────────────────────────────────────────────────────────────────
  {
    _id: "mesa-infantil",
    name: "Mesa Infantil",
    description: "Mesa infantil con mantel incluido. Perfecta para la zona de niños en cualquier evento.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-infantil.jpg",
  },
  {
    _id: "mesa-redonda",
    name: "Mesa Redonda",
    description: "Mesa redonda con mantel y cubre mantel incluidos. Ideal para eventos familiares, bodas y celebraciones.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-redonda.jpg",
  },
  {
    _id: "mesa-cuadrada",
    name: "Mesa Cuadrada",
    description: "Mesa cuadrada con mantel y cubre mantel incluidos. Perfecta para salones y eventos formales.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-cuadrada.jpg",
  },
  {
    _id: "mesa-rectangular",
    name: "Mesa Rectangular",
    description: "Mesa rectangular con mantel y cubre mantel incluidos. Versátil para cualquier tipo de evento.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-rectangular.jpg",
  },
  {
    _id: "mesa-madera-10",
    name: "Mesa de Madera Nogal (10 personas)",
    description: "Mesa de madera nogal oscura para 10 personas. Perfecta para bodas y eventos campestres.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-madera-nogal-10.jpg",
  },
  {
    _id: "mesa-madera-12",
    name: "Mesa de Madera Nogal (12 personas)",
    description: "Mesa de madera nogal oscura para 12 personas. Ideal para eventos grandes en jardín o bajo carpa.",
    category: { name: "Mesas", slug: "mesas" },
    localImage: "/images/mesa-madera-nogal-12.jpg",
  },

  // ── CRISTALERÍA ─────────────────────────────────────────────────────────────
  {
    _id: "cristaleria-cuberteria",
    name: "Cristalería y Cubertería",
    description: "Contamos con todo lo necesario para el montaje de tu mesa: copas de cristal, vasos tubo, platos trinche y de postre de porcelana, platos base (plata y blanco), tazas de café con platito, cubiertos de acero inoxidable (cuchillo, tenedor, cuchara) y servilletas de tela. Pregunta por disponibilidad y precios por pieza.",
    category: { name: "Cristalería y Cubertería", slug: "cristaleria" },
    localImage: "/images/cristaleria-cuberteria.jpg",
    localImages: ["/images/cristaleria-cuberteria.jpg", "/images/cristaleria-copas.jpg"],
  },

  // ── PERIQUERAS ──────────────────────────────────────────────────────────────
  {
    _id: "periquera-cristal",
    name: "Mesa Periquera de Cristal",
    description: "Mesa periquera con tapa de cristal para 4 personas, incluye bancos Tolix plateados. Ideal para cócteles y recepciones al aire libre.",
    category: { name: "Periqueras", slug: "periqueras" },
    localImage: "/images/periquera-cristal.jpg",
  },
  {
    _id: "periquera-madera",
    name: "Mesa Periquera de Madera",
    description: "Mesa periquera con tapa de madera para 4 personas, incluye bancos Tolix negros. Ideal para cócteles y recepciones al aire libre.",
    category: { name: "Periqueras", slug: "periqueras" },
    localImage: "/images/periquera-madera.jpg",
  },

  // ── TOLDOS ÁRABES ───────────────────────────────────────────────────────────
  {
    _id: "toldo-3x6",
    name: "Toldo Árabe 3m × 6m",
    description: "Toldo árabe para hasta 20 personas. Incluye cielo, cubre postes y luz. Cortinas laterales disponibles por separado.",
    category: { name: "Toldos Árabes", slug: "toldos" },
    localImage: "/images/toldo-3x6.jpg",
  },
  {
    _id: "toldo-6x6",
    name: "Toldo Árabe 6m × 6m",
    description: "Toldo árabe para hasta 40 personas. Incluye cielo, cubre postes y luz. Cortinas laterales disponibles por separado.",
    category: { name: "Toldos Árabes", slug: "toldos" },
    localImage: "/images/toldo-6x6.jpg",
  },
  {
    _id: "toldo-cortina",
    name: "Cortina Lateral para Toldo",
    description: "Cortina lateral de 6m (por tramo) para toldos árabes. Protege del viento y da mayor privacidad al evento.",
    category: { name: "Toldos Árabes", slug: "toldos" },
    localImage: "/images/cortina-lateral-toldo.jpg",
  },

  // ── ESCENARIOS ──────────────────────────────────────────────────────────────
  {
    _id: "estrado",
    name: "Estrado",
    description: "Estrado (tarima) de madera de 60 cm de altura disponible en diferentes medidas: 1.25 × 3.75 m, 3.75 × 3.75 m y 3.75 × 6.25 m. Incluye faldón en negro, azul o blanco, y escalera de madera.",
    category: { name: "Escenarios", slug: "escenarios" },
    localImage: "/images/estrado.jpg",
  },
  {
    _id: "podium",
    name: "Pódium de Madera",
    description: "Pódium de madera para presentaciones, ceremonias y eventos formales.",
    category: { name: "Escenarios", slug: "escenarios" },
    localImage: "/images/podium-madera.jpg",
  },
  {
    _id: "soporte-porteria",
    name: "Soporte Portería",
    description: "Soporte portería ajustable hasta 2m × 6m. Para colgar luces, lonas, telas y decoraciones aéreas.",
    category: { name: "Escenarios", slug: "escenarios" },
    localImage: "/images/soporte-porteria.jpg",
  },

  {
    _id: "calentador-gas",
    name: "Calentador de Gas",
    description: "Calentador de gas tipo hongo para exteriores. Ideal para eventos nocturnos o en temporada fría. Mantiene el ambiente cálido y confortable.",
    category: { name: "Escenarios", slug: "escenarios" },
    localImage: "/images/calentador-gas.jpg",
  },

  // ── KITS ────────────────────────────────────────────────────────────────────
  {
    _id: "kit-mesa-principal",
    name: "Mesa de Novios",
    description: "Mesa de madera nogal con base metálica dorada + sillas Luis XV. El montaje perfecto para la mesa de honor en tu evento.",
    category: { name: "Kits", slug: "kits" },
    localImage: "/images/mesa-novios.jpg",
  },
  {
    _id: "mesa-vestida",
    name: "Mesa Vestida",
    description: "Montaje completo de mesa con mantel, plato base, platos de porcelana, copas, vasos, cubiertos y servilleta de tela. Todo coordinado para darle el toque elegante que tu evento merece.",
    category: { name: "Kits", slug: "kits" },
    localImage: "/images/mesa-vestida.jpg",
  },
];
