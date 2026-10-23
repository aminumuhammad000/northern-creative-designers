import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
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
      {/* 1. Hero Section with Chowdeck-Inspired Big Typography & Floating Stickers */}
      <HeroSection />

      {/* 2. Full-Width Infinite Marquee Ticker (Pine Theme, Scrolling Left) */}
      <MarqueeTicker theme="pine" />

      {/* 3. Summit Introduction, Interactive Cohort Switcher & Objectives */}
      <SummitIntroSection />

      {/* 4. Secondary Reverse Marquee Ticker (Spring Theme, Scrolling Right) */}
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

      {/* 5. Programme Highlights & Structure */}
      <ProgrammeHighlightsSection />

      {/* 6. Curated Speakers Announcement State */}
      <SpeakersSection />

      {/* 7. Live Hackathon & 2-Hour Sprint Feature */}
      <HackathonSection />

      {/* 8. Exhibitors, Vendors & Summit Marketplace */}
      <ExhibitorSection />

      {/* 9. Commitment in Action & Verified Past Impact */}
      <CommitmentSection />

      {/* 10. Partners, Sponsorship Packages & 100% Budget Transparency */}
      <PartnersSection />

      {/* 11. High-Conversion Registration CTA with Official QR Verification */}
      <RegistrationCTASection />
    </main>
  );
}
