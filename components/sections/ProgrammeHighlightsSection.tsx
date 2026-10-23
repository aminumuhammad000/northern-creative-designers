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
  // 1. Business & Career (Midnight Navy)
  {
    id: "business-career",
    category: "Business & Career",
    headline: "Client Connect Corner",
    details:
      "Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers.",
    bgClass: "bg-[#071135]",
    colPosition: "left",
    dogEarCorner: "bottom-left",
    tapeRotation: "-rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_3.png",
    highlights: [
      "Private 1-on-1 dealmaking booths with verified founders",
      "Portfolio reviews with senior creative directors",
      "Direct talent-founder business mandates & contracts",
    ],
    ctaLabel: "Connect With Founders",
    ctaHref: "/programme",
  },

  // 2. Community & Vibe (Deep Pine Green)
  {
    id: "community-vibe",
    category: "Community & Vibe",
    headline: "Design Exhibition Wall",
    details:
      "Physical exhibition gallery showcasing premier Arewa graphic identity, typography, and community showcases.",
    bgClass: "bg-[#013811]",
    colPosition: "right",
    dogEarCorner: "bottom-right",
    tapeRotation: "rotate-2",
    tapeImage: "/images/pdf_extracted/tape_card_4.png",
    highlights: [
      "Physical Gallery Wall: Curated visual works from across Arewa",
      "Public voting on community showcases",
      "Authentic evening networking reception & mixer",
    ],
    ctaLabel: "Gallery Details",
    ctaHref: "/programme",
  },

  // 3. Award Presentation Categories (Tangerine)
  {
    id: "award-presentation",
    category: "Recognition & Honors",
    headline: "Award Categories",
    details:
      "Summit 2.0 trophy honors celebrating exceptional craftsmanship across brand identity, digital product, and cultural design.",
    bgClass: "bg-[#F39200]",
    colPosition: "right",
    dogEarCorner: "bottom-right",
    tapeRotation: "-rotate-2",
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
      className="w-full py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
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

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/programme"
              variant="outline"
              size="md"
              className="hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Full Schedule
            </Button>
            <Button
              href="/register"
              variant="secondary"
              size="md"
              className="hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Get Delegate Pass
            </Button>
          </div>
        </div>

        {/* Outer Canvas Container matching program feature section.png */}
        <div className="w-full rounded-[2.5rem] bg-[#F8FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-2xl overflow-hidden relative">
          
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

          {/* Big Kano Landmark in Background at Bottom-Left Corner */}
          <div className="absolute -bottom-10 -left-10 w-[380px] sm:w-[560px] md:w-[700px] lg:w-[840px] xl:w-[920px] aspect-[1625/1401] pointer-events-none select-none z-0">
            <Image
              src="/images/pdf_extracted/kano_bridge_landmark.png"
              alt="Iconic Kano City Flyover Landmark and I Love Kano Monument"
              fill
              className="object-contain object-bottom-left grayscale contrast-125 opacity-35 sm:opacity-40 lg:opacity-45 mix-blend-multiply"
              priority
            />
          </div>

          {/* 3D Vector Metallic Graphic in Bottom-Left Background */}
          <div className="hidden lg:block absolute bottom-8 left-8 w-32 h-32 lg:w-40 lg:h-40 z-0 pointer-events-none transition-transform duration-700 hover:-rotate-6 hover:scale-105 opacity-50">
            <Image
              src="/images/pdf_extracted/vector_3d_hook.png"
              alt="Vector 3D Graphic"
              width={160}
              height={160}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          {/* Main Grid: 3 Sticky Cards in Foreground */}
          <div className="px-6 sm:px-12 md:px-16 pb-16 relative z-10">
            {/* Previous vs Upcoming Programme Evolution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
              
              {/* Previous Edition: Summit 1.0 */}
              <div className="rounded-3xl overflow-hidden border border-neutral-border bg-white shadow-md flex flex-col group">
                <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                  <Image
                    src="/images/community/ncd_tutor_presenting.jpg"
                    alt="Summit 1.0 Technical Masterclasses"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    Previous: Summit 1.0
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-black text-base sm:text-lg leading-snug">
                      Hands-On Masterlabs &amp; Bootcamps
                    </p>
                    <p className="text-white/75 text-xs font-mono">
                      225+ Certified Practitioners Trained
                    </p>
                  </div>
                </div>
                <div className="p-5 text-xs sm:text-sm text-navy/75 leading-relaxed bg-white">
                  Intensive physical masterclasses covering Brand Identity systems, The Design Code, and UI/UX product frameworks in Kano.
                </div>
              </div>

              {/* Upcoming Edition: Summit 2.0 */}
              <div className="rounded-3xl overflow-hidden border-2 border-spring bg-pine text-white shadow-xl flex flex-col group relative">
                <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                  <Image
                    src="/images/community/ncd_hall_audience.jpg"
                    alt="Summit 2.0 Roots & Vectors"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-pine/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-spring text-navy text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    Upcoming: Summit 2.0 (19 Dec 2026)
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-black text-base sm:text-lg leading-snug text-white">
                      Roots &amp; Vectors: 1,000+ Creators
                    </p>
                    <p className="text-spring text-xs font-mono font-bold">
                      Kano, Northern Nigeria
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-pine text-xs sm:text-sm text-white/80 leading-relaxed flex flex-col justify-between flex-1 gap-4">
                  <p>
                    Expanded annual gathering featuring Client Connect Corner, curated physical Design Exhibition Wall, 3 keynote stages, and live Hackathon.
                  </p>
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                    <Link
                      href="/programme"
                      className="text-xs font-mono font-bold uppercase tracking-wider text-spring hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Explore Full 2026 Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* 3 Staggered Taped Sticky Cards in 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
              {programCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveCard(card)}
                  className={`
                    group relative p-6 sm:p-8 ${card.bgClass} text-white shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    transition-all duration-300 ease-out cursor-pointer
                    rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[2.5rem]
                    ${activeCard.id === card.id ? "ring-4 ring-spring/50 scale-[1.02]" : ""}
                  `}
                >
                  {/* Brown Craft Tape on Top */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${card.tapeRotation} pointer-events-none rounded-xs`} />
                  
                  {/* Dog-ear fold corner indicator */}
                  <div className="absolute bottom-0 left-0 w-7 h-7 bg-black/25 rounded-tr-xl pointer-events-none" />

                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-2">
                    {card.headline}
                  </h4>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal">
                    {card.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Card Interactive Detail Callout */}
            <div className="mt-12 p-6 sm:p-8 rounded-[2rem] bg-white border border-neutral-border/80 shadow-xl max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-border/60">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl ${activeCard.bgClass} flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0`}>
                    ✦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-pine/80 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                        {activeCard.category}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-pine mt-1 tracking-tight">
                      {activeCard.headline}
                    </h4>
                  </div>
                </div>

                <Link
                  href={activeCard.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-sm w-fit flex-shrink-0"
                >
                  <span>{activeCard.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-spring" />
                </Link>
              </div>

              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeCard.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#FAFAF8] border border-neutral-border/60 flex items-start gap-3 hover:border-spring/50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-spring/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-pine/50 block mb-1">
                        Highlight 0{i + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-navy/85 leading-snug">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
