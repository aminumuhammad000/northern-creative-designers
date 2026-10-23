import React from "react";
import { Metadata } from "next";
import {
  CheckCircle2,
  Building2,
  Sparkles,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partners & Sponsors",
  description:
    "Partner with Northern Creative Designers Summit 2.0. Explore our sponsorship tiers and customized partnership opportunities.",
};

export default function PartnersPage() {
  const { sponsorship } = landingPageContent;

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Ecosystem Alignment"
        title="Partners & Sponsors"
        description="Co-invest in the future of Northern Nigeria's creative economy. Connect your brand with 500+ design leaders, developers, and tech innovators."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Sponsorship Tiers */}
        <section id="sponsor-tiers" className="space-y-8">
          <div>
            <span className="text-xs font-bold text-spring uppercase tracking-wider">
              Investment Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-pine mt-1">
              Summit 2.0 Corporate Sponsorship Packages
            </h2>
            <p className="text-sm sm:text-base text-navy/75 max-w-2xl mt-1">
              Designed for maximum brand visibility, executive access, and tangible ROI across Northern Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorship.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 flex flex-col justify-between ${
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
                  <h3
                    className={`text-xl font-bold ${
                      tier.featured ? "text-white" : "text-pine"
                    }`}
                  >
                    {tier.name}
                  </h3>
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
                        <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
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
                    Partner as {tier.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banking and Terms */}
        <section className="p-8 rounded-2xl bg-pine text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-spring text-xs font-semibold uppercase tracking-wider">
              Direct Corporate Remittance
            </span>
            <h3 className="text-2xl font-bold text-white">
              Official Bank Account Details
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Official invoices and memoranda of understanding are issued upon commitment confirmation.
            </p>
            <p className="text-xs text-white/60 italic pt-1">
              Full commitment confirmation and asset submissions must be finalized 14 days before the event for print runs.
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
        </section>
      </div>
    </main>
  );
}
