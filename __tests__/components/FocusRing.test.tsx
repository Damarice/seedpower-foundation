/**
 * Focus ring — brand background treatment tests.
 *
 * Visual Design Direction v2.0 Section 1.9 and Architecture v1.2 Section 3.2
 * require a white focus ring inside brand-green sections:
 *
 *   .bg-brand *:focus-visible { outline-color: #ffffff; }
 *
 * jsdom does not apply CSS stylesheets, so computed style cannot be tested
 * directly. These tests use two complementary strategies:
 *
 *   1. Verify the CSS rule is present in globals.css (source of truth).
 *   2. Verify that Section with background="brand" applies the "bg-brand"
 *      class, which is the CSS selector the focus-ring rule targets.
 *   3. Verify that Section with a non-brand background does NOT apply
 *      "bg-brand", confirming light-background focus rings are unaffected.
 *   4. Verify the base :focus-visible rule is also present in globals.css,
 *      confirming it has not been removed or weakened.
 *
 * Architecture v1.2 — Section 3.2.
 * Visual Design Direction v2.0 — Section 1.9.
 *
 * Phase 8C implementation.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Section } from '@/components/layout/Section';

/* ── Helper: read globals.css as a string once ───────────────────── */
const globalsCss = readFileSync(
  join(process.cwd(), 'app', 'globals.css'),
  'utf-8'
);

describe('White focus ring inside brand-green sections — CSS rule', () => {
  it('globals.css contains the .bg-brand *:focus-visible rule', () => {
    expect(globalsCss).toContain('.bg-brand *:focus-visible');
  });

  it('the rule overrides outline-color to #ffffff', () => {
    // Use [\s\S]*? instead of [^}]* with /s flag for ES2017 compat
    expect(globalsCss).toMatch(/\.bg-brand\s+\*:focus-visible\s*\{[\s\S]*?outline-color\s*:\s*#ffffff/);
  });

  it('the base :focus-visible rule is still present and not removed', () => {
    expect(globalsCss).toContain(':focus-visible');
    expect(globalsCss).toContain('var(--focus-ring-color)');
  });

  it('the base rule still uses the full shorthand (width, style, color)', () => {
    // Confirms the base rule has not been weakened to only outline-color
    expect(globalsCss).toMatch(
      /:focus-visible\s*\{[\s\S]*?outline:\s*var\(--focus-ring-width\)\s*var\(--focus-ring-style\)\s*var\(--focus-ring-color\)/
    );
  });
});

describe('Section brand background class — CSS selector target', () => {
  it('Section with background="brand" applies the bg-brand class', () => {
    const { container } = render(<Section background="brand">CTA</Section>);
    expect((container.firstChild as HTMLElement).className).toContain('bg-[var(--color-brand)]');
  });

  it('Section with background="white" does not apply bg-brand', () => {
    const { container } = render(<Section background="white">Content</Section>);
    expect((container.firstChild as HTMLElement).className).not.toContain('bg-[var(--color-brand)]');
  });

  it('Section with background="soft" does not apply bg-brand', () => {
    const { container } = render(<Section background="soft">Content</Section>);
    expect((container.firstChild as HTMLElement).className).not.toContain('bg-[var(--color-brand)]');
  });

  it('Section with background="warm" does not apply bg-brand', () => {
    const { container } = render(<Section background="warm">Content</Section>);
    expect((container.firstChild as HTMLElement).className).not.toContain('bg-[var(--color-brand)]');
  });
});

describe('focus:not(:focus-visible) suppression rule', () => {
  it('globals.css suppresses the default outline for mouse users', () => {
    expect(globalsCss).toContain(':focus:not(:focus-visible)');
    expect(globalsCss).toMatch(/:focus:not\(:focus-visible\)\s*\{[\s\S]*?outline\s*:\s*none/);
  });
});
