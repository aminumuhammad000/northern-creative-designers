import React from "react";
import Link from "next/link";
import {
  Zap,
  Vote,
  Trophy,
  Users2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function HackathonSection() {
  const { hackathon } = landingPageContent;

  return (
    <section id="hackathon" className="py-20 md:py-32 bg-pine text-white border-b border-spring/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-spring/20 text-spring text-xs font-extrabold uppercase tracking-wider mb-4 border border-spring/30">
              <Zap className="w-3.5 h-3.5" />
              <span>2-Hour Live Design Sprint</span>
            </div>
            <h2 className="type-section-title text-white font-black">
              Live Hackathon &amp; Audience Voting.
            </h2>
            <p className="type-body text-white/80 text-base sm:text-xl mt-3 leading-relaxed">
              Experience high-intensity real-time creative problem-solving. Finalists pitch live on stage, with judges and the registered audience voting in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/hackathon/register"
              variant="primary"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-transform"
            >
              Enter Hackathon
            </Button>
            <Button
              href="/voting-rules"
              variant="outline"
              size="lg"
              className="text-white border-white/40 hover:bg-white/10 hover:scale-105 active:scale-95 transition-transform"
            >
              Competition Rules
            </Button>
          </div>
        </div>

        {/* 3 Challenge Tracks with Chowdeck-Style Chunky Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Arewa Cultural Identity & Systems",
              description: "Reimagining traditional Hausa, Kanuri, and Nupe geometric motifs and calligraphy into scalable contemporary digital brand identities.",
            },
            {
              title: "Digital Product & Civic Tech UX",
              description: "Designing hyper-functional, culturally grounded mobile interfaces and web experiences solving real socio-economic problems in the North.",
            },
            {
              title: "AI-Augmented Visual Craft",
              description: "Leveraging generative tools and custom vector models to produce world-class motion graphics, 3D assets, and visual storytelling.",
            },
          ].map((track, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/15 hover:border-spring hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-spring/20 text-spring flex items-center justify-center font-black text-base mb-6 group-hover:scale-110 group-hover:bg-spring group-hover:text-navy transition-all duration-300">
                  0{idx + 1}
                </div>
                <h4 className="text-xl font-extrabold text-white mb-2 leading-snug">
                  {track.title}
                </h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Progression & Voting Workflow (Chowdeck Step Grid) */}
        <div className="rounded-[2.5rem] bg-white/10 border border-white/15 p-8 sm:p-12 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h4 className="text-sm font-extrabold text-spring uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-spring" />
              <span>Hackathon Progression &amp; Live Audience Voting</span>
            </h4>
            <span className="text-xs font-mono text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              ₦1.5M Prize Pool • Hardware + Cash
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Registration */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-spring/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-spring font-mono">Phase 01</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-spring text-navy">
                  ACTIVE
                </span>
              </div>
              <h5 className="font-extrabold text-white text-lg">Registration</h5>
              <p className="text-xs text-white/75 leading-relaxed">
                Register individually or assemble a squad of up to 4 designers, developers, and visual storytellers.
              </p>
              <Link
                href="/hackathon/register"
                className="inline-flex items-center gap-1.5 text-xs text-spring font-bold hover:underline pt-2 uppercase tracking-wide"
              >
                <span>Apply to Compete</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2: Live Sprint */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-tangerine/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-tangerine font-mono">Phase 02</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                  19 DEC
                </span>
              </div>
              <h5 className="font-extrabold text-white text-lg">2-Hour Live Sprint</h5>
              <p className="text-xs text-white/75 leading-relaxed">
                Prompt revealed live at the summit hall. Teams build, refine, and package assets in real time.
              </p>
              <span className="text-[11px] text-white/50 block pt-2">Hall Main Stage</span>
            </div>

            {/* Step 3: Jury Evaluation */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white/60 font-mono">Phase 03</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                  CURATED
                </span>
              </div>
              <h5 className="font-extrabold text-white text-lg">Jury Scoring</h5>
              <p className="text-xs text-white/75 leading-relaxed">
                Industry judges evaluate submissions against cultural resonance, technical polish, and creative innovation.
              </p>
              <span className="text-[11px] text-white/50 block pt-2">Cultural + Technical</span>
            </div>

            {/* Step 4: Audience Voting */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-spring transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-spring font-mono">Phase 04</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-spring/20 text-spring">
                  INTERACTIVE
                </span>
              </div>
              <h5 className="font-extrabold text-white text-lg">Audience Voting</h5>
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
