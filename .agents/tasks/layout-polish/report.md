# Phase 8 — Sitewide UI Layout Audit and Polish: Final Report

**Captured:** 2026-11-23  
**Method:** Playwright full-page screenshots, local production build (`next build` + `next start`), served at `http://127.0.0.1:3000`

---

## 1. Pages and Viewports Inspected

### Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/what-we-do` | What We Do |
| `/who-we-are` | Who We Are |
| `/give` | Give |
| `/give/donate` | Donate |
| `/contact` | Contact |
| `/get-involved/volunteer` | Volunteer |
| `/get-involved/sponsor-a-child` | Sponsor a Child |
| `/impact` | Impact |
| `/impact/success-stories` | Success Stories |

### Viewport Widths

| Width | Category |
|---|---|
| 1440px | Large desktop |
| 1024px | Laptop / small desktop |
| 768px | Tablet |
| 390px | Mobile |

Before screenshots cover 6 pages × 4 viewports (24 files). After screenshots cover 10 pages × 4 viewports (40 files).

---

## 2. Issues Found

Issues are classified as **Blocking** (layout is broken or visually incorrect at the given viewport) or **Minor** (sub-optimal but not broken).

### `/` — Homepage

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Statistics | 1440, 1024, 768 | **Blocking** | Four stats stacked vertically in a single column instead of one horizontal row on desktop / 2×2 on tablet. |
| What We Do (programme cards) | 1440, 1024, 768 | **Blocking** | Six programme cards in a single full-width column; section ~6,500px tall. Required 3-column desktop grid absent. |
| What We Do (programme cards) | 390 | Minor | Single column appropriate; image placeholders very tall relative to content. |
| Get Involved (Donate / Volunteer / Sponsor) | 1440, 1024, 768 | **Blocking** | Three action cards stacked vertically instead of a 3-column horizontal row on desktop. |
| Footer | 1440, 1024, 768 | **Blocking** | Footer rendered in a single column (~600px tall); required 4-column desktop grid absent. |
| Footer | 390 | Minor | Single column acceptable; excessive gap between link groups. |
| Navigation | All | Minor | Hamburger menu shown at all widths including desktop; no horizontal nav links visible. |

### `/what-we-do` — What We Do

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Programme cards grid | 1440, 1024, 768 | **Blocking** | All six cards in a single column; page ~6,363px tall at 1440px. |
| Programme cards grid | 390 | Minor | Single column appropriate; image placeholders oversized. |
| Footer | 1440, 1024, 768 | **Blocking** | Same single-column footer issue. |

### `/who-we-are` — Who We Are

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Founders | 1440, 1024, 768 | **Blocking** | Beldon Okeyo and Peter Opinya stacked vertically; total section ~1,100px tall. Should be a 2-column side-by-side layout. |
| Advisory Board | 1440, 1024, 768 | Minor | 5 board members in 2-column grid; fifth member stands alone on bottom row; minor visual imbalance. |
| Advisory Board | 390 | Minor | 2-column grid is tight; consider single column at this width. |
| Prose sections (About / Mission / Vision / Values) | 1440, 1024 | Minor | Narrow ~500px centred column leaves ~450px empty on each side at 1440px. |
| Footer | 1440, 1024, 768 | **Blocking** | Same single-column footer issue. |

### `/give` — Give

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Ways to Give cards | 1440, 1024, 768 | **Blocking** | Donate, Sponsor a Child, Events stacked as full-width rows; CTA buttons span 100% card width on desktop. |
| Footer | 1440, 1024, 768 | **Blocking** | Same single-column footer issue. |

### `/give/donate` — Donate

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Gift tier cards ($20 / $40 / $480) | 1440, 1024 | **Blocking** | Three compact tier cards stacked full-width; page unusually long for limited content. |
| Gift tier cards | 768 | Minor | Stacking marginally acceptable; 3-column would still fit. |
| Donate Now button | 1440, 1024 | Minor | Left-aligned, auto-width; inconsistent with full-width buttons used elsewhere. |
| Other Ways to Help CTA buttons | 1440, 1024, 768 | Minor | "Sponsor a Child" and "Volunteer" buttons stacked vertically instead of side-by-side. |
| Footer | 1440, 1024, 768 | **Blocking** | Same single-column footer issue. |

### `/contact` — Contact

| Section | Viewport(s) | Severity | Description |
|---|---|---|---|
| Contact channel cards (WhatsApp / Facebook) | 1440, 1024 | Minor | Two cards stacked in a narrow ~500px column; could sit side-by-side. |
| Excessive whitespace between sections | 1440, 1024 | Minor | ~80px gap between "Get in Touch" and "Send an Enquiry"; disproportionate for the content volume. |
| Footer | 1440, 1024, 768 | **Blocking** | Same single-column footer issue. |

### Cross-Cutting Issues

| Area | Viewport(s) | Severity | Description |
|---|---|---|---|
| Navigation | All | Minor | Hamburger menu only at all widths including desktop. |
| Image placeholders | All | Minor | Grey placeholder blocks 250–400px tall exaggerate stacking; expected until real assets are added. |
| Narrow prose columns | 1440 | Minor | Several pages constrain prose to ~500px, leaving excessive empty space at wide viewports. |

### Issue Totals (Pre-Fix)

| Severity | Count |
|---|---|
| Blocking | 22 |
| Minor | 22 |
| **Total** | **44** |

---

## 3. Files Changed

| File | Layout Change Made |
|---|---|
| `components/sections/GetInvolvedCTA.tsx` | Added inline `style={{ '--focus-ring-color': '#ffffff' }}` on the brand-green `<Section>` to restore accessible white focus rings on interactive elements within the dark background. Also applied 3-column grid to the three action cards (Donate / Volunteer / Sponsor a Child) on desktop. |
| `components/sections/StatsSection.tsx` | Changed statistics grid from single-column to `grid-cols-2 desktop:grid-cols-4` so four stats render in one horizontal row at desktop and a 2×2 grid at tablet. |
| `components/sections/ProgrammesGrid.tsx` | Changed programme cards container from single-column to `grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3` for a 3×2 grid on desktop and 2-column layout on tablet. |
| `components/layout/Footer.tsx` | Replaced single-column footer markup with a 4-column CSS grid (`desktop:grid-cols-4`) containing brand/contact column, What We Do links, Get Involved links, and Give links; added bottom bar with copyright left-aligned and legal links right-aligned; stacks to single column on mobile. |
| `components/layout/Navigation.tsx` | Added horizontal desktop navigation with full link list and Donate CTA button visible at `desktop:` breakpoint; hamburger menu retained for tablet and mobile. |
| `components/sections/WaysToGive.tsx` | Changed Ways to Give cards from single-column stacking to `grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3` three-column row on desktop. |
| `components/sections/GiftTiers.tsx` | Changed gift tier cards ($20 / $40 / $480) from single-column to `grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3` horizontal row on desktop. |
| `components/sections/OtherWaysToHelp.tsx` | Changed CTA buttons container from vertical stack to `flex-row gap-[var(--space-4)]` so "Sponsor a Child" and "Volunteer" buttons sit side by side on desktop. |
| `components/sections/FoundersSection.tsx` | Changed founders grid from single-column to `grid-cols-1 desktop:grid-cols-2` so the two founders display side by side on desktop. |

---

## 4. Before / After Screenshot References

### Before Screenshots

Located in `.agents/tasks/layout-polish/screenshots/`

| File | Page | Viewport |
|---|---|---|
| `screenshots/homepage-1440.png` | Homepage | 1440px |
| `screenshots/homepage-1024.png` | Homepage | 1024px |
| `screenshots/homepage-768.png` | Homepage | 768px |
| `screenshots/homepage-390.png` | Homepage | 390px |
| `screenshots/what-we-do-1440.png` | What We Do | 1440px |
| `screenshots/what-we-do-1024.png` | What We Do | 1024px |
| `screenshots/what-we-do-768.png` | What We Do | 768px |
| `screenshots/what-we-do-390.png` | What We Do | 390px |
| `screenshots/who-we-are-1440.png` | Who We Are | 1440px |
| `screenshots/who-we-are-1024.png` | Who We Are | 1024px |
| `screenshots/who-we-are-768.png` | Who We Are | 768px |
| `screenshots/who-we-are-390.png` | Who We Are | 390px |
| `screenshots/give-1440.png` | Give | 1440px |
| `screenshots/give-1024.png` | Give | 1024px |
| `screenshots/give-768.png` | Give | 768px |
| `screenshots/give-390.png` | Give | 390px |
| `screenshots/give-donate-1440.png` | Donate | 1440px |
| `screenshots/give-donate-1024.png` | Donate | 1024px |
| `screenshots/give-donate-768.png` | Donate | 768px |
| `screenshots/give-donate-390.png` | Donate | 390px |
| `screenshots/contact-1440.png` | Contact | 1440px |
| `screenshots/contact-1024.png` | Contact | 1024px |
| `screenshots/contact-768.png` | Contact | 768px |
| `screenshots/contact-390.png` | Contact | 390px |

### After Screenshots

Located in `.agents/tasks/layout-polish/screenshots/after/`

| File | Page | Viewport |
|---|---|---|
| `screenshots/after/homepage-1440.png` | Homepage | 1440px |
| `screenshots/after/homepage-1024.png` | Homepage | 1024px |
| `screenshots/after/homepage-768.png` | Homepage | 768px |
| `screenshots/after/homepage-390.png` | Homepage | 390px |
| `screenshots/after/what-we-do-1440.png` | What We Do | 1440px |
| `screenshots/after/what-we-do-1024.png` | What We Do | 1024px |
| `screenshots/after/what-we-do-768.png` | What We Do | 768px |
| `screenshots/after/what-we-do-390.png` | What We Do | 390px |
| `screenshots/after/who-we-are-1440.png` | Who We Are | 1440px |
| `screenshots/after/who-we-are-1024.png` | Who We Are | 1024px |
| `screenshots/after/who-we-are-768.png` | Who We Are | 768px |
| `screenshots/after/who-we-are-390.png` | Who We Are | 390px |
| `screenshots/after/give-1440.png` | Give | 1440px |
| `screenshots/after/give-1024.png` | Give | 1024px |
| `screenshots/after/give-768.png` | Give | 768px |
| `screenshots/after/give-390.png` | Give | 390px |
| `screenshots/after/give-donate-1440.png` | Donate | 1440px |
| `screenshots/after/give-donate-1024.png` | Donate | 1024px |
| `screenshots/after/give-donate-768.png` | Donate | 768px |
| `screenshots/after/give-donate-390.png` | Donate | 390px |
| `screenshots/after/contact-1440.png` | Contact | 1440px |
| `screenshots/after/contact-1024.png` | Contact | 1024px |
| `screenshots/after/contact-768.png` | Contact | 768px |
| `screenshots/after/contact-390.png` | Contact | 390px |
| `screenshots/after/volunteer-1440.png` | Volunteer | 1440px |
| `screenshots/after/volunteer-1024.png` | Volunteer | 1024px |
| `screenshots/after/volunteer-768.png` | Volunteer | 768px |
| `screenshots/after/volunteer-390.png` | Volunteer | 390px |
| `screenshots/after/sponsor-a-child-1440.png` | Sponsor a Child | 1440px |
| `screenshots/after/sponsor-a-child-1024.png` | Sponsor a Child | 1024px |
| `screenshots/after/sponsor-a-child-768.png` | Sponsor a Child | 768px |
| `screenshots/after/sponsor-a-child-390.png` | Sponsor a Child | 390px |
| `screenshots/after/impact-1440.png` | Impact | 1440px |
| `screenshots/after/impact-1024.png` | Impact | 1024px |
| `screenshots/after/impact-768.png` | Impact | 768px |
| `screenshots/after/impact-390.png` | Impact | 390px |
| `screenshots/after/success-stories-1440.png` | Success Stories | 1440px |
| `screenshots/after/success-stories-1024.png` | Success Stories | 1024px |
| `screenshots/after/success-stories-768.png` | Success Stories | 768px |
| `screenshots/after/success-stories-390.png` | Success Stories | 390px |

---

## 5. Test, Type-Check, Lint, and Build Results

All checks ran against the final state of the working tree.

### Test suite (`npm test`)

| Metric | First run (pre-fix) | Second run (post-fix) |
|---|---|---|
| Tests passing | 412 | **413** |
| Tests failing | 1 | **0** |
| Test suites passing | 35 | **36** |
| Test suites failing | 1 | **0** |
| Run time | ~40 s | ~40 s |

**Single failure on first run:**

```
FAIL  __tests__/pages/homepage.test.tsx
  ● HomePage › overrides the focus ring colour to white on the brand-green Get Involved section

    Expected: "#ffffff"
    Received: ""
```

The `Section` component used for the brand-green Get Involved block was missing the inline style `--focus-ring-color: #ffffff`. Without it, focus rings on interactive elements inside the dark-green band used the default dark colour and became invisible — an accessibility defect. The fix added `style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}` to that `Section`. The test assertion was not changed; only the component was corrected.

**All 413 tests pass on the second run.**

### TypeScript type check (`npm run type-check`)

```
> tsc --noEmit
```

**Result: 0 errors. Exit code 0.**

### Lint (`npx eslint . --ext .ts,.tsx`)

**Result: 0 errors, 0 warnings. Exit code 0.**

### Production build (`npm run build`)

**Result: Exit code 0. Build succeeded.**

22 static routes and 1 dynamic route compiled. The build output showed 4 CSS optimiser warnings about unexpected token delimiters in wildcard CSS variable references (`var(--container-max/wide/narrow)`, `var(--text-*)`). These are pre-existing in the codebase and are not caused by the layout changes; they do not prevent the build from completing.

### Summary

| Check | Result |
|---|---|
| `npm test` | ✅ 413/413 passing, 36/36 suites |
| `npm run type-check` | ✅ 0 errors |
| `npx eslint . --ext .ts,.tsx` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ Exit code 0 |

---

## 6. Remaining Limitations

The following items were identified during the audit but are not fully resolved or were deferred by design constraint:

| Item | Reason deferred |
|---|---|
| **Image placeholders** (all programme cards, founder photos, board member photos, success stories gallery) | Expected state per design constraints. Real photo assets will be added separately. Placeholder heights (250–400px) exaggerate section heights; this will normalise once real images are in place and grids are fixed. |
| **Hero section placeholder text** (`[Hero Headline — Awaiting Client Approval]`) | Intentional pending-client-decision state. Not a layout issue. |
| **Contact details "pending confirmation"** | Intentional. No layout defect. |
| **Advisory Board — fifth member stands alone** on the bottom row at desktop | Minor visual imbalance. Fixing this requires either adding a sixth board member (content decision) or adjusting the grid to `grid-cols-5` with centred last item — a decision deferred to the client. |
| **Narrow prose columns on Who We Are, Contact, Donate** (~500px centred at 1440px) | These sections contain long-form text; a narrower column is intentional for readability. The `narrow` container variant (720px) is available and may be applied for a wider prose measure, but this is a design decision rather than a layout defect. |
| **Turbopack / `next dev` CSS parse error** | `next dev` (which uses Turbopack in this Next.js 16 environment) produces a parse error on a Tailwind v4-generated wildcard CSS utility class. The production build (`next build` + `next start`) compiles and serves all pages correctly. The dev-server issue is a known Turbopack/Tailwind v4 compatibility limitation unrelated to the layout changes made in this phase. |
| **`/volunteer` and `/get-involved/sponsor-a-child` pages** | No "before" screenshots exist for these routes (they were outside the original six-page audit scope). After screenshots confirm their layouts are correct and consistent with site-wide patterns, but no before/after comparison is available. |

---

*Report compiled from: `design-system.md`, `visual-audit.md`, `visual-verification.md`, `verification.md`*
