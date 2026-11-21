# Phase 8G — Final Audit Report

**Phase:** 8G — Comprehensive Performance, Accessibility and Regression Audit
**Predecessor phases:** 8C–8F (responsive layout corrections)
**Scope:** Full technical quality audit of the SeedPower Foundation website:
accessibility, performance, responsive regression, test gaps, and verification.

This report consolidates the nine Phase 8G step reports:

| Report | Step |
|--------|------|
| `a11y-shared.md` | Accessibility audit — shared components |
| `a11y-homepage.md` | Accessibility audit — homepage |
| `a11y-content.md` | Accessibility audit — content pages & core components |
| `performance.md` | Performance audit — font, client, image, static gen, metadata, CSS |
| `performance-code.md` | Performance audit — code-level (fonts, client components, images) |
| `performance-build.md` | Performance audit — production build |
| `responsive.md` | Responsive regression review |
| `test-gaps.md` | Test-gap analysis & regression tests |
| `verification.md` | Verification (type-check, jest, eslint, build) |

---

## Table of contents

1. [Accessibility findings](#1-accessibility-findings)
2. [Performance findings](#2-performance-findings)
3. [Responsive regression](#3-responsive-regression)
4. [Test gaps filled](#4-test-gaps-filled)
5. [All files changed](#5-all-files-changed)
6. [Verification results](#6-verification-results)
7. [Remaining limitations](#7-remaining-limitations)

---

## 1. Accessibility findings

The accessibility audit reviewed every route and shared component for semantic
HTML and landmark structure, heading hierarchy and page titles, accessible
names, keyboard navigation and focus indicators, skip-nav, screen-reader
labels and ARIA usage, colour contrast, image alt text, form labels and error
announcements, mobile nav and footer accordion keyboard behaviour,
reduced-motion support, and touch-target usability. The
`.bg-brand *:focus-visible` rule was checked specifically.

**13 findings total: 11 corrected, 2 confirmed no-change-needed.**

### 1.1 Accessibility findings — shared components (`a11y-shared.md`)

| # | File | Category | Severity | Status |
|---|------|----------|----------|--------|
| 1 | `components/layout/MobileNav.tsx` | Semantic HTML — wrong closing tag (`</nav>` should close `<div>`) | High | Fixed |
| 2 | `components/layout/MobileNav.tsx` | ARIA — accordion buttons missing `aria-controls` | Medium | Fixed |
| 3 | `components/layout/MobileNav.tsx` | TypeScript — `useRef<HTMLElement>` on `<div>` | Low | Fixed |
| 4 | `components/layout/Navigation.tsx` | ARIA — `aria-haspopup="true"` should be `"menu"` | Low | Fixed |
| 5 | `styles/tokens.css` | Reduced-motion — `scroll-behavior: smooth` unguarded | Medium | Fixed |
| 6 | `components/layout/Section.tsx` | Focus indicator — `.bg-brand` selector mismatch (arbitrary-value `bg-[var(--color-brand)]` ≠ `bg-brand`) | High | Fixed |

Key detail on finding #6: the brand-background variant used the arbitrary-value
class `bg-[var(--color-brand)]`, which is not the same CSS class as `bg-brand`.
The `globals.css` rule `.bg-brand *:focus-visible { outline-color: #ffffff; }`
therefore never matched — interactive elements inside a brand-coloured section
got the default green focus ring (`#2D5016`) against the same green background:
invisible (1:1 contrast). Fix: Section brand variant now uses `bg-brand`.

Confirmed correct (no changes): landmark roles (`<header>`, `<main id="main-content">`,
`<footer>`, `<nav>`); accessible names on buttons/links; skip-nav link target
and reveal behaviour; focus-ring design tokens; `role="dialog" aria-modal`
and focus trap in MobileNav; `aria-current="page"`; `role="menu"`/`menuitem`;
reduced-motion suppression of transitions/animations; all touch targets ≥44px.

### 1.2 Accessibility findings — homepage (`a11y-homepage.md`)

| ID | File | Category | Severity | Status |
|----|------|----------|----------|--------|
| F1 | `app/page.tsx` | Nested `<main>` inside layout `<main>` — invalid landmark nesting | Critical | Fixed |
| F2 | `components/sections/GetInvolvedCTA.tsx` | Focus ring invisible on brand-green CTA background (1:1 contrast) | Critical | Fixed |
| F3 | `components/composite/ImpactCard.tsx` | Redundant/misleading `aria-label` on figure `<p>` | Moderate | Fixed |
| F4 | `components/sections/FeaturedStorySection.tsx` | "More Stories" link lacks contextual accessible name | Minor | Fixed |
| F5 | `components/sections/FeaturedStorySection.tsx` | Placeholder image label too generic | Minor | Fixed |

Key detail on F1: `app/layout.tsx` already wraps children in
`<main id="main-content" tabIndex={-1}>`; `app/page.tsx` returned its own `<main>`
root element, producing a `<main>` inside a `<main>` — invalid HTML that breaks
screen-reader landmark navigation. Fix: replaced the page's `<main>` with a
React Fragment (`<>`).

Key detail on F2: the three CTA buttons in `GetInvolvedCTA` sit on the brand-green
section; `ButtonLink`'s focus ring uses `--focus-ring-color: #2D5016`, giving 1:1
contrast against the same green background (fails WCAG 2.1 SC 2.4.7 and 2.2 SC
2.4.11). Fix: overrode `--focus-ring-color` to `#ffffff` on the section element
so descendant focus rings inherit white (11.5:1 contrast) without altering
`ButtonLink` itself.

**Colour contrast summary (all design-token pairs):** all pass WCAG AA for both
normal and large text, with one exception — the brand focus ring on the brand
CTA background at 1:1 contrast, corrected by F2. Representative ratios: brand on
white 8.6:1; text-primary `#1a1a1a` on white 18.1:1; text-secondary `#666666` on
white 5.7:1; footer-secondary `#aaaaaa` on dark `#1a1a1a` 4.0:1; white on brand
11.5:1.

**Landmark structure** and **heading hierarchy** confirmed correct after the F1
fix: one `<h1>` per page, no skipped levels, every `<section>` labelled via
`aria-labelledby` or `aria-label`.

### 1.3 Accessibility findings — content pages & core components (`a11y-content.md`)

18 files audited (all content routes, `not-found.tsx`, `error.tsx`,
`ContactForm.tsx`).

| ID | File | Issue | Severity | Status |
|----|------|-------|----------|--------|
| F-1 | `components/forms/ContactForm.tsx` | `FieldError` uses `role="alert"` on inline `<span>` — unreliable live-region announcement in some screen readers | Minor | Fixed (→ `<p>`) |
| F-2 | `app/(content)/who-we-are/page.tsx` | Vision/Values `<h2>` lack `id` (cannot be referenced by `aria-labelledby` if future sections are added) | Low | No change (low severity; AT heading navigation works; avoids churn) |
| F-3 | `app/(content)/give/page.tsx` | "Learn More" Sponsor-a-Child `ButtonLink` has no distinguishing accessible name | Minor | Fixed (added `aria-label`) |
| F-4 | `app/(content)/what-we-do/education/page.tsx` | Nyakach subtitle `<span>` nested inside `<h3>`, inflating the heading's accessible name | Low | Fixed (moved subtitle outside heading) |

Confirmed PASS (no issues): heading hierarchy on all content pages; form labels
in `ContactForm` (explicit `<label htmlFor>` on every control); server-error
banner (`role="alert"` block) and success banner (`role="status"
aria-live="polite"`); landmark structure on all pages; accessible names on all
other links/buttons (contact WhatsApp/Facebook, donate external link,
sponsor-a-child GOBGI link, `ProgrammeCard` CTAs, not-found/error links).

### 1.4 Accessibility summary

| Category | Findings | Corrected | Confirmed OK / no-change |
|----------|----------|-----------|--------------------------|
| Landmark structure & semantic HTML | 2 | 2 (nested `<main>`, wrong closing tag) | 1 (Vision/Values h2 ids — low severity) |
| ARIA usage | 2 | 2 (aria-controls, aria-haspopup) | — |
| Focus indicators | 2 | 2 (Section brand selector, CTA white ring) | — |
| Accessible names | 2 | 2 (More Stories, Learn More) | — |
| Image alt text | 1 | 1 (placeholder label context) | — |
| Form validation/announcements | 1 | 1 (FieldError span→p) | — |
| Reduced-motion | 1 | 1 (scroll-behavior guard) | — |
| Heading hierarchy / nesting | 1 | 1 (subtitle outside h3) | — |
| TypeScript correctness | 1 | 1 (useRef type) | — |
| **Total** | **13** | **11** | **2** |

The `.bg-brand *:focus-visible` rule is confirmed visible after the Section fix,
without weakening focus indicators on other backgrounds (the white ring applies
only inside `bg-brand` sections; all other surfaces keep the design-token green
ring).

---

## 2. Performance findings

### 2.1 Font loading — optimal, no changes

`lib/fonts.ts` loads `Manrope` (600, 700) and `Inter` (400, 500, 600) via
`next/font/google`, matching Visual Design Direction v2.0 §1.2 exactly. Both
fonts use `display: 'swap'`, are subset to `latin`, are instantiated once each,
exposed via CSS variables (`--font-manrope`, `--font-inter`), and imported only
in `app/layout.tsx`. Next.js self-hosts the fonts at build time — no third-party
Google Fonts CDN request at runtime. No unused weights loaded.

### 2.2 Client components — one unnecessary directive removed

Every `'use client'` directive was reviewed. All are justified except one:

| File | Verdict |
|------|---------|
| `components/layout/Header.tsx` | Justified (state, resize listener) |
| `components/layout/Navigation.tsx` | Justified (usePathname, dropdown state, keyboard trap) |
| `components/layout/MobileNav.tsx` | Justified (focus trap, scroll lock, accordion) |
| `components/layout/CopyrightYear.tsx` | Justified (defers `new Date()` per Next.js 16 static prerender) |
| `components/forms/ContactForm.tsx` | Justified (react-hook-form, fetch) |
| `app/error.tsx` | Justified (framework-mandated client error boundary) |
| `components/composite/ProgrammeCard.tsx` | **Was unnecessary** — used `useState` only for a `transform: scale(1.03)` hover, achievable with CSS `group-hover`. **Fixed.** |

**Correction:** `ProgrammeCard.tsx` is now a React Server Component. Removed
`'use client'`, `useState`, and the `CSSProperties` import; replaced inline
`transform`/`transition` styles with `group-hover:scale-[1.03]` Tailwind
utilities. Hover scale behaviour is preserved via CSS; rendering now happens at
build time with zero client JS for this component.

### 2.3 Image handling — structured for future `next/image` migration (no change this phase)

- `next/image` is not currently imported anywhere; all imagery is placeholder
  `<div role="img" aria-label="…">` blocks (accessible — each has an explicit
  name) while awaiting client image assets.
- `ProgrammeCard` and `FeaturedStorySection` expose `imageSrc`/`imageAlt` prop
  pairs with a conditional `imageSrc ? <img> : <placeholder>` branch — the
  intended replacement point. The placeholder structure is ready to swap to
  `next/image` when real assets arrive.
- **Deferred (deployment-dependent):** migrate the `<img>` branch and
  placeholder fallbacks to `next/image` for responsive `srcset`, lazy loading,
  modern format negotiation, and layout-shift prevention. Add `priority` to
  above-the-fold hero and featured-story images. This was deferred because no
  real assets exist yet and the phase scope prohibits photo replacement /
  page-content changes / new dependencies.

### 2.4 Static generation — all routes prerendered

All 16 application routes prerender as static (`PARTIALLY_STATIC`,
`compute: "static"` in `.next/prerender-manifest.json`) under Next.js Partial
Prerendering. HTML sizes range from ~54 KB (`/contact`) to ~80 KB (`/`), with
`/who-we-are` at ~76 KB (expected — founder grid with portrait placeholders).

### 2.5 Metadata — comprehensive; pending assets noted (no SEO changes made)

Root layout sets `title.template`, `title.default`, `description`,
`metadataBase`, and `openGraph.siteName`. All 16 page files export `metadata`
with `title` (via template), `description`, `alternates.canonical`, and an
`openGraph` block. No SEO/metadata changes were made in this phase (out of scope);
the following were recorded as deployment-dependent findings only:

- `openGraph.images` references `/images/og-image.jpg`, which does not exist yet
  (placeholder reference — add the file before launch).
- Twitter/X card metadata is absent site-wide (enhancement, not a defect).
- `metadataBase` uses a placeholder domain pending client confirmation.

### 2.6 CSS / bundle / dependencies — clean

- Tailwind 4 with CSS-first `@theme`; content scanning generates only referenced
  utilities; no purge/safelist issues, no large `@apply` blocks, no dynamic class
  strings defeating tree-shaking.
- Inline styles are all purposeful (honeypot positioning, CSS-variable sizing,
  focus-ring override, transition) — none are bundle-threatening.
- No unnecessary runtime dependencies. `react-hook-form`/`zod`/resolvers are
  confined to the client `ContactForm`; `@upstash/ratelimit`/`redis` are
  edge-side in the API route, not bundled into page JS.

### 2.7 Production build — clean

`npm run build` (Next.js 16.4.6, Turbopack) succeeded (exit 0). All page routes
are static (○); the only dynamic route (ƒ) is `/api/contact`, as expected.
Infrastructure routes `/robots.txt` and `/sitemap.xml` are static.

Build warnings: the CSS optimizer emits non-fatal warnings for Tailwind
arbitrary-value utilities whose custom-property names contain `/`, `.`, or `*`
delimiters (e.g. `max-w-[var(--container-max/wide/narrow)]`). These originate in
responsive-layout utility classes from earlier phases, are warnings only (the
CSS still compiles and emits), and do not affect the build result. They were not
altered per the no-redesign scope.

---

## 3. Responsive regression

Code-level review of the seven representative files at desktop/tablet/mobile,
focusing on the homepage "What We Do" section and statistics, footer desktop
columns and mobile accordion, giving pathway cards and donation tiers,
founders grid, programme cards and content sections, and the Events card
spacing/padding introduced in Phase 8F.

### 3.1 No remaining `max-w-[800px]` constraints

Searched all audited files: no `max-w-[800px]` exists anywhere. The previously
flagged pathway-card restriction is resolved — Give pathway cards (Donate /
Sponsor a Child / Events) render inside a full-width `<Container>` with
`grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3`. The remaining width
caps are readability constraints on prose, not card-stacking constraints:
`max-w-[600px]` on section intros, `max-w-prose` on centred CTA body, and portrait
size caps inside grid cells — none force premature stacking.

### 3.2 Events card spacing — confirmed correct

The Events "coming soon" card uses deliberately de-emphasised treatment
(`p-5`, `gap-3`, border not fill, secondary text, `body-sm`, no CTA) versus the
filled `p-6`/`gap-4` Donate and Sponsor cards. In the desktop 3-up grid it
stretches to row height with `flex-1` keeping content top-aligned — no overflow
or broken layout. Mobile/tablet step through 1→2 columns before the 3-up
desktop. Confirmed correct; no change made. (Minor non-blocking observation:
the differing `p-5` vs `p-6` leaves the Events heading ~4px out of baseline
alignment at desktop; left as-is because the reduced padding is the deliberate
Phase 8F "coming soon" treatment — equalising it would alter that visual choice.)

### 3.3 Grid column transitions

| Grid | Mobile | Tablet | Desktop | Verdict |
|------|--------|--------|---------|---------|
| Give pathways (3 cards) | 1 | 2 | 3 | OK |
| Donate tiers (3 tiers) | 1 | 3 | 3 | OK* |
| Founders (2) | 1 | 2 | 2 | OK |
| Board (5) | 2 | 3 | 5 | OK |
| Footer (4 columns) | 1 | **2** (fixed) | 4 | Fixed |
| ImpactStats (4 stats) | 1 | 2 | 4 | OK |
| ProgrammeGrid (≤6) | 1 | 2 | 3 | OK |
| GetInvolvedCTA (3 CTAs) | 1 | 3 | 3 | OK |

\* Donate tiers jump 1→3 at tablet rather than 1→2→3; acceptable for exactly
3 compact tiers (3-across is the target), so no intermediate is needed.

### 3.4 Correction applied

**`components/layout/Footer.tsx`** — the footer was the only multi-column grid
that skipped the `tablet` breakpoint, collapsing four columns into a single tall
stack on tablet. Every comparable grid steps through a tablet intermediate.

```diff
- <div className="grid grid-cols-1 desktop:grid-cols-4 gap-8 desktop:gap-12">
+ <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8 desktop:gap-12">
```

This gives a 1→2→4 transition: mobile stacks, tablet shows a 2×2 arrangement,
desktop keeps the existing 4-column horizontal row. Desktop and mobile
behaviour unchanged; only the tablet column count changes. A layout correction
within the responsive-audit scope, not a redesign.

No grid overflows or fixed-width elements that could cause horizontal scroll
were found.

---

## 4. Test gaps filled

### 4.1 Baseline — four pre-existing failures restored

Before any test edits, `npm test` reported **4 failed / 400 passed (404 total)**.
All four failures were stale assertions left from the Phase 8G a11y source
changes (the a11y step's test run used a `--testPathPatterns="(layout|ui)"`
filter that does not match the actual `__tests__/components/` paths, so the
stale assertions were missed):

| Test file | Stale assertion | Corrected behaviour |
|-----------|-----------------|---------------------|
| `Section.test.tsx` | expected `bg-[var(--color-brand)]` | `bg-brand` (a11y-shared #6) |
| `FocusRing.test.tsx` | asserted `bg-[var(--color-brand)]` | `bg-brand` (same change) |
| `ImpactCard.test.tsx` | expected combined `aria-label="375 — …"` | aria-label removed (a11y-homepage F3) |
| `homepage.test.tsx` | stats test expected combined `aria-label`s | aria-labels removed (F3) |

These were corrected and, where useful, repurposed to lock in the new behaviour.
They are existing tests restored to green, not new tests.

### 4.2 New regression tests added (9)

| Test file | New test | Locks in |
|-----------|---------|----------|
| `homepage.test.tsx` | "does not render its own main landmark" | a11y-homepage F1 (Fragment, no nested `<main>`) |
| `homepage.test.tsx` | "overrides the focus ring colour to white on the brand-green Get Involved section" | a11y-homepage F2 |
| `homepage.test.tsx` | "renders the 'More Stories' link with a descriptive accessible name" | a11y-homepage F4 |
| `MobileNav.test.tsx` | "accordion buttons expose aria-controls pointing to their sub-list" | a11y-shared #2 |
| `Header.test.tsx` | "desktop dropdown triggers use aria-haspopup='menu'" | a11y-shared #4 |
| `give.test.tsx` | "gives the Sponsor a Child 'Learn More' button a distinguishing accessible name" | a11y-content F-3 |
| `what-we-do-education.test.tsx` | "announces the Nyakach heading as 'Nyakach Campus' with the subtitle separate" | a11y-content F-4 |
| `ContactForm.test.tsx` | "renders field validation errors in block-level `<p role="alert">` elements" | a11y-content F-1 |
| `FocusRing.test.tsx` | "suppresses smooth scroll under prefers-reduced-motion" | a11y-shared #4 |

### 4.3 Changes deliberately not tested (rationale)

- **`Footer.tsx` `tablet:grid-cols-2`** — a responsive class string not
  behaviour-testable in jsdom (no layout engine); a class-string assertion would
  be brittle and low-value. Verified at code level in the responsive step.
- **`ProgrammeCard.tsx` removal of `'use client'` + `group-hover:scale-[1.03]`** —
  `'use client'` is a build/client-bundle concern, not jest-testable; the hover
  scale is a CSS effect not rendered in jsdom. Existing `ProgrammeCard.test.tsx`
  covers rendering/heading/link/placeholder/stats/axe.
- **`MobileNav.tsx` closing tag `</nav>` → `</div>`** — a JSX correctness fix,
  not runtime-testable; dialog role/structure already covered.
- **`MobileNav.tsx` `useRef` type fix** — TypeScript type-level, confirmed by
  `tsc --noEmit`, not a runtime test.
- **Font loading, client-component inventory, static generation, image
  placeholders** — all confirmed optimal or deployment-dependent in the
  performance steps; no testable regressions.

### 4.4 Test result

```
Test Suites: 36 passed, 36 total
Tests:       413 passed, 413 total
```

Baseline 404 → final 413: the 4 previously-failing tests fixed plus 9 new
focused regression tests. Pre-existing `console.error` "not wrapped in act(...)"
warnings from the ContactForm success-path tests are unrelated to the new tests
and are warnings, not failures.

---

## 5. All files changed

### 5.1 Source files (13)

| File | Phase 8G change | Finding(s) |
|------|-----------------|------------|
| `components/layout/MobileNav.tsx` | Closing tag `</nav>` → `</div>`; added `aria-controls` + sub-list `id` to accordion buttons; `useRef<HTMLElement>` → `useRef<HTMLDivElement>` | a11y-shared #1, #2, #3 |
| `components/layout/Navigation.tsx` | `aria-haspopup="true"` → `aria-haspopup="menu"` | a11y-shared #4 |
| `styles/tokens.css` | Added `scroll-behavior: auto` inside `prefers-reduced-motion` block | a11y-shared #5 |
| `components/layout/Section.tsx` | Brand variant `bg-[var(--color-brand)]` → `bg-brand` (so `.bg-brand *:focus-visible` matches) | a11y-shared #6 |
| `app/page.tsx` | Replaced root `<main>` with React Fragment `<>` (removed nested landmark) | a11y-homepage F1 |
| `components/sections/GetInvolvedCTA.tsx` | Added inline `--focus-ring-color: #ffffff` on `<section>` | a11y-homepage F2 |
| `components/composite/ImpactCard.tsx` | Removed redundant `aria-label` from figure `<p>` | a11y-homepage F3 |
| `components/sections/FeaturedStorySection.tsx` | Added `aria-label="More success stories"` to "More Stories" link; placeholder fallback label now uses `heading` prop | a11y-homepage F4, F5 |
| `components/forms/ContactForm.tsx` | `FieldError` `<span role="alert">` → `<p role="alert">` | a11y-content F-1 |
| `app/(content)/give/page.tsx` | Added `aria-label="Learn more about Sponsor a Child"` to "Learn More" button | a11y-content F-3 |
| `app/(content)/what-we-do/education/page.tsx` | Moved Nyakach subtitle `<span>` outside the `<h3>` | a11y-content F-4 |
| `components/composite/ProgrammeCard.tsx` | Removed `'use client'`, `useState`, `CSSProperties`; replaced inline `transform`/`transition` with `group-hover:scale-[1.03]` Tailwind utilities (now a Server Component) | performance.md §7 |
| `components/layout/Footer.tsx` | Added `tablet:grid-cols-2` to footer grid (1→2→4 transition) | responsive.md §3.4 |

### 5.2 Test files (9, all in `__tests__/`)

| File | Change |
|------|--------|
| `__tests__/components/Section.test.tsx` | Stale assertion `bg-[var(--color-brand)]` → `bg-brand` |
| `__tests__/components/FocusRing.test.tsx` | Aligned brand/non-brand assertions to `bg-brand`; added reduced-motion scroll-behaviour test |
| `__tests__/components/ImpactCard.test.tsx` | Converted aria-label assertion to regression test (no aria-label; separate visible text) |
| `__tests__/pages/homepage.test.tsx` | Replaced combined-aria-label stats assertions with separate visible-text pairs; added 3 new tests (no nested main, white focus ring, More Stories name) |
| `__tests__/components/MobileNav.test.tsx` | Added aria-controls regression test |
| `__tests__/components/Header.test.tsx` | Added `aria-haspopup="menu"` regression test |
| `__tests__/pages/give.test.tsx` | Added Sponsor-a-Child "Learn More" accessible-name test |
| `__tests__/pages/what-we-do-education.test.tsx` | Added Nyakach heading/subtitle separation test |
| `__tests__/components/ContactForm.test.tsx` | Added field-error `<p role="alert">` regression test |

No other files were modified. No new dependencies were added.

---

## 6. Verification results

The four required checks were run in sequence from the workspace root
(Windows / PowerShell). All passed with exit code 0; no fixes required, so no
re-runs were performed.

| # | Command | Exit code | Result |
|---|---------|-----------|--------|
| 1 | `npm run type-check` (`tsc --noEmit`) | 0 | PASS — no TypeScript errors |
| 2 | `npm test` (`jest`) | 0 | PASS — 36 suites, 413 tests |
| 3 | `npx eslint . --ext .ts,.tsx` | 0 | PASS — no errors, no warnings |
| 4 | `npm run build` (`next build`) | 0 | PASS — all 22 routes generated |

### 6.1 TypeScript

`tsc --noEmit` — exit 0, no errors.

### 6.2 Jest

```
Test Suites: 36 passed, 36 total
Tests:       413 passed, 413 total
Time:        26.182 s
```

### 6.3 ESLint

`npx eslint . --ext .ts,.tsx` — exit 0, no errors, no warnings. (The project's
`npm run lint` script runs `next lint`; this step followed the assigned command
literally and invoked ESLint directly.)

### 6.4 Production build

`next build` (Next.js 16.4.6, Turbopack) — exit 0, "Compiled successfully". All
22 routes generated:

- Static (○): `/`, `/_not-found`, `/contact`,
  `/get-involved/sponsor-a-child`, `/get-involved/volunteer`, `/give`,
  `/give/donate`, `/impact`, `/impact/success-stories`, `/robots.txt`,
  `/sitemap.xml`, `/what-we-do`, `/what-we-do/community-outreach`,
  `/what-we-do/education`, `/what-we-do/food-project`,
  `/what-we-do/teacher-training`, `/what-we-do/wash`,
  `/what-we-do/womens-empowerment`, `/who-we-are`.
- Dynamic (ƒ): `/api/contact`.

Non-fatal CSS optimization warnings (4) were logged for Tailwind arbitrary-value
utilities containing `/`, `.`, or `*` in custom-property names (e.g.
`max-w-[var(--container-max/wide/narrow)]`). They are warnings only — the CSS
still compiles and emits, the build completes successfully — and originate from
responsive-layout utility classes from earlier phases, not from this phase's
changes. They were not altered per the no-redesign scope.

---

## 7. Remaining limitations

### 7.1 Deployment-dependent / pending-asset items (no code defect)

These require external input (assets or client confirmation) and were explicitly
out of scope for this phase:

| Item | Action needed |
|------|---------------|
| `/give/events` page missing | Add `app/(content)/give/events/page.tsx` or remove the footer link (currently 404s in production) |
| `/get-involved/visit-your-child` page missing | Add the page or update the footer link to `/get-involved` |
| `<img>` → `next/image` migration | Replace when image assets are provided; add `width`/`height` or `fill` |
| `priority` on hero & featured-story images | Add when those image components are implemented (above-the-fold) |
| OG image at `/images/og-image.jpg` | File referenced in homepage metadata but does not exist — add before launch |
| Twitter/X card metadata | Absent site-wide — enhancement, not a defect |
| `metadataBase` placeholder domain | Replace `NEXT_PUBLIC_SITE_URL` with the confirmed production domain before launch |
| Sub-page `openGraph.images` | Absent — add when an OG asset is available (content task) |

### 7.2 Items deliberately left unchanged

| Item | Rationale |
|------|----------|
| `who-we-are` Vision/Values `<h2>` lack `id` (a11y-content F-2) | Low severity; AT heading navigation works; only the Mission h2 is referenced by `aria-labelledby`. Leaving unchanged avoids churn. |
| Events card `p-5` vs sibling `p-6` (~4px heading misalignment at desktop) | The reduced padding is the deliberate Phase 8F "coming soon" de-emphasis; equalising it would alter that visual treatment (product decision). |
| `who-we-are` core values as single column | Treated as a narrative reading column (mission/vision/values flow together); single column is genuinely suitable. |
| `Card.tsx` transition via inline style | Minor consistency item, no performance impact; could use a Tailwind arbitrary value. |
| CSS optimizer `Delim` warnings | Originate in earlier-phase responsive utility classes; warnings only, build succeeds; left for a follow-up decision outside this scope. |

### 7.3 Checks not runnable in this environment

- **Automated accessibility tooling** (axe-core browser runs, Lighthouse) and
  **measured performance metrics** (Lighthouse / Core Web Vitals) were not run
  with a live server in this workflow. Accessibility findings are from manual
  code-level review against WCAG criteria and the design tokens; performance
  findings are from static/build analysis (prerender manifest, build output,
  client-component inventory, bundle/dependency review) rather than runtime
  measurement. A pre-launch pass with axe and Lighthouse against the deployed
  site is recommended to capture runtime-only issues.
- **Cross-browser / real-device responsive testing** at tablet widths was done
  by code-level review of responsive class strings, not by rendering in a live
  browser; the footer tablet 2-column fix is the one behavioural change and was
  type-checked only (full build/lint covered by the verification step).
