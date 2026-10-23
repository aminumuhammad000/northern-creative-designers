import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Vote, Award, Lock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Hackathon Competition & Voting Rules",
  description: "Official rules governing team evaluation, judge scoring, and audience voting integrity for Northern Design Hackathon 2.0.",
};

export default function VotingRulesPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Integrity Policy"
        title="Competition & Voting Rules"
        description="Transparent scoring governance for Northern Design Hackathon 2.0 and Summit 2.0 awards."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-navy/85 space-y-10 text-sm sm:text-base leading-relaxed">
        {/* Core Principles Banner */}
        <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pine text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-spring" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-pine">Voting Integrity Guarantee</h2>
              <p className="text-xs text-navy/70">
                Audited by Northern Creative Designers Technical Desk
              </p>
            </div>
          </div>
          <p className="text-navy/80 text-sm leading-relaxed">
            Northern Creative Designers enforces strict server-side voting verification. We do not rely exclusively on browser cookies or client-side checks to guarantee fair elections. Duplicate voting attempts are prevented via cryptographic tokens and database uniqueness constraints.
          </p>
        </div>

        {/* Scoring Composition Breakdown */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-pine">1. Scoring Composition</h3>
          <p>
            Final hackathon rankings are calculated through a weighted combination of official judge rubric evaluations and live audience participation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-white border border-neutral-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pine text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-tangerine" />
                  Grand Jury Evaluation
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-pine text-white">
                  70% WEIGHT
                </span>
              </div>
              <p className="text-xs text-navy/70 leading-relaxed">
                Assessed across 4 criteria: Cultural Semiotics & Authenticity, Problem-Solution Fit, Visual & Technical Craft, and Presentation Clarity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-neutral-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pine text-base flex items-center gap-2">
                  <Vote className="w-4 h-4 text-spring" />
                  Live Audience Ballot
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-spring text-navy">
                  30% WEIGHT
                </span>
              </div>
              <p className="text-xs text-navy/70 leading-relaxed">
                Cast exclusively by verified attendees during the live pitch round using single-use stage voting credentials.
              </p>
            </div>
          </div>
        </section>

        {/* Timing and Window */}
        <section className="space-y-3">
          <h3 className="text-2xl font-bold text-pine">2. Voting Window & Eligibility</h3>
          <p>
            The voting module opens strictly after all finalist teams conclude their live 2-Hour sprint presentations on the main stage (19th December, 2026). The voting window remains active for exactly 20 minutes before automated server cutoff.
          </p>
        </section>

        {/* Anti-Tampering Rules */}
        <section className="space-y-3">
          <h3 className="text-2xl font-bold text-pine">3. Anti-Fraud & Disqualification</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-navy/80">
            <li>Any team found using botnets, automated request scripts, or spoofed identifiers will face immediate disqualification.</li>
            <li>All vote transactions are logged in an immutable administrative audit ledger.</li>
            <li>In the event of a tie, the Grand Jury evaluation score serves as the primary tie-breaker.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
