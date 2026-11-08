"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CommitmentSection() {
  return (
    <section
      id="past-editions"
      className="w-full py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Main Canvas Container: Deep Pine Green matching our comitement in action.png (PDF Page 13) */}
        <div className="w-full rounded-[2.5rem] bg-[#013811] text-white p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Arewa Pattern Watermark Overlay */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <Image
              src="/images/pdf_extracted/arewa_motif_pattern.png"
              alt="Arewa Motif Pattern"
              fill
              className="object-cover"
            />
          </div>

          {/* Section Header matching our comitement in action.png */}
          <div className="relative z-10 max-w-4xl mb-12 sm:mb-16 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Our Commitment <span className="text-spring">in Action.</span>
              </h2>
              
              <Link
                href="/past-editions"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-spring hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/15 w-fit"
              >
                <span>Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-sm sm:text-base font-bold text-[#F39200] tracking-wider uppercase block font-mono">
                ✦ Hackathons &amp; Competitions
              </span>
              <p className="text-white/90 text-base sm:text-xl font-normal leading-relaxed">
                <strong className="text-white font-semibold">Northern Design Hackathon (2025):</strong> Successfully organized a multi-round competition awarding ₦100,000 in cash prizes to top talent.
              </p>
            </div>
          </div>

          {/* Authentic Real Event Photos from Northern Creative Designers Community */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 mb-10 sm:mb-14 items-center">
            
            {/* Photo 1: Summit 1.0 Full Audience Hall */}
            <div className="group relative -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Real Brown Craft Tape on Top */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-44 h-12 pointer-events-none">
                <Image
                  src="/images/pdf_extracted/commitment_tape_1.png"
                  alt="Craft Tape"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40">
                <div className="aspect-[16/11] relative w-full overflow-hidden">
                  <Image
                    src="/images/community/ncd_hall_audience.jpg"
                    alt="Northern Creative Designers Summit 1.0 Live Gathering"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Photo 2: Official Banner Community Group */}
            <div className="group relative rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Real Brown Craft Tape on Top */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-44 h-12 pointer-events-none">
                <Image
                  src="/images/pdf_extracted/commitment_tape_2.png"
                  alt="Craft Tape"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40">
                <div className="aspect-[16/11] relative w-full overflow-hidden">
                  <Image
                    src="/images/community/ncd_banner_group.jpg"
                    alt="Northern Creative Designers Community Delegation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Real Bootcamp & Masterclass Visual Photographic Gallery */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Gallery Image 1: Class Training */}
            <div className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:border-spring/50 transition-all duration-300 shadow-lg aspect-[16/10] relative w-full">
              <Image
                src="/images/community/ncd_class_training.jpg"
                alt="Hands-On Technical Bootcamps"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery Image 2: Tutor Presenting */}
            <div className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:border-spring/50 transition-all duration-300 shadow-lg aspect-[16/10] relative w-full">
              <Image
                src="/images/community/ncd_tutor_presenting.jpg"
                alt="Tutor Presenting & Keynote Guidance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery Image 3: Peer Interaction */}
            <div className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:border-spring/50 transition-all duration-300 shadow-lg aspect-[16/10] relative w-full">
              <Image
                src="/images/community/ncd_peer_interaction.jpg"
                alt="Collaborative Peer Interaction"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery Image 4: Participants with Banner */}
            <div className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:border-spring/50 transition-all duration-300 shadow-lg aspect-[16/10] relative w-full">
              <Image
                src="/images/community/ncd_participants_banner.jpg"
                alt="Delegates & Community Members"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
