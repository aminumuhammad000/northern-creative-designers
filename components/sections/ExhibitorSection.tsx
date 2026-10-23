import React from "react";
import Link from "next/link";
import {
  Store,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingPageContent } from "@/content/landing-page";
import { Button } from "@/components/ui/Button";

export function ExhibitorSection() {
  const { exhibitors } = landingPageContent;

  return (
    <section id="exhibitors" className="py-20 md:py-28 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              title="Client Connect Corner & Exhibition Marketplace"
              description="Bridge the gap between elite regional creative talent and paying business founders, tech enterprises, and agencies across Northern Nigeria."
            />

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-pine uppercase tracking-wider">
                Exhibitor &amp; Vendor Categories:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Design Studios & Brand Agencies",
                  "Printing, Merch & Packaging Vendors",
                  "Hardware, Drawing Tablets & Gadgets",
                  "Design Schools, EdTech & Bootcamps",
                  "SaaS, Creative Software & Cloud Providers",
                  "Artisanal Crafts, Apparel & Culture Brands",
                ].map((type, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAF8] border border-neutral-border text-xs sm:text-sm font-medium text-pine"
                  >
                    <CheckCircle className="w-4 h-4 text-spring flex-shrink-0" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href="/exhibitors/apply"
                variant="primary"
                size="md"
              >
                Apply for Booth
              </Button>
              <Button href="/exhibitors" variant="outline" size="md">
                Exhibitor Guidelines
              </Button>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-neutral-border space-y-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-pine text-white flex items-center justify-center">
                <Store className="w-6 h-6 text-tangerine" />
              </div>

              <div>
                <h4 className="type-subheading text-pine mb-2">
                  Summit Marketplace &amp; Gallery Wall
                </h4>
                <p className="type-body text-navy/75 text-sm leading-relaxed">
                  Engage directly with founders, creative directors, and prospective clients at the Client Connect Corner. Every verified booth includes physical exhibition floor space, inclusion in the digital catalogue, and VIP passes.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-neutral-border text-xs text-navy/80">
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-border/60">
                  <span className="font-medium text-navy/60">Expected Attendance</span>
                  <span className="font-bold text-pine">1,000+ Designers &amp; Founders</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-border/60">
                  <span className="font-medium text-navy/60">Exhibition Date</span>
                  <span className="font-bold text-pine">19th December, 2026</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-medium text-navy/60">Location</span>
                  <span className="font-bold text-pine">Kano, Northern Nigeria</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-spring/15 border border-spring/30 text-xs text-pine font-medium flex items-center">
                <span className="w-2 h-2 rounded-full bg-spring inline-block mr-2 flex-shrink-0" />
                <span>Limited booth capacity. Applications reviewed by the Executive Committee within 3 business days.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
