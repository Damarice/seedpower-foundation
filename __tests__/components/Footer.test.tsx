import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Footer } from '@/components/layout/Footer';

expect.extend(toHaveNoViolations);

describe('Footer', () => {
  it('renders the organisation identity and original description', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'SeedPower Foundation — home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('img', { name: 'SeedPower Foundation' })).toHaveAttribute(
      'src',
      '/images/branding/seedpower-foundation-logo-white.svg'
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Exploring Potential' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Educating, equipping and empowering the vulnerable, children with special needs, and those at risk to become Godly leaders and agents of community transformation.'
      )
    ).toBeInTheDocument();
  });

  it('renders all quick links with existing routes', () => {
    render(<Footer />);
    const quickLinks = within(screen.getByRole('navigation', { name: 'Quick links' }));

    const expectedLinks = [
      ['About Us', '/who-we-are'],
      ['What We Do', '/what-we-do'],
      ['Stories of Change', '/impact/success-stories'],
      ['Get Involved', '/get-involved/volunteer'],
      ['Donate', '/give/donate'],
      ['Contact Us', '/contact'],
    ];

    for (const [label, href] of expectedLinks) {
      expect(quickLinks.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('renders all programme links with existing routes', () => {
    render(<Footer />);
    const programmes = within(
      screen.getByRole('navigation', { name: 'Our programmes' })
    );

    const expectedLinks = [
      ['Education', '/what-we-do/education'],
      ['Teacher Training', '/what-we-do/teacher-training'],
      ['Water & Sanitation', '/what-we-do/wash'],
      ['Sustainable Food Project', '/what-we-do/food-project'],
      ['Community Outreach', '/what-we-do/community-outreach'],
    ];

    for (const [label, href] of expectedLinks) {
      expect(programmes.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('renders functional phone and email links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: '+254 758 585750' })).toHaveAttribute(
      'href',
      'tel:+254758585750'
    );
    expect(screen.getByRole('link', { name: 'seedpf2019@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:seedpf2019@gmail.com'
    );
    expect(
      screen.getByRole('link', { name: 'seedpowerfoundation@gmail.com' })
    ).toHaveAttribute('href', 'mailto:seedpowerfoundation@gmail.com');
  });

  it('uses the verified Facebook destination and an accessible label', () => {
    render(<Footer />);
    const facebook = screen.getByRole('link', {
      name: 'Follow SeedPower Foundation on Facebook (opens in a new tab)',
    });

    expect(facebook).toHaveAttribute(
      'href',
      'https://www.facebook.com/seedpoweredfoundation'
    );
    expect(facebook).toHaveAttribute('target', '_blank');
    expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
    expect(facebook.querySelector('svg')).toBeInTheDocument();
    expect(facebook.className).toContain('hover:bg-white');
  });

  it('displays the exact copyright text with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    const copyright = screen.getByText(
      new RegExp(`©\\s*${year}\\s*SeedPower Foundation\\. All Rights Reserved\\.`)
    );

    expect(copyright).toBeInTheDocument();
  });

  it('does not render a physical address or links to nonexistent routes', () => {
    render(<Footer />);

    expect(screen.queryByText(/P\.?O\.? Box|postal address|office address/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /privacy policy|sitemap|events|visit your child/i }))
      .not.toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
