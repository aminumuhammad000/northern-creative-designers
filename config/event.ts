export interface EventInfo {
  name: string;
  edition: string;
  theme: string;
  subtheme: string;
  tagline: string;
  date: string;
  isoDate: string;
  venue: string;
  city: string;
  country: string;
  status: "announced" | "registration_open" | "sold_out" | "concluded";
  admissionPolicy: "Configurable Attendee Registration";
}

export const eventConfig: EventInfo = {
  name: "Northern Creative Designers Summit",
  edition: "2.0",
  theme: "Roots & Vectors: Shaping the Future of Arewa Design",
  subtheme: "Bridging Indigenous Heritage with Modern Digital Excellence",
  tagline:
    "An immersive, highly practical gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria.",
  date: "19th December, 2026",
  isoDate: "2026-12-19T09:00:00+01:00",
  venue: "Kano, Nigeria",
  city: "Kano",
  country: "Nigeria",
  status: "registration_open",
  admissionPolicy: "Configurable Attendee Registration",
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
      "Preserve and celebrate Northern visual identity by integrating traditional motifs into modern digital products, branding, motion, and AI-assisted workflows.",
    icon: "Compass",
  },
  {
    id: "sustainable-monetization",
    title: "Drive Sustainable Monetization",
    description:
      "Teach sustainable pricing, proposal writing, and client negotiation, directly connecting regional creatives with paying enterprise opportunities.",
    icon: "TrendingUp",
  },
  {
    id: "community-recognition",
    title: "Foster Community & Recognition",
    description:
      "Build a supportive network across Arewa through collaborative hackathons, public exhibitions, and awards that spotlight regional creative excellence.",
    icon: "Users",
  },
];
