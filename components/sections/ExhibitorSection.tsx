"use client";

import React from "react";
import Link from "next/link";
import {
  Store,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowDownRight,
  CheckCircle2,
  Building,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const exhibitorCards = [
  {
    id: "client-connect",
    title: "Client Connect Corner:",
    subtitle: "Direct Dealmaking & Talent Scouting",
    description:
      "Curated face-to-face dealmaking between business founders seeking top regional talent and practicing designers ready to execute enterprise mandates.",
    bgClass: "bg-[#071135]",
    deliverables: [
      "Private 1-on-1 interview & dealmaking booths",
      "Executive portfolio & proposal reviews",
      "Direct contract facilitation on summit floor",
    ],
    ctaLabel: "Reserve Client Booth",
    ctaHref: "/exhibitors/apply",
  },
  {
    id: "agency-booths",
    title: "Agency & Vendor Floor:",
    subtitle: "Physical Presence & Showcase",
    description:
      "Showcase your design studio, printing company, hardware tools, or creative services directly to 1,000+ registered delegates and tech executives.",
    bgClass: "bg-[#F39200]",
    deliverables: [
      "Dedicated physical floor space & branding",
      "Listing in official summit print & digital catalogue",
      "VIP delegate passes for your leadership team",
    ],
    ctaLabel: "Apply for Space",
    ctaHref: "/exhibitors/apply",
  },
  {
    id: "marketplace-discounts",
    title: "Summit Marketplace:",
    subtitle: "Tool Discounts & Merch Licensing",
    description:
      "Access exclusive discounts on design software licenses, drawing tablets, font foundry collections, and limited-edition Arewa artisanal merchandise.",
    bgClass: "bg-[#00CC67]",
    deliverables: [
      "Exclusive software tool & subscription perks",
      "Artisanal merch and apparel showcase",
      "Print and packaging vendor partnerships",
    ],
    ctaLabel: "Browse Marketplace",
    ctaHref: "/exhibitors",
  },
];

const vendorCategories = [
  "Design Studios & Brand Agencies",
  "Printing, Merch & Packaging Vendors",
  "Hardware, Drawing Tablets & Gadgets",
  "Design Schools, EdTech & Bootcamps",
  "SaaS, Creative Software & Cloud Providers",
  "Artisanal Crafts, Apparel & Culture Brands",
];

export function ExhibitorSection() {
  return (
    <section
      id="exhibitors"
      className="w-full py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Client Connect Corner &amp; Marketplace.
            </h2>
            <p className="text-navy/75 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
              Bridging the gap between elite regional creative talent and paying business founders, tech enterprises, and agencies across Northern Nigeria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/exhibitors/apply"
              variant="primary"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Apply for Booth
            </Button>
            <Button
              href="/exhibitors"
              variant="outline"
              size="lg"
              className="hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Exhibitor Guidelines
            </Button>
          </div>
        </div>

        {/* 3 Chunky Saturated Bento Cards matching Reference Design */}
        <div className="p-4 sm:p-8 md:p-12 rounded-[2.5rem] bg-[#F6FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {exhibitorCards.map((card) => (
              <div
                key={card.id}
                className={`
                  group p-8 sm:p-10 rounded-[2rem] ${card.bgClass} text-white shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 ease-out cursor-default relative overflow-hidden flex flex-col justify-between
                `}
              >
                {/* Subtle inner ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                    {card.subtitle}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 border-t border-white/20 space-y-4">
                  <div className="space-y-2">
                    {card.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/95">
                        <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5 opacity-90" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={card.ctaHref}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      <span>{card.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Categories Pill Grid */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#FAFAF8] border border-neutral-border">
          <div className="max-w-2xl mb-6">
            <h4 className="text-xl sm:text-2xl font-black text-pine tracking-tight">
              Verified Exhibitor &amp; Vendor Categories
            </h4>
            <p className="text-navy/70 text-sm mt-1">
              Applications are reviewed on a rolling basis with priority given to companies providing tangible value to regional creative talent.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {vendorCategories.map((type, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-neutral-border text-xs sm:text-sm font-bold text-pine shadow-xs hover:border-spring hover:scale-105 transition-all duration-200"
              >
                <CheckCircle2 className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
