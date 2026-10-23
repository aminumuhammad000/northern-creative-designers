import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  PieChart,
  Building2,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import {
  eventConfig,
  sponsorshipTiers,
  customizedPartnerships,
  budgetBreakdown,
} from "@/config/event";

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 md:py-32 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Big Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-spring" />
            <span>Sponsorship &amp; Partnerships</span>
          </div>
          <h2 className="type-section-title text-pine font-black tracking-tight">
            Sponsorship Tiers &amp; Benefits.
          </h2>
          <p className="type-body text-navy/75 text-base sm:text-xl mt-3 leading-relaxed">
            Position your organization before Northern Nigeria&apos;s creative and technological ecosystem. We invite corporate partners and stakeholders to power regional design excellence.
          </p>
        </div>

        {/* 1. Official Sponsorship Tiers (Chowdeck-Style Chunky Pricing Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {sponsorshipTiers.map((tier, idx) => {
            const isHeadline = tier.tier.includes("Headline");
            return (
              <div
                key={idx}
                className={`p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isHeadline
                    ? "bg-pine text-white shadow-lg ring-2 ring-spring"
                    : "bg-[#FAFAF8] text-navy border border-neutral-border hover:border-spring"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        isHeadline
                          ? "bg-spring text-navy"
                          : "bg-pine/10 text-pine"
                      }`}
                    >
                      {tier.status}
                    </span>
                    {isHeadline && <Sparkles className="w-4 h-4 text-spring" />}
                  </div>

                  <h3
                    className={`text-2xl font-black mb-1 ${
                      isHeadline ? "text-white" : "text-pine"
                    }`}
                  >
                    {tier.tier}
                  </h3>
                  <p
                    className={`text-3xl sm:text-4xl font-black mb-6 tracking-tight ${
                      isHeadline ? "text-spring" : "text-pine"
                    }`}
                  >
                    {tier.investment}
                  </p>

                  <ul className="space-y-3.5 text-xs sm:text-sm">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isHeadline ? "text-spring" : "text-pine"
                          }`}
                        />
                        <span
                          className={`leading-relaxed ${
                            isHeadline ? "text-white/85" : "text-navy/80"
                          }`}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-8 border-t border-neutral-border/40">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(tier.tier)}`}
                    className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                      isHeadline
                        ? "bg-spring text-navy hover:bg-[#02b25b]"
                        : "bg-white border-2 border-pine text-pine hover:bg-pine hover:text-white"
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Customized In-Kind Partnerships (Adapted from PDF Page 11) */}
        <div className="mb-24 p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold text-tangerine uppercase tracking-wider px-3.5 py-1 rounded-full bg-tangerine/10">
              Tailored Collaboration
            </span>
            <h3 className="type-subheading text-pine text-2xl sm:text-3xl mt-2 font-black">
              Customized Partnership Options
            </h3>
            <p className="type-body text-navy/70 text-sm sm:text-base mt-2">
              We also welcome tailored in-kind partnerships to empower hackathon competitors and participants:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizedPartnerships.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-neutral-border space-y-3 hover:border-spring hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-pine/5 flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-tangerine" />
                </div>
                <h4 className="font-extrabold text-pine text-base sm:text-lg">
                  {item.title}
                </h4>
                <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                  {item.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Budget Breakdown & Financial Justification (Adapted from PDF Page 12) */}
        <div className="mb-24 p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-white border border-neutral-border shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold text-pine uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-pine/5 border border-pine/10">
                Financial Transparency
              </span>
              <h3 className="type-heading text-pine mt-3 font-black">
                Budget Breakdown &amp; Financial Justification
              </h3>
              <p className="type-body text-navy/70 text-sm sm:text-base mt-2">
                Estimated event budget allocation ensuring disciplined stewardship of sponsor funds.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-pine bg-pine/5 px-4 py-2 rounded-full border border-pine/10">
              <PieChart className="w-4 h-4 text-spring" />
              <span>100% Accountable Allocation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAFAF8] border border-neutral-border hover:-translate-y-1 hover:border-pine/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-pine uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-pine text-spring font-mono">
                      {item.allocation}%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                    {item.deliverables}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-border/60">
                  <div className="w-full bg-neutral-border rounded-full h-2 overflow-hidden">
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

        {/* 4. Official Banking & Onboarding Terms (Adapted from PDF Page 15) */}
        <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-spring text-xs font-bold uppercase tracking-wider">
              Onboarding &amp; Terms
            </span>
            <h3 className="type-subheading text-white text-2xl sm:text-3xl font-black">
              Official Corporate Bank Channel
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Partners may opt for a structured installment payment plan. Full commitment confirmation and brand asset submissions must be finalized 14 days before the event to guarantee inclusion across physical print runs and summit backdrops.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-spring flex-shrink-0" />
              <span>Registered Corporate Entity: {eventConfig.secretariat.rcNumber}</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white/10 border border-white/15 text-xs sm:text-sm space-y-3.5 w-full lg:w-auto min-w-[340px]">
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
              <span className="font-black text-white font-mono tracking-wider text-lg">
                {eventConfig.banking.accountNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
