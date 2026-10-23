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
import { Button } from "@/components/ui/Button";

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 md:py-28 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-pine uppercase tracking-wider px-3 py-1 rounded-full bg-pine/5 border border-pine/10">
            Sponsorship &amp; Partnerships
          </span>
          <h2 className="type-heading text-pine mt-3">
            Sponsorship Tiers &amp; Benefits
          </h2>
          <p className="type-body text-navy/75 text-base sm:text-lg mt-3 leading-relaxed">
            We invite corporate partners, brand sponsors, and community stakeholders to join us in powering Northern Nigeria&apos;s creative economy.
          </p>
        </div>

        {/* 1. Official Sponsorship Tiers (Adapted from PDF Pages 09 & 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {sponsorshipTiers.map((tier, idx) => {
            const isHeadline = tier.tier.includes("Headline");
            return (
              <div
                key={idx}
                className={`p-7 rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isHeadline
                    ? "bg-pine text-white shadow-md ring-2 ring-spring"
                    : "bg-[#FAFAF8] text-navy border border-neutral-border hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
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
                    className={`text-xl font-bold mb-1 ${
                      isHeadline ? "text-white" : "text-pine"
                    }`}
                  >
                    {tier.tier}
                  </h3>
                  <p
                    className={`text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight ${
                      isHeadline ? "text-spring" : "text-pine"
                    }`}
                  >
                    {tier.investment}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm">
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
                    className={`w-full inline-flex items-center justify-center py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                      isHeadline
                        ? "bg-spring text-navy hover:bg-[#02b25b]"
                        : "bg-white border border-pine/30 text-pine hover:bg-pine hover:text-white"
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
        <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-[#FAFAF8] border border-neutral-border">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-tangerine uppercase tracking-wider">
              Tailored Collaboration
            </span>
            <h3 className="type-subheading text-pine mt-1">
              Customized Partnership Options
            </h3>
            <p className="type-body text-navy/70 text-sm mt-2">
              We also welcome tailored in-kind partnerships to empower hackathon competitors and participants:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {customizedPartnerships.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-neutral-border space-y-2 hover:border-spring/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-pine/5 flex items-center justify-center mb-3">
                  <Award className="w-4 h-4 text-tangerine" />
                </div>
                <h4 className="font-bold text-pine text-sm sm:text-base">
                  {item.title}
                </h4>
                <p className="text-navy/75 text-xs leading-relaxed">
                  {item.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Budget Breakdown & Financial Justification (Adapted from PDF Page 12) */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-semibold text-pine uppercase tracking-wider px-3 py-1 rounded-full bg-pine/5 border border-pine/10">
                Financial Transparency
              </span>
              <h3 className="type-heading text-pine mt-3">
                Budget Breakdown &amp; Financial Justification
              </h3>
              <p className="type-body text-navy/70 text-sm mt-2">
                Estimated event budget allocation ensuring disciplined stewardship of sponsor funds.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-pine/70 bg-pine/5 px-3 py-1.5 rounded-full border border-pine/10">
              <PieChart className="w-4 h-4 text-spring" />
              <span>100% Accountable Allocation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {budgetBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAFAF8] border border-neutral-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-pine uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-pine text-spring font-mono">
                      {item.allocation}%
                    </span>
                  </div>
                  <p className="text-xs text-navy/75 leading-relaxed">
                    {item.deliverables}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-border/60">
                  <div className="w-full bg-neutral-border rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-spring h-1.5 rounded-full"
                      style={{ width: `${item.allocation * 2}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Official Banking & Onboarding Terms (Adapted from PDF Page 15) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-spring text-xs font-semibold uppercase tracking-wider">
              Onboarding &amp; Terms
            </span>
            <h3 className="type-subheading text-white">
              Official Corporate Bank Channel
            </h3>
            <p className="text-sm text-white/85 leading-relaxed">
              Partners may opt for a structured installment payment plan. Full commitment confirmation and brand asset submissions (logos, vector brand guidelines) must be finalized 14 days before the event to guarantee inclusion across physical print runs and summit backdrops.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-spring flex-shrink-0" />
              <span>Registered Corporate Entity: {eventConfig.secretariat.rcNumber}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm space-y-3 w-full lg:w-auto min-w-[320px]">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-white/70">Account Name:</span>
              <span className="font-bold text-white font-mono">
                {eventConfig.banking.accountName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-white/70">Bank Name:</span>
              <span className="font-bold text-spring font-mono">
                {eventConfig.banking.bankName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-white/70">Account Number:</span>
              <span className="font-bold text-white font-mono tracking-wider text-base">
                {eventConfig.banking.accountNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
