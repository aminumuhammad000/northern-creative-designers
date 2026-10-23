import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { eventConfig } from "@/config/event";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { hero } = landingPageContent;

  return (
    <section className="relative overflow-hidden bg-neutral-sand border-b border-neutral-border pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Graphic Accents using Brand Spring and Tangerine */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-spring/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-tangerine/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Decorative Brand Vectors */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block select-none">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#013811" strokeWidth="4" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#013811" strokeWidth="3" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#013811" strokeWidth="3" />
          <rect x="60" y="60" width="80" height="80" stroke="#03d06b" strokeWidth="3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Message & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge with Pine border & Spring dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pine/15 shadow-xs text-xs font-semibold text-pine">
              <span className="w-2 h-2 rounded-full bg-spring" />
              <span>{hero.badge}</span>
              <span className="text-neutral-border">•</span>
              <span className="text-tangerine font-bold">Summit 2.0</span>
            </div>

            {/* Main Theme Headline (Type-Display & Type-Subheading) */}
            <div className="space-y-2">
              <h1 className="type-display text-pine leading-[1.02]">
                {hero.themeHeadline}
              </h1>
              <p className="type-subheading text-tangerine">
                {hero.themeSubheadline}
              </p>
            </div>

            {/* Event Description (Type-Body) */}
            <p className="type-body text-navy/80 max-w-2xl text-base sm:text-lg leading-relaxed">
              {hero.description}
            </p>

            {/* Date, Venue & Registration Status Badges */}
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-pine shadow-xs">
                <Calendar className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{eventConfig.date}</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-pine shadow-xs">
                <MapPin className="w-4 h-4 text-tangerine flex-shrink-0" />
                <span>{eventConfig.venue}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-spring/15 border border-spring/30 text-xs font-semibold text-pine">
                <span className="w-1.5 h-1.5 rounded-full bg-spring" />
                <span>Attendee Registrations Open</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href={hero.primaryCta.href}
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-4 h-4" />}
              >
                {hero.primaryCta.text}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {hero.secondaryCta.text}
              </Button>
            </div>

            {/* Trust and Partner Credentials */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-navy/70 border-t border-neutral-border/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-spring" />
                <span>RC: {siteConfig.organization.rcNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-spring" />
                <span>Executive Committee Organized</span>
              </div>
              <div className="flex items-center gap-1.5 text-pine font-medium">
                <span>Tech Partner:</span>
                <a
                  href={siteConfig.technologyPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pine font-semibold hover:underline inline-flex items-center gap-0.5"
                >
                  Amee Technology Ltd
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Official Brand Assets */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl bg-white border border-neutral-border p-6 shadow-lg space-y-6">
                {/* Header of the visual card */}
                <div className="flex items-center justify-between border-b border-neutral-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pine p-2 flex items-center justify-center">
                      <Image
                        src="/images/logos/symbol-mark.png"
                        alt="NCD Mark"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-pine text-sm">Northern Creative</p>
                      <p className="text-[11px] text-navy/60">Summit 2.0 Identity Board</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-spring/15 text-pine font-semibold text-xs border border-spring/30">
                    Roots & Vectors
                  </span>
                </div>

                {/* Official Brand Banner Asset Preview */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-pine border border-pine/20">
                  <Image
                    src="/images/brand/northern-creative-designers-banner.png"
                    alt="Northern Creative Designers Official Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-medium">
                      Preserving Northern visual heritage • Powering digital futures
                    </p>
                  </div>
                </div>

                {/* Quick Event Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-lg bg-neutral-sand border border-neutral-border">
                    <p className="text-xs text-navy/60 font-medium">Flagship Format</p>
                    <p className="font-bold text-pine text-sm mt-0.5">Practical Build & Sprints</p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-sand border border-neutral-border">
                    <p className="text-xs text-navy/60 font-medium">Live Hackathon</p>
                    <p className="font-bold text-pine text-sm mt-0.5">2-Hour Live Sprint</p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-sand border border-neutral-border">
                    <p className="text-xs text-navy/60 font-medium">Business Direct</p>
                    <p className="font-bold text-pine text-sm mt-0.5">Client Connect Corner</p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-sand border border-neutral-border">
                    <p className="text-xs text-navy/60 font-medium">Recognition</p>
                    <p className="font-bold text-pine text-sm mt-0.5">Exhibition & Awards</p>
                  </div>
                </div>

                {/* Official Wordmark Lockup at the bottom with 50% clearspace */}
                <div className="pt-2 border-t border-neutral-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/logos/wordmark-pine.png"
                      alt="Northern Creative Designers"
                      width={120}
                      height={32}
                      className="object-contain h-6 w-auto"
                    />
                  </div>
                  <Link
                    href="/about"
                    className="text-xs font-semibold text-pine hover:text-spring flex items-center gap-1 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
