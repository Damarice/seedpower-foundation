# Accessibility Audit — Content Pages & Core Components
## Phase 8G · SeedPower Foundation

---

## Scope

Files audited:

- `app/(content)/contact/page.tsx`
- `app/(content)/get-involved/sponsor-a-child/page.tsx`
- `app/(content)/get-involved/volunteer/page.tsx`
- `app/(content)/give/donate/page.tsx`
- `app/(content)/give/page.tsx`
- `app/(content)/impact/page.tsx`
- `app/(content)/impact/success-stories/page.tsx`
- `app/(content)/what-we-do/community-outreach/page.tsx`
- `app/(content)/what-we-do/education/page.tsx`
- `app/(content)/what-we-do/food-project/page.tsx`
- `app/(content)/what-we-do/teacher-training/page.tsx`
- `app/(content)/what-we-do/wash/page.tsx`
- `app/(content)/what-we-do/womens-empowerment/page.tsx`
- `app/(content)/what-we-do/page.tsx`
- `app/(content)/who-we-are/page.tsx`
- `app/not-found.tsx`
- `app/error.tsx`
- `components/forms/ContactForm.tsx`

---

## Findings

### 1. Heading hierarchy

**PASS — all files reviewed.**

Every page uses a single `<h1>` as the page-header heading, with `<h2>` sections below it and `<h3>` elements only inside those sections. No heading levels are skipped. Heading IDs are present on all `h1`/`h2` elements that are referenced by `aria-labelledby` on their enclosing `<Section>`. No issue to fix.

---

### 2. Form labels

**PASS — ContactForm.tsx.**

Every visible input and textarea carries an explicit `<label htmlFor="…">` whose `for` attribute matches the control's `id`. The optional Subject field is labelled "(optional)" in plain text. Required fields use a decorative asterisk with `aria-hidden="true"` plus `aria-required="true"` on the control. The honeypot field's label and input both carry `aria-hidden="true"`. No issue to fix.

---

### 3. Validation feedback / error announcements

**FINDING F-1 — `FieldError` uses `role="alert"` on a `<span>` (minor semantic issue).**

`<span role="alert">` is valid but uncommon; some screen readers treat inline elements with `role="alert"` inconsistently. Changing to a `<p>` element is the idiomatic correction and keeps the role semantics identical.

**PASS — server error banner.**

The server-error `<div role="alert">` is a block element. No issue.

**PASS — success state.**

The success `<div role="status" aria-live="polite">` is a block element. No issue.

---

### 4. Landmark structure

**FINDING F-2 — `who-we-are/page.tsx`: Second `<h2>` ("Our Vision") and third `<h2>` ("Our Values") in the Mission/Vision/Values section have no `id` attributes.**

The surrounding `<Section>` for Mission is labelled with `aria-labelledby="mission-heading"`, which correctly references the Mission `h2`. However the Vision and Values headings are bare `<Heading variant="h2">` elements without `id` props, so they cannot serve as section labels if future sections are added. For the current structure this is a low-severity findng: assistive technology can still navigate by heading, but the headings cannot be referenced by `aria-labelledby`. No structural landmark is broken.

**STATUS: No correction needed** — AT heading navigation works correctly; `aria-labelledby` references only the Mission heading, which has an `id`. The Vision and Values headings are sub-headings within the same section. Leaving unchanged avoids unnecessary churn.

**PASS — all other pages.**

Every page wraps top-level sections in `<Section aria-labelledby="…">` with matching IDs on the h1/h2. All major content areas are inside `<Section>`, which renders as `<section>` and provides landmark context.

---

### 5. Accessible names for links and buttons

**FINDING F-3 — `give/page.tsx`: "Learn More" `ButtonLink` on the Sponsor-a-Child card lacks a distinguishing accessible name.**

The card contains:
```tsx
<ButtonLink href="/get-involved/sponsor-a-child" variant="ghost" size="default">
  Learn More
</ButtonLink>
```
The text "Learn More" is ambiguous in isolation (screen reader users who navigate by links will hear "Learn More" with no context). The `ProgrammeCard` component already uses `aria-label="Learn more about {title}"` to disambiguate, but this inline card in `give/page.tsx` does not.

**Fix:** Add `aria-label="Learn more about Sponsor a Child"` to that button.

**FINDING F-4 — `what-we-do/education/page.tsx`: Nyakach heading nests a `<span>` with a subtitle inside the `<Heading>` element.**

```tsx
<Heading variant="h3" className="text-[var(--color-brand)] mb-3">
  Nyakach Campus
  <span className="block text-[length:var(--text-body-sm)] ...">
    Grinnell Family Campus
  </span>
</Heading>
```
The subtitle span is inside the h3. Screen readers will announce both strings as part of the same heading, which is acceptable, but the visual treatment (small subtitle below the heading) is better served by placing the subtitle outside the heading so it does not inflate the heading's accessible name with organisational context. This is a low-severity presentational issue.

**STATUS: Corrected** — moved the subtitle `<span>` immediately after the closing `</Heading>` tag so the h3 announces only "Nyakach Campus" and the subtitle reads as supplementary text.

**PASS — all ButtonLinks/links in other files.**

`not-found.tsx`: "Go to Homepage" and "What We Do" — sufficiently self-descriptive.
`error.tsx`: "Try Again" button and "Go to Homepage" link — both unambiguous.
`contact/page.tsx`: WhatsApp and Facebook links carry explicit `aria-label` values.
`give/donate/page.tsx`: External NeonCRM link carries `aria-label`.
`sponsor-a-child/page.tsx`: GOBGI portal link carries `aria-label`.
`volunteer/page.tsx`: "Become a Volunteer" — unambiguous.
`impact/page.tsx`: "Read the Stories", "Donate Now" — unambiguous in context.
`success-stories/page.tsx`: "Donate Now", "Volunteer" — unambiguous.
All `ProgrammeCard` CTAs already use `aria-label="Learn more about {title}"`.

---

### 6. `role="alert"` on inline element (F-1 — ContactForm.tsx)

`FieldError` renders a `<span role="alert">`. While browsers do honour `role="alert"` on inline elements, the ARIA specification notes that live regions work most reliably on block-level containers. Some screen readers (notably older NVDA + Firefox combinations) may not announce the error when it appears on an inline element.

**Fix:** Change the `<span>` to a `<p>` in `FieldError`. The `errorBase` styles (flex, text, colour) are compatible with a block element. No visual or API change.

---

## Summary of corrections required

| ID   | File                                       | Issue                                                             | Action                        |
|------|--------------------------------------------|-------------------------------------------------------------------|-------------------------------|
| F-1  | `components/forms/ContactForm.tsx`         | `FieldError` uses `role="alert"` on `<span>` (inline element)    | Change `<span>` → `<p>`       |
| F-3  | `app/(content)/give/page.tsx`              | "Learn More" button on Sponsor card has no accessible name       | Add `aria-label`              |
| F-4  | `app/(content)/what-we-do/education/page.tsx` | Nyakach subtitle nested inside `<h3>`, inflating heading name  | Move subtitle outside heading |

No issues found in: `not-found.tsx`, `error.tsx`, `contact/page.tsx`, `give/donate/page.tsx`, `get-involved/sponsor-a-child/page.tsx`, `get-involved/volunteer/page.tsx`, `impact/page.tsx`, `impact/success-stories/page.tsx`, `what-we-do/page.tsx`, `what-we-do/community-outreach/page.tsx`, `what-we-do/food-project/page.tsx`, `what-we-do/teacher-training/page.tsx`, `what-we-do/wash/page.tsx`, `what-we-do/womens-empowerment/page.tsx`, `who-we-are/page.tsx`.

---

## Corrections applied

All three findings are corrected directly in the source files.
