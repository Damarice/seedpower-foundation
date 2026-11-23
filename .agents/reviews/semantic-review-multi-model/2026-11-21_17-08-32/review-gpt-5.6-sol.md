# Phase 8 accessibility audit: brand-section focus rings, reduced-motion scroll, ARIA names, and metadata

This phase closes out the Phase 8 accessibility and responsive work with a set of targeted corrections: a white focus ring so the default green outline stays visible against brand-green backgrounds, reduced-motion handling meant to suppress smooth scrolling, several ARIA fixes (disambiguated link names, `aria-haspopup="menu"`, accordion `aria-controls`, a removed redundant figure `aria-label`), the homepage's nested `<main>` removed so the root layout's `<main>` is the only one, a tablet two-column step added to the footer grid, and ProgrammeCard converted from a client component to a CSS-driven server component. The custom 404 and error pages added earlier in the phase are reviewed here as well.

Watch for: the reduced-motion `scroll-behavior: auto` override in tokens.css is defeated by the base `scroll-behavior: smooth` rule in globals.css — the override lacks `!important` while the sibling transitions override in the same block uses it, and CSS cascade lets the later base rule win. Reduced-motion users still get smooth scrolling; this was verified against the compiled CSS. Separately, production metadata correctness depends on `NEXT_PUBLIC_SITE_URL` being set at build time — without it, canonical and OpenGraph image URLs resolve to `http://localhost:3000`.

**Verdict**: NEEDS_CHANGES

## High-level view

The reduced-motion block in tokens.css adds `html { scroll-behavior: auto }`, but globals.css imports tokens.css *before* its own `html { scroll-behavior: smooth }` rule, and the override lacks `!important`. The later base rule wins the cascade, so reduced-motion users keep smooth scrolling. The FocusRing test only string-matches the tokens.css source, so it passes against a broken override.

Two different mechanisms now produce the white focus ring on brand-green backgrounds. Section's brand variant switched to the `bg-brand` utility so the global `.bg-brand *:focus-visible { outline-color: #fff }` rule applies; GetInvolvedCTA instead keeps `bg-[var(--color-brand)]` and sets `--focus-ring-color: #ffffff` inline. Both work, but the logic is split, and the homepage test asserts the inline variable, which locks the divergence in.

`metadataBase` falls back to `http://localhost:3000` only when `NEXT_PUBLIC_SITE_URL` is unset, but `NEXT_PUBLIC_*` values are inlined at build time and metadata resolves at build for static routes, so a production build without the env var bakes `localhost` into every canonical and OG-image URL. `.env.example` documents the real domain (`seedpowerfoundation.org`), making the layout.tsx comment that calls it "pending client confirmation" stale.

ProgrammeCard's conversion from `useState`-driven hover to `group-hover` is a genuine client-JS reduction. The old `onFocusCapture`/`onBlurCapture` handlers that zoomed the image on keyboard focus were not replaced with a `group-focus-within` equivalent, so the zoom now fires only on mouse hover.

The mobile drawer's `<nav>` became a `<div role="dialog">` — the conventional modal pattern, at the cost of a `navigation` landmark. The accordion toggles gained `aria-controls`, but those point at sub-lists that are conditionally rendered, so the id is absent while collapsed.

The footer grid gained a `tablet:grid-cols-2` step. The component's doc comment describes "stacked accordion-style on mobile," but no accordion exists — the columns are always expanded.

The 404 and error pages render friendly messages with no stack traces or raw error text; their tests genuinely verify that internal details are not exposed. The weaker tests in this phase are the source-string matches in FocusRing.test.tsx, which assert that a CSS rule was written rather than that it applies.

<details>
<summary>Issues (7)</summary>

1. **Reduced-motion scroll override defeated** — `tokens.css` sets `html { scroll-behavior: auto }` inside the reduced-motion media block without `!important`, and globals.css's base `html { scroll-behavior: smooth }` is later in source order, so it wins. Add `!important` to the override (matching the transitions rule) or move the override after the base rule.
2. **Reduced-motion test is a string match** — `FocusRing.test.tsx` asserts the `scroll-behavior: auto` rule exists in tokens.css source, not that it wins the cascade, so it passes while the override is broken. Rewrite it to assert cascaded behavior, or at minimum to cover the globals.css ordering.
3. **Split focus-ring mechanisms** — Section uses the `bg-brand` class + global CSS rule; GetInvolvedCTA uses an inline `--focus-ring-color` style. Unify GetInvolvedCTA on `bg-brand` so a single rule covers all brand sections.
4. **Production metadata depends on build-time env var** — `metadataBase` falls back to `localhost` when `NEXT_PUBLIC_SITE_URL` is unset, and the value is baked in at build time. Confirm the production deployment sets `NEXT_PUBLIC_SITE_URL` at build, or add a CI guard against a localhost build.
5. **Stale metadata comment** — `layout.tsx` still says the production domain is "pending client confirmation", but `.env.example` and `app/page.tsx` already use `seedpowerfoundation.org`. Update the comment.
6. **ProgrammeCard dropped keyboard-triggered image zoom** — the move to `group-hover` removed the `onFocusCapture`/`onBlurCapture` handlers; keyboard focus on the card's link no longer scales the image. Add `group-focus-within:scale-[1.03]` if parity with the old behavior is wanted.
7. **Mobile accordion `aria-controls` dangles when collapsed** — the toggle's `aria-controls` points at a sub-list `<ul>` that is conditionally rendered, so the id is absent while collapsed. Keep the panel in the DOM and toggle `hidden`, or set `aria-controls` only when expanded.
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

The transitions/animations lines use `!important`, so they win regardless of source order. The `scroll-behavior: auto` line does not. `app/globals.css` imports tokens.css *before* its own base rule:

```css
@import "tailwindcss";
@import "../styles/tokens.css";   /* reduced-motion override lands here */
/* ... */
html {
  scroll-behavior: smooth;        /* later, equal specificity — wins */
}
```

Confirmed in the compiled chunk (`.next/static/chunks/…css`):

```
...animation-iteration-count:1!important}html{scroll-behavior:auto}}   /* media block */
*,:before,:after{box-sizing:border-box}
html{scroll-behavior:smooth;...}                                        /* base — later, wins */
```

The skip-link and any in-page anchors smooth-scroll for users who asked for reduced motion. The fix is one line: add `!important` to the override (consistent with the two lines above), or move the override into globals.css after the base rule, or scope the base `smooth` to `@media (prefers-reduced-motion: no-preference)`.

### Reduced-motion test passes against a broken override

`__tests__/components/FocusRing.test.tsx` asserts the override by reading tokens.css as a string:

```js
expect(tokensCss).toMatch(
  /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?scroll-behavior:\s*auto/
);
```

This proves the rule was *written*, not that it *applies*. The same file's transitions test has the same source-match shape but is masked by the `!important` that makes those transitions work regardless of ordering. The scroll-behavior test is the one where the gap bites. A behavioral assertion against the compiled output — or at minimum checking that globals.css's `scroll-behavior: smooth` is ordered before the tokens.css import — would catch it.

### Two mechanisms for the white focus ring on brand backgrounds

`components/layout/Section.tsx` switched its brand variant to the `bg-brand` utility, so the global rule matches:

```css
.bg-brand *:focus-visible {
  outline-color: #ffffff;
}
```

`components/sections/GetInvolvedCTA.tsx` kept `bg-[var(--color-brand)]` — which the CSS rule does *not* match — and sets the custom property inline instead:

```jsx
<section
  className="bg-[var(--color-brand)] py-12 tablet:py-16"
  style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}
>
```

The inline style works, but the brand-background focus-ring logic now lives in two places with two mental models. A future brand section copying either pattern produces one that works via CSS and one that works via JSX, with no signal about which to prefer. `GetInvolvedCTA` could switch to `bg-brand` and drop the inline style; the homepage test would need its assertion changed from `getPropertyValue('--focus-ring-color')` to a class check.

### Production metadata correctness depends on a build-time env var

If a production build runs without `NEXT_PUBLIC_SITE_URL` set, `localhost:3000` is baked into the canonical and OG-image absolute URLs of every static page. `.env.example` already documents the real value:

```
NEXT_PUBLIC_SITE_URL=https://seedpowerfoundation.org
```

and `app/page.tsx` already hardcodes that domain in `openGraph.url`. The layout.tsx comment calling the domain "pending client confirmation" is stale. The actionable item is deployment hygiene: confirm the production build sets this env var, and consider a build-time guard that fails when `metadataBase` would resolve to localhost in a non-development build.

### ProgrammeCard: keyboard focus no longer zooms the image

The old `onFocusCapture`/`onBlurCapture` path scaled the image when a keyboard user focused the card's link. The new server-component version uses `group-hover:scale-[1.03]`, which responds only to pointer hover. Keyboard users keep the visible focus ring on the link, so the accessible experience is intact; only the decorative zoom is lost. `group-focus-within:scale-[1.03]` on the image would restore parity without reintroducing client state.

### Mobile drawer `aria-controls` and the navigation landmark trade-off

The accordion toggles gained `aria-controls` pointing at their sub-list, and the sub-list gained the matching `id`. The sub-list is conditionally rendered, so while collapsed, `aria-controls` references an id that is not in the document. Impact is low — the axe check passes, and expanding does produce the matching id — but it is technically invalid. Keeping the `<ul>` in the DOM with a `hidden` attribute, or setting `aria-controls` only when expanded, closes the gap.

The drawer's change from `<nav role="dialog">` to `<div role="dialog">` removes the `navigation` landmark. Screen-reader users who navigate by landmarks lose the mobile menu from their landmark list; they interact with it as a dialog instead. The desktop `<nav aria-label="Main navigation">` still provides the landmark. Whether the trade-off is acceptable depends on whether the design intent was a modal-style overlay (dialog is correct) or a navigational panel (nav would be correct).

### Footer comment mismatch

The Footer doc comment says the mobile layout is "stacked accordion-style on mobile." The implementation renders all three link columns as plain `<ul>` lists, always expanded, with no toggle, no `aria-expanded`, and no `<button>`. The audit item "footer accordion behaviour" has nothing to exercise. If always-expanded stacked columns are the intended design, the comment should say so; if a mobile accordion was specified, it was never built.

### Error boundary and the test pattern contrast

`app/error.tsx` renders a fixed friendly message and never the thrown `error.message` or `error.stack`; `useEffect` logs only the digest. `error.test.tsx` passes a sensitive message and a stack-bearing error and asserts neither string appears in the document, and asserts the digest is not rendered. These are genuine behavioral assertions that would fail if internal detail leaked.

The contrast with the FocusRing reduced-motion test is instructive: the error-page tests constrain behavior; the scroll-behavior test constrains source text. Source-text assertions are reliable only when the behavior follows mechanically from presence (as with the `bg-brand` class checks, where the class is what the CSS rule keys on). They break silently when behavior depends on something the test never inspects — here, ordering relative to another file.

</details>

<details>
<summary>File map</summary>

Scope: uncommitted working-tree changes (Phase 8G) plus the 404/error pages and root-layout/metadata changes from earlier in Phase 8 that the audit re-inspects. Full diff: `git diff` for the working tree; `git diff origin/main` for the full Phase 8C–8G span.

**Modified (working tree)**
- `styles/tokens.css` — added `html { scroll-behavior: auto }` to the reduced-motion block (defeated by source order; see Details).
- `app/globals.css` — `.bg-brand *:focus-visible` white-outline rule; base `html { scroll-behavior: smooth }` that overrides the tokens.css reduced-motion line.
- `app/page.tsx` — homepage `<main>` replaced with a Fragment (removes the duplicate main landmark).
- `app/layout.tsx` — skip-nav link, `<main id="main-content" tabIndex={-1}>`, `metadataBase` from `NEXT_PUBLIC_SITE_URL ?? localhost`.
- `app/not-found.tsx` *(Phase 8E, new)* — custom 404 with H1, explanation, homepage and What We Do links.
- `app/error.tsx` *(Phase 8E, new)* — client error boundary; logs digest only, no stack/message exposure.
- `components/layout/Section.tsx` — brand variant uses `bg-brand` utility.
- `components/sections/GetInvolvedCTA.tsx` — inline `--focus-ring-color: #ffffff` (diverges from the `bg-brand` mechanism).
- `components/composite/ProgrammeCard.tsx` — converted to server component; `group-hover` scale replaces `useState`; keyboard focus zoom dropped.
- `components/layout/MobileNav.tsx` — drawer `<nav>` → `<div role="dialog">`; accordion `aria-controls` / sub-list `id` added.
- `components/layout/Navigation.tsx` — dropdown trigger `aria-haspopup="true"` → `"menu"`.
- `components/forms/ContactForm.tsx` — field error `<span role="alert">` → `<p role="alert">`.
- `components/composite/ImpactCard.tsx` — removed redundant combined `aria-label` from the figure.
- `components/sections/FeaturedStorySection.tsx` — placeholder `aria-label` falls back to heading text; "More Stories" link given `aria-label="More success stories"`.
- `components/layout/Footer.tsx` — added `tablet:grid-cols-2` breakpoint step.
- `app/(content)/give/page.tsx` — "Learn More" (Sponsor a Child) given distinguishing `aria-label`.
- `app/(content)/what-we-do/education/page.tsx` — "Grinnell Family Campus" subtitle moved out of the `<h3>` into a separate `<p>`.

**New / modified tests**
- `__tests__/components/MobileNav.test.tsx` *(new)* — dialog role, close/escape/overlay, accordion `aria-expanded`/`aria-controls`, axe.
- `__tests__/pages/homepage.test.tsx` *(new)* — single H1, stats, programmes, no nested `<main>`, white `--focus-ring-color` on the Get Involved region, "More success stories" name.
- `__tests__/components/FocusRing.test.tsx` — updated class assertions to `bg-brand`; added source-string reduced-motion scroll-behavior assertion (passes against a defeated override).
- `__tests__/components/Layout.test.tsx` — skip-link href/target, main landmark id and `tabIndex`, DOM order, axe.
- `__tests__/pages/not-found.test.tsx` *(new)* — single H1, links, section label, axe.
- `__tests__/pages/error.test.tsx` *(new)* — no raw message/stack/digest exposed, reset wired, axe.
- `__tests__/components/ContactForm.test.tsx` — asserts field errors render as `<p role="alert">`.
- `__tests__/components/Header.test.tsx` — asserts dropdown triggers use `aria-haspopup="menu"`.
- `__tests__/components/ImpactCard.test.tsx` — asserts figure has no `aria-label`.
- `__tests__/components/Section.test.tsx` — brand variant asserts `bg-brand` class.
- `__tests__/pages/give.test.tsx` — asserts "Learn more about Sponsor a Child" link name.
- `__tests__/pages/what-we-do-education.test.tsx` — asserts H3 name is "Nyakach Campus" with subtitle separate.

</details>
