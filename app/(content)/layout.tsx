/**
 * Shared layout for all content pages (route group: (content)).
 *
 * The root layout (app/layout.tsx) already provides:
 *   - <html> + <body> with font variables
 *   - <Header> (sticky navigation)
 *   - <main> wrapper
 *   - <Footer>
 *
 * This layout adds nothing that would duplicate those; it exists as the
 * architectural hook for any future content-page-specific concerns
 * (breadcrumbs, page-transition wrappers, schema.org Article markup, etc.)
 * without touching the shared shell.
 *
 * Content pages each supply their own semantic <article> or section
 * structure inside this transparent wrapper.
 *
 * Architecture v1.2 — Section 2 (project structure, app/(content)/layout.tsx).
 */

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
