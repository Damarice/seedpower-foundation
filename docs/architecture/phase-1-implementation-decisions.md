# SeedPower Foundation — Phase 1 Implementation Decisions

**Created:** November 17, 2026  
**Phase:** 1 — Project Foundation and Configuration  
**Status:** For review — not an amendment to the approved architecture

---

## Purpose

This document records deliberate deviations between the approved Technical Implementation Architecture v1.2 and the actual Phase 1 installation. It does not alter the architecture document. Future phases should be evaluated against the architecture; where this document contradicts it, the architecture takes precedence unless a decision here is explicitly re-confirmed by the client or technical lead.

---

## Decision 1 — Next.js 16 instead of Next.js 15

| Item | Architecture v1.2 | Installed |
|---|---|---|
| Next.js | 15.x | **16.4.6** |
| `eslint-config-next` | 15.x | **16.4.6** |

### What happened

`create-next-app` was run on November 17, 2026. At that date, `npx create-next-app@latest` resolved to Next.js 16.4.6, which had been released as the current stable version. The architecture was written against Next.js 15, which was the latest stable release at the time of writing.

### Compatibility assessment

Next.js 16 is fully backward-compatible with Next.js 15 for the App Router features used in this project:

- App Router (`app/` directory) — unchanged API
- `next/font/google` — unchanged API, same `weight`/`subsets`/`display`/`variable` props
- `export const metadata` and `generateMetadata` — unchanged
- `app/robots.ts` and `app/sitemap.ts` metadata routes — unchanged
- `next/image` with `width`, `height`, `sizes` props — unchanged
- Server Components and Client Components — unchanged
- TypeScript strict mode and `tsconfig.json` conventions — unchanged
- Turbopack (dev server) — available in both; used by default in 16

No breaking changes affect the architecture's implementation plan.

### New features available in Next.js 16 (not required, not used)

- `cacheComponents` — experimental server component caching (enabled in `next.config.ts` by `create-next-app`; harmless)
- `partialPrefetching` — experimental prefetching optimisation (enabled in `next.config.ts`; harmless)

These were added automatically by `create-next-app`. They do not affect correctness.

### Recommendation

Retain Next.js 16.4.6. Do not downgrade. Update the architecture's version references when v1.3 is produced or at next stakeholder review.

---

## Decision 2 — Node.js 24 instead of Node.js 22 LTS

| Item | Architecture v1.2 | Installed |
|---|---|---|
| Node.js | 22 LTS | **24.19.0** |

### What happened

The development machine has Node.js 24.19.0 installed. The architecture specified Node.js 22 LTS (the LTS version at time of writing). Node.js 24 was released as a Current release and is expected to become LTS in October 2026; at November 2026 it may be LTS or approaching it.

### Compatibility assessment

Node.js 24 is fully compatible with this project's dependencies:

- Next.js 16 supports Node.js 18.18+ — Node.js 24 satisfies this
- All installed packages (`tailwindcss` 4, `@tailwindcss/postcss` 4, `postcss` 8, TypeScript 5) are compatible with Node.js 24
- No native addons or Node.js-version-sensitive code is used

### Recommendation

Retain Node.js 24.19.0. Do not downgrade. The architecture's Node.js 22 LTS requirement was a minimum floor, not a ceiling. Update the architecture's version references at next review.

---

## Decision 3 — TypeScript 5.9.3 (resolved from `^5`)

| Item | Architecture v1.2 | Installed |
|---|---|---|
| TypeScript | 5.7+ | **5.9.3** |

The architecture specified TypeScript 5.7+. `typescript@^5` resolved to 5.9.3. This exceeds the minimum and introduces no breaking changes for the strict-mode configuration in use. Retain as-is.

---

## Exact Installed Versions (Phase 1)

### Runtime
| Package | Version |
|---|---|
| Node.js | 24.19.0 |
| npm | 11.17.0 |

### Dependencies
| Package | Version |
|---|---|
| `next` | 16.4.6 |
| `react` | 19.3.0 |
| `react-dom` | 19.3.0 |

### Dev Dependencies
| Package | Version |
|---|---|
| `typescript` | 5.9.3 |
| `tailwindcss` | 4.3.5 |
| `@tailwindcss/postcss` | 4.3.5 |
| `postcss` | 8.5.33 |
| `eslint` | 9.x |
| `eslint-config-next` | 16.4.6 |
| `@types/node` | 20.x |
| `@types/react` | 19.x |
| `@types/react-dom` | 19.x |

---

## Decision 4 — `metadataBase` uses environment variable, not hardcoded domain

| Item | Originally set | Corrected to |
|---|---|---|
| `metadataBase` in `app/layout.tsx` | `https://seedpowerfoundation.org` (hardcoded) | `process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'` |

### Why

`seedpowerfoundation.org` has not been confirmed as the production domain by the client. Hardcoding an unverified domain in metadata risks generating incorrect Open Graph URLs and canonical links in any build that is not the final production deployment.

### Corrected behaviour

- In development: `metadataBase` resolves to `http://localhost:3000`.
- In production: set `NEXT_PUBLIC_SITE_URL=https://[confirmed-domain]` in the hosting environment's environment variables. Add it to `.env.example` once the domain is confirmed.
- The variable must be set before any production build that generates absolute metadata URLs.

### Action required from client

Confirm the production domain so `NEXT_PUBLIC_SITE_URL` can be set correctly in the deployment environment and documented here.

---

## Outstanding Architecture Items (not affected by Phase 1)

The following items from the architecture remain unresolved and are not affected by any Phase 1 decision:

1. **15 outstanding client decisions** — documented in architecture v1.2 Section 14. None resolved or assumed here.
2. **Email delivery provider** — pending client decision before Phase 7 contact form implementation.
3. **Upstash Redis** — rate limiting account required before Phase 7.
4. **73 discovered images** — to be downloaded and organised in Phase 3.
5. **Architecture version** — v1.2 remains the approved document. Version references to Next.js 15 and Node.js 22 should be updated in a future v1.3 revision if the client approves.
