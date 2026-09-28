# Editorial Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the home page and catalog into a state-of-the-art editorial cinematic experience while preserving real content, Sanity fallbacks, SEO, filters, selection, and WhatsApp conversion, then deploy and verify the same artifact on the canonical production domain.

**Architecture:** Keep App Router pages and data access as Server Components. Add one small client-side motion runtime that integrates Lenis with GSAP ScrollTrigger and focused client leaves for animated sections; all semantic content renders in its final usable state before animation. Recompose existing presentation components without changing public routes or business-data contracts.

**Tech Stack:** Next.js 16.2.4 App Router, React 19.2.4, TypeScript, Tailwind CSS v4, Sanity 5, GSAP, Lenis, Node test runner through `tsx`, Playwright, Vercel.

## Global Constraints

- Preserve `/`, `/catalogo`, `/studio`, `/#contacto`, `/#cotizar`, query parameter `categoria`, Sanity queries, static fallbacks, and WhatsApp phone/message behavior.
- Use real inventory and event photography only; never generate or imply inventory that the business does not own.
- Keep one page theme: deep charcoal, mineral white, and the existing gold as the only decorative accent.
- Replace Playfair as the dominant voice with one variable sans family loaded through `next/font`.
- Use one shape system: medium-radius media and surfaces; pill radius only for interactive controls.
- Use GSAP as the primary animation system and Lenis as the only smooth-scroll engine.
- Do not add Three.js, custom cursors, hand-drawn SVG icons, fake testimonials, invented metrics, decorative image labels, em dashes, or multiple marquees.
- Render all primary content and actions in a complete first frame without JavaScript or animation.
- Honor `prefers-reduced-motion: reduce` by disabling smooth scrolling and rendering final animation states immediately.
- Keep the hero headline within two desktop lines, supporting copy within 20 words, and primary CTA visible in the initial viewport.
- Maintain visible keyboard focus, 44 px minimum touch targets, WCAG AA contrast, semantic heading order, and purposeful alt text.
- Target LCP under 2.5 s, INP under 200 ms, and CLS under 0.1; treat Lighthouse as simulated evidence, not field data.
- Read the relevant guides under `node_modules/next/dist/docs/` before writing Next.js code and follow their version-specific guidance.

---

## File Responsibility Map

- `src/app/layout.tsx`: optimized font, global motion runtime, analytics, floating CTA.
- `src/app/globals.css`: semantic color tokens, typography, focus, reduced-motion, and layout primitives.
- `src/app/page.tsx`: server-rendered home composition and existing parallel data fetch.
- `src/app/catalogo/page.tsx`: server-rendered catalog route shell, metadata, and Suspense fallback.
- `src/components/SmoothScroll.tsx`: sole Lenis/GSAP integration and lifecycle cleanup.
- `src/components/SectionReveal.tsx`: accessible, reusable GSAP reveal leaf.
- `src/components/Navbar.tsx`: responsive navigation with consistent shell and menu behavior.
- `src/components/HeroSection.tsx`: cinematic first viewport with real imagery and minimal copy stack.
- `src/components/TrustBar.tsx`: factual operational proof immediately below the hero.
- `src/components/ServicesSection.tsx`: asymmetric catalog-family editorial grid.
- `src/components/EventTypesSection.tsx`: varied editorial collage for event use cases.
- `src/components/ProcessSection.tsx`: scroll narrative for the four quotation stages.
- `src/components/FeaturedGallery.tsx`: magazine-like montage of real inventory/event imagery.
- `src/components/FacebookEventsSection.tsx`: visually integrated recent-activity proof and fallback.
- `src/components/QuoteGuideSection.tsx`: home quotation section shell.
- `src/components/QuickQuoteForm.tsx`: accessible interactive quote form and prepared message.
- `src/components/ContactSection.tsx`: final conversion moment and compact footer.
- `src/components/FloatingWhatsApp.tsx`: non-obstructive persistent mobile/desktop CTA.
- `src/components/CatalogGrid.tsx`: catalog hero, filters, sections, selected-item tray, empty state.
- `src/components/ProductCard.tsx`: real product media, selection feedback, and quote actions.
- `src/lib/motion.ts`: motion constants and pure reduced-motion-safe configuration helpers.
- `src/lib/motion.test.ts`: unit coverage for motion configuration and duration fallbacks.
- `tests/site.spec.ts`: route, accessibility-smoke, conversion, and reduced-motion browser coverage.
- `playwright.config.ts`: local test server and desktop/mobile browser projects.

---

### Task 1: Motion and visual foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/lib/motion.ts`
- Create: `src/lib/motion.test.ts`
- Create: `src/components/SmoothScroll.tsx`
- Create: `src/components/SectionReveal.tsx`

**Interfaces:**
- Produces: `MOTION_EASE`, `getMotionDuration(reduceMotion: boolean, duration?: number): number`
- Produces: `SmoothScroll({ children }: { children: React.ReactNode })`
- Produces: `SectionReveal({ children, className?, delay?, y? }: SectionRevealProps)`
- Consumes: `window.matchMedia('(prefers-reduced-motion: reduce)')`

- [ ] **Step 1: Add the failing unit test for reduced-motion configuration**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getMotionDuration, MOTION_EASE } from "./motion";

test("reduced motion resolves every animation duration to zero", () => {
  assert.equal(getMotionDuration(true, 0.8), 0);
});

test("standard motion keeps the requested duration and shared ease", () => {
  assert.equal(getMotionDuration(false, 0.8), 0.8);
  assert.deepEqual(MOTION_EASE, [0.22, 1, 0.36, 1]);
});
```

- [ ] **Step 2: Run the focused test and verify the missing-module failure**

Run: `npx tsx --test src/lib/motion.test.ts`

Expected: FAIL because `src/lib/motion.ts` does not exist.

- [ ] **Step 3: Install the approved motion dependencies**

Run: `npm install gsap lenis`

Expected: `package.json` and `package-lock.json` contain exactly one smooth-scroll engine (`lenis`) and the primary animation system (`gsap`).

- [ ] **Step 4: Implement the pure motion contract**

```ts
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export function getMotionDuration(
  reduceMotion: boolean,
  duration = 0.72
): number {
  return reduceMotion ? 0 : duration;
}
```

- [ ] **Step 5: Implement the runtime with strict cleanup**

`SmoothScroll.tsx` must register ScrollTrigger once, skip Lenis when reduced motion is active, connect `lenis.on('scroll', ScrollTrigger.update)`, drive Lenis through `gsap.ticker`, set `gsap.ticker.lagSmoothing(0)`, and clean up the ticker callback, media listener, Lenis instance, and every local trigger.

`SectionReveal.tsx` must keep semantic children intact, use `gsap.context`, animate only `opacity` and `transform`, start at `top 86%`, render final states under reduced motion, and call `context.revert()` on cleanup.

- [ ] **Step 6: Replace global tokens and dominant font**

Use `Manrope` alone through `next/font/google`; remove `Playfair_Display`. Define semantic tokens for `--surface`, `--surface-raised`, `--ink`, `--muted`, `--line`, and `--accent` while keeping compatibility aliases used by untouched components. Add consistent focus, selection, reduced-motion, reduced-transparency, and text-wrap rules. Wrap page content with `SmoothScroll` without moving analytics or the floating WhatsApp control into a large client boundary.

- [ ] **Step 7: Verify the foundation**

Run: `npx tsx --test src/lib/motion.test.ts`

Expected: 2 tests pass.

Run: `npm run lint`

Expected: exit 0 with no ESLint errors.

- [ ] **Step 8: Commit the foundation**

```bash
git add package.json package-lock.json src/app/layout.tsx src/app/globals.css src/lib/motion.ts src/lib/motion.test.ts src/components/SmoothScroll.tsx src/components/SectionReveal.tsx
git commit -m "feat: add editorial motion foundation"
```

---

### Task 2: Navigation, hero, and factual proof

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/TrustBar.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SiteSettings`, `urlFor`, `SectionReveal`, existing `quoteHref` and `quoteLabel` props.
- Produces: stable `#contenido` destination and visible `/#cotizar` and `/catalogo` actions.

- [ ] **Step 1: Capture the current hero and navigation baseline**

Run the development server and save desktop and mobile screenshots before changes. Record whether the hero CTA is visible without scrolling and whether navigation fits one line at 1024 px.

- [ ] **Step 2: Recompose the navigation**

Keep `NAV_LINKS`, external/internal quote handling, `aria-expanded`, and `aria-controls`. Use a 64-72 px contained shell, a text-forward wordmark, one-line desktop navigation, and a full-width mobile sheet with 44 px touch targets. Replace hand-authored menu SVGs with CSS bars or one installed icon family only if an icon dependency is already present.

- [ ] **Step 3: Recompose the hero**

Render exactly four content groups: brand/location line, headline, supporting sentence, and CTA group. Use the current real hero image with `priority`, `sizes="100vw"`, focal positioning, and a static scrim. Remove chips and the secondary proof panel. Keep `Cotizar por WhatsApp` and `Ver catálogo` visible in the first viewport on 390x844 and 1440x900.

- [ ] **Step 4: Rebuild the factual proof strip**

Use only the supported statements `Inventario propio`, `Montaje puntual`, `Guadalajara y Zapopan`, and `Cotización directa`. Present them as an editorial rail using spacing and dividers, not four cards and not invented percentages.

- [ ] **Step 5: Verify shell semantics and responsiveness**

Run: `npm run lint`

Expected: exit 0.

Browser checks: keyboard can reach skip link, logo, all nav links, menu button, both hero CTAs; mobile menu opens, closes, and does not trap focus unexpectedly; reduced motion shows complete hero content.

- [ ] **Step 6: Commit the top-of-funnel redesign**

```bash
git add src/app/page.tsx src/components/Navbar.tsx src/components/HeroSection.tsx src/components/TrustBar.tsx
git commit -m "feat: redesign cinematic top of funnel"
```

---

### Task 3: Editorial home-page narrative

**Files:**
- Modify: `src/components/ServicesSection.tsx`
- Modify: `src/components/EventTypesSection.tsx`
- Modify: `src/components/ProcessSection.tsx`
- Modify: `src/components/FeaturedGallery.tsx`
- Modify: `src/components/FacebookEventsSection.tsx`

**Interfaces:**
- Consumes: existing `Category[]`, `RentalItem[]`, `STATIC_CATEGORIES`, `STATIC_PHOTOS`, `getCategoryImage`, `urlFor`, `getFacebookPageUrl`.
- Produces: the same filtered catalog links and Facebook destination URL.

- [ ] **Step 1: Build the asymmetric catalog-family composition**

Keep every current category and `?categoria=<slug>` URL. Use one dominant family image, supporting portrait/landscape ratios, concise captions below or within dedicated text areas, and explicit single-column mobile collapse. Do not repeat one card style for every category.

- [ ] **Step 2: Build the event-use-case collage**

Keep the four current event types and their real images. Use one full-width photographic moment plus three smaller editorial modules with varied composition. Remove repeated eyebrow/header patterns and keep each description below 25 words.

- [ ] **Step 3: Build the scroll narrative for the quotation process**

Keep all four factual stages. Implement a sticky text column and sequential stage rail on desktop, normal document flow under 768 px, and final static states under reduced motion. Each ScrollTrigger must be created inside a GSAP context and reverted during cleanup.

- [ ] **Step 4: Build the magazine montage**

Keep up to six real Sanity or static images, existing labels, `next/image`, alt text, and correct `sizes`. Use a dominant image plus varied supporting ratios. Captions remain outside image overlays unless contrast and purpose require otherwise.

- [ ] **Step 5: Integrate Facebook proof**

Preserve the embed and current collapsed-embed fallback behavior. Give the section a single visual identity with the rest of the page and retain the direct Facebook link as the reliable action.

- [ ] **Step 6: Verify the narrative sections**

Run: `npm run test`

Expected: all catalog, Facebook, embed, and quote tests pass.

Run: `npm run lint`

Expected: exit 0.

Browser checks: no horizontal overflow at 390 px; links reach the expected filtered catalog; every image has meaningful alt text; scrolling remains usable with motion enabled and disabled.

- [ ] **Step 7: Commit the home narrative**

```bash
git add src/components/ServicesSection.tsx src/components/EventTypesSection.tsx src/components/ProcessSection.tsx src/components/FeaturedGallery.tsx src/components/FacebookEventsSection.tsx
git commit -m "feat: compose editorial event narrative"
```

---

### Task 4: Quote and contact conversion surfaces

**Files:**
- Modify: `src/components/QuoteGuideSection.tsx`
- Modify: `src/components/QuickQuoteForm.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/components/FloatingWhatsApp.tsx`

**Interfaces:**
- Consumes: `buildQuoteUrl`, `DEFAULT_PHONE`, `FACEBOOK_URL`, `getFacebookPageUrl`, `SiteSettings`.
- Produces: unchanged WhatsApp message fields `eventType`, `items`, `eventDate`, `location`, `guestCount`, and `notes`.

- [ ] **Step 1: Preserve the quote-message regression contract**

Run: `npx tsx --test src/lib/quote.test.ts`

Expected: all quote helper tests pass before visual edits.

- [ ] **Step 2: Recompose the quick quote section**

Keep field labels, order, checkboxes, message preview, generated link, and `id="cotizar"`. Present the form as a clean editorial worksheet with labels above controls, AA placeholder contrast, selected/focus/error states, and a prepared-message panel that remains readable on mobile.

- [ ] **Step 3: Recompose contact and persistent WhatsApp actions**

Keep the telephone, Facebook URL, Guadalajara service statement, and CTA targets. Ensure the fixed WhatsApp action does not cover the catalog selection bar or mobile form submit action; use safe-area insets and one stable layer token.

- [ ] **Step 4: Verify quote behavior after visual edits**

Run: `npm run test`

Expected: all existing tests pass.

Browser checks: select an event type and at least two item types, enter date/location/guest count, and confirm the WhatsApp URL contains each value exactly once; do not send the message.

- [ ] **Step 5: Commit the conversion redesign**

```bash
git add src/components/QuoteGuideSection.tsx src/components/QuickQuoteForm.tsx src/components/ContactSection.tsx src/components/FloatingWhatsApp.tsx
git commit -m "feat: refine quote conversion experience"
```

---

### Task 5: Catalog showroom redesign

**Files:**
- Modify: `src/app/catalogo/page.tsx`
- Modify: `src/components/CatalogGrid.tsx`
- Modify: `src/components/ProductCard.tsx`

**Interfaces:**
- Consumes: existing `CatalogGridProps`, `ProductCardProps`, `buildCatalogSections`, `getCatalogStats`, `buildQuoteUrl`, URL search param `categoria`.
- Produces: unchanged category selection, multi-item selection, individual quote, quote tray, mobile quote bar, and empty-state reset.

- [ ] **Step 1: Record catalog behavior before edits**

Run: `npx tsx --test src/lib/catalog.test.ts src/lib/quote.test.ts`

Expected: all focused tests pass.

Browser baseline: open `/catalogo?categoria=periqueras`, confirm only that category appears, select both items, and record the selected count and generated quote URL.

- [ ] **Step 2: Recompose the catalog route shell and loading fallback**

Use a compact editorial hero, a skeleton matching final geometry, and the global theme. Preserve metadata and Suspense. Do not add fake inventory totals beyond `getCatalogStats` output.

- [ ] **Step 3: Redesign filters and section headers**

Keep URL-derived initial state and `aria-pressed`. Make filters a compact sticky rail with visible selected state and mobile overflow affordance that does not rely on the word `Desliza`. Remove uppercase eyebrow repetition and split-header filler.

- [ ] **Step 4: Redesign product media and actions**

Keep image arrays, carousel behavior, Sanity URLs, local fallbacks, selection, priority logic, and per-item quote URL. Use consistent media ratios, captions outside decorative overlays, explicit selected feedback, and action hierarchy: `Agregar a cotización` primary, individual WhatsApp quote secondary.

- [ ] **Step 5: Redesign quote tray and mobile selection bar**

Keep every selected item removable, quote details editable, clear action available, and generated URL live. Ensure the desktop tray sticks without overlapping the navbar and the mobile bar leaves room for the floating WhatsApp control.

- [ ] **Step 6: Verify every catalog state**

Run: `npm run test`

Expected: all tests pass.

Browser checks: all categories, single category URL, unknown category empty state, single-item quote, multi-item quote, image carousel, clear selection, mobile sticky bar, keyboard filters, and no horizontal page overflow.

- [ ] **Step 7: Commit the catalog redesign**

```bash
git add src/app/catalogo/page.tsx src/components/CatalogGrid.tsx src/components/ProductCard.tsx
git commit -m "feat: redesign catalog showroom"
```

---

### Task 6: Automated browser coverage and full local verification

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/site.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: production files only when verification reveals a concrete defect.

**Interfaces:**
- Produces: `npm run test:e2e`
- Consumes: production routes `/` and `/catalogo`, accessible role/name queries, reduced-motion emulation.

- [ ] **Step 1: Add the failing browser tests**

Create tests that assert:

```ts
test("home exposes primary conversion and catalog navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Cotizar por WhatsApp" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver catálogo" }).first()).toBeVisible();
});

test("catalog preserves filtered selection and quote", async ({ page }) => {
  await page.goto("/catalogo?categoria=periqueras");
  await expect(page.getByRole("heading", { name: "Periqueras" })).toBeVisible();
  await page.getByRole("checkbox", { name: /Agregar Mesa Periquera de Cristal/ }).check();
  await expect(page.getByText(/1 artículo seleccionado/)).toBeAttached();
});

test("reduced motion renders complete content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main")).not.toHaveCSS("opacity", "0");
});
```

- [ ] **Step 2: Configure desktop and mobile projects**

Use `webServer.command = "npm run dev"`, `baseURL = "http://127.0.0.1:3000"`, Chromium desktop at 1440x900, and a mobile project at 390x844. Set retries to zero locally and collect screenshots only on failure.

- [ ] **Step 3: Add and run the browser-test script**

Add `"test:e2e": "playwright test"`.

Run: `npm run test:e2e`

Expected: all tests pass in desktop and mobile projects.

- [ ] **Step 4: Run the complete local gate**

Run: `npm run test`

Expected: all unit tests pass with zero failures.

Run: `npm run lint`

Expected: exit 0 with no errors.

Run: `npm run build`

Expected: Next.js production build exits 0 and both `/` and `/catalogo` are generated successfully.

- [ ] **Step 5: Perform the manual quality matrix**

Verify desktop and mobile screenshots for home and catalog; keyboard navigation; visible focus; menu open/close; reduced motion; JavaScript-disabled first frame; Facebook fallback; quote fields; individual and multi-item WhatsApp URLs; console errors; image aspect ratios; no unsupported claims; no visible em/en dashes; no repeated section layouts; one accent; one radius system; and no content obscured by fixed controls.

- [ ] **Step 6: Run Lighthouse against the production build**

Start `npm run start` and run Lighthouse for `/` and `/catalogo` in mobile mode. Record Performance, Accessibility, Best Practices, SEO, LCP, CLS, and TBT/INP proxy. Fix material regressions caused by this redesign before proceeding.

- [ ] **Step 7: Commit the verification harness and fixes**

```bash
git add package.json package-lock.json playwright.config.ts tests/site.spec.ts src
git commit -m "test: verify editorial redesign journeys"
```

---

### Task 7: Preview, production deploy, and canonical-domain verification

**Files:**
- No source changes unless deployment exposes a concrete configuration defect.
- Inspect: `.vercel/project.json`, deployment metadata, Git status, and production aliases.

**Interfaces:**
- Produces: one READY preview artifact and the same verified artifact on the production domain.
- Consumes: existing Vercel project/team authentication and canonical domain `https://juandelatorreeventos.com`.

- [ ] **Step 1: Confirm release state**

Run: `git status --short --branch`

Expected: clean worktree on the intended branch, ahead of `origin/main` only by the redesign commits.

Run: `git log --oneline --decorate -8`

Expected: design, implementation, and verification commits are present in order.

- [ ] **Step 2: Resolve the Vercel project safely**

Inspect existing `.vercel/project.json`, authenticated CLI scope, GitHub deployment metadata, and domain assignment. Do not create a duplicate project when the current site already has a project.

- [ ] **Step 3: Create a preview artifact**

Run the existing project workflow or `vercel deploy --yes` after linking to the verified project.

Expected: deployment status `READY` and a unique preview URL.

- [ ] **Step 4: Verify the preview artifact**

Run the same browser journeys against the preview URL: home, catalog filters, individual quote link, multi-select quote tray, quick quote, Facebook fallback, mobile viewport, reduced motion, and browser console.

- [ ] **Step 5: Promote the verified artifact**

Use `vercel promote <preview-url>` when supported so production serves the exact tested artifact. Otherwise use the repository's established production deployment workflow and verify the resulting deployment SHA matches the tested source.

- [ ] **Step 6: Verify canonical production**

Check `https://juandelatorreeventos.com/` and `https://juandelatorreeventos.com/catalogo` with cache-busting requests and browser automation. Confirm HTTP success, new visual markers, working navigation, filters, WhatsApp URLs, no console errors, and production alias ownership.

- [ ] **Step 7: Inspect post-deploy errors**

Run `vercel logs <production-deployment-url>` with an appropriate recent window or inspect the provider's runtime logs. Report any monitoring gap separately; absence of configured drains is not proof of zero errors.

- [ ] **Step 8: Push the verified commit history**

Push the intended branch only after local and preview verification. Confirm `origin/main` or the approved release branch points to the deployed commit.

- [ ] **Step 9: Record deploy evidence**

Report production URL, preview URL, deployment status, deployed commit, framework, build result, local tests, browser journeys, canonical-domain smoke, and any remaining limitations as separate facts.

