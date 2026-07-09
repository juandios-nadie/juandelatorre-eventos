# Facebook Events Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an "Eventos recientes" homepage section that embeds the configured business Facebook Page timeline and keeps a direct Facebook fallback link available.

**Architecture:** Keep the homepage data flow server-rendered: `src/app/page.tsx` already fetches Sanity site settings and will pass `settings?.facebookUrl` into the new section. Use a small URL helper module for sanitizing and falling back to the seeded Facebook URL, a client-only embed component for `next/script`, and a server section component for layout and copy.

**Tech Stack:** Next.js 16.2.4 App Router, React 19, TypeScript, Tailwind CSS v4, Sanity site settings, Meta Facebook Page Plugin.

## Global Constraints

- Follow local Next.js 16 docs in `node_modules/next/dist/docs/` before implementation.
- Use `next/script` for the Meta JavaScript SDK.
- Use `strategy="lazyOnload"` for the Facebook SDK because the local Next.js scripts guide lists social media widgets as low-priority scripts.
- Keep script callbacks inside a Client Component because the local Next.js Script API says `onReady` and `onError` do not work with Server Components.
- Do not use the Facebook Graph API in this version.
- Do not add new runtime dependencies.
- Section title must be `Eventos recientes`.
- Use the existing Sanity `facebookUrl` site setting and the existing hardcoded fallback constant.
- The feature only targets a public business Facebook Page.

---

## File Structure

- Create `src/lib/facebook.ts`: Facebook URL normalization, fallback resolution, and SDK URL constant.
- Create `src/lib/facebook.test.ts`: Node test coverage for the URL helper behavior.
- Create `src/components/FacebookPageEmbed.tsx`: Client Component that loads Meta's SDK and renders Page Plugin markup.
- Create `src/components/FacebookEventsSection.tsx`: Server Component that owns the section layout, title, copy, CTA, and embed placement.
- Modify `src/app/page.tsx`: import and place `FacebookEventsSection` between `FeaturedGallery` and `QuoteGuideSection`.

---

### Task 1: Facebook URL Helpers

**Files:**
- Create: `src/lib/facebook.ts`
- Test: `src/lib/facebook.test.ts`

**Interfaces:**
- Consumes: `FACEBOOK_URL` from `src/lib/constants.ts`
- Produces:
  - `FACEBOOK_SDK_SRC: string`
  - `normalizeFacebookPageUrl(value: string | null | undefined): string | null`
  - `getFacebookPageUrl(value: string | null | undefined): string`

- [ ] **Step 1: Write the failing test**

Create `src/lib/facebook.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { FACEBOOK_URL } from "./constants";
import {
  FACEBOOK_SDK_SRC,
  getFacebookPageUrl,
  normalizeFacebookPageUrl,
} from "./facebook";

test("normalizeFacebookPageUrl accepts Facebook page URLs and removes tracking data", () => {
  assert.equal(
    normalizeFacebookPageUrl(
      " http://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/?fbclid=abc#posts "
    ),
    "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/"
  );
});

test("normalizeFacebookPageUrl rejects non-Facebook URLs", () => {
  assert.equal(normalizeFacebookPageUrl("https://www.instagram.com/example"), null);
  assert.equal(normalizeFacebookPageUrl("javascript:alert(1)"), null);
  assert.equal(normalizeFacebookPageUrl(""), null);
});

test("getFacebookPageUrl falls back to the site default", () => {
  assert.equal(getFacebookPageUrl(null), FACEBOOK_URL);
  assert.equal(getFacebookPageUrl("not a url"), FACEBOOK_URL);
});

test("FACEBOOK_SDK_SRC loads the Spanish Latin America SDK with XFBML parsing enabled", () => {
  assert.equal(
    FACEBOOK_SDK_SRC,
    "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v25.0"
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test -- src/lib/facebook.test.ts
```

Expected: FAIL because `src/lib/facebook.ts` does not exist.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/facebook.ts`:

```ts
import { FACEBOOK_URL } from "./constants";

export const FACEBOOK_SDK_SRC =
  "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v25.0";

const FACEBOOK_HOSTNAMES = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "web.facebook.com",
]);

export function normalizeFacebookPageUrl(
  value: string | null | undefined
): string | null {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }

    if (!FACEBOOK_HOSTNAMES.has(parsed.hostname.toLowerCase())) {
      return null;
    }

    parsed.protocol = "https:";
    parsed.search = "";
    parsed.hash = "";

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getFacebookPageUrl(value: string | null | undefined): string {
  return normalizeFacebookPageUrl(value) ?? FACEBOOK_URL;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run test -- src/lib/facebook.test.ts
```

Expected: PASS for all four Facebook helper tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/facebook.ts src/lib/facebook.test.ts
git commit -m "feat: add Facebook URL helpers"
```

---

### Task 2: Facebook Events Components

**Files:**
- Create: `src/components/FacebookPageEmbed.tsx`
- Create: `src/components/FacebookEventsSection.tsx`

**Interfaces:**
- Consumes:
  - `FACEBOOK_SDK_SRC` from `src/lib/facebook.ts`
  - `getFacebookPageUrl(value: string | null | undefined): string` from `src/lib/facebook.ts`
- Produces:
  - `FacebookPageEmbed({ pageUrl }: { pageUrl: string }): JSX.Element`
  - `FacebookEventsSection({ facebookUrl }: { facebookUrl?: string | null }): JSX.Element`

- [ ] **Step 1: Add the client embed component**

Create `src/components/FacebookPageEmbed.tsx`:

```tsx
"use client";

import Script from "next/script";
import { useState } from "react";
import { FACEBOOK_SDK_SRC } from "@/lib/facebook";

interface FacebookPageEmbedProps {
  pageUrl: string;
}

type FacebookSdk = {
  XFBML?: {
    parse?: () => void;
  };
};

declare global {
  interface Window {
    FB?: FacebookSdk;
  }
}

export default function FacebookPageEmbed({ pageUrl }: FacebookPageEmbedProps) {
  const [scriptFailed, setScriptFailed] = useState(false);

  function parseFacebookMarkup() {
    window.FB?.XFBML?.parse?.();
  }

  return (
    <>
      <div id="fb-root" />
      <div className="overflow-hidden rounded-[1.5rem] border border-brand-gold/20 bg-white p-3 shadow-[0_24px_80px_rgba(35,31,32,0.08)]">
        {scriptFailed && (
          <div className="mb-3 rounded-2xl bg-brand-ruby/10 px-4 py-3 text-sm font-semibold text-brand-ruby">
            Los eventos recientes están disponibles en Facebook.
          </div>
        )}
        <div className="flex min-h-[560px] items-center justify-center bg-brand-champagne/30">
          <div
            className="fb-page"
            data-href={pageUrl}
            data-tabs="timeline"
            data-width="500"
            data-height="560"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
              <a href={pageUrl}>Juan de la Torre Eventos</a>
            </blockquote>
          </div>
        </div>
      </div>
      <Script
        id="facebook-jssdk"
        src={FACEBOOK_SDK_SRC}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onReady={parseFacebookMarkup}
        onError={() => setScriptFailed(true)}
      />
    </>
  );
}
```

- [ ] **Step 2: Add the server section component**

Create `src/components/FacebookEventsSection.tsx`:

```tsx
import { getFacebookPageUrl } from "@/lib/facebook";
import FacebookPageEmbed from "./FacebookPageEmbed";

interface FacebookEventsSectionProps {
  facebookUrl?: string | null;
}

export default function FacebookEventsSection({
  facebookUrl,
}: FacebookEventsSectionProps) {
  const pageUrl = getFacebookPageUrl(facebookUrl);

  return (
    <section className="bg-brand-champagne/35 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_500px] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-brand-ruby">
            Desde Facebook
          </p>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl">
            Eventos recientes
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-charcoal/70">
            Lo más nuevo de montajes, fechas y eventos se publica primero en
            Facebook. Aquí aparece la actividad reciente de la página del
            negocio.
          </p>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 w-fit items-center justify-center rounded-full bg-brand-charcoal px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 focus:ring-offset-brand-champagne active:translate-y-px"
          >
            Ver Facebook
          </a>
        </div>

        <FacebookPageEmbed pageUrl={pageUrl} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS with no ESLint errors.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: PASS. The build must not fail on Server/Client Component boundaries or `next/script` usage.

- [ ] **Step 5: Commit**

```bash
git add src/components/FacebookPageEmbed.tsx src/components/FacebookEventsSection.tsx
git commit -m "feat: add Facebook events components"
```

---

### Task 3: Homepage Wiring and Verification

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes:
  - `FacebookEventsSection({ facebookUrl }: { facebookUrl?: string | null }): JSX.Element`
  - `settings?.facebookUrl` from `getSiteSettings()`
- Produces:
  - Homepage order: `FeaturedGallery`, `FacebookEventsSection`, `QuoteGuideSection`

- [ ] **Step 1: Wire the section into the homepage**

Modify `src/app/page.tsx` to match this file:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import EventTypesSection from "@/components/EventTypesSection";
import ProcessSection from "@/components/ProcessSection";
import FeaturedGallery from "@/components/FeaturedGallery";
import FacebookEventsSection from "@/components/FacebookEventsSection";
import QuoteGuideSection from "@/components/QuoteGuideSection";
import ContactSection from "@/components/ContactSection";
import {
  getSiteSettings,
  getCategories,
  getFeaturedItems,
} from "@/lib/sanity";

export const revalidate = 3600;

export default async function Home() {
  const [settings, categories, featuredItems] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedItems(),
  ]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-brand-champagne px-4 py-2 text-sm font-bold text-brand-charcoal focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-brand-gold"
      >
        Saltar al contenido
      </a>
      <Navbar quoteHref="/#cotizar" />
      <main id="contenido">
        <HeroSection settings={settings} />
        <TrustBar />
        <ServicesSection categories={categories} />
        <EventTypesSection />
        <ProcessSection />
        <FeaturedGallery items={featuredItems} />
        <FacebookEventsSection facebookUrl={settings?.facebookUrl} />
        <QuoteGuideSection />
        <ContactSection settings={settings} />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Run the full automated checks**

Run:

```bash
npm run test
npm run lint
npm run build
```

Expected:

- `npm run test`: PASS for existing tests plus `src/lib/facebook.test.ts`
- `npm run lint`: PASS with no ESLint errors
- `npm run build`: PASS with the homepage route generated successfully

- [ ] **Step 3: Run local dev server**

Run:

```bash
npm run dev
```

Expected: Development server starts and prints a local URL, normally `http://localhost:3000`.

- [ ] **Step 4: Browser visual verification**

Open the local URL and verify:

- Desktop viewport: `1440x1000`
- Mobile viewport: `390x844`
- The homepage shows `Eventos recientes` between the gallery and quote guide.
- The Facebook embed area has stable height while loading.
- The direct `Ver Facebook` link opens the configured Facebook URL in a new tab.
- No text overlaps nearby content on desktop or mobile.
- If the embed does not load because Meta blocks it locally, the page still shows the section and direct Facebook link.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: show recent Facebook events on homepage"
```

---

### Task 4: Final Review

**Files:**
- Review: `src/lib/facebook.ts`
- Review: `src/components/FacebookPageEmbed.tsx`
- Review: `src/components/FacebookEventsSection.tsx`
- Review: `src/app/page.tsx`

**Interfaces:**
- Consumes: completed Tasks 1-3
- Produces: final implementation ready for user review

- [ ] **Step 1: Inspect final diff**

Run:

```bash
git status --short
git log --oneline -4
git diff HEAD~3..HEAD -- src/lib/facebook.ts src/lib/facebook.test.ts src/components/FacebookPageEmbed.tsx src/components/FacebookEventsSection.tsx src/app/page.tsx
```

Expected:

- Worktree is clean after commits.
- The last three commits are the helper, component, and homepage commits.
- Diff contains only the Facebook events feature files.

- [ ] **Step 2: Re-run final checks**

Run:

```bash
npm run test
npm run lint
npm run build
```

Expected: all commands pass.

- [ ] **Step 3: Prepare completion note**

Report:

- Files changed.
- Verification commands and results.
- Local dev URL if the server is still running.
- Any observed Facebook embed limitation, especially if Meta does not render the timeline in local development.
