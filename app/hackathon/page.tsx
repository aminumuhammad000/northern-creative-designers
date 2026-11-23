import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users2,
  Clock,
  Lock,
  ArrowRight,
  Vote,
  Trophy,
  Award,
  Sparkles,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getHackathonPublicStateAction } from "@/app/actions/voting";

export const metadata: Metadata = {
  title: "Northern Design Hackathon 2.0 | Live Voting & Finalist Showcase",
  description:
    "2-Hour Live Design Sprint: Craft, Speed, and Regional Problem Solving. Live project reviews, shareable contestant voting links, and live audience leaderboard at Summit 2.0 in Kano.",
};

export default async function HackathonPage() {
  const { state } = await getHackathonPublicStateAction();

  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      <PageHeader
        tag="Live Arena"
        title="Northern Design Hackathon 2.0"
        description="A live, high-pressure design sprint pitting Northern Nigeria's most agile designers, brand strategists, and developers against real regional challenges with real-time audience voting."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Dynamic Live Status & Action Center Banner */}
        <section
          className={`p-8 sm:p-10 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 transition-all ${
            state.is_voting_open
              ? "bg-pine border-2 border-spring"
              : state.results_published
              ? "bg-[#063B18] border border-white/20"
              : "bg-pine"
          }`}
        >
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {state.is_voting_open ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-spring text-[#063B18] shadow-sm animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#063B18]" />
                  LIVE AUDIENCE VOTING ACTIVE
                </span>
              ) : state.results_published ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-neutral-900 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  OFFICIAL 70/30 WINNERS PUBLISHED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/15 text-spring">
                  <Clock className="w-3.5 h-3.5" />
                  SUMMIT 2.0 ON-STAGE COMPETITION
                </span>
              )}
              <span className="text-xs text-white/70 font-mono">• 19th December, 2026, Kano</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The 2-Hour Live Stage Sprint
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Following the celebrated 2025 Northern Design Hackathon (which awarded ₦100,000 in cash prizes), Hackathon 2.0 brings individual finalist designers onto the main summit stage in Kano for a 120-minute execution sprint with live audience voting and verified digital ballots.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-1 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-spring" />
                120 Minutes Execution
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-spring" />
                20-Minute Voting Window
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users2 className="w-4 h-4 text-spring" />
                Individual Finalists
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-72">
            <Link
              href="/hackathon/vote"
              className={`w-full py-3.5 px-6 rounded-full text-center text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                state.is_voting_open
                  ? "bg-spring hover:bg-[#02b25b] text-[#063B18] animate-bounce"
                  : "bg-spring hover:bg-[#02b25b] text-[#063B18]"
              }`}
            >
              Vote for a Designer
            </Link>

            <Link
              href="/hackathon/leaderboard"
              className="w-full py-3 px-6 rounded-full bg-white hover:bg-neutral-100 text-pine font-bold text-xs uppercase tracking-wider text-center transition-all shadow-xs"
            >
              Live Leaderboard
            </Link>

            <Link
              href="/hackathon/participants"
              className="w-full py-3 px-6 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-2xs"
            >
              Meet the Finalists
            </Link>

            <Link
              href="/hackathon/register"
              className="w-full py-2.5 px-6 rounded-full text-white/70 hover:text-white font-medium text-[11px] uppercase tracking-wider text-center transition-colors"
            >
              Register to Compete →
            </Link>
          </div>
        </section>

        {/* 4 Feature Hub Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/hackathon/participants"
            className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/40 shadow-xs hover:shadow-md transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-pine/10 text-pine group-hover:bg-pine group-hover:text-spring flex items-center justify-center transition-colors shadow-2xs">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-pine text-base group-hover:text-pine-light transition-colors">
              Finalist Showcase
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Explore contestant portfolios, project dossiers, cultural problem statements, and individual QR voting passes.
            </p>
            <span className="text-xs font-bold text-pine flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore Finalists <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/hackathon/vote"
            className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/40 shadow-xs hover:shadow-md transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-spring/20 text-[#063B18] group-hover:bg-[#00CB67] group-hover:text-[#063B18] flex items-center justify-center transition-colors shadow-2xs">
              <Vote className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-pine text-base group-hover:text-pine-light transition-colors">
              Live Stage Ballot
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Cast your authenticated vote during the 20-minute window following finalist stage pitch presentations.
            </p>
            <span className="text-xs font-bold text-pine flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Cast Your Vote <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/hackathon/leaderboard"
            className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/40 shadow-xs hover:shadow-md transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-400 group-hover:text-neutral-900 flex items-center justify-center transition-colors shadow-2xs">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-pine text-base group-hover:text-pine-light transition-colors">
              Live Leaderboard
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Watch real-time audience vote percentages and rankings. Includes Fullscreen Projector Mode for stage monitors.
            </p>
            <span className="text-xs font-bold text-pine flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Standings <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/voting-rules"
            className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/40 shadow-xs hover:shadow-md transition-all group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-700 group-hover:bg-pine group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-pine text-base group-hover:text-pine-light transition-colors">
              70/30 Scoring Rules
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Learn how Grand Jury rubric evaluations (70%) combine with verified live audience voting (30%) to pick winners.
            </p>
            <span className="text-xs font-bold text-pine flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Integrity Policy <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </section>

        {/* Previous Edition vs Upcoming Edition Comparison Row */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Hackathon Evolution
            </h3>
            <p className="text-navy/70 text-sm leading-relaxed max-w-2xl">
              From our inaugural 2025 regional hackathon to our 2026 live on-stage competition in Kano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Previous 2025 Sprint */}
            <div className="rounded-3xl overflow-hidden border border-neutral-border bg-white shadow-md flex flex-col group">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/ncd_class_training.jpg"
                  alt="Northern Design Hackathon 2025"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-black text-lg">Inaugural Regional Design Sprint</p>
                  <p className="text-white/75 text-xs font-mono">₦100,000 Cash Prizes Awarded</p>
                </div>
              </div>
              <div className="p-6 space-y-2 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  Competitors solved localized civic branding and mobile UX challenges in Kano, reviewed live by a panel of regional tech founders.
                </p>
                <div className="pt-3 border-t border-neutral-border/60 text-xs font-mono text-pine/80 font-bold">
                  ✦ Physical Sprint • Verified Winners
                </div>
              </div>
            </div>

            {/* Upcoming 2026 Stage Sprint */}
            <div className="rounded-3xl overflow-hidden border-2 border-spring bg-pine text-white shadow-xl flex flex-col group relative">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/ncd_peer_interaction.jpg"
                  alt="Summit 2.0 Live Hackathon Stage"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-pine/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-black text-lg">Summit 2.0 Live Stage Sprint</p>
                  <p className="text-white/75 text-xs font-mono">120 Minutes on Stage • 20 Min Live Ballot</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-pine flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  120 minutes on the main stage. Selected individual finalist designers build live under strict constraints. Audience and jury cast real-time votes via credential badges.
                </p>
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <Link
                    href="/hackathon/participants"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-spring uppercase tracking-wider hover:underline"
                  >
                    <span>View 2026 Finalist Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Tracks */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Competition Categories
            </h3>
            <p className="text-navy/70 text-sm mt-1">
              Finalists compete across two specialized disciplines rooted in Arewa craft and scalable technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/30 transition-all space-y-3 shadow-xs hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-pine text-spring font-bold flex items-center justify-center text-sm shadow-xs">
                01
              </div>
              <h4 className="text-lg font-bold text-pine leading-snug">Brand Identity Systems</h4>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                Translating authentic Northern motifs and visual languages into scalable contemporary branding systems, logos, packaging, and cultural typography.
              </p>
              <div className="pt-2 text-[11px] font-mono text-spring font-bold">
                ✦ Live Stage Execution &amp; Pitch
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-border hover:border-pine/30 transition-all space-y-3 shadow-xs hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-pine text-spring font-bold flex items-center justify-center text-sm shadow-xs">
                02
              </div>
              <h4 className="text-lg font-bold text-pine leading-snug">UI/UX &amp; Mobile Products</h4>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                Designing intuitive digital product experiences, mobile application interfaces, and interactive prototypes tailored to regional problems.
              </p>
              <div className="pt-2 text-[11px] font-mono text-spring font-bold">
                ✦ Live Stage Execution &amp; Pitch
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
