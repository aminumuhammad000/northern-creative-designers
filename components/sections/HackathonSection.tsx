import React from "react";
import Link from "next/link";
import {
  Zap,
  Vote,
  Trophy,
  Users2,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function HackathonSection() {
  const { hackathon } = landingPageContent;

  return (
    <section id="hackathon" className="py-20 bg-pine text-white border-b border-spring/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            theme="pine"
            tag={hackathon.tag}
            title={hackathon.title}
            description={hackathon.description}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href={hackathon.ctaLink}
              variant="primary"
              size="md"
            >
              {hackathon.ctaText}
            </Button>
            <Button
              href="/voting-rules"
              variant="outline"
              size="md"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Competition Rules
            </Button>
          </div>
        </div>

        {/* 3 Challenge Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {hackathon.tracks.map((track, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white/5 border border-white/15 hover:border-spring/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-spring/20 text-spring flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  {track.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Workflow Stages: Clear distinction between Registration, Submission, Judging & Voting */}
        <div className="rounded-2xl bg-white/10 border border-white/15 p-6 sm:p-8">
          <h4 className="text-base font-semibold text-spring uppercase tracking-wider mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-spring" />
            Hackathon Progression & Public Voting Status
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Registration */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-spring">Phase 01</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-spring text-navy">
                  ACTIVE
                </span>
              </div>
              <h5 className="font-bold text-white text-base">Participant Registration</h5>
              <p className="text-xs text-white/75">
                Register as an individual creator or form a multi-disciplinary team of up to 4.
              </p>
              <Link
                href="/hackathon/register"
                className="inline-flex items-center gap-1 text-xs text-spring font-medium hover:underline pt-2"
              >
                Apply to Compete <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Step 2: Live Sprint */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60">Phase 02</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white/80">
                  EVENT DAY
                </span>
              </div>
              <h5 className="font-bold text-white text-base">2-Hour Live Sprint</h5>
              <p className="text-xs text-white/75">
                Finalist teams build live at the summit hall in Kano under strict time conditions.
              </p>
            </div>

            {/* Step 3: Judging */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60">Phase 03</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white/80">
                  CRITERIA
                </span>
              </div>
              <h5 className="font-bold text-white text-base">Grand Jury Scoring</h5>
              <p className="text-xs text-white/75">
                Evaluated on cultural authenticity, problem-solution fit, and execution craft.
              </p>
            </div>

            {/* Step 4: Audience Voting */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60">Phase 04</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white/80 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> OPENS ON STAGE
                </span>
              </div>
              <h5 className="font-bold text-white text-base">Audience Voting</h5>
              <p className="text-xs text-white/75">
                Live voting unlocks during final project pitches with verified anti-duplicate tokens.
              </p>
              <span className="inline-block text-[11px] text-white/50 pt-2 italic">
                Voting opens 19th Dec on stage
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-tangerine" />
              <span>
                Prizes: Cash awards, hardware tablets, subscriptions, and exhibition spotlight.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-spring" />
              <span>Real-time audience voting with anti-tampering verification.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
