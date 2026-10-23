"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Building2,
  ArrowRight,
  ArrowDownRight,
  ArrowDownCircle,
  Award,
  Sparkles,
} from "lucide-react";
import {
  eventConfig,
  sponsorshipTiers,
  customizedPartnerships,
} from "@/config/event";

const tierCards = [
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

  const inKindFlipStyles = [
    {
      backBg: "bg-[#F39200]",
      backText: "text-white",
      badge: "Prize Hardware & Cash",
    },
    {
      backBg: "bg-[#453478]",
      backText: "text-white",
      badge: "Software & Cloud Credits",
    },
    {
      backBg: "bg-[#00CC67]",
      backText: "text-[#071135]",
      badge: "Regional Broadcast Reach",
    },
    {
      backBg: "bg-[#013811]",
      backText: "text-white",
      badge: "Hospitality & Networking",
    },
  ];

  return (
    <section id="partners" className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading with Big Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Partners &amp; Sponsors.
            </h2>
            <p className="type-body text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
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

        {/* Featured Official Software Partner Card: AMEE TECHNOLOGY LTD */}
        <div className="mb-14 p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-pine text-white border-2 border-spring shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-spring/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spring text-navy text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lead Technology &amp; Software Partner</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Amee Technology Ltd
              </h3>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
                Official software engineering partner powering the Northern Creative Designers Summit 2.0 digital architecture. Delivering enterprise registration pipelines, real-time attendee verification, digital ticketing, and interactive live voting.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://ameetechnology.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-pine hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Visit ameetechnology.com.ng</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pine" />
                </a>
                <span className="text-xs text-spring font-mono">
                  ✦ Trusted Software &amp; Cloud Infrastructure
                </span>
              </div>
            </div>

            {/* Partner Flyer Preview / Callout Box */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/40 group">
                <div className="aspect-[4/5] relative w-full overflow-hidden">
                  <Image
                    src="/images/brand/software_partner_amee.jpg"
                    alt="Amee Technology Ltd Software Partner with Northern Creative Designers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <p className="font-bold">Official Software Partner</p>
                    <p className="text-white/70 text-[11px]">Amee Technology Ltd × NCD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem & Previous Supporting Partners */}
        <div className="mb-20 p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-neutral-border shadow-xs">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-pine/70 mb-4 text-center">
            Recognised Financial, Technology &amp; Ecosystem Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="px-5 py-3 rounded-xl bg-white border border-neutral-border shadow-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-spring" />
              <span className="font-bold text-sm text-pine">Amee Technology Ltd</span>
              <span className="text-[10px] font-mono text-pine/60 bg-pine/5 px-2 py-0.5 rounded-full">Software</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-white border border-neutral-border shadow-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-tangerine" />
              <span className="font-bold text-sm text-pine">KUDA Microfinance Bank</span>
              <span className="text-[10px] font-mono text-pine/60 bg-pine/5 px-2 py-0.5 rounded-full">Banking</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-white border border-neutral-border shadow-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-pine" />
              <span className="font-bold text-sm text-pine">Innovate Arewa Alliance</span>
              <span className="text-[10px] font-mono text-pine/60 bg-pine/5 px-2 py-0.5 rounded-full">Ecosystem</span>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
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
            <div className="mt-12 p-6 sm:p-10 rounded-[2rem] bg-white border border-neutral-border shadow-xl max-w-5xl mx-auto">
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

        {/* 2. Customized In-Kind Partnerships: 3D Flip Card Effect with Dynamic Color Change on Hover */}
        <div className="mb-24 p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Customized In-Kind Partnerships
            </h3>
            <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
              We welcome tailored in-kind contributions to equip hackathon competitors, provide tool perks, and power hospitality. <span className="font-semibold text-pine">Hover over any card below to flip and inspect full deliverables.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizedPartnerships.map((item, idx) => {
              const style = inKindFlipStyles[idx % inKindFlipStyles.length];
              return (
                <div
                  key={idx}
                  className="group [perspective:1000px] h-[300px] sm:h-[320px] w-full cursor-pointer"
                >
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[2rem] shadow-sm hover:shadow-xl">
                    
                    {/* FRONT FACE (Clean White Card) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2rem] p-7 bg-white border border-neutral-border flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-pine/5 flex items-center justify-center">
                            <Award className="w-6 h-6 text-tangerine" />
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-pine border border-neutral-200">
                            In-Kind Tier
                          </span>
                        </div>
                        
                        <h4 className="font-black text-pine text-xl mb-2.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-navy/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {item.deliverable}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-border/60 flex items-center justify-between text-xs font-mono text-pine/80 font-bold">
                        <span className="flex items-center gap-1.5 text-pine">
                          <Sparkles className="w-3.5 h-3.5 text-spring" />
                          Hover to flip
                        </span>
                        <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* BACK FACE (Vibrant Brand Color Change on Flip) */}
                    <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2rem] p-7 ${style.backBg} ${style.backText} flex flex-col justify-between shadow-2xl`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs">
                            {style.badge}
                          </span>
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>

                        <h4 className="font-black text-lg mb-2 leading-tight">
                          {item.title}
                        </h4>
                        
                        <p className="text-xs sm:text-sm leading-relaxed font-normal opacity-95">
                          {item.deliverable}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/20">
                        <Link
                          href="/contact?subject=In-Kind+Partnership"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-pine font-extrabold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                          <span>Propose Partnership</span>
                          <ArrowRight className="w-3.5 h-3.5 text-spring" />
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
