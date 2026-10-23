import React from "react";
import Link from "next/link";
import {
  Layers,
  Compass,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreObjectives } from "@/config/event";
import { landingPageContent } from "@/content/landing-page";

export function SummitIntroSection() {
  const { introduction } = landingPageContent;

  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5 text-spring" />,
    Compass: <Compass className="w-5 h-5 text-tangerine" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-spring" />,
    Users: <Users className="w-5 h-5 text-tangerine" />,
  };

  return (
    <section id="about-intro" className="py-20 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            tag={introduction.tag}
            title={introduction.title}
            description={introduction.paragraph1}
          />
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-spring transition-colors pb-2"
          >
            Read Our Full Manifesto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Core Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreObjectives.map((obj) => (
            <div
              key={obj.id}
              className="p-6 rounded-xl bg-neutral-sand border border-neutral-border hover:border-spring/50 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-pine flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {iconMap[obj.icon] || <Layers className="w-5 h-5 text-spring" />}
                </div>
                <h3 className="font-bold text-pine text-lg mb-2 leading-snug">
                  {obj.title}
                </h3>
                <p className="text-navy/75 text-sm leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Target Audience / Who Should Attend */}
        <div className="p-8 rounded-2xl bg-pine text-white">
          <div className="max-w-3xl mb-6">
            <span className="text-spring text-xs font-semibold uppercase tracking-wider">
              Ecosystem Diversity
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mt-1 text-white">
              Who Northern Creative Designers Summit 2.0 Serves
            </h3>
            <p className="text-white/80 text-sm sm:text-base mt-2">
              Whether you are an emerging creative building foundational skills, an
              established practitioner expanding internationally, or a business owner
              seeking top-tier creative talent—this is your platform.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {introduction.targetAudience.map((role) => (
              <div
                key={role}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-medium hover:bg-white/15 transition-colors"
              >
                <CheckCircle className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
