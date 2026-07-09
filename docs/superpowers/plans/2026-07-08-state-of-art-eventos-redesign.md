# Juan de la Torre Eventos Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** Implemented and verified on July 8, 2026.

**Goal:** Turn the current catalog MVP into a polished, trust-building sales site for a Facebook-first event-rental business in Guadalajara.

**Architecture:** Keep the existing App Router structure, Sanity fallback behavior, route slugs, and WhatsApp conversion path. Add focused presentation components and a tiny quote helper so the site sells identity, process, proof, and catalog items without becoming a large application.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, Sanity, Node test runner through `tsx`.

## Global Constraints

- Preserve `/`, `/catalogo`, `/#contacto`, current Sanity fetch functions, and current WhatsApp phone fallback.
- Keep Spanish copy natural for Guadalajara buyers.
- Keep Facebook and WhatsApp as first-class sales channels.
- Use current local images first; do not invent fake inventory or fake metrics.
- Fix `next/image` `sizes` warnings for touched responsive image components.
- Avoid decorative AI clichés: no purple gradients, no fake stats, no generic three-card feature row.
- Keep mobile first; many visitors arrive from Facebook on phones.

---

### Task 1: Quote Message Helper

**Files:**
- Create: `src/lib/quote.test.ts`
- Create: `src/lib/quote.ts`
- Modify: `package.json`
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces: `buildQuoteMessage(input: QuoteMessageInput): string`
- Produces: `buildQuoteUrl(input: QuoteMessageInput): string`
- Consumes: `WHATSAPP_NUMBER`

- [x] Write a failing test that verifies item names, event context, and phone URL encoding.
- [x] Run `./node_modules/.bin/tsx --test src/lib/quote.test.ts` and verify it fails because `src/lib/quote.ts` does not exist.
- [x] Implement the helper with conservative, plain Spanish.
- [x] Add `npm run test` script.
- [x] Update existing WhatsApp URL helpers to delegate to the quote helper.
- [x] Run the helper test and verify it passes.

### Task 2: Homepage Identity And Sales Sections

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/ServicesSection.tsx`
- Modify: `src/components/FeaturedGallery.tsx`
- Modify: `src/components/ContactSection.tsx`
- Create: `src/components/TrustBar.tsx`
- Create: `src/components/ProcessSection.tsx`
- Create: `src/components/EventTypesSection.tsx`
- Create: `src/components/QuoteGuideSection.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- `TrustBar()` renders owned-inventory/process proof points.
- `ProcessSection()` renders the quote/setup process.
- `EventTypesSection()` renders practical event categories using existing images.
- `QuoteGuideSection()` links catalog intent to WhatsApp action.

- [x] Recompose the homepage into hero, trust bar, categories, event types, process, gallery, quote guide, contact.
- [x] Use the logo mark language in copy and visual framing without needing a new file asset.
- [x] Keep the hero CTA visible on mobile and desktop.
- [x] Replace repeated centered section headings with varied layouts.
- [x] Add `sizes` to every touched `Image fill` usage.

### Task 3: Catalog Quote Flow And Product Cards

**Files:**
- Modify: `src/components/CatalogGrid.tsx`
- Modify: `src/components/ProductCard.tsx`
- Read: `src/lib/staticData.ts`

**Interfaces:**
- `ProductCard` accepts optional `selected`, `onToggle`, and `priority` props.
- `CatalogGrid` manages selected item names and builds one WhatsApp quote URL.

- [x] Add selection state to catalog items.
- [x] Add a sticky mobile/desktop quote summary when items are selected.
- [x] Keep one-click “Cotizar este artículo” for fast buyers.
- [x] Improve product image handling and card hierarchy.
- [x] Preserve category filters and current URL query behavior.

### Task 4: Performance And Configuration

**Files:**
- Modify: `next.config.ts`
- Modify: touched components using `next/image`

**Interfaces:**
- `nextConfig.turbopack.root` points at the current repo.

- [x] Set Turbopack root to remove the multiple-lockfile warning.
- [x] Add `sizes` to responsive `fill` images.
- [x] Mark likely above-fold catalog/hero images as priority or eager only where useful.

### Task 5: Verification

**Files:**
- No production edits unless verification reveals issues.

- [x] Run `npm run test`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Start `npm run dev`.
- [x] Capture browser screenshots for homepage and catalog at mobile and desktop.
- [x] Fix any build, lint, runtime, console, or obvious layout issues.
