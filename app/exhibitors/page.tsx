import React from "react";
import { Metadata } from "next";
import { Store, Layers, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Exhibitors & Summit Marketplace",
  description:
    "Showcase your studio, tech products, or creative services at Northern Creative Designers Summit 2.0 in Kano.",
};

export default function ExhibitorsPage() {
  const { exhibitors } = landingPageContent;

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Marketplace & Showcase"
        title="Exhibitor Directory & Guidelines"
        description="Connect directly with 500+ design practitioners, agency leads, and enterprise buyers on the summit floor."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-spring uppercase tracking-wider">
              Exhibitor Value Proposition
            </span>
            <h2 className="text-3xl font-bold text-pine leading-tight">
              An Immersive Space for Creative and Technical Brands
            </h2>
            <p className="text-navy/80 text-base leading-relaxed">
              The Summit Marketplace and Design Exhibition Wall provide approved studios,
              vendors, and SaaS providers with high-traffic showcase spaces to display
              products, conduct live software demos, sell design merchandise, and sign
              new client contracts.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-pine text-sm uppercase tracking-wider">
                Eligible Exhibitor Profiles:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exhibitors.typesAccepted.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-lg bg-neutral-sand border border-neutral-border text-xs sm:text-sm font-medium text-pine"
                  >
                    <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button href="/exhibitors/apply" variant="primary" size="lg">
                Apply for an Exhibition Booth
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-pine text-white space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-spring" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Booth Inclusions</h3>
                <p className="text-xs text-white/70 mt-1">
                  Each confirmed exhibition package includes:
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                  <span>Dedicated table, power outlet & high-speed Wi-Fi access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                  <span>2 Staff exhibitor passes with full access to sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                  <span>Featured listing in the digital summit attendee catalogue</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0 mt-0.5" />
                  <span>Access to the Client Connect Corner matching desk</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/15 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-spring inline mr-1" />
                Applications subject to committee curation to guarantee industry relevance.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
