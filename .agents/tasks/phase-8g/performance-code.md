# Performance Audit — Code (Phase 8G, Step 1: perf-audit-code)

Scope: font loading, client components, image handling. Narrow code-level audit
only. No build run, no app route page files read, no new dependencies, no git
operations.

## 1. Font loading

**Config file:** `lib/fonts.ts`

| Font    | Source            | Weights        | `display` | `subsets`  | CSS variable       |
|---------|------------------|----------------|-----------|------------|--------------------|
| Manrope | `next/font/google` | `600`, `700`   | `swap` ✓  | `['latin']` | `--font-manrope`   |
| Inter   | `next/font/google` | `400`, `500`, `600` | `swap` ✓ | `['latin']` | `--font-inter`     |

**Findings:**
- `display: 'swap'` is set on **both** fonts (FOIT avoided, text renders immediately with fallback then swaps). No `block`/`auto`/`fallback` misconfiguration.
- Each font is instantiated exactly once in `lib/fonts.ts` and exposed via a CSS
  `variable`. This is the standard non-duplicating Next.js font pattern: the font
  file is requested once and applied through `var(--font-manrope)` /
  `var(--font-inter)` across the document.
- Single import site: `app/layout.tsx` imports `{ manrope, inter }` from
  `@/lib/fonts`. A project-wide search for `lib/fonts` returned no other importers,
  so no route or component loads the fonts directly (which would duplicate the
  request).

**Corrections:** None required. Font loading is already optimal.

## 2. Client components

Every file containing a `'use client'` directive was read and verified against
its use of hooks, event handlers, and browser APIs.

| File | `'use client'` | Justification (client-only APIs used) | Verdict |
|------|:---:|---|---|
| `components/forms/ContactForm.tsx` | line 23 | `useState`, `useForm` (react-hook-form), `zodResolver`, `fetch('/api/contact')`, `onSubmit`, controlled inputs | **Justified** |
| `components/layout/Navigation.tsx` | line 1 | `useState`, `useRef`, `useEffect`, `useId`, `usePathname`, `onClick`/`onKeyDown`, `document` listeners, focus management | **Justified** |
| `components/layout/MobileNav.tsx` | line 1 | `useState`, `useRef`, `useEffect`, `document.body.style` scroll lock, focus trap, `keydown` listener | **Justified** |
| `components/layout/Header.tsx` | line 1 | `useState`, `useRef`, `useEffect`, `window.innerWidth` resize handler, `onClick` toggle | **Justified** |
| `components/layout/CopyrightYear.tsx` | line 1 | `useEffect` + `useState`; defers `new Date()` because Next.js 16 blocks `new Date()` during static prerender (documented in file header) | **Justified** |
| `app/error.tsx` | line 1 | Next.js framework requires route error boundaries to be Client Components | **Justified** (mandatory) |

**Server Components correctly omitting `'use client'`** (confirmed during the
search; listed for completeness):
- `components/composite/ProgrammeCard.tsx` — hover scale handled via CSS
  `group-hover`, no state. File header explicitly notes this avoids `'use client'`.
- `components/layout/Footer.tsx` — no state; renders the `CopyrightYear` client
  component as a child (a client island inside a server component, which is valid).
- `components/sections/FeaturedStorySection.tsx` — no hooks, no handlers.

**Corrections:** None required. All `'use client'` directives are justified and
no unnecessary client directives were found to remove.

## 3. Image handling

**`next/image` adoption:** A search for `from 'next/image'` across the project
returned **no matches**. `next/image` is not currently imported or used anywhere.

**Placeholder approach:** All current imagery is rendered as placeholder
`<div role="img" aria-label="…">` blocks (accessible — each has an explicit
accessible name, no empty/missing alt). Located in:

- `components/composite/ProgrammeCard.tsx` — placeholder shown when `imageSrc` is absent; `role="img"` with `aria-label={imageAlt ?? \`${title} programme\`}`.
- `components/sections/FeaturedStorySection.tsx` — placeholder shown when `imageSrc` is absent; `role="img"` with `aria-label={imageAlt ?? \`Image for: ${heading}\`}`.
- `app/(content)/who-we-are/page.tsx` — founder portrait placeholders (found via search; page file not read per scope).
- `app/(content)/impact/success-stories/page.tsx` — impact gallery placeholders (found via search; page file not read per scope).

**Switchover readiness:** `ProgrammeCard` and `FeaturedStorySection` already
expose an `imageSrc`/`imageAlt` prop pair with a conditional branch
(`imageSrc ? <img> : <placeholder div>`). This is the intended replacement point:
when a real `imageSrc` is supplied, the placeholder is dropped automatically.
Confirmed: **the placeholder structure is ready to be replaced with `next/image`
when real assets arrive.**

**Finding / future action (not implemented in this step):** When the real image
assets are provided, the `imageSrc` branch currently renders a raw `<img>` with
an `@next/next/no-img-element` eslint-disable. That branch (and the placeholder
fallbacks) should be migrated to `next/image` to gain automatic optimization —
responsive `srcset`, lazy loading, modern format negotiation, and intrinsic
CLSP/width-height-based layout-shift prevention. This is deferred because:
- No real image assets exist yet (placeholders are intentional).
- The step scope prohibits photo replacement / page content changes and new
  dependencies/behaviour changes, and prohibits running the build to verify an
  image-pipeline change.

No code change is made here; this is recorded as the documented follow-up so the
migration happens together with asset ingestion rather than as a speculative
change now.

## 4. Summary

| Area | Status | Corrections implemented |
|------|--------|------------------------|
| Font loading | Optimal — `display: swap` on both fonts, single instantiation, single import site, no duplicates | None needed |
| Client components | All 6 `'use client'` directives justified; 2 server components correctly avoid it | None needed (no unnecessary directives to remove) |
| Image handling | Placeholders accessible (`role="img"` + `aria-label`) and structured with an `imageSrc` switchover branch; `next/image` not yet adopted | None this step (migration deferred to asset-ingestion time per scope) |

**No code changes were required by this audit.** The font and client-component
areas are already clean; the image area is correctly structured for a future
`next/image` migration that is out of scope for this step.
