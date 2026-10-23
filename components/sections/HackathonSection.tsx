"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  ArrowRight,
  ArrowDownRight,
  CheckCircle2,
  Trophy,
  Users2,
  Vote,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TrackItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bgClass: string;
  deliverables: string[];
}

const hackathonTracks: TrackItem[] = [
  {
    number: "01",
    title: "Arewa Cultural Identity & Systems",
    subtitle: "Brand & Visual Architecture",
    description:
      "Reimagining traditional Hausa, Kanuri, and Nupe geometric motifs and calligraphy into scalable contemporary digital brand identities, typography, and packaging.",
    bgClass: "bg-[#F39200]",
    deliverables: [
      "Vector motif icon library (SVG)",
      "Bespoke packaging or typography lockup",
      "Comprehensive mini brand guidelines",
    ],
  },
  {
    number: "02",
    title: "Digital Product & Civic Tech UX",
    subtitle: "UI/UX & Interactive Design",
    description:
      "Designing hyper-functional, culturally grounded mobile interfaces and web experiences solving real socio-economic problems in the North.",
    bgClass: "bg-[#00CC67]",
    deliverables: [
      "Figma design system & interactive prototypes",
      "Usability benchmarks tailored to regional contexts",
      "High-fidelity responsive user flows",
    ],
  },
  {
    number: "03",
    title: "AI-Augmented Visual Craft",
    subtitle: "Motion & Synthetic Media",
    description:
      "Leveraging generative AI tools and custom vector models to produce world-class motion graphics, 3D assets, and animated visual storytelling.",
    bgClass: "bg-[#453478]",
    deliverables: [
      "Dynamic 3D kinetic typography piece",
      "AI-assisted multi-layered storyboard",
      "Final 30-second motion graphic reel",
    ],
  },
];

export function HackathonSection() {
  return (
    <section
      id="hackathon"
      className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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

        {/* 3 Challenge Tracks: Saturated Chunky Bento Cards matching Reference Design */}
        <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {hackathonTracks.map((track) => (
              <div
                key={track.number}
                className={`
                  group p-8 sm:p-10 rounded-[2rem] ${track.bgClass} text-white shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
                `}
              >
                {/* Subtle inner ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                    <span className="text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
                      Track {track.number}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                    {track.subtitle}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                    {track.title}
                  </h3>

                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {track.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 border-t border-white/20 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80 block">
                    Core Deliverables:
                  </span>
                  {track.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/95">
                      <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5 opacity-90" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Sprint Workflow & Prize Pool Callout */}
        <div className="rounded-[2.5rem] bg-[#013811] text-white p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
            <div className="space-y-1">
              <span className="text-spring text-xs font-mono font-bold uppercase tracking-wider block">
                Live Execution Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                2-Hour Live Sprint &amp; Audience Voting
              </h3>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-spring text-[#071135] font-black text-sm tracking-wide shadow-md">
              ₦1,000,000+ Hardware &amp; Cash Bounties
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {/* Phase 01 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-spring/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-spring font-mono">Phase 01</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-spring text-navy">
                  OPEN
                </span>
              </div>
              <h4 className="font-extrabold text-white text-lg">Registration</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Register individually or assemble a squad of up to 4 designers, developers, and visual strategists.
              </p>
              <Link
                href="/hackathon/register"
                className="inline-flex items-center gap-1.5 text-xs text-spring font-bold hover:underline pt-2 uppercase tracking-wide"
              >
                <span>Apply to Compete</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Phase 02 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-tangerine/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-tangerine font-mono">Phase 02</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                  19 DEC
                </span>
              </div>
              <h4 className="font-extrabold text-white text-lg">2-Hour Live Sprint</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Prompt revealed live at the summit hall. Teams build, refine, and package assets under real constraints.
              </p>
              <span className="text-[11px] text-white/50 block pt-2">Main Stage • Kano</span>
            </div>

            {/* Phase 03 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white/60 font-mono">Phase 03</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                  CURATED
                </span>
              </div>
              <h4 className="font-extrabold text-white text-lg">Jury Scoring</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Industry judges evaluate submissions against cultural resonance, technical polish, and creative innovation.
              </p>
              <span className="text-[11px] text-white/50 block pt-2">Cultural + Technical</span>
            </div>

            {/* Phase 04 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-spring transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-spring font-mono">Phase 04</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-spring/20 text-spring">
                  INTERACTIVE
                </span>
              </div>
              <h4 className="font-extrabold text-white text-lg">Audience Voting</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Verified attendees cast real-time digital votes via their summit badges to crown the People&apos;s Choice Champion.
              </p>
              <span className="text-[11px] text-spring/80 block pt-2">Anti-tamper verified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
