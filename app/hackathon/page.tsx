import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Trophy,
  Users2,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Northern Design Hackathon 2.0",
  description:
    "2-Hour Live Design Sprint: Craft, Speed, and Problem Solving. Live project reviews and audience voting at Summit 2.0 in Kano.",
};

export default function HackathonPage() {
  const { hackathon } = landingPageContent;

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Live Arena"
        title="Northern Design Hackathon 2.0"
        description="A live, high-pressure design sprint pitting Northern Nigeria's most agile designers, brand strategists, and developers against real regional challenges."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Hackathon Summary Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spring text-navy text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Official 2026 Sprint Arena</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The 2-Hour Live Design Sprint
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Following the celebrated 2025 Northern Design Hackathon (which awarded
              ₦100,000 in cash prizes), Hackathon 2.0 brings finalist teams onto the
              main summit stage in Kano for a 2-hour live execution sprint with audience voting.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-spring" />
                120 Minutes on Clock
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users2 className="w-4 h-4 text-spring" />
                Teams of 2 to 4
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-tangerine" />
                ₦1,000,000+ Bounties
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <Button href="/hackathon/register" variant="primary" size="lg" className="w-full sm:w-auto">
              Register Team to Compete
            </Button>
            <Button
              href="/voting-rules"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
            >
              Voting Rules
            </Button>
          </div>
        </section>

        {/* Previous Edition vs Upcoming Edition Comparison Row */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Hackathon Evolution
            </h3>
            <p className="text-navy/70 text-sm leading-relaxed max-w-2xl">
              From our inaugural 2025 regional hackathon to our 2026 live on-stage competition.
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
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  Previous: 2025 Hackathon 1.0
                </span>
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
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-spring text-navy text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  Upcoming: 19 December 2026
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-black text-lg">Summit 2.0 Live Stage Sprint</p>
                  <p className="text-spring text-xs font-mono font-bold">₦1,000,000+ Hardware &amp; Cash Bounties</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-pine flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  120 minutes on the main stage. 10+ selected finalist teams build live under strict constraints. Audience and jury cast real-time votes via credential badges.
                </p>
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <Link
                    href="/hackathon/register"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-spring uppercase tracking-wider hover:underline"
                  >
                    <span>Apply Your Team Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Challenge Tracks */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Three Official Challenge Tracks
            </h3>
            <p className="text-navy/70 text-sm mt-1">
              Select your category upon team registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathon.tracks.map((track, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 transition-all space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-pine text-spring font-bold flex items-center justify-center text-sm shadow-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-pine leading-snug">{track.title}</h4>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  {track.description}
                </p>
                <div className="pt-2 text-[11px] font-mono text-spring font-bold">
                  ✦ Live Stage Pitch Required
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Distinct Workflow Stages */}
        <section className="p-8 sm:p-10 rounded-3xl bg-neutral-sand border border-neutral-border space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-pine">
              Competition Lifecycle &amp; Voting Architecture
            </h3>
            <p className="text-xs sm:text-sm text-navy/70 mt-1">
              Audience voting operates under strict anti-tampering rules and cryptographic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-neutral-border space-y-2">
              <span className="text-xs font-bold text-spring font-mono">Step 1</span>
              <h5 className="font-bold text-pine text-sm">Team Roster Selection</h5>
              <p className="text-xs text-navy/70 leading-relaxed">
                Submit team portfolio and roster for selection before deadline.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-neutral-border space-y-2">
              <span className="text-xs font-bold text-pine font-mono">Step 2</span>
              <h5 className="font-bold text-pine text-sm">2-Hour Live Sprint</h5>
              <p className="text-xs text-navy/70 leading-relaxed">
                120 minutes of live design, prototyping, and coding in the summit arena.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-neutral-border space-y-2">
              <span className="text-xs font-bold text-pine font-mono">Step 3</span>
              <h5 className="font-bold text-pine text-sm">Jury Rubric</h5>
              <p className="text-xs text-navy/70 leading-relaxed">
                Independent evaluation by veteran design leaders and enterprise sponsors.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-neutral-border space-y-2">
              <span className="text-xs font-bold text-tangerine flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3" /> Step 4
              </span>
              <h5 className="font-bold text-pine text-sm">Live Audience Vote</h5>
              <p className="text-xs text-navy/70 leading-relaxed">
                Audience voting unlocks exclusively during finalist pitch presentations.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
