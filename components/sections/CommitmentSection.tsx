import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";

export function CommitmentSection() {
  const { commitment } = landingPageContent;

  return (
    <section id="past-editions" className="py-20 bg-neutral-sand border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            tag={commitment.tag}
            title={commitment.title}
            description={commitment.lead}
          />
          <Link
            href="/past-editions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-spring transition-colors pb-2"
          >
            Explore Historical Archive & Reports
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Verified Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitment.initiatives.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                    {item.type}
                  </span>
                  <span className="text-xs font-bold text-tangerine px-2.5 py-1 rounded-full bg-tangerine/10">
                    {item.metric}
                  </span>
                </div>

                <h3 className="font-bold text-pine text-lg mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-navy/75 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
                <span className="flex items-center gap-1.5 font-medium text-pine">
                  <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                  Verified Initiative
                </span>
                <span className="text-[11px] font-mono">Northern Creative</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Summary Bar */}
        <div className="mt-12 p-8 rounded-2xl bg-pine text-white grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-bold text-spring">₦100,000</p>
            <p className="text-xs sm:text-sm text-white/80 font-medium">Hackathon Prizes Awarded (2025)</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-bold text-white">225+</p>
            <p className="text-xs sm:text-sm text-white/80 font-medium">Bootcamp Practitioners Trained</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-bold text-tangerine">4</p>
            <p className="text-xs sm:text-sm text-white/80 font-medium">Core Masterclass Series</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-bold text-spring">2.0</p>
            <p className="text-xs sm:text-sm text-white/80 font-medium">Annual Summit Edition (2026)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
