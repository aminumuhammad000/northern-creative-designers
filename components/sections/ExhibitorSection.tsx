import React from "react";
import Link from "next/link";
import {
  Store,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function ExhibitorSection() {
  const { exhibitors } = landingPageContent;

  return (
    <section id="exhibitors" className="py-20 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              tag={exhibitors.tag}
              title={exhibitors.title}
              description={exhibitors.description}
            />

            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-pine uppercase tracking-wider">
                Exhibitor Profiles Welcomed:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {exhibitors.typesAccepted.map((type, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-sand border border-neutral-border text-xs sm:text-sm font-medium text-pine"
                  >
                    <CheckCircle className="w-4 h-4 text-spring flex-shrink-0" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href={exhibitors.ctaLink}
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {exhibitors.ctaText}
              </Button>
              <Button href="/exhibitors" variant="outline" size="md">
                Exhibitor Guidelines
              </Button>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-pine text-white flex items-center justify-center">
                <Store className="w-6 h-6 text-tangerine" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-pine mb-2">
                  Summit Marketplace & Gallery
                </h4>
                <p className="text-navy/75 text-sm leading-relaxed">
                  Engage directly with decision makers, creative leads, and clients.
                  Every approved booth provides dedicated showcase space, inclusion
                  in the summit digital catalogue, and badge passes for staff.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-neutral-border text-xs text-navy/80">
                <div className="flex items-center justify-between py-1 border-b border-neutral-border/60">
                  <span className="font-medium text-navy/60">Expected Attendance</span>
                  <span className="font-bold text-pine">500+ Design & Tech Leaders</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-border/60">
                  <span className="font-medium text-navy/60">Exhibition Date</span>
                  <span className="font-bold text-pine">19th December, 2026</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-navy/60">Review Process</span>
                  <span className="font-bold text-pine">Curated by Committee</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-spring/15 border border-spring/30 text-xs text-pine font-medium">
                <Sparkles className="w-4 h-4 text-pine inline mr-1.5" />
                Limited booth capacity. Applications undergo review within 3 business days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
