import React from "react";
import Link from "next/link";
import { Mic, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function SpeakersSection() {
  const { speakersAnnouncement } = landingPageContent;

  return (
    <section id="speakers" className="py-20 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={speakersAnnouncement.tag}
          title={speakersAnnouncement.title}
          description={speakersAnnouncement.description}
          centered
          className="mb-12"
        />

        {/* Clean Announcement State (Adhering to strict PRD guidelines) */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-neutral-sand border border-neutral-border p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-pine text-white flex items-center justify-center mx-auto shadow-md">
            <Mic className="w-8 h-8 text-spring" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pine/10 text-pine">
              <Sparkles className="w-3.5 h-3.5 text-tangerine" />
              Official Lineup Release
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-pine">
              {speakersAnnouncement.statusNote}
            </h3>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              We uphold rigorous publishing standards. Confirmed speaker portraits,
              executive biographies, and keynote session assignments will be published
              here following official committee sign-off.
            </p>
          </div>

          {/* Call for Speakers box */}
          <div className="pt-6 border-t border-neutral-border max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-neutral-border text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-bold text-pine text-base flex items-center gap-2">
                  <Send className="w-4 h-4 text-spring" />
                  {speakersAnnouncement.callForSpeakers.title}
                </h4>
                <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                  {speakersAnnouncement.callForSpeakers.description}
                </p>
              </div>
              <Button
                href={speakersAnnouncement.callForSpeakers.href}
                variant="primary"
                size="sm"
                className="flex-shrink-0"
              >
                {speakersAnnouncement.callForSpeakers.buttonText}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-navy/60 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              Keynotes on Arewa Visual Heritage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              Design Leadership & Studio Scale
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              AI & Technical Craft Masterclasses
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
