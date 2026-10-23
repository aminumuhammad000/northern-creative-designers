import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Zap,
  Briefcase,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function ProgrammeHighlightsSection() {
  const { programmeHighlights } = landingPageContent;

  const categoryIcons: Record<string, React.ReactNode> = {
    "Core Practical Learning": <BookOpen className="w-5 h-5 text-spring" />,
    "Live Competition": <Zap className="w-5 h-5 text-tangerine" />,
    "Business & Career": <Briefcase className="w-5 h-5 text-spring" />,
    "Community & Vibe": <Trophy className="w-5 h-5 text-tangerine" />,
  };

  return (
    <section id="programme-highlights" className="py-20 bg-neutral-sand border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            tag="Programme Highlights"
            title="Designed for Mastery, Connection, and Career Velocity"
            description="Summit 2.0 sessions are strictly structured around practical outcomes—giving you tangible tools, actionable pricing models, and direct access to high-value networks."
          />
          <Button
            href="/programme"
            variant="outline"
            size="md"
          >
            View Full Schedule
          </Button>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programmeHighlights.map((session) => (
            <div
              key={session.id}
              className="p-8 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pine">
                    <span className="p-1.5 rounded-md bg-pine/5">
                      {categoryIcons[session.category] || <BookOpen className="w-4 h-4" />}
                    </span>
                    <span>{session.category}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-spring/15 text-pine border border-spring/30">
                    {session.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-pine mb-3 leading-snug">
                  {session.title}
                </h3>

                <p className="text-navy/80 text-sm sm:text-base leading-relaxed mb-6">
                  {session.description}
                </p>
              </div>

              {/* Deliverables list */}
              <div className="pt-4 border-t border-neutral-border/80">
                <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider mb-2.5">
                  Core Highlights:
                </p>
                <ul className="space-y-2">
                  {session.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-navy/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-pine text-base">
              Interested in speaking or presenting a masterclass?
            </h4>
            <p className="text-xs sm:text-sm text-navy/70">
              Speaker submissions and session proposals are reviewed by the Executive Committee.
            </p>
          </div>
          <Button
            href="/contact?subject=speaker-proposal"
            variant="secondary"
            size="sm"
          >
            Submit Proposal
          </Button>
        </div>
      </div>
    </section>
  );
}
