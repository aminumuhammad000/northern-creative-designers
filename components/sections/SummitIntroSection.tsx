import React from "react";
import Link from "next/link";
import {
  Layers,
  Compass,
  TrendingUp,
  Users,
  Eye,
  Target,
  Sparkles,
  Briefcase,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  eventConfig,
  visionAndMission,
  coreObjectives,
  whatToExpect,
  whoShouldAttend,
} from "@/config/event";

export function SummitIntroSection() {
  const objectiveIcons: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5 text-spring" />,
    Compass: <Compass className="w-5 h-5 text-tangerine" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-spring" />,
    Users: <Users className="w-5 h-5 text-tangerine" />,
  };

  const expectIcons: Record<string, React.ReactNode> = {
    learning: <Layers className="w-5 h-5 text-spring" />,
    hackathon: <Sparkles className="w-5 h-5 text-tangerine" />,
    business: <Briefcase className="w-5 h-5 text-spring" />,
    community: <Trophy className="w-5 h-5 text-tangerine" />,
  };

  return (
    <section id="about-summit" className="py-20 md:py-28 bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. About The Summit (Adapted from PDF Page 02 & 03) */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pine/5 border border-pine/10 text-xs font-semibold text-pine uppercase tracking-wider mb-4">
            Official Summit Overview
          </div>
          <h2 className="type-heading text-pine mb-6">
            About The <span className="text-spring">Summit</span>
          </h2>
          <p className="type-body text-navy/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            The Northern Creative Designers Summit 2.0 is the premier annual
            gathering for designers, strategists, developers, and visual storytellers
            across Northern Nigeria. Designed as an immersive, highly practical
            experience, Summit 2.0 moves beyond conventional talk shows to
            deliver deep learning, real-time collaboration, and actionable career
            pathways for creative professionals.
          </p>
          <p className="type-body text-navy/70 text-sm sm:text-base max-w-3xl mx-auto mt-4 leading-relaxed">
            This year’s theme, <strong className="text-pine font-semibold">&ldquo;Roots &amp; Vectors: Shaping the Future of Arewa Design,&rdquo;</strong> explores
            the powerful intersection of rich cultural heritage and modern digital innovation. We examine how Northern designers can honor traditional visual languages while leveraging cutting-edge design tools, strategic thinking, and artificial intelligence to compete at a global scale.
          </p>
        </div>

        {/* 2. Vision & Mission Statement (Adapted from PDF Page 04) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-pine text-white relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-spring" />
              </div>
              <span className="text-spring text-xs font-semibold uppercase tracking-wider">
                Strategic Horizon
              </span>
              <h3 className="type-subheading text-white mt-1 mb-4">
                {visionAndMission.vision.title}
              </h3>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal">
                {visionAndMission.vision.content}
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="font-mono text-spring">Roots &amp; Vectors</span>
              <span>Summit 2.0</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-neutral-sand border border-neutral-border text-navy relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-pine/5 border border-pine/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-tangerine" />
              </div>
              <span className="text-tangerine text-xs font-semibold uppercase tracking-wider">
                Execution Mandate
              </span>
              <h3 className="type-subheading text-pine mt-1 mb-4">
                {visionAndMission.mission.title}
              </h3>
              <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-normal">
                {visionAndMission.mission.content}
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-neutral-border flex items-center justify-between text-xs text-navy/60">
              <span className="font-mono text-tangerine">Sustainable Impact</span>
              <span>RC: {eventConfig.rcNumber}</span>
            </div>
          </div>
        </div>

        {/* 3. Core Objectives (Adapted from PDF Page 05) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-pine uppercase tracking-wider px-3 py-1 rounded-full bg-pine/5 border border-pine/10">
              Foundational Pillars
            </span>
            <h3 className="type-heading text-pine mt-3">
              Core Objectives
            </h3>
            <p className="type-body text-navy/70 text-sm mt-2">
              Four concrete pillars driving every masterclass, panel, and exhibition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreObjectives.map((obj) => (
              <div
                key={obj.id}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-spring/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-pine/5 border border-pine/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {objectiveIcons[obj.icon] || <Layers className="w-5 h-5 text-spring" />}
                  </div>
                  <h4 className="font-bold text-pine text-base mb-2 leading-snug">
                    {obj.title}
                  </h4>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. What to Expect (Adapted from PDF Page 06) */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-neutral-sand border border-neutral-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-spring uppercase tracking-wider px-3 py-1 rounded-full bg-pine text-white">
              Summit Experience
            </span>
            <h3 className="type-heading text-pine mt-3">
              What to Expect
            </h3>
            <p className="type-body text-navy/70 text-sm mt-2">
              An action-oriented environment engineered for deep collaboration and career acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatToExpect.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-border/80 flex items-start gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-pine flex-shrink-0 flex items-center justify-center">
                  {expectIcons[item.id] || <Layers className="w-5 h-5 text-spring" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-bold text-pine text-base sm:text-lg">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-pine/80 bg-pine/5 px-2 py-0.5 rounded-full border border-pine/10">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Who Should Attend? (Adapted from PDF Page 07) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-pine text-white">
          <div className="max-w-3xl mb-8">
            <span className="text-spring text-xs font-semibold uppercase tracking-wider">
              Ecosystem Cohort
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-1 text-white">
              Who Should Attend?
            </h3>
            <p className="text-white/85 text-sm sm:text-base mt-3 leading-relaxed">
              Whether you are an emerging creative building your foundational skills,
              an established practitioner expanding into international markets, or a
              business owner seeking top-tier creative talent, Northern Creative
              Designers Summit 2.0 is your platform to connect, grow, and shape the
              future of Arewa design.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {whoShouldAttend.map((role) => (
              <div
                key={role}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-spring flex-shrink-0" />
                <span>{role}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
            <span>Connect with 1,000+ creative innovators and founders in Kano</span>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-spring font-semibold hover:underline"
            >
              Secure Your Delegate Pass
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
