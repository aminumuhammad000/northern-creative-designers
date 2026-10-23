import React from "react";
import Link from "next/link";
import Image from "next/image";
import { eventConfig } from "@/config/event";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] border-b border-neutral-border/70 pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Authentic Arewa Geometric Motif Watermark from NCD Summit 26.pdf */}
      <div className="absolute -top-12 -right-12 w-72 h-80 opacity-[0.06] pointer-events-none select-none">
        <Image
          src="/images/pdf_extracted/arewa_motif_pattern.png"
          alt=""
          width={736}
          height={845}
          className="w-full h-full object-contain"
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Official Entity & Summit 2.0 Identifier Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-neutral-border text-xs font-medium text-pine shadow-[0_1px_3px_rgba(1,56,17,0.04)] mb-8">
          <span className="w-2 h-2 rounded-full bg-spring" />
          <span className="font-semibold tracking-wide">Northern Creative Designers</span>
          <span className="text-neutral-border">•</span>
          <span className="text-tangerine font-semibold">Summit 2.0</span>
          <span className="text-neutral-border">•</span>
          <span className="text-navy/60 font-mono text-[11px]">{eventConfig.rcNumber}</span>
        </div>

        {/* Confident Typographic Theme adapted from PDF */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-pine leading-[1.12]">
            Roots &amp; Vectors
          </h1>
          <p className="text-xl sm:text-3xl md:text-4xl font-semibold text-tangerine tracking-tight leading-snug">
            Shaping the Future of Arewa Design
          </p>
        </div>

        {/* Smooth, Legible Editorial Summary */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-navy/80 max-w-2xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, strategists, developers,
          and visual storytellers across Northern Nigeria. Moving beyond conventional
          talk shows to deliver deep learning, real-time collaboration, and actionable
          career pathways.
        </p>

        {/* Event Date & Location Pill Strip matching PDF Cover */}
        <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 rounded-full bg-pine text-white text-xs sm:text-sm font-medium shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-spring font-bold">Date:</span>
            <span>{eventConfig.date}</span>
          </div>
          <span className="text-white/30 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-tangerine font-bold">Venue:</span>
            <span>{eventConfig.venue}</span>
          </div>
          <span className="text-white/30 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 text-white/70">
            <span>{eventConfig.secretariat.handle}</span>
          </div>
        </div>

        {/* Minimalist Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-spring text-navy text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-[#02b25b] hover:shadow active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            Register to Attend
          </Link>

          <Link
            href="#about-summit"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-pine/30 text-pine text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 hover:bg-white hover:border-pine active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine"
          >
            Explore Brochure
          </Link>
        </div>

        {/* Verified Track Record Highlights Bar */}
        <div className="mt-16 pt-10 border-t border-neutral-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-pine">2.0</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-medium">Annual Summit</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-spring">₦100,000</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-medium">Hackathon Awarded</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-tangerine">225+</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-medium">Creatives Trained</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-pine">100%</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-medium">Practical Execution</p>
          </div>
        </div>
      </div>
    </section>
  );
}
