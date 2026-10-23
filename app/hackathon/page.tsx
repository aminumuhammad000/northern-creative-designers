import React from "react";
import { Metadata } from "next";
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
        <section className="p-8 sm:p-10 rounded-2xl bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-white">
              The 2-Hour Live Design Sprint
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Following the celebrated 2025 Northern Design Hackathon (which awarded
              ₦100,000 in cash prizes), Hackathon 2.0 brings finalist teams onto the
              main summit stage in Kano for a 2-hour live execution sprint.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
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
                Cash & Hardware Awards
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Button href="/hackathon/register" variant="primary" size="lg">
              Register Team to Compete
            </Button>
            <Button
              href="/voting-rules"
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Voting Rules
            </Button>
          </div>
        </section>

        {/* 3 Challenge Tracks */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-pine mt-1">
              Three Official Challenge Tracks
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathon.tracks.map((track, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-pine text-spring font-bold flex items-center justify-center text-sm">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-pine">{track.title}</h4>
                <p className="text-sm text-navy/75 leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Distinct Workflow Stages */}
        <section className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-6">
          <div>
            <h3 className="text-xl font-bold text-pine">
              Competition Lifecycle & Voting Architecture
            </h3>
            <p className="text-xs sm:text-sm text-navy/70 mt-1">
              Audience voting operates under strict anti-tampering rules and cryptographic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-neutral-border space-y-1.5">
              <span className="text-xs font-bold text-spring">Step 1</span>
              <h5 className="font-bold text-pine text-sm">Registration</h5>
              <p className="text-xs text-navy/70">
                Submit team portfolio and roster for selection before deadline.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-border space-y-1.5">
              <span className="text-xs font-bold text-pine">Step 2</span>
              <h5 className="font-bold text-pine text-sm">Sprint Execution</h5>
              <p className="text-xs text-navy/70">
                120 minutes of live design and prototyping in the summit arena.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-border space-y-1.5">
              <span className="text-xs font-bold text-pine">Step 3</span>
              <h5 className="font-bold text-pine text-sm">Jury Rubric</h5>
              <p className="text-xs text-navy/70">
                Independent evaluation by veteran design leaders.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-border space-y-1.5">
              <span className="text-xs font-bold text-tangerine flex items-center gap-1">
                <Lock className="w-3 h-3" /> Step 4
              </span>
              <h5 className="font-bold text-pine text-sm">Live Audience Vote</h5>
              <p className="text-xs text-navy/70">
                Audience voting unlocks exclusively during pitch presentations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
