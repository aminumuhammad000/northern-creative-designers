export interface EventInfo {
  name: string;
  edition: string;
  rcNumber: string;
  theme: string;
  subtheme: string;
  tagline: string;
  date: string;
  isoDate: string;
  venue: string;
  city: string;
  country: string;
  status: "announced" | "registration_open" | "sold_out" | "concluded";
  admissionPolicy: string;
  secretariat: {
    organization: string;
    rcNumber: string;
    email: string;
    phones: string[];
    handle: string;
  };
  banking: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    paymentNote: string;
  };
}

export const eventConfig: EventInfo = {
  name: "Northern Creative Designers Summit",
  edition: "2.0",
  rcNumber: "RC: 9930022",
  theme: "Roots & Vectors: Shaping the Future of Arewa Design",
  subtheme: "Bridging Indigenous Heritage with Modern Digital Excellence",
  tagline:
    "The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria.",
  date: "19th December, 2026",
  isoDate: "2026-12-19T09:00:00+01:00",
  venue: "Kano, Nigeria",
  city: "Kano",
  country: "Nigeria",
  status: "registration_open",
  admissionPolicy: "Configurable Attendee Registration",
  secretariat: {
    organization: "Northern Creative Designers",
    rcNumber: "RC: 9930022",
    email: "support@northcdesigner.com.ng",
    phones: ["07030058919", "08033573842"],
    handle: "@northcdesigners",
  },
  banking: {
    accountName: "Northern Creative Designers",
    bankName: "KUDA MFB",
    accountNumber: "3004513846",
    paymentNote:
      "Structured installment plans available. Asset submissions (logos, brand guidelines) must be finalized 14 days prior to event print deadlines.",
  },
};

export const visionAndMission = {
  vision: {
    title: "Vision Statement",
    content:
      "To establish Northern Nigeria as a globally competitive hub of creative talent, where rich cultural heritage and modern design innovation power sustainable economic growth.",
  },
  mission: {
    title: "Mission Statement",
    content:
      "To empower Northern designers, strategists, and creators through immersive learning, hands-on collaboration, and direct business connections — bridging indigenous storytelling with cutting-edge tools to elevate local craft into high-value global impact.",
  },
};

export const coreObjectives = [
  {
    id: "skill-excellence",
    title: "Cultivate Skill Excellence",
    description:
      "Deliver practical, specialized masterclasses and live build sprints that equip designers with industry-standard technical and strategic capabilities.",
    icon: "Layers",
  },
  {
    id: "culture-modernity",
    title: "Bridge Culture & Modernity",
    description:
      "Preserve and celebrate Northern visual identity by integrating traditional motifs into modern digital products, branding, and media.",
    icon: "Compass",
  },
  {
    id: "sustainable-monetization",
    title: "Drive Sustainable Monetization",
    description:
      "Teach sustainable pricing, proposal writing, and client negotiation, directly connecting regional creatives with paying business opportunities.",
    icon: "TrendingUp",
  },
  {
    id: "community-recognition",
    title: "Foster Community & Recognition",
    description:
      "Build a supportive network across Arewa through collaborative Hackathons, public exhibitions, and awards that spotlight regional talent.",
    icon: "Users",
  },
];

export const whatToExpect = [
  {
    id: "learning",
    title: "Core Practical Learning",
    description:
      "Gain industry-defining insights through a high-impact keynote on Northern design history, candid panel sessions tackling pricing models, AI integration, and global market positioning.",
    badge: "Keynote & Panels",
  },
  {
    id: "hackathon",
    title: "Live Design Hackathon",
    description:
      "Experience the final stage of the live sprint, featuring real-time project builds, expert critiquing, and interactive audience voting.",
    badge: "2-Hour Sprint",
  },
  {
    id: "business",
    title: "Business & Client Connections",
    description:
      "Bridge the gap between talent and opportunity at the Client Connect Corner, participate in dedicated proposal & pricing workshops, and explore exclusive marketplace tool discounts.",
    badge: "Client Corner",
  },
  {
    id: "community",
    title: "Community & Recognition",
    description:
      "Celebrate the finest regional achievements through our curated Design Exhibition Wall and the Summit 2.0 Awards Ceremony, capped with an authentic networking evening.",
    badge: "Exhibition & Awards",
  },
];

export const whoShouldAttend = [
  "Founders",
  "Business Owners",
  "Visual & Graphic Designers",
  "Illustrators & Artists",
  "Industrial & Product Designers",
  "Motion, Animation & Media Designers",
  "Brand Strategists",
  "Fashion & Apparel Designers",
  "Digital, UI/UX & Web Designers",
  "Product Designers",
  "Social Managers",
  "Creative Directors",
];

export const programFeatures = [
  {
    category: "Core Learning",
    subtitle: "Not Just Talks",
    details: "Keynote address on Arewa visual evolution + Candid panel sessions on AI, client pricing, and international market entry.",
  },
  {
    category: "Creative",
    subtitle: "Design Hackathon",
    details: "High-intensity live design sprint with hardware prizes, cash awards, and transparent real-time audience voting.",
  },
  {
    category: "Business & Career",
    subtitle: "Client Connect Corner",
    details: "Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers.",
  },
  {
    category: "Community & Vibe",
    subtitle: "Exhibition Wall & Awards",
    details: "Physical exhibition gallery showcasing premier Arewa graphic identity, typography, and prestigious Summit 2.0 trophy honors.",
  },
];

export const sponsorshipTiers = [
  {
    tier: "Headline Sponsor",
    investment: "₦2,000,000",
    status: "Exclusive (1 Available)",
    accentColor: "border-spring bg-pine text-white",
    benefits: [
      "Exclusive naming rights: 'Northern Creative Designers Summit 2.0 Presented by [Your Brand]'",
      "Prominent logo placement on all stage backdrops, banners, digital assets, and merchandise",
      "Keynote address speaking slot during opening or closing ceremony",
      "Full authorization to place roll-up banners, backdrops, and promotional displays in all key event zones",
      "Lead feature in all pre-event and post-event media press releases and social campaigns",
    ],
  },
  {
    tier: "Platinum Sponsor",
    investment: "₦1,000,000",
    status: "Premier Tier",
    accentColor: "border-tangerine bg-white text-navy",
    benefits: [
      "Official recognition as Platinum Sponsor across all digital and print media",
      "Speaking opportunity during a high-profile panel or curated pitch session",
      "Exhibition booth with prime positioning in the Summit Marketplace",
      "Prominent branding on event merchandise and participant delegate kits",
      "5 VIP invitations to the exclusive executive networking dinner",
    ],
  },
  {
    tier: "Gold Sponsor",
    investment: "₦500,000",
    status: "Featured Tier",
    accentColor: "border-neutral-border bg-white text-navy",
    benefits: [
      "Recognition as Gold Sponsor on website, backdrop, and official print catalogue",
      "Dedicated exhibition booth within the summit venue floor",
      "Brand logo placement on summit delegate merchandise",
      "Feature mentions across pre-event and post-event social channels",
      "3 VIP passes to all summit sessions",
    ],
  },
  {
    tier: "Silver Sponsor",
    investment: "₦300,000",
    status: "Community Tier",
    accentColor: "border-neutral-border bg-white text-navy",
    benefits: [
      "Brand logo on event promotional assets and official summit portal",
      "Recognition in pre-event and post-event digital communications",
      "2 VIP passes for your company representatives",
      "Inclusion in official post-summit gratitude reel and press recap",
    ],
  },
];

export const customizedPartnerships = [
  {
    title: "Hackathon Prize Sponsor",
    deliverable:
      "Sponsor cash prizes, laptops, graphic drawing tablets, or software subscriptions for winning teams in the 2-Hour Live Design Sprint.",
  },
  {
    title: "Tool & Software Partner",
    deliverable:
      "Provide free or discounted software licenses, cloud design credits, or design tools to equip summit attendees.",
  },
  {
    title: "Media & Press Partner",
    deliverable:
      "Provide strategic broadcast and publication coverage via regional television, radio, print, and high-reach digital channels across Arewa.",
  },
  {
    title: "Refreshment & Hospitality Partner",
    deliverable:
      "Provide artisan refreshments, authentic local drinks, and catering for executive VIP and networking sessions.",
  },
];

export const budgetBreakdown = [
  { category: "Venue & Technical Setup", allocation: 30, deliverables: "Hall booking, high-speed Wi-Fi, projectors, live multi-screen feeds" },
  { category: "Branding & Merch", allocation: 20, deliverables: "Custom tees, delegate totes, badges, exhibition wall production, print runs" },
  { category: "Awards & Hackathon Prizes", allocation: 20, deliverables: "Plaques, cash prizes, creative hardware/equipment" },
  { category: "Logistics & Transportation", allocation: 10, deliverables: "Inter-state movement, local speaker transit, equipment hauling, contingency" },
  { category: "Hospitality", allocation: 10, deliverables: "Speaker honorariums, snacks, refreshments & delegate catering" },
  { category: "Media & Marketing", allocation: 10, deliverables: "Social advertising, high-definition photo/video recap, press distribution" },
];

export const commitmentTrackRecord = {
  hackathons: [
    {
      title: "Northern Design Hackathon (2025)",
      description: "Successfully organized a multi-round regional design competition awarding ₦100,000 in cash prizes to emerging creative talent.",
    },
  ],
  conferences: [
    {
      title: "Northern Creative Summit 1.0",
      description: "Hosted the historic inaugural gathering bringing together design leaders, agency founders, and students across the region.",
    },
  ],
  bootcamps: [
    {
      title: "Brand Identity Masterlab",
      description: "Delivered a hands-on physical bootcamp empowering 50 selected design practitioners with advanced identity systems.",
    },
    {
      title: "The Design Code Bootcamp",
      description: "Facilitated a 3-day intensive program for 75 participants focused on practical design-to-code execution.",
    },
    {
      title: "UI/UX Bootcamp",
      description: "Trained 100 participants in user research, wireframing, and digital product design methodologies.",
    },
  ],
  webinars: [
    "AI as a Design Partner",
    "The Creative Burnout",
    "The Magnet Method: Attracting High-Paying Clients",
    "Designing Emotions: Basic Principles to Create Impactful Work",
  ],
};
