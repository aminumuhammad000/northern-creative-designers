"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Layers,
  ArrowRight,
  ArrowDownRight,
  CheckCircle2,
  Video,
  Sparkles,
} from "lucide-react";
import { commitmentTrackRecord, eventConfig } from "@/config/event";

export function CommitmentSection() {
  const webinars = [
    { title: "AI as a Design Partner", focus: "Generative Workflows" },
    { title: "The Creative Burnout", focus: "Sustainable Practice" },
    { title: "The Magnet Method", focus: "High-Paying Clients" },
    { title: "Designing Emotions", focus: "Visual Storytelling" },
  ];

  return (
    <section
      id="past-editions"
      className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Our Commitment in Action.
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Before Summit 2.0, Northern Creative Designers executed physical bootcamps, regional hackathons, and high-impact thought leadership series across Arewa.
            </p>
          </div>

          <Link
            href="/past-editions"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-pine hover:text-spring transition-colors pb-2"
          >
            <span>Historical Archive &amp; Media</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Chunky Saturated Track Record Cards matching Reference Design */}
        <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 1. Hackathons Card: Spring Green */}
            <div className="group p-8 sm:p-10 rounded-[2rem] bg-[#00CC67] text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
                    ₦100k Bounties
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                  Hackathons &amp; Competitions
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                  Northern Design Hackathon (2025)
                </h3>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  Organized a multi-round regional sprint awarding cash bounties and live mentorship to top Arewa design talents.
                </p>
              </div>

              <div className="relative z-10 pt-5 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="font-bold">Verified Competition</span>
                <span>2025 Edition</span>
              </div>
            </div>

            {/* 2. Flagship Summit: Tangerine */}
            <div className="group p-8 sm:p-10 rounded-[2rem] bg-[#F39200] text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
                    Inaugural
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                  Conferences &amp; Flagship
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                  Northern Creative Summit 1.0
                </h3>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  Convened over 400 creative practitioners, founders, and community leads across Northern Nigeria to establish the inaugural charter.
                </p>
              </div>

              <div className="relative z-10 pt-5 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="font-bold">Flagship Gathering</span>
                <span>Kano, Nigeria</span>
              </div>
            </div>

            {/* 3. Intensive Training: Deep Purple */}
            <div className="group p-8 sm:p-10 rounded-[2rem] bg-[#453478] text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
                    225+ Alumni
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                  Bootcamps &amp; Masterlabs
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                  Intensive Technical Masterclasses
                </h3>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  Delivered physical bootcamps including Brand Identity Masterlab (50 alumni), The Design Code (75 alumni), and UI/UX Bootcamp (100 alumni).
                </p>
              </div>

              <div className="relative z-10 pt-5 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="font-bold">Hands-On Sprints</span>
                <span>3 Programs</span>
              </div>
            </div>

          </div>
        </div>

        {/* Thought Leadership & Webinar Series Pill Cloud */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#013811] text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Virtual Knowledge Series &amp; Webinars
            </h4>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
              Continuous year-round knowledge sessions addressing design leadership, mental health, client monetization, and emerging artificial intelligence tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {webinars.map((item, idx) => (
              <div
                key={idx}
                className="px-5 py-3 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-bold text-white hover:bg-spring hover:text-[#071135] hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span>{item.title}</span>
                <span className="opacity-75 font-normal ml-2">({item.focus})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
