'use client';

/**
 * CopyrightYear — renders the current year on the client after hydration.
 *
 * Next.js 16 blocks `new Date()` during static prerender (both Server and
 * Client Components). Deferring to useEffect satisfies the prerender
 * constraint while displaying the correct year at runtime.
 *
 * The react-hooks/set-state-in-effect disable is intentional: calling
 * setYear inside useEffect is the established React pattern for reading a
 * value that is unavailable during server rendering (the current time).
 * The effect has an empty dependency array and runs once — there is no
 * risk of cascading renders.
 */
import { useEffect, useState } from 'react';

export function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (year === null) return null;
  return <>{year}</>;
}
