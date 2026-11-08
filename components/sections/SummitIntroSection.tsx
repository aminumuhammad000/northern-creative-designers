"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Compass,
  TrendingUp,
  Users,
  Sparkles,
  Briefcase,
  Trophy,
  CheckCircle2,
  ArrowDownRight,
} from "lucide-react";
import {
  eventConfig,
  visionAndMission,
  coreObjectives,
  whatToExpect,
  whoShouldAttend,
} from "@/config/event";

export function SummitIntroSection() {
  const [activePillar, setActivePillar] = useState<string | null>("skill-excellence");

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
          </div>

          {/* Right Minimalist Visual Card with Real Northern Creative Designers Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden border border-neutral-border shadow-lg bg-neutral-card group">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative w-full overflow-hidden">
                <Image
                  src="/images/community/ncd_hall_audience.jpg"
                  alt="Northern Creative Designers Summit Community"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-transparent to-black/20" />

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

        {/* 2. Vision & Mission Statement: Faithfully Adapted to mission & vision.png */}
        <div id="vision-and-mission" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-8 sm:mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              Vision &amp; Mission.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              Anchoring regional creative talent with high-impact global ambition and indigenous cultural excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            {/* Tangerine / Orange Vision Card */}
            <div className="md:col-span-5 group p-7 sm:p-9 md:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-[#F39100] text-white shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ease-out cursor-default flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 mt-0.5 sm:mt-1" />
                  <div>
                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                      Vision
                    </h4>
                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      Statement
                    </h4>
                  </div>
                </div>

                <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                  To establish Northern Nigeria as a globally competitive hub of creative talent, where rich cultural heritage and modern design innovation power sustainable economic growth.
                </p>
              </div>
            </div>

            {/* Deep Indigo / Purple Mission Card */}
            <div className="md:col-span-7 group p-7 sm:p-9 md:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-[#473777] text-white shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ease-out cursor-default flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 mt-0.5 sm:mt-1" />
                  <div>
                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                      Mission
                    </h4>
                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      Statement
                    </h4>
                  </div>
                </div>

                <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                  To empower Northern designers, strategists, and creators through immersive learning, hands-on collaboration, and direct business connections — bridging indigenous storytelling with cutting-edge tools to elevate local craft into high-value global impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Core Objectives: Faithfully Adapted to objectives.png */}
        <div id="core-objectives" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-8 sm:mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              Core Objectives.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              Four strategic pillars driving every masterclass, panel discussion, live sprint, and exhibition at Summit 2.0.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                id: "skill-excellence",
                title: "Cultivate Skill Excellence:",
                description:
                  "Deliver practical, specialized master classes and live build sprints that equip designers with industry-standard technical and strategic capabilities.",
                bgClass: "bg-[#F39100]",
                pillarNumber: "01",
              },
              {
                id: "culture-modernity",
                title: "Bridge Culture & Modernity:",
                description:
                  "Preserve and celebrate Northern visual identity by integrating traditional motifs into modern digital products, branding, and media.",
                bgClass: "bg-[#00CB67]",
                pillarNumber: "02",
              },
              {
                id: "sustainable-monetization",
                title: "Drive Sustainable Monetization:",
                description:
                  "Teach sustainable pricing, proposal writing, and client negotiation, directly connecting regional creatives with paying business opportunities.",
                bgClass: "bg-[#473777]",
                pillarNumber: "03",
              },
              {
                id: "community-recognition",
                title: "Foster Community & Recognition:",
                description:
                  "Build a supportive network across Arewa through collaborative Hackathon, public exhibitions, and awards that spotlight regional talent.",
                bgClass: "bg-[#063B18]",
                pillarNumber: "04",
              },
            ].map((obj) => {
              const isOpen = activePillar === obj.id;
              return (
                <div
                  key={obj.id}
                  onClick={() => setActivePillar(isOpen ? null : obj.id)}
                  className={`
                    w-full ${obj.bgClass} text-white shadow-lg hover:shadow-xl
                    transition-all duration-300 ease-out cursor-pointer overflow-hidden
                    ${
                      isOpen
                        ? "p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.25rem]"
                        : "py-4 sm:py-5 px-6 sm:px-8 md:px-10 rounded-full hover:scale-[1.005] active:scale-[0.995]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <ArrowDownRight className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0 stroke-[2.5]" />
                      <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight truncate sm:whitespace-normal">
                        {obj.title}
                      </h4>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/20 text-white border border-white/25 flex-shrink-0">
                      PILLAR {obj.pillarNumber}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mt-4 sm:mt-5 pt-1">
                      <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed pl-1 sm:pl-2">
                        {obj.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. What to Expect: Faithfully Adapted to Reference Brand Design (PDF Page 06) */}
        <div id="what-to-expect" className="mb-24 md:mb-32">
          <div className="max-w-3xl mb-8 sm:mb-12 space-y-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-pine tracking-tight leading-tight">
              What to Expect.
            </h3>
            <p className="type-body text-navy/70 text-base sm:text-lg leading-relaxed font-normal">
              An action-oriented environment engineered for deep collaboration, skill mastery, and career acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                id: "learning",
                title: "Core Practical Learning:",
                description:
                  "Gain industry-defining insights through a high-impact keynote on Northern design history, candid panel sessions tackling pricing models, AI integration, and global market positioning.",
                bgClass: "bg-[#F39100]",
                badge: "Keynote & Panels",
              },
              {
                id: "hackathon",
                title: "Live Design Hackathon:",
                description:
                  "Experience the final stage of the live sprint, featuring real-time project builds, expert critiquing, and transparent interactive audience voting.",
                bgClass: "bg-[#00CB67]",
                badge: "2-Hour Sprint",
              },
              {
                id: "business",
                title: "Business & Client Connections:",
                description:
                  "Bridge the gap between talent and opportunity at the Client Connect Corner, participate in dedicated proposal & pricing workshops, and explore tool discounts at the Summit Marketplace.",
                bgClass: "bg-[#473777]",
                badge: "Dealmaking Booths",
              },
              {
                id: "community",
                title: "Community & Recognition:",
                description:
                  "Celebrate the finest creative achievements across the region through our curated Design Exhibition Wall and the Summit 2.0 Awards Ceremony, wrapping up with an authentic networking evening.",
                bgClass: "bg-[#063B18]",
                badge: "Exhibition & Awards",
              },
            ].map((item) => (
              <div
                key={item.id}
                className={`
                  group p-7 sm:p-9 md:p-10 rounded-[2rem] sm:rounded-[2.25rem] ${item.bgClass} text-white shadow-xl
                  hover:-translate-y-1.5 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
                `}
              >
                {/* Subtle inner ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <ArrowDownRight className="w-8 h-8 sm:w-9 sm:h-9 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-white text-sm sm:text-base md:text-lg font-normal leading-relaxed pl-1 sm:pl-2">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-white opacity-90" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="font-bold opacity-80">Kano 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
