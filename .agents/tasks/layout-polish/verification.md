# Layout Polish — Verification Report

## 1. Test Results (`npm test`)

| Metric | Result |
|---|---|
| Total tests | 413 |
| Passing | 413 |
| Failing | 0 |
| Total suites | 36 |
| Suites passed | 36 |
| Suites failed | 0 |
| Run time | ~40 s |

### First run (before fix)

One test failed:

```
FAIL  __tests__/pages/homepage.test.tsx
  ● HomePage › overrides the focus ring colour to white on the brand-green Get Involved section

    expect(received).toBe(expected) // Object.is equality

    Expected: "#ffffff"
    Received: ""

    > 131 |     expect(region.style.getPropertyValue('--focus-ring-color')).toBe('#ffffff');
```

### Test files updated

**`components/sections/GetInvolvedCTA.tsx`**

The `Section` component used for the brand-green Get Involved block was missing the inline `style` that sets `--focus-ring-color` to `#ffffff`. Without it, focus rings on interactive elements inside the dark-green section use the default (dark) colour and become invisible.

Change made:

```tsx
// Before
<Section
  background="brand"
  aria-labelledby="get-involved-heading"
>

// After
<Section
  background="brand"
  aria-labelledby="get-involved-heading"
  style={{ '--focus-ring-color': '#ffffff' } as React.CSSProperties}
>
```

No test assertion text was changed. The test already described the correct requirement (F2 fix: white focus ring). The fix was applied to the component so the implementation matched the test.

### Second run (after fix)

```
Test Suites: 36 passed, 36 total
Tests:       413 passed, 413 total
Time:        39.816 s
```

---

## 2. Type Check (`npm run type-check`)

```
> tsc --noEmit
```

**Result: 0 errors. Exit code 0.**

---

## 3. Lint (`npx eslint . --ext .ts,.tsx`)

**Result: 0 errors, 0 warnings. Exit code 0.**

---

## 4. Build (`npm run build`)

**Result: Exit code 0. Build succeeded.**

22 static routes and 1 dynamic route compiled. The build output showed 4 CSS optimiser warnings about unexpected token delimiters in placeholder/wildcard CSS variable references (e.g. `var(--container-max/wide/narrow)`, `var(--text-*)`) — these are pre-existing in the codebase and are not caused by the layout changes. They do not prevent the build from completing.

---

## Summary

| Check | Status |
|---|---|
| `npm test` | ✅ 413/413 passing, 36/36 suites |
| `npm run type-check` | ✅ 0 errors |
| `npx eslint . --ext .ts,.tsx` | ✅ 0 errors |
| `npm run build` | ✅ Exit 0 |

One component file was modified (`components/sections/GetInvolvedCTA.tsx`) to add the missing `--focus-ring-color: #ffffff` inline style on the brand-green section, which is an accessibility requirement and was the only test failure.
