"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  Briefcase,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FeatureCard {
  id: string;
  category: string;
  subtitle: string;
  headline: string;
  details: string;
  bgClass: string;
  textClass: string;
  subtextClass: string;
  badgeClass: string;
  accentBorder: string;
  icon: React.ReactNode;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "light" | "spring" | "tangerine" | "white";
  column: "left" | "right";
}

const features: FeatureCard[] = [
  // 1. Top Left Card: Spring Green (Core Learning)
  {
    id: "core-learning",
    category: "Core Learning",
    subtitle: "Not Just Talks",
    headline: "Keynote + Panel Session",
    details:
      "Keynote address on Arewa visual evolution + Candid panel sessions on AI, client pricing, and international market entry.",
    bgClass: "bg-[#01D26B] text-[#071135]",
    textClass: "text-[#071135]",
    subtextClass: "text-[#071135]/85",
    badgeClass: "bg-[#071135] text-white border-transparent",
    accentBorder: "border-[#01D26B]",
    icon: <BookOpen className="w-7 h-7 text-[#01D26B]" />,
    highlights: [
      "Keynote: The History & Future of Arewa Visual Identity",
      "Panel: Pricing Creative Work & Navigating Global Markets",
      "Panel: Integrating AI into Real Commercial Production Workflows",
    ],
    ctaLabel: "View Keynote & Panels",
    ctaHref: "/programme",
    ctaVariant: "white",
    column: "left",
  },

  // 2. Top Right Card: Deep Indigo / Purple (Creative Hackathon)
  {
    id: "creative-hackathon",
    category: "Creative",
    subtitle: "Live Challenge",
    headline: "Design Hackathon",
    details:
      "High-intensity live design sprint with hardware prizes, cash awards, and transparent real-time audience voting.",
    bgClass: "bg-[#453478] text-white",
    textClass: "text-white",
    subtextClass: "text-white/85",
    badgeClass: "bg-[#01D26B] text-[#071135] border-transparent font-black",
    accentBorder: "border-[#453478]",
    icon: <Zap className="w-7 h-7 text-[#01D26B]" />,
    highlights: [
      "2-Hour Live Sprint: Rapid problem-solving under real constraints",
      "Real-Time Audience Voting & Live Jury Critiques",
      "Over ₦1,000,000 in Hardware Prizes & Cash Bounties",
    ],
    ctaLabel: "Explore Hackathon Rules",
    ctaHref: "/hackathon",
    ctaVariant: "spring",
    column: "right",
  },

  // 3. Bottom Left Card: Midnight Royal Navy (Business & Career)
  {
    id: "business-career",
    category: "Business & Career",
    subtitle: "Dealmaking & Talent",
    headline: "Client Connect Corner",
    details:
      "Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers.",
    bgClass: "bg-[#071135] text-white",
    textClass: "text-white",
    subtextClass: "text-white/85",
    badgeClass: "bg-[#F39200] text-white border-transparent font-black",
    accentBorder: "border-[#071135]",
    icon: <Briefcase className="w-7 h-7 text-[#F39200]" />,
    highlights: [
      "Private 1-on-1 dealmaking booths with verified founders",
      "Portfolio & proposal reviews with design directors",
      "Exclusive Summit Marketplace tool discounts & vendor deals",
    ],
    ctaLabel: "Book Client Corner Booth",
    ctaHref: "/exhibitors",
    ctaVariant: "tangerine",
    column: "left",
  },

  // 4. Bottom Right Card: Deep Pine Green (Community & Vibe)
  {
    id: "community-vibe",
    category: "Community & Vibe",
    subtitle: "Exhibition & Honors",
    headline: "Design Exhibition Wall & Awards",
    details:
      "Physical exhibition gallery showcasing premier Arewa graphic identity, typography, and prestigious Summit 2.0 trophy honors.",
    bgClass: "bg-[#013811] text-white",
    textClass: "text-white",
    subtextClass: "text-white/85",
    badgeClass: "bg-[#F39200] text-white border-transparent font-black",
    accentBorder: "border-[#013811]",
    icon: <Trophy className="w-7 h-7 text-[#01D26B]" />,
    highlights: [
      "Physical Gallery Wall: Curated visual works from across Arewa",
      "Summit 2.0 Creative Excellence Awards ceremony",
      "Authentic evening networking reception & community mixer",
    ],
    ctaLabel: "Submit Exhibition Work",
    ctaHref: "/programme",
    ctaVariant: "spring",
    column: "right",
  },
];

export function ProgrammeHighlightsSection() {
  const leftCards = features.filter((f) => f.column === "left");
  const rightCards = features.filter((f) => f.column === "right");

  return (
    <section
      id="programme-highlights"
      className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Chowdeck Chunky Hierarchy) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine/5 border border-pine/10 text-xs font-extrabold text-pine uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-spring" />
              <span>Program Architecture • Page 08</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Program Features.
            </h2>
            
            <p className="text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Moving beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways for creative practitioners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/programme"
              variant="outline"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Full Schedule Matrix
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

        {/* 4 Chunky Saturated Feature Cards: Staggered 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (Card 1 & Card 3) */}
          <div className="space-y-8 lg:space-y-10">
            {leftCards.map((card) => (
              <div
                key={card.id}
                className={`
                  group rounded-[2.5rem] p-8 sm:p-12 ${card.bgClass} shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out flex flex-col justify-between
                  relative overflow-hidden
                `}
              >
                {/* Micro-glow highlight inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Header Pill Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#071135] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-75">
                          Category
                        </span>
                        <span className="font-black text-lg sm:text-xl leading-tight block">
                          {card.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`
                        px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs
                        group-hover:rotate-1 group-hover:scale-105 transition-transform duration-300
                        ${card.badgeClass}
                      `}
                    >
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight leading-tight ${card.textClass}`}>
                    {card.headline}
                  </h3>

                  {/* Details Paragraph */}
                  <p className={`text-base sm:text-lg mb-8 leading-relaxed font-normal ${card.subtextClass}`}>
                    {card.details}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-3 mb-10 pt-6 border-t border-current/15">
                    {card.highlights.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-90" />
                        <span className="font-semibold leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Action Footer */}
                <div className="relative z-10 pt-6 border-t border-current/15 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                    Kano • 19 Dec 2026
                  </span>

                  <Link
                    href={card.ctaHref}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider
                      shadow-md hover:scale-105 active:scale-95 transition-all
                      ${
                        card.ctaVariant === "white"
                          ? "bg-[#071135] text-white hover:bg-[#0c1b4d]"
                          : card.ctaVariant === "spring"
                          ? "bg-[#01D26B] text-[#071135] hover:bg-[#02e073]"
                          : "bg-[#F39200] text-white hover:bg-[#ff9e0f]"
                      }
                    `}
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Card 2 & Card 4) - Offset by md:mt-10 for Chowdeck Staggered Masonry Feel */}
          <div className="space-y-8 lg:space-y-10 md:mt-10">
            {rightCards.map((card) => (
              <div
                key={card.id}
                className={`
                  group rounded-[2.5rem] p-8 sm:p-12 ${card.bgClass} shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out flex flex-col justify-between
                  relative overflow-hidden
                `}
              >
                {/* Micro-glow highlight inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Header Pill Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-75">
                          Category
                        </span>
                        <span className="font-black text-lg sm:text-xl leading-tight block">
                          {card.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`
                        px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs
                        group-hover:-rotate-1 group-hover:scale-105 transition-transform duration-300
                        ${card.badgeClass}
                      `}
                    >
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight leading-tight ${card.textClass}`}>
                    {card.headline}
                  </h3>

                  {/* Details Paragraph */}
                  <p className={`text-base sm:text-lg mb-8 leading-relaxed font-normal ${card.subtextClass}`}>
                    {card.details}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-3 mb-10 pt-6 border-t border-current/15">
                    {card.highlights.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-90" />
                        <span className="font-semibold leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Action Footer */}
                <div className="relative z-10 pt-6 border-t border-current/15 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                    Kano • 19 Dec 2026
                  </span>

                  <Link
                    href={card.ctaHref}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider
                      shadow-md hover:scale-105 active:scale-95 transition-all
                      ${
                        card.ctaVariant === "white"
                          ? "bg-white text-[#071135] hover:bg-white/90"
                          : card.ctaVariant === "spring"
                          ? "bg-[#01D26B] text-[#071135] hover:bg-[#02e073]"
                          : "bg-[#F39200] text-white hover:bg-[#ff9e0f]"
                      }
                    `}
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Banner Strip for Hackathon & Client Connect */}
        <div className="mt-16 p-8 sm:p-12 rounded-[2.5rem] bg-[#013811] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-spring/[0.05] rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-spring text-xs font-mono font-bold uppercase tracking-wider">
              Talent &amp; Dealmaking Architecture
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Compete or Hire Top Arewa Talent?
            </h4>
            <p className="text-white/80 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Register for the live 2-Hour Design Hackathon or reserve an enterprise booth in the Client Connect Corner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link
              href="/hackathon"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all border border-white/15"
            >
              Hackathon Guidelines
            </Link>
            <Link
              href="/exhibitors"
              className="px-7 py-3.5 rounded-full bg-[#01D26B] text-[#071135] text-xs font-black tracking-wider uppercase hover:bg-[#02e073] hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Client Booths
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
