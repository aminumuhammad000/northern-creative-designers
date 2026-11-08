import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { SummitIntroSection } from "@/components/sections/SummitIntroSection";
import { ProgrammeHighlightsSection } from "@/components/sections/ProgrammeHighlightsSection";
import { SpeakersSection } from "@/components/sections/SpeakersSection";
import { HackathonSection } from "@/components/sections/HackathonSection";
import { CommitmentSection } from "@/components/sections/CommitmentSection";
import { RegistrationCTASection } from "@/components/sections/RegistrationCTASection";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* 1. Hero Section with Chowdeck-Inspired Big Typography & Floating Stickers */}
      <HeroSection />

      {/* 2. Full-Width Infinite Marquee Ticker (Pine Theme, Scrolling Left) */}
      <MarqueeTicker theme="pine" />

      {/* 3. Summit Introduction & Objectives */}
      <SummitIntroSection />

      {/* 4. Programme Highlights & Staggered Architecture (Faithfully adapted to program feature.png & PDF Page 08) */}
      <ProgrammeHighlightsSection />

      {/* 5. Curated Speakers Announcement State */}
      <SpeakersSection />

      {/* 6. Live Hackathon & 2-Hour Sprint Feature */}
      <HackathonSection />

      {/* 7. Commitment in Action & Verified Past Impact */}
      <CommitmentSection />

      {/* 8. High-Conversion Registration CTA */}
      <RegistrationCTASection />
    </main>
  );
}
