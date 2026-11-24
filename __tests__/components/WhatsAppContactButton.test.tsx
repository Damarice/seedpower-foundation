import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WhatsAppContactButton } from '@/components/layout/WhatsAppContactButton';

expect.extend(toHaveNoViolations);

const expectedUrl =
  'https://wa.me/254758585750?text=Hello%20SeedPower%20Foundation.%20I%20would%20like%20to%20learn%20more%20about%20your%20work%20and%20how%20I%20can%20get%20involved.';

describe('WhatsAppContactButton', () => {
  it('links to the confirmed number with the exact prefilled message', () => {
    render(<WhatsAppContactButton />);

    const link = screen.getByRole('link', {
      name: 'Chat with SeedPower Foundation on WhatsApp',
    });

    expect(link).toHaveAttribute('href', expectedUrl);
    expect(new URL(link.getAttribute('href')!).pathname).toBe('/254758585750');
    expect(new URL(link.getAttribute('href')!).searchParams.get('text')).toBe(
      'Hello SeedPower Foundation. I would like to learn more about your work and how I can get involved.'
    );
  });

  it('opens in a new tab with safe external-link attributes', () => {
    render(<WhatsAppContactButton />);
    const link = screen.getByRole('link', {
      name: 'Chat with SeedPower Foundation on WhatsApp',
    });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has a recognizable icon, floating position, and keyboard focus styling', () => {
    render(<WhatsAppContactButton />);
    const link = screen.getByRole('link', {
      name: 'Chat with SeedPower Foundation on WhatsApp',
    });

    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(link.className).toContain('fixed');
    expect(link.className).toContain('focus-visible:outline');
    expect(link.className).toContain('motion-reduce:transition-none');
    expect(link.className).toContain(
      'bottom-[calc(1rem+env(safe-area-inset-bottom))]'
    );
    expect(link.className).toContain(
      'desktop:bottom-[calc(5rem+env(safe-area-inset-bottom))]'
    );
    expect(link.className).toContain(
      'right-[calc(1rem+env(safe-area-inset-right))]'
    );
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<WhatsAppContactButton />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
