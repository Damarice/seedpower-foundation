# Phase 8G — Step 4: Test-Gap Analysis & Regression Tests

**Scope:** List test files in `__tests__/`, identify Phase 8F/8G changes that lack
coverage, add focused regression tests only for genuine gaps, run `npm test`.

No source/feature changes, no SEO/metadata, no contact-API behaviour, no photo or
page-content changes, no new dependencies, no git operations. Only `__tests__/`
files were modified.

---

## 1. Test files inventoried (`__tests__/`)

**`__tests__/api/`**
- `contact.test.ts`

**`__tests__/components/`**
- `Badge.test.tsx`, `Button.test.tsx`, `ButtonLink.test.tsx`, `Card.test.tsx`,
  `ContactForm.test.tsx`, `Container.test.tsx`, `ExternalLink.test.tsx`,
  `FocusRing.test.tsx`, `Footer.test.tsx`, `Header.test.tsx`, `ImpactCard.test.tsx`,
  `Layout.test.tsx`, `MobileNav.test.tsx`, `ProgrammeCard.test.tsx`, `Section.test.tsx`,
  `StoryCard.test.tsx`, `Typography.test.tsx`

**`__tests__/pages/`**
- `contact.test.tsx`, `error.test.tsx`, `give-donate.test.tsx`, `give.test.tsx`,
  `homepage.test.tsx`, `impact-success-stories.test.tsx`, `impact.test.tsx`,
  `not-found.test.tsx`, `sponsor-a-child.test.tsx`, `volunteer.test.tsx`,
  `what-we-do-community-outreach.test.tsx`, `what-we-do-education.test.tsx`,
  `what-we-do-food-project.test.tsx`, `what-we-do-teacher-training.test.tsx`,
  `what-we-do-wash.test.tsx`, `what-we-do-womens-empowerment.test.tsx`,
  `what-we-do.test.tsx`, `who-we-are.test.tsx`

Components with **no dedicated test file**: `Navigation.tsx`, `GetInvolvedCTA.tsx`,
`FeaturedStorySection.tsx`, `ImpactStatsSection.tsx`, `ProgrammeGridSection.tsx`,
`MissionStrip.tsx`, `CopyrightYear.tsx`. Several of these are exercised indirectly
through page tests (homepage renders `GetInvolvedCTA`, `FeaturedStorySection`,
`ImpactStatsSection`; `Header` renders `Navigation`).

---

## 2. Baseline finding — four existing tests were already broken

Before any edits, `npm test` reported **4 failed, 400 passed (404 total)**. All
four failures were stale assertions left over from the Phase 8G a11y changes,
which updated source components but not their tests. (The a11y step's test run
used a `--testPathPatterns="(layout|ui)"` filter that does not match the actual
test paths under `__tests__/components/`, so the stale assertions were not
caught.)

| File | Stale assertion | Corrected behaviour (Phase 8G change) |
|------|-----------------|---------------------------------------|
| `Section.test.tsx` | expected `bg-[var(--color-brand)]` | `bg-brand` (a11y-shared #5, so `.bg-brand *:focus-visible` matches) |
| `FocusRing.test.tsx` | "applies the bg-brand class" test asserted `bg-[var(--color-brand)]` | `bg-brand` (same change) |
| `ImpactCard.test.tsx` | expected combined `aria-label="375 — Students supported"` | aria-label removed (a11y-homepage F3) |
| `homepage.test.tsx` | stats test expected combined `aria-label`s | aria-labels removed (F3) |

These were corrected (see §3). They are not "new" tests — they are existing tests
restored to green and, where useful, repurposed to lock in the new behaviour.

---

## 3. Changes made to test files

### Stale assertions corrected (restored to green)

**`__tests__/components/Section.test.tsx`**
- Brand-variant assertion `bg-[var(--color-brand)]` → `bg-brand`, matching the
  a11y-shared #5 source change so the white focus-ring CSS selector targets the
  section.

**`__tests__/components/FocusRing.test.tsx`** (Phase 8C-era test file)
- "Section with background='brand' applies the bg-brand class": assertion
  `bg-[var(--color-brand)]` → `bg-brand`.
- The three sibling "does not apply bg-brand" tests (white/soft/warm) asserted
  the now-defunct `bg-[var(--color-brand)]` string; aligned them to assert
  `bg-brand` so they actually guard the real class (they previously passed for
  the wrong reason).

**`__tests__/components/ImpactCard.test.tsx`**
- Converted "provides an accessible label combining figure and label" (which
  asserted the removed combined aria-label) into a regression test: the figure
  element has **no** `aria-label` and the label renders as separate visible text.
  Locks in a11y-homepage F3.

**`__tests__/pages/homepage.test.tsx`**
- Stats test: replaced the four `getByLabelText(/figure — label/i)` assertions
  with `within(impact-region).getByText(figure)` + `getByText(label)` pairs.
  Locks in F3 (figures and labels are now separate visible texts).

### New regression tests for genuine gaps

**`__tests__/pages/homepage.test.tsx`** (3 new tests)
- "does not render its own main landmark" — asserts `queryByRole('main')` is
  absent. Locks in a11y-homepage F1 (page.tsx uses a Fragment, not a nested
  `<main>` inside the layout's `<main>`).
- "overrides the focus ring colour to white on the brand-green Get Involved
  section" — asserts the Get Involved region's inline style sets
  `--focus-ring-color: #ffffff`. Locks in a11y-homepage F2 (focus ring visible
  on the brand background).
- "renders the 'More Stories' link with a descriptive accessible name" — asserts
  `getByRole('link', { name: /more success stories/i })`. Locks in
  a11y-homepage F4 (out-of-context link name disambiguated).

**`__tests__/components/MobileNav.test.tsx`** (1 new test)
- "accordion buttons expose aria-controls pointing to their sub-list" — every
  accordion toggle has an `aria-controls` matching `mobile-nav-…`, and expanding
  the first renders a sub-list with that id. Locks in a11y-shared #2.

**`__tests__/components/Header.test.tsx`** (1 new test)
- "desktop dropdown triggers use aria-haspopup='menu'" — the dropdown trigger
  buttons (rendered by `Navigation` inside `Header`) declare
  `aria-haspopup="menu"`. Locks in a11y-shared #4 (`"true"` → `"menu"`).
  `Navigation.tsx` has no test file of its own; this covers the change via the
  already-mocked `Header` render.

**`__tests__/pages/give.test.tsx`** (1 new test)
- "gives the Sponsor a Child 'Learn More' button a distinguishing accessible name"
  — asserts `getByRole('link', { name: /learn more about sponsor a child/i })`.
  Locks in a11y-content F-3.

**`__tests__/pages/what-we-do-education.test.tsx`** (1 new test)
- "announces the Nyakach heading as 'Nyakach Campus' with the subtitle separate"
  — asserts the h3's accessible name is exactly `Nyakach Campus` and the subtitle
  `Grinnell Family Campus` renders as a separate element. Locks in
  a11y-content F-4 (subtitle moved outside the `<h3>`).

**`__tests__/components/ContactForm.test.tsx`** (1 new test)
- "renders field validation errors in block-level `<p role="alert">` elements" —
  on submit with empty required fields, every rendered error alert is a `<p>`
  element. Locks in a11y-content F-1 (`<span>` → `<p>` for reliable live-region
  announcement).

**`__tests__/components/FocusRing.test.tsx`** (1 new test)
- "suppresses smooth scroll under prefers-reduced-motion" — reads
  `styles/tokens.css` and asserts the `@media (prefers-reduced-motion: reduce)`
  block contains `scroll-behavior: auto`. Locks in a11y-shared #4. Follows the
  file's existing read-CSS-and-assert pattern.

---

## 4. Phase 8F/8G changes deliberately NOT given new tests (rationale)

These were reviewed and intentionally left untested because they are not
meaningfully testable in jsdom, or are covered well enough already:

- **`Footer.tsx` `tablet:grid-cols-2`** (responsive.md correction): a responsive
  Tailwind class string. Not behaviour-testable in jsdom (no layout engine); a
  class-string assertion would be brittle and low-value. Verified at code level
  in the responsive review step.
- **`ProgrammeCard.tsx` removal of `'use client'` + `group-hover:scale-[1.03]`**
  (performance.md): `'use client'` is a build/client-bundle concern, not
  jest-testable; the hover scale is a CSS effect not rendered in jsdom. Existing
  `ProgrammeCard.test.tsx` covers rendering/heading/link/placeholder/stats/axe.
- **`MobileNav.tsx` closing tag `</nav>` → `</div>`** (a11y-shared #1): a JSX
  correctness fix; not a runtime-testable behaviour. The dialog role/structure
  is already covered by the existing dialog tests.
- **`MobileNav.tsx` `useRef<HTMLElement>` → `useRef<HTMLDivElement>`**
  (a11y-shared #3): a TypeScript type-level fix, confirmed by `tsc --noEmit`;
  not a runtime test.
- **Font loading, client-component inventory, static route generation, image
  placeholders** (performance.md / performance-build.md): all confirmed optimal
  or deployment-dependent in the performance steps; no testable regressions.

---

## 5. Verification

Command run (single-run mode, full suite):

```
npm test
```

Result:

```
Test Suites: 36 passed, 36 total
Tests:       413 passed, 413 total
Snapshots:   0 total
Time:        ~24 s
Exit Code:   0
```

Before edits the baseline was **4 failed / 400 passed (404 total)**. After edits:
**0 failed / 413 passed**. The 4 previously-failing tests are fixed and 9 new
focused regression tests were added (404 → 413).

Note: `console.error` "not wrapped in act(...)" messages appear in the output.
These are **pre-existing** warnings from the ContactForm success-path tests
(async form submission state updates) and are unrelated to the new tests; they
are warnings, not failures, and the suite exits 0.

No build, lint, or type-check was run in this step (those belong to other
Phase 8G steps). Only `npm test` was run, as the step requires.
