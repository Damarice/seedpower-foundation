# Visual Audit — SeedPower Foundation
Captured: live site at https://seedpower-foundation.vercel.app/
Viewports: 1440px, 1024px, 768px, 390px
Screenshots: 24 total (6 pages × 4 widths)

---

## Summary of Top 5 Most Severe Issues

1. **[BLOCKING] Homepage — Statistics section is single-column on all viewports.** The four stats (Students Served, Teachers Trained, Women Trained, Year Founded) each occupy a full-width row even at 1440px. They should form a single horizontal row of four on desktop.

2. **[BLOCKING] Homepage & What We Do page — Programme cards are single-column on all viewports.** All six programme cards stack vertically even at 1440px and 1024px. Each card takes up the full content width with a large empty placeholder image area above the title. The required multi-column grid (e.g. 3×2 on desktop, 2×3 on tablet) is not applied.

3. **[BLOCKING] Footer — single-column layout on all pages at all viewports.** The brand/contact block and all three link groups (Programmes, Involve, Give) are stacked as separate vertical sections even at 1440px. The required 4-column horizontal desktop layout is absent. Each link group has ~100–150px of padding below it, consuming excessive vertical space.

4. **[BLOCKING] Homepage — Get Involved / "Ways to Give" CTA cards are single-column.** On the homepage the green "Get Involved" section shows three action items (Donate, Volunteer, Sponsor a Child) stacked vertically. On the `/give` page the "Ways to Give" section (Donate, Sponsor a Child, Events) similarly stacks. Both should be three horizontally aligned cards on desktop.

5. **[BLOCKING] Who We Are — Founders section is single-column on all viewports.** Beldon Okeyo and Peter Opinya are stacked one above the other even at 1440px and 1024px, each with a very large empty placeholder image area and their bio below. They should sit side-by-side (2-column) on desktop and 768px.

---

## Page-by-Page Findings

---

### `/` — Homepage

#### Hero Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768, 390 | minor | Hero is centered, narrow single-column text block. No visible background image — large grey placeholder area. This is an approved pending-asset state; no layout defect. |

#### Statistics Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | All four stats (375, 1,738, ~100, 2018) render in a single column, each on its own full-width row. No horizontal arrangement. Stat numbers appear in green, labels in small grey text below. |
| 1024 | **blocking** | Same single-column stacking. |
| 768 | **blocking** | Same single-column stacking. |
| 390 | minor | Single-column is acceptable at mobile but the values and labels have no visual container/card differentiation; the section reads as a plain list. |

#### What We Do Section (homepage preview)
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | Six programme cards are in a single column. Each card has a very tall empty grey image placeholder (roughly 300–400px tall), then title, description, and "Learn More" button. Combined, this section is ~6 500px tall on a 1440px viewport — the majority of the page length. |
| 1024 | **blocking** | Same. The section is proportionally even more dominant. |
| 768 | **blocking** | Same. Single column of six cards. |
| 390 | minor | Single column is appropriate but image placeholders are very tall relative to the card content, creating poor visual balance. |

#### "View All Programmes" CTA
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | Button is centered below the card list; appropriate, no issue. |

#### Get Involved / "Growing From 12 to 375 Students" Story Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | The story section and green CTA band appear, but the green "Get Involved" section (homepage) shows three action items — icons and labels — stacked vertically in a narrow centered column even at 1440px. The required three horizontal cards layout is absent. |

#### Green CTA Band ("Get Involved")
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | Donate, Volunteer, and Sponsor a Child are each in their own row with an icon, label, and input/button. The three items should be a horizontal row of three cards. Currently the section is very tall and visually unbalanced. |
| 1024 | **blocking** | Same stacking. |
| 768 | **blocking** | Same stacking. |
| 390 | minor | Stacking acceptable; spacing feels excessive between items. |

#### Footer (Homepage)
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | Footer is a single dark column. Brand name and tagline at top-left, then three link groups (Programmes, Involve, Give) each with a blank line before them, all stacked vertically. No horizontal column layout. Consumes ~600px of vertical space that a 4-column grid would condense to ~200px. |
| 1024 | **blocking** | Same single-column layout. |
| 768 | **blocking** | Same. The footer spans the same ~600px vertically. |
| 390 | minor | Single-column at mobile is acceptable, but each link group has excessive top padding (~60px gap between groups). |

---

### `/what-we-do` — What We Do

#### Page Header
| Viewport | Severity | Issue |
|---|---|---|
| All | minor | Narrow centered header block; text-only, no image placeholder. Looks clean. |

#### "Our Programmes" Grid
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | All 6 programme cards (Education Centers, Women's Empowerment, Teacher Training, Water & Sanitation, Sustainable Food Project, Community Outreach) are in a single full-width column. Each card has a tall empty grey placeholder image (~300px), then title, stats line, description, and "Learn More". The page is 6,363px tall — almost entirely due to this single-column stacking. A 3-column grid would render this in roughly 2,100–2,500px. |
| 1024 | **blocking** | Same. Page is 5,874px tall. |
| 768 | **blocking** | Same. Each card fills the full 768px width. |
| 390 | minor | Single column appropriate. Image placeholders remain very tall; minor negative space issue. |

#### Footer
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | **blocking** | Same footer issue as homepage — single-column, no horizontal layout. |
| 768 | **blocking** | Same. |
| 390 | minor | Acceptable mobile layout, excessive gap between link groups. |

---

### `/who-we-are` — Who We Are

#### About / Mission / Vision / Values
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | These four text sections appear in a narrow centered single column, each with appropriate heading and body. No layout issue — this content reads naturally in a single column. However the centered narrow column (roughly 500px wide) wastes significant horizontal space at 1440px. Consider wider max-width for prose sections. |

#### Founders Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | Beldon Okeyo and Peter Opinya are stacked vertically. Each founder occupies the full page width with a large grey square image placeholder (roughly 350×350px) on the left and name/title/bio on the right within the card — but the two founder cards themselves are stacked, not side by side. Total section height is ~1,100px. A 2-column grid would halve this. |
| 1024 | **blocking** | Same stacking. The grey image placeholder appears left-aligned at ~250px wide; bio text runs the remaining width. The two cards are still vertically stacked. |
| 768 | **blocking** | Same stacking. The layout appears identical to 1024px; no breakpoint change. |
| 390 | minor | Single column acceptable at 390px. Placeholder image appears as a full-width grey block which is a bit large. |

#### Advisory Board Grid
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768 | minor | 5 board members show in a 2-column grid (Jean Karsten Winfrey, Jim Grinnell / Laura Grinnell, Linda Steed / Keith Winfrey centred alone). This is acceptable but on 1440px a 3-column or at minimum the 5th member should not stand alone. The solo 5th card is a minor visual imbalance. |
| 390 | minor | 2-column grid on mobile is tight; first names get truncated visually but readable. Consider single column at 390px. |

#### Footer
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768 | **blocking** | Same footer single-column issue. |

---

### `/give` — Give

#### "Ways to Give" Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | Donate, Sponsor a Child, and Events are each in full-width cards, stacked vertically. Each card spans the full content width (~860px at 1440px). These should be three equal-width columns on desktop. The CTA buttons ("Donate Now", "Learn More") each span 100% of the card width — the Donate Now button is particularly oversized. |
| 1024 | **blocking** | Same. Each card fills ~780px. |
| 768 | **blocking** | Same. The Events card has no button (content is "Event details will be published here when confirmed"), making it appear visually incomplete relative to the other two. |
| 390 | minor | Stacking is appropriate. The full-width buttons work at this size. |

#### "Make a Difference Today" CTA Band
| Viewport | Severity | Issue |
|---|---|---|
| All | minor | Simple centered green band with one button — layout is fine. |

#### Footer
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768 | **blocking** | Same footer single-column issue. |

---

### `/give/donate` — Donate

#### "Your Gift in Action" Tier Cards
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | **blocking** | The three giving tiers ($20, $40, $480) are stacked in a single full-width column. Each card is roughly 80px tall (dollar amount + label). These three compact cards would work well in a horizontal 3-column row on desktop, reducing scroll. |
| 1024 | **blocking** | Same. The page is unusually long for such limited content because of the stacking. |
| 768 | minor | Stacking is marginally acceptable at 768px but a 3-column would still fit. |
| 390 | minor | Single column is fine at mobile. |

#### "Make a Secure Donation" Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | "Donate Now" button is left-aligned and small (auto-width), inconsistent with the full-width buttons used elsewhere. Minor visual inconsistency. |

#### "Other Ways to Help" CTA Band
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | "Sponsor a Child" and "Volunteer" buttons are stacked vertically even on desktop. They should sit side-by-side in one horizontal row. |
| 768 | minor | Same stacking. |
| 390 | minor | Stacking is acceptable at mobile. |

#### Footer
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768 | **blocking** | Same footer single-column issue. |

---

### `/contact` — Contact

#### "Get in Touch" Section
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | WhatsApp and Facebook contact cards are stacked vertically in a narrow centered column (~500px wide). At 1440px these two cards could comfortably sit side by side. Not blocking but wastes horizontal space. |
| 768, 390 | minor | Single column acceptable at these widths. |

#### "Send an Enquiry" Section
| Viewport | Severity | Issue |
|---|---|---|
| All | minor | Placeholder box "Contact form coming soon" is appropriately sized and centered. No layout issue. |

#### Excessive Whitespace — Contact Sections
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024 | minor | Large vertical gap (~80px) between "Get in Touch" and "Send an Enquiry" sections. The page is relatively short with a lot of visual air; the gaps feel disproportionate for the amount of content. |

#### Footer
| Viewport | Severity | Issue |
|---|---|---|
| 1440, 1024, 768 | **blocking** | Same footer single-column issue. |

---

## Cross-Cutting Issues

### Navigation Bar
| Viewport | Severity | Issue |
|---|---|---|
| All | minor | The hamburger menu (≡) appears at all viewport widths including 1440px and 1024px. No horizontal nav links are visible on desktop. If this is an intentional design choice for a minimal nav, it is acceptable, but it is unusual for a desktop experience. Worth confirming the intended desktop nav pattern. |

### Image Placeholders
| Viewport | Severity | Issue |
|---|---|---|
| All | minor | All programme card images, founder photos, and board member photos are large grey placeholder blocks. These are expected pending real assets, but the placeholder heights (250–400px each) exaggerate the single-column stacking problem. Once real images are in place and grids are fixed, the section heights will normalise. |

### Section Widths — Narrow Prose Columns
| Viewport | Severity | Issue |
|---|---|---|
| 1440 | minor | On several pages (Who We Are, Contact, Donate — "Your Gift Matters") the prose text is constrained to roughly 500–550px centred, leaving ~450px of empty space on each side. This is very narrow for a 1440px viewport. A wider max-width (e.g. 720–800px for prose, or a two-column layout pairing text with an image placeholder) would be more appropriate. |

### Volunteer Page
| Viewport | Severity | Issue |
|---|---|---|
| — | minor | There is no `/volunteer` route captured (not in scope for this audit). The footer links to Volunteer and Visit Your Child pages. These were not included in the audit scope. |

---

## Issue Count by Severity

| Severity | Count |
|---|---|
| Blocking | 22 |
| Minor | 22 |
| **Total** | **44** |

---

## Recommended Fix Priority

1. **Footer** — fix the multi-column layout sitewide (affects all 6 pages × 3 viewports)
2. **Programme cards grid** — homepage preview and `/what-we-do` page (single fix likely reuses same component)
3. **Statistics row** — homepage, 4 stats into one horizontal row on desktop
4. **Get Involved / Ways to Give cards** — homepage CTA and `/give` page cards into 3-column row
5. **Founders grid** — `/who-we-are`, place two founders side-by-side on desktop/tablet
6. **Donate tier cards** — 3 gift-tier cards into a row on desktop
7. **Donate "Other Ways" buttons** — place side-by-side on desktop
