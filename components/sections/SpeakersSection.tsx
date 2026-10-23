"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowDownRight,
  ShieldCheck,
} from "lucide-react";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

const speakerCategories = [
  {
    role: "Keynote Speakers",
    topic: "Arewa Visual Evolution & Global Competitiveness",
    description: "Industry pioneers shaping indigenous design history, cultural vectors, and regional technology infrastructure.",
    bgClass: "bg-[#F39200]",
  },
  {
    role: "Panelists & Strategists",
    topic: "Commercial Pricing, Monetization & AI Workflows",
    description: "Leading creative directors, agency founders, and product design leaders from across Nigeria and the diaspora.",
    bgClass: "bg-[#00CC67]",
  },
  {
    role: "Hackathon Jury & Mentors",
    topic: "Live 2-Hour Sprint Evaluation & Design Direction",
    description: "Veteran technologists, UI/UX researchers, and design founders critiquing live hackathon pitches in real time.",
    bgClass: "bg-[#453478]",
  },
];

export function SpeakersSection() {
  const { speakersAnnouncement } = landingPageContent;

  return (
    <section id="speakers" className="py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              {speakersAnnouncement.title}
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              {speakersAnnouncement.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/contact?subject=Speaker+Application"
              variant="primary"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Apply as Speaker
            </Button>
          </div>
        </div>

        {/* Halftone Canvas with 3 Chunky Speaker Category Cards */}
        <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {speakerCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`
                  group p-8 sm:p-10 rounded-[2rem] ${cat.bgClass} text-white shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
                `}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
                      Pillar 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                    {cat.role}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                    {cat.topic}
                  </h3>

                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="font-bold">Committee Review</span>
                  <span>Kano 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call for Speakers Banner matching Reference Design */}
        <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#013811] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Have an Industry-Defining Story to Share?
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">
              We welcome thought leaders, creative founders, and technical educators to submit keynote proposals, hands-on workshop briefs, or panel topics.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-spring flex-shrink-0" />
              <span>Independent Executive Review • 100% merit-based selection</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 relative z-10">
            <Link
              href="/contact?subject=Speaker+Proposal"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-spring text-[#071135] text-xs font-black tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <span>Submit Speaker Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#071135]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
