"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDownRight } from "lucide-react";

const speakerCategories = [
  {
    role: "HACKATHON JURY & MENTORS",
    topic: "Live 2-Hour Sprint Evaluation & Design Direction",
    description: "Veteran technologists, UI/UX researchers, and design founders critiquing live hackathon pitches in real time.",
    bgClass: "bg-[#473777]",
  },
  {
    role: "KEYNOTE SPEAKERS",
    topic: "Arewa Visual Evolution & Global Competitiveness",
    description: "Industry pioneers shaping indigenous design history, cultural vectors, and regional technology infrastructure.",
    bgClass: "bg-[#F39100]",
  },
  {
    role: "PANELISTS & STRATEGISTS",
    topic: "Commercial Pricing, Monetization & AI Workflows",
    description: "Leading creative directors, agency founders, and product design leaders from across Nigeria and the diaspora.",
    bgClass: "bg-[#00CB67]",
  },
];

export function SpeakersSection() {
  return (
    <section id="speakers" className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading matching curated shapes.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 lg:mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-[1.05]">
              Curated Voices<br />Shaping Arewa Design
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
              Our speaker lineup brings together indigenous design pioneers, modern product leaders, agency founders, and ecosystem architects. In accordance with Summit publishing standards, confirmed speaker profiles, biographies, and session times will be released following executive committee validation.
            </p>
          </div>
        </div>

        {/* 3 Chunky Speaker Category Cards directly on the page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {speakerCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`
                group p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] ${cat.bgClass} text-white shadow-xl
                hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
              `}
            >
              <div className="relative z-10">
                <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] mb-6 sm:mb-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                  {cat.role}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                  {cat.topic}
                </h3>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Width Pill Banner matching curated shapes.png */}
        <div className="px-6 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 rounded-[2rem] sm:rounded-full bg-[#063B18] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight text-center sm:text-left">
            Have an Industry-Defining Story to Share?
          </h3>

          <Link
            href="/contact?subject=Speaker+Proposal"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#00CB67] text-[#063B18] text-xs font-black tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
          >
            <span>APPLY FOR SPEAKER</span>
            <ArrowRight className="w-4 h-4 text-[#063B18]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
