export interface TeamPerson {
  id: string;
  name: string;
  role: string;
  image?: string; // Profile image path or URL (user provides later)
}

// 1. Leads only (Convener, Operation Lead, Software Partner, and each section's Lead)
export const sectionLeads: TeamPerson[] = [
  {
    id: "abubakar-sadiq",
    name: "Abubakar Sadiq",
    role: "Convener",
    image: "",
  },
  {
    id: "mahmud-sani-muhammad",
    name: "Mahmud Sani Muhammad",
    role: "Operation Lead",
    image: "",
  },
  {
    id: "aminu-muhammad",
    name: "Aminu Muhammad",
    role: "Software Partner",
    image: "",
  },
  {
    id: "aliyu-m-ahmad",
    name: "Aliyu M. Ahmad",
    role: "Partnerships Lead",
    image: "",
  },
  {
    id: "isah-adam",
    name: "Isah Adam",
    role: "Creative Lead",
    image: "",
  },
  {
    id: "shamsuddeen-tijjani",
    name: "Shamsuddeen Tijjani",
    role: "Media Lead",
    image: "",
  },
  {
    id: "abdulhamid",
    name: "Abdulhamid",
    role: "Logistics Lead",
    image: "",
  },
  {
    id: "zahraddeen-ahmad",
    name: "Zahraddeen Ahmad",
    role: "Community & Registration Lead",
    image: "",
  },
  {
    id: "mahmoud-hakeemah",
    name: "Mahmoud Hakeemah",
    role: "Finance Lead",
    image: "",
  },
  {
    id: "rais-ibrahim",
    name: "Rais Ibrahim",
    role: "Hackathon Lead",
    image: "",
  },
];

// 2. All other team members (revealed when expanding the toggle)
export const otherTeamMembers: TeamPerson[] = [
  {
    id: "aisha-nasir",
    name: "Aisha Nasir",
    role: "Team Member",
    image: "",
  },
  {
    id: "ahmadee-concept",
    name: "Ahmadee Concept",
    role: "Team Member",
    image: "",
  },
  {
    id: "idrees-adisa",
    name: "Idrees Adisa",
    role: "Team Member",
    image: "",
  },
  {
    id: "muhammad-kabir-abdullahi",
    name: "Muhammad Kabir Abdullahi",
    role: "Team Member",
    image: "",
  },
  {
    id: "u-h-graphics",
    name: "U & H Graphics",
    role: "Team Member",
    image: "",
  },
  {
    id: "fatima-suleiman-muhammad",
    name: "Fatima Suleiman Muhammad",
    role: "Team Member",
    image: "",
  },
  {
    id: "munat-abdullahi",
    name: "Munat Abdullahi",
    role: "Team Member",
    image: "",
  },
  {
    id: "muhammad-nasir-muhammad",
    name: "Muhammad Nasir Muhammad",
    role: "Team Member",
    image: "",
  },
];
