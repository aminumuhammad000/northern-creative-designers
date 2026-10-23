import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { SummitIntroSection } from "@/components/sections/SummitIntroSection";
import { ProgrammeHighlightsSection } from "@/components/sections/ProgrammeHighlightsSection";
import { SpeakersSection } from "@/components/sections/SpeakersSection";
import { HackathonSection } from "@/components/sections/HackathonSection";
import { ExhibitorSection } from "@/components/sections/ExhibitorSection";
import { CommitmentSection } from "@/components/sections/CommitmentSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { RegistrationCTASection } from "@/components/sections/RegistrationCTASection";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Summit Introduction & Objectives */}
      <SummitIntroSection />

      {/* 3. Programme Highlights */}
      <ProgrammeHighlightsSection />

      {/* 4. Curated Speakers Announcement State */}
      <SpeakersSection />

      {/* 5. Live Hackathon & 2-Hour Sprint Feature */}
      <HackathonSection />

      {/* 6. Exhibitors, Vendors & Summit Marketplace */}
      <ExhibitorSection />

      {/* 7. Commitment in Action & Past Impact */}
      <CommitmentSection />

      {/* 8. Partners, Sponsors & Amee Technology Ltd Spotlight */}
      <PartnersSection />

      {/* 9. High-Conversion Registration CTA */}
      <RegistrationCTASection />
    </main>
  );
}
