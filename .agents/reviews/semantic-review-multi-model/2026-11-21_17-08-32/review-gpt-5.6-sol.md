# Phase 8 accessibility audit: brand-section focus rings, reduced-motion scroll, ARIA names, and metadata

This phase closes out the Phase 8 accessibility and responsive work with a set of targeted corrections rather than a redesign: a white focus ring so the default green outline stays visible against brand-green backgrounds, reduced-motion handling meant to suppress smooth scrolling, several ARIA fixes (disambiguated link names, `aria-haspopup="menu"`, accordion `aria-controls`, a removed redundant figure `aria-label`), the homepage's nested `<main>` removed so the root layout's `<main>` is the only one, a tablet two-column step added to the footer grid, and the ProgrammeCard converted from a client component to a CSS-driven server component. The custom 404 and error pages added earlier in the phase are reviewed here as well, since they fall in the audit's scope. Existing components and tokens are reused throughout; the only new CSS is the `.bg-brand *:focus-visible` rule and the reduced-motion `scroll-behavior` line, and no new dependencies are introduced.

Watch for: the reduced-motion `scroll-behavior: auto` override in tokens.css is defeated by the base `scroll-behavior: smooth` rule in globals.css — the override lacks `!important` while the sibling transitions override in the same block uses it, and CSS cascade lets the later base rule win. Reduced-motion users still get smooth scrolling; this was verified against the compiled CSS. Separately, production metadata correctness depends on `NEXT_PUBLIC_SITE_URL` being set at build time — without it, canonical and OpenGraph image URLs resolve to `http://localhost:3000`.

**Verdict**: NEEDS_CHANGES

## High-level view

The reduced-motion block in tokens.css adds `html { scroll-behavior: auto }`, but globals.css imports tokens.css *before* its own `html { scroll-behavior: smooth }` rule, and the override is not marked `!important`. The later base rule wins the cascade, so reduced-motion users keep smooth scrolling. The FocusRing test only string-matches the tokens.css source, so it passes against a broken override.

Two different mechanisms now produce the white focus ring on brand-green backgrounds. Section's brand variant switched to the `bg-brand` utility so the global `.bg-brand *:focus-visible { outline-color: #fff }` rule applies; GetInvolvedCTA instead keeps `bg-[var(--color-brand)]` and sets `--focus-ring-color: #ffffff` inline. Both work, but the logic is split, and the homepage test asserts the inline variable, which locks the divergence in.

`metadataBase` falls back to `http://localhost:3000` only when `NEXT_PUBLIC_SITE_URL` is unset — the right shape — but `NEXT_PUBLIC_*` values are inlined at build time and metadata is resolved at build for static routes, so a production build without the env var bakes `localhost` into the canonical and OG-image URLs. `.env.example` documents the real domain (`seedpowerfoundation.org`), so this is a deployment dependency rather than a code defect; the layout.tsx comment still calls the domain "pending client confirmation", which is now stale.

ProgrammeCard was converted from a client component using `useState` for hover scale to a server component using Tailwind `group-hover` — a genuine client-JS reduction, since ProgrammeGridSection is also a server component. The old `onFocusCapture`/`onBlurCapture` handlers that scaled the image on keyboard focus were not replaced with a `group-focus-within` equivalent, so the zoom now fires only on mouse hover.

The mobile drawer's `<nav>` became a `<div role="dialog">` — the conventional modal pattern, at the cost of a `navigation` landmark — and the accordion toggles gained `aria-controls` pointing at their sub-lists. Those sub-lists are conditionally rendered, so `aria-controls` references an id that does not exist while a section is collapsed.

The footer grid gained a `tablet:grid-cols-2` step between the mobile single column and the desktop four columns, which balances the four items at tablet width. The component's doc comment still describes a "stacked accordion-style on mobile" layout, but no accordion exists — the columns are always expanded — so the comment misdescribes the implementation.

The 404 and error pages render friendly messages with no stack traces or raw error text; the error page logs only the digest. Their tests genuinely verify that internal details are not exposed. The weaker tests in this phase are the source-string matches in FocusRing.test.tsx, which assert that a CSS rule exists in the file rather than that its behavior holds.

<details>
<summary>Issues (7)</summary>

1. **Reduced-motion scroll override defeated** — `tokens.css` sets `html { scroll-behavior: auto }` inside the reduced-motion media block without `!important`, and globals.css's base `html { scroll-behavior: smooth }` is later in source order, so it wins. Add `!important` to the override (matching the transitions rule) or move the override after the base rule.
2. **Reduced-motion test is a string match** — `FocusRing.test.tsx` asserts the `scroll-behavior: auto` rule exists in tokens.css source, not that it wins the cascade, so it passes while the override is broken. Rewrite it to assert the compiled/cascaded behavior, or at minimum to cover the globals.css ordering.
3. **Split focus-ring mechanisms** — Section uses the `bg-brand` class + global CSS rule; GetInvolvedCTA uses an inline `--focus-ring-color` style. Unify GetInvolvedCTA on `bg-brand` so a single rule covers all brand sections.
4. **Production metadata depends on build-time env var** — `metadataBase` falls back to `localhost` when `NEXT_PUBLIC_SITE_URL` is unset, and the value is baked in at build time. Confirm the production deployment sets `NEXT_PUBLIC_SITE_URL` at build, or guard against a localhost build in CI.
5. **Stale metadata comment** — `layout.tsx` still says the production domain is "pending client confirmation", but `.env.example` and `app/page.tsx` already use `seedpowerfoundation.org`. Update the comment or confirm the domain is still genuinely unconfirmed.
6. **ProgrammeCard dropped keyboard-triggered image zoom** — the move to `group-hover` removed the `onFocusCapture`/`onBlurCapture` handlers; keyboard focus on the card's link no longer scales the image. Add `group-focus-within:scale-[1.03]` if parity with the old hover behavior is wanted.
7. **Mobile accordion aria-controls dangles when collapsed** — the toggle's `aria-controls` points at a sub-list `<ul>` that is conditionally rendered, so the id is absent while collapsed. Keep the panel in the DOM and toggle `hidden`, or set `aria-controls` only when expanded.
</details>

<details>
<summary>Details</summary>

### Reduced-motion scroll-behavior override is defeated by source order

`styles/tokens.css` extends its reduced-motion block to switch off smooth scrolling:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

The transitions/animations lines use `!important`, so they win regardless of source order. The `scroll-behavior: auto` line does not. That matters because `app/globals.css` sets the base behavior *after* importing tokens.css:

```css
@import "tailwindcss";
@import "../styles/tokens.css";
/* ... */
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
```

`@import` inlines tokens.css at the import point, so in the compiled output the reduced-motion `html { scroll-behavior: auto }` appears *before* the base `html { scroll-behavior: smooth }`. Both are unlayered element selectors with equal specificity, so the later declaration wins — meaning a reduced-motion user still gets `smooth`. That is confirmed in the compiled chunk (`.next/static/chunks/…css`):

```
...animation-iteration-count:1!important}html{scroll-behavior:auto}}   /* media block */
*,:before,:after{box-sizing:border-box}
html{scroll-behavior:smooth;...}                                       /* base — later, wins */
```

The practical effect is the skip-link and any in-page anchors smooth-scroll for users who asked for reduced motion. The fix is one line: add `!important` to the override (consistent with the transitions rule two lines above), or move the override into globals.css after the base rule, or scope the base `smooth` to `@media (prefers-reduced-motion: no-preference)`.

### Reduced-motion test passes against a broken override

`__tests__/components/FocusRing.test.tsx` asserts the override by reading tokens.css as a string:

```js
expect(tokensCss).toMatch(
  /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?scroll-behavior:\s*auto/
);
```

This proves the rule was *written*, not that it *applies*. It cannot catch the cascade defeat above, because it never looks at globals.css or the compiled output. The same file's other reduced-motion test (transitions suppressed) has the same source-match shape, but the transitions rule happens to work because of its `!important`, so the test's weakness is masked there. The scroll-behavior test is the one where the gap bites. A behavioral assertion — compiling the CSS or checking that no `scroll-behavior: smooth` survives for reduced-motion — would catch it; at minimum the test should assert the ordering relationship against globals.css.

### Two mechanisms for the white focus ring on brand backgrounds

The phase's core accessibility goal — a visible focus ring on the green CTA sections — is implemented two ways.

`components/layout/Section.tsx` switched its brand variant from the arbitrary value `bg-[var(--color-brand)]` to the `bg-brand` utility, so the global rule in globals.css matches:

```css
.bg-brand *:focus-visible {
  outline-color: #ffffff;
}
```

`components/sections/GetInvolvedCTA.tsx` kept `bg-[var(--color-brand)]` (the arbitrary value the CSS rule does *not* match) and instead sets the custom property inline:

```jsx
<section
  aria-labelledby="get-involved-heading"
  className="bg-[var(--color-brand)] py-12 tablet:py-16"
  style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}
>
```

This works because `:focus-visible` reads `var(--focus-ring-color)`, which the inline style overrides for descendants. But it means the brand-background focus-ring logic is now in two places with two mental models ("apply `bg-brand`" vs "set the CSS variable inline"), and a future brand section that copies either pattern has to know which one to use. `GetInvolvedCTA` could use `bg-brand` like Section and drop the inline style, leaving the single CSS rule as the source of truth. The homepage test currently asserts the inline variable (`expect(region.style.getPropertyValue('--focus-ring-color')).toBe('#ffffff')`), so unifying would require updating that assertion to check the class instead.

### Production metadata correctness depends on a build-time env var

`app/layout.tsx` resolves the metadata base from the environment with a localhost fallback:

```ts
metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
),
```

This is the right shape — localhost is only a fallback. Two things make it operationally fragile. `NEXT_PUBLIC_*` values are inlined at build time, and Next.js resolves relative metadata URLs (the homepage's `canonical: '/'`, the OG image's `url: '/images/og-image.jpg'`) against `metadataBase` at build time for static routes. So if a production build runs without `NEXT_PUBLIC_SITE_URL` set, `localhost:3000` is baked into the canonical and OG-image absolute URLs of every static page. `.env.example` already documents the real value:

```
NEXT_PUBLIC_SITE_URL=https://seedpowerfoundation.org
```

and `app/page.tsx` already hardcodes that domain in `openGraph.url`. So the domain is established, not pending — which makes the layout.tsx comment ("Production domain pending client confirmation. Replace with the verified domain before deployment.") stale. The actionable item is deployment hygiene: confirm the production build sets `NEXT_PUBLIC_SITE_URL` (the `.env.example` value), and ideally add a build-time guard that fails when `metadataBase` would resolve to localhost in a production build. No code change to the fallback itself is needed; the fallback is correct for local development.

### ProgrammeCard: server component, but keyboard focus no longer zooms the image

ProgrammeCard was a client component that tracked hover/focus in `useState` and scaled the image through inline styles driven by `onMouseEnter`/`onMouseLeave`/`onFocusCapture`/`onBlurCapture`. It is now a server component that drives the same scale through Tailwind utilities:

```jsx
<article className={cn('group', /* ... */ '[transition:box-shadow_var(--transition-std)]', className)}>
  <img className="w-full h-full object-cover [transition:transform_var(--transition-slow)] group-hover:scale-[1.03]" />
```

Because `ProgrammeGridSection` is also a server component (no `'use client'`), this is a real reduction in client JavaScript, not a cosmetic one — the "eliminates the need for 'use client'" comment in the file is accurate. The behavioral cost is that the old `onFocusCapture`/`onBlurCapture` path scaled the image when a keyboard user focused the card's link; `group-hover` only responds to the pointer. The link's focus ring still shows, so keyboard users keep a visible focus indicator — only the decorative image zoom is lost. If parity with the previous behavior matters, `group-focus-within:scale-[1.03]` on the image restores it without reintroducing client state.

### Mobile drawer ARIA: dialog role and a dangling aria-controls

The drawer element changed from `<nav role="dialog" …>` to a plain `<div role="dialog" …>`. A modal dialog on a generic container is the conventional ARIA pattern, and the drawer keeps `aria-label="Navigation"`, so its purpose is still announced. The trade-off is that the mobile menu is no longer exposed as a `navigation` landmark the way the desktop `<nav aria-label="Main navigation">` is; screen-reader users interact with it as a dialog instead. That is defensible for a modal, but it is a deliberate change in landmark exposure worth being aware of.

The accordion toggles gained `aria-controls` pointing at their sub-list, and the sub-list gained the matching `id`:

```jsx
aria-controls={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
// ...
{expanded.has(item.label) && (
  <ul id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`} …>
```

The sub-list is conditionally rendered — it exists only while the section is expanded. While collapsed, `aria-controls` references an id that is not in the document, which is technically invalid (the controlled element should exist). Impact is low: the `MobileNav` axe check renders the drawer collapsed and passes, and expanding does produce the matching id. The robust fix is to keep the `<ul>` in the DOM and toggle a `hidden` attribute, or to set `aria-controls` only when expanded. The slug derivation (`item.label.toLowerCase().replace(/\s+/g, '-')`) is unique across the current nav items, so there is no id-collision risk today.

### Footer tablet breakpoint and a comment that describes an accordion that isn't there

The footer grid added a tablet step:

```jsx
<div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8 desktop:gap-12">
```

At tablet width the four cells (logo/tagline plus three link columns) arrange as a 2×2, and at desktop as a single row of four — a balanced transition that fixes the previous jump straight from stacked to four columns. This is the one substantive responsive change in the working tree and it is sound.

The component's doc comment, however, says the layout is "stacked accordion-style on mobile." There is no accordion: the three link columns render their `<h3>` heading and a plain `<ul>` of links at every breakpoint, always expanded, with no toggle, no `aria-expanded`, and no `<button>`. So the audit item "footer accordion behaviour" has nothing to exercise — the columns just stack. If stacked-always-visible columns are the intended design (reasonable for a four-column footer), the comment should say that; if a mobile accordion was intended per the design direction, it is missing. Given the "do not implement new features" constraint, the safe action is to correct the comment rather than add an accordion.

### 404 and error pages, and the test pattern behind the reduced-motion miss

The error boundary answers the audit's "exposes internal details" question cleanly. `app/error.tsx` renders a fixed friendly message and never the thrown `error.message` or `error.stack`; its `useEffect` logs only the digest:

```ts
useEffect(() => {
  console.error('Unhandled error (digest:', error.digest ?? 'none', ')');
}, [error]);
```

`app/not-found.tsx` is purely static. The tests back this up behaviorally — `error.test.tsx` passes a sensitive message and a stack-bearing error and asserts neither string appears in the document, and asserts the digest is not rendered. These are genuine behavioral assertions, the right kind.

They also make the contrast with the FocusRing tests sharp: the error-page tests would fail if internal detail leaked, whereas the reduced-motion test cannot fail when the override is defeated. The lesson for the suite is the same one the reduced-motion finding turns on — assert behavior (what the rendered output or compiled CSS does), not source presence (what a file contains). The Phase 8 suite leans on source-string matches in `FocusRing.test.tsx` and the `.bg-brand` class-presence checks; the class-presence checks are reasonable proxies (the class is what the CSS rule keys on), but the scroll-behavior match is not, because the rule's effect depends on ordering the test never inspects.

</details>

<details>
<summary>File map</summary>

Scope: the uncommitted working-tree changes (Phase 8G audit corrections) plus the 404/error pages and root-layout/metadata work from earlier in Phase 8 that the audit explicitly re-inspects. Full diff: `git diff` for the working tree, `git diff origin/main` for the full Phase 8C–8G span.

**Modified (working tree)**
- `styles/tokens.css` — added `html { scroll-behavior: auto }` to the reduced-motion block (defeated by source order; see Details).
- `app/globals.css` *(Phase 8, base for the audit)* — `.bg-brand *:focus-visible` white-outline rule; base `html { scroll-behavior: smooth }` that overrides the tokens.css reduced-motion line.
- `app/page.tsx` — homepage `<main>` replaced with a Fragment (no more duplicate main landmark); metadata unchanged.
- `app/layout.tsx` *(Phase 8)* — skip-nav link, `<main id="main-content" tabIndex={-1}>`, and `metadataBase` from `NEXT_PUBLIC_SITE_URL ?? localhost`.
- `app/not-found.tsx` *(Phase 8E, new)* — custom 404 with H1, explanation, homepage + What We Do links.
- `app/error.tsx` *(Phase 8E, new)* — client error boundary; logs digest only, no stack/message exposure.
- `components/layout/Section.tsx` — brand variant uses `bg-brand` utility (matches the focus-ring CSS rule).
- `components/sections/GetInvolvedCTA.tsx` — inline `--focus-ring-color: #ffffff` (diverges from the `bg-brand` mechanism).
- `components/composite/ProgrammeCard.tsx` — converted to a server component; `group-hover` scale replaces `useState`; keyboard focus zoom dropped.
- `components/layout/MobileNav.tsx` — drawer `<nav>` → `<div role="dialog">`; accordion `aria-controls`/sub-list `id` added.
- `components/layout/Navigation.tsx` — dropdown trigger `aria-haspopup="true"` → `"menu"`.
- `components/forms/ContactForm.tsx` — field error `<span role="alert">` → `<p role="alert">`.
- `components/composite/ImpactCard.tsx` — removed redundant combined `aria-label` from the figure.
- `components/sections/FeaturedStorySection.tsx` — placeholder `aria-label` falls back to heading; "More Stories" link given `aria-label="More success stories"`.
- `components/layout/Footer.tsx` — added `tablet:grid-cols-2` breakpoint step.
- `app/(content)/give/page.tsx` — "Learn More" (Sponsor a Child) given distinguishing `aria-label`.
- `app/(content)/what-we-do/education/page.tsx` — "Grinnell Family Campus" subtitle moved out of the `<h3>` into a separate `<p>` so the heading name is the campus only.

**New / modified tests**
- `__tests__/components/MobileNav.test.tsx` *(new, untracked)* — dialog role, close/escape/overlay, accordion `aria-expanded`/`aria-controls`, axe.
- `__tests__/pages/homepage.test.tsx` *(new, untracked)* — single H1, stats, programmes, no nested `<main>`, white `--focus-ring-color` on the Get Involved region, "More success stories" name.
- `__tests__/components/FocusRing.test.tsx` — updated to expect `bg-brand`; added source-string reduced-motion scroll-behavior assertion (passes against a defeated override).
- `__tests__/components/Layout.test.tsx` *(Phase 8C)* — skip-link href/target, main landmark id and `tabIndex`, DOM order, axe.
- `__tests__/pages/not-found.test.tsx` *(Phase 8E, new)* — single H1, links, section label, axe.
- `__tests__/pages/error.test.tsx` *(Phase 8E, new)* — no raw message/stack/digest exposed, reset wired, axe.
- `__tests__/components/ContactForm.test.tsx` — asserts field errors render as `<p role="alert">`.
- `__tests__/components/Header.test.tsx` — asserts dropdown triggers use `aria-haspopup="menu"`.
- `__tests__/components/ImpactCard.test.tsx` — asserts figure has no `aria-label`; figure and label render as separate visible texts.
- `__tests__/components/Section.test.tsx` — brand variant asserts `bg-brand` class.
- `__tests__/pages/give.test.tsx` — asserts "Learn more about Sponsor a Child" link name.
- `__tests__/pages/what-we-do-education.test.tsx` — asserts H3 name is "Nyakach Campus" with subtitle separate.

</details>
