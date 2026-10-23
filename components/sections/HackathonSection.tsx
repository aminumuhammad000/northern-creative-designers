"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDownRight,
  CheckCircle2,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HackathonSection() {
  return (
    <section
      id="hackathon"
      className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Live Hackathon &amp; Audience Voting.
            </h2>
            <p className="text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Experience high-intensity real-time creative problem-solving. Finalists pitch live on stage, with judges and the registered audience voting in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/hackathon/register"
              variant="primary"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Enter Hackathon
            </Button>
            <Button
              href="/voting-rules"
              variant="outline"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Competition Rules
            </Button>
          </div>
        </div>

        {/* Minimalist Halftone Canvas with Real Workshop Photo & Curated Tracks */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side: Real Collaborative Tech Hackathon Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-pine/20 shadow-xl group">
                <Image
                  src="/images/community/Polished Modern Office Meeting Scene.png"
                  alt="Northern Creative Designers live design sprint collaboration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-pine/20 to-transparent" />

                {/* Floating Minimalist Prize Pool Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-navy flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-spring flex items-center justify-center text-navy">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-pine/70 uppercase tracking-wide">
                        Prize Pool
                      </p>
                      <p className="text-sm font-black text-pine">
                        ₦1,000,000+ Hardware &amp; Cash
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-tangerine bg-tangerine/10 px-2.5 py-1 rounded-full">
                    Live Sprint
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: 2 Minimalist Chunky Track Cards */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Track 01: Tangerine Card */}
              <div className="group p-6 sm:p-8 rounded-[2rem] bg-[#F39200] text-white shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <ArrowDownRight className="w-6 h-6 text-white stroke-[2.5]" />
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Arewa Cultural Identity &amp; Systems
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-white/20 text-white">
                    Track 01
                  </span>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-4">
                  Reimagining traditional Northern geometric motifs and calligraphy into scalable contemporary digital brand identities, typography, and packaging.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/95 font-medium">
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ Vector SVG Library</span>
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ Packaging Systems</span>
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ Brand Guidelines</span>
                </div>
              </div>

              {/* Track 02: Indigo/Purple Card */}
              <div className="group p-6 sm:p-8 rounded-[2rem] bg-[#453478] text-white shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <ArrowDownRight className="w-6 h-6 text-white stroke-[2.5]" />
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Digital Product, Civic Tech &amp; AI
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-white/20 text-white">
                    Track 02
                  </span>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-4">
                  Designing hyper-functional mobile interfaces, design systems, and generative AI motion assets solving real socio-economic challenges across Arewa.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/95 font-medium">
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ Figma Prototypes</span>
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ Civic UX Flows</span>
                  <span className="px-3 py-1 rounded-full bg-white/15">✦ 3D Motion Reel</span>
                </div>
              </div>

            </div>

          </div>

          {/* Minimalist 2-Step Live Execution Strip */}
          <div className="mt-8 pt-6 border-t border-neutral-border/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-navy/80">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-border shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-spring/20 flex items-center justify-center text-pine font-bold">
                1
              </div>
              <div>
                <p className="font-bold text-pine">2-Hour Live Sprint on Stage</p>
                <p className="text-xs text-navy/60">Prompt revealed live in Kano. Finalist teams build under constraints.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-border shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-tangerine/20 flex items-center justify-center text-tangerine font-bold">
                2
              </div>
              <div>
                <p className="font-bold text-pine">Real-Time Audience &amp; Jury Voting</p>
                <p className="text-xs text-navy/60">Registered attendees vote directly via badges to decide the People&apos;s Choice.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
