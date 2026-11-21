'use client';

/**
 * Navigation — desktop horizontal nav with accessible JS-managed dropdowns.
 *
 * Interaction model:
 * - Mouse: click trigger opens/closes; click outside or on a menu item closes.
 * - Keyboard: Enter / Space opens; Escape closes and returns focus to trigger;
 *   Tab moves through items; focus leaving the container closes the dropdown.
 * - Touch: tap trigger toggles (same onClick handler as mouse).
 *
 * Architecture v1.2 — Section 4.2 (Navigation.tsx).
 * Visual Design Direction v2.0 — Sections 2.1 and 2.2.
 */
import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NavItem } from '@/lib/navItems';
import { cn } from '@/lib/cn';

/* ── Shared style strings ─────────────────────────────────── */

const focusRing = [
  'focus-visible:outline',
  'focus-visible:outline-[length:var(--focus-ring-width)]',
  'focus-visible:outline-[color:var(--focus-ring-color)]',
  'focus-visible:[outline-style:var(--focus-ring-style)]',
  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
].join(' ');

/* ── DropdownItem ─────────────────────────────────────────── */

interface DropdownItemProps {
  item: NavItem;
}

function DropdownItem({ item }: DropdownItemProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const dropdownId = `dropdown-${baseId}`;
  const pathname = usePathname();

  const isActive = pathname === item.href ||
    item.children?.some((c) => pathname === c.href);

  const close = useCallback(() => setOpen(false), []);

  // Close when clicking outside or focus leaves the container
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const handleFocusOut = (e: FocusEvent) => {
      if (!containerRef.current?.contains(e.relatedTarget as Node)) close();
    };

    document.addEventListener('mousedown', handleClick);
    const container = containerRef.current;
    container?.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      container?.removeEventListener('focusout', handleFocusOut);
    };
  }, [open, close]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        aria-current={pathname === item.href ? 'page' : undefined}
        className={cn(
          'px-5 py-2 text-[length:var(--text-nav)] font-medium no-underline',
          'flex items-center transition-colors duration-[var(--transition-fast)]',
          focusRing,
          isActive
            ? 'text-[var(--color-brand)] border-b-2 border-[var(--color-brand)]'
            : 'text-[var(--color-text-primary)] hover:text-[var(--color-brand)]'
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            close();
            triggerRef.current?.focus();
          }
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={dropdownId}
        className={cn(
          'px-5 py-2 text-[length:var(--text-nav)] font-medium',
          'flex items-center gap-1 bg-transparent border-none cursor-pointer',
          'transition-colors duration-[var(--transition-fast)]',
          focusRing,
          isActive
            ? 'text-[var(--color-brand)] border-b-2 border-[var(--color-brand)]'
            : 'text-[var(--color-text-primary)] hover:text-[var(--color-brand)]'
        )}
      >
        {item.label}
        {/* Chevron icon — rotates when open */}
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-[var(--transition-fast)]',
            open ? 'rotate-180' : ''
          )}
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={dropdownId}
          role="menu"
          className={[
            'absolute left-0 mt-1',
            'min-w-[200px]',
            'bg-[var(--color-bg-page)]',
            'border border-[var(--color-border)]',
            'rounded-[var(--radius-md)]',
            'shadow-[var(--shadow-dropdown)]',
            'py-2 z-50',
          ].join(' ')}
        >
          {item.children.map((child) => (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                role="menuitem"
                aria-current={pathname === child.href ? 'page' : undefined}
                onClick={close}
                className={cn(
                  'block px-5 py-[10px] no-underline',
                  'text-[length:var(--text-nav)] text-[var(--color-text-primary)]',
                  'min-h-[var(--touch-target-min)] flex items-center',
                  'transition-colors duration-[var(--transition-fast)]',
                  'hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-brand)]',
                  focusRing
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Navigation ───────────────────────────────────────────── */

export function Navigation() {
  return (
    <nav className="flex items-center gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <DropdownItem key={item.href} item={item} />
      ))}
    </nav>
  );
}
