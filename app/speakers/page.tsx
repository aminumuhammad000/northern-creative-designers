import React from "react";
import { Metadata } from "next";
import { Mic, Send, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Speakers & Mentors",
  description:
    "Official speaker announcements and call for session proposals for Northern Creative Designers Summit 2.0.",
};

export default function SpeakersPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Thought Leadership"
        title="Speakers & Presenters"
        description="Meet the practitioners, agency heads, design educators, and tech innovators leading sessions at Summit 2.0."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Transparent Announcement State */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-neutral-sand border border-neutral-border p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-pine text-white flex items-center justify-center mx-auto shadow-md">
            <Mic className="w-8 h-8 text-spring" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pine/10 text-pine">
              <Sparkles className="w-3.5 h-3.5 text-tangerine" />
              Official Executive Review Underway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-pine">
              Speaker Lineup Announcements Launching Soon
            </h2>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              In accordance with Summit publishing governance, confirmed names,
              biographies, and high-resolution portraits are published only after
              contractual committee approval.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-navy/70 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              1 Keynote on Arewa Visual Semiotics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              4 Panelists on Commercial Pricing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              2 Masterclass Leads on AI Vector Tools
            </span>
          </div>
        </div>

        {/* Call for Speakers Submission */}
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white border border-neutral-border space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-pine">
              Call for Session Proposals & Workshop Hosts
            </h3>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              We welcome submissions from established designers, brand strategists,
              creative directors, and developers with tangible case studies relevant
              to Northern Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-sand border border-neutral-border">
              <h4 className="font-bold text-pine text-sm mb-1">Indigenous Semiotics</h4>
              <p className="text-xs text-navy/70">
                Traditional motifs, Hausa calligraphy, textile patterns, and architectural geometry.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-sand border border-neutral-border">
              <h4 className="font-bold text-pine text-sm mb-1">Business & Scale</h4>
              <p className="text-xs text-navy/70">
                Operating a studio in Arewa, pricing for international clients, and intellectual property.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-sand border border-neutral-border">
              <h4 className="font-bold text-pine text-sm mb-1">Technical Workflows</h4>
              <p className="text-xs text-navy/70">
                Advanced vector craft, motion graphics, UI design systems, and practical AI tooling.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-border">
            <p className="text-xs text-navy/60">
              Proposals reviewed on a rolling basis by the Northern Creative Designers Executive Committee.
            </p>
            <Button
              href="/contact?subject=speaker-proposal"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Speaker Proposal
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
