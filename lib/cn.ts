/**
 * Minimal className merge utility.
 * Filters out falsy values and joins the remaining strings.
 * No external dependency required.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
