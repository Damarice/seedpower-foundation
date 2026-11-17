/**
 * Shared navigation item data.
 * Routes are drawn exclusively from the verified route map in
 * Technical Implementation Architecture v1.2 — Section 5.1.
 *
 * /give/campaigns is explicitly deferred (no confirmed content).
 * /impact/gallery is explicitly deferred (not in verified route map).
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Who We Are',
    href: '/who-we-are',
  },
  {
    label: 'What We Do',
    href: '/what-we-do',
    children: [
      { label: 'Education', href: '/what-we-do/education' },
      { label: "Women's Empowerment", href: '/what-we-do/womens-empowerment' },
      { label: 'Teacher Training', href: '/what-we-do/teacher-training' },
      { label: 'WASH', href: '/what-we-do/wash' },
      { label: 'Food Project', href: '/what-we-do/food-project' },
      { label: 'Community Outreach', href: '/what-we-do/community-outreach' },
    ],
  },
  {
    label: 'Our Impact',
    href: '/impact',
    children: [
      { label: 'Impact Overview', href: '/impact' },
      { label: 'Success Stories', href: '/impact/success-stories' },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Sponsor a Child', href: '/get-involved/sponsor-a-child' },
      { label: 'Visit Your Child', href: '/get-involved/visit-your-child' },
    ],
  },
  {
    label: 'Give',
    href: '/give',
    children: [
      { label: 'Donate', href: '/give/donate' },
      { label: 'Events', href: '/give/events' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
