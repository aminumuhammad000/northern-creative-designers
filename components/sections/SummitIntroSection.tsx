"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Compass,
  TrendingUp,
  Users,
  Eye,
  Target,
  Sparkles,
  Briefcase,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Palette,
  Laptop,
  Video,
  Building,
  Brush,
} from "lucide-react";
import {
  eventConfig,
  visionAndMission,
  coreObjectives,
  whatToExpect,
  whoShouldAttend,
} from "@/config/event";

const verticalCohorts = [
  {
    id: "brand",
    name: "Brand & Identity",
    icon: <Palette className="w-4 h-4" />,
    tag: "Visual Languages & Systems",
    heading: "Honor Arewa Heritage, Build Global Systems",
    description:
      "Deep dive into transforming traditional Northern motifs, geometry, and calligraphy into scalable vector design systems, packaging, and high-value brand identities.",
    highlights: [
      "Traditional Arewa motifs to SVG icon systems",
      "Packaging & typography masterclasses",
      "Sustainable identity pricing for regional enterprise",
    ],
  },
  {
    id: "product",
    name: "UI/UX & Digital",
    icon: <Laptop className="w-4 h-4" />,
    tag: "Product & Experience Craft",
    heading: "Build High-Impact Digital Products",
    description:
      "Master user research, accessibility, and high-conversion product interfaces tailored to African markets and global digital standards.",
    highlights: [
      "Design systems from Figma to responsive code",
      "Fintech, healthtech, and civic UX patterns",
      "Portfolio reviews with senior product leads",
    ],
  },
  {
    id: "motion",
    name: "Motion, 3D & AI",
    icon: <Video className="w-4 h-4" />,
    tag: "Next-Gen Creative Craft",
    heading: "Storytelling with Motion & Synthetic Tools",
    description:
      "Harness generative AI, Cinema 4D, Blender, and After Effects to bring Northern narratives alive through world-class motion graphics and 3D craft.",
    highlights: [
      "AI as a creative co-pilot in commercial workflows",
      "Dynamic 3D typography and kinetic branding",
      "Live 2-Hour hackathon animation challenge",
    ],
  },
  {
    id: "founders",
    name: "Founders & Agencies",
    icon: <Building className="w-4 h-4" />,
    tag: "Commercial Dealmaking",
    heading: "Hire Top Talent at Client Connect Corner",
    description:
      "Meet vetted designers, developers, and visual strategists ready to execute enterprise brand, marketing, and digital engineering mandates.",
    highlights: [
      "Private dealmaking booths at Client Connect Corner",
      "Bespoke agency partnership & exhibitor booths",
      "Summit Marketplace commercial discounts",
    ],
  },
  {
    id: "artists",
    name: "Artists & Illustrators",
    icon: <Brush className="w-4 h-4" />,
    tag: "Cultural Visual Art",
    heading: "Exhibition Wall & Regional Recognition",
    description:
      "Showcase your work physically on the curated Design Exhibition Wall and compete for prestigious Summit 2.0 trophy awards.",
    highlights: [
      "Physical Design Exhibition Wall display",
      "Artisanal merch licensing opportunities",
      "Annual Arewa Creative Excellence Awards",
    ],
  },
];

export function SummitIntroSection() {
  const [activeTab, setActiveTab] = useState(0);

  const objectiveIcons: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6 text-spring" />,
    Compass: <Compass className="w-6 h-6 text-tangerine" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-spring" />,
    Users: <Users className="w-6 h-6 text-tangerine" />,
  };

  const expectIcons: Record<string, React.ReactNode> = {
    learning: <Layers className="w-5 h-5 text-spring" />,
    hackathon: <Sparkles className="w-5 h-5 text-tangerine" />,
    business: <Briefcase className="w-5 h-5 text-spring" />,
    community: <Trophy className="w-5 h-5 text-tangerine" />,
  };

  const currentCohort = verticalCohorts[activeTab];

  return (
    <section id="about-summit" className="py-20 md:py-32 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. About The Summit (Chowdeck-Inspired Big Typography) */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-spring" />
            <span>Official Summit 2.0 Overview</span>
          </div>

          <h2 className="type-section-title text-pine mb-6 tracking-tight">
            About The <span className="text-spring">Summit.</span>
          </h2>

          <p className="type-body text-navy/85 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-normal">
            Northern Creative Designers Summit 2.0 is the premier annual
            gathering for designers, strategists, developers, and visual storytellers
            across Northern Nigeria. Moving beyond conventional talk shows to
            deliver deep learning, real-time collaboration, and actionable career pathways.
          </p>

          <p className="type-body text-navy/70 text-sm sm:text-base max-w-2xl mx-auto mt-5 leading-relaxed">
            This year’s theme, <strong className="text-pine font-semibold">&ldquo;Roots &amp; Vectors: Shaping the Future of Arewa Design,&rdquo;</strong> explores the powerful intersection of rich cultural heritage and modern digital innovation. We examine how Northern designers can honor traditional visual languages while leveraging cutting-edge design tools, strategic thinking, and artificial intelligence to compete at a global scale.
          </p>
        </div>

        {/* 2. Chowdeck-Style Interactive "What's on Deck?" Vertical Switcher */}
        <div className="mb-24 p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-extrabold text-tangerine uppercase tracking-wider px-3.5 py-1 rounded-full bg-tangerine/10">
              Interactive Explorer
            </span>
            <h3 className="type-heading text-pine mt-3">
              What&apos;s on Deck for You?
            </h3>
            <p className="type-body text-navy/70 text-sm sm:text-base mt-2">
              Select your creative discipline to preview the masterclasses, networking, and opportunities designed specifically for you.
            </p>
          </div>

          {/* Interactive Tabs (Chowdeck Pill Switcher) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {verticalCohorts.map((cohort, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cohort.id}
                  onClick={() => setActiveTab(idx)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-pine text-white shadow-md scale-105"
                      : "bg-white text-navy/80 border border-neutral-border hover:border-pine/40 hover:bg-white"
                  }`}
                >
                  <span className={isActive ? "text-spring" : "text-navy/60"}>
                    {cohort.icon}
                  </span>
                  <span>{cohort.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Animated Content Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-border shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-spring/15 text-pine border border-spring/30">
                {currentCohort.tag}
              </span>
              <h4 className="type-subheading text-pine text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentCohort.heading}
              </h4>
              <p className="type-body text-navy/80 text-sm sm:text-base leading-relaxed">
                {currentCohort.description}
              </p>
              <div className="pt-4 space-y-2.5">
                <p className="text-xs font-bold text-pine uppercase tracking-wider">
                  Key Summit Deliverables:
                </p>
                <div className="space-y-2">
                  {currentCohort.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-navy/80">
                      <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-pine text-white space-y-5">
              <div>
                <span className="text-spring text-xs font-mono font-bold uppercase tracking-wider">
                  Registration Access
                </span>
                <p className="text-2xl font-black text-white mt-1">
                  Delegate Pass 2.0
                </p>
                <p className="text-xs text-white/75 mt-2 leading-relaxed">
                  Grants full admission to all masterclasses, keynote stages, exhibition wall, and real-time voting.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15">
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-spring text-navy text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <span>Claim Your Pass</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Vision & Mission Statement (Adapted from PDF Page 04 with Chunky Rounded Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Vision Card */}
          <div className="p-8 sm:p-12 rounded-[2rem] bg-pine text-white relative overflow-hidden flex flex-col justify-between shadow-md hover:-translate-y-1.5 transition-transform duration-300">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-spring" />
              </div>
              <span className="text-spring text-xs font-bold uppercase tracking-wider">
                Strategic Horizon
              </span>
              <h3 className="type-subheading text-white text-2xl sm:text-3xl mt-1 mb-4 font-extrabold">
                {visionAndMission.vision.title}
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
                {visionAndMission.vision.content}
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="font-mono text-spring font-bold">Roots &amp; Vectors</span>
              <span>Summit 2.0</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-12 rounded-[2rem] bg-[#FAFAF8] border-2 border-neutral-border text-navy relative overflow-hidden flex flex-col justify-between shadow-sm hover:-translate-y-1.5 transition-transform duration-300">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-pine/5 border border-pine/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-tangerine" />
              </div>
              <span className="text-tangerine text-xs font-bold uppercase tracking-wider">
                Execution Mandate
              </span>
              <h3 className="type-subheading text-pine text-2xl sm:text-3xl mt-1 mb-4 font-extrabold">
                {visionAndMission.mission.title}
              </h3>
              <p className="text-navy/80 text-base sm:text-lg leading-relaxed font-normal">
                {visionAndMission.mission.content}
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-neutral-border flex items-center justify-between text-xs text-navy/60">
              <span className="font-mono text-tangerine font-bold">High-Value Impact</span>
              <span>RC: {eventConfig.rcNumber}</span>
            </div>
          </div>
        </div>

        {/* 4. Core Objectives (Adapted from PDF Page 05 with Hover Lift) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-pine uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-pine/5 border border-pine/10">
              Foundational Pillars
            </span>
            <h3 className="type-heading text-pine mt-3 font-extrabold">
              Core Objectives
            </h3>
            <p className="type-body text-navy/70 text-sm sm:text-base mt-2">
              Four concrete pillars driving every masterclass, panel, and exhibition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreObjectives.map((obj) => (
              <div
                key={obj.id}
                className="p-8 rounded-3xl bg-white border border-neutral-border hover:border-spring hover:-translate-y-2 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-pine/5 border border-pine/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pine group-hover:text-spring transition-all duration-300">
                    {objectiveIcons[obj.icon] || <Layers className="w-6 h-6 text-spring" />}
                  </div>
                  <h4 className="font-extrabold text-pine text-lg mb-2 leading-snug">
                    {obj.title}
                  </h4>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. What to Expect (Adapted from PDF Page 06) */}
        <div className="mb-24 p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-spring uppercase tracking-wider px-3.5 py-1 rounded-full bg-pine text-white">
              Summit Experience
            </span>
            <h3 className="type-heading text-pine mt-3 font-extrabold">
              What to Expect
            </h3>
            <p className="type-body text-navy/70 text-sm mt-2">
              An action-oriented environment engineered for deep collaboration and career acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatToExpect.map((item) => (
              <div
                key={item.id}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-border flex items-start gap-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-pine flex-shrink-0 flex items-center justify-center">
                  {expectIcons[item.id] || <Layers className="w-5 h-5 text-spring" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-pine text-lg sm:text-xl">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-pine bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Who Should Attend? (Chowdeck Pill Badges) */}
        <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-pine text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mb-8 relative z-10">
            <span className="text-spring text-xs font-bold uppercase tracking-wider">
              Ecosystem Cohort
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-1 text-white">
              Who Should Attend?
            </h3>
            <p className="text-white/85 text-sm sm:text-base mt-3 leading-relaxed">
              Whether you are an emerging creative building your foundational skills,
              an established practitioner expanding into international markets, or a
              business owner seeking top-tier creative talent, Northern Creative
              Designers Summit 2.0 is your platform to connect, grow, and shape the
              future of Arewa design.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 relative z-10">
            {whoShouldAttend.map((role) => (
              <div
                key={role}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold hover:bg-spring hover:text-navy hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{role}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70 relative z-10">
            <span>Connect with 1,000+ creative innovators and founders in Kano</span>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-spring font-extrabold hover:underline uppercase tracking-wider"
            >
              <span>Secure Your Delegate Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
