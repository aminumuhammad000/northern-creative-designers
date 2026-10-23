"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ArrowDownRight,
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
    <section id="about-summit" className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      {/* Soft background ambient illumination */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-spring/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-tangerine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* 1. Creative Editorial Layout: About The Summit (Minimalist & Polished) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
                About The <span className="text-spring">Summit.</span>
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-snug">
                Where indigenous heritage converges with modern digital craft.
              </p>
            </div>

            <p className="type-body text-navy/75 text-base sm:text-lg leading-relaxed font-normal">
              The Northern Creative Designers Summit 2.0 is the premier annual gathering uniting 1,000+ visual thinkers, digital craftspeople, and industry pioneers in Kano. Moving beyond conventional talk shows, the summit functions as an active studio: pairing intensive masterclasses and live build sprints with direct enterprise dealmaking.
            </p>

            {/* Minimalist 3-Pillar Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-neutral-border space-y-1.5">
                <span className="text-xs font-mono font-bold text-pine uppercase tracking-wider block">01 / Craft</span>
                <p className="text-xs sm:text-sm font-semibold text-pine leading-snug">Industry Masterclasses</p>
                <p className="text-xs text-navy/65 leading-relaxed">Brand systems, UI/UX, motion, and synthetic AI workflows.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-neutral-border space-y-1.5">
                <span className="text-xs font-mono font-bold text-tangerine uppercase tracking-wider block">02 / Sprints</span>
                <p className="text-xs sm:text-sm font-semibold text-pine leading-snug">₦1M+ Live Hackathon</p>
                <p className="text-xs text-navy/65 leading-relaxed">2-hour live build challenge with transparent audience voting.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-neutral-border space-y-1.5">
                <span className="text-xs font-mono font-bold text-spring uppercase tracking-wider block">03 / Commerce</span>
                <p className="text-xs sm:text-sm font-semibold text-pine leading-snug">Client Connect Corner</p>
                <p className="text-xs text-navy/65 leading-relaxed">Direct business mandates connecting talent with founders.</p>
              </div>
            </div>
          </div>

          {/* Right Minimalist Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden border border-neutral-border shadow-lg bg-neutral-card group">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative w-full overflow-hidden">
                <Image
                  src="/images/pdf_extracted/vision_workshop_top.png"
                  alt="Northern Creative Designers Summit Community"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-transparent to-black/20" />

                {/* Floating Minimalist Top Pill */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
                  <span>Kano State Library Complex</span>
                </div>

                {/* Floating Minimalist Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                  <div>
                    <p className="font-bold text-sm tracking-tight">Roots &amp; Vectors 2.0</p>
                    <p className="text-white/70 text-[11px]">19th December, 2026</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs font-mono text-[11px] font-bold text-spring">
                    1,000+ Designers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Chowdeck-Style Interactive "What's on Deck?" Vertical Switcher */}
        <div className="mb-24 md:mb-32 p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h3 className="type-heading text-pine font-black">
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

        {/* 3. Vision & Mission Statement: Faithfully Adapted to PDF Page 04 & make the vision and mission section to be exartly like this.png */}
        <div id="vision-and-mission" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              Vision &amp; Mission.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              Anchoring regional creative talent with high-impact global ambition and indigenous cultural excellence.
            </p>
          </div>

          {/* Canvas Wrapper matching Page 04 */}
          <div className="rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-xl overflow-hidden relative">
            
            {/* Top Section: Vision Statement with Real Workshop Photo & 3D Torus Ring */}
            <div className="relative p-6 sm:p-10 md:p-14 overflow-hidden border-b border-neutral-border/40">
              {/* Real Background Photo with Pine/Emerald Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/pdf_extracted/vision_workshop_top.png"
                  alt="Northern Creative Designers Workshop"
                  fill
                  className="object-cover object-center opacity-35 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pine/90 via-pine/70 to-pine/50" />
              </div>

              {/* 3D Iridescent Coil Element on the Right */}
              <div className="hidden lg:block absolute -top-8 right-6 w-72 h-72 z-10 pointer-events-none transition-transform duration-700 hover:rotate-6 hover:scale-105">
                <Image
                  src="/images/pdf_extracted/vector_3d_torus.png"
                  alt="Vector 3D Art Element"
                  width={320}
                  height={320}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Tangerine Vision Card (Left Aligned) */}
              <div className="relative z-10 max-w-2xl">
                <div className="group p-8 sm:p-10 md:p-12 rounded-[2rem] bg-[#F39200] text-white shadow-2xl hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out">
                  <div className="flex items-start gap-4 mb-5">
                    <ArrowDownRight className="w-9 h-9 sm:w-11 sm:h-11 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                    <div>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                        Vision
                      </h4>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Statement
                      </h4>
                    </div>
                  </div>

                  <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed pl-1">
                    To establish Northern Nigeria as a globally competitive hub of creative talent, where rich cultural heritage and modern design innovation power sustainable economic growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Mission Statement with Real Workshop Photo & 3D Metallic Hook */}
            <div className="relative p-6 sm:p-10 md:p-14 overflow-hidden">
              {/* Real Background Photo with Pine/Emerald Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/pdf_extracted/mission_workshop_bottom.png"
                  alt="Northern Creative Designers Masterclass Space"
                  fill
                  className="object-cover object-center opacity-40 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-pine/90 via-pine/70 to-pine/50" />
              </div>

              {/* 3D Vector Metallic Element on the Bottom Right */}
              <div className="hidden lg:block absolute -bottom-10 right-4 w-60 h-60 z-10 pointer-events-none transition-transform duration-700 hover:-rotate-6 hover:scale-105">
                <Image
                  src="/images/pdf_extracted/vector_3d_hook.png"
                  alt="Vector 3D Graphic"
                  width={260}
                  height={260}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Deep Indigo/Purple Mission Card (Right Aligned) */}
              <div className="relative z-10 max-w-2xl ml-auto">
                <div className="group p-8 sm:p-10 md:p-12 rounded-[2rem] bg-[#453478] text-white shadow-2xl hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out">
                  <div className="flex items-start gap-4 mb-5">
                    <ArrowDownRight className="w-9 h-9 sm:w-11 sm:h-11 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                    <div>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                        Mission
                      </h4>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Statement
                      </h4>
                    </div>
                  </div>

                  <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed pl-1">
                    To empower Northern designers, strategists, and creators through immersive learning, hands-on collaboration, and direct business connections — bridging indigenous storytelling with cutting-edge tools to elevate local craft into high-value global impact.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Core Objectives: Faithfully Adapted to core objectives.png (PDF Page 05) */}
        <div id="core-objectives" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              Core Objectives.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              Four strategic pillars driving every masterclass, panel discussion, live sprint, and exhibition at Summit 2.0.
            </p>
          </div>

          {/* Halftone / Dotted Background Container matching core objectives.png */}
          <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm">
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  id: "skill-excellence",
                  title: "Cultivate Skill Excellence:",
                  description:
                    "Deliver practical, specialized master classes and live build sprints that equip designers with industry-standard technical and strategic capabilities.",
                  bgClass: "bg-[#F39200]",
                  pillarNumber: "01",
                },
                {
                  id: "culture-modernity",
                  title: "Bridge Culture & Modernity:",
                  description:
                    "Preserve and celebrate Northern visual identity by integrating traditional motifs into modern digital products, branding, and media.",
                  bgClass: "bg-[#00CC67]",
                  pillarNumber: "02",
                },
                {
                  id: "sustainable-monetization",
                  title: "Drive Sustainable Monetization:",
                  description:
                    "Teach sustainable pricing, proposal writing, and client negotiation, directly connecting regional creatives with paying business opportunities.",
                  bgClass: "bg-[#453478]",
                  pillarNumber: "03",
                },
                {
                  id: "community-recognition",
                  title: "Foster Community & Recognition:",
                  description:
                    "Build a supportive network across Arewa through collaborative Hackathon, public exhibitions, and awards that spotlight regional talent.",
                  bgClass: "bg-[#013811]",
                  pillarNumber: "04",
                },
              ].map((obj) => (
                <div
                  key={obj.id}
                  className={`
                    group p-8 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.25rem] ${obj.bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                    transition-all duration-300 ease-out cursor-default relative overflow-hidden
                  `}
                >
                  {/* Subtle inner ambient glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4 mb-4 sm:mb-5">
                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                        <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                          {obj.title}
                        </h4>
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/15 text-white/90 border border-white/20 flex-shrink-0">
                        Pillar {obj.pillarNumber}
                      </span>
                    </div>

                    <p className="text-white/95 text-base sm:text-xl md:text-2xl font-normal leading-relaxed pl-1 sm:pl-2">
                      {obj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. What to Expect: Faithfully Adapted to Reference Brand Design (PDF Page 06) */}
        <div id="what-to-expect" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              What to Expect.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              An action-oriented environment engineered for deep collaboration, skill mastery, and career acceleration.
            </p>
          </div>

          {/* Halftone / Dotted Background Canvas matching Core Objectives */}
          <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  id: "learning",
                  title: "Core Practical Learning:",
                  description:
                    "Gain industry-defining insights through a high-impact keynote on Northern design history, candid panel sessions tackling pricing models, AI integration, and global market positioning.",
                  bgClass: "bg-[#F39200]",
                  badge: "Keynote & Panels",
                },
                {
                  id: "hackathon",
                  title: "Live Design Hackathon:",
                  description:
                    "Experience the final stage of the live sprint, featuring real-time project builds, expert critiquing, and transparent interactive audience voting.",
                  bgClass: "bg-[#00CC67]",
                  badge: "2-Hour Sprint",
                },
                {
                  id: "business",
                  title: "Business & Client Connections:",
                  description:
                    "Bridge the gap between talent and opportunity at the Client Connect Corner, participate in dedicated proposal & pricing workshops, and explore tool discounts at the Summit Marketplace.",
                  bgClass: "bg-[#453478]",
                  badge: "Dealmaking Booths",
                },
                {
                  id: "community",
                  title: "Community & Recognition:",
                  description:
                    "Celebrate the finest creative achievements across the region through our curated Design Exhibition Wall and the Summit 2.0 Awards Ceremony, wrapping up with an authentic networking evening.",
                  bgClass: "bg-[#013811]",
                  badge: "Exhibition & Awards",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`
                    group p-8 sm:p-10 rounded-[2rem] ${item.bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                    transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
                  `}
                >
                  {/* Subtle inner ambient glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <ArrowDownRight className="w-8 h-8 sm:w-9 sm:h-9 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-white/95 text-sm sm:text-base md:text-lg font-normal leading-relaxed pl-1 sm:pl-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/80">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-white opacity-90" />
                      <span>{item.badge}</span>
                    </span>
                    <span className="font-bold opacity-75">Kano 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
