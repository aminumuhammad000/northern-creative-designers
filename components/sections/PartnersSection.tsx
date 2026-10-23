"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  PieChart,
  Building2,
  CreditCard,
  ArrowRight,
  ArrowDownRight,
  ArrowDownCircle,
  ShieldCheck,
  Award,
  Sparkles,
  Crown,
} from "lucide-react";
import {
  eventConfig,
  sponsorshipTiers,
  customizedPartnerships,
  budgetBreakdown,
} from "@/config/event";

const tierCards = [
  {
    tier: "Headline Sponsor",
    investment: "₦2,000,000",
    status: "Exclusive (1 Available)",
    headline: "Headline\nSponsor",
    bgClass: "bg-[#013811]",
    tapeRotation: "-rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_1.png",
    accentColor: "text-spring",
    icon: <Crown className="w-5 h-5 text-spring" />,
    summary: "Exclusive naming rights, opening keynote address, and supreme branding across all stages and physical media.",
    benefits: [
      "Exclusive naming rights: 'NCD Summit 2.0 Presented by [Your Brand]'",
      "Keynote speaking slot during main opening ceremony",
      "Prominent logo placement on all stage backdrops, banners, and passes",
      "Roll-up banners and exhibition dominance across all event zones",
      "Lead feature in regional press releases and broadcast media",
    ],
    ctaHref: "/contact?subject=Headline+Sponsorship",
  },
  {
    tier: "Platinum Sponsor",
    investment: "₦1,000,000",
    status: "Premier Tier",
    headline: "Platinum\nSponsor",
    bgClass: "bg-[#453478]",
    tapeRotation: "rotate-1",
    tapeImage: "/images/pdf_extracted/tape_card_2.png",
    accentColor: "text-white",
    icon: <Sparkles className="w-5 h-5 text-spring" />,
    summary: "High-profile panel speaking slot, prime marketplace booth, and exclusive executive networking dinner access.",
    benefits: [
      "Official Platinum recognition on all summit marketing assets",
      "Speaking opportunity during high-profile panel session",
      "Prime exhibition booth space on the summit marketplace floor",
      "Branding on participant delegate kits and summit merchandise",
      "5 VIP passes for corporate executive delegation",
    ],
    ctaHref: "/contact?subject=Platinum+Sponsorship",
  },
  {
    tier: "Gold Sponsor",
    investment: "₦500,000",
    status: "Featured Tier",
    headline: "Gold\nSponsor",
    bgClass: "bg-[#F39200]",
    tapeRotation: "-rotate-2",
    tapeImage: "/images/pdf_extracted/tape_card_3.png",
    accentColor: "text-white",
    icon: <Award className="w-5 h-5 text-white" />,
    summary: "Dedicated exhibition booth, catalogue brand feature, and targeted brand reach among 1,000+ creators.",
    benefits: [
      "Recognition as Gold Sponsor on website and official backdrop",
      "Dedicated exhibition booth within the summit floor",
      "Logo placement in official print and digital delegate brochure",
      "3 Full-access delegate passes for your team",
      "Direct brand mention during summit keynote sessions",
    ],
    ctaHref: "/contact?subject=Gold+Sponsorship",
  },
  {
    tier: "Silver Sponsor",
    investment: "₦250,000",
    status: "Supporting Partner",
    headline: "Silver\nSponsor",
    bgClass: "bg-[#00CC67]",
    tapeRotation: "rotate-2",
    tapeImage: "/images/pdf_extracted/tape_card_4.png",
    accentColor: "text-[#071135]",
    icon: <Building2 className="w-5 h-5 text-[#071135]" />,
    summary: "Entry-level institutional visibility powering emerging talent and community design workshops.",
    benefits: [
      "Corporate logo feature on official summit partners wall",
      "Digital catalogue listing with direct business web link",
      "2 Standard delegate passes to all masterclasses",
      "Acknowledgement across social media channels",
      "Official certificate of regional design patronship",
    ],
    ctaHref: "/contact?subject=Silver+Sponsorship",
  },
];

export function PartnersSection() {
  const [activeTier, setActiveTier] = useState(tierCards[0]);

  return (
    <section id="partners" className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading with Big Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Sponsorship Tiers &amp; Benefits.
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Position your organization before Northern Nigeria&apos;s creative and technological ecosystem. We invite corporate partners and stakeholders to power regional design excellence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/NCD Summit 26.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-pine/30 text-pine text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-pine hover:bg-pine/5 transition-all shadow-xs"
            >
              <span>Partnership Deck (PDF)</span>
            </Link>
          </div>
        </div>

        {/* 1. Official Sponsorship Tiers: Adapted to Program Features Halftone Canvas & Taped Sticky Cards */}
        <div className="w-full rounded-[2.5rem] bg-[#F8FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-2xl overflow-hidden relative mb-24">
          
          {/* Top Title Bar with Arrow Down Circle and Floating 3D Torus */}
          <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00CC67] flex items-center justify-center text-[#00CC67]">
                <ArrowDownCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#013811] tracking-tight">
                  Sponsorship Architecture
                </h3>
                <p className="text-xs sm:text-sm text-navy/70 mt-1 font-medium">
                  Select a tier below to view verified deliverables and executive privileges
                </p>
              </div>
            </div>

            {/* 3D Iridescent Coil Element on the Top Right */}
            <div className="hidden lg:block absolute -top-10 right-4 w-64 h-64 z-10 pointer-events-none transition-transform duration-700 hover:rotate-6 hover:scale-105">
              <Image
                src="/images/pdf_extracted/vector_3d_torus.png"
                alt="Vector 3D Art Element"
                width={280}
                height={280}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Staggered Taped Sticky Cards Grid matching Program Features */}
          <div className="px-6 sm:px-12 md:px-16 pb-16 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-start">
              {tierCards.map((tier, idx) => {
                const isSelected = activeTier.tier === tier.tier;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTier(tier)}
                    className={`
                      group relative p-6 sm:p-8 ${tier.bgClass} text-white shadow-xl
                      hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                      transition-all duration-300 ease-out cursor-pointer
                      rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[2.5rem]
                      ${isSelected ? "ring-4 ring-spring/60 scale-[1.02] -translate-y-1" : ""}
                    `}
                  >
                    {/* Brown Craft Tape on Top */}
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#CA8A04]/80 border-y border-[#A16207] shadow-sm transform ${tier.tapeRotation} pointer-events-none rounded-xs`} />
                    
                    {/* Dog-ear fold corner indicator */}
                    <div className="absolute bottom-0 left-0 w-7 h-7 bg-black/25 rounded-tr-xl pointer-events-none" />

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                        {tier.status}
                      </span>
                      {tier.icon}
                    </div>

                    <h4 className="text-2xl font-black text-white tracking-tight leading-snug whitespace-pre-line mb-1">
                      {tier.headline}
                    </h4>

                    <p className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                      {tier.investment}
                    </p>

                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-normal mb-5">
                      {tier.summary}
                    </p>

                    <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold underline group-hover:text-spring transition-colors">
                        {isSelected ? "Active View" : "Click to Inspect"}
                      </span>
                      <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Tier Interactive Detail Callout */}
            <div className="mt-12 p-6 sm:p-10 rounded-[2rem] bg-white border border-neutral-border shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-border/60">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${activeTier.bgClass} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    {activeTier.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-pine/70 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      {activeTier.status}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-pine mt-0.5 tracking-tight">
                      {activeTier.tier} — {activeTier.investment}
                    </h4>
                  </div>
                </div>

                <Link
                  href={activeTier.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
                >
                  <span>Select {activeTier.tier}</span>
                  <ArrowRight className="w-4 h-4 text-spring" />
                </Link>
              </div>

              <div className="pt-6">
                <p className="text-xs font-bold text-pine uppercase tracking-wider mb-4">
                  Complete Deliverables &amp; Sponsor Entitlements:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeTier.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-navy/85">
                      <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Customized In-Kind Partnerships */}
        <div className="mb-24 p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Customized In-Kind Partnerships
            </h3>
            <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
              We welcome tailored in-kind contributions to equip hackathon competitors, provide tool perks, and power hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizedPartnerships.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[2rem] bg-white border border-neutral-border shadow-xs hover:border-spring hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pine/5 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-tangerine" />
                  </div>
                  <h4 className="font-black text-pine text-lg mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Budget Breakdown & Financial Justification */}
        <div className="mb-24 p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#F8FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
                Budget Breakdown &amp; Financial Justification
              </h3>
              <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
                Estimated event budget allocation ensuring disciplined stewardship of sponsor funds.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-pine bg-white px-4 py-2 rounded-full border border-neutral-border shadow-xs">
              <PieChart className="w-4 h-4 text-spring" />
              <span>100% Accountable Allocation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[2rem] bg-white border border-neutral-border hover:-translate-y-1 hover:border-pine/30 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-pine uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-pine text-spring font-mono">
                      {item.allocation}%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed font-normal">
                    {item.deliverables}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-border/60">
                  <div className="w-full bg-neutral-border/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-spring h-2 rounded-full"
                      style={{ width: `${item.allocation * 2}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Official Corporate Bank Channel */}
        <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#013811] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Official Corporate Bank Channel
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">
              Partners may opt for a structured installment payment plan. Full commitment confirmation and brand asset submissions must be finalized 14 days before the event to guarantee inclusion across physical print runs and summit backdrops.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-spring flex-shrink-0" />
              <span>Registered Corporate Entity: {eventConfig.secretariat.rcNumber}</span>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-white/10 border border-white/15 text-xs sm:text-sm space-y-4 w-full lg:w-auto min-w-[340px] relative z-10">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Account Name:</span>
              <span className="font-bold text-white font-mono">
                {eventConfig.banking.accountName}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-white/70">Bank Name:</span>
              <span className="font-bold text-spring font-mono text-base">
                {eventConfig.banking.bankName}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-white/70">Account Number:</span>
              <span className="font-black text-white font-mono tracking-wider text-xl">
                {eventConfig.banking.accountNumber}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
