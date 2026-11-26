"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  ArrowRight,
  ArrowDownRight,
  Award,
  Globe,
  ExternalLink,
} from "lucide-react";
import { customizedPartnerships } from "@/config/event";

// Sponsorship tiers without Platinum as requested
const tierCards = [
  {
    tier: "Gold Sponsor",
    investment: "₦500,000",
    status: "Featured Tier",
    headline: "Gold\nSponsor",
    bgClass: "bg-[#F39200]",
    tapeRotation: "-rotate-2",
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

// Vertical partner list items with profile icon, name, type, and optional website
const partnersList = [
  {
    name: "Amee Technology Ltd",
    type: "Software & Technology Partner",
    website: "https://ameetechnology.com.ng",
  },
  {
    name: "KUDA Microfinance Bank",
    type: "Banking & Financial Partner",
    website: "https://kuda.com",
  },
  {
    name: "Innovate Arewa Alliance",
    type: "Ecosystem Partner",
    website: null,
  },
];

interface PartnersSectionProps {
  showHeader?: boolean;
}

export function PartnersSection({ showHeader = true }: PartnersSectionProps) {
  const [activeTier, setActiveTier] = useState(tierCards[0]);

  const inKindFlipStyles = [
    {
      backBg: "bg-[#F39200]",
      backText: "text-white",
      badge: "Hardware & Cash",
    },
    {
      backBg: "bg-[#453478]",
      backText: "text-white",
      badge: "Software & Cloud",
    },
    {
      backBg: "bg-[#00CC67]",
      backText: "text-[#071135]",
      badge: "Broadcast Reach",
    },
    {
      backBg: "bg-[#013811]",
      backText: "text-white",
      badge: "Hospitality",
    },
  ];

  return (
    <section id="partners" className={`w-full ${showHeader ? "py-16 md:py-24" : "py-8 md:py-12"} bg-white border-b border-neutral-border relative overflow-hidden`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading or Quick Actions */}
        {showHeader && (
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
                Partners &amp; Sponsors.
              </h2>
              <p className="type-body text-navy/75 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                Position your organization before Northern Nigeria&apos;s creative and technological ecosystem. We invite corporate partners and stakeholders to power regional design excellence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact?subject=Sponsorship+Enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-spring text-navy text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <span>Register as a Sponsor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/NCD Summit 26.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-pine/30 text-pine text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-pine hover:bg-pine/5 transition-all shadow-xs"
              >
                <span>Partnership Deck (PDF)</span>
              </Link>
            </div>
          </div>
        )}

        {/* Vertical Partners List: Profile Icon, Name, Type of Partnership */}
        <div className="mb-16">
          <div className="flex flex-col space-y-3 max-w-3xl mx-auto">
            {partnersList.map((partner, index) => {
              const Content = (
                <div
                  className={`p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-center justify-between gap-4 transition-all ${
                    partner.website
                      ? "hover:border-pine hover:shadow-md cursor-pointer group"
                      : "cursor-default"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-pine/5 text-pine flex items-center justify-center font-bold text-sm shrink-0 border border-pine/10 group-hover:bg-pine group-hover:text-spring transition-colors">
                      {partner.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-pine truncate group-hover:text-pine-light transition-colors">
                        {partner.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                        {partner.type}
                      </p>
                    </div>
                  </div>

                  {partner.website ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-pine/70 group-hover:text-pine shrink-0">
                      <span className="hidden sm:inline">Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                  )}
                </div>
              );

              if (partner.website) {
                return (
                  <a
                    key={index}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none"
                  >
                    {Content}
                  </a>
                );
              }

              return <div key={index}>{Content}</div>;
            })}
          </div>
        </div>

        {/* 1. Official Sponsorship Tiers: Clean, No Background Canvas */}
        <div className="w-full mb-20">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-black text-[#013811] tracking-tight">
              Sponsorship Architecture
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
              Select a tier below to view verified deliverables and executive privileges
            </p>
          </div>

          {/* Staggered Taped Sticky Cards Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {tierCards.map((tier, idx) => {
                const isSelected = activeTier.tier === tier.tier;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTier(tier)}
                    className={`
                      group relative p-6 sm:p-8 ${tier.bgClass} text-white shadow-lg
                      hover:-translate-y-1.5 hover:shadow-xl
                      transition-all duration-300 ease-out cursor-pointer
                      rounded-2xl
                      ${isSelected ? "ring-4 ring-pine/30 scale-[1.02] -translate-y-1" : ""}
                    `}
                  >
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
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-neutral-100">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${activeTier.bgClass} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                    {activeTier.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pine/70 bg-pine/5 px-2 py-0.5 rounded-full">
                      {activeTier.status}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-pine mt-0.5 tracking-tight">
                      {activeTier.tier} — {activeTier.investment}
                    </h4>
                  </div>
                </div>

                <Link
                  href={activeTier.ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-xs flex-shrink-0"
                >
                  <span>Select {activeTier.tier}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-spring" />
                </Link>
              </div>

              <div className="pt-5">
                <p className="text-xs font-bold text-pine uppercase tracking-wider mb-3">
                  Deliverables &amp; Sponsor Entitlements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTier.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Customized In-Kind Partnerships: Cleaned & Polished */}
        <div className="p-6 sm:p-10 rounded-2xl bg-neutral-50/70 border border-neutral-200">
          <div className="max-w-2xl mb-8 space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Customized In-Kind Partnerships
            </h3>
            <p className="type-body text-neutral-600 text-xs sm:text-sm leading-relaxed">
              We welcome tailored in-kind contributions to equip hackathon competitors, provide tool perks, and power hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {customizedPartnerships.map((item, idx) => {
              const style = inKindFlipStyles[idx % inKindFlipStyles.length];
              return (
                <div
                  key={idx}
                  className="group [perspective:1000px] h-[280px] w-full cursor-pointer"
                >
                  <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-xs hover:shadow-md">
                    
                    {/* FRONT FACE (Clean White Card, without In-Kind Tier badge or hover icon) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl p-6 bg-white border border-neutral-200 flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-pine/5 flex items-center justify-center mb-4 text-pine">
                          <Award className="w-5 h-5 text-pine" />
                        </div>
                        
                        <h4 className="font-bold text-pine text-lg mb-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed line-clamp-4">
                          {item.deliverable}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-medium">
                        <span>Details</span>
                        <ArrowDownRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    </div>

                    {/* BACK FACE (Vibrant Color, with compact Propose button) */}
                    <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-6 ${style.backBg} ${style.backText} flex flex-col justify-between shadow-lg`}>
                      <div>
                        <div className="mb-2.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                            {style.badge}
                          </span>
                        </div>

                        <h4 className="font-bold text-base mb-1.5 leading-tight">
                          {item.title}
                        </h4>
                        
                        <p className="text-xs leading-relaxed font-normal opacity-90 line-clamp-4">
                          {item.deliverable}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/20">
                        <Link
                          href="/contact?subject=In-Kind+Partnership"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-white text-pine font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 transition-all shadow-xs"
                        >
                          <span>Propose</span>
                          <ArrowRight className="w-3 h-3 text-pine" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
