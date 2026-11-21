# Accessibility Audit — Shared Components
## Scope: `components/layout/` and `components/ui/`

---

## Summary of findings

| # | File | Category | Severity | Status |
|---|------|----------|----------|--------|
| 1 | `components/layout/MobileNav.tsx` | Semantic HTML — wrong closing tag | High | Fixed |
| 2 | `components/layout/MobileNav.tsx` | ARIA — missing `aria-controls` on accordion buttons | Medium | Fixed |
| 3 | `components/layout/MobileNav.tsx` | TypeScript — `useRef<HTMLElement>` on `<div>` | Low | Fixed |
| 4 | `components/layout/Navigation.tsx` | ARIA — imprecise `aria-haspopup` value | Low | Fixed |
| 5 | `styles/tokens.css` | Reduced-motion — `scroll-behavior: smooth` unguarded | Medium | Fixed |
| 6 | `components/layout/Section.tsx` | Focus indicator — `.bg-brand` selector mismatch | High | Fixed |

---

## Findings detail

### 1. MobileNav.tsx — wrong closing tag (Semantic HTML)

**File:** `components/layout/MobileNav.tsx`, line 266

**Issue:** The drawer container is `<div role="dialog" aria-modal="true">` (correctly a `<div>` to hold the dialog role), but the JSX closing tag at line 266 is `</nav>` instead of `</div>`. This is a tag mismatch. React/JSX transpilers may coerce this silently, but some HTML parsers and assistive technologies parsing the serialised DOM will see an unexpected `</nav>` closing tag, which can confuse document structure.

**Fix:** Changed `</nav>` to `</div>`.

---

### 2. MobileNav.tsx — accordion buttons missing `aria-controls` (ARIA)

**File:** `components/layout/MobileNav.tsx`, lines 176–208

**Issue:** The accordion toggle buttons in the mobile drawer have `aria-expanded` but no `aria-controls` attribute. Without `aria-controls`, screen readers cannot programmatically associate the button with the sub-list it shows/hides. The `aria-expanded` attribute alone is valid per ARIA spec, but `aria-controls` is strongly recommended by APG (Accordion pattern) and improves screen reader announcements in JAWS and NVDA.

**Fix:** Added a stable `id` to each sub-list (`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`) and added the matching `aria-controls` attribute to the toggle button.

---

### 3. Navigation.tsx — `aria-haspopup="true"` should be `"menu"` (ARIA)

**File:** `components/layout/Navigation.tsx`, line 100

**Issue:** `aria-haspopup="true"` is a shorthand that the spec maps to the value `"menu"`. However, explicit `aria-haspopup="menu"` is unambiguous and better supported across assistive technologies. The popup's content uses `role="menu"` with `role="menuitem"` children, so `aria-haspopup="menu"` is semantically accurate.

**Fix:** Changed `aria-haspopup="true"` to `aria-haspopup="menu"`.

---

### 4. globals.css — `scroll-behavior: smooth` unguarded (Reduced-motion)

**File:** `app/globals.css`, line 10

**Issue:** `html { scroll-behavior: smooth; }` is set unconditionally. The existing `@media (prefers-reduced-motion: reduce)` block correctly suppresses CSS `transition-duration` and `animation-duration`, but `scroll-behavior: smooth` is not an animation/transition — it is unaffected by those overrides. When a user has enabled "Reduce Motion" in their OS or browser preferences, navigating via the skip-nav link (or any fragment link) will still trigger an animated scroll. WCAG 2.1 SC 2.3.3 (AAA) and the broader principle of respecting user motion preferences require this to be suppressed.

**Fix:** Added `scroll-behavior: auto;` inside the existing `@media (prefers-reduced-motion: reduce)` block in `globals.css`.

---

### 5. Section.tsx — `.bg-brand *:focus-visible` selector mismatch (Focus indicator)

**File:** `components/layout/Section.tsx`, line 22

**Issue:** The brand-background variant was defined as:
```
brand: 'bg-[var(--color-brand)] text-[var(--color-text-on-brand)]'
```
The arbitrary-value class `bg-[var(--color-brand)]` is not the same CSS class as `bg-brand`. The `globals.css` rule `.bg-brand *:focus-visible { outline-color: #ffffff; }` relies on the ancestor having exactly the class `bg-brand`. Since Section used an arbitrary-value form, the CSS selector never matched — interactive elements inside a brand-coloured section received the default green focus ring (`--focus-ring-color: #2D5016`), which is effectively invisible against the same green background.

Tailwind 4's `@theme` block generates `bg-brand` as a utility that sets `background-color: var(--color-brand)`, confirmed in the compiled CSS:
```css
.bg-brand { background-color: var(--color-brand) }
```

**Fix:** Replaced `bg-[var(--color-brand)]` with `bg-brand` in the Section brand variant so the CSS selector matches.

---

## Items confirmed correct (no changes needed)

### Semantic HTML and landmark roles
- `<header>`, `<main id="main-content">`, `<footer>`, `<nav>` landmarks are correctly placed in `app/layout.tsx` and `Header.tsx`.
- `<footer aria-label="Site footer">` is acceptable; the label disambiguates the landmark in JAWS/NVDA's landmark list.
- `<nav aria-label="Main navigation">` in Navigation.tsx and `<nav aria-label="Footer legal links">` in Footer.tsx — both correct.
- Section renders `<section>` element with caller-supplied `aria-labelledby` where pages use it.
- Container's `as` prop allows semantic polymorphism without wrapping in extra divs.

### Accessible names for interactive elements
- All `<button>` elements have either visible text or `aria-label` (hamburger: "Open navigation menu"; close: "Close navigation menu").
- All `<Link>` and `<ButtonLink>` elements have visible text or `aria-label` (logo: "SeedPower Foundation — home").
- External links append `<span class="sr-only"> (opens in new tab)</span>` via ButtonLink.
- Dropdown trigger buttons in Navigation.tsx show visible label text.

### Skip-nav link
- Present in `app/layout.tsx` as the first focusable element in `<body>`.
- Target `#main-content` matches `<main id="main-content">`.
- `tabIndex={-1}` is set on `<main>` for programmatic focus in browsers that require it.
- Skip link is visually hidden by default and appears on focus using the `focus:left-4 focus:top-4` pattern.

### Visible focus indicators
- Global `:focus-visible` rule in `globals.css` applies to all elements.
- Component-level focus ring classes in Header, Navigation, MobileNav, ButtonLink, and Button all use the same design tokens.
- After fixing finding #5, `.bg-brand *:focus-visible` correctly overrides to white on brand backgrounds.

### ARIA usage (remaining)
- `role="dialog" aria-modal="true" aria-label="Navigation"` on MobileNav drawer — correct.
- Focus trap in MobileNav is implemented and accounts for accordion state changes (re-runs when `expanded` changes).
- Body scroll lock in MobileNav is restored on unmount.
- `aria-current="page"` applied to active links in Navigation — correct.
- `role="menu"` and `role="menuitem"` on Navigation dropdown — correct.

### Reduced-motion support
- `globals.css` suppresses `transition-duration` and `animation-duration` under `prefers-reduced-motion: reduce`.
- After fixing finding #4, `scroll-behavior` is also suppressed.
- `Section.tsx` and other layout components use CSS transitions only via design token classes; these are covered by the global rule.
- MobileNav drawer uses `transition-transform` for the slide-in animation; this is covered by the global suppression rule.

### Touch target sizes
- All interactive elements use `min-h-[var(--touch-target-min)]` (44px) or explicit `w-11 h-11` (44px) sizing.
- Hamburger button: `w-11 h-11` = 44×44 px.
- Close button: `w-11 h-11` = 44×44 px.
- Mobile nav accordion buttons: `min-h-[var(--touch-target-min)]` = 44px height; full-width.
- Mobile nav links: `min-h-[var(--touch-target-min)]` = 44px.
- Desktop nav dropdown items: `min-h-[var(--touch-target-min)]` = 44px.
- ButtonLink/Button: `min-h-[var(--touch-target-min)]` = 44px.

---

## Files changed

| File | Change |
|------|--------|
| `components/layout/MobileNav.tsx` | Fixed closing `</nav>` → `</div>`; added `aria-controls` to accordion buttons; fixed `useRef<HTMLElement>` → `useRef<HTMLDivElement>` |
| `components/layout/Navigation.tsx` | Changed `aria-haspopup="true"` → `aria-haspopup="menu"` |
| `styles/tokens.css` | Added `scroll-behavior: auto` inside `prefers-reduced-motion` block |
| `components/layout/Section.tsx` | Changed brand variant from `bg-[var(--color-brand)]` to `bg-brand` |

## Verification

- `npx tsc --noEmit` — 0 errors (was 1 before fixing ref type)
- `npx eslint components/layout/*.tsx components/ui/*.tsx --max-warnings=0` — 0 warnings, 0 errors
- `npx jest --testPathPatterns="(layout|ui)"` — 10/10 tests passed
