"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden bg-[#FAFAF8] border-b border-neutral-border/60 pt-16 pb-20 md:pt-24 md:pb-32">
      {/* FULL HERO SECTION BACKGROUND COMPOSITION */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {/* Layer 1: Creative Community in Motion (Panoramic Full-Bleed Action Texture) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/creative-community-in-motion.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-35 mix-blend-multiply"
            priority
          />
        </div>

        {/* Layer 2: Innovative Northern Nigerian Tech Collective (Silhouette Layer) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/innovative-tech-collective.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-30 drop-shadow-sm"
            priority
          />
        </div>

        {/* Layer 3: Editorial Radial & Linear Scrim (Preserves WCAG AAA Typography Legibility) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_35%,rgba(250,250,248,0.94)_0%,rgba(250,250,248,0.72)_65%,rgba(250,250,248,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/90 via-transparent to-[#FAFAF8]" />

        {/* Layer 4: Brand Ambient Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(3,208,107,0.12),rgba(255,255,255,0))]" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-tangerine/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-spring/[0.05] rounded-full blur-3xl" />

        {/* Layer 5: Authentic Arewa Geometric Watermarks */}
        <div className="absolute -top-12 -right-12 w-80 h-96 opacity-[0.035] blur-[0.5px]">
          <Image
            src="/images/pdf_extracted/arewa_motif_pattern.png"
            alt=""
            width={736}
            height={845}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <div className="absolute -bottom-16 -left-16 w-80 h-96 opacity-[0.03] -scale-x-100 blur-[0.5px]">
          <Image
            src="/images/pdf_extracted/arewa_motif_pattern.png"
            alt=""
            width={736}
            height={845}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center relative z-10">
        {/* Buttery Smooth Display Typography */}
        <div className="space-y-3 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-pine tracking-[-0.025em] leading-[1.04]">
            Roots &amp; Vectors
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-tangerine tracking-[-0.015em] leading-snug">
            Shaping the Future of Arewa Design.
          </p>
        </div>

        {/* Relaxed, Effortless Editorial Body Text */}
        <p className="mt-7 text-base sm:text-lg md:text-xl text-navy/75 max-w-3xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital craft, artificial intelligence, and sustainable commercial pathways.
        </p>

        {/* Clean, Tactile Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-spring text-navy text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_14px_rgba(3,208,107,0.25)] hover:bg-[#02b25b] hover:shadow-[0_6px_20px_rgba(3,208,107,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            <span>Register to Attend</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/NCD Summit 26.pdf"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white border border-pine/30 text-pine text-xs sm:text-sm font-bold tracking-wider uppercase hover:border-pine hover:bg-pine/5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine"
          >
            <span>View Brochure (PDF)</span>
          </Link>
        </div>

        {/* Smooth Glass-Style Metric Cards with Gentle Hover Elevation */}
        <div className="mt-16 pt-10 border-t border-neutral-border/60 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full text-left">
          {/* Metric 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-border/80 shadow-[0_2px_8px_rgba(1,56,17,0.03)] hover:-translate-y-1 hover:shadow-md hover:border-spring/40 transition-all duration-300">
            <span className="text-[11px] font-bold text-pine/60 uppercase tracking-wider block mb-1">
              Flagship Edition
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-cabinet tracking-tight">
              2.0
            </p>
            <p className="text-xs text-navy/70 mt-1.5 font-medium">
              Roots &amp; Vectors
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-border/80 shadow-[0_2px_8px_rgba(1,56,17,0.03)] hover:-translate-y-1 hover:shadow-md hover:border-spring/40 transition-all duration-300">
            <span className="text-[11px] font-bold text-spring uppercase tracking-wider block mb-1">
              Hackathon Pool
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-spring font-cabinet tracking-tight">
              ₦1.5M
            </p>
            <p className="text-xs text-navy/70 mt-1.5 font-medium">
              Prizes &amp; Hardware
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-border/80 shadow-[0_2px_8px_rgba(1,56,17,0.03)] hover:-translate-y-1 hover:shadow-md hover:border-spring/40 transition-all duration-300">
            <span className="text-[11px] font-bold text-tangerine uppercase tracking-wider block mb-1">
              Ecosystem
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-tangerine font-cabinet tracking-tight">
              1,000+
            </p>
            <p className="text-xs text-navy/70 mt-1.5 font-medium">
              Arewa Designers
            </p>
          </div>

          {/* Metric 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-border/80 shadow-[0_2px_8px_rgba(1,56,17,0.03)] hover:-translate-y-1 hover:shadow-md hover:border-spring/40 transition-all duration-300">
            <span className="text-[11px] font-bold text-pine/60 uppercase tracking-wider block mb-1">
              Host City
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-cabinet tracking-tight">
              Kano
            </p>
            <p className="text-xs text-navy/70 mt-1.5 font-medium">
              19th Dec, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
