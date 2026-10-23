"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  PieChart,
  Building2,
  CreditCard,
  ArrowRight,
  ArrowDownRight,
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

export function PartnersSection() {
  const tierColorSchemes = [
    {
      bgClass: "bg-[#013811] text-white",
      titleClass: "text-white",
      priceClass: "text-spring",
      checkClass: "text-spring",
      btnClass: "bg-spring text-navy hover:bg-[#02b25b]",
      icon: <Crown className="w-5 h-5 text-spring" />,
    },
    {
      bgClass: "bg-[#453478] text-white",
      titleClass: "text-white",
      priceClass: "text-white",
      checkClass: "text-spring",
      btnClass: "bg-white text-[#453478] hover:bg-white/90",
      icon: <Sparkles className="w-5 h-5 text-spring" />,
    },
    {
      bgClass: "bg-[#F39200] text-white",
      titleClass: "text-white",
      priceClass: "text-white",
      checkClass: "text-white",
      btnClass: "bg-[#071135] text-white hover:bg-[#0c1b4d]",
      icon: <Award className="w-5 h-5 text-white" />,
    },
    {
      bgClass: "bg-[#00CC67] text-[#071135]",
      titleClass: "text-[#071135]",
      priceClass: "text-[#071135]",
      checkClass: "text-[#071135]",
      btnClass: "bg-[#071135] text-white hover:bg-[#0c1b4d]",
      icon: <Building2 className="w-5 h-5 text-[#071135]" />,
    },
  ];

  return (
    <section id="partners" className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading with Big Typography */}
        <div className="max-w-3xl mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
            Sponsorship Tiers &amp; Benefits.
          </h2>
          <p className="type-body text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
            Position your organization before Northern Nigeria&apos;s creative and technological ecosystem. We invite corporate partners and stakeholders to power regional design excellence.
          </p>
        </div>

        {/* 1. Official Sponsorship Tiers (4 Saturated Brand Palette Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 items-stretch">
          {sponsorshipTiers.map((tier, idx) => {
            const scheme = tierColorSchemes[idx] || tierColorSchemes[0];
            return (
              <div
                key={idx}
                className={`
                  group p-8 rounded-[2.25rem] ${scheme.bgClass} shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden
                `}
              >
                {/* Subtle inner ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 border border-white/20">
                      {tier.status}
                    </span>
                    {scheme.icon}
                  </div>

                  <h3 className={`text-2xl font-black mb-1 tracking-tight ${scheme.titleClass}`}>
                    {tier.tier}
                  </h3>
                  
                  <p className={`text-3xl sm:text-4xl font-black mb-6 tracking-tight ${scheme.priceClass}`}>
                    {tier.investment}
                  </p>

                  <ul className="space-y-3.5 text-xs sm:text-sm">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${scheme.checkClass}`} />
                        <span className="leading-relaxed opacity-90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 pt-6 mt-8 border-t border-current/20">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(tier.tier)}`}
                    className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-md ${scheme.btnClass}`}
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Customized In-Kind Partnerships (Halftone Canvas matching Reference Design) */}
        <div className="mb-24 p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm">
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

        {/* 3. Budget Breakdown & Financial Justification (PDF Page 12) */}
        <div className="mb-24 p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border shadow-sm">
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

        {/* 4. Official Corporate Bank Channel (PDF Page 15) */}
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
