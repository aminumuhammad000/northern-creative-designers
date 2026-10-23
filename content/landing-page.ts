export interface ProgrammeHighlight {
  id: string;
  category: string;
  title: string;
  description: string;
  badge: string;
  deliverables: string[];
}

export interface SponsorTier {
  name: string;
  price: string;
  featured?: boolean;
  benefits: string[];
}

export interface ImpactStat {
  value: string;
  label: string;
  description: string;
}

export interface PastInitiative {
  title: string;
  type: string;
  description: string;
  metric: string;
}

export const landingPageContent = {
  hero: {
    badge: "Official Northern Creative Designers Summit 2.0",
    themeHeadline: "Roots & Vectors",
    themeSubheadline: "Shaping the Future of Arewa Design",
    dateVenue: "19th December, 2026 • Kano, Nigeria",
    description:
      "The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital tools, artificial intelligence, and sustainable monetization.",
    primaryCta: {
      text: "Register to Attend",
      href: "/register",
    },
    secondaryCta: {
      text: "Explore the Programme",
      href: "#programme-highlights",
    },
    metaNote: "RC: 9930022 • In partnership with Amee Technology Ltd",
  },

  introduction: {
    tag: "Why Summit 2.0 Exists",
    title: "Moving Beyond Talk Shows to Actionable Industry Impact",
    paragraph1:
      "The Northern Creative Designers Summit 2.0 is designed as an immersive, highly practical experience. Summit 2.0 moves beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways for creative practitioners across Arewa.",
    paragraph2:
      "This year's theme, 'Roots & Vectors: Shaping the Future of Arewa Design,' explores the powerful intersection of rich cultural heritage and modern digital innovation. We examine how Northern designers can honor traditional visual languages while leveraging cutting-edge design tools, strategic thinking, and artificial intelligence to compete at a global scale.",
    targetAudience: [
      "Visual & Graphic Designers",
      "Brand Strategists",
      "Digital, UI/UX & Web Designers",
      "Industrial & Product Designers",
      "Motion, Animation & Media Designers",
      "Illustrators & Digital Artists",
      "Fashion & Apparel Designers",
      "Tech Founders & Business Owners",
    ],
  },

  programmeHighlights: [
    {
      id: "practical-learning",
      category: "Core Practical Learning",
      title: "Keynote & Candid Panel Sessions",
      badge: "Not Just Talks",
      description:
        "Gain industry-defining insights through a high-impact keynote on Northern design history, followed by candid panel sessions tackling sustainable pricing models, AI workflow integration, and global market positioning.",
      deliverables: [
        "Northern Design History & Cultural Semiotics",
        "The Pricing Matrix: Navigating Regional & Global Clients",
        "Practical AI Integration in Design Workflows",
      ],
    },
    {
      id: "live-hackathon",
      category: "Live Competition",
      title: "2-Hour Live Design Sprint & Hackathon",
      badge: "Audience Voting",
      description:
        "Experience the final stage of the Northern Design Hackathon. Top selected teams participate in a 2-hour live design sprint with live project reviews and audience voting powered by Amee Technology's digital platform.",
      deliverables: [
        "Live Design Sprint Challenges",
        "Independent Judge Evaluations",
        "Real-Time Interactive Audience Voting",
      ],
    },
    {
      id: "business-career",
      category: "Business & Career",
      title: "Client Connect Corner & Marketplace",
      badge: "Direct Monetization",
      description:
        "Bridge the gap between talent and opportunity. Access proposal and pricing masterclasses, engage directly with paying business founders, and discover exclusive discounts at the Summit Marketplace.",
      deliverables: [
        "Structured Client-Designer Pitch Matchups",
        "Hands-on Proposal & Contract Workshops",
        "Summit Tool & Software Partner Discounts",
      ],
    },
    {
      id: "community-recognition",
      category: "Community & Vibe",
      title: "Design Exhibition Wall & Awards 2.0",
      badge: "Regional Spotlight",
      description:
        "Celebrate the finest creative achievements across the region through our curated Design Exhibition Wall and the Summit 2.0 Awards Ceremony, wrapping up with an authentic evening of networking and cultural celebration.",
      deliverables: [
        "Curated Visual Arts & Digital Gallery",
        "Summit 2.0 Regional Excellence Awards",
        "Evening Networking & Culture Mixer",
      ],
    },
  ] as ProgrammeHighlight[],

  speakersAnnouncement: {
    tag: "Presenters & Mentors",
    title: "Curated Voices Shaping Arewa Design",
    statusNote: "Official Speaker Announcements Coming Soon",
    description:
      "Our speaker lineup brings together indigenous design pioneers, modern product leaders, agency founders, and ecosystem architects. In accordance with Summit publishing standards, confirmed speaker profiles, biographies, and session times will be released following executive committee validation.",
    callForSpeakers: {
      title: "Call for Session Proposals & Workshops",
      description:
        "Are you leading breakthrough work in branding, UI/UX, typeface design, motion, or creative business in Northern Nigeria? Submit your session proposal for Summit 2.0.",
      buttonText: "Submit Session Proposal",
      href: "/contact?subject=speaker-proposal",
    },
  },

  hackathon: {
    tag: "Live Creative Competition",
    title: "Northern Design Hackathon 2.0",
    subtitle: "2-Hour Live Design Sprint: Craft, Speed, and Problem Solving",
    description:
      "Following the successful 2025 Northern Design Hackathon (which awarded ₦100,000 in cash prizes), Hackathon 2.0 elevates the challenge to a live stage format. Selected teams will tackle regional cultural and commercial briefs live during the summit.",
    tracks: [
      {
        title: "Cultural Heritage & Modern Digital Identity",
        description: "Translating traditional Northern motifs and visual languages into scalable contemporary branding and UI systems.",
      },
      {
        title: "Product Design for Emerging Markets",
        description: "Solving real economic, agricultural, or educational challenges in Northern Nigeria with intuitive user experiences.",
      },
      {
        title: "AI-Augmented Visual Storytelling",
        description: "Leveraging generative tools responsibly to create authentic local narratives, illustrations, and motion assets.",
      },
    ],
    features: [
      "Rigorous judge rubric and scoring",
      "Audience participation with verified one-vote security",
      "Cash prizes, graphics tablets, hardware and software licenses",
    ],
    ctaText: "Register for Hackathon",
    ctaLink: "/hackathon/register",
  },

  exhibitors: {
    tag: "Exhibition & Marketplace",
    title: "Showcase at the Design Exhibition Wall & Summit Marketplace",
    description:
      "Northern Creative Designers Summit 2.0 provides dedicated space for creative studios, technology startups, hardware vendors, print shops, and design agencies to showcase their craft directly to over 500+ attendees and business executives.",
    typesAccepted: [
      "Creative Agencies & Branding Studios",
      "Software, SaaS & Digital Tool Providers",
      "Print, Packaging & Merchandising Specialists",
      "Hardware & Digital Art Tablet Vendors",
      "Educational Institutions & Design Academies",
    ],
    ctaText: "Apply for an Exhibition Booth",
    ctaLink: "/exhibitors/apply",
  },

  commitment: {
    tag: "Our Track Record",
    title: "Our Commitment in Action",
    lead: "Northern Creative Designers is not a one-day event—it is an enduring community driving continuous skill acquisition, mentorship, and economic advancement.",
    initiatives: [
      {
        title: "Northern Design Hackathon (2025)",
        type: "Competition",
        metric: "₦100,000 Awarded",
        description:
          "Successfully organized a multi-round regional design tournament awarding cash prizes and career opportunities to emerging creators.",
      },
      {
        title: "Northern Creative Summit 1.0",
        type: "Flagship Event",
        metric: "Flagship Predecessor",
        description:
          "Convened creative leaders, studio founders, and students across Northern Nigeria to establish regional creative standards.",
      },
      {
        title: "Brand Identity Masterlab",
        type: "Physical Intensive",
        metric: "50 Practitioners",
        description:
          "Delivered an intensive hands-on physical workshop empowering selected design practitioners with advanced brand architecture.",
      },
      {
        title: "The Design Code Bootcamp",
        type: "3-Day Practical Bootcamp",
        metric: "75 Participants",
        description:
          "Trained 75 participants in translating static visual design systems into interactive digital prototypes and production assets.",
      },
      {
        title: "UI/UX Product Design Bootcamp",
        type: "Digital Product Training",
        metric: "100 Designers",
        description:
          "Comprehensive training in user research, wireframing, design systems, and usability testing for African mobile contexts.",
      },
      {
        title: "Interactive Knowledge Webinar Series",
        type: "Thought Leadership",
        metric: "4 Key Masterclasses",
        description:
          "Delivered community masterclasses including: 'AI as a Design Partner', 'The Creative Burnout', 'The Magnet Method: Attracting High-Paying Clients', and 'Designing Emotions'.",
      },
    ] as PastInitiative[],
  },

  sponsorship: {
    tag: "Partnership & Support",
    title: "Partner with Summit 2.0",
    description:
      "Corporate partners, tech brands, and regional champions are invited to co-create Northern Nigeria's creative economy. We offer tiered packages and customized in-kind opportunities.",
    tiers: [
      {
        name: "Headline Sponsor",
        price: "₦2,000,000",
        featured: true,
        benefits: [
          "Exclusive naming rights: Summit 2.0 Presented by [Your Brand]",
          "Prominent logo on stage, backdrop, digital assets & merchandise",
          "Keynote address slot during opening or closing ceremony",
          "Roll-up banners and promotional displays across primary event areas",
          "Featured across all pre-event and post-event communications",
        ],
      },
      {
        name: "Platinum Sponsor",
        price: "₦1,000,000",
        benefits: [
          "Recognition as Platinum Sponsor across all summit channels",
          "Speaking opportunity during high-profile panel or pitch session",
          "Prime location exhibition booth at the Summit Marketplace",
          "Branding on participant kits and event merchandise",
          "5 VIP invitations to executive networking dinner",
        ],
      },
      {
        name: "Gold Sponsor",
        price: "₦500,000",
        benefits: [
          "Recognition as Gold Sponsor across all platforms",
          "Logo placement on event backdrop, website, and print runs",
          "Dedicated exhibition booth in the marketplace",
          "Branding on attendee materials",
          "3 VIP passes to the summit",
        ],
      },
      {
        name: "Silver Sponsor",
        price: "₦300,000",
        benefits: [
          "Official logo on event brand materials and website",
          "Logo featured on pre-event and post-event communications",
          "2 VIP passes to all summit sessions",
        ],
      },
    ] as SponsorTier[],
    customizedPartnerships: [
      {
        title: "Hackathon Prize Sponsor",
        description: "Sponsor cash prizes, laptops, or graphic tablets for the winning teams.",
      },
      {
        title: "Tool & Software Partner",
        description: "Provide free or discounted licenses, cloud credits, or design software access.",
      },
      {
        title: "Media & Press Partner",
        description: "Provide broadcast, radio, print, or digital coverage across Arewa.",
      },
      {
        title: "Refreshment & Hospitality Partner",
        description: "Provide catering, drinks (e.g. authentic Zobo), and after-party hospitality.",
      },
    ],
    bankDetails: {
      accountName: "Northern Creative Designers",
      bankName: "KUDA MFB",
      accountNumber: "3004513846",
      note: "Full commitment confirmation and asset submissions must be finalized 14 days before the event for inclusion in physical print runs.",
    },
  },

  finalCta: {
    title: "Be Part of Northern Nigeria's Definitive Creative Gathering",
    subheadline:
      "Join 500+ designers, developers, agency founders, and ecosystem leaders in Kano for an unforgettable day of learning, building, and cultural celebration.",
    dateVenue: "19th December, 2026 • Kano, Nigeria",
    primaryButtonText: "Register to Attend",
    primaryButtonHref: "/register",
    secondaryButtonText: "Download Summit Brochure (PDF)",
    secondaryButtonHref: "/NCD-Summit-26-Brochure.pdf",
  },
};
