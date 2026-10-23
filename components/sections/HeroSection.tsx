"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Trophy, Calendar, MapPin, Users } from "lucide-react";
import { eventConfig } from "@/config/event";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] border-b border-neutral-border pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Authentic Arewa Geometric Watermarks floating in corners */}
      <div className="absolute -top-10 -right-10 w-80 h-96 opacity-[0.06] pointer-events-none select-none">
        <Image
          src="/images/pdf_extracted/arewa_motif_pattern.png"
          alt=""
          width={736}
          height={845}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="absolute -bottom-16 -left-16 w-80 h-96 opacity-[0.05] pointer-events-none select-none -scale-x-100">
        <Image
          src="/images/pdf_extracted/arewa_motif_pattern.png"
          alt=""
          width={736}
          height={845}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Floating Sticker Badges (Chowdeck Style) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {/* Badge 1: Official Summit Pill with Pulse */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-border text-xs font-bold text-pine shadow-sm hover:scale-105 transition-transform cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-spring animate-pulse" />
            <span className="uppercase tracking-wider">Summit 2.0 Active</span>
            <span className="text-neutral-border">•</span>
            <span className="text-navy/60 font-mono text-[11px]">{eventConfig.rcNumber}</span>
          </div>

          {/* Badge 2: Floating Date Pill (Tilted -2deg) */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-spring text-navy text-xs font-extrabold uppercase tracking-wider shadow-sm -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Calendar className="w-3.5 h-3.5" />
            <span>19th Dec 2026 • Kano</span>
          </div>

          {/* Badge 3: Floating Prize Pill (Tilted +2deg) */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-tangerine text-navy text-xs font-extrabold uppercase tracking-wider shadow-sm rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Trophy className="w-3.5 h-3.5" />
            <span>₦1.5M Prize Pool</span>
          </div>
        </div>

        {/* Chowdeck-Style Giant, Confident Display Headline */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <h1 className="type-hero-display text-pine tracking-tight">
            ROOTS &amp; VECTORS
          </h1>
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-tangerine tracking-tight leading-tight">
            Shaping the Future of Arewa Design.
          </p>
        </div>

        {/* Crisp, Smooth Body Typography */}
        <p className="mt-8 text-base sm:text-xl md:text-2xl text-navy/80 max-w-3xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital innovation, artificial intelligence, and global market positioning.
        </p>

        {/* Chowdeck-Style Chunky Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-spring text-navy text-sm font-extrabold tracking-wider uppercase shadow-md hover:bg-[#02b25b] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            <span>Register to Attend</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/NCD Summit 26.pdf"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border-2 border-pine text-pine text-sm font-extrabold tracking-wider uppercase hover:bg-pine hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine"
          >
            <span>View PDF Brochure</span>
          </Link>
        </div>

        {/* Chowdeck-Inspired Big Metric Cards with Hover Motion */}
        <div className="mt-16 pt-12 border-t border-neutral-border/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto text-left">
          {/* Card 1 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-border hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-pine/60 uppercase tracking-wider block mb-1">
              Confirmed Edition
            </span>
            <p className="text-4xl sm:text-5xl font-black text-pine font-cabinet tracking-tight">
              2.0
            </p>
            <p className="text-xs text-navy/70 mt-2 font-medium">
              Roots &amp; Vectors Theme
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-border hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-spring uppercase tracking-wider block mb-1">
              Hackathon Prizes
            </span>
            <p className="text-4xl sm:text-5xl font-black text-spring font-cabinet tracking-tight">
              ₦1.5M
            </p>
            <p className="text-xs text-navy/70 mt-2 font-medium">
              Hardware &amp; Cash Awards
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-border hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-tangerine uppercase tracking-wider block mb-1">
              Community Scale
            </span>
            <p className="text-4xl sm:text-5xl font-black text-tangerine font-cabinet tracking-tight">
              1,000+
            </p>
            <p className="text-xs text-navy/70 mt-2 font-medium">
              Attendees Across Arewa
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-border hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-pine/60 uppercase tracking-wider block mb-1">
              Venue Location
            </span>
            <p className="text-3xl sm:text-4xl font-black text-pine font-cabinet tracking-tight mt-1">
              Kano
            </p>
            <p className="text-xs text-navy/70 mt-2 font-medium">
              Northern Nigeria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
