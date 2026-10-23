import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Trophy, Users, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Past Editions & Impact Archive",
  description:
    "Explore the documented history of Northern Creative Designers: Summit 1.0, 2025 Hackathon, Masterlabs, and regional bootcamps.",
};

export default function PastEditionsPage() {
  const { commitment } = landingPageContent;

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Historical Archive"
        title="Past Editions & Community Track Record"
        description="A documented record of bootcamps, tournaments, and flagship conferences delivered by Northern Creative Designers."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Flagship Edition Comparison */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-4">
            <span className="text-xs font-bold text-pine uppercase tracking-wider px-2.5 py-1 rounded bg-pine/5">
              Edition 1.0 (Inaugural)
            </span>
            <h3 className="text-2xl font-bold text-pine">Northern Creative Summit 1.0</h3>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              Our inaugural regional convention bringing together design practitioners,
              agency founders, and creative students to establish a unified professional
              voice and community standard across Northern Nigeria.
            </p>
            <div className="pt-2 text-xs font-medium text-pine flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              <span>Concluded successfully • Established regional foundation</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-pine text-white space-y-4">
            <span className="text-xs font-bold text-spring uppercase tracking-wider px-2.5 py-1 rounded bg-white/10">
              Edition 2.0 (Current)
            </span>
            <h3 className="text-2xl font-bold text-white">Northern Creative Designers Summit 2.0</h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Theme: <em>Roots & Vectors: Shaping the Future of Arewa Design</em>.
              Expanding into practical live build sprints, client matchmaking, enterprise
              partnerships, and fraud-resistant hackathon voting.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Button href="/register" variant="primary" size="sm">
                Register for Summit 2.0
              </Button>
            </div>
          </div>
        </section>

        {/* Documented Historical Initiatives */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-spring uppercase tracking-wider">
              Documented Record
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-pine mt-1">
              Verified Bootcamps & Competitions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitment.initiatives.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-pine uppercase px-2 py-0.5 rounded bg-pine/5">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-tangerine px-2 py-0.5 rounded bg-tangerine/10">
                      {item.metric}
                    </span>
                  </div>
                  <h4 className="font-bold text-pine text-lg mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-border/60 text-[11px] text-navy/60 font-medium">
                  Organised by Northern Creative Designers
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
