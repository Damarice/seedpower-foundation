# Phase 8C–8G Accessibility, Performance, and Responsive Audit

This change set delivers a comprehensive accessibility, performance, and responsive-layout audit across the SeedPower Foundation Next.js site. It introduces a skip-navigation link, corrects landmark structure, fixes focus-ring visibility on brand-green backgrounds, removes unnecessary `'use client'` from `ProgrammeCard`, tightens ARIA on the mobile navigation drawer and desktop dropdowns, fixes heading hierarchy on the education page, adds the custom 404 and error boundary pages, and fills in targeted test coverage for all of the above.

**Watch for:** (1) **confirmed** — `GetInvolvedCTA` overrides `--focus-ring-color` as an inline `style` prop, but the component renders a hand-rolled `<section>` using `bg-[var(--color-brand)]`, not `bg-brand`, so the new `.bg-brand *:focus-visible` CSS rule does not apply to it; the inline style is the only mechanism keeping those links white-outlined. (2) **confirmed** — the `metadataBase` falls back to `http://localhost:3000` if `NEXT_PUBLIC_SITE_URL` is unset, and the homepage's new `canonical: '/'` alternate resolves against that base, so a build without the env var set emits `http://localhost:3000/` as the canonical URL. (3) **possible** — the skip-link test in `Layout.test.tsx` renders a manually maintained replica of the layout structure rather than the real `app/layout.tsx`, so it cannot catch regressions introduced by editing the actual file.

**Verdict**: APPROVED WITH LIMITATIONS — no blocking defects, but the `GetInvolvedCTA` focus-ring mechanism and the `metadataBase` production dependency are documented gaps that must be addressed before go-live.

---

## High-level view

The root-landmark fix converts `<main>` in `app/page.tsx` to a Fragment, correctly deferring the single `<main id="main-content" tabIndex={-1}>` to the root layout. The skip link is now the first focusable element in every page's DOM order. The `(content)/layout.tsx` route group wrapper is a transparent pass-through; no duplicate-landmark nesting exists in the reviewed files.

The white focus-ring mechanism uses two complementary paths. `Section.tsx`'s `brand` variant now emits `bg-brand` (changed from the arbitrary `bg-[var(--color-brand)]`), and `globals.css` adds `.bg-brand *:focus-visible { outline-color: #ffffff }`. All twelve `<Section background="brand">` CTA sections benefit automatically. `GetInvolvedCTA` hand-rolls its own brand `<section>` with `bg-[var(--color-brand)]`, so the CSS rule never fires for it; the inline `style` override added in this diff is the only mechanism protecting focus visibility there. Any future refactor that removes the `style` prop silently breaks it.

`ProgrammeCard` drops `'use client'` and replaces React state-driven hover scaling with CSS `group`/`group-hover` utilities, removing a client component boundary for a purely decorative effect. `MobileNav` correctly moves `role="dialog"` from `<nav>` to the containing `<div>` and adds `aria-controls`/`id` wiring on accordion toggles. The skip link uses `focus:outline-*` classes rather than `focus-visible:outline-*`, which diverges from the site's consistent convention — harmless in practice since the link is never on-screen for mouse users, but inconsistent.

`metadataBase` falls back to `http://localhost:3000` by design (Decision 4, domain unconfirmed by client). The homepage now adds `alternates: { canonical: '/' }`, which resolves relative to `metadataBase`, meaning both Open Graph URLs and the canonical tag are wrong in a build where the env var isn't set. `.env.example` documents the production value, but there is no deployment gate to catch a missing variable.

Test coverage is substantive and behaviorally grounded. The `FocusRing` suite reads the actual CSS source to verify rules aren't silently deleted, `MobileNav` tests drive accordion expansion and confirm `aria-controls`/id wiring, and the `Layout` test confirms skip-link position and `tabIndex`. The main gap is that `Layout.test.tsx` maintains a hand-copied structural replica, not the real layout component.

---

<details>
<summary>Issues (5)</summary>

1. **GetInvolvedCTA focus ring not covered by CSS rule** — The component uses `bg-[var(--color-brand)]`, not `bg-brand`, so `.bg-brand *:focus-visible` never fires for it. The inline `style` override is the sole safety net. Migrate `GetInvolvedCTA` to `<Section background="brand">`, or at minimum add a code comment marking the `style` prop as load-bearing for accessibility.

2. **metadataBase localhost fallback at production build** — If `NEXT_PUBLIC_SITE_URL` is not set in the deployment environment, all absolute metadata URLs (Open Graph, canonical) resolve against `http://localhost:3000`. Add a build-time assertion (CI environment variable check or Next.js build plugin) so a misconfigured production build fails loudly rather than silently emitting `localhost` URLs.

3. **Layout test uses a replica, not the real layout** — `Layout.test.tsx` renders a manually-maintained copy of the skip-link and `<main>` structure. Changing the skip-link `href`, its classes, or the `main` element's `id` in `app/layout.tsx` will not break this test. Test against the real `RootLayout` component, or add a companion test that imports and renders it.

4. **Homepage canonical resolves to localhost when env var is unset** — `app/page.tsx` adds `alternates: { canonical: '/' }`. With `metadataBase` unset, Next.js resolves this to `http://localhost:3000/`. This is a direct consequence of issue 2 but means the canonical tag is actively wrong in a misconfigured build rather than merely absent.

5. **Accordion aria-controls targets absent element while collapsed** — MobileNav uses `{expanded.has(item.label) && <ul id="...">}`, so the sub-list element does not exist in the DOM while collapsed and `aria-controls` points to a non-existent `id`. Screen readers handle this in practice, but it is technically invalid per ARIA. Rendering the sub-list persistently with the `hidden` attribute would be strictly correct.

</details>

<details>
<summary>Details</summary>

## Landmark structure and skip navigation

The homepage previously wrapped its content in `<main>`, producing two nested `main` landmarks. Converting `page.tsx` to a Fragment makes the root layout's `<main id="main-content" tabIndex={-1}>` the sole `main` landmark. The skip link is the first element in `<body>` before `<Header>`, positioned off-screen (`left-[-9999px]`, 1×1 pixel) until keyboard focus snaps it to `focus:left-4 focus:top-4`.

The skip link uses `focus:outline-*` Tailwind classes, not `focus-visible:outline-*`. This means the outline appears on mouse focus too. It's invisible to mouse users (the link is off-screen), but it diverges from the site's consistent `focus-visible` convention applied everywhere else.

## White focus ring on brand-green backgrounds

The two-part mechanism — `bg-brand` class on `Section`'s brand variant, plus `.bg-brand *:focus-visible { outline-color: #ffffff }` in `globals.css` — covers all twelve `<Section background="brand">` pages. The `FocusRing.test.tsx` suite reads the actual CSS files to confirm the rules are present and haven't been weakened, which is the correct approach given jsdom's inability to apply stylesheets.

`GetInvolvedCTA` is not covered by this rule. It carries `bg-[var(--color-brand)]` as a class, not `bg-brand`, so the CSS selector never matches. The inline `style={{ '--focus-ring-color': '#ffffff' }}` works — descendants inherit the overridden custom property — but it's a fragile single-point fix. The `homepage.test.tsx` test confirms the override is present on the region element, which is the right behavioral assertion given jsdom's limits.

## Mobile navigation drawer ARIA corrections

The ARIA dialog role is incompatible with the navigation landmark role on the same element. Moving `role="dialog"` from `<nav>` to the containing `<div>` is the correct fix; the navigation structure is implicit from the `<Link>` elements inside. The ref type correction from `HTMLElement` to `HTMLDivElement` resolves the TypeScript mismatch that the previous type allowed to exist silently.

The `aria-controls`/`id` wiring is a meaningful improvement: each expand button now declares which sub-list it controls. The sub-list carries the matching `id` once rendered, but does not exist in the DOM while collapsed — `aria-controls` therefore references a non-existent element until first expansion. Screen readers tolerate this, but `hidden`-attribute toggling on a persistent element would be strictly valid ARIA.

## `ProgrammeCard` server component conversion

The hover scale on `ProgrammeCard` was the only reason the component was a client component. CSS `group`/`group-hover` achieves the same effect without shipping any JavaScript for the component. It appears six times on the homepage. The reduced-motion override in `tokens.css` (`transition-duration: 0.01ms !important`) suppresses the CSS transitions automatically for reduced-motion users, with no behavior change relative to the previous JS-driven implementation.

## Education page heading hierarchy

The "Grinnell Family Campus" subtitle was nested inside the `<h3>`, causing screen readers to announce it as part of the heading name. Extracting it to a sibling `<p>` makes the heading's accessible name "Nyakach Campus" only. The updated test confirms both the heading name and the subtitle's separate presence.

## Error boundary and 404 pages

`app/error.tsx` logs only `error.digest` (a Next.js-generated server-side identifier, safe for monitoring) and never renders `error.message` or the stack trace. The test suite explicitly asserts that neither the raw error message nor stack trace patterns appear in the rendered output.

`app/not-found.tsx`'s decorative `<p aria-hidden="true">404</p>` correctly keeps the status code out of the AT reading order while the `<h1>Page Not Found</h1>` carries the accessible heading.

## `metadataBase` and production URL

The fallback to `http://localhost:3000` is documented in Decision 4 as deliberate pending client domain confirmation. `.env.example` records `NEXT_PUBLIC_SITE_URL=https://seedpowerfoundation.org`. The homepage's new `canonical: '/'` creates an additional URL that resolves incorrectly in any build missing the env var. A CI assertion that rejects builds where `NEXT_PUBLIC_SITE_URL` is unset would prevent this silent failure mode.

## Test coverage gaps

Not tested: the visual off-screen-to-on-screen skip-link transition (inherently untestable in jsdom), programmatic focus movement into `<main>` after skip-link activation, footer accordion keyboard behavior in an integration context, and the real `app/layout.tsx` structure — `Layout.test.tsx` tests a manually maintained copy that diverges from the real file without warning.

</details>

---

<details>
<summary>File map</summary>

| File | Change |
|---|---|
| `app/layout.tsx` | Added skip navigation link as first body child; gave `<main>` `id="main-content"` and `tabIndex={-1}`; added `openGraph.siteName` |
| `app/page.tsx` | Replaced `<main>` wrapper with Fragment to eliminate duplicate landmark; added homepage `canonical` alternate |
| `app/globals.css` | Added `.bg-brand *:focus-visible { outline-color: #ffffff }` rule |
| `app/not-found.tsx` | New custom 404 page with accessible H1, brief copy, homepage and what-we-do nav links |
| `app/error.tsx` | New client-side error boundary with digest-only logging, no internal detail exposure, retry and home navigation |
| `app/(content)/give/page.tsx` | Merged Events card into 3-column pathway grid (`desktop:grid-cols-3`); added `aria-label` on "Learn More" button |
| `app/(content)/what-we-do/education/page.tsx` | Extracted Nyakach Campus subtitle from `<h3>` to sibling `<p>` |
| `app/(content)/give/donate/page.tsx` | Removed `max-w-[800px]` constraint from donation tiers grid |
| `app/(content)/who-we-are/page.tsx` | Removed `max-w-[800px] mx-auto` from founders grid |
| `components/layout/Section.tsx` | Changed `brand` variant from `bg-[var(--color-brand)]` to `bg-brand` |
| `components/layout/MobileNav.tsx` | Changed drawer from `<nav role="dialog">` to `<div role="dialog">`; fixed ref type; added `aria-controls`/`id` on accordion toggles |
| `components/layout/Navigation.tsx` | Changed `aria-haspopup="true"` to `aria-haspopup="menu"` on dropdown triggers |
| `components/layout/Footer.tsx` | Added `tablet:grid-cols-2` intermediate breakpoint |
| `components/composite/ProgrammeCard.tsx` | Removed `'use client'` and `useState`; replaced JS-driven hover scale with CSS `group-hover` |
| `components/composite/ImpactCard.tsx` | Removed redundant `aria-label` from figure element |
| `components/forms/ContactForm.tsx` | Changed `FieldError` from `<span role="alert">` to `<p role="alert">` |
| `components/sections/FeaturedStorySection.tsx` | Improved placeholder `aria-label` fallback; added `aria-label` on "More Stories" button |
| `components/sections/GetInvolvedCTA.tsx` | Added inline `style` override for `--focus-ring-color: #ffffff` |
| `styles/tokens.css` | Added `scroll-behavior: auto` inside `prefers-reduced-motion` media query |
| `__tests__/components/Layout.test.tsx` | New: skip-link position, href, visual hiding, and `<main>` landmark tests |
| `__tests__/components/FocusRing.test.tsx` | New: CSS rule presence, `bg-brand` class on Section, reduced-motion scroll |
| `__tests__/components/MobileNav.test.tsx` | New: dialog role, accordion, `aria-controls`/id wiring, axe |
| `__tests__/pages/homepage.test.tsx` | New: H1 count, impact stats, programme headings, CTA links, focus-ring override |
| `__tests__/pages/not-found.test.tsx` | New: 404 page rendering and accessible structure |
| `__tests__/pages/error.test.tsx` | New: error boundary including no-stack-trace and no-raw-message assertions |
| `__tests__/components/ContactForm.test.tsx` | Added test verifying errors render as `<p role="alert">` |
| `__tests__/components/Header.test.tsx` | Added test verifying `aria-haspopup="menu"` on dropdown triggers |
| `__tests__/components/ImpactCard.test.tsx` | Updated test: verifies `aria-label` removed from figure |
| `__tests__/components/Section.test.tsx` | Updated test: verifies `bg-brand` (not arbitrary value) for brand variant |
| `__tests__/pages/give.test.tsx` | Added test for "Learn more about Sponsor a Child" aria-label |
| `__tests__/pages/what-we-do-education.test.tsx` | Added test verifying Nyakach heading name and subtitle separation |

Full diff: `git diff origin/main` from `c:\Users\Damarice\seedpower-foundation`

Verification results: Jest 413/413 passed (36 suites) · TypeScript 0 errors · ESLint 0 errors · `next build` exit 0, 22 static pages generated.

</details>
