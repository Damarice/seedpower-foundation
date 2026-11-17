# SeedPower Foundation — Pre-Development Workspace Cleanup Report

**Date:** November 17, 2026  
**Performed by:** Automated cleanup step (pre-development workflow)  
**Workspace root:** `c:\Users\Damarice\seedpower-foundation`

---

## 1. Original Project Structure

All files resided in a single flat `docs/` directory. No other directories or files existed outside `docs/`.

```
seedpower-foundation/
└── docs/                                                    (1 directory)
    ├── content-verification-and-sitemap.md      32.3 KB
    ├── full-website-discovery-report.md         33.2 KB
    ├── homepage-raw.html                        85.3 KB
    ├── page-about-us-what-we-do.html           116.9 KB
    ├── page-about-us.html                      101.3 KB
    ├── page-article-power-in-seed.html          90.5 KB
    ├── page-contact-news-success-stories.html  105.6 KB
    ├── page-contact.html                       184.8 KB
    ├── page-education-school.html               78.3 KB
    ├── page-elementor-2202.html                 84.0 KB
    ├── page-fundraise.html                      89.4 KB
    ├── page-news-gallery.html                  184.8 KB
    ├── page-news.html                           91.6 KB
    ├── page-online-fundraising.html             75.4 KB
    ├── page-outreach-programs.html             100.7 KB
    ├── page-post-hello-world.html               80.8 KB
    ├── page-sponsor-a-child.html                83.7 KB
    ├── page-success-stories.html               105.6 KB
    ├── page-visit-your-child.html              107.8 KB
    ├── page-volunteer.html                      97.0 KB
    ├── page-ways-to-donate-donate.html         106.9 KB
    ├── page-ways-to-donate.html                 80.1 KB
    ├── page-what-we-do-2.html                   73.4 KB
    ├── page-what-we-do.html                    116.9 KB
    ├── page-who-we-are.html                    104.5 KB
    ├── project-cleanup-audit.md                 15.5 KB
    ├── technical-implementation-architecture.md  94.4 KB
    ├── visual-design-direction.md               41.5 KB
    ├── website-discovery-audit.md               46.3 KB
    └── wp-api-pages.json                       727.2 KB

Total: 30 files, approximately 3.08 MB
```

---

## 2. Files and Folders Retained (with reasons)

### Essential documentation — `docs/architecture/`

| File | Reason |
|---|---|
| `technical-implementation-architecture.md` | Approved technical architecture v1.2. Contains the full technology stack, component hierarchy, design token implementation, routing, accessibility requirements, security, testing plan, 9 development phases, and 15 outstanding client decisions (Section 14). The authoritative implementation reference. Must not be modified. |

### Essential documentation — `docs/design/`

| File | Reason |
|---|---|
| `visual-design-direction.md` | Approved visual design direction v2.0. Contains colour tokens, typography system, spacing scale, component specifications, responsive breakpoints, and the single source of truth for all design decisions. Must not be modified. |

### Essential documentation — `docs/research/`

| File | Reason |
|---|---|
| `full-website-discovery-report.md` | Complete 20-page audit of the existing SeedPower Foundation website. Covers all 18 published pages, 2 blog posts, 73 images, 6 external links, navigation hierarchy, 5 content discrepancies requiring client confirmation, and all media asset URLs. The primary discovery deliverable. |
| `content-verification-and-sitemap.md` | Contains unique content not fully present in the discovery report: homepage carousel data (8 slides with detailed programme descriptions extracted from WordPress JSON), detailed resolution of the Turkana family count discrepancy (680 / 1,260 / 2,460), a definitive per-page content inventory with page-level treatment decisions, the proposed new sitemap with full information architecture, URL strategy and 301 redirect map, and content consolidation recommendations. |
| `website-discovery-audit.md` | Initial 5-page discovery audit. Contains useful contextual analysis predating the full audit, including the reference to Africa CSID as the benchmark, the initial content inventory, contact information section, and several discrepancy questions not all present in later documents. Retained as historical record. |

### Content reference — `docs/content/`

| File | Reason |
|---|---|
| `wp-api-pages.json` (727.2 KB) | WordPress REST API export containing structured metadata for all 18 published pages: WordPress page IDs, slugs, parent-child relationships, publication dates, modification dates, Yoast SEO metadata, and the full Elementor-rendered HTML content for each page. This is the primary structured data source and cannot be recreated without API access to the live site. |
| `homepage-raw.html` | Raw HTML snapshot of the homepage. Contains full Elementor structure including the 8-slide carousel with inline programme content, navigation, footer, image URLs, and schema.org markup. Retained as source-of-truth reference for content migration. |
| `page-about-us.html` | About Us page snapshot with full registration details, mission, vision, values, organizational philosophy. |
| `page-about-us-what-we-do.html` | Additional snapshot from the About Us / What We Do path. Different hash from `page-what-we-do.html`; contains a different URL entry point and slight navigation variations. |
| `page-article-power-in-seed.html` | Snapshot of the "There Is Power In Every Seed" blog post (ID 1108, Jan 2021). Contains foundational philosophical content, the full organization vision and mission statement, and Genesis 1:28 reference. Not an artifact — genuine organizational content. |
| `page-contact-news-success-stories.html` | Success Stories page snapshot from `/contact/news/success-stories/`. Different hash from `page-success-stories.html`. Retained as separate evidence of the page under its original URL hierarchy. |
| `page-contact.html` | Fundraise/Contact page snapshot. At 184.8 KB, the largest page file; contains the Indaba Gala 2026 details, complete advisory board listing, and all specific fundraising campaign figures ($25/textbook, $63/teacher insurance, $400/$200 staff salaries). |
| `page-education-school.html` | Community Outreach / Education and School Program page snapshot (`/what-we-do/community-outreach/`). Confirmed minimal content, retained as evidence of the page's sparse state. |
| `page-elementor-2202.html` | Women's Empowerment page snapshot (`/elementor-2202/`). Contains the full programme description including the problem statement, skill training details (sewing, basket making), the elderly woman's house story, and 12 programme photos referenced. |
| `page-fundraise.html` | Fundraise page snapshot (`/fundraise/`). Contains Indaba Gala 2026 details and the fundraising needs section. |
| `page-news-gallery.html` | News & Gallery page snapshot. Same URL as `/contact/` in the navigation but different hash and file; retained as separate content reference. |
| `page-news.html` | "SeedPower in Action" news page snapshot (`/contact/news/`). Contains the Nozak Consulting partnership mention, programme update sections, and 8 image references. |
| `page-online-fundraising.html` | Online Fundraising page snapshot. Confirmed minimal/sparse content; retained as evidence of placeholder state and external NeonCRM link. |
| `page-outreach-programs.html` | Teacher Outreach and Training page snapshot. Contains the Turkana outreach narrative (680 families figure, 3 locations, local pastor names), the 2022 Kisumu Conference details (305 attendees, 47 counties), and 32 photo references. |
| `page-sponsor-a-child.html` | Sponsor a Child page snapshot. Contains the GOBGI external link (`gobgi.org/seedpowerkenya/`), child sponsorship messaging, and 8 asset references. |
| `page-success-stories.html` | Success Stories page snapshot from an alternative URL path. Contains growth timeline (12 students 2019 → 375 students 2026) and 16 impact photo references. |
| `page-visit-your-child.html` | Visit Your Child page snapshot. Contains Lorem Ipsum placeholder text, event calendar entries (October 25/27 dates), donation category structure, and the `__trashed` canonical URL issue. Retained as evidence of the page's incomplete state requiring client decision. |
| `page-volunteer.html` | Volunteer page snapshot. Contains all 5 volunteer areas, mission trip details (1 week to 1 month), and "Together We Can Change The World!" tagline. |
| `page-ways-to-donate-donate.html` | Donate page snapshot. Contains all donation impact tiers ($20/$40/$480), both NeonCRM donation links, and recurring donation messaging. |
| `page-ways-to-donate.html` | Ways to Donate parent page snapshot. Confirmed placeholder ("loading soon") state; retained as evidence. |
| `page-what-we-do.html` | Main What We Do page snapshot (ID 1040). The most content-rich page at 116.9 KB; contains all 8 programme descriptions with statistics, the 1,260 families Turkana figure, full WASH programme data, and all programme photo references. |
| `page-who-we-are.html` | Who We Are page snapshot. Contains full co-founder bios (Beldon Okeyo, Peter Opinya), complete advisory board listing with names, all 7 leadership photo URLs, and board philosophy statement. |

---

## 3. Files Removed (with specific reasons)

| File | Reason |
|---|---|
| `docs/page-what-we-do-2.html` (73.4 KB) | Snapshot of the placeholder `/what-we-do-2/` page (WordPress ID 2216). Content analysis confirmed it contains only the site tagline and navigation — zero programme content. The WordPress JSON confirms `content.rendered` length is 0 for this page. All three discovery documents categorise this as an empty duplicate/artifact. No unique information. |
| `docs/page-post-hello-world.html` (80.8 KB) | Snapshot of the default WordPress "Hello World" post (ID 1, March 2020). This is a WordPress installation artifact with no custom SeedPower content. The discovery report explicitly categorises it as "DEFAULT POST" / "ARTIFACTS/TEMPLATE". No organizational value. |
| `docs/project-cleanup-audit.md` (15.5 KB) | An intermediate cleanup audit document created during this workflow's earlier phase. It reached the conclusion "KEEP ALL FILES" and proposed the same subdirectory structure that has now been implemented. Its content is fully superseded by this report, which is more comprehensive and reflects actual decisions made and implemented. Removing it prevents confusion between the preliminary recommendation and the executed outcome. |

---

## 4. Files Moved or Reorganised (from → to)

| Original location | New location |
|---|---|
| `docs/technical-implementation-architecture.md` | `docs/architecture/technical-implementation-architecture.md` |
| `docs/visual-design-direction.md` | `docs/design/visual-design-direction.md` |
| `docs/full-website-discovery-report.md` | `docs/research/full-website-discovery-report.md` |
| `docs/website-discovery-audit.md` | `docs/research/website-discovery-audit.md` |
| `docs/content-verification-and-sitemap.md` | `docs/research/content-verification-and-sitemap.md` |
| `docs/homepage-raw.html` | `docs/content/homepage-raw.html` |
| `docs/page-about-us.html` | `docs/content/page-about-us.html` |
| `docs/page-about-us-what-we-do.html` | `docs/content/page-about-us-what-we-do.html` |
| `docs/page-article-power-in-seed.html` | `docs/content/page-article-power-in-seed.html` |
| `docs/page-contact-news-success-stories.html` | `docs/content/page-contact-news-success-stories.html` |
| `docs/page-contact.html` | `docs/content/page-contact.html` |
| `docs/page-education-school.html` | `docs/content/page-education-school.html` |
| `docs/page-elementor-2202.html` | `docs/content/page-elementor-2202.html` |
| `docs/page-fundraise.html` | `docs/content/page-fundraise.html` |
| `docs/page-news-gallery.html` | `docs/content/page-news-gallery.html` |
| `docs/page-news.html` | `docs/content/page-news.html` |
| `docs/page-online-fundraising.html` | `docs/content/page-online-fundraising.html` |
| `docs/page-outreach-programs.html` | `docs/content/page-outreach-programs.html` |
| `docs/page-sponsor-a-child.html` | `docs/content/page-sponsor-a-child.html` |
| `docs/page-success-stories.html` | `docs/content/page-success-stories.html` |
| `docs/page-visit-your-child.html` | `docs/content/page-visit-your-child.html` |
| `docs/page-volunteer.html` | `docs/content/page-volunteer.html` |
| `docs/page-ways-to-donate-donate.html` | `docs/content/page-ways-to-donate-donate.html` |
| `docs/page-ways-to-donate.html` | `docs/content/page-ways-to-donate.html` |
| `docs/page-what-we-do.html` | `docs/content/page-what-we-do.html` |
| `docs/page-who-we-are.html` | `docs/content/page-who-we-are.html` |
| `docs/wp-api-pages.json` | `docs/content/wp-api-pages.json` |

No internal cross-references between documents were broken by these moves. The documentation files reference each other by name (not path), and the HTML/JSON files are standalone reference artifacts not linked from other documents.

---

## 5. Important Documentation Confirmed Preserved

| Document | Version | Status |
|---|---|---|
| `docs/architecture/technical-implementation-architecture.md` | v1.2 — Final Technical Architecture | ✓ Intact. Version header confirmed. Section 14 (15 outstanding client decisions) confirmed present. |
| `docs/design/visual-design-direction.md` | v2.0 — Definitive Specification | ✓ Intact. Version header confirmed. All design tokens, typography, spacing, and component specifications present. |
| `docs/research/full-website-discovery-report.md` | Complete (Nov 17, 2026) | ✓ Intact. 20-page audit with 73 images and all 5 content discrepancies documented. |
| `docs/research/content-verification-and-sitemap.md` | Comprehensive Audit Complete | ✓ Intact. Homepage carousel data, Turkana discrepancy analysis, proposed sitemap preserved. |
| `docs/research/website-discovery-audit.md` | Initial audit (Nov 17, 2026) | ✓ Intact. 5-page initial findings retained as historical reference. |

**Section 14 — 15 Outstanding Client Decisions confirmed preserved:**
1. Hero headline copy and type (static vs carousel)
2. Turkana family count (680 / 1,260 / 2,460 discrepancy)
3. Turkana — standalone page or subsection?
4. Indaba Gala 2026 — current event status
5. Indaba Gala — is it annual?
6. Visit Your Child — rebuild, consolidate, or remove?
7. Campaigns page — provide content or defer?
8. Contact email address for the new site
9. Email delivery mechanism for contact form
10. Full contact details (phone, address, hours)
11. Board member photos (Jean Winfrey, Keith Winfrey)
12. Teacher training date range (when was 1,738 reached?)
13. Women's empowerment ~100 — cumulative or current?
14. Community reach 3,600 — timeframe and breakdown?
15. Annual reports — available?

None of these decisions have been answered, assumed, or removed.

---

## 6. Files Whose Purpose Could Not Be Confidently Established

None. Every file in the original project was identified with confidence:
- 2 markdown documents were the authoritative approved documents
- 3 markdown documents were discovery and research reports
- 1 markdown document was the interim cleanup audit (removed as superseded)
- 23 HTML files were website page snapshots (21 retained, 2 removed as confirmed empty/artifacts)
- 1 JSON file was the WordPress REST API export

No files required a "flag and keep" decision.

---

## 7. Final Project Directory Structure

```
seedpower-foundation/
└── docs/
    ├── architecture/
    │   └── technical-implementation-architecture.md   94.4 KB
    ├── content/
    │   ├── homepage-raw.html                          85.3 KB
    │   ├── page-about-us-what-we-do.html             116.9 KB
    │   ├── page-about-us.html                        101.3 KB
    │   ├── page-article-power-in-seed.html            90.5 KB
    │   ├── page-contact-news-success-stories.html    105.6 KB
    │   ├── page-contact.html                         184.8 KB
    │   ├── page-education-school.html                 78.3 KB
    │   ├── page-elementor-2202.html                   84.0 KB
    │   ├── page-fundraise.html                        89.4 KB
    │   ├── page-news-gallery.html                    184.8 KB
    │   ├── page-news.html                             91.6 KB
    │   ├── page-online-fundraising.html               75.4 KB
    │   ├── page-outreach-programs.html               100.7 KB
    │   ├── page-sponsor-a-child.html                  83.7 KB
    │   ├── page-success-stories.html                 105.6 KB
    │   ├── page-visit-your-child.html                107.8 KB
    │   ├── page-volunteer.html                        97.0 KB
    │   ├── page-ways-to-donate-donate.html           106.9 KB
    │   ├── page-ways-to-donate.html                   80.1 KB
    │   ├── page-what-we-do.html                      116.9 KB
    │   ├── page-who-we-are.html                      104.5 KB
    │   └── wp-api-pages.json                         727.2 KB
    ├── design/
    │   └── visual-design-direction.md                 41.5 KB
    ├── research/
    │   ├── content-verification-and-sitemap.md        32.3 KB
    │   ├── full-website-discovery-report.md           33.2 KB
    │   └── website-discovery-audit.md                 46.3 KB
    └── cleanup-report.md                              (this file)
```

---

## 8. Final File Count and Approximate Total Size

| Metric | Value |
|---|---|
| Total files | 28 (27 retained + this report) |
| Total size | ≈ 3.09 MB |
| `docs/architecture/` | 1 file, 94.4 KB |
| `docs/design/` | 1 file, 41.5 KB |
| `docs/research/` | 3 files, ~112 KB |
| `docs/content/` | 23 files (22 HTML + 1 JSON), ~2.84 MB |

**Files removed:** 3 (page-what-we-do-2.html, page-post-hello-world.html, project-cleanup-audit.md)  
**Net change in size:** −169.7 KB removed

---

## 9. Confirmation: No Development Work Performed

- No `npm install`, `npx`, `yarn`, `pnpm`, or any package manager commands were run.
- No `package.json`, `tsconfig.json`, `next.config.*`, `postcss.config.*`, or any configuration files were created.
- No `.js`, `.ts`, `.tsx`, `.jsx`, `.css` application source files were created.
- No `node_modules` directory was created.
- No Next.js project was initialised.
- No application components, pages, or routes were written.
- No images or external assets were downloaded.
- `docs/visual-design-direction.md` was not modified.
- `docs/technical-implementation-architecture.md` was not modified.
- No client decisions from Section 14 were answered or assumed.
- No new client-facing documents were created.

The only files created during this cleanup task are: the four subdirectories under `docs/` and this `cleanup-report.md`.

---

## 10. Confirmation: Project Is Ready for Development

The workspace is clean and well-organised. The development team has access to:

- **Architecture:** `docs/architecture/technical-implementation-architecture.md` (v1.2) — the complete technical specification covering stack, structure, components, routing, tokens, accessibility, security, testing, and 9 development phases.
- **Design:** `docs/design/visual-design-direction.md` (v2.0) — the definitive design token specification covering colours, typography, spacing, breakpoints, and all component styles.
- **Research:** `docs/research/` — three documents covering the complete 20-page content audit, all programme details and statistics, content discrepancies, and the proposed sitemap with URL strategy.
- **Content reference:** `docs/content/` — 22 HTML snapshots of the original website pages (21 substantive pages) and the WordPress JSON export with structured metadata and full rendered content for all 18 pages.

The 15 outstanding client decisions (Section 14 of the architecture) are documented and must be resolved before or during development Phases 5–7, as specified. They do not block Phases 1–4.

The workspace is ready for the Next.js development phase to begin.
