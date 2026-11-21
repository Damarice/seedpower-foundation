'use client';

/**
 * MobileNav — slide-in drawer with full focus trap.
 *
 * Accessibility guarantees:
 * - role="dialog", aria-modal="true", aria-label="Navigation"
 * - Focus moves to close button on open.
 * - Tab / Shift+Tab stay inside the drawer.
 * - Escape closes the drawer; focus returns to the hamburger (managed in Header).
 * - Overlay click closes the drawer.
 * - Nav link click closes the drawer.
 * - Body scroll locked while open, restored on close.
 * - Accordion expansion for items with children.
 *
 * Architecture v1.2 — Section 4.2 (MobileNav.tsx).
 * Visual Design Direction v2.0 — Section 2.3.
 */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NAV_ITEMS } from '@/lib/navItems';
import { cn } from '@/lib/cn';

const focusRing = [
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-[color:var(--focus-ring-color)]',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

export interface MobileNavProps {
  id: string;
  onClose: () => void;
}

export function MobileNav({ id, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Move focus to close button when drawer opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Escape key closes the drawer
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Focus trap — Tab / Shift+Tab stay inside the drawer.
  // Re-computes focusable elements whenever the accordion state changes.
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    drawer.addEventListener('keydown', handleTab);
    return () => drawer.removeEventListener('keydown', handleTab);
  }, [expanded]);

  const toggleExpanded = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — role="dialog" must be on a generic container, not <nav> */}
      <div
        id={id}
        ref={drawerRef}
        role="dialog"
        aria-label="Navigation"
        aria-modal="true"
        className={[
          'fixed left-0 top-0 h-screen',
          'w-full max-w-xs',
          'bg-[var(--color-bg-page)]',
          'shadow-[var(--shadow-modal)]',
          'z-50 overflow-y-auto',
          'transition-transform duration-[var(--transition-slow)]',
        ].join(' ')}
      >
        {/* Header: title + close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <span className="text-base font-semibold text-[var(--color-text-primary)]">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={cn(
              'w-11 h-11 flex items-center justify-center',
              'rounded-[var(--radius-sm)]',
              focusRing
            )}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.label)}
                    aria-expanded={expanded.has(item.label)}
                    aria-controls={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      'w-full text-left px-4 py-3',
                      'text-base font-medium text-[var(--color-text-primary)]',
                      'hover:bg-[var(--color-bg-soft)]',
                      'rounded-[var(--radius-sm)]',
                      'flex items-center justify-between',
                      'min-h-[var(--touch-target-min)]',
                      'border-none bg-transparent cursor-pointer',
                      'transition-colors duration-[var(--transition-fast)]',
                      focusRing
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        'w-4 h-4 transition-transform duration-[var(--transition-fast)]',
                        expanded.has(item.label) ? 'rotate-90' : ''
                      )}
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {expanded.has(item.label) && (
                    <ul
                      id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="pl-4 space-y-1 py-1"
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              'block px-4 py-2 no-underline',
                              'text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)]',
                              'hover:text-[var(--color-brand)]',
                              'rounded-[var(--radius-sm)]',
                              'min-h-[var(--touch-target-min)] flex items-center',
                              'transition-colors duration-[var(--transition-fast)]',
                              focusRing
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block px-4 py-3 no-underline',
                    'text-base font-medium text-[var(--color-text-primary)]',
                    'hover:bg-[var(--color-bg-soft)]',
                    'rounded-[var(--radius-sm)]',
                    'min-h-[var(--touch-target-min)] flex items-center',
                    'transition-colors duration-[var(--transition-fast)]',
                    focusRing
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Donate button */}
          <div className="pt-4 border-t border-[var(--color-border)] mt-4">
            <ButtonLink
              href="/give/donate"
              variant="primary"
              className="w-full justify-center"
              onClick={onClose}
            >
              Donate Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
