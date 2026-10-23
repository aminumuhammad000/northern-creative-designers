import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  Briefcase,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { programFeatures } from "@/config/event";
import { Button } from "@/components/ui/Button";

export function ProgrammeHighlightsSection() {
  const categoryIcons: Record<string, React.ReactNode> = {
    "Core Learning": <BookOpen className="w-6 h-6 text-spring" />,
    "Creative": <Zap className="w-6 h-6 text-tangerine" />,
    "Business & Career": <Briefcase className="w-6 h-6 text-spring" />,
    "Community & Vibe": <Trophy className="w-6 h-6 text-tangerine" />,
  };

  return (
    <section id="programme-highlights" className="py-20 md:py-32 bg-[#FAFAF8] border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold text-pine uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-pine/5 border border-pine/10">
              Program Architecture
            </span>
            <h2 className="type-section-title text-pine mt-3 font-black">
              Program Features &amp; Structure.
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-xl mt-3 leading-relaxed">
              Moving beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways for creative practitioners.
            </p>
          </div>
          <Button
            href="/programme"
            variant="outline"
            size="lg"
            className="hover:scale-105 active:scale-95 transition-transform"
          >
            Explore Full Schedule
          </Button>
        </div>

        {/* 4 Feature Pillars adapted directly from PDF Page 08 with Chowdeck-Style Chunky Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-[2rem] bg-white border border-neutral-border hover:border-spring hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-pine/5 border border-pine/10 flex items-center justify-center group-hover:bg-pine group-hover:scale-110 transition-all duration-300">
                      {categoryIcons[feature.category] || <BookOpen className="w-6 h-6 text-spring" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-navy/55 uppercase tracking-wider block">
                        Category
                      </span>
                      <span className="font-extrabold text-pine text-sm sm:text-base">
                        {feature.category}
                      </span>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-spring/15 text-pine border border-spring/30 uppercase tracking-wide">
                    {feature.subtitle}
                  </span>
                </div>

                <h3 className="type-subheading text-pine text-2xl font-black mb-3">
                  {feature.subtitle}
                </h3>

                <p className="type-body text-navy/80 text-sm sm:text-base leading-relaxed mb-6">
                  {feature.details}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
                <span className="flex items-center gap-1.5 font-bold text-pine">
                  <CheckCircle2 className="w-4 h-4 text-spring" />
                  Practical Session
                </span>
                <span className="font-mono text-pine/80 font-bold">Kano • 19 Dec 2026</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip for Hackathon & Client Connect */}
        <div className="mt-14 p-8 sm:p-12 rounded-[2rem] bg-pine text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-spring text-xs font-mono font-bold uppercase tracking-wider">
              Talent &amp; Dealmaking
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              Live Hackathon &amp; Client Connect Corner
            </h4>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Are you an agency or business looking to hire top-tier Arewa design talent? Register as an exhibitor or client partner.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/hackathon"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all"
            >
              Hackathon Details
            </Link>
            <Link
              href="/exhibitors"
              className="px-6 py-3 rounded-full bg-spring text-navy text-xs font-extrabold tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Client Booths
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
