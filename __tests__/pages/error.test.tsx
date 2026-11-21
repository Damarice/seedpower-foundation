/**
 * Tests for app/error.tsx — the custom error boundary page.
 *
 * Covers (Phase 8E):
 *   - Renders without throwing.
 *   - Single H1 "Something Went Wrong".
 *   - Friendly, non-technical message present.
 *   - No stack trace or internal error detail exposed.
 *   - Retry button invokes the reset callback.
 *   - Homepage navigation link present and correctly href'd.
 *   - Section carries an accessible label.
 *   - axe accessibility check.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ErrorPage from '@/app/error';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

/** Helper — creates a typed Error with an optional digest. */
function makeError(message = 'Test error', digest?: string) {
  const err = new Error(message) as Error & { digest?: string };
  if (digest !== undefined) err.digest = digest;
  return err;
}

describe('ErrorPage', () => {
  it('renders without throwing', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError()} reset={reset} />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Something Went Wrong"', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError()} reset={reset} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Something Went Wrong');
  });

  it('renders a friendly, non-technical message', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError()} reset={reset} />);
    expect(
      screen.getByText(/an unexpected problem occurred/i)
    ).toBeInTheDocument();
  });

  it('does not expose the raw error message', () => {
    const reset = jest.fn();
    const sensitiveMessage = 'Internal DB connection refused at 10.0.0.1:5432';
    render(<ErrorPage error={makeError(sensitiveMessage)} reset={reset} />);
    expect(screen.queryByText(sensitiveMessage)).not.toBeInTheDocument();
  });

  it('does not expose a stack trace', () => {
    const reset = jest.fn();
    const err = makeError('Boom');
    // stack typically contains "Error:" and "at "
    render(<ErrorPage error={err} reset={reset} />);
    expect(screen.queryByText(/at\s+\w+\s+\(/)).not.toBeInTheDocument();
  });

  it('calls reset when the retry button is clicked', async () => {
    const reset = jest.fn();
    const user = userEvent.setup();
    render(<ErrorPage error={makeError()} reset={reset} />);
    const retryBtn = screen.getByRole('button', { name: /try again/i });
    await user.click(retryBtn);
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it('renders a homepage navigation link', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError()} reset={reset} />);
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('the section has an accessible label', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError()} reset={reset} />);
    expect(
      screen.getByRole('region', { name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  it('renders correctly when error has a digest', () => {
    const reset = jest.fn();
    render(<ErrorPage error={makeError('Some error', 'abc123')} reset={reset} />);
    // Digest must not be rendered in the UI
    expect(screen.queryByText('abc123')).not.toBeInTheDocument();
    // Page still renders its heading
    expect(
      screen.getByRole('heading', { level: 1, name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const reset = jest.fn();
    const { container } = render(<ErrorPage error={makeError()} reset={reset} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
