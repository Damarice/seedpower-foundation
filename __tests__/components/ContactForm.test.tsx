/**
 * Tests for ContactForm component.
 *
 * Network calls are mocked — the API route does not exist in this phase.
 * Production code uses a real fetch; tests use jest.fn() to control responses.
 *
 * Covers:
 *   - Rendering and accessible field labels
 *   - Required field validation (name, email, message)
 *   - Invalid email validation
 *   - Optional subject behaviour
 *   - Message length validation
 *   - Submission/loading state (button disabled while in flight)
 *   - Error response handling
 *   - Success state only after confirmed server success
 *   - No duplicate submission while in progress
 *   - Honeypot field hidden from accessible tree
 *   - axe accessibility check
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactForm } from '@/components/forms/ContactForm';

expect.extend(toHaveNoViolations);

// Mock global fetch — controlled per test
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

/** Helper: fill all required fields with valid values */
async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough.');
}

describe('ContactForm', () => {
  it('renders without error', () => {
    render(<ContactForm />);
    expect(document.body).toBeTruthy();
  });

  it('renders all visible form fields with accessible labels', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows required validation error when name is submitted empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is my message.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows message length validation error when message is too short', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Short');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits successfully without subject (subject is optional)', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Your message has been received.' }),
    });
    render(<ContactForm />);
    // Do NOT fill subject
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/message/i), 'No subject provided here.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText(/message received/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submission is in progress', async () => {
    const user = userEvent.setup();
    // Delay resolution so we can observe the loading state
    let resolve: (v: unknown) => void;
    mockFetch.mockReturnValueOnce(
      new Promise((r) => { resolve = r; })
    );
    render(<ContactForm />);
    await fillValidForm(user);
    const button = screen.getByRole('button', { name: /send message/i });
    await user.click(button);
    await waitFor(() => {
      // Button text changes to "Sending…" and becomes disabled
      expect(screen.getByRole('button')).toBeDisabled();
    });
    // Resolve to avoid open handles
    resolve!({ ok: true, json: async () => ({ success: true }) });
  });

  it('shows success state only after server confirms success', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Received and will be reviewed.' }),
    });
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText(/message received/i)).toBeInTheDocument();
    });
    // Form fields should no longer be visible after success
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it('does not show success state when server returns an error', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid form data. Please check your inputs.' }),
    });
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/invalid form data/i)).toBeInTheDocument();
    });
    // Success state must not be shown
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows user-friendly message on network failure', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/unable to send/i)).toBeInTheDocument();
    });
  });

  it('honeypot field is not accessible to screen readers', () => {
    render(<ContactForm />);
    // The honeypot wrapper and inputs carry aria-hidden="true"
    // getByRole should NOT find a text input named "leave this field empty"
    expect(
      screen.queryByRole('textbox', { name: /leave this field empty/i })
    ).not.toBeInTheDocument();
  });

  it('passes axe accessibility check on initial render', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // ── Coverage gap 1: one-character subject rejected ──────────────────
  it('rejects a one-character subject and does not call the API', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'A'); // 1 char — min(2) rejects
    await user.type(screen.getByLabelText(/message/i), 'A message long enough to pass.');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      // Subject min(2) error should appear
      expect(screen.getByText(/too small/i)).toBeInTheDocument();
    });
    // API must not have been called
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // ── Coverage gap 2: non-2xx status even when body claims success ─────
  it('does not show success when response is non-2xx despite success payload', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: true }), // body claims success but HTTP status fails
    });
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ── Coverage gap 3: HTTP 200 but body has success: false ─────────────
  it('shows error state when server returns ok:true but success:false', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: 'Submission could not be processed.' }),
    });
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/submission could not be processed/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ── Coverage gap 4: malformed JSON response ───────────────────────────
  it('shows user-friendly fallback when response JSON is malformed', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { throw new SyntaxError('Unexpected token'); },
    });
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      // Caught by outer catch — shows the network/connection fallback message
      expect(screen.getByText(/unable to send/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ── Coverage gap 5: field errors render as block-level <p role="alert"> ──
  it('renders field validation errors in block-level <p role="alert"> elements', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert');
      expect(alerts.length).toBeGreaterThan(0);
      // a11y-content F-1: errors are announced from block <p> elements, not inline <span>.
      for (const alert of alerts) {
        expect(alert.tagName).toBe('P');
      }
    });
  });

});
