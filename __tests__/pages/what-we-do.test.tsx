import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import WhatWeDoPage from '@/app/(content)/what-we-do/page';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({ usePathname: () => '/what-we-do' }));

describe('WhatWeDoPage', () => {
  it('renders without error', () => {
    render(<WhatWeDoPage />);
    expect(document.body).toBeTruthy();
  });

  it('has a single H1 "What We Do"', () => {
    render(<WhatWeDoPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('What We Do');
  });

  it('renders the verified overview statement', () => {
    render(<WhatWeDoPage />);
    expect(
      screen.getByText(/Improved and sustainable livelihoods/i)
    ).toBeInTheDocument();
  });

  it('renders the five programme card titles', () => {
    render(<WhatWeDoPage />);
    const titles = [
      'Education Centers',
      'Teacher Training',
      'Water & Sanitation',
      'Sustainable Food Project',
      'Community Outreach',
    ];
    for (const title of titles) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it('uses distinct photographs for teacher training and water access', () => {
    render(<WhatWeDoPage />);
    expect(
      screen.getByRole('img', {
        name: 'Participants demonstrate a visual-skills activity during a teacher conference in Kisumu.',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Pupils collect water at a school water point.' })
    ).toBeInTheDocument();
  });

  it('all programme cards link to their correct routes', () => {
    render(<WhatWeDoPage />);
    const routes = [
      [/learn more about education centers/i, '/what-we-do/education'],
      [/learn more about teacher training/i, '/what-we-do/teacher-training'],
      [/learn more about water & sanitation/i, '/what-we-do/wash'],
      [/learn more about sustainable food project/i, '/what-we-do/food-project'],
      [/learn more about community outreach/i, '/what-we-do/community-outreach'],
    ] as const;
    for (const [name, href] of routes) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<WhatWeDoPage />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Teacher Training card describes 1,738 as individuals, not teachers alone', () => {
    render(<WhatWeDoPage />);
    // The description must use "individuals" or equivalent — not "teachers" as the sole noun
    // before the 1,738 figure, which would mischaracterise the participant composition.
    expect(screen.getByText(/1,738 individuals/i)).toBeInTheDocument();
    // Guard against regression to the old misleading wording
    expect(screen.queryByText(/1,738 teachers,/i)).not.toBeInTheDocument();
  });
});
