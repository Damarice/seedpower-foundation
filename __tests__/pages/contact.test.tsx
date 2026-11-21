import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactPage, { metadata } from '@/app/(content)/contact/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/contact' }));

describe('ContactPage', () => {
  it('renders without error', () => {
    render(<ContactPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "Contact"', () => {
    render(<ContactPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Contact');
  });

  it('renders WhatsApp link with exact confirmed URL', () => {
    render(<ContactPage />);
    const waLinks = screen
      .getAllByRole('link')
      .filter(
        (el) =>
          el.getAttribute('href') === 'https://wa.me/message/UIEW6BV2N5LCK1'
      );
    expect(waLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('WhatsApp link opens in a new tab with noopener noreferrer', () => {
    render(<ContactPage />);
    const waLink = screen
      .getAllByRole('link')
      .find(
        (el) =>
          el.getAttribute('href') === 'https://wa.me/message/UIEW6BV2N5LCK1'
      );
    expect(waLink).toBeDefined();
    expect(waLink!.getAttribute('target')).toBe('_blank');
    expect(waLink!.getAttribute('rel')).toContain('noopener');
    expect(waLink!.getAttribute('rel')).toContain('noreferrer');
  });

  it('renders Facebook link with exact confirmed URL', () => {
    render(<ContactPage />);
    const fbLinks = screen
      .getAllByRole('link')
      .filter(
        (el) =>
          el.getAttribute('href') ===
          'https://www.facebook.com/seedpoweredfoundation'
      );
    expect(fbLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('Facebook link opens in a new tab with noopener noreferrer', () => {
    render(<ContactPage />);
    const fbLink = screen
      .getAllByRole('link')
      .find(
        (el) =>
          el.getAttribute('href') ===
          'https://www.facebook.com/seedpoweredfoundation'
      );
    expect(fbLink).toBeDefined();
    expect(fbLink!.getAttribute('target')).toBe('_blank');
    expect(fbLink!.getAttribute('rel')).toContain('noopener');
    expect(fbLink!.getAttribute('rel')).toContain('noreferrer');
  });

  it('shows a form placeholder explaining it is coming soon', () => {
    render(<ContactPage />);
    expect(screen.getByText(/contact form coming soon/i)).toBeInTheDocument();
  });

  it('does not render a functional form element', () => {
    render(<ContactPage />);
    expect(document.querySelector('form')).toBeNull();
  });

  it('does not display the unconfirmed phone number as a confirmed contact detail', () => {
    render(<ContactPage />);
    // +254 758 585750 is unconfirmed for the new site — must not appear
    expect(screen.queryByText(/\+254|758 585/)).not.toBeInTheDocument();
  });

  it('does not display an unconfirmed email address as a contact link', () => {
    render(<ContactPage />);
    // info@seedpowerfoundation.org requires client confirmation per Architecture Section 5.3
    const emailLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href')?.startsWith('mailto:'));
    expect(emailLinks).toHaveLength(0);
  });

  it('does not display an invented postal address or office hours', () => {
    render(<ContactPage />);
    expect(screen.queryByText(/office hours|monday.*friday|9am|9:00/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/P\.?O\.? Box|postal|zip code|postcode/i)).not.toBeInTheDocument();
  });

  it('does not imply the contact form is currently available in the intro text', () => {
    render(<ContactPage />);
    // The intro must not say "send us an enquiry using the contact form"
    // or similar present-tense form availability language
    expect(
      screen.queryByText(/send us an enquiry using the contact form/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/send an enquiry through our contact form/i)
    ).not.toBeInTheDocument();
  });

  it('metadata.description does not imply the form is currently available', () => {
    expect(metadata.description).not.toMatch(/send an enquiry through our contact form/i);
    expect(metadata.description).not.toMatch(/send us an enquiry/i);
    // Should mention available channels and coming-soon status
    expect(metadata.description).toMatch(/whatsapp/i);
    expect(metadata.description).toMatch(/facebook/i);
    expect(metadata.description).toMatch(/coming soon/i);
  });

  it('metadata.openGraph.description does not imply the form is currently available', () => {
    const ogDesc = metadata.openGraph?.description ?? '';
    expect(ogDesc).not.toMatch(/our enquiry form/i);
    expect(ogDesc).not.toMatch(/send an enquiry/i);
    // Should mention available channels and coming-soon status
    expect(ogDesc).toMatch(/whatsapp/i);
    expect(ogDesc).toMatch(/facebook/i);
    expect(ogDesc).toMatch(/coming soon/i);
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<ContactPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
