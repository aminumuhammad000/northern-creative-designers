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
    "Core Learning": <BookOpen className="w-5 h-5 text-spring" />,
    "Creative": <Zap className="w-5 h-5 text-tangerine" />,
    "Business & Career": <Briefcase className="w-5 h-5 text-spring" />,
    "Community & Vibe": <Trophy className="w-5 h-5 text-tangerine" />,
  };

  return (
    <section id="programme-highlights" className="py-20 md:py-28 bg-[#FAFAF8] border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-pine uppercase tracking-wider px-3 py-1 rounded-full bg-pine/5 border border-pine/10">
              Program Architecture
            </span>
            <h2 className="type-heading text-pine mt-3">
              Program Features &amp; Structure
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-lg mt-3 leading-relaxed">
              Moving beyond conventional talk shows to deliver deep learning, real-time collaboration, and actionable career pathways for creative practitioners.
            </p>
          </div>
          <Button
            href="/programme"
            variant="outline"
            size="md"
          >
            Explore Full Schedule
          </Button>
        </div>

        {/* 4 Feature Pillars adapted directly from PDF Page 08 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-9 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-pine/5 border border-pine/10 flex items-center justify-center">
                      {categoryIcons[feature.category] || <BookOpen className="w-5 h-5 text-spring" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-navy/55 uppercase tracking-wider block">
                        Category
                      </span>
                      <span className="font-bold text-pine text-sm sm:text-base">
                        {feature.category}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-spring/15 text-pine border border-spring/30">
                    {feature.subtitle}
                  </span>
                </div>

                <h3 className="type-subheading text-pine mb-3">
                  {feature.subtitle}
                </h3>

                <p className="type-body text-navy/80 text-sm sm:text-base leading-relaxed mb-6">
                  {feature.details}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
                <span className="flex items-center gap-1.5 font-medium text-pine">
                  <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                  Practical Session
                </span>
                <span className="font-mono text-pine/80">Kano • 19 Dec 2026</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip for Hackathon & Client Connect */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-pine text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Live Hackathon &amp; Client Connect Corner
            </h4>
            <p className="text-white/80 text-xs sm:text-sm">
              Are you an agency or business looking to hire top-tier Arewa design talent? Register as an exhibitor or client partner.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/hackathon"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Hackathon Details
            </Link>
            <Link
              href="/exhibitors"
              className="px-5 py-2.5 rounded-full bg-spring text-navy text-xs font-semibold tracking-wider uppercase hover:bg-[#02b25b] transition-colors"
            >
              Client Booths
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
