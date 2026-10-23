"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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

          {/* Two Authentic Taped Photos from our comitement in action.png */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 items-center">
            
            {/* Photo 1: Northern Design Hackathon 2025 */}
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
                <div className="aspect-[828/615] relative w-full overflow-hidden">
                  <Image
                    src="/images/pdf_extracted/commitment_photo_1.png"
                    alt="Northern Design Hackathon 2025 Live Presentation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div>
                      <p className="font-extrabold text-sm sm:text-base text-white">Northern Design Hackathon</p>
                      <p className="text-white/75 text-[11px] font-mono">2025 Regional Live Sprint</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-spring text-[#071135] font-black text-xs uppercase tracking-wider shadow-sm">
                      ₦100,000 Bounties
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 2: Summit 1.0 & Workshop Collaboration */}
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
                <div className="aspect-[828/597] relative w-full overflow-hidden">
                  <Image
                    src="/images/pdf_extracted/commitment_photo_2.png"
                    alt="Northern Creative Designers Summit 1.0 & Workshop"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div>
                      <p className="font-extrabold text-sm sm:text-base text-white">Summit 1.0 &amp; Masterclasses</p>
                      <p className="text-white/75 text-[11px] font-mono">Kano, Northern Nigeria</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[#F39200] text-white font-black text-xs uppercase tracking-wider shadow-sm">
                      Flagship Gathering
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Additional Track Record Cards from Manifesto Page 14 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            
            {/* Conferences & Flagship Events */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-spring/40 transition-colors space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-spring uppercase tracking-wider">
                  01 / Flagship Events
                </span>
                <span className="text-xs font-mono text-white/60">Kano, Nigeria</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Northern Creative Summit 1.0
              </h3>
              <p className="text-white/80 text-sm leading-relaxed font-normal">
                Hosted our flagship gathering bringing together creative leaders, agency principals, and practicing designers from across the 19 Northern states.
              </p>
            </div>

            {/* Bootcamps & Intensive Training */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-spring/40 transition-colors space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#F39200] uppercase tracking-wider">
                  02 / Hands-On Bootcamps
                </span>
                <span className="text-xs font-mono text-white/60">225+ Alumni</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Intensive Technical Masterclasses
              </h3>
              <div className="space-y-1.5 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                <p>• <strong className="text-white font-semibold">Brand Identity Masterlab:</strong> Physical bootcamp empowering 50 selected practitioners.</p>
                <p>• <strong className="text-white font-semibold">The Design Code Bootcamp:</strong> 3-day intensive program for 75 participants.</p>
                <p>• <strong className="text-white font-semibold">UI/UX Bootcamp:</strong> Trained 100 participants in digital product systems.</p>
              </div>
            </div>

          </div>

          {/* Virtual Knowledge Series & Webinars Cloud */}
          <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <h4 className="text-lg font-bold text-white tracking-tight">
                Virtual Knowledge Series &amp; Webinars
              </h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Continuous knowledge sessions addressing design leadership, pricing models, and AI tooling.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {webinars.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white hover:bg-spring hover:text-[#071135] transition-all cursor-default"
                >
                  <span>{item.title}</span>
                  <span className="opacity-70 font-normal ml-1.5">({item.focus})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
