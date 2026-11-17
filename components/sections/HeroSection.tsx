"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden bg-[#FAFAF8] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-20">
      {/* Subtle ambient lighting & Arewa watermark motifs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {/* Soft mint radial light behind top/illustration */}
        <div className="absolute top-0 right-0 lg:right-10 w-[700px] h-[550px] bg-[radial-gradient(ellipse_60%_50%_at_60%_30%,rgba(3,208,107,0.12),rgba(250,250,248,0))] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-tangerine/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Authentic Arewa Geometric Watermark */}
        <div className="absolute -top-10 -right-10 w-72 h-84 opacity-[0.03] blur-[0.5px]">
          <Image
            src="/images/pdf_extracted/arewa_motif_pattern.png"
            alt=""
            width={736}
            height={845}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Two-Column Grid: Left (Typography & CTAs), Right (Creative Illustration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Bold Display Typography & Pill Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 text-left space-y-5 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-bold text-pine tracking-[-0.03em] leading-[1.03] font-cabinet">
                Roots &amp; Vectors
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-[2.65rem] font-bold text-[#FF5C00] tracking-[-0.02em] leading-snug">
                Shaping the Future of Arewa Design.
              </p>
            </div>

            <p className="text-base sm:text-lg md:text-[1.125rem] text-navy/80 max-w-xl leading-relaxed font-normal">
              The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital craft, artificial intelligence, and sustainable commercial pathways.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#03D06B] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(3,208,107,0.35)] hover:bg-[#02b25b] hover:shadow-[0_6px_22px_rgba(3,208,107,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03D06B]"
              >
                <span>Register to Attend</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/NCD Summit 26.pdf"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#6C5CE7] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(108,92,231,0.30)] hover:bg-[#5a4ad1] hover:shadow-[0_6px_22px_rgba(108,92,231,0.40)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7]"
              >
                <span>View Brochure (PDF)</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Clarity Creative Community Illustration */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-end relative pt-4 lg:pt-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none">
              <Image
                src="/images/hero/hero-design-illustration.png"
                alt="Northern Creative Designers Summit Collective"
                width={636}
                height={690}
                priority
                className="w-full h-auto object-contain object-bottom drop-shadow-sm select-none"
              />
            </div>
          </div>
        </div>

        {/* 4 Clean Rounded White Metric Cards (Seamlessly positioned across the bottom) */}
        <div className="mt-10 sm:mt-12 lg:-mt-10 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full text-left">
          {/* Card 1: Flagship Edition */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              Flagship Edition
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-cabinet tracking-tight">
              2.0
            </p>
            <p className="text-xs text-neutral-500 mt-1.5 font-medium">
              Roots &amp; Vectors
            </p>
          </div>

          {/* Card 2: Hackathon Pool */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-[#03D06B] uppercase tracking-wider block mb-1">
              Hackathon Pool
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#03D06B] font-cabinet tracking-tight">
              ₦1.5M
            </p>
            <p className="text-xs text-neutral-500 mt-1.5 font-medium">
              Prizes &amp; Hardware
            </p>
          </div>

          {/* Card 3: Ecosystem */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-[#FF5C00] uppercase tracking-wider block mb-1">
              Ecosystem
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#FF5C00] font-cabinet tracking-tight">
              1,000+
            </p>
            <p className="text-xs text-neutral-500 mt-1.5 font-medium">
              Arewa Designers
            </p>
          </div>

          {/* Card 4: Host City */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              Host City
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-cabinet tracking-tight">
              Kano
            </p>
            <p className="text-xs text-neutral-500 mt-1.5 font-medium">
              19th Dec, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
