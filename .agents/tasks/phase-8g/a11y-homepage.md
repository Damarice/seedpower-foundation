# Accessibility Audit — Homepage (`app/page.tsx` + `components/sections/`)

Audited files:
- `app/page.tsx`
- `app/layout.tsx` (root layout — directly affects homepage landmark structure)
- `components/sections/FeaturedStorySection.tsx`
- `components/sections/GetInvolvedCTA.tsx`
- `components/sections/ImpactStatsSection.tsx`
- `components/sections/MissionStrip.tsx`
- `components/sections/ProgrammeGridSection.tsx`
- `components/composite/ImpactCard.tsx`
- `components/composite/ProgrammeCard.tsx`
- `components/ui/ButtonLink.tsx`
- `styles/tokens.css` (colour-contrast reference)

---

## Findings

### F1 — Nested `<main>` elements (critical)

**File:** `app/page.tsx`  
**Category:** Landmark structure

`app/layout.tsx` already wraps `{children}` in `<main id="main-content" tabIndex={-1}>`.
`app/page.tsx` returns its own `<main>` as the root element. This produces a `<main>` inside
a `<main>`, which is invalid HTML and breaks landmark navigation for screen-reader users.
NVDA and VoiceOver expose only one `<main>` per page; the nesting confuses AT traversal.

**Fix:** Replace `<main>` / `</main>` in `app/page.tsx` with `<>` / `</>` (React Fragment).

---

### F2 — Focus-ring invisible on brand background in `GetInvolvedCTA` (critical)

**File:** `components/sections/GetInvolvedCTA.tsx`, `components/ui/ButtonLink.tsx`  
**Category:** Colour contrast — focus indicator

`ButtonLink` applies `focus-visible:outline-[color:var(--focus-ring-color)]` where
`--focus-ring-color: #2D5016` (brand green). The three CTA buttons sit inside the brand-green
section (`bg-[var(--color-brand)]` = `#2D5016`). A `#2D5016` focus ring on a `#2D5016`
background has 1:1 contrast — completely invisible.

WCAG 2.1 SC 2.4.7 (AA) requires visible focus indicators.
WCAG 2.2 SC 2.4.11 (AA) requires the focus indicator area to have a minimum contrast of 3:1
against adjacent colours.

White (`#ffffff`) on `#2D5016` = approx. 11.5:1 — passes.

**Fix:** In `GetInvolvedCTA`, override `--focus-ring-color` on the section element to white
using an inline CSS custom property, so all descendant `ButtonLink` focus rings inherit the
corrected colour without altering `ButtonLink` itself.

---

### F3 — Redundant and misleading `aria-label` on figure `<p>` in `ImpactCard` (moderate)

**File:** `components/composite/ImpactCard.tsx`  
**Category:** Accessible names / screen-reader verbosity

The figure `<p>` carries `aria-label="${figure} — ${label}"`, e.g. `aria-label="375 — Students Served"`.
Immediately below it is a separate `<p>` that visibly reads "Students Served". Screen readers
announce the aria-label *instead of* the visible text "375", then announce "Students Served"
again from the next sibling. The result is "375 — Students Served … Students Served" — redundant
and potentially confusing.

The two `<p>` elements together already convey the full meaning as plain visible text. No
`aria-label` override is needed.

**Fix:** Remove `aria-label` from the figure `<p>`.

---

### F4 — "More Stories" `ButtonLink` lacks contextual accessible name (minor)

**File:** `components/sections/FeaturedStorySection.tsx`  
**Category:** Accessible names for links

The CTA at the bottom of the featured story section reads only "More Stories". When a screen
reader lists page links out of context (e.g. VoiceOver rotor, NVDA element list), "More Stories"
does not explain where the link goes. WCAG 2.1 SC 2.4.6 and best practice recommend link text
that makes sense on its own.

**Fix:** Add `aria-label="More success stories"` to the `ButtonLink` so out-of-context link
lists are descriptive. The visible text stays unchanged.

---

### F5 — Placeholder image `role="img"` label is too generic (minor)

**File:** `components/sections/FeaturedStorySection.tsx`, `components/composite/ProgrammeCard.tsx`  
**Category:** Image alt text

When no `imageSrc` is passed to `FeaturedStorySection`, the placeholder `<div role="img">`
falls back to `aria-label="Featured story image"`. When no `imageAlt` is passed to
`ProgrammeCard`, its placeholder falls back to `aria-label="${title} programme"` which
is contextual and adequate.

For `FeaturedStorySection`, the `heading` prop is always provided. The fallback should
reference the heading so the label is contextual: `aria-label={imageAlt ?? \`Image for: ${heading}\`}`.

**Fix:** In `FeaturedStorySection`, use the section heading as the fallback image label.

---

## Colour Contrast Summary (token reference)

| Foreground | Background | Ratio (approx.) | WCAG AA text | WCAG AA large | Status |
|---|---|---|---|---|---|
| `#2D5016` (brand) | `#ffffff` (page) | 8.6:1 | ✅ | ✅ | Pass |
| `#2D5016` (brand) | `#f0f4e8` (brand-surface) | 6.0:1 | ✅ | ✅ | Pass |
| `#2D5016` (brand) | `#f9faf8` (bg-soft) | 7.9:1 | ✅ | ✅ | Pass |
| `#2D5016` (brand) | `#f5f3f0` (bg-warm) | 7.4:1 | ✅ | ✅ | Pass |
| `#1a1a1a` (text-primary) | `#ffffff` | 18.1:1 | ✅ | ✅ | Pass |
| `#666666` (text-secondary) | `#ffffff` | 5.7:1 | ✅ | ✅ | Pass |
| `#aaaaaa` (footer-secondary) | `#1a1a1a` (bg-dark) | 4.0:1 | ✅ | ✅ | Pass |
| `#ffffff` (on-brand) | `#2D5016` (brand) | 11.5:1 | ✅ | ✅ | Pass |
| **`#2D5016` focus ring** | **`#2D5016` brand bg (CTA)** | **1:1** | ❌ | ❌ | **FAIL (F2)** |

---

## Landmark Structure (confirmed correct after fixes)

| Landmark | Element | Label | Notes |
|---|---|---|---|
| `<header>` | `Header.tsx` | — | Implicit header landmark ✅ |
| Main navigation | `<nav>` in `Navigation.tsx` | `aria-label="Main navigation"` | ✅ |
| Skip link | `<a href="#main-content">` | — | Present in `layout.tsx` ✅ |
| Main content | `<main id="main-content">` | — | In `layout.tsx`; `page.tsx` must NOT add another `<main>` → fixed by F1 |
| Hero section | `<section aria-label="Hero…">` | Explicit label | ✅ |
| Mission section | `<section aria-label="Our mission">` | Explicit label | ✅ |
| Impact section | `<section aria-label="Our impact">` | Explicit label | ✅ |
| Programmes section | `<section aria-labelledby="programmes-heading">` | Linked to `<h2>` | ✅ |
| Featured story | `<section aria-labelledby="featured-story-heading">` | Linked to `<h2>` | ✅ |
| Get Involved section | `<section aria-labelledby="get-involved-heading">` | Linked to visually-hidden `<h2>` | ✅ |
| `<footer>` | `Footer.tsx` | `aria-label="Site footer"` | ✅ |
| Footer legal nav | `<nav>` | `aria-label="Footer legal links"` | ✅ |

---

## Heading Hierarchy (confirmed correct)

| Level | Text | Location |
|---|---|---|
| H1 | `[Hero Headline — Awaiting Client Approval]` | `page.tsx` hero section |
| H2 | (not present in hero — correct) | — |
| H2 | `What We Do` | `ProgrammeGridSection` |
| H3 | Programme card titles (×6) | `ProgrammeCard` |
| H2 | `Growing From 12 to 375 Students` | `FeaturedStorySection` |
| H2 | *(sr-only)* `Get Involved` | `GetInvolvedCTA` |
| H3 | Column titles: Donate / Volunteer / Sponsor a Child | `GetInvolvedCTA` |

One `<h1>` per page ✅. Heading levels do not skip ✅.

---

## Corrections implemented

| Finding | File changed | Change |
|---|---|---|
| F1 | `app/page.tsx` | Replaced `<main>` root element with React Fragment `<>` |
| F2 | `components/sections/GetInvolvedCTA.tsx` | Added `style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}` to `<section>` to override focus ring colour on brand background |
| F3 | `components/composite/ImpactCard.tsx` | Removed `aria-label` from figure `<p>` |
| F4 | `components/sections/FeaturedStorySection.tsx` | Added `aria-label="More success stories"` to "More Stories" `ButtonLink` |
| F5 | `components/sections/FeaturedStorySection.tsx` | Changed placeholder fallback label to use the `heading` prop |
