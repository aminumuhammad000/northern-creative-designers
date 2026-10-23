import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Video,
} from "lucide-react";
import { commitmentTrackRecord, eventConfig } from "@/config/event";

export function CommitmentSection() {
  return (
    <section id="past-editions" className="py-20 md:py-28 bg-[#FAFAF8] border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="type-heading text-pine">
              Our Commitment in Action
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-lg mt-3 leading-relaxed">
              Before Summit 2.0, Northern Creative Designers executed rigorous physical bootcamps, regional hackathons, and high-impact thought leadership series across Arewa.
            </p>
          </div>
          <Link
            href="/past-editions"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pine hover:text-spring transition-colors pb-2"
          >
            Explore Historical Archive &amp; Media
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1. Flagship Programs & Bootcamps Grid (Adapted from PDF Pages 13 & 14) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Hackathon 2025 */}
          <div className="p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                  Hackathon
                </span>
                <span className="text-xs font-extrabold text-spring px-2.5 py-1 rounded-full bg-spring/10 font-mono">
                  ₦100,000 Cash Prizes
                </span>
              </div>
              <h3 className="text-lg font-bold text-pine mb-2">
                {commitmentTrackRecord.hackathons[0].title}
              </h3>
              <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                {commitmentTrackRecord.hackathons[0].description}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
              <span className="flex items-center gap-1.5 font-medium text-pine">
                <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                Verified Competition
              </span>
              <span className="font-mono">2025</span>
            </div>
          </div>

          {/* Summit 1.0 */}
          <div className="p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                  Flagship Gathering
                </span>
                <span className="text-xs font-extrabold text-tangerine px-2.5 py-1 rounded-full bg-tangerine/10">
                  Edition 1.0
                </span>
              </div>
              <h3 className="text-lg font-bold text-pine mb-2">
                {commitmentTrackRecord.conferences[0].title}
              </h3>
              <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                {commitmentTrackRecord.conferences[0].description}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
              <span className="flex items-center gap-1.5 font-medium text-pine">
                <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                Flagship Summit
              </span>
              <span className="font-mono">Inaugural</span>
            </div>
          </div>

          {/* Brand Identity Masterlab */}
          <div className="p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                  Bootcamp
                </span>
                <span className="text-xs font-extrabold text-pine px-2.5 py-1 rounded-full bg-pine/5 font-mono">
                  50 Practitioners
                </span>
              </div>
              <h3 className="text-lg font-bold text-pine mb-2">
                {commitmentTrackRecord.bootcamps[0].title}
              </h3>
              <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                {commitmentTrackRecord.bootcamps[0].description}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
              <span className="flex items-center gap-1.5 font-medium text-pine">
                <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                Physical Intensive
              </span>
              <span className="font-mono">Masterlab</span>
            </div>
          </div>

          {/* Design Code Bootcamp */}
          <div className="p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                  Bootcamp
                </span>
                <span className="text-xs font-extrabold text-pine px-2.5 py-1 rounded-full bg-pine/5 font-mono">
                  75 Participants
                </span>
              </div>
              <h3 className="text-lg font-bold text-pine mb-2">
                {commitmentTrackRecord.bootcamps[1].title}
              </h3>
              <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                {commitmentTrackRecord.bootcamps[1].description}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
              <span className="flex items-center gap-1.5 font-medium text-pine">
                <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                3-Day Intensive
              </span>
              <span className="font-mono">Practical Code</span>
            </div>
          </div>

          {/* UI/UX Bootcamp */}
          <div className="p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
                  Bootcamp
                </span>
                <span className="text-xs font-extrabold text-pine px-2.5 py-1 rounded-full bg-pine/5 font-mono">
                  100 Participants
                </span>
              </div>
              <h3 className="text-lg font-bold text-pine mb-2">
                {commitmentTrackRecord.bootcamps[2].title}
              </h3>
              <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                {commitmentTrackRecord.bootcamps[2].description}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-neutral-border/60 flex items-center justify-between text-xs text-navy/60">
              <span className="flex items-center gap-1.5 font-medium text-pine">
                <CheckCircle2 className="w-3.5 h-3.5 text-spring" />
                Digital Product Design
              </span>
              <span className="font-mono">UI/UX</span>
            </div>
          </div>

          {/* 2. Interactive Knowledge Series (Webinars - Adapted from PDF Page 15) */}
          <div className="p-7 rounded-2xl bg-pine text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-spring uppercase tracking-wider px-2.5 py-1 rounded bg-white/10">
                  Virtual Series
                </span>
                <Video className="w-4 h-4 text-spring" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Interactive Knowledge Series
              </h3>
              <p className="text-white/80 text-xs mb-4">
                Impactful master webinars delivered to the regional creative community:
              </p>
              <ul className="space-y-2 text-xs">
                {commitmentTrackRecord.webinars.map((webinar, wIdx) => (
                  <li key={wIdx} className="flex items-center gap-2 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-spring" />
                    <span>{webinar}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 mt-6 border-t border-white/10 text-xs text-white/60">
              <span>Thought Leadership Archive</span>
            </div>
          </div>
        </div>

        {/* Aggregate Impact Metric Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-border grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-spring font-mono">₦100,000</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-semibold">Cash Prizes Awarded</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-mono">225+</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-semibold">Bootcamp Practitioners</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-tangerine font-mono">4</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-semibold">Flagship Knowledge Series</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-pine font-mono">2.0</p>
            <p className="text-xs text-navy/70 uppercase tracking-wider font-semibold">Summit Evolution</p>
          </div>
        </div>
      </div>
    </section>
  );
}
