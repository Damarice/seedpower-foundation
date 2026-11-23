# Phase 8 — Final Independent Diff Review

**Date:** 2026-11-23  
**Reviewer:** Independent automated review (read-only)  
**Branch:** main (2 commits ahead of origin/main)  
**Verdict:** READY WITH NOTES

---

## 1. Git State

### Modified tracked files (11)

| File | Purpose |
|------|---------|
| `.agents/reviews/semantic-review-multi-model/2026-11-21_17-08-32/review-gpt-5.6-sol.md` | Semantic review document — editorial prose edits only |
| `__tests__/components/MobileNav.test.tsx` | Test additions for accordion `hidden` behaviour and persistent `aria-controls` |
| `__tests__/pages/homepage.test.tsx` | Test updated for `bg-brand` class check on GetInvolvedCTA region |
| `app/(content)/contact/page.tsx` | Contact channels changed from `flex col` to `grid grid-cols-1 tablet:grid-cols-2` |
| `app/layout.tsx` | Skip link uses `focus-visible:` throughout; metadata comment updated |
| `components/composite/ProgrammeCard.tsx` | Added `group-focus-within:scale-[1.03]` alongside `group-hover` |
| `components/layout/MobileNav.tsx` | Sub-list always rendered, hidden via `hidden` attribute; `aria-controls` always valid |
| `components/sections/GetInvolvedCTA.tsx` | Changed to `<Section background="brand">`, removed inline `--focus-ring-color` style |
| `package-lock.json` | Lock file updated for Playwright addition |
| `package.json` | `playwright@^1.65.1` added to devDependencies |
| `styles/tokens.css` | `--breakpoint-tablet/desktop/wide` variables added; `scroll-behavior: auto !important` |

### Untracked files

**`.agents/` tree (all untracked, never staged):**
- `.agents/reviews/semantic-review-multi-model/2026-11-21_17-08-32/final-report.md`
- `.agents/reviews/semantic-review-multi-model/2026-11-21_17-08-32/review-opus-5.md`
- `.agents/tasks/layout-polish/` — 26 files: build/server logs, `design-system.md`, `report.md`, `verification.md`, `visual-audit.md`, `visual-verification.md`, Playwright capture scripts (`capture-after.mjs`, `capture.mjs`, `run-screenshots.mjs`), `dev-server.pid`
- `.agents/tasks/layout-polish/screenshots/after/` — 40 PNG screenshots (~6 MB total, all pages × 4 viewports)
- `.agents/tasks/visual-verification/` — includes `take-screenshots.js` and `screenshots/` directory with 32 PNG screenshots (~4.93 MB total, all pages × 4 viewports)
- `.agents/tasks/phase-8f/` and `.agents/tasks/phase-8g/` — task documentation directories (not staged)

No unexpected files outside the `.agents/` tree were found. No modifications to routes, shared components, or design tokens beyond those listed above.

---

## 2. Source Code Review

### 2.1 `styles/tokens.css`

**Finding: CORRECT**

The `--breakpoint-tablet`, `--breakpoint-desktop`, and `--breakpoint-wide` variables are correctly placed inside the `@theme {}` block. Tailwind v4 CSS-first configuration reads `--breakpoint-*` variables from `@theme` to generate responsive prefixes (`tablet:`, `desktop:`, `wide:`). The comment accurately explains that `--bp-*` variables are retained for `var()` references, while `--breakpoint-*` registers the same values as Tailwind prefixes — no duplication of values.

The reduced-motion block now reads:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  html {
    scroll-behavior: auto !important;
  }
}
```

Adding `!important` to `scroll-behavior: auto` resolves the cascade-defeat issue identified in the prior semantic review. `globals.css` imports `tokens.css` first, then sets `html { scroll-behavior: smooth }`. Without `!important` the base rule would win; with it the reduced-motion override wins regardless of source order. The change is consistent with how the adjacent `transition-duration` and `animation-duration` overrides in the same block are written — all three now use `!important`.

No unintended changes. No existing token values modified.

---

### 2.2 `components/sections/GetInvolvedCTA.tsx`

**Finding: CORRECT**

The component now uses `<Section background="brand" aria-labelledby="get-involved-heading">`. The `Section` component's brand variant applies the `bg-brand` utility class, which means the global `.bg-brand *:focus-visible { outline-color: #fff }` rule in `globals.css` now covers all focusable elements inside this section. The previous inline `style={{ '--focus-ring-color': '#ffffff' }}` has been removed.

This unifies the white-focus-ring mechanism to a single CSS rule. Both `GetInvolvedCTA` and all `Section background="brand"` instances now rely on the same `bg-brand` class. No inline style is present. The `Container` and column grid markup are unchanged. No content, links, or structure were modified.

The homepage test now asserts `expect(region.className).toContain('bg-brand')` instead of checking the inline CSS property — a more robust assertion that tests the mechanism the CSS rule keys on.

---

### 2.3 `components/composite/ProgrammeCard.tsx`

**Finding: CORRECT**

Both the `<img>` element and the placeholder `<div>` now carry:
```
group-hover:scale-[1.03] group-focus-within:scale-[1.03]
```

This restores keyboard-focus image zoom that was lost when the component was converted from a client `useState` component to a server component. The fix is minimal and correct: `group-focus-within` fires when any descendant of the `article.group` receives focus, which matches the old `onFocusCapture` behavior. No `'use client'` directive is needed — `group-focus-within` is a pure CSS selector.

No other changes to the component. JSX structure, stats rendering, `ButtonLink`, and prop types are unchanged.

---

### 2.4 `components/layout/MobileNav.tsx`

**Finding: CORRECT**

Three changes:

1. **Sub-list always rendered.** The `{expanded.has(item.label) && <ul ...>}` conditional render has been replaced with an unconditionally rendered `<ul hidden={!expanded.has(item.label)} ...>`. The `hidden` HTML attribute hides the element visually and from the accessibility tree while keeping the DOM node present, so `aria-controls` always references a valid `id`. This directly fixes the dangling `aria-controls` identified in the semantic review.

2. **Focus trap correct.** The focus trap re-runs whenever `expanded` changes (the `useEffect` dependency array includes `[expanded]`). With the sub-list always in the DOM, collapsed items' child links have `tabindex` unset (they are `<a href>` and `<button>` elements). However, `hidden` elements are excluded from the focusable query (`querySelectorAll`) because browsers do not include elements under a `hidden` ancestor in the focus order. The focus trap's `getFocusable()` call will therefore correctly exclude collapsed sub-list links. This is the correct behavior.

3. **`aria-controls` slug derivation.** `item.label.toLowerCase().replace(/\s+/g, '-')` produces unique IDs across the current NAV_ITEMS (confirmed from inspection). No collision risk.

No changes to focus trap logic, overlay, Escape handler, body scroll lock, or the close button.

**Minor note:** The drawer is `<div role="dialog">` rather than `<nav>`, which removes the `navigation` landmark from mobile. The desktop `<nav aria-label="Main navigation">` in Header still provides the landmark. This is a deliberate architectural decision (modal overlay = dialog role) documented in the component's JSDoc. No change needed.

---

### 2.5 `app/layout.tsx`

**Finding: CORRECT**

The skip link uses `focus-visible:` for all its reveal and styling classes, not the broader `focus:`. This matches the VDD requirement and the focus-ring token pattern used throughout the site. The comment was updated from "pending client confirmation" to "Production domain: seedpowerfoundation.org (see .env.example)." — accurate because `.env.example` already documents the confirmed domain.

No metadata fields were changed. `metadataBase`, `title`, `description`, `openGraph` are identical to the prior committed state. `<html>`, `<body>`, `<main>`, `<Header />`, `<Footer />` structure unchanged.

---

### 2.6 `app/(content)/contact/page.tsx`

**Finding: CORRECT**

The contact channels section changed from a narrow-width `flex flex-col` layout to a default-width `Container` with:
```jsx
<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 desktop:max-w-[800px]">
```

At mobile the two channels (WhatsApp, Facebook) stack vertically. At tablet and above they sit side by side in a two-column grid, capped at 800px on desktop — a sensible layout improvement that matches the visual design direction's principle of using horizontal space on larger viewports. No content was changed: channel titles, links, `aria-label` values, and SVG icons are identical.

The `desktop:max-w-[800px]` utility applies an inline arbitrary value. This is valid Tailwind v4 syntax and will be compiled correctly.

---

### 2.7 Test files

#### `__tests__/pages/homepage.test.tsx`

**Finding: CORRECT**

The changed assertion:
```js
it('applies the bg-brand class on the Get Involved section so the white focus-ring CSS rule fires', () => {
  const region = screen.getByRole('region', { name: /get involved/i });
  expect(region.className).toContain('bg-brand');
});
```

This replaced a check for `style.getPropertyValue('--focus-ring-color')`. The new assertion is more meaningful: it tests that the class the CSS rule keys on is present, rather than testing an inline style that was replaced. All other assertions are unchanged.

#### `__tests__/components/MobileNav.test.tsx`

**Finding: CORRECT**

Two new tests:

1. `'sub-list changes from hidden to visible after expanding the accordion'` — queries the sub-list by the `aria-controls` ID, asserts `hidden` attribute present before click and absent after. This directly exercises the new `hidden`-attribute mechanism.

2. `'toggling an open accordion item collapses it again'` — covers the toggle-off path.

3. `'accordion buttons expose aria-controls pointing to a persistently-rendered sub-list'` — iterates all expand buttons, asserts `aria-controls` matches `/^mobile-nav-/`, and asserts `document.getElementById(controlsId)` is non-null in the collapsed state. This is the right behavioral assertion for the DOM-persistence fix.

The `axe` test remains and covers the rendered component in its default (all-collapsed) state.

---

### 2.8 `.agents/reviews/.../review-gpt-5.6-sol.md`

**Finding: CORRECT — editorial only**

The diff is entirely prose edits: sentences condensed, redundant words removed, structure preserved. The findings, issue numbers, code excerpts, and conclusions are unchanged in substance. The file's content is a semantic review artifact, not source code. No new claims were introduced and no prior findings were removed or reversed.

---

### 2.9 `package.json` / `package-lock.json`

**Finding: CORRECT**

`playwright@^1.65.1` is the only addition. It is in `devDependencies`, not `dependencies`, which is correct — Playwright is a test/tooling dependency and must not be bundled into the production application. No other dependencies were added, removed, or version-bumped. `package-lock.json` reflects only the Playwright addition (32-line diff).

---

## 3. Untracked Files Assessment

### 3.1 Screenshots

| Location | Count | Total size | Assessment |
|----------|-------|-----------|------------|
| `.agents/tasks/visual-verification/screenshots/` | 32 PNG | ~4.93 MB | Exclude from commit |
| `.agents/tasks/layout-polish/screenshots/after/` | 40 PNG | ~6.0 MB | Exclude from commit |

**Recommendation: Exclude.** PNG screenshots are binary files that inflate repository size permanently with little benefit — they cannot be diffed, they go stale as the site evolves, and they are only useful during the review window when they were captured. The verified layout state is already documented in the written reports. The screenshots should be added to `.gitignore`.

### 3.2 Agent task documentation

| Location | Files | Assessment |
|----------|-------|-----------|
| `.agents/tasks/layout-polish/report.md`, `verification.md`, `visual-audit.md`, `visual-verification.md`, `design-system.md` | 5 Markdown files | **Useful — worth keeping** |
| `.agents/tasks/layout-polish/` server/build logs (`*.log`, `*.pid`) | ~20 files | **Temporary artifacts — exclude** |
| `.agents/tasks/layout-polish/` Playwright scripts (`capture.mjs`, `capture-after.mjs`, `run-screenshots.mjs`, `take-screenshots.js`) | 4 scripts | **Keep if useful for future audits; otherwise exclude** |
| `.agents/reviews/semantic-review-multi-model/2026-11-21_17-08-32/final-report.md`, `review-opus-5.md` | 2 Markdown files | **Useful project documentation — worth keeping** |
| `.agents/tasks/phase-8f/`, `.agents/tasks/phase-8g/` | directories | **Useful audit trail — worth keeping** |
| `.agents/tasks/visual-verification/take-screenshots.js` | 1 script | **Keep alongside screenshots decision** |

**Summary:** The Markdown reports and reviews under `.agents/` are genuinely useful project documentation (audit trail, design decisions, verification evidence). The log files (`*.log`, `*.pid`) and binary screenshots are temporary artifacts.

### 3.3 Playwright capture scripts

`take-screenshots.js` uses `require()` syntax (CommonJS), which is what the ESLint `@typescript-eslint/no-require-imports` rule flags (see Section 5 below). It is a standalone Node script, not part of the TypeScript application. If committed, it needs either an ESLint override or conversion to ESM.

---

## 4. Secrets and Scope Check

- No `.env` files modified. Only `.env.example` is tracked and it contains placeholder values, not real secrets.
- No `.env.local`, `.env.production`, or `.env.development` files are present in the working tree.
- No credentials, API keys, tokens, or passwords appear in any modified file or in the diff.
- All changes are confined to Phase 8 scope: accessibility fixes, responsive token registration, test coverage, and agent artifacts.
- No routes, sitemap, metadata fields, content, or design decisions outside Phase 8 were modified.
- **Clean.**

---

## 5. Verification Results

### TypeScript

```
> tsc --noEmit
(no output — exit 0)
```

**Result: CLEAN.** No type errors.

### ESLint

```
.agents/tasks/visual-verification/take-screenshots.js
  1:22  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports
  2:14  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports
  3:12  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports
✖ 3 problems (3 errors, 0 warnings)
Exit code: 1
```

**Result: 3 ESLint errors.** All three are in the untracked file `.agents/tasks/visual-verification/take-screenshots.js` — a Playwright capture script that uses `require()`. The TypeScript application source files (`app/`, `components/`, `styles/`, `lib/`, `__tests__/`) produce no ESLint errors.

**Assessment:** These errors do not affect the production application or the test suite. `take-screenshots.js` is never imported by application code. However, if this file is committed, the `npx eslint .` command will continue to fail. Options:
1. Add `.agents/` to `.eslintignore` (or the ESLint `ignores` config).
2. Convert the script to ESM (`import` syntax).
3. Exclude the file from the commit.

The most direct fix is to add `.agents/` to the ESLint ignore list, since all agent artifacts under that directory are tooling/documentation, not application code.

### Tests

```
Test Suites: 36 passed, 36 total
Tests:       413 passed, 413 total
Snapshots:   0 total
Time:        39.245 s
Exit code: 0
```

**Result: 413/413 PASSED.** This matches the previously reported count. All 36 suites pass, including the new MobileNav and homepage assertions.

### Production build

```
▲ Next.js 16.4.6 (Turbopack)
✓ Compiled successfully in 5.2s
✓ TypeScript in 7.8s
✓ Collecting page data (22 routes) in 4.2s
✓ Generating static pages (22/22) in 4.0s
✓ Finalising page optimisation in 100ms
Exit code: 0
```

4 CSS optimisation warnings appear during the build. These are pre-existing: they relate to Tailwind CSS parsing example/comment classes in source (`--container-max/wide/narrow`, `--text-*`, `--...`). They were present before this phase's changes and do not affect the produced CSS. All 22 routes build successfully.

**Result: BUILD SUCCESSFUL.**

---

## 6. Readiness Verdict

**READY WITH NOTES**

All source code changes are correct, internally consistent, and consistent with Architecture v1.2 and VDD v2.0. The Phase 8 accessibility issues identified in the semantic review have been properly addressed:

- `scroll-behavior: auto !important` wins the cascade correctly.
- GetInvolvedCTA uses `bg-brand`, unifying the focus-ring mechanism.
- ProgrammeCard restores keyboard image zoom via `group-focus-within`.
- MobileNav sub-lists are always in the DOM; `aria-controls` is never dangling.
- Skip link uses `focus-visible:` throughout.
- Contact page uses a responsive grid layout.

**Notes before committing:**

1. **ESLint fails** due to `require()` in `.agents/tasks/visual-verification/take-screenshots.js`. Add `.agents/` to `.eslintignore` (or equivalent ESLint config `ignores`) before committing, or exclude that file from the commit. This is the only blocker on a clean CI lint run.

2. **Screenshots (~11 MB total binary PNGs)** in `.agents/tasks/visual-verification/screenshots/` and `.agents/tasks/layout-polish/screenshots/after/` should be gitignored before staging `.agents/`. They are temporary verification artifacts with no ongoing value in the repository.

3. **Log files** in `.agents/tasks/layout-polish/` (`*.log`, `dev-server.pid`) are build/server runtime artifacts and should also be excluded.

4. **`scroll-behavior` test coverage** (pre-existing limitation, not introduced by this phase): `__tests__/components/FocusRing.test.tsx` asserts that the `scroll-behavior: auto` rule exists in tokens.css source, not that it wins the cascade. Now that `!important` has been added, the behavioral outcome is correct — but the test still proves source presence, not cascade outcome. This does not block the commit; it is a test quality note for a future improvement.

5. **Production metadata** depends on `NEXT_PUBLIC_SITE_URL` being set at build time. This is a deployment concern, not a code defect. The comment in `layout.tsx` now correctly points to `.env.example` and the deployment documentation.

---

## 7. Recommended `.gitignore` Additions

Add the following to `.gitignore` before committing the `.agents/` tree:

```gitignore
# Agent task artifacts — screenshots and runtime logs
.agents/tasks/**/screenshots/
.agents/tasks/**/*.log
.agents/tasks/**/*.pid

# If the ESLint issue with take-screenshots.js is resolved by exclusion:
# .agents/
# (or scope to just the scripts directory)
```

If the entire `.agents/` directory is intended to be untracked (agent workspace only), the simplest approach is:

```gitignore
.agents/
```

If the Markdown documentation under `.agents/` (reports, reviews, verification records) is worth preserving in the repository, use a more selective pattern:

```gitignore
# Keep .agents/ Markdown documentation; exclude binary and runtime artifacts
.agents/tasks/**/screenshots/
.agents/tasks/**/*.log
.agents/tasks/**/*.pid
.agents/tasks/**/node_modules/
```
