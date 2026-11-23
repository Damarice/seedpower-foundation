# Design System Reference — Grid, Breakpoints, Spacing & Containers

> Source of truth: `styles/tokens.css` (Tailwind CSS 4 `@theme` block)
> Supporting docs: `visual-design-direction.md` v2.0, `technical-implementation-architecture.md` v1.2

---

## Breakpoints

The project is **mobile-first**. All breakpoints are `min-width` queries. No `max-width` queries except where structurally unavoidable.

| Token | Value | Tailwind prefix | Description |
|---|---|---|---|
| `--bp-mobile` | 320px | — | Minimum supported width (base styles) |
| `--bp-tablet` | 768px | `tablet:` | Tablet and above |
| `--bp-desktop` | 1024px | `desktop:` | Desktop and above |
| `--bp-wide` | 1440px | `wide:` | Large desktop |

Tailwind v4 reads these `@theme` variables directly — no `tailwind.config.ts` exists. Custom breakpoint prefixes (`tablet:`, `desktop:`) are generated from the `--bp-*` tokens.

---

## Container Widths

Three container variants are available via `<Container variant="...">` (`components/layout/Container.tsx`).

| Token | Value | Variant prop | Use |
|---|---|---|---|
| `--container-max` | 1200px (75rem) | `default` | Standard page content — most pages |
| `--container-wide` | 1400px (87.5rem) | `wide` | Full-bleed sections that need a wider cap |
| `--container-narrow` | 720px (45rem) | `narrow` | Long-form text pages (About, mission articles) |

Horizontal padding is applied by `Container` itself:

| Token | Value | Applied at |
|---|---|---|
| `--container-padding-mobile` | 16px (1rem) | Base (all sizes) |
| `--container-padding-tablet` | 24px (1.5rem) | `tablet:` and above |

The container is always `mx-auto w-full`, so it centres itself and never exceeds the max width.

---

## Section Vertical Spacing

`<Section>` (`components/layout/Section.tsx`) applies consistent vertical padding using spacing tokens.

| Breakpoint | Token | Value |
|---|---|---|
| Mobile (base) | `--space-8` | 32px |
| Tablet (768px+) | `--space-10` | 40px |
| Desktop (1024px+) | `--space-16` | 64px |

No section may use ad-hoc vertical padding outside this scale.

---

## Spacing Scale

Base unit is **8px**. All spacing tokens are multiples of 4px (halves permitted at 4px and 12px).

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4px | Tight icon-to-label gaps |
| `--space-2` | 8px | Compact padding, inline gaps |
| `--space-3` | 12px | Small component internal padding |
| `--space-4` | 16px | Standard internal padding, mobile margins |
| `--space-5` | 20px | Card padding desktop, button horizontal padding |
| `--space-6` | 24px | Tablet horizontal margin, component gaps |
| `--space-8` | 32px | Large internal sections, button group gaps |
| `--space-10` | 40px | Tablet section padding |
| `--space-12` | 48px | Medium section padding, card gaps |
| `--space-16` | 64px | Desktop section padding (vertical) |
| `--space-20` | 80px | Large desktop section padding |

---

## Grid System

Tailwind CSS 4 provides utility classes for CSS Grid and Flexbox. No dedicated grid framework is used. Layouts are assembled from grid/flex utilities in component JSX using the breakpoint prefixes above.

**Common grid patterns used or expected by the layout audit:**

| Content | Mobile | Tablet (768px+) | Desktop (1024px+) |
|---|---|---|---|
| Statistics (4 items) | 2-col or 1-col | 2-col | 4-col single row |
| Programme cards (6 items) | 1-col | 2-col | 3-col |
| Get Involved cards (3 items) | 1-col | 2-col | 3-col |
| Footer columns | stacked | 2-col | 4–5 col |

These patterns must be built from Tailwind grid utilities (`grid`, `grid-cols-N`, `gap-*`) referencing spacing tokens via `gap-[var(--space-N)]`, constrained inside the `default` container (1200px max).

---

## Component Dimensions

| Token | Value | Use |
|---|---|---|
| `--nav-height-mobile` | 56px (3.5rem) | Navigation bar height on mobile |
| `--nav-height-desktop` | 64px (4rem) | Navigation bar height on desktop |
| `--touch-target-min` | 44px (2.75rem) | Minimum interactive target size |
| `--card-image-ratio` | 4/3 | Image aspect ratio inside cards |

---

## Typography — Responsive Scale Summary

Fonts: **Manrope** (headings), **Inter** (body, UI).

| Element | Mobile | Tablet (768px+) | Desktop (1024px+) |
|---|---|---|---|
| Hero H1 | 28px | 36px | 48px |
| H1 page title | 24px | 32px | 40px |
| H2 section heading | 22px | 28px | 32px |
| H3 card/subsection | 18px | 22px | 24px |
| H4 | 16px | 18px | 20px |
| Body large | 16px | 17px | 18px |
| Body | 15px | 16px | 16px |
| Body small | 13px | 14px | 14px |

Type scale is driven by CSS custom properties overridden at each breakpoint in `styles/tokens.css` using plain `@media (min-width: Npx) { :root { } }` blocks, not `@theme` (Tailwind 4 `@theme` does not support media queries).

---

## Border Radius & Shadow Tokens (layout-relevant)

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Buttons, inputs |
| `--radius-md` | 6px | Cards, dropdowns |
| `--radius-lg` | 12px | Large featured cards, image containers |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.08)` | Card hover state only (flat by default) |

---

## Key Rules for Layout Polish Work

1. Use `<Section>` for every full-width section — do not set `py-*` on sections directly.
2. Wrap page content in `<Container>` — do not set `max-w-*` or `px-*` on individual sections.
3. Build grids with Tailwind utilities + breakpoint prefixes (`tablet:grid-cols-2 desktop:grid-cols-3`).
4. Gap values must reference spacing tokens (`gap-[var(--space-6)]`), not arbitrary values.
5. No page-specific breakpoints — use only `tablet:` and `desktop:` prefixes.
6. All four statistics must render in a single 4-column row at `desktop:` breakpoint.
7. Programme cards (6): `desktop:grid-cols-3`, `tablet:grid-cols-2`, mobile `grid-cols-1`.
8. Get Involved cards (3): `desktop:grid-cols-3`, `tablet:grid-cols-3` or `grid-cols-2`.
9. Footer: `desktop:grid-cols-4` or `desktop:grid-cols-5`, stacked on mobile.
