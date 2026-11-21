# Phase 8G — Performance Audit: Production Build

**Step:** perf-audit-build (narrow scope)
**Command run:** `npm run build` (Next.js 16.4.6, Turbopack, Cache Components + Partial Prefetching enabled)
**Outcome:** Build succeeded (exit code 0). No code changes were made in this step.

## Route table (captured from `next build`)

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ○ /contact
├ ○ /get-involved/sponsor-a-child
├ ○ /get-involved/volunteer
├ ○ /give
├ ○ /give/donate
├ ○ /impact
├ ○ /impact/success-stories
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /what-we-do
├ ○ /what-we-do/community-outreach
├ ○ /what-we-do/education
├ ○ /what-we-do/food-project
├ ○ /what-we-do/teacher-training
├ ○ /what-we-do/wash
├ ○ /what-we-do/womens-empowerment
└ ○ /who-we-are

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Check 1 — Static vs dynamic classification: PASS

- **All page routes are prerendered as static (○).** 19 routes carry the `○` marker:
  `/`, `/_not-found`, `/contact`, `/get-involved/sponsor-a-child`,
  `/get-involved/volunteer`, `/give`, `/give/donate`, `/impact`,
  `/impact/success-stories`, `/robots.txt`, `/sitemap.xml`, `/what-we-do`,
  `/what-we-do/community-outreach`, `/what-we-do/education`,
  `/what-we-do/food-project`, `/what-we-do/teacher-training`,
  `/what-we-do/wash`, `/what-we-do/womens-empowerment`, `/who-we-are`.
- **Only the API route is dynamic (ƒ).** `/api/contact` is the sole `ƒ` route. This is expected: it is a POST handler (`app/api/contact/route.ts`) and cannot be statically prerendered.
- Infrastructure routes `/robots.txt` and `/sitemap.xml` are also static (○), as expected.

Result matches the expected target exactly: every static page is prerendered, and the only dynamic route is the contact API.

## Check 2 — Build warnings: PASS (only pre-existing CSS token warnings)

The build emitted exactly **3 warnings**, all from the CSS optimizer while optimizing generated CSS. These are the known pre-existing CSS token warnings (arbitrary Tailwind values whose CSS custom-property names contain `/`, `.`, or `*` delimiters, which the optimizer flags but does not fail on):

1. `Unexpected token Delim('/')`
   ` .max-w-[var(--container-max/wide/narrow)]` → `max-width: var(--container-max/wide/narrow);`
2. `Unexpected token Delim('.')`
   `.px-[var(--...)]` → `padding-inline: var(--...);`
3. `Unexpected token Delim('*')`
   `.text-[length:var(--text-*)]` → `font-size: var(--text-*);`

No other warnings were produced. Specifically:
- TypeScript: `Finished TypeScript` with no errors or warnings.
- No ESLint output or warnings (Next.js 16/Turbopack does not run ESLint during `next build`; linting is a separate step).
- No module-resolution, deprecation, or bundle-size warnings.
- No "Compiled with warnings" line — output shows `✓ Compiled successfully`.

> Note: PowerShell surfaces the warning summary as a `NativeCommandError` / `RemoteException` block because Next.js writes the `Found 3 warnings while optimizing generated CSS` line to stderr. This is a PowerShell stderr-display artifact, **not** an additional build error or warning. The build exit code was 0 and the underlying content is the same 3 CSS warnings listed above.

## Conclusion

Both checks pass:
- All static pages are prerendered (○); only `/api/contact` is dynamic (ƒ).
- No build warnings beyond the 3 pre-existing CSS token warnings (Delim `/`, `.`, `*` in arbitrary Tailwind custom-property values).

No code changes were required or made. The production build is clean for the performance audit.
