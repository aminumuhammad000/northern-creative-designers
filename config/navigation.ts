export interface NavItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

export const mainNavItems: NavItem[] = [
  { title: "About", href: "/about" },
  { title: "Programme", href: "/programme" },
  { title: "Hackathon", href: "/hackathon" },
  { title: "Exhibitors", href: "/exhibitors" },
  { title: "Sponsors", href: "/partners" },
  { title: "Past Editions", href: "/past-editions" },
  { title: "Contact", href: "/contact" },
];

export const footerNavItems = {
  summit: [
    { title: "About Summit 2.0", href: "/about" },
    { title: "Programme Schedule", href: "/programme" },
    { title: "Speakers Announcement", href: "/speakers" },
    { title: "Hackathon & Voting", href: "/hackathon" },
    { title: "Exhibitor Opportunities", href: "/exhibitors" },
    { title: "Past Editions & Impact", href: "/past-editions" },
  ],
  participate: [
    { title: "Register as Attendee", href: "/register" },
    { title: "Apply for Exhibition Booth", href: "/exhibitors/apply" },
    { title: "Register for Hackathon", href: "/hackathon/register" },
    { title: "Become a Sponsor", href: "/partners#sponsor-tiers" },
    { title: "Competition & Voting Rules", href: "/voting-rules" },
  ],
  organisation: [
    { title: "Executive Committee & Team", href: "/team" },
    { title: "Official Partners", href: "/partners" },
    { title: "Contact & Enquiries", href: "/contact" },
    { title: "Admin Portal", href: "/admin" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Participation", href: "/terms" },
    { title: "Voting Integrity Policy", href: "/voting-rules" },
  ],
};
