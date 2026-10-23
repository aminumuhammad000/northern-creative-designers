import React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { eventConfig } from "@/config/event";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function RegistrationCTASection() {
  const { finalCta } = landingPageContent;

  return (
    <section className="py-20 bg-neutral-sand relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-spring/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-pine text-white p-8 sm:p-14 border border-spring/30 shadow-xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
            <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
            <span>Attendee Registration Active</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {finalCta.title}
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {finalCta.subheadline}
            </p>
          </div>

          {/* Date & Location Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-2 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1">
              <Calendar className="w-4 h-4 text-spring" />
              <span>{finalCta.dateVenue}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              href={finalCta.primaryButtonText ? finalCta.primaryButtonHref : "/register"}
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
            >
              {finalCta.primaryButtonText}
            </Button>
            <Button
              href={finalCta.secondaryButtonHref}
              variant="outline"
              size="lg"
              className="text-white border-white/40 hover:bg-white/10"
              icon={<Download className="w-4 h-4" />}
            >
              {finalCta.secondaryButtonText}
            </Button>
          </div>

          {/* Trust credentials */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-spring" />
              Official Registration Portal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              Automated QR Ticket Issuance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              Powered by Amee Technology Ltd
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
