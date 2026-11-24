# SeedPower Foundation — Visual Design Direction

**Version:** 2.0 — Definitive Specification  
**Date:** November 17, 2026  
**Status:** Awaiting approval before implementation  
**Supersedes:** v1.0 (Design Planning Phase draft)

---

## CONSISTENCY RULES

These rules apply to every page and component without exception.

1. No page may introduce its own independent colour palette. All colours must come from the design tokens in Section 1.
2. No page may introduce a different heading font. Manrope is the sole heading typeface.
3. No page may introduce a different body font. Inter is the sole body and UI typeface.
4. All reusable components (buttons, cards, navigation, footer) share one visual treatment as defined in this document.
5. Section spacing must follow the spacing scale in Section 2. No ad-hoc padding or margin values.
6. Only the three defined button variants may be used. No page may introduce a custom button style.
7. The navigation header and footer are identical across all pages.
8. All responsive behaviour follows the breakpoint system in Section 2. No page-specific breakpoints.
9. Any future design decision not covered here must be recorded as an addition to this document before implementation, not resolved informally during development.

---

## SECTION 1 — DESIGN TOKENS

These are the single source of truth for all visual values. Every CSS variable, Tailwind token, or component prop maps directly to one of these.

### 1.1 Colour Tokens

#### Brand Colours

| Token | Hex | Contrast on white | Use |
|---|---|---|---|
| `--color-brand` | `#2D5016` | 9.25:1 (AAA) | Primary buttons, active nav, H3 headings, accent borders |
| `--color-brand-hover` | `#1f3a0f` | 12.57:1 (AAA) | Brand button on hover |
| `--color-brand-active` | `#172a08` | 15.32:1 (AAA) | Brand button on press |
| `--color-brand-surface` | `#f0f4e8` | — | Ghost button hover background |

The original SeedPower Foundation green `#2D5016` is extracted from the logo asset `seed-power-foundation-green-logo.png`. It is the only brand colour.

#### Text Colours

| Token | Hex | Contrast on white | Use |
|---|---|---|---|
| `--color-text-primary` | `#1a1a1a` | 17.4:1 (AAA) | H1, H2, H4, body text, labels |
| `--color-text-secondary` | `#666666` | 5.74:1 (AA) | Captions, metadata, breadcrumb text |
| `--color-text-disabled` | `#505050` | 5.02:1 on `#cccccc` (AA) | Disabled button and input text |
| `--color-text-on-brand` | `#ffffff` | 9.25:1 on brand (AAA) | Text inside green backgrounds |
| `--color-text-on-dark` | `#ffffff` | 17.4:1 on `#1a1a1a` (AAA) | Text inside dark footer |
| `--color-text-footer-secondary` | `#aaaaaa` | 7.49:1 on `#1a1a1a` (AAA) | Secondary text in footer |
| `--color-text-visited` | `#4a6b2e` | 6.12:1 (AA) | Visited inline links |
| `--color-text-placeholder` | `#6b7280` | 4.83:1 (AA) | Input placeholder text |

**Rule:** `#999999` is not in the token set. It fails WCAG AA at 2.85:1 on white. It must not be used on any background in this design.

#### Background Colours

| Token | Hex | Use |
|---|---|---|
| `--color-bg-page` | `#ffffff` | Default page background, card backgrounds |
| `--color-bg-soft` | `#f9faf8` | Dropdown menus, alternate section rows |
| `--color-bg-warm` | `#f5f3f0` | Impact stats sections, feature highlights |
| `--color-bg-dark` | `#1a1a1a` | Footer background |
| `--color-bg-disabled` | `#cccccc` | Disabled button background |

#### Border Colours

| Token | Hex | Use |
|---|---|---|
| `--color-border` | `#e0e0e0` | Card borders, input borders, nav bottom line |
| `--color-border-separator` | `#888888` | Breadcrumb and decorative separators (3.54:1 on white — meets UI component 3:1 threshold) |

#### Semantic Colours

| Token | Hex | Contrast on white | Use |
|---|---|---|---|
| `--color-error` | `#b91c1c` | 6.47:1 (AA) | Form error messages and icons |

#### Colours Not Permitted

The following colours appear in the existing WordPress theme assets but must not be used in the new site: `#00d084` (vivid green), `#0693e3` (vivid cyan), `#ff6900` (orange), `#5e2d3b` (dark red), `#9b51e0` (purple), `#fcb900` (amber). These are Astra/Elementor theme defaults with no connection to SeedPower's brand.

---

### 1.2 Typography Tokens

#### Font Families

| Token | Value | Use |
|---|---|---|
| `--font-heading` | Manrope | All heading levels (H1–H4) |
| `--font-body` | Inter | Body text, UI labels, buttons, captions, navigation |

Both fonts load via `next/font/google`. No other typefaces may be introduced.

**Previous theme fonts** (Open Sans, Playfair Display, Fira Sans) must not carry over to the new site.

#### Type Scale — Desktop (≥ 1024px)

| Token | Size | Weight | Line height | Letter spacing | Element |
|---|---|---|---|---|---|
| `--text-hero` | 48px | 700 | 1.15 | −0.02em | H1 — homepage hero only |
| `--text-h1` | 40px | 700 | 1.25 | −0.01em | H1 — interior page titles |
| `--text-h2` | 32px | 700 | 1.3 | 0 | H2 — section headings |
| `--text-h3` | 24px | 600 | 1.4 | 0 | H3 — subsections, card titles |
| `--text-h4` | 20px | 600 | 1.4 | 0 | H4 — supporting headings |
| `--text-body-lg` | 18px | 400 | 1.65 | 0 | Introductory paragraphs |
| `--text-body` | 16px | 400 | 1.65 | 0 | Standard body copy |
| `--text-body-sm` | 14px | 400 | 1.5 | 0 | Captions, metadata |
| `--text-label` | 16px | 600 | 1 | 0 | Button text |
| `--text-label-sm` | 14px | 600 | 1 | 0 | Small button, badge text |
| `--text-nav` | 15px | 500 | 1 | 0 | Navigation links |
| `--text-caption` | 12px | 400 | 1.4 | 0.02em | Fine print, image captions |

#### Type Scale — Tablet (768px–1023px)

| Element | Size |
|---|---|
| H1 hero | 36px |
| H1 page title | 32px |
| H2 | 28px |
| H3 | 22px |
| H4 | 18px |
| Body large | 17px |
| Body | 16px |
| Body small | 14px |

#### Type Scale — Mobile (< 768px)

| Element | Size |
|---|---|
| H1 hero | 28px |
| H1 page title | 24px |
| H2 | 22px |
| H3 | 18px |
| H4 | 16px |
| Body large | 16px |
| Body | 15px |
| Body small | 13px |

**Minimum text size on any screen:** 12px (captions only). All interactive text: 14px minimum.

#### Typography Rules

- One H1 per page, above the fold.
- H2 headings use `--color-text-primary` (`#1a1a1a`) in all section contexts.
- H3 headings use `--color-brand` (`#2D5016`) when they serve as card titles or programme names; `--color-text-primary` when they introduce informational subsections.
- H4 and below: always `--color-text-primary`.
- Body text: always `--color-text-primary`. Never justified — use left-aligned.
- Line length: 55–75 characters per line. Container widths are set to enforce this naturally.
- All-caps text is not permitted for body copy or headings. It may appear on button labels only as an intentional design decision (not the current direction).
- Italic is not used for emphasis. Use font-weight 600 or colour for emphasis.

---

### 1.3 Spacing Tokens

Base unit: **8px**. All spacing values are multiples of 8.

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Tight internal gaps (icon-to-label) |
| `--space-2` | 8px | Compact padding, inline gaps |
| `--space-3` | 12px | Small component internal padding |
| `--space-4` | 16px | Standard internal padding, mobile margins |
| `--space-5` | 20px | Card padding desktop, button horizontal |
| `--space-6` | 24px | Tablet horizontal margin, component gaps |
| `--space-8` | 32px | Large internal sections, button group gaps |
| `--space-10` | 40px | Tablet section padding |
| `--space-12` | 48px | Medium section padding, card gaps |
| `--space-16` | 64px | Desktop section padding (vertical) |
| `--space-20` | 80px | Large desktop section padding |

**Section vertical padding:** `--space-16` (64px) desktop, `--space-10` (40px) tablet, `--space-8` (32px) mobile.

No section may use ad-hoc vertical padding outside this scale.

---

### 1.4 Container Tokens

| Token | Value | Use |
|---|---|---|
| `--container-max` | 1200px | Standard page content width |
| `--container-wide` | 1400px | Full-bleed sections with internal content limit |
| `--container-narrow` | 720px | Long-form text pages (About, mission articles) |
| `--container-padding-mobile` | 16px | Left/right margin on mobile |
| `--container-padding-tablet` | 24px | Left/right margin on tablet |

---

### 1.5 Breakpoint Tokens

| Token | Value | Description |
|---|---|---|
| `--bp-mobile` | 320px | Minimum supported width |
| `--bp-tablet` | 768px | Tablet and above (min-width query) |
| `--bp-desktop` | 1024px | Desktop and above (min-width query) |
| `--bp-wide` | 1440px | Large desktop (min-width query) |

Breakpoints are **min-width** (mobile-first). There are no max-width queries except where structurally unavoidable.

---

### 1.6 Border Radius Tokens

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Buttons, input fields, small chips |
| `--radius-md` | 6px | Cards, dropdowns, modals |
| `--radius-lg` | 12px | Large featured cards, image containers |
| `--radius-full` | 9999px | Circular avatar images, pill badges |

**Rule:** All buttons use `--radius-sm` (4px). All cards use `--radius-md` (6px). No component may use an arbitrary radius.

---

### 1.7 Shadow Tokens

| Token | Value | Use |
|---|---|---|
| `--shadow-none` | none | Default state for all cards and containers |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.08)` | Card hover state |
| `--shadow-dropdown` | `0 4px 16px rgba(0,0,0,0.10)` | Dropdown menus |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.16)` | Modals, drawers |

Cards and containers are flat by default (no shadow). Shadows appear only on hover or when elements are elevated above the page surface (dropdowns, drawers).

---

### 1.8 Transition Tokens

| Token | Value | Use |
|---|---|---|
| `--transition-fast` | `150ms ease-out` | Colour/opacity changes (hover text colour, link underline) |
| `--transition-std` | `200ms ease-out` | Shadow appearance, background colour |
| `--transition-slow` | `300ms ease-out` | Image zoom on card hover, drawer slide |

No CSS animation or transition may use a duration longer than 300ms without a specific documented rationale. Respect `prefers-reduced-motion`: all transitions must be suppressed under this media query.

---

### 1.9 Focus State Tokens

| Token | Value |
|---|---|
| `--focus-ring-color` | `#2D5016` |
| `--focus-ring-width` | `2px` |
| `--focus-ring-offset` | `3px` |
| `--focus-ring-style` | `solid` |

**Implementation:** Every interactive element (button, link, input, select, checkbox, radio) must display a visible focus ring using `outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color); outline-offset: var(--focus-ring-offset)` when focused via keyboard.

The green focus ring achieves 9.25:1 contrast against white backgrounds and 8.35:1 against the warm background — both AAA.

Inside green sections (CTA block, hero overlay), where the page background behind the ring is green, the focus ring colour switches to `#ffffff` (white), maintaining 9.25:1 contrast.

---

### 1.10 Component Dimension Tokens

| Token | Value | Use |
|---|---|---|
| `--nav-height-desktop` | 88px | Navigation bar height on desktop |
| `--nav-height-mobile` | 80px | Navigation bar height on mobile |
| `--touch-target-min` | 44px | Minimum height/width for all interactive elements |
| `--card-image-ratio` | 4/3 | Standard programme card image aspect ratio |
| `--avatar-size` | 64px | Circular avatar image diameter |
| `--icon-size-sm` | 20px | Small inline icons |
| `--icon-size-md` | 24px | Standard icon size |
| `--icon-size-lg` | 32px | Feature icons in cards |

---

## SECTION 2 — COMPONENT SPECIFICATIONS

### 2.1 Navigation Header

**Structure:** One header component, shared across all pages without variation.

```
┌─────────────────────────────────────────────────────┐
│  [Logo]   Who We Are   What We Do ▾   Our Impact ▾  │  64px height
│           Get Involved ▾   Give ▾   Contact  [Donate]│
└─────────────────────────────────────────────────────┘
```

**Container:**
- Height: 64px desktop, 56px mobile
- Background: `#ffffff`
- Bottom border: 1px solid `--color-border` (`#e0e0e0`)
- Position: Sticky. The header remains fixed at the top of the viewport on scroll.
- Z-index: Above all page content, below modals

**Logo:**
- Asset: Original green logo (`seed-power-foundation-green-logo.png`)
- Display height: 40px (width scales proportionally from 108×120px source)
- Padding: 12px top/bottom, 24px left
- Links to `/`

**Navigation Links (desktop):**
- Font: Inter, 15px, weight 500
- Colour default: `--color-text-primary` (`#1a1a1a`)
- Colour hover: `--color-brand` (`#2D5016`)
- Colour active (current page): `--color-brand` (`#2D5016`)
- Active indicator: 2px solid `--color-brand` border on bottom of link (not on the full nav bar)
- Padding: 0 20px, vertically centred
- Transition: colour `--transition-fast` (150ms)
- No underline at any state

**Donate Button in Nav:**
- Style: Primary button, compact size
- Text: "Donate"
- Font: Inter 14px, weight 600
- Padding: 10px 20px
- Margin-left: 16px from last nav item
- Links to `/give/donate/`

**Dropdown Trigger:**
Items with child pages (What We Do, Our Impact, Get Involved, Give) display a small downward chevron icon (16px) after their text. Dropdown opens on hover on desktop.

---

### 2.2 Dropdown Menu

**Trigger:** Mouse hover entering the parent nav item. The menu opens after a 100ms delay (prevents accidental triggers on cursor pass).

**Closing:** Mouse leaving the entire dropdown panel (parent item + panel combined). Closes after a 100ms delay to allow cursor movement across any small gap.

**Position:** Below the parent nav item, left-aligned to its left edge.

**Panel:**
- Background: `#ffffff`
- Border: 1px solid `--color-border` (`#e0e0e0`)
- Border radius: `--radius-md` (6px)
- Shadow: `--shadow-dropdown` (`0 4px 16px rgba(0,0,0,0.10)`)
- Padding: 8px 0 (vertical only; items carry their own horizontal padding)
- Min width: 200px

**Dropdown Items:**
- Font: Inter, 15px, weight 400
- Colour default: `--color-text-primary` (`#1a1a1a`)
- Background default: transparent
- Padding: 10px 20px
- Height: 44px minimum (touch target)
- Hover background: `--color-bg-soft` (`#f9faf8`)
- Hover text colour: `--color-brand` (`#2D5016`)
- Transition: `--transition-fast` (150ms)
- No border between items

---

### 2.3 Mobile Navigation

**Trigger:** Viewport below `--bp-tablet` (768px). The horizontal menu is hidden. A hamburger icon appears.

**Hamburger icon:**
- Three horizontal bars icon, 24px
- Colour: `--color-text-primary` (`#1a1a1a`)
- Position: Right edge of nav bar, vertically centred
- Touch target: 44×44px minimum
- Toggles the drawer open/closed
- When drawer is open, icon changes to an × (close icon)

**Drawer:**
- Slides in from the left (transform: translateX)
- Width: 100% of viewport on mobile; 320px maximum on larger mobile devices
- Background: `#ffffff`
- Shadow: `--shadow-modal` (`0 8px 32px rgba(0,0,0,0.16)`)
- Transition: `--transition-slow` (300ms ease-out)

**Overlay:**
- Full-screen semi-transparent backdrop behind the drawer
- Colour: `rgba(0,0,0,0.4)`
- Clicking the overlay closes the drawer

**Drawer Items:**
- Font: Inter, 16px, weight 500
- Colour: `--color-text-primary`
- Height: 48px per item (touch-safe)
- Padding: 0 24px
- Divider: 1px solid `--color-border` between top-level items
- Items with children show a chevron-right icon on the right edge

**Expandable Groups:**
Tapping a parent item with children expands it inline (accordion behaviour). Children appear below the parent, indented by 16px, with font-weight 400. The parent's chevron rotates 90° to indicate open state.

**Keyboard:** `Escape` closes the drawer and returns focus to the hamburger button.

---

### 2.4 Footer

**Structure:** One footer component, shared across all pages without variation.

**Background:** `--color-bg-dark` (`#1a1a1a`)

**Layout (desktop — four columns):**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo white]        What We Do    Get Involved    Give   │
│ Tagline             Education     Volunteer       Donate │
│ Email               Women's Emp.  Sponsor a Child Events │
│                     Teacher Train Visit           Needs  │
│                     …                                    │
│─────────────────────────────────────────────────────────│
│ © 2026 SeedPower Foundation  ·  Privacy  ·  Sitemap     │
└─────────────────────────────────────────────────────────┘
```

**Layout (mobile — stacked, accordions):**
Each column collapses into an expandable section. The logo and tagline remain at top, the copyright bar at bottom.

**Logo in footer:**
- Asset: White logo variant (`seed-power-foundation-white-logo.png`)
- Height: 36px
- Margin-bottom: 8px

**Tagline:**
- Text: "Exploit Potential. Eradicate Poverty."
- Font: Inter, 14px, weight 400
- Colour: `--color-text-footer-secondary` (`#aaaaaa`)

**Column headings:**
- Font: Inter, 13px, weight 600
- Colour: `--color-text-on-dark` (`#ffffff`)
- Text-transform: uppercase
- Letter-spacing: 0.08em
- Margin-bottom: 12px

**Footer links:**
- Font: Inter, 14px, weight 400
- Colour: `--color-text-footer-secondary` (`#aaaaaa`)
- Hover: `--color-text-on-dark` (`#ffffff`), no underline
- Transition: `--transition-fast` (150ms)
- Line-height: 2 (generous vertical rhythm)

**Contact block:**
- Email: `[email protected]` shown as a mailto link, same style as footer links
- WhatsApp and Facebook icons (20px), colour `#aaaaaa`, hover to `#ffffff`

**Copyright bar:**
- Top border: 1px solid `rgba(255,255,255,0.1)`
- Padding-top: 20px
- Font: Inter, 13px, weight 400
- Colour: `--color-text-footer-secondary` (`#aaaaaa`)
- Content: "© [year] SeedPower Foundation · Registration SRD/KK/121731/2019"
- Privacy Policy and Sitemap links in same style

---

### 2.5 Buttons

Three variants only. No other button styles may be introduced.

#### Variant 1 — Primary (Brand)

```
Background:    --color-brand          (#2D5016)
Text:          --color-text-on-brand  (#ffffff)
Font:          Inter, 16px, weight 600
Padding:       12px 24px
Border-radius: --radius-sm            (4px)
Border:        none

Hover:
  Background:  --color-brand-hover    (#1f3a0f)
  Transition:  --transition-std       (200ms)

Active/Press:
  Background:  --color-brand-active   (#172a08)

Disabled:
  Background:  --color-bg-disabled    (#cccccc)
  Text:        --color-text-disabled  (#505050)
  Cursor:      not-allowed

Focus:
  Outline: 2px solid #2D5016, offset 3px
```

**Small variant:** font 14px, padding 8px 16px. Same colours, same radius.  
**Use:** Donate, primary CTA on any page section, hero buttons.

#### Variant 2 — Secondary (Dark)

```
Background:    --color-bg-dark        (#1a1a1a)
Text:          --color-text-on-dark   (#ffffff)
Font:          Inter, 16px, weight 600
Padding:       12px 24px
Border-radius: --radius-sm            (4px)
Border:        none

Hover:
  Background:  #333333
  Transition:  --transition-std

Active:
  Background:  #111111

Disabled: same as Primary variant

Focus: same as Primary variant
```

**Small variant:** font 14px, padding 8px 16px.  
**Use:** Secondary CTA when paired with a Primary button, non-donation form submissions.

#### Variant 3 — Ghost (Outline)

```
Background:    transparent
Text:          --color-brand          (#2D5016)
Font:          Inter, 16px, weight 600
Padding:       10px 22px             (2px less each axis to account for border)
Border:        2px solid #2D5016
Border-radius: --radius-sm            (4px)

Hover:
  Background:  --color-brand-surface  (#f0f4e8)
  Border-color stays #2D5016
  Text stays #2D5016
  Transition:  --transition-std

Active:
  Background:  #e3ecd8

Disabled:
  Border:      --color-bg-disabled    (#cccccc)
  Text:        --color-text-disabled  (#505050)
  Background:  transparent

Focus: same as Primary variant (green ring, 3px offset)
```

**Small variant:** font 14px, padding 6px 14px.  
**Use:** "Learn More" on programme cards, secondary paths where the primary CTA is already on the page.

#### Button Groups

When two buttons appear side by side, the Primary or Ghost button appears first (left); the Secondary appears second (right). Gap between buttons: 12px. On mobile below 480px, buttons in a group stack vertically, full width, Primary on top.

---

### 2.6 Links

#### Inline Body Links

```
Colour:        --color-brand          (#2D5016)
Decoration:    underline (always visible in body text)
Weight:        inherits from surrounding text (no weight change)

Hover:
  Colour:      --color-brand-hover    (#1f3a0f)
  Decoration:  underline (maintained)
  Transition:  --transition-fast

Visited:
  Colour:      --color-text-visited   (#4a6b2e)

Focus:
  Outline: 2px solid #2D5016, offset 2px
```

#### Navigation Links

No underline at any state. Colour and bottom-border indicator handle active state (defined in 2.1).

#### Footer Links

No underline. Colour change on hover (defined in 2.4).

#### External Links

Body-text external links include a small external-link icon (12px, same colour as the link text) immediately after the linked text. No `target="_blank"` without an accompanying accessible label indicating the new tab behaviour.

---

### 2.7 Cards

Three types. All share the same base structure.

#### Base Card Properties

```
Background:    --color-bg-page        (#ffffff)
Border:        1px solid --color-border (#e0e0e0)
Border-radius: --radius-md            (6px)
Shadow:        --shadow-none          (none — flat by default)
Padding:       24px desktop, 20px tablet, 16px mobile
Overflow:      hidden

Hover:
  Shadow:      --shadow-card          (0 2px 8px rgba(0,0,0,0.08))
  Transition:  --transition-std       (200ms)
```

#### Programme Card

Used in the What We Do section and programme listing pages.

**Structure (top to bottom):**
1. Image — aspect ratio 4:3, `object-fit: cover`, full card width, no padding
2. Content area — standard card padding
3. Programme name — H3 (`--color-brand`, Manrope 24px, weight 600)
4. Description — Body (`--color-text-primary`, Inter 16px, weight 400), maximum 3 lines with `line-clamp`
5. Stats row — 2–3 key figures (Inter 13px, weight 500, `--color-text-secondary`), e.g. "220 pupils · Est. 2019"
6. CTA — Ghost button, left-aligned, below stats row

**Image hover:**
The image scales to 1.03 (transform: scale) over `--transition-slow` (300ms). No other image effect.

**Mobile:** Full width. Image ratio becomes 16:9 to reduce vertical height on small screens.

#### Impact / Statistics Card

Used in the homepage impact row and the /impact/ overview page.

**Structure:**
1. Optional icon — 32px, `--color-brand`
2. Statistic figure — Manrope, 40px desktop / 32px mobile, weight 700, `--color-brand`
3. Label — Inter, 14px, weight 500, `--color-text-primary`

**Background:** `--color-bg-warm` (`#f5f3f0`).  
**Border:** none.  
**Shadow:** none.  
**Note:** Statistics displayed in this component must be drawn exclusively from confirmed content in the discovery documents. Unconfirmed or ambiguous figures must not appear here until client approval.

#### Story / Testimonial Card

Used in the success stories section and the /impact/success-stories/ page.

**Structure:**
1. Left border — 4px solid `--color-brand` (`#2D5016`), full card height
2. Heading — H3 (`--color-brand`, Manrope 22px, weight 600)
3. Body — Inter 16px, weight 400, `--color-text-primary`, maximum 4 lines
4. Attribution — Inter 13px, weight 500, `--color-text-secondary`
5. Optional circular avatar — 48px diameter, top-right corner

**Background:** `--color-bg-page` (`#ffffff`).

---

### 2.8 Forms

#### Input Fields

```
Background:    #ffffff
Border:        1px solid --color-border (#e0e0e0)
Border-radius: --radius-sm             (4px)
Padding:       12px 14px
Font:          Inter, 16px, weight 400
Text colour:   --color-text-primary    (#1a1a1a)
Placeholder:   --color-text-placeholder (#6b7280)
Height:        44px minimum

Focus:
  Border-color: --color-brand          (#2D5016)
  Outline:      none (the coloured border IS the focus indicator)
  Box-shadow:   0 0 0 3px rgba(45,80,22,0.15)

Error state:
  Border-color: --color-error          (#b91c1c)
  Box-shadow:   0 0 0 3px rgba(185,28,28,0.15)
```

#### Labels

```
Font:          Inter, 14px, weight 500
Colour:        --color-text-primary    (#1a1a1a)
Margin-bottom: 6px
Display:       block (labels always above their input, never inline or floating)
```

#### Error Messages

```
Font:          Inter, 13px, weight 400
Colour:        --color-error           (#b91c1c)
Margin-top:    4px
Prefix:        Error icon (16px) before text
```

#### Helper Text

```
Font:          Inter, 13px, weight 400
Colour:        --color-text-secondary  (#666666)
Margin-top:    4px
```

---

### 2.9 Section Backgrounds

Sections alternate between three background values to create visual rhythm without introducing new colours.

**Allowed section backgrounds:**

| Background | Token | Use |
|---|---|---|
| White | `--color-bg-page` (`#ffffff`) | Default; most sections |
| Soft off-white | `--color-bg-soft` (`#f9faf8`) | Alternate section, dropdown bg |
| Warm off-white | `--color-bg-warm` (`#f5f3f0`) | Impact stats, feature highlights |
| Brand green | `--color-brand` (`#2D5016`) | One CTA section per page maximum |
| Dark | `--color-bg-dark` (`#1a1a1a`) | Footer only |

Inside a green section: all text uses `--color-text-on-brand` (`#ffffff`). Ghost buttons inside a green section use a white outline variant: border `#ffffff`, text `#ffffff`, hover background `rgba(255,255,255,0.12)`.

No section may use a gradient background.

---

### 2.10 Borders and Dividers

**Card and input borders:** 1px solid `--color-border` (`#e0e0e0`).  
**Navigation bottom border:** 1px solid `--color-border` (`#e0e0e0`).  
**Story card left accent:** 4px solid `--color-brand` (`#2D5016`).  
**Footer top rule:** 1px solid `rgba(255,255,255,0.10)`.  
**Breadcrumb separator:** `--color-border-separator` (`#888888`), displayed as a `/` or `›` character.

Decorative horizontal rules between sections are not used. Visual separation is achieved through background colour changes and spacing alone.

---

### 2.11 Image Treatment

**All images are from the existing SeedPower Foundation media library.** No images are to be generated, downloaded, or replaced.

**Aspect ratios by context:**

| Context | Ratio | Notes |
|---|---|---|
| Hero banner | 16:9 | Full viewport width |
| Programme card | 4:3 desktop, 16:9 mobile | Reduces vertical space on mobile |
| Gallery | 4:3 or 1:1 | Mixed, consistent within a grid |
| Leadership portrait | 2:3 | Vertical orientation for headshots |
| Thumbnail | 1:1 | Circular or square, consistent sizing |

**Overlay on hero images:** A single `rgba(0,0,0,0.30)` overlay over the hero image. This value is fixed — not a range. It ensures text at `--color-text-on-brand` (`#ffffff`) remains readable against any photograph in the library.

**Image zoom on hover (programme cards only):** `transform: scale(1.03)`, `transition: --transition-slow (300ms)`. The image is `overflow: hidden` within its container so the zoom does not affect the card boundary.

**No other image filters.** No colour filters, no blur, no sepia. Images are shown at their natural colours.

**Alt text rule:** Every `<img>` element must have a descriptive `alt` attribute. Decorative images use `alt=""`. Alt text describes the content and context, not the visual format.

---

## SECTION 3 — HOMEPAGE STRUCTURE

### 3.1 Hero: Static Editorial Hero (Recommended)

**Recommendation: A static editorial hero, not a carousel.**

**Reasoning:**

The original site's eight-slide carousel was built to give equal prominence to each programme, but this approach creates communication problems on a modern website. Auto-advancing carousels are consistently shown to perform poorly for first-time visitors: most users do not wait through multiple slides, so the majority of carousel content is not seen. The carousel also distributes the organisation's primary message across eight competing panels, diluting the impact of each. For a first-time international donor or partner visiting the site, the most important task is understanding what SeedPower does and why it matters — a goal a single well-composed editorial hero accomplishes more directly.

The eight programmes are better served by a dedicated programme grid below the hero, where every programme receives equal, visible presence without competing for the same seconds of attention.

**Static hero specification:**

```
Width:          Full viewport (100vw)
Height:         520px desktop, 420px tablet, 320px mobile
Image:          Single high-quality photograph from existing library
                (recommended: a school assembly or community outreach image
                 showing people — not an empty facility)
Overlay:        rgba(0,0,0,0.30) — fixed value
Layout:         Content centred horizontally, vertically centred in hero

Content:
  Eyebrow:      "Kenya, East Africa" — Inter 13px, weight 500,
                letter-spacing 0.08em, uppercase, #ffffff, opacity 0.8
  H1:           "Empowering Communities Through Education and Care"
                (or the organisation's preferred statement — REQUIRES CLIENT APPROVAL)
  Subtext:      One sentence from the confirmed mission statement.
                Inter 18px, weight 400, #ffffff, max-width 580px, centred
  Buttons:      Primary button "Donate Now" → /give/donate/
                Ghost button (white variant) "Our Work" → /what-we-do/
                Gap between buttons: 12px
```

**If the client wishes to retain a carousel:** The carousel must be manually advanced only (no autoplay). It must include accessible prev/next controls, pause functionality, and slide position indicators. All eight slides must meet the contrast requirement for text over their respective background images. This specification does not prohibit a manually-advanced carousel; it recommends against autoplay as a communication strategy. The final decision requires client input.

---

### 3.2 Homepage Section Sequence

**All statistics displayed on the homepage must be drawn from confirmed figures in `docs/full-website-discovery-report.md` and `docs/content-verification-and-sitemap.md`. Figures that are marked as requiring client confirmation must not appear in impact statistics components until they have been confirmed.**

Confirmed figures available for use: 375 students enrolled; founded 2018; registered 2019; 1,738 educators trained across 47 counties (teacher outreach, cumulative); nearly 100 women trained.

Turkana outreach figure (2,460 families) is an interpretation, not a confirmed figure. It must not appear in a statistics card until confirmed by the client.

---

**Section 1 — Navigation** (sticky, as specified in 2.1)

**Section 2 — Hero** (as specified in 3.1)
Background: warm (`--color-bg-warm`)

**Section 3 — Mission Statement Strip** (optional, single-line)
- Background: `--color-bg-soft` (`#f9faf8`)
- Content: Mission statement text in full, Inter 18px, weight 400, centred, `--color-text-primary`
- Padding: 32px vertical

**Section 4 — Impact Statistics**
- Background: `--color-bg-warm` (`#f5f3f0`)
- Layout: 4-column row (desktop), 2×2 grid (tablet), single column (mobile)
- Cards: Impact cards as specified in 2.7, using confirmed figures only
- Padding: `--space-16` (64px) vertical

**Section 5 — What We Do (Programme Grid)**
- Background: `--color-bg-page` (`#ffffff`)
- Heading: H2 "What We Do", `--color-text-primary`, centred
- Subheading: Inter 18px `--color-text-secondary`, max 1 line, centred
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Cards: Programme cards as specified in 2.7
- Up to 6 programmes shown; "View all programmes" ghost button below grid
- Padding: `--space-16` (64px) vertical

**Section 6 — Featured Story**
- Background: `--color-bg-page` (`#ffffff`)
- Layout: 2-column, image left (60%) / content right (40%) desktop; stacked mobile
- Content: One success story or impact narrative
- CTA: Ghost button "More Stories" → /impact/success-stories/
- Padding: `--space-16` (64px) vertical

**Section 7 — Get Involved (CTA Block)**
- Background: `--color-brand` (`#2D5016`)
- Layout: 3 equal columns (Donate / Volunteer / Sponsor a Child)
- Each column: Large icon (white), heading (white, Manrope 20px), one-sentence description (white, Inter 15px), Ghost button (white outline variant)
- Padding: `--space-16` (64px) vertical

**Section 8 — Footer** (as specified in 2.4)

---

## SECTION 4 — ACCESSIBILITY SPECIFICATION

### 4.1 Colour Contrast — Verified Ratios

All ratios calculated using the WCAG 2.1 relative luminance formula. WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18pt / 24px+ or 14pt bold / 18px+ bold) and UI components.

| Combination | Ratio | AA Normal | AA Large | AAA |
|---|---|---|---|---|
| `#2D5016` on `#ffffff` | 9.25:1 | ✓ | ✓ | ✓ |
| `#2D5016` on `#f9faf8` | 8.83:1 | ✓ | ✓ | ✓ |
| `#2D5016` on `#f5f3f0` | 8.35:1 | ✓ | ✓ | ✓ |
| `#2D5016` on `#f0f4e8` | 8.28:1 | ✓ | ✓ | ✓ |
| `#ffffff` on `#2D5016` | 9.25:1 | ✓ | ✓ | ✓ |
| `#ffffff` on `#1f3a0f` | 12.57:1 | ✓ | ✓ | ✓ |
| `#ffffff` on `#172a08` | 15.32:1 | ✓ | ✓ | ✓ |
| `#1a1a1a` on `#ffffff` | 17.4:1 | ✓ | ✓ | ✓ |
| `#1a1a1a` on `#f9faf8` | 16.62:1 | ✓ | ✓ | ✓ |
| `#1a1a1a` on `#f5f3f0` | 15.71:1 | ✓ | ✓ | ✓ |
| `#666666` on `#ffffff` | 5.74:1 | ✓ | ✓ | — |
| `#666666` on `#f9faf8` | 5.48:1 | ✓ | ✓ | — |
| `#666666` on `#f5f3f0` | 5.18:1 | ✓ | ✓ | — |
| `#505050` on `#cccccc` | 5.02:1 | ✓ | ✓ | — |
| `#aaaaaa` on `#1a1a1a` | 7.49:1 | ✓ | ✓ | ✓ |
| `#ffffff` on `#1a1a1a` | 17.4:1 | ✓ | ✓ | ✓ |
| `#ffffff` on `#32373c` | 12.02:1 | ✓ | ✓ | ✓ |
| `#4a6b2e` on `#ffffff` | 6.12:1 | ✓ | ✓ | — |
| `#b91c1c` on `#ffffff` | 6.47:1 | ✓ | ✓ | — |
| `#6b7280` on `#ffffff` | 4.83:1 | ✓ | ✓ | — |
| `#888888` on `#ffffff` | 3.54:1 | — | ✓ | — |

**`#888888` on white** achieves 3.54:1 — it passes the 3:1 threshold for UI components and large text, but not normal text. Its use is restricted to decorative separators (breadcrumbs), never for readable text content.

**`#999999` fails** (2.85:1 on white). Removed from the token set entirely.

The previous document stated brand green achieved 7.2:1 on white. The correct calculated value is **9.25:1** (AAA). The error red previously specified (`#d9534f`) achieved only 3.96:1 — below the 4.5:1 normal-text threshold. It is replaced by `#b91c1c` (6.47:1).

### 4.2 Keyboard Navigation

- Tab order must follow logical reading order (left to right, top to bottom).
- The skip navigation link "Skip to main content" must be the first focusable element on every page. It is visually hidden by default and becomes visible on focus.
- Dropdown menus open on focus (via keyboard Enter or Space) and close on Escape.
- The mobile navigation drawer opens via Enter/Space on the hamburger button and closes via Escape, returning focus to the hamburger button.
- Modal dialogs (if used) trap focus within the modal until closed.
- All interactive elements are reachable by keyboard without exception.

### 4.3 Touch Targets

Minimum interactive area: 44×44px. This applies to:
- All button elements
- All link elements in navigation
- All form controls
- All icon-only controls (hamburger, close, chevron)
- All carousel controls (if retained)

For links within dense body text where the visual element is smaller, the clickable area is expanded using padding, not by changing visible text size.

### 4.4 Reduced Motion

All CSS transitions and transforms must be wrapped in a `@media (prefers-reduced-motion: no-preference)` check or its inverse. Users who have requested reduced motion receive static states without animation. This applies to:
- Hero image scale effect (if carousel)
- Card image zoom on hover
- Drawer slide-in transition
- Dropdown fade/slide transitions

### 4.5 Screen Reader Considerations

- Navigation landmark: `<nav aria-label="Main navigation">`
- Main content: `<main>` element wrapping all page-specific content
- Footer: `<footer aria-label="Site footer">`
- Carousel controls (if used): `aria-label="Previous slide"`, `aria-label="Next slide"`, `aria-live="polite"` on slide content region
- Dropdown parent items: `aria-haspopup="true"`, `aria-expanded="false/true"` reflecting state
- Mobile hamburger: `aria-label="Open navigation menu"` / `aria-label="Close navigation menu"` depending on state

---

## SECTION 5 — BRAND COLOUR AUDIT RECORD

Included for reference. This section documents where the colour values were sourced.

**`#2D5016` — Source:** Extracted from primary logo file `seed-power-foundation-green-logo.png`. This colour appears in the logo mark (the icon/leaf element). The extracted value has been confirmed against the logo's actual pixel colours.

**`#ffffff` — Source:** White logo variant (`seed-power-foundation-white-logo.png`) and all page backgrounds across the 23 downloaded HTML files.

**`#1a1a1a` — Source:** Introduced as a modern near-black to replace the multiple grey text values (including `#32373c` and `#000000`) used inconsistently across the Astra/Elementor theme.

**`#f5f3f0`, `#f9faf8` — Source:** Warm neutrals derived to complement the earthy green without introducing competing hues. Neither is taken from the original site (which used only stark white backgrounds). Both sit in a neutral-warm range that naturally accompanies foliage greens.

**Colours sourced from the original site but NOT carried forward:** `#32373c` (Astra body default), `#abb8c3` (Astra inactive), `#5e2d3b` (one-off page style — incompatible). All excluded on documented grounds.

---

## SECTION 6 — DECISIONS REQUIRING CLIENT OR OWNER APPROVAL

The following items cannot be resolved from the existing audit documents and require explicit confirmation before implementation proceeds.

### 6.1 Hero Headline Copy

The static hero requires a primary H1 headline and a one-sentence mission subtext. The current mission statement ("To enable, equip and empower students with special needs and children at risk to develop to their maximum potential in their school, families and the community") is accurate but long for a hero heading.

**Decision needed:** Approve the full mission statement as the hero subtext, or provide a shorter preferred statement. Approve a preferred hero H1 headline, or confirm the placeholder.

### 6.2 Hero or Carousel

This specification recommends a static editorial hero. The original site used an eight-slide autoplay carousel.

**Decision needed:** Confirm the static hero, or request a manually-advanced carousel. If a carousel is chosen, confirm which programme images and descriptions to use, as the existing slides were drawn from Elementor widget data.

### 6.3 Turkana Outreach Figure

The figure of 2,460 families is an interpretation from the homepage carousel JSON (described as "several outreach" trips, cumulative). Two individual trip counts (680 and 1,260) appear elsewhere on the site. This figure must not appear in a statistics card until confirmed.

**Decision needed:** Confirm whether 2,460 is the cumulative total, and whether it should be displayed as a headline impact metric on the homepage or only on the Turkana programme page.

### 6.4 Teacher Training Timeline

The figure 1,738 educators trained across 47 counties is confirmed in multiple sources. The timeline over which this was achieved is not stated in any source document.

**Decision needed:** Provide the date or year range for the 1,738 figure so it can be presented with accurate context (e.g. "since 2019" or "2021–2026").

### 6.5 Women's Empowerment Reach

"Nearly 100 women" is the stated figure. Whether this is cumulative or current active participants is unconfirmed.

**Decision needed:** Confirm whether this is a cumulative total or current enrolment, and the approximate date from which it is measured.

### 6.6 Community Reach Timeframe

"3,600 people reached" through community outreach is stated on the What We Do page. No timeframe is given.

**Decision needed:** Confirm the period this figure covers (annual or cumulative since founding) and whether a breakdown by programme area is available.

### 6.7 Contact Information

The site currently shows only `[email protected]`. A complete contact block requires a postal address (or city/region), a phone number, and office hours.

**Decision needed:** Provide complete contact details for the footer and Contact page, or confirm which details should remain unpublished.

### 6.8 Staff and Team Photographs

The discovery audit identified photographs for both co-founders and three board members (Jim Grinnell, Laura Grinnell, Linda Steed). Photographs for Jean Karsten Winfrey and Keith Winfrey were not confirmed in the media inventory.

**Decision needed:** Confirm whether photographs are available for all board members, or whether the Who We Are page should use a consistent placeholder treatment for members without photos.

---

## DOCUMENT STATUS

**Version 2.0 is the definitive design specification** for the SeedPower Foundation website redesign.

All ambiguities from v1.0 have been resolved with single, documented decisions. Contrast ratios have been recalculated from first principles. All component specifications present one standard, not options.

**This document may be extended** to cover additional components (modals, accordions, breadcrumb full spec, pagination) as they arise during implementation. Any extension must be recorded here before it is built.

**Implementation must not begin** until Section 6 approval items have been reviewed and the document has been approved.
