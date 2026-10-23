import React from "react";
import Link from "next/link";
import { eventConfig } from "@/config/event";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] border-b border-neutral-border/70 pt-20 pb-24 md:pt-28 md:pb-36">
      {/* Subtle, soft ambient glow without harsh gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-spring/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Minimalist Event Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-border text-[11px] font-semibold text-pine tracking-wider uppercase shadow-[0_1px_3px_rgba(1,56,17,0.04)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-spring" />
          <span>Northern Creative Designers</span>
          <span className="text-neutral-border">•</span>
          <span className="text-tangerine">Summit 2.0</span>
        </div>

        {/* Confident Typographic Statement */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-medium tracking-tight text-pine leading-[1.02]">
            Roots &amp; Vectors
          </h1>
          <p className="text-xl sm:text-3xl md:text-4xl font-medium text-tangerine tracking-tight">
            Shaping the Future of Arewa Design
          </p>
        </div>

        {/* Refined Description */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-navy/75 max-w-2xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, developers, and visual
          storytellers across Northern Nigeria. Bridging indigenous cultural heritage
          with modern digital craft, artificial intelligence, and sustainable enterprise.
        </p>

        {/* Event Date & Location Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-pine/90">
          <span className="font-semibold text-pine">{eventConfig.date}</span>
          <span className="text-neutral-border">•</span>
          <span>{eventConfig.venue}</span>
          <span className="text-neutral-border">•</span>
          <span className="text-navy/55">RC: {siteConfig.organization.rcNumber}</span>
        </div>

        {/* Minimalist Action Buttons (Clean, smooth, no icons) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-spring text-navy text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-[#02b25b] hover:shadow-sm active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            Register to Attend
          </Link>

          <Link
            href="#programme-highlights"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-pine/30 text-pine text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 hover:bg-white hover:border-pine active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine"
          >
            Explore Programme
          </Link>
        </div>
      </div>
    </section>
  );
}
