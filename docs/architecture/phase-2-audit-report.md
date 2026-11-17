# SeedPower Foundation — Phase 2 Independent Compliance Audit

**Date:** Audit performed against commit `318514b` (HEAD, `main`)  
**Auditor:** Independent compliance review  
**Scope:** Phase 2 implementation — design system, component library, test suite  
**Authoritative specs:** Visual Design Direction v2.0, Technical Implementation Architecture v1.2, Phase 1 Implementation Decisions

---

## Executive Summary

The Phase 2 implementation is **substantially compliant** with the authoritative specifications. All core components exist, token usage is correct, accessibility semantics are sound, and the test suite is meaningfully written rather than perfunctory. Several findings require correction before approval:

1. **Medium severity:** Ghost button padding in both `Button.tsx` and `ButtonLink.tsx` does not match the v2.0 specification exactly (10px vertical instead of the specified value, see §3).
2. **Low severity:** Three hardcoded hex values (`#333333`, `#111111`, `#e3ecd8`) appear in `Button.tsx` and `ButtonLink.tsx` for secondary hover/active and ghost active states. The design direction specifies these exact values, but they are not in `tokens.css` as named tokens.
3. **Low severity:** `Section.tsx` has no test file. The seven listed test suites do not cover `Section`.
4. **Low severity (non-blocker):** `cn()` in `lib/cn.ts` is a minimal string-join utility without conflict resolution (no `tailwind-merge`). This is correct for the architecture's intent but means conflicting Tailwind classes passed via `className` are not resolved — a future footgun to document.
5. **Informational (not a defect):** The `link` variant question is answered definitively below (§5).
6. **Informational:** The React `act()` warning in `ButtonLink.test.tsx` root cause is diagnosed below (§7).

No spec violations exist in token values, layout sizing, typography defaults, accessibility structure, or external link handling.

---

## 1. Specification Compliance

| Requirement | Status | Evidence |
|---|---|---|
| All CSS tokens match v2.0 Section 1 values | **Pass** | `styles/tokens.css` values verified against v2.0 tables |
| Tailwind 4 CSS-first configuration (`@theme`) | **Pass** | `styles/tokens.css` uses `@theme {}` block |
| Responsive typography overrides (768px, 1024px) | **Pass** | `tokens.css` `@media` blocks set correct rem values |
| `app/globals.css` correct Tailwind import | **Pass** | `@import "tailwindcss"` present |
| Global `:focus-visible` rule using token vars | **Pass** | `app/globals.css` lines 15–18 |
| `prefers-reduced-motion` suppresses transitions | **Pass** | Both `tokens.css` (token zeroing) and `globals.css` (style zeroing) cover this |
| Button: 3 variants (primary, secondary, ghost) | **Pass** | `Button.tsx` and `ButtonLink.tsx` |
| Button: 2 sizes (default, sm) | **Pass** | `sizeStyles` and `ghostSizeStyles` in both |
| Button: ghost 2px less padding each axis | **Partial** | See §3 — ghost padding differs from spec by 2px vertically |
| Button: disabled state uses correct tokens | **Pass** | `disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]` |
| Button: disabled cursor not-allowed | **Pass** | `disabled:cursor-not-allowed` |
| Button: focus ring uses token vars | **Pass** | `focus-visible:outline-[length:var(--focus-ring-width)]` etc. |
| Button: touch target min 44px | **Pass** | `min-h-[var(--touch-target-min)]` |
| Button renders `<button>` only, no href | **Pass** | `ButtonHTMLAttributes<HTMLButtonElement>`, no href prop |
| ButtonLink: Next.js Link for internal | **Pass** | `NextLink` used when `shouldOpenExternal` is false |
| ButtonLink: `<a target=_blank rel=noopener noreferrer>` for external | **Pass** | Implemented; also auto-detects `http://`, `https://`, `mailto:`, `tel:` |
| ExternalLink: sr-only new-tab hint | **Pass** | `<span className="sr-only"> (opens in new tab)</span>` |
| Card: `as` polymorphic prop | **Pass** | Accepts `ElementType`; tested with div, article, li |
| Card: hover shadow, flat default | **Pass** | `shadow-[var(--shadow-none)] hover:shadow-[var(--shadow-card)]` |
| Card: responsive padding (16/20/24px) | **Pass** | `p-4 tablet:p-5 desktop:p-6` |
| Card: `--radius-md` border radius | **Pass** | `rounded-[var(--radius-md)]` |
| Card: `--transition-std` transition | **Partial** | Uses `duration-[var(--transition-std)]` — see §3 for a minor concern |
| Typography: Manrope for headings | **Pass** | `font-[var(--font-heading)]` on all Heading variants |
| Typography: Inter for body/UI | **Pass** | `font-[var(--font-body)]` on all Text variants |
| Typography: semantic heading defaults | **Pass** | `defaultHeadingTag` maps hero→h1, h1→h1, h2→h2, h3→h3, h4→h4 |
| Typography: responsive font-size via tokens | **Pass** | CSS custom properties; responsive overrides in `tokens.css` |
| Typography: letter-spacing tokens | **Pass** | hero and h1 use `tracking-[var(--text-hero--ls)]` and `tracking-[var(--text-h1--ls)]` |
| Container: 3 variants with token values | **Pass** | `max-w-[var(--container-max/wide/narrow)]` |
| Container: responsive padding via tokens | **Pass** | `px-[var(--container-padding-mobile)] tablet:px-[var(--container-padding-tablet)]` |
| Section: 5 background variants | **Pass** | white, soft, warm, brand, dark — all use CSS variable references |
| Section: brand/dark switch text colour | **Pass** | `brand` → `text-[var(--color-text-on-brand)]`, `dark` → `text-[var(--color-text-on-dark)]` |
| Section: responsive vertical padding | **Pass** | `py-[var(--space-8)] tablet:py-[var(--space-10)] desktop:py-[var(--space-16)]` |
| Input/Textarea: accept standard HTML attributes | **Pass** | Both extend their respective `HTMLAttributes` interfaces |
| Input/Textarea: label association (primitive level) | **N/A** | Architecture defers label to composite level (see §6) |
| No Astra/unapproved colours | **Pass** | No `#00d084`, `#0693e3`, `#ff6900`, `#5e2d3b`, `#9b51e0`, `#fcb900` found |
| Jest + RTL + jest-axe test suite | **Pass** | 7 test files, `jest-axe` present, `jest.config.ts` correct |

---

## 2. Component Findings

### `components/ui/Button.tsx`

- **Correct:** Renders `<button>` element only. `ButtonHTMLAttributes` props forwarded. No `href` prop accepted.
- **Correct:** All three variants use CSS variable references for brand colours.
- **Correct:** `disabled:` Tailwind modifiers use `var(--color-bg-disabled)` and `var(--color-text-disabled)`.
- **Correct:** Focus ring uses four token variables (`--focus-ring-width`, `--focus-ring-color`, `--focus-ring-style`, `--focus-ring-offset`).
- **Correct:** `min-h-[var(--touch-target-min)]` enforces 44px touch target.
- **Issue (Low):** Secondary hover `#333333` and active `#111111`, ghost active `#e3ecd8` are hardcoded hex values not in `tokens.css`. They are correct values per the design direction, but they are unnamed tokens. If the design direction changed, they would have to be hunted down in component code rather than updated in one token file.
- **Issue (Medium):** Ghost button size inconsistency — see §3.
- **Note:** `disabled:pointer-events-none` is present. This prevents the `:hover` background change on disabled ghost buttons — correct behaviour. However, it also prevents `onClick` from firing even without the `disabled` attribute, if only the class is applied. This is not a current API issue since disabled state only flows through the `disabled` prop, but is worth noting for future maintainers.

### `components/ui/ButtonLink.tsx`

- **Correct:** `isExternal()` correctly identifies `http://`, `https://`, `mailto:`, `tel:` as external.
- **Correct:** External path renders `<a target="_blank" rel="noopener noreferrer">` with sr-only hint.
- **Correct:** Internal path renders Next.js `<NextLink>`.
- **Correct:** `external` prop overrides auto-detection.
- **Correct:** Ghost padding offset applied identically to `Button.tsx`.
- **Issue (Low):** Same hardcoded hex values as `Button.tsx` (`#333333`, `#111111`, `#e3ecd8`).
- **Issue (Medium):** Ghost padding — see §3.
- **Note:** `ButtonLinkProps` does not extend a standard HTML attributes interface (e.g., `AnchorHTMLAttributes`). It defines `onClick?: () => void` and `className?: string` manually. This means data attributes, `aria-*`, and other anchor attributes cannot be passed to the rendered element. For current Phase 2 usage this is not blocking, but it is a type-safety gap that will surface in Phase 4 when pages need to pass `aria-current` or `data-*` attributes.

### `components/primitives/ExternalLink.tsx`

- **Correct:** `target` defaults to `_blank`, overridable by caller.
- **Correct:** `rel` defaults to `noopener noreferrer`, overridable by caller.
- **Correct:** Sr-only hint `(opens in new tab)` appended as `<span className="sr-only">`.
- **Correct:** Extends `AnchorHTMLAttributes<HTMLAnchorElement>` — full HTML attribute pass-through.
- **Note:** The `rel` and `target` override design may allow callers to open external links without `noopener noreferrer` by passing a different `rel`. This is intentional (the JSDoc comment shows overridability) but is a minor risk if misused.

### `components/primitives/Link.tsx`

- **Correct:** Wraps `NextLink` with full `NextLinkProps` + `AnchorHTMLAttributes` typing. No concerns.

### `components/primitives/Input.tsx` and `components/primitives/Textarea.tsx`

- **Correct:** Both are thin, unstyled wrappers that accept all standard HTML attributes.
- **Correct:** Architecture v1.2 Section 2 notes that `FormField` was removed and label/error are merged into `Input.tsx` and `Textarea.tsx`. However, the primitive implementations are intentionally unstyled pass-throughs. The architecture's acceptance criteria for Phase 4 require label rendering and `aria-describedby` at the **composite** (`ContactForm.tsx`) level, not at the primitive level. The primitives as written are correct for their role in the component hierarchy.
- **Observation:** No `id` prop is required by these primitives, but callers must pass it to associate `<label htmlFor="">`. The primitive does not enforce this — consistent with its unstyled/unstructured role.

### `components/ui/Card.tsx`

- **Correct:** `as` prop is typed as `ElementType` — accepts any valid React element type (string tags or components). This is intentionally permissive; TypeScript does not restrict it to block-level elements. This is noted as an informational item, not a defect, as it matches the architecture's intent and the alternative (a constrained union type) was not specified.
- **Correct:** All style values reference CSS variables. No hardcoded px or hex values.
- **Correct:** `overflow-hidden` present for image zoom containment.
- **Minor:** `transition-shadow duration-[var(--transition-std)]` — Tailwind 4 arbitrary `duration-[...]` accepts a full value string. `var(--transition-std)` resolves to `200ms ease-out`, which is a full shorthand. The `duration-` utility in Tailwind expects only the duration number (e.g., `200ms`), not a shorthand including `ease-out`. This may not apply the `ease-out` easing. The shadow transition in browsers will still work (defaulting to `ease`) but the easing will not match the token exactly. This is a low-priority correctness issue. The recommended fix is `transition-shadow` (Tailwind's utility generates `transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4,0,0.2,1); transition-duration: 150ms` by default) plus `duration-200` (hardcoded), or use an inline style for the full shorthand.

### `components/ui/Badge.tsx`

- **Correct:** Renders `<span>`. Two variants (brand, neutral) using CSS variable references.
- **Correct:** `rounded-[var(--radius-full)]` for pill shape.
- **Accessibility note:** Badge renders as a plain `<span>`. If used to convey status (e.g., "New", "Active") within a larger interactive element, it may need `role="status"` or `aria-label` at the usage site. As a primitive, this is acceptable; the calling component is responsible. No defect at the primitive level.

### `components/ui/Typography.tsx` (Heading and Text)

- **Correct:** `Heading` defaults: hero→`h1`, h1→`h1`, h2→`h2`, h3→`h3`, h4→`h4`. Heading hierarchy is not broken by default.
- **Correct:** `as` prop override available to allow visual/semantic decoupling (e.g., `<Heading variant="h2" as="h3">` for a visually large subsection inside an `<h3>` context).
- **Correct:** All font-size, line-height, and letter-spacing values use CSS custom property references.
- **Correct:** Manrope (`--font-heading`) used for all heading variants; Inter (`--font-body`) used for all text variants.
- **Correct:** `h2` and `h3` have no letter-spacing — matches v2.0 (letter-spacing: 0 for those levels).
- **Correct:** `hero` and `h1` have `tracking-[var(--text-hero--ls)]` and `tracking-[var(--text-h1--ls)]` respectively.
- **Minor:** `HeadingProps` extends `HTMLAttributes<HTMLHeadingElement>`, which is correct for the common case. When `as` renders a non-heading element (e.g., `as="div"`), the type still allows heading-specific ARIA attributes but this is not a correctness problem in practice.
- **Missing token:** `--text-label-sm` is used in `Text` variant `label-sm` but no `--lh` token exists for it in `tokens.css`. The `label-sm` variant lacks a `leading-` class. This is a minor omission — it will inherit the browser default line-height (`normal`, ~1.2). The spec shows `--text-label-sm` with `line-height: 1` but no token was defined. Affects only the `label-sm` variant.

### `components/layout/Container.tsx`

- **Correct:** Three variants — `max-w-[var(--container-max)]`, `max-w-[var(--container-wide)]`, `max-w-[var(--container-narrow)]`.
- **Correct:** `mx-auto w-full` for centring.
- **Correct:** Responsive horizontal padding using token variables.
- **Correct:** `as` prop for polymorphic element (defaults to `div`).

### `components/layout/Section.tsx`

- **Correct:** Five background variants — white, soft, warm, brand, dark — all using CSS variables.
- **Correct:** Text colour switches automatically for brand (`--color-text-on-brand`) and dark (`--color-text-on-dark`).
- **Correct:** Responsive vertical padding using `--space-8`, `--space-10`, `--space-16` tokens with `tablet:` and `desktop:` responsive prefixes.
- **Always renders `<section>`.** This is semantically correct for page sections but means every Section is a landmark region. If used for small non-landmark content blocks, callers should be aware.
- **Missing test:** No test file for `Section.tsx` — see §6.

### `components/index.ts`, `components/ui/index.ts`, `components/layout/index.ts`, `components/primitives/index.ts`

- **Correct:** All components and their TypeScript types are re-exported. The barrel chain (`components/index.ts` → all three sub-indexes) is complete and consistent.

### `lib/cn.ts`

- **Correct:** Minimal utility — filters falsy values and joins. No external dependencies.
- **Known limitation:** Unlike `clsx` + `tailwind-merge`, this utility does not resolve conflicting Tailwind classes (e.g., `cn('p-4', 'p-6')` produces `'p-4 p-6'` and the browser's specificity order determines which wins). This can produce subtle bugs when `className` overrides are passed by callers. This is not a defect for current Phase 2 usage since components use arbitrary value syntax (`px-[var(...)]`) rather than scale utilities, so conflicts are uncommon. Document this limitation clearly.

---

## 3. Missing Requirements

### Link-style button variant — Definitive Answer

**The link-style variant is not required and is not missing.**

Visual Design Direction v2.0, Section 2.5, states explicitly: **"Three variants only. No other button styles may be introduced."** The consistency rules (Rule 6) reinforce this: "Only the three defined button variants may be used."

There is no "link" variant (text-only, no background/border) anywhere in the design direction or architecture. The architecture's Section 4.2 defines `ButtonVariant = 'primary' | 'secondary' | 'ghost'`. Inline text links (body-text anchors) are handled by `Link.tsx` and `ExternalLink.tsx` primitives, styled via `globals.css` and direct `className` application — not as a button variant.

**Verdict: Not a gap. The implementation correctly implements exactly three variants.**

### Ghost button padding discrepancy

The design direction v2.0 Section 2.5 specifies:

- **Ghost default:** padding `10px 22px` (2px less each axis than primary's `12px 24px`)
- **Ghost small:** padding `6px 14px` (2px less each axis than primary small's `8px 16px`)

The implementation in `Button.tsx` and `ButtonLink.tsx`:

```typescript
const ghostSizeStyles = {
  default: 'px-[22px] py-[10px] text-base font-semibold',  // 10px vertical ✓, 22px horizontal ✓
  sm: 'px-[14px] py-[6px] text-sm font-semibold',          // 6px vertical ✓, 14px horizontal ✓
};
```

**On re-inspection: the ghost padding is correct.** The default ghost is `22px 10px` (22 horizontal, 10 vertical) which is exactly 2px less per axis than primary default `24px 12px`. The small ghost is `14px 6px` vs primary small `16px 8px`. Both match the spec. This is **not a defect**. I am withdrawing the medium-severity finding stated in the executive summary — the padding is compliant.

---

## 4. Accessibility Findings

### Confirmed correct

- **Button:** Native `<button>` element gives keyboard operability and screen reader announcement for free. The `disabled` attribute (not just CSS class) is used, so disabled state is announced by screen readers.
- **ButtonLink:** Internal links use Next.js `<Link>` (renders as `<a>`), giving proper keyboard/SR operation. External links use `<a target="_blank">` with sr-only hint.
- **ExternalLink:** Screen readers announce "(opens in new tab)" after the link text.
- **Typography:** Semantic heading elements are the defaults. The `as` override is available for deliberate decoupling.
- **Focus ring:** Global `:focus-visible` rule in `globals.css` applies to all elements. Component-level `focus-visible:` Tailwind classes also set the ring. Both use token variables. The global rule ensures fallback coverage.
- **Reduced motion:** `tokens.css` zeroes transition tokens under `prefers-reduced-motion`. `globals.css` zeroes `transition-duration` and `animation-duration` with `!important`. This is redundant (both cover it) but correct.
- **Card hover transition:** The Card's hover shadow animation will be suppressed by the `prefers-reduced-motion` token zeroing.
- **Section brand/dark text switching:** Automatic — no manual override required by callers.

### Confirmed gaps

1. **Badge has no `role` or `aria-label`.** As a plain `<span>`, it has no WCAG issues in isolation, but if used as a status indicator it needs `role="status"` or `role="img"` with `aria-label` at the usage site. The primitive does not guide callers toward this. This is a documentation gap, not a code defect at the primitive level.

2. **ButtonLink does not accept `aria-*` props.** `ButtonLinkProps` is a manually-typed interface without `AnchorHTMLAttributes`. This means `aria-current="page"` (needed for active nav links) and `aria-label` cannot be passed. This will become a real gap in Phase 3 navigation. Recommended fix: `ButtonLinkProps` should extend `React.AnchorHTMLAttributes<HTMLAnchorElement>` with `href` overridden.

3. **Card interactive use not addressed.** When `Card` is used with `as="a"` or `as="button"` for a clickable card pattern, there is no focus ring defined in the base Card styles. The global `:focus-visible` rule provides a ring, but there is no `cursor-pointer` or `hover:` state guidance. Phase 2 may not require this, but it is an upcoming gap for `ProgrammeCard`.

4. **Input/Textarea: label association is not enforced.** The primitives accept `id` and `aria-describedby` as pass-through attributes but do not require them. Callers can and must provide accessible labels — this is correct per the architecture's design but means no test currently catches a label-less input.

5. **No test for Section's accessibility.** `Section.tsx` renders a `<section>` element. Without an accessible name (via `aria-labelledby` or `aria-label`), `<section>` elements are not landmark regions in the accessibility tree. This is acceptable for Phase 2 since Section is a layout primitive — callers add headings. But the absence of a test means this design decision is undocumented.

---

## 5. Test Quality Assessment

**7 test files. Meaningful coverage assessment:**

### `Button.test.tsx` (13 tests)

Quality: **Good.** Tests verify rendered element type, variant-specific class names (`bg-[var(--color-brand)]`, `bg-[var(--color-bg-dark)]`, `border-2 bg-transparent`), size class (`text-sm`), disabled attribute, focus ring class, touch target class, `className` pass-through, and two axe checks (enabled and disabled). These are substantive assertions about behaviour, not just render-doesn't-throw.

Gap: No test verifies the disabled ghost variant border changes to `--color-bg-disabled`. The spec requires this and the implementation includes `disabled:border-[var(--color-bg-disabled)]`, but no test covers it.

### `ButtonLink.test.tsx` (12 tests)

Quality: **Good.** Tests verify internal (`<Link>`) vs external (`<a>`) routing, `target="_blank"` and `rel` on external, auto-detection of `https://` and `mailto:`, sr-only hint presence, absence of `target="_blank"` for internal, variant class names, size class, and two axe checks.

Gap: No test asserts that `tel:` hrefs are auto-detected as external. The implementation covers `tel:` in `isExternal()` but no test verifies it.

### `Badge.test.tsx` (7 tests)

Quality: **Acceptable.** Tests cover element type, default variant, brand variant (both bg and text classes), pill radius class, `className` pass-through, and one axe check. Adequate for the component's simplicity.

### `Card.test.tsx` (8 tests)

Quality: **Good.** Tests cover children rendering, default element type, `as="article"`, `as="li"`, base style classes, hover shadow class, `className` pass-through, and one axe check. The polymorphic element tests are genuinely valuable.

Gap: No test for the transition class. No test for responsive padding classes (`p-4`, `tablet:p-5`, `desktop:p-6`) — these would require a jsdom environment that understands Tailwind breakpoints, which is outside the scope of unit tests anyway; this gap is acceptable.

### `Container.test.tsx` (10 tests)

Quality: **Good.** Tests cover children, default element type, `as="main"`, all three `max-w-` variant classes, mobile padding class, `mx-auto`, `className` pass-through, and one axe check. Comprehensive for a layout primitive.

Gap: No test for the tablet padding class (`tablet:px-[var(--container-padding-tablet)]`). Same caveat as Card — breakpoint-dependent classes cannot be tested in jsdom.

### `ExternalLink.test.tsx` (8 tests)

Quality: **Good.** Tests cover rendered element type, `target="_blank"`, `rel="noopener noreferrer"`, correct href, sr-only hint text presence, sr-only hint having the `sr-only` class, children text, and one axe check. Directly verifies the security and accessibility requirements of the component.

### `Typography.test.tsx` (21 tests across Heading and Text)

Quality: **Good.** Tests cover all five heading variants rendering as the correct semantic element, the `as` override, heading font token class, h2 font-size token class, default variant, `className` pass-through, all major Text variants (body-lg, body-sm, caption, label, nav), caption and label token classes, `as` override for Text, body font token class, default Text variant, and two axe checks.

**Notably missing:** No test for `Section.tsx`. Given the Section component is part of the deliverables and is exported from `components/layout/index.ts`, the absence of any test file for it is a gap.

### Overall test quality assessment

The 79 tests (count includes axe checks) are **substantively meaningful**. They assert class names, element types, attribute values, and accessibility tree structure — not merely that render does not throw. The axe integration is genuine (each test file has at least one `axe()` call with `toHaveNoViolations()`).

The main coverage gaps are:
- No `Section.test.tsx`
- No test for `tel:` external auto-detection in ButtonLink
- No test for disabled ghost border styling in Button
- No test for `label-sm` missing line-height

---

## 6. React `act()` Warning — Root Cause

### What the warning looks like

The warning appears in `ButtonLink.test.tsx` when rendering `<ButtonLink href="/give/donate">Donate</ButtonLink>` (the internal link case). It reads approximately:

> Warning: An update to `SomeComponent` inside a test was not wrapped in `act(...)`.

### Root cause

Next.js `<Link>` (imported as `NextLink`) is a client-side React component. In Next.js 16, the `<Link>` component internally uses React state or effects (specifically for prefetching state management and router context) during the render lifecycle in jsdom. When `render()` from React Testing Library is called without wrapping in `act()`, React's internal state updates that occur asynchronously during mount (triggered by the `Link` component's prefetch logic attempting to interact with a router context that does not exist in jsdom) fire outside an `act()` boundary.

**This is not a test implementation error.** The test is written correctly — `render()` from `@testing-library/react` wraps synchronous renders in `act()` automatically. The warning occurs because `NextLink` triggers additional asynchronous state updates *after* the synchronous render completes, and those post-render updates occur outside the `act()` scope of the initial `render()` call.

**This is a known, benign issue** with testing Next.js `<Link>` in jsdom. The `<Link>` component attempts router context operations (prefetch scheduling) that do not complete synchronously and there is no meaningful router context in jsdom. The test assertions still pass correctly because the DOM output of `<Link>` (the rendered `<a>` element) is determined in the synchronous render, before the async state updates.

### Recommended treatment

The correct treatment is **not** to globally suppress `console.error` or mock it away.

The recommended approach is to wrap the specific `render()` calls that cause the warning in `act()` from `@testing-library/react`:

```tsx
import { render, screen, act } from '@testing-library/react';

it('renders a Next.js <Link> for internal hrefs', async () => {
  await act(async () => {
    render(<ButtonLink href="/give/donate">Donate</ButtonLink>);
  });
  const link = screen.getByRole('link', { name: 'Donate' });
  expect(link).toHaveAttribute('href', '/give/donate');
});
```

Alternatively, mock `next/navigation` and `next/link` in the test setup to avoid the router context issue entirely — this is the approach used by Next.js's own test suite and by many community testing utilities.

**The warning does not affect test correctness.** It is cosmetic noise, but it should be resolved to keep the test output clean and to avoid masking genuine `act()` warnings in future tests.

---

## 7. Required Corrections (Ordered by Severity)

### Medium

None after re-reading the ghost padding implementation — it is correct.

### Low

1. **`lib/cn.ts` — document the no-conflict-resolution limitation** (not a code change; add a JSDoc comment warning that conflicting Tailwind utilities are not merged). This prevents future contributors from passing conflicting `className` overrides and expecting Tailwind-merge behaviour.

2. **`components/ui/Button.tsx` and `components/ui/ButtonLink.tsx` — tokenise `#333333`, `#111111`, `#e3ecd8`** in `styles/tokens.css`. Add:
   ```css
   --color-bg-dark-hover:   #333333;
   --color-bg-dark-active:  #111111;
   --color-brand-active-surface: #e3ecd8;
   ```
   Then reference them as `var()` in the component files. This is a low-priority housekeeping correction; the current hex values are correct per the design direction.

3. **`components/ui/ButtonLink.tsx` — extend `AnchorHTMLAttributes`** to allow `aria-*` and `data-*` props:
   ```typescript
   export interface ButtonLinkProps
     extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
     href: string;
     // ...remaining props
   }
   ```
   This is needed before Phase 3 navigation (active link styling with `aria-current`).

4. **`components/ui/Card.tsx` — transition easing** — replace `transition-shadow duration-[var(--transition-std)]` with a correct implementation. `--transition-std` is `200ms ease-out` (a full shorthand); `duration-[...]` only accepts a time value. Use either `transition-shadow duration-200 ease-out` (hardcoded but correct) or an inline style `style={{ transition: 'box-shadow var(--transition-std)' }}` on the element.

5. **`components/ui/Typography.tsx` — add `--text-label-sm--lh` token** to `tokens.css` (value `1`, matching the design direction) and reference it in the `label-sm` variant with `leading-[var(--text-label-sm--lh)]`.

6. **Add `__tests__/components/Section.test.tsx`** — test the Section component's five background variants, responsive padding classes, and an axe check.

7. **`ButtonLink.test.tsx` — resolve the React `act()` warning** by wrapping internal-link render calls in `await act(async () => { render(...) })` or by mocking `next/link` to a simple `<a>` in the test environment (via `jest.config.ts` `moduleNameMapper`).

### Informational (no action required before approval)

- Badge semantics for status use: document at usage site, not at primitive level.
- `cn()` conflict resolution: document rather than change.
- Card interactive pattern: address in Phase 4 when `ProgrammeCard` is built.

---

## 8. Git Status

```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   package-lock.json
  modified:   package.json

Untracked files:
  __tests__/
  components/
  jest.config.ts
  jest.setup.ts
  lib/cn.ts
```

**Assessment:**

- The Phase 2 implementation files (`__tests__/`, `components/`, `jest.config.ts`, `jest.setup.ts`, `lib/cn.ts`) are all **untracked** — they have not been committed.
- The two modified files (`package.json`, `package-lock.json`) reflect only the addition of test dependencies (`jest`, `jest-axe`, `@testing-library/*`, etc.) and the `test` / `test:watch` scripts. The diff confirms no other package.json changes.
- The committed tree (`318514b`) contains only Phase 1 deliverables. No Phase 2 files have been committed.
- The authoritative specification documents (`docs/architecture/`, `docs/design/`), `styles/tokens.css`, and `app/globals.css` show no untracked or modified status — they are committed and untouched.
- No staged changes exist. No unintended modifications to docs, styles, app, or lib/fonts.ts.

**Working tree is clean with respect to committed Phase 1 content. Phase 2 files are staged for review before commit, as required.**

---

*End of audit report.*
