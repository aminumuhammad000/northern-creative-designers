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

        {/* Halftone Canvas with Previous & Upcoming Hackathon Showcases + Curated Tracks */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Side: Previous & Upcoming Hackathon Visual Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Previous Edition (2025 Sprint) */}
              <div className="rounded-[2rem] overflow-hidden border border-pine/20 shadow-lg bg-white group flex flex-col">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                  <Image
                    src="/images/community/ncd_class_training.jpg"
                    alt="Northern Design Hackathon 2025 Sprint"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-mono font-black uppercase tracking-wider">
                    Previous: 2025 Edition
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-black text-sm sm:text-base leading-snug">
                      Northern Design Hackathon 1.0
                    </p>
                    <p className="text-white/75 text-xs font-mono">
                      ₦100,000 Cash Prizes Awarded
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white text-xs text-navy/75 leading-relaxed">
                  Finalist teams tackled cultural identity design and civic user flows live in Kano, pioneering rapid prototyping across the region.
                </div>
              </div>

              {/* Card 2: Upcoming Edition (Summit 2.0 Live Hackathon) */}
              <div className="rounded-[2rem] overflow-hidden border-2 border-spring shadow-xl bg-pine text-white group flex flex-col relative">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                  <Image
                    src="/images/community/ncd_peer_interaction.jpg"
                    alt="Summit 2.0 Live Hackathon"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-pine/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-spring text-[#071135] text-[10px] font-mono font-black uppercase tracking-wider shadow-sm">
                    Upcoming: 19 Dec 2026
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-black text-base sm:text-lg leading-tight text-white">
                      Summit 2.0 Stage Sprint
                    </p>
                    <p className="text-spring text-xs font-mono font-bold">
                      ₦1,000,000+ Hardware &amp; Cash Bounties
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-pine space-y-3">
                  <p className="text-xs text-white/80 leading-relaxed">
                    120-minute live stage execution. Teams of 2–4 build under constraints with real-time jury evaluation and audience voting.
                  </p>

                  <div className="pt-2 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href="/hackathon/register"
                      className="w-full inline-flex items-center justify-center py-3 px-5 rounded-full bg-spring text-navy text-xs font-black uppercase tracking-wider hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <span>Register for Hackathon</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: 2 Minimalist Chunky Track Cards + Registration Callout */}
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

              {/* Detailed Registration Callout */}
              <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-neutral-border shadow-md space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pine/70 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      Team &amp; Solo Entries Open
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-pine mt-1">
                      Ready to Compete on the Main Stage?
                    </h4>
                  </div>
                  <Trophy className="w-8 h-8 text-[#F39200] flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  Join 10+ selected finalist teams. Receive mentorship from senior product leads, access computational design credits, and compete for ₦1,000,000+ in hardware tools and cash prizes.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/hackathon/register"
                    className="inline-flex items-center justify-center py-2.5 px-6 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Apply to Hackathon Track</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 text-spring" />
                  </Link>
                  <Link
                    href="/voting-rules"
                    className="inline-flex items-center justify-center py-2.5 px-5 rounded-full border border-pine/30 text-pine text-xs font-medium uppercase tracking-wider hover:bg-pine/5 transition-all"
                  >
                    <span>Jury &amp; Voting Criteria</span>
                  </Link>
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
