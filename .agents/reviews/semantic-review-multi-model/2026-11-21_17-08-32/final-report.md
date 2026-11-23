# Final consolidated issues report — Phase 8C–8G accessibility, performance and responsive audit (All uncommitted working-tree changes from Phase 8C through 8G. Review every modified and untracked file for implementation quality: incorrect or duplicate main landmarks, broken skip-link behaviour, focus indicators that fail on any background, accessibility regressions from changed ARIA attributes, responsive layouts that still stack unnecessarily on desktop, tablet and mobile overflow, footer accordion behaviour and breakpoint transitions, incorrect or duplicate metadata, error boundaries that expose internal details, tests that pass without genuinely checking the intended behaviour, unnecessary CSS, duplicated logic or unrelated changes. Also verify that metadataBase and NEXT_PUBLIC_SITE_URL configuration uses localhost only as a development fallback and does not affect production metadata. Modified files: __tests__/components/ContactForm.test.tsx, __tests__/components/FocusRing.test.tsx, __tests__/components/Header.test.tsx, __tests__/components/ImpactCard.test.tsx, __tests__/components/Section.test.tsx, __tests__/pages/give.test.tsx, __tests__/pages/what-we-do-education.test.tsx, app/(content)/give/page.tsx, app/(content)/what-we-do/education/page.tsx, app/page.tsx, components/composite/ImpactCard.tsx, components/composite/ProgrammeCard.tsx, components/forms/ContactForm.tsx, components/layout/Footer.tsx, components/layout/MobileNav.tsx, components/layout/Navigation.tsx, components/layout/Section.tsx, components/sections/FeaturedStorySection.tsx, components/sections/GetInvolvedCTA.tsx, styles/tokens.css. New files: __tests__/components/MobileNav.test.tsx, __tests__/pages/homepage.test.tsx, app/not-found.tsx, app/error.tsx, __tests__/pages/not-found.test.tsx, __tests__/pages/error.test.tsx)

Issues are sorted from highest to lowest combined importance/confidence.

---

## 1. Reduced-motion `scroll-behavior` override is silently defeated

**Severity: High**

- **User impact:** Users who have requested reduced motion in their OS settings still receive smooth scrolling on every page, including skip-link activation and in-page anchor jumps. This directly violates their stated accessibility preference.
- **Issue:** `styles/tokens.css` adds `html { scroll-behavior: auto }` inside the `@media (prefers-reduced-motion: reduce)` block, but without `!important`. `app/globals.css` imports `tokens.css` first and then declares `html { scroll-behavior: smooth }` as a later rule at equal specificity, so the base rule wins the cascade and the override never applies. The `transition-duration` and `animation-duration` lines in the same block already use `!important` and work correctly, making this omission inconsistent. The compiled CSS confirms the ordering: the reduced-motion block appears before the base `smooth` rule in the output chunk.
- **Recommendation:** Add `!important` to the `scroll-behavior: auto` override in `styles/tokens.css` (consistent with the two lines above it), or move the `html { scroll-behavior: smooth }` rule in `app/globals.css` inside a `@media (prefers-reduced-motion: no-preference)` guard. Either change is a one-line fix.

---

## 2. `metadataBase` localhost fallback baked into production build

**Severity: High** · *(cluster: production metadata — see also #3)*

- **User impact:** Any production build deployed without `NEXT_PUBLIC_SITE_URL` set emits `http://localhost:3000` as the base for every canonical URL and Open Graph image URL across all 22 static pages. Search engines and social-sharing tools receive incorrect absolute URLs.
- **Issue:** `app/layout.tsx` resolves `metadataBase` as `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')`. Because `NEXT_PUBLIC_*` values are inlined at build time and metadata resolves at build for static routes, a misconfigured build silently emits `localhost` throughout. `.env.example` already documents `NEXT_PUBLIC_SITE_URL=https://seedpowerfoundation.org`, so the value is known, but no deployment gate prevents a build that omits the variable. Additionally, the comment in `layout.tsx` calling the domain "pending client confirmation" is now stale given that `.env.example` and `app/page.tsx` both reference `seedpowerfoundation.org`.
- **Recommendation:** Add a build-time assertion (e.g., in `next.config.ts` or a CI step) that throws or exits non-zero when `NEXT_PUBLIC_SITE_URL` is not set and `NODE_ENV` is `production`. Remove or update the stale "pending client confirmation" comment in `layout.tsx`.

---

## 3. Homepage `canonical` resolves to localhost when env var is unset

**Severity: High** · *(cluster: production metadata — see also #2)*

- **User impact:** The canonical tag for the homepage actively points to `http://localhost:3000/` in any build missing the env var, which is worse than a missing canonical — it actively signals the wrong authoritative URL to search engines.
- **Issue:** `app/page.tsx` adds `alternates: { canonical: '/' }`. Next.js resolves this relative path against `metadataBase`. When `metadataBase` falls back to `localhost`, this canonical is rendered as `http://localhost:3000/`. This is a direct consequence of issue #2 but represents an active incorrect signal rather than merely absent metadata.
- **Recommendation:** Addressed by the build-time guard in #2. If the guard is not added immediately, explicitly set an absolute canonical string rather than a relative path so the value is not silently wrong.

---

## 4. `GetInvolvedCTA` focus ring not covered by the CSS rule — split mechanism

**Severity: High** · *(cluster: focus-ring consistency — see also #5)*

- **User impact:** Any keyboard user focusing a link inside the `GetInvolvedCTA` section is protected only by a single fragile inline style. If a future edit removes or replaces that `style` prop (e.g., a component refactor), focus rings on a brand-green background become invisible, failing WCAG 1.4.11 Non-text Contrast.
- **Issue:** `components/sections/GetInvolvedCTA.tsx` renders `<section className="bg-[var(--color-brand)] ...">` with an inline `style={{ '--focus-ring-color': '#ffffff' }}`. The global `.bg-brand *:focus-visible { outline-color: #ffffff }` rule in `app/globals.css` only matches the `bg-brand` utility class and never fires for `bg-[var(--color-brand)]`. `components/layout/Section.tsx` was correctly migrated to `bg-brand`, but `GetInvolvedCTA` was not, so the focus-ring mechanism is now split across two patterns with no indication of which is authoritative. The homepage test asserts the inline variable, which locks the divergence in rather than catching it.
- **Recommendation:** Migrate `GetInvolvedCTA` to use `<Section background="brand">` or at minimum change `bg-[var(--color-brand)]` to the `bg-brand` utility and remove the inline style. Update the homepage test assertion from checking `--focus-ring-color` on the element's style to checking for the `bg-brand` class.

---

## 5. `FocusRing` reduced-motion test is a source-string match, not a behavioral assertion

**Severity: High** · *(cluster: focus-ring consistency — see also #4)*

- **User impact:** The test passes while the reduced-motion scroll override is broken (see #1), giving false confidence that the accessibility behavior is correct. Any CSS cascade issue of the same kind goes undetected.
- **Issue:** `__tests__/components/FocusRing.test.tsx` asserts the scroll-behavior override by reading `tokens.css` as a string and regex-matching the text `scroll-behavior: auto`. This confirms the rule was written, not that it applies. The same source-match pattern for transitions is masked by `!important`, but the scroll-behavior assertion has no such protection and passes against a defeated override.
- **Recommendation:** Rewrite the scroll-behavior assertion to verify the cascade outcome — either by checking that the `html { scroll-behavior: smooth }` base rule appears in `globals.css` before the `tokens.css` import (not after it), or by asserting that the reduced-motion block's `scroll-behavior: auto` carries `!important`. A source-match that also verifies `!important` is present in the same rule would catch the current defect.

---

## 6. `MobileNav` accordion `aria-controls` references a non-existent `id` while collapsed

**Severity: Medium**

- **User impact:** The expand/collapse button declares it controls a panel element that does not exist in the DOM while collapsed. Strictly, this is invalid ARIA; some screen readers may report an error or silently ignore the relationship, degrading the announced interaction for users navigating by landmark or structure.
- **Issue:** `components/layout/MobileNav.tsx` conditionally renders the accordion sub-list as `{expanded.has(item.label) && <ul id="...">}`. The `<button aria-controls="<id>">` is always present, but the matching `id` is absent from the DOM until the user expands the item. The ARIA specification requires that an `aria-controls` target exist in the DOM.
- **Recommendation:** Render the sub-list element persistently and toggle its visibility with the `hidden` HTML attribute (or `aria-hidden`) rather than conditional rendering. This keeps the `id` in the DOM at all times and makes the `aria-controls` reference valid regardless of expansion state.

---

## 7. `Layout.test.tsx` tests a hand-maintained replica, not the real layout component

**Severity: Medium**

- **User impact:** Regressions introduced by editing `app/layout.tsx` — a changed skip-link `href`, a removed `tabIndex`, a renamed `id` on `<main>` — will not break this test, leaving the most user-visible accessibility feature (skip navigation) untested against the real file.
- **Issue:** `__tests__/components/Layout.test.tsx` renders a manually maintained copy of the skip-link and `<main>` structure rather than importing and rendering the real `RootLayout` component. Any divergence between the replica and the actual file goes unnoticed.
- **Recommendation:** Import and render the real `app/layout.tsx` `RootLayout` in the test, or add a companion test file that does so alongside the existing structural assertions. Next.js App Router layouts can be rendered in Jest by wrapping them appropriately; if server-component constraints make that difficult, at minimum add an assertion that reads `app/layout.tsx` as a string and confirms the skip-link `href` and `main` `id` are present.

---

## 8. `ProgrammeCard` keyboard focus no longer triggers image zoom

**Severity: Low**

- **User impact:** Keyboard users who navigate to a programme card no longer see the image scale that mouse users see on hover. The decorative interaction is inconsistent between input methods, though focus rings still correctly identify the focused element.
- **Issue:** `components/composite/ProgrammeCard.tsx` was converted from a client component (which used `onFocusCapture`/`onBlurCapture` to trigger `useState`-driven scaling) to a server component using CSS `group-hover:scale-[1.03]`. The `group-hover` utility responds only to pointer hover, not to keyboard focus. The accessible experience remains intact because the focus ring is visible, but parity between pointer and keyboard interactions is lost.
- **Recommendation:** Add `group-focus-within:scale-[1.03]` to the image element alongside `group-hover:scale-[1.03]` to restore parity without reintroducing client state.

---

## 9. Footer documentation claims a mobile accordion that does not exist

**Severity: Low**

- **User impact:** No runtime impact. The comment misleads any developer who reads it into thinking accordion behavior exists or should be tested, and could cause the audit item "footer accordion behaviour" to be reported as passing when there is nothing to exercise.
- **Issue:** `components/layout/Footer.tsx` has a doc comment describing the mobile layout as "stacked accordion-style on mobile." The implementation renders all three link columns as plain `<ul>` lists at every breakpoint — always visible, no toggle button, no `aria-expanded`, no JavaScript. The `tablet:grid-cols-2` breakpoint added in Phase 8G is the full extent of the mobile/tablet behavior.
- **Recommendation:** Update the Footer component's doc comment to accurately describe the current behavior: stacked columns on mobile, two-column grid on tablet, three-column grid on desktop. If a mobile accordion was part of the original specification and was intentionally deferred, record that decision explicitly.

---

## 10. Skip-link uses `focus:outline-*` instead of `focus-visible:outline-*`

**Severity: Low**

- **User impact:** No visible impact for most users because the skip link is off-screen for mouse users. It is a minor inconsistency with the site's established convention that all other interactive elements use `focus-visible` to avoid showing outlines on mouse click.
- **Issue:** The skip-navigation link in `app/layout.tsx` applies focus styles using `focus:outline-*` Tailwind classes rather than `focus-visible:outline-*`. Every other interactive element in the codebase uses `focus-visible` to follow the convention that outlines appear on keyboard navigation only, not on mouse click.
- **Recommendation:** Replace `focus:` with `focus-visible:` on the skip-link's outline utilities to stay consistent with the site's focus-indicator convention.
