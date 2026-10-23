import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { SummitIntroSection } from "@/components/sections/SummitIntroSection";
import { WhoShouldAttendSection } from "@/components/sections/WhoShouldAttendSection";
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
      {/* 1. Hero Section with Chowdeck-Inspired Big Typography & Floating Stickers */}
      <HeroSection />

      {/* 2. Full-Width Infinite Marquee Ticker (Pine Theme, Scrolling Left) */}
      <MarqueeTicker theme="pine" />

      {/* 3. Summit Introduction, Interactive Cohort Switcher & Objectives (PDF Pages 03-06) */}
      <SummitIntroSection />

      {/* 4. Who Should Attend? Section (Faithfully adapted to who should attend.png & PDF Page 07) */}
      <WhoShouldAttendSection />

      {/* 5. Secondary Reverse Marquee Ticker (Spring Theme, Scrolling Right) */}
      <MarqueeTicker
        theme="spring"
        reverse
        items={[
          "UI/UX DESIGN",
          "BRAND IDENTITY",
          "MOTION & 3D",
          "CIVIC TECH",
          "AI CRAFT",
          "ILLUSTRATION",
          "TYPOGRAPHY",
          "CLIENT CONNECT CORNER",
          "LIVE 2-HOUR SPRINT",
          "PEOPLE'S CHOICE VOTING",
        ]}
      />

      {/* 6. Programme Highlights & Staggered Architecture (Faithfully adapted to program feature.png & PDF Page 08) */}
      <ProgrammeHighlightsSection />

      {/* 7. Curated Speakers Announcement State */}
      <SpeakersSection />

      {/* 8. Live Hackathon & 2-Hour Sprint Feature */}
      <HackathonSection />

      {/* 9. Exhibitors, Vendors & Summit Marketplace */}
      <ExhibitorSection />

      {/* 10. Commitment in Action & Verified Past Impact */}
      <CommitmentSection />

      {/* 11. Partners, Sponsorship Packages & 100% Budget Transparency */}
      <PartnersSection />

      {/* 12. High-Conversion Registration CTA with Official QR Verification */}
      <RegistrationCTASection />
    </main>
  );
}
