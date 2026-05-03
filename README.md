# Juan de la Torre Eventos — Sitio Web Catálogo

Sitio web de catálogo para **Juan de la Torre Eventos**, Guadalajara, Jalisco.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Sanity v3 · Vercel

---

## Puesta en marcha rápida

### 1. Crear proyecto en Sanity

```bash
npx sanity@latest init --bare
```

Sigue las instrucciones; guarda el **Project ID** que te da al final.

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-token-de-editor
```

Para el `SANITY_API_TOKEN`: ve a [sanity.io/manage](https://sanity.io/manage) → tu proyecto → API → Tokens → **Add API Token** (rol: Editor).

### 3. Sembrar contenido inicial

```bash
npx tsx scripts/seed.ts
```

Esto crea las 5 categorías base y la configuración del sitio.

### 4. Correr en desarrollo

```bash
npm run dev
```

- Sitio: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

---

## Agregar contenido en el Studio

1. Ir a `/studio` → **Configuración del Sitio** — subir foto de portada, editar tagline.
2. Ir a **Artículos de Renta** → **New** — agregar cada artículo con fotos, nombre, categoría.
3. Marcar los mejores artículos como **Destacado** para que aparezcan en la página principal.

---

## Despliegue en Vercel

```bash
# 1. Push a GitHub
git init && git add . && git commit -m "initial commit"
gh repo create juandelatorre-eventos --public --push --source .

# 2. Importar en Vercel (interfaz web)
#    vercel.com → New Project → importar el repo
#    Agregar env vars en Vercel Dashboard:
#      NEXT_PUBLIC_SANITY_PROJECT_ID
#      NEXT_PUBLIC_SANITY_DATASET
#      SANITY_API_TOKEN

# 3. Agregar dominio de producción a Sanity CORS
#    sanity.io/manage → API → CORS origins → Add origin
#    https://tu-dominio.vercel.app
```

### Dominio personalizado (opcional)

Un dominio `.com.mx` cuesta ~$5/año. Apuntarlo a Vercel en:
**Vercel Dashboard** → tu proyecto → Settings → Domains.

---

## Estructura del proyecto

```
src/
  app/
    page.tsx              ← Página principal (Hero + Servicios + Galería + Contacto)
    catalogo/page.tsx     ← Catálogo filtrable por categoría
    studio/[[...tool]]/   ← Sanity Studio embebido
  components/
    Navbar.tsx
    HeroSection.tsx
    ServicesSection.tsx
    FeaturedGallery.tsx
    CatalogGrid.tsx       ← Client component (filtros)
    ProductCard.tsx
    ContactSection.tsx
  lib/
    sanity.ts             ← Cliente Sanity + GROQ queries + tipos
sanity/
  schemas/
    category.ts
    rentalItem.ts
    siteSettings.ts
scripts/
  seed.ts                 ← Seed inicial de categorías y configuración
```

## Teléfono y WhatsApp

El número actual está hardcodeado como fallback en los componentes y en el Studio.
Para cambiarlo, actualiza el documento **Configuración del Sitio** en el Studio — todos los botones se actualizarán automáticamente.
