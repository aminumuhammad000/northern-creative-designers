"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownCircle,
  ArrowRight,
  BookOpen,
  Zap,
  Briefcase,
  Trophy,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProgramItem {
  id: string;
  category: string;
  headline: string;
  details: string;
  bgClass: string;
  colPosition: "left" | "right";
  dogEarCorner: "bottom-left" | "bottom-right";
  tapeRotation: string;
  tapeImage: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
}

const programCards: ProgramItem[] = [
  // 1. Core Learning (Spring Green) - Left Column
  {
    id: "core-learning",
    category: "Core Learning (Not Just Talks)",
    headline: "Core Learning (Not Just Talks) Keynote + Panel Session",
    details:
      "Keynote address on Arewa visual evolution + Candid panel sessions on AI, client pricing, and international market entry.",
    bgClass: "bg-[#00CC67]",
    colPosition: "left",
    dogEarCorner: "bottom-left",
    tapeRotation: "-rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_1.png",
    highlights: [
      "Keynote: The History & Future of Arewa Visual Identity",
      "Panel: Pricing Models & Commercial Client Negotiations",
      "Panel: Integrating AI into Real Agency Workflows",
    ],
    ctaLabel: "Session Schedule",
    ctaHref: "/programme",
  },

  // 2. Creative Design Hackathon (Purple/Indigo) - Right Column
  {
    id: "creative-hackathon",
    category: "Creative",
    headline: "Creative\nDesign Hackathon",
    details:
      "High-intensity live design sprint with hardware prizes, cash awards, and transparent real-time audience voting.",
    bgClass: "bg-[#453478]",
    colPosition: "right",
    dogEarCorner: "bottom-right",
    tapeRotation: "rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_2.png",
    highlights: [
      "2-Hour Live Sprint: Rapid problem-solving under real constraints",
      "Real-Time Audience Voting & Live Jury Critiques",
      "Over ₦1,000,000 in Hardware Prizes & Cash Bounties",
    ],
    ctaLabel: "Hackathon Rules",
    ctaHref: "/hackathon",
  },

  // 3. Business & Career (Midnight Navy) - Left Column
  {
    id: "business-career",
    category: "Business & Career",
    headline: "Business & Career\nClient Connect Corner",
    details:
      "Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers.",
    bgClass: "bg-[#071135]",
    colPosition: "left",
    dogEarCorner: "bottom-left",
    tapeRotation: "rotate-2",
    tapeImage: "/images/pdf_extracted/tape_card_3.png",
    highlights: [
      "Private 1-on-1 dealmaking booths with verified founders",
      "Portfolio reviews with senior creative directors",
      "Exclusive Marketplace commercial discounts",
    ],
    ctaLabel: "Client Booths",
    ctaHref: "/exhibitors",
  },

  // 4. Community & Vibe (Deep Pine Green) - Right Column
  {
    id: "community-vibe",
    category: "Community & Vibe",
    headline: "Community & Vibe\nDesign Exhibition Wall",
    details:
      "Physical exhibition gallery showcasing premier Arewa graphic identity, typography, and community showcases.",
    bgClass: "bg-[#013811]",
    colPosition: "right",
    dogEarCorner: "bottom-right",
    tapeRotation: "-rotate-2",
    tapeImage: "/images/pdf_extracted/tape_card_4.png",
    highlights: [
      "Physical Gallery Wall: Curated visual works from across Arewa",
      "Public voting on community showcases",
      "Authentic evening networking reception & mixer",
    ],
    ctaLabel: "Gallery Details",
    ctaHref: "/programme",
  },

  // 5. Award Presentation Categories (Tangerine) - Left Column
  {
    id: "award-presentation",
    category: "Recognition & Honors",
    headline: "Award Presentation\nCategories",
    details:
      "Summit 2.0 trophy honors celebrating exceptional craftsmanship across brand identity, digital product, and cultural design.",
    bgClass: "bg-[#F39200]",
    colPosition: "left",
    dogEarCorner: "bottom-left",
    tapeRotation: "rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_5.png",
    highlights: [
      "Annual Arewa Creative Excellence Awards ceremony",
      "Prestigious Summit 2.0 trophy honors",
      "Spotlight on emerging designers and trailblazers",
    ],
    ctaLabel: "Award Categories",
    ctaHref: "/programme",
  },
];

export function ProgrammeHighlightsSection() {
  const [activeCard, setActiveCard] = useState<ProgramItem>(programCards[0]);

  return (
    <section
      id="programme-highlights"
      className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Program Features &amp; Structure.
            </h2>
            
            <p className="text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Moving beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/programme"
              variant="outline"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Full Schedule
            </Button>
            <Button
              href="/register"
              variant="primary"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Get Delegate Pass
            </Button>
          </div>
        </div>

        {/* Outer Canvas Container matching program feature section.png */}
        <div className="rounded-[2.5rem] bg-[#F8FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-2xl overflow-hidden relative">
          
          {/* Top Title Bar with Arrow Down Circle and Floating 3D Torus */}
          <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00CC67] flex items-center justify-center text-[#00CC67]">
                <ArrowDownCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#013811] tracking-tight">
                Program Features
              </h3>
            </div>

            {/* 3D Iridescent Coil Element on the Top Right */}
            <div className="hidden lg:block absolute -top-10 right-4 w-64 h-64 z-10 pointer-events-none transition-transform duration-700 hover:rotate-6 hover:scale-105">
              <Image
                src="/images/pdf_extracted/vector_3d_torus.png"
                alt="Vector 3D Art Element"
                width={280}
                height={280}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Staggered Taped Sticky Cards Grid (Faithfully matching Page 06 / program feature section.png) */}
          <div className="px-6 sm:px-12 md:px-16 pb-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Left Column Cards (Card 1: Core Learning, Card 3: Client Connect, Card 5: Awards) */}
              <div className="space-y-10 sm:space-y-14">
                
                {/* Card 1: Core Learning */}
                <div
                  onClick={() => setActiveCard(programCards[0])}
                  className={`
                    group relative p-8 sm:p-10 ${programCards[0].bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[2.5rem]
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${programCards[0].tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-black/25 rounded-tr-xl pointer-events-none" />

                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-3">
                    {programCards[0].headline}
                  </h4>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                    {programCards[0].details}
                  </p>
                </div>

                {/* Card 3: Business & Career Client Connect Corner */}
                <div
                  onClick={() => setActiveCard(programCards[2])}
                  className={`
                    group relative p-8 sm:p-10 ${programCards[2].bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[2.5rem]
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${programCards[2].tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-black/25 rounded-tr-xl pointer-events-none" />

                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-3">
                    {programCards[2].headline}
                  </h4>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                    {programCards[2].details}
                  </p>
                </div>

                {/* Card 5: Award Presentation Categories */}
                <div
                  onClick={() => setActiveCard(programCards[4])}
                  className={`
                    group relative p-8 sm:p-10 ${programCards[4].bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[2.5rem]
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${programCards[4].tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-black/25 rounded-tr-xl pointer-events-none" />

                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-3">
                    {programCards[4].headline}
                  </h4>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                    {programCards[4].details}
                  </p>
                </div>

              </div>

              {/* Right Column Cards (Card 2: Creative Hackathon, Card 4: Design Exhibition Wall) - Offset down for authentic zigzag */}
              <div className="space-y-10 sm:space-y-14 md:mt-16">
                
                {/* Card 2: Creative Design Hackathon */}
                <div
                  onClick={() => setActiveCard(programCards[1])}
                  className={`
                    group relative p-8 sm:p-10 ${programCards[1].bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[2.5rem]
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${programCards[1].tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-black/25 rounded-tl-xl pointer-events-none" />

                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-3">
                    {programCards[1].headline}
                  </h4>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                    {programCards[1].details}
                  </p>
                </div>

                {/* Card 4: Community & Vibe Design Exhibition Wall */}
                <div
                  onClick={() => setActiveCard(programCards[3])}
                  className={`
                    group relative p-8 sm:p-10 ${programCards[3].bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[2.5rem]
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${programCards[3].tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-black/25 rounded-tl-xl pointer-events-none" />

                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-3">
                    {programCards[3].headline}
                  </h4>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                    {programCards[3].details}
                  </p>
                </div>

              </div>

            </div>

            {/* Selected Card Interactive Detail Callout */}
            <div className="mt-14 p-6 sm:p-8 rounded-[2rem] bg-white border border-neutral-border shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-border/60">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${activeCard.bgClass} flex items-center justify-center text-white font-bold text-xs`}>
                    ✦
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-pine/70 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      {activeCard.category}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-pine mt-0.5 tracking-tight">
                      {activeCard.headline.replace("\n", " — ")}
                    </h4>
                  </div>
                </div>

                <Link
                  href={activeCard.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-sm flex-shrink-0"
                >
                  <span>{activeCard.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 text-spring" />
                </Link>
              </div>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeCard.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Section: Real Kano Flyover Landmark & "I ❤️ KANO" Monument */}
          <div className="relative pt-8 overflow-hidden flex flex-col justify-end items-center">
            
            {/* 3D Vector Metallic Graphic on the Bottom Right */}
            <div className="hidden lg:block absolute bottom-2 right-4 w-52 h-52 z-10 pointer-events-none transition-transform duration-700 hover:-rotate-6 hover:scale-105">
              <Image
                src="/images/pdf_extracted/vector_3d_hook.png"
                alt="Vector 3D Graphic"
                width={220}
                height={220}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Kano Flyover Landmark Image */}
            <div className="relative z-10 w-full max-w-3xl px-4 flex justify-center">
              <div className="relative w-full aspect-[1625/1401] max-h-[360px] sm:max-h-[460px]">
                <Image
                  src="/images/pdf_extracted/kano_bridge_landmark.png"
                  alt="Iconic Kano City Flyover Landmark and I Love Kano Monument"
                  fill
                  className="object-contain object-bottom grayscale contrast-110"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
