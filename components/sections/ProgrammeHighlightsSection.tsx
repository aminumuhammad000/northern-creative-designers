"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProgrammeHighlightsSection() {
  return (
    <section
      id="programme-highlights"
      className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header matching Program Features & Structure.png */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 sm:mb-14 relative">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-[1.05]">
              Program Features<br />&amp; Structure.
            </h2>
          </div>

          {/* Floating 3D Coil Torus Element */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-6 w-32 h-32 xl:w-40 xl:h-40 pointer-events-none z-10 transition-transform duration-700 hover:rotate-6 hover:scale-105">
            <Image
              src="/images/pdf_extracted/vector_3d_torus.png"
              alt="Vector 3D Art Element"
              width={160}
              height={160}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <div className="max-w-md lg:text-left">
            <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
              Moving beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways.
            </p>
          </div>
        </div>

        {/* Outer Mint Canvas matching Program Features & Structure.png */}
        <div className="w-full rounded-[2.5rem] bg-[#F6FFF8] border border-neutral-border/70 p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
          
          {/* Row 1: Two Top Evolution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
            
            {/* Card 1: Previous Edition */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-border bg-white shadow-sm flex flex-col group">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/ncd_tutor_presenting.jpg"
                  alt="Hands-On Masterlabs & Bootcamps"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-2 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-navy tracking-tight leading-tight mb-1">
                    Hands-On Masterlabs &amp; Bootcamps
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00CB67] block mb-2">
                    225+ Certified Practitioners Trained
                  </span>
                  <p className="text-xs sm:text-sm text-navy/70 leading-relaxed font-normal">
                    Intensive physical masterclasses covering Brand Identity systems, The Design Code, and UI/UX product frameworks in Kano.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Upcoming Edition */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-border bg-white shadow-sm flex flex-col group">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/whole_participant.jpg"
                  alt="Root & Vector: 1,000 + Creators"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-2 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-navy tracking-tight leading-tight mb-1">
                    Root &amp; Vector: 1,000 + Creators
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00CB67] block mb-2">
                    225+ Certified Practitioners Trained
                  </span>
                  <p className="text-xs sm:text-sm text-navy/70 leading-relaxed font-normal">
                    Expanded annual gathering featuring Client Connect Corner, curated physical Design Exhibition Wall, 3 keynote stages, and live Hackathon.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Three Sticky Chunky Taped Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10 items-stretch">
            
            {/* Card 1: Client Connect Corner (Navy) */}
            <div className="group relative p-6 sm:p-8 bg-[#071135] text-white shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl sm:rounded-3xl rounded-bl-[2.5rem] flex flex-col justify-between">
              {/* Brown Kraft Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform -rotate-1 pointer-events-none rounded-xs" />
              {/* Dog-ear bottom left */}
              <div className="absolute bottom-0 left-0 w-7 h-7 bg-black/30 rounded-tr-xl pointer-events-none" />

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2 sm:mb-3">
                  Client Connect Corner
                </h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                  Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers.
                </p>
              </div>
            </div>

            {/* Card 2: Design Exhibition Wall (Deep Pine) */}
            <div className="group relative p-6 sm:p-8 bg-[#013811] text-white shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl sm:rounded-3xl flex flex-col justify-between">
              {/* Brown Kraft Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform rotate-1 pointer-events-none rounded-xs" />

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2 sm:mb-3">
                  Design Exhibition Wall
                </h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                  Physical exhibition gallery showcasing premier Arewa graphic identity, typography, and community showcases.
                </p>
              </div>
            </div>

            {/* Card 3: Award Categories (Tangerine) */}
            <div className="group relative p-6 sm:p-8 bg-[#F39100] text-white shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl sm:rounded-3xl rounded-bl-[2.5rem] flex flex-col justify-between">
              {/* Brown Kraft Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform -rotate-1 pointer-events-none rounded-xs" />
              {/* Dog-ear bottom left */}
              <div className="absolute bottom-0 left-0 w-7 h-7 bg-black/20 rounded-tr-xl pointer-events-none" />

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2 sm:mb-3">
                  Award Categories
                </h4>
                <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal">
                  Summit 2.0 trophy honors celebrating exceptional craftsmanship across brand identity, digital product, and cultural design.
                </p>
              </div>
            </div>

          </div>

          {/* Row 3: Bottom Full-Width Pill Banner */}
          <div className="px-6 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 rounded-[2rem] sm:rounded-full bg-[#013811] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight text-center sm:text-left">
              Joining our community
            </h3>

            <Link
              href="/contact?subject=Speaker+Proposal"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#00CB67] text-[#013811] text-xs font-black tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
            >
              <span>APPLY FOR SPEAKER</span>
              <ArrowRight className="w-4 h-4 text-[#013811]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
