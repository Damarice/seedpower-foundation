# Phase 8G — Step 3: Responsive Regression Review (narrow scope)

Scope: code-level review of responsive class strings in the seven files listed
for the step. Breakpoints are the project's custom `tablet` and `desktop`
variants (inferred from class usage; pixel values not loaded). Reviewed at
desktop / tablet / mobile behaviour for each file.

## Files audited

- `app/(content)/give/page.tsx`
- `app/(content)/give/donate/page.tsx`
- `app/(content)/who-we-are/page.tsx`
- `components/layout/Footer.tsx`
- `components/sections/ImpactStatsSection.tsx`
- `components/sections/ProgrammeGridSection.tsx`
- `components/sections/GetInvolvedCTA.tsx`

## Confirmation 1 — no remaining `max-w-[800px]` constraints

Searched all seven files: **no `max-w-[800px]` exists anywhere.**

The previously-flagged restriction on pathway cards is resolved: the Give
pathway cards (Donate / Sponsor a Child / Events) render inside a full-width
`<Container>` with `grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3`.
No narrow width wrapper forces them to stack prematurely at desktop.

Other width caps present are readability constraints on prose, not
card-stacking constraints, and are appropriate:
- `max-w-[600px]` on section intro paragraphs (give, donate, who-we-are,
  programme grid).
- `max-w-prose` on centred CTA body text (give CTA, donate "other ways").
- `max-w-[640px]` / `max-w-[720px]` on the who-we-are board intro / quote.
- `max-w-[260px]` / `max-w-[140px]` cap founder / board portrait sizes inside
  their grid cells (prevent oversized portraits, not grid stacking).

None of these cause premature stacking of cards or grids.

## Confirmation 2 — Events card spacing

The Events card (`give/page.tsx`) is the conditional "coming soon" card. Its
spacing is intentional and correct:

- `p-5` padding, `gap-3` internal gap, `border` (not filled), secondary text
  colour, `body-sm`, and no CTA button — a deliberate de-emphasis versus the
  `p-6` / `gap-4` / filled `bg-soft` Donate and Sponsor cards.
- In the desktop 3-up grid the card stretches to the row height (driven by the
  taller Donate/Sponsor cards); `flex-1` on its body text keeps content
  top-aligned with the empty space below. No overflow, no broken layout.
- Mobile/tablet: single column then 2 columns, so the card never sits
  cramped beside two others until desktop where width supports it.

Confirmed correct. No change made.

Minor non-blocking observation: because the Events card uses `p-5` while its
siblings use `p-6`, the three card headings sit ~4px out of baseline alignment
at desktop. Left as-is because the reduced padding is the deliberate Phase 8F
treatment of the "coming soon" card; equalising it would alter that visual
treatment (a product decision, not a regression fix).

## Confirmation 3 — grid column counts at each breakpoint

| File / grid                       | Mobile | Tablet      | Desktop    | Verdict |
|-----------------------------------|--------|------------|------------|---------|
| give pathways (3 cards)            | 1 col  | 2 cols     | 3 cols     | OK      |
| donate tiers (3 tiers)             | 1 col  | 3 cols     | 3 cols     | OK*     |
| who-we-are founders (2)            | 1 col  | 2 cols     | 2 cols     | OK      |
| who-we-are board (5)               | 2 cols | 3 cols     | 5 cols     | OK      |
| Footer (4 columns)                 | 1 col  | 1 → **2**  | 4 cols     | FIXED   |
| ImpactStats (4 stats)              | 1 col  | 2 cols     | 4 cols     | OK      |
| ProgrammeGrid (up to 6)            | 1 col  | 2 cols     | 3 cols     | OK      |
| GetInvolvedCTA (3 CTAs)            | 1 col  | 3 cols     | 3 cols     | OK      |

\* Donate tiers jump 1→3 at tablet rather than 1→2→3. Acceptable: there are
exactly 3 compact tiers (amount + one line) and 3-across is the target layout,
so a 2-column intermediate is not needed. No change.

## Correction applied

**`components/layout/Footer.tsx`** — main footer grid.

Before:
```tsx
<div className="grid grid-cols-1 desktop:grid-cols-4 gap-8 desktop:gap-12">
```

After:
```tsx
<div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8 desktop:gap-12">
```

Rationale: the footer was the only multi-column grid in the audited set that
skipped the `tablet` breakpoint, collapsing four columns into a single tall
stack on tablet. Every comparable grid (ProgrammeGrid, ImpactStats, founders,
board) steps through a `tablet` intermediate. Adding `tablet:grid-cols-2`
gives a 1→2→4 transition: mobile stacks, tablet shows a 2×2 arrangement, and
desktop remains the existing 4-column horizontal row. Desktop and mobile
behaviour are unchanged; only the tablet column count changes from 1 to 2.
This is a layout correction within the responsive-audit scope, not a redesign.

No other corrections were warranted. No grid overflows or fixed-width
elements that could cause horizontal scroll were found.

## Non-blocking observations (not changed)

- `who-we-are` core values render as a single-column list inside
  `Container variant="narrow"`. On wide desktops six short values could use
  two columns, but the section is treated as a narrative reading column
  (mission / vision / values flow together), so single column is genuinely
  suitable. Left as-is.
- Donate tiers use `tablet:grid-cols-3` (1→3). Acceptable for 3 compact items
  (see table note).

## Verification

Single bounded type-check run after the edit (full lint/build are covered by
other Phase 8G steps; this narrow step ran only a type check on the changed
file):

- `npx tsc --noEmit` — **PASS** (exit 0, no errors) after the Footer edit.

No git add / commit / push performed (step is explicitly no-commit).
