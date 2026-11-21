# Phase 8G — Performance Audit

**Date:** Phase 8G audit run  
**Scope:** Font loading, client components, image handling, static generation, metadata, CSS/bundle.

---

## 1. Font Loading

**File:** `lib/fonts.ts`

**Findings — no issues:**

- Two fonts are loaded: `Manrope` (weights 600, 700) and `Inter` (weights 400, 500, 600). Both match the Visual Design Direction v2.0 Section 1.2 specification exactly.
- Both fonts specify `display: 'swap'`, preventing invisible text during font load.
- Both are subset to `latin` only, minimising download size.
- Both use CSS variables (`--font-manrope`, `--font-inter`) applied at `<html>` level, so only two font requests are made per page.
- No unused weights (e.g. 800, 900, 300) are loaded.
- Next.js `next/font/google` self-hosts the fonts at build time, so no third-party Google Fonts CDN request is made at runtime.

**Verdict:** Font loading is correctly configured. No changes required.

---

## 2. Client Components

All files with `'use client'` directives (excluding `node_modules` and `.next`):

| File | Justified? | Reason |
|------|-----------|--------|
| `components/layout/Header.tsx` | ✅ Yes | Manages hamburger open/close state (`useState`), attaches a resize listener (`useEffect`), and renders `MobileNav` conditionally. Client-side interactivity is genuine. |
| `components/layout/Navigation.tsx` | ✅ Yes | Uses `usePathname()` for active-link styling and `useState`/`useEffect`/`useRef` for JS-managed dropdowns with keyboard trap and click-outside handling. |
| `components/layout/MobileNav.tsx` | ✅ Yes | Full focus trap, body scroll lock, and accordion expansion all require `useState`/`useEffect`/`useRef`. |
| `components/layout/CopyrightYear.tsx` | ✅ Yes | Defers `new Date().getFullYear()` to the client via `useEffect` to satisfy Next.js 16's static prerender constraint. The comment in the file documents this correctly. |
| `components/forms/ContactForm.tsx` | ✅ Yes | Uses `react-hook-form`, `useForm`, `useState` for submission status, and `fetch` for the API call. Must be client-rendered. |
| `components/composite/ProgrammeCard.tsx` | ❌ **Was unnecessary** | Previously used `useState(false)` solely to toggle a CSS `transform: scale(1.03)` on mouse enter/leave/focus. This is achievable with a pure-CSS `group` hover utility. **Fixed — see Section 7.** |

**Summary:** One unnecessary `'use client'` directive was found and corrected.

---

## 3. Image Handling

### 3.1 Placeholder `<div>` elements used instead of real images

The project knowingly uses `role="img"` placeholder `<div>` elements throughout while awaiting image assets from the client. This is intentional, documented in source comments, and covered by existing tests. It is not a defect; it is a temporary state pending asset delivery.

Locations:
- `components/composite/ProgrammeCard.tsx` — programme card image area
- `components/sections/FeaturedStorySection.tsx` — featured story image
- `app/(content)/who-we-are/page.tsx` — founder and board member portraits (`PortraitPlaceholder` component)
- `app/(content)/impact/success-stories/page.tsx` — gallery placeholder

### 3.2 `<img>` elements vs Next.js `<Image>`

Where `imageSrc` props are accepted but no assets exist yet, existing code falls back to `<img>` tags. When image assets are provided, these should be replaced with Next.js `<Image>` to get automatic format optimisation, lazy loading, and size hints.

Affected files:
- `components/composite/ProgrammeCard.tsx` — the `imageSrc` branch uses a plain `<img>` tag
- `components/composite/StoryCard.tsx` — the `avatarSrc` branch uses a plain `<img>` tag with explicit `width={48} height={48}`
- `components/sections/FeaturedStorySection.tsx` — the `imageSrc` branch uses a plain `<img>` tag

**Action required (deployment-dependent):** Replace `<img>` with `next/image <Image>` when real assets are added. At that point, `width`/`height` or `fill` props will be required, and `priority` should be set for above-the-fold images (the hero and featured story image).

### 3.3 `priority` prop usage

No `<Image>` components are present in the codebase yet (all images are still placeholders). When the hero image and featured story image are implemented, they should use `priority={true}` as they are above the fold. Programme card images should NOT use `priority` — they are below the fold.

### 3.4 Hero section

The homepage hero is a placeholder `<section>` awaiting client approval of the hero type and headline. No LCP image exists to optimise yet.

---

## 4. Static Generation

**Source:** `.next/prerender-manifest.json` (build dated 11/21/2026)

All 16 application routes in the manifest show `"renderingMode": "PARTIALLY_STATIC"` with `"compute": "static"`. This means every page is statically generated at build time under Next.js Partial Prerendering (PPR).

| Route | HTML size | Static? |
|-------|-----------|---------|
| `/` | 80,381 bytes | ✅ |
| `/contact` | 54,598 bytes | ✅ |
| `/give` | 54,849 bytes | ✅ |
| `/give/donate` | 60,236 bytes | ✅ |
| `/get-involved/volunteer` | 61,727 bytes | ✅ |
| `/get-involved/sponsor-a-child` | 55,665 bytes | ✅ |
| `/impact` | 55,779 bytes | ✅ |
| `/impact/success-stories` | 63,797 bytes | ✅ |
| `/what-we-do` | 58,552 bytes | ✅ |
| `/what-we-do/community-outreach` | 56,894 bytes | ✅ |
| `/what-we-do/education` | 56,397 bytes | ✅ |
| `/what-we-do/food-project` | 55,888 bytes | ✅ |
| `/what-we-do/teacher-training` | 57,796 bytes | ✅ |
| `/what-we-do/wash` | 56,500 bytes | ✅ |
| `/what-we-do/womens-empowerment` | 58,067 bytes | ✅ |
| `/who-we-are` | 75,761 bytes | ✅ |

**Missing from prerender manifest:**
- `/give/events` — referenced in footer navigation but no `app/(content)/give/events/page.tsx` file exists. The footer link will 404 in production. This needs either a page file or the footer link removed.
- `/get-involved/visit-your-child` — similarly referenced in the footer but no page exists. A 301 redirect in `next.config.ts` redirects `/visit-your-child` → `/get-involved`, but the footer links directly to `/get-involved/visit-your-child` without that redirect being hit, since the footer uses the target path directly.

**Note:** The `/who-we-are` page at 75,761 bytes is notably larger than others. This is expected given the founder grid with portrait placeholders.

**Verdict:** Static generation is working correctly for all implemented routes. The two footer links pointing to non-existent pages are a content defect (not a performance issue) and are recorded here as a deployment-dependent finding.

---

## 5. Metadata

**Root layout** (`app/layout.tsx`):

- `title.template` and `title.default` are set correctly.
- `description` is present and descriptive.
- `metadataBase` is set, with a note that the production domain is pending client confirmation.
- `openGraph.siteName` is set.
- Missing: `openGraph.type`, `openGraph.url`, `openGraph.images` at root level (these are supplemented per-page, so the absence at root level is acceptable).

**All 16 page files export `metadata`** with at least:
- `title` (using the template, so rendered as `"Page Title | SeedPower Foundation"`)
- `description`
- `alternates.canonical`
- `openGraph` block (title, description, url, type)

**Findings:**
- Metadata coverage is comprehensive. Every page has a title, description, canonical URL, and OpenGraph block.
- The homepage (`app/page.tsx`) includes an `openGraph.images` array with `/images/og-image.jpg`. This file does not exist in `/public/images/` — it is a placeholder reference. When the OG image is provided, the file must be placed at `public/images/og-image.jpg`.
- Sub-pages do not include `openGraph.images`. Once an OG image asset is available, adding it to sub-pages would improve social sharing previews. This is a content task, not a code defect.
- Twitter/X card metadata is absent site-wide. Adding `twitter: { card: 'summary_large_image' }` to the root layout would cover all pages with a single addition. This is an enhancement, not a defect.

**Verdict:** Metadata is adequately configured for launch. The OG image file is a pending asset. Twitter card metadata is absent but not blocking.

---

## 6. CSS / Bundle

### 6.1 Tailwind utility scanning

The project uses Tailwind CSS 4 with a CSS-first `@theme` configuration (`styles/tokens.css`) and a single `@import "tailwindcss"` in `globals.css`. Tailwind 4 uses content scanning to generate only the utilities actually referenced in source files. No explicit purge configuration or safelist was found.

**Observations:**
- All Tailwind utility classes found in source files follow project conventions and reference design tokens via `var()` syntax.
- No obviously unused utility classes were found that wouldn't be purged automatically.
- No large `@apply` blocks or dynamically constructed class strings that would defeat tree-shaking.
- The `globals.css` file is minimal and focused: box model, base HTML, focus indicators, typography defaults, links, images, form elements, and overflow prevention.

### 6.2 Inline styles

Inline `style={}` props appear in several components, all for specific reasons:

| Component | Inline style | Reason |
|-----------|-------------|--------|
| `ProgrammeCard.tsx` | Previously used `transform: scale()` via inline style | **Fixed** — now uses CSS `group-hover:scale-[1.03]` Tailwind utility |
| `ImpactCard.tsx` | Icon wrapper sizing via CSS variables | CSS variables cannot be used in Tailwind arbitrary values for `width`/`height`; inline style is acceptable |
| `ContactForm.tsx` | Honeypot field: `position: absolute; left: -9999px` | Intentional — Architecture Section 8.4 requires CSS positioning (not `display:none`) for the honeypot |
| `GetInvolvedCTA.tsx` | `--focus-ring-color: #ffffff` on section | Sets a CSS custom property for white focus rings on the brand-green background section |
| `Card.tsx` | `transition: box-shadow var(--transition-std)` | Tailwind 4 arbitrary `[transition:...]` syntax would work equivalently; this is a minor style inconsistency but not a performance issue |

**Verdict:** No large inline style blocks or bundle-threatening patterns found. The `Card.tsx` inline style for transition could be converted to a Tailwind arbitrary value for consistency, but it has no performance impact.

### 6.3 Dependencies

Runtime dependencies:
- `next` 16.4.6
- `react` / `react-dom` 19.3.0
- `react-hook-form` ^7.92.0 — used only in `ContactForm.tsx`, which is client-rendered. This is appropriate.
- `zod` ^4.6.7 — used in both the client-side form validation and the server-side API route. Appropriate.
- `@hookform/resolvers` ^7.0.7 — required bridge for `react-hook-form` + zod.
- `@upstash/ratelimit` + `@upstash/redis` — used in the API route for rate limiting. These are edge-compatible, not bundled into page JS.

No unnecessary runtime dependencies found.

---

## 7. Corrections Implemented

### 7.1 `ProgrammeCard.tsx` — Removed unnecessary `'use client'`

**File changed:** `components/composite/ProgrammeCard.tsx`

**What changed:**
- Removed `'use client'` directive.
- Removed `import { useState }` and `import type { CSSProperties }`.
- Removed `imageScale` state and `onMouseEnter`/`onMouseLeave`/`onFocusCapture`/`onBlurCapture` event handlers.
- Removed `imageWrapperStyles` constant (the inline `CSSProperties` object for the image wrapper).
- Added `'group'` class to the outer `<article>` element.
- Added `overflow-hidden relative` directly to the image wrapper `<div>` (previously in the `imageWrapperStyles` constant).
- Replaced `style={{ transform: ..., transition: ... }}` on both the `<img>` and placeholder `<div>` with `[transition:transform_var(--transition-slow)] group-hover:scale-[1.03]` Tailwind utilities.
- Replaced `style={{ transition: ... }}` on the outer `<article>` with the Tailwind arbitrary value `[transition:box-shadow_var(--transition-std)]`.

**Effect:** `ProgrammeCard` is now a React Server Component. Its rendering happens at build time (zero client JS for this component on pages that don't otherwise need client JS). The hover scale visual behaviour is preserved via CSS `group` utilities.

---

## 8. Speculative / Deployment-Dependent Findings (No Code Changes)

| Finding | Action Required |
|---------|----------------|
| `/give/events` page missing | Add `app/(content)/give/events/page.tsx` or remove the footer link |
| `/get-involved/visit-your-child` page missing | Add the page or update the footer link to `/get-involved` |
| Replace `<img>` with `<Image>` | Do when image assets are provided; add `width`/`height` or `fill` props |
| Add `priority` to hero and featured story images | Do when hero and featured story image components are implemented |
| OG image at `/images/og-image.jpg` referenced but missing | Add the file to `public/images/` before launch |
| Twitter card metadata absent | Add `twitter: { card: 'summary_large_image' }` to root layout metadata (enhancement) |
| `metadataBase` using placeholder domain | Replace `NEXT_PUBLIC_SITE_URL` with the confirmed production domain before launch |
| `Card.tsx` transition via inline style | Minor: could use `[transition:box-shadow_var(--transition-std)]` Tailwind class for consistency |
