import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  CreditCard,
  ArrowRight,
  Shield,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function PartnersSection() {
  const { sponsorship } = landingPageContent;

  return (
    <section id="partners" className="py-20 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={sponsorship.tag}
          title={sponsorship.title}
          description={sponsorship.description}
          centered
          className="mb-16"
        />

        {/* 1. Official Sponsorship Tiers */}
        <div id="sponsor-tiers" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-pine">
              Summit 2.0 Sponsorship Packages
            </h3>
            <p className="text-sm text-navy/70 mt-2">
              Position your organization before Northern Nigeria&apos;s creative and
              technological ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorship.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                  tier.featured
                    ? "bg-pine text-white shadow-lg ring-2 ring-spring"
                    : "bg-neutral-sand text-navy border border-neutral-border hover:shadow-md"
                }`}
              >
                <div>
                  {tier.featured && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-spring text-navy uppercase tracking-wider mb-3">
                      Exclusive Naming Rights
                    </span>
                  )}
                  <h4
                    className={`text-xl font-bold ${
                      tier.featured ? "text-white" : "text-pine"
                    }`}
                  >
                    {tier.name}
                  </h4>
                  <p
                    className={`text-2xl sm:text-3xl font-extrabold mt-2 mb-6 ${
                      tier.featured ? "text-spring" : "text-pine"
                    }`}
                  >
                    {tier.price}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5 text-spring"
                        />
                        <span
                          className={tier.featured ? "text-white/85" : "text-navy/80"}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-border/40">
                  <Button
                    href="/contact?subject=sponsorship-enquiry"
                    variant={tier.featured ? "primary" : "secondary"}
                    size="sm"
                    className="w-full"
                  >
                    Select {tier.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. In-Kind & Tailored Partnership Options */}
        <div className="mb-16 p-8 rounded-2xl bg-neutral-sand border border-neutral-border">
          <h4 className="text-lg font-bold text-pine mb-4">
            Customized In-Kind Partnership Options
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorship.customizedPartnerships.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-neutral-border space-y-1.5"
              >
                <h5 className="font-bold text-pine text-sm">{item.title}</h5>
                <p className="text-xs text-navy/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Official Banking & Onboarding Terms */}
        <div className="p-8 rounded-2xl bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-spring text-xs font-semibold uppercase tracking-wider">
              Official Partner Onboarding
            </span>
            <h4 className="text-2xl font-bold text-white">
              Official Sponsorship Payment Channel
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              All financial commitments are processed directly through the official
              Northern Creative Designers account.
            </p>
            <p className="text-xs text-white/60 italic pt-1">
              {sponsorship.bankDetails.note}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm space-y-2 w-full lg:w-auto min-w-[280px]">
            <div className="flex justify-between items-center py-1 border-b border-white/15">
              <span className="text-white/70">Account Name:</span>
              <span className="font-bold text-white font-mono">
                {sponsorship.bankDetails.accountName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/15">
              <span className="text-white/70">Bank Name:</span>
              <span className="font-bold text-spring font-mono">
                {sponsorship.bankDetails.bankName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white/70">Account Number:</span>
              <span className="font-bold text-white font-mono tracking-wider text-base">
                {sponsorship.bankDetails.accountNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
