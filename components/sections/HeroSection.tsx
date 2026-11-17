"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden bg-[#FAFAF8] pt-20 pb-24 md:pt-28 md:pb-36 border-b border-neutral-border/50">
      {/* Subtle brand ambient glow for soft depth without images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(3,208,107,0.08),rgba(250,250,248,0))]" />
      </div>

      {/* Centered Hero Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center relative z-10">
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-pine tracking-[-0.03em] leading-[1.03] font-cabinet">
            Roots &amp; Vectors
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#FF5C00] tracking-[-0.015em] leading-snug">
            Shaping the Future of Arewa Design.
          </p>
        </div>

        <p className="mt-6 sm:mt-7 text-base sm:text-lg md:text-xl text-navy/80 max-w-3xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital craft, artificial intelligence, and sustainable commercial pathways.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#03D06B] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(3,208,107,0.30)] hover:bg-[#02b25b] hover:shadow-[0_6px_22px_rgba(3,208,107,0.40)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03D06B]"
          >
            <span>Register to Attend</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/NCD Summit 26.pdf"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#6C5CE7] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(108,92,231,0.25)] hover:bg-[#5a4ad1] hover:shadow-[0_6px_22px_rgba(108,92,231,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7]"
          >
            <span>View Brochure (PDF)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
