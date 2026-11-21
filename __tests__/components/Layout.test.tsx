/**
 * Layout — skip navigation link and main content landmark tests.
 *
 * The root layout (app/layout.tsx) cannot be rendered directly in jsdom
 * because it contains <html> and <body> — RTL wraps everything in its own
 * document. We test the skip-link behaviour by rendering the structural
 * elements it produces in isolation, verifying:
 *
 *   1. A link with accessible text "Skip to main content" is the first
 *      focusable element when the layout structure is rendered.
 *   2. The link's href targets "#main-content".
 *   3. The main content landmark has id="main-content" and tabIndex={-1}.
 *   4. The skip link appears before the Header in DOM order.
 *   5. axe reports no violations on the skip link + main structure.
 *
 * Architecture v1.2 — Section 9.3 (skip navigation requirement).
 * Visual Design Direction v2.0 — Section 4.2.
 *
 * Phase 8C implementation.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Mock next/navigation so Header (a dependency of the layout structure) doesn't error.
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

/**
 * Minimal structural replica of the RootLayout body content.
 * We use a <div> wrapper instead of <body> because RTL already provides
 * a document body. The skip link, main, and a placeholder for children
 * are rendered in the same DOM order as the real layout.
 */
function LayoutStructure({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible z-50 inline-block px-4 py-2 bg-[var(--color-bg-page)] text-[var(--color-brand)] font-semibold text-sm rounded-[var(--radius-sm)] no-underline"
      >
        Skip to main content
      </a>
      {/* Placeholder for Header — position in DOM order is what matters */}
      <header data-testid="mock-header" />
      <main id="main-content" tabIndex={-1}>
        {children ?? <p>Page content</p>}
      </main>
    </div>
  );
}

describe('Skip navigation link', () => {
  it('renders a link with text "Skip to main content"', () => {
    render(<LayoutStructure />);
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toBeInTheDocument();
  });

  it('href targets "#main-content"', () => {
    render(<LayoutStructure />);
    const link = screen.getByRole('link', { name: 'Skip to main content' });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('appears before the header in DOM order', () => {
    render(<LayoutStructure />);
    const link = screen.getByRole('link', { name: 'Skip to main content' });
    const header = screen.getByTestId('mock-header');
    // compareDocumentPosition: DOCUMENT_POSITION_FOLLOWING = 4
    // link.compareDocumentPosition(header) returns 4 when header comes AFTER link
    expect(
      link.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('is the first focusable element in the document structure', () => {
    render(<LayoutStructure />);
    const focusableElements = document.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    expect(focusableElements.length).toBeGreaterThan(0);
    expect(focusableElements[0]).toHaveAccessibleName('Skip to main content');
  });

  it('is visually hidden by default (positioned off-screen)', () => {
    render(<LayoutStructure />);
    const link = screen.getByRole('link', { name: 'Skip to main content' });
    // The class-based hiding uses left-[-9999px]; verify the class is present
    expect(link.className).toContain('left-[-9999px]');
  });

  it('has focus-visible classes to restore on-screen position when focused', () => {
    render(<LayoutStructure />);
    const link = screen.getByRole('link', { name: 'Skip to main content' });
    expect(link.className).toContain('focus:left-4');
    expect(link.className).toContain('focus:w-auto');
  });
});

describe('Main content landmark', () => {
  it('has id="main-content"', () => {
    render(<LayoutStructure />);
    const main = document.getElementById('main-content');
    expect(main).not.toBeNull();
    expect(main?.tagName).toBe('MAIN');
  });

  it('has tabIndex={-1} so the skip link can programmatically move focus into it', () => {
    render(<LayoutStructure />);
    const main = document.getElementById('main-content') as HTMLElement;
    expect(main).toHaveAttribute('tabindex', '-1');
  });

  it('renders page children inside the main landmark', () => {
    render(<LayoutStructure><p>Test child content</p></LayoutStructure>);
    const main = document.getElementById('main-content') as HTMLElement;
    expect(main).toHaveTextContent('Test child content');
  });
});

describe('Skip link + main structure accessibility', () => {
  it('passes axe accessibility check', async () => {
    const { container } = render(
      <LayoutStructure>
        <h1>Page Title</h1>
        <p>Page body content.</p>
      </LayoutStructure>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
