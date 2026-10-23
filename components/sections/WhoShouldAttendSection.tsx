"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Compass,
  Briefcase,
  Layers,
  Palette,
  Laptop,
  Video,
  Building,
  Brush,
  Code,
  Share2,
} from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  colorClass: string;
  bgHex: string;
  textClass: string;
  borderClass: string;
  icon: React.ReactNode;
  category: string;
  takeaway: string;
  recommendedPass: string;
}

const attendeeRoles: RoleItem[] = [
  // Row 1 in who should attend.png
  {
    id: "founders",
    name: "Founders",
    colorClass: "bg-[#071135] text-white hover:bg-[#0c1b4d]",
    bgHex: "#071135",
    textClass: "text-white",
    borderClass: "border-[#071135]/40",
    icon: <Building className="w-4 h-4 text-spring" />,
    category: "Leadership & Enterprise",
    takeaway: "Scout top Arewa design & engineering talent, source agencies, and unlock branding strategies for regional growth.",
    recommendedPass: "VIP / Corporate Pass",
  },
  {
    id: "business-owners",
    name: "Business Owners",
    colorClass: "bg-[#071135] text-white hover:bg-[#0c1b4d]",
    bgHex: "#071135",
    textClass: "text-white",
    borderClass: "border-[#071135]/40",
    icon: <Briefcase className="w-4 h-4 text-tangerine" />,
    category: "Commercial & Growth",
    takeaway: "Direct access to the Client Connect Corner for face-to-face contract dealmaking and brand modernization.",
    recommendedPass: "VIP / Corporate Pass",
  },
  {
    id: "illustrators-artists",
    name: "Illustrators & Artists",
    colorClass: "bg-[#453478] text-white hover:bg-[#574294]",
    bgHex: "#453478",
    textClass: "text-white",
    borderClass: "border-[#453478]/40",
    icon: <Brush className="w-4 h-4 text-spring" />,
    category: "Visual Arts & Illustration",
    takeaway: "Showcase original cultural artwork on the physical Design Exhibition Wall and explore commercial merch licensing.",
    recommendedPass: "Delegate Pass + Exhibition",
  },

  // Row 2 in who should attend.png
  {
    id: "visual-graphic",
    name: "Visual & Graphic Designers",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8266de]",
    bgHex: "#7154CB",
    textClass: "text-white",
    borderClass: "border-[#7154CB]/40",
    icon: <Palette className="w-4 h-4 text-spring" />,
    category: "Brand Systems & Print",
    takeaway: "Master Arewa typography, scalable vector identity systems, packaging, and high-margin pricing frameworks.",
    recommendedPass: "Standard Delegate Pass",
  },
  {
    id: "industrial-product",
    name: "Industrial & Product Designers",
    colorClass: "bg-[#F39200] text-white hover:bg-[#ff9e0f]",
    bgHex: "#F39200",
    textClass: "text-white",
    borderClass: "border-[#F39200]/40",
    icon: <Layers className="w-4 h-4 text-[#071135]" />,
    category: "Hardware & Physical Craft",
    takeaway: "Connect digital design craft with physical manufacturing, ergonomics, and regional industrial fabrication.",
    recommendedPass: "Standard Delegate Pass",
  },

  // Row 3 in who should attend.png
  {
    id: "motion-animation",
    name: "Motion, Animation & Media Designers",
    colorClass: "bg-[#00CC67] text-[#071135] hover:bg-[#02e073]",
    bgHex: "#00CC67",
    textClass: "text-[#071135]",
    borderClass: "border-[#00CC67]/40",
    icon: <Video className="w-4 h-4 text-[#071135]" />,
    category: "Motion & Synthetic Media",
    takeaway: "Learn kinetic typography, Cinema 4D workflows, and AI-assisted animation pipelines for broadcast and advertising.",
    recommendedPass: "Standard Delegate Pass",
  },
  {
    id: "brand-strategists",
    name: "Brand Strategists",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8266de]",
    bgHex: "#7154CB",
    textClass: "text-white",
    borderClass: "border-[#7154CB]/40",
    icon: <Compass className="w-4 h-4 text-tangerine" />,
    category: "Strategic Communications",
    takeaway: "Frameworks for regional brand positioning, high-stakes client pitches, and cultural narrative monetization.",
    recommendedPass: "Standard Delegate Pass",
  },

  // Row 4 in who should attend.png
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel Designers",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8266de]",
    bgHex: "#7154CB",
    textClass: "text-white",
    borderClass: "border-[#7154CB]/40",
    icon: <Sparkles className="w-4 h-4 text-spring" />,
    category: "Textiles & Wearable Craft",
    takeaway: "Bridge traditional Northern textile patterns, dyeing techniques, and modern streetwear graphics.",
    recommendedPass: "Standard Delegate Pass",
  },
  {
    id: "digital-ui-ux",
    name: "Digital, UI/UX & Web Designers",
    colorClass: "bg-[#00CC67] text-[#071135] hover:bg-[#02e073]",
    bgHex: "#00CC67",
    textClass: "text-[#071135]",
    borderClass: "border-[#00CC67]/40",
    icon: <Laptop className="w-4 h-4 text-[#071135]" />,
    category: "Digital Product Craft",
    takeaway: "Figma design systems, international accessibility benchmarks, and real-time live sprint competition in the Hackathon.",
    recommendedPass: "Hackathon Contestant / Delegate",
  },

  // Row 5 in who should attend.png
  {
    id: "social-managers",
    name: "Social Managers",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8266de]",
    bgHex: "#7154CB",
    textClass: "text-white",
    borderClass: "border-[#7154CB]/40",
    icon: <Share2 className="w-4 h-4 text-spring" />,
    category: "Content & Distribution",
    takeaway: "Visual storytelling frameworks, high-engagement content strategy, and viral Northern cultural campaigns.",
    recommendedPass: "Standard Delegate Pass",
  },
  {
    id: "product-designers",
    name: "Product Designers",
    colorClass: "bg-[#00CC67] text-[#071135] hover:bg-[#02e073]",
    bgHex: "#00CC67",
    textClass: "text-[#071135]",
    borderClass: "border-[#00CC67]/40",
    icon: <Code className="w-4 h-4 text-[#071135]" />,
    category: "Full-Cycle Product",
    takeaway: "From problem definition and usability testing to developer handoff and scalable design token architectures.",
    recommendedPass: "Hackathon Contestant / Delegate",
  },
  {
    id: "and-many-more",
    name: "And Many More...",
    colorClass: "bg-[#1F2937] text-white hover:bg-[#374151]",
    bgHex: "#1F2937",
    textClass: "text-white",
    borderClass: "border-white/20",
    icon: <Users className="w-4 h-4 text-spring" />,
    category: "Creative Community",
    takeaway: "Design students, creative enthusiasts, copywriters, 3D artists, and all visual practitioners shaping Northern innovation.",
    recommendedPass: "General Admission",
  },
];

export function WhoShouldAttendSection() {
  const [selectedRole, setSelectedRole] = useState<RoleItem>(attendeeRoles[0]);

  return (
    <section id="who-should-attend" className="py-20 md:py-32 bg-[#F8FFF8] border-b border-neutral-border relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-tangerine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner (Faithfully matches the deep pine hero container in who should attend.png) */}
        <div className="rounded-[2.5rem] bg-[#013811] text-white p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden mb-12">
          {/* Subtle decorative geometric overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-spring/[0.06] rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-white/5 rounded-full pointer-events-none" />

          <div className="max-w-4xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-spring uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
              <span>Target Audience • Page 07</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Who Should Attend?
            </h2>

            <p className="text-white/85 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl">
              Whether you are an emerging creative building your foundational skills,
              an established practitioner expanding into international markets, or a
              business owner seeking top-tier creative talent, Northern Creative
              Designers Summit 2.0 is your platform to connect, grow, and shape the
              future of Arewa design.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-white/70 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-spring" />
                12+ Creative Disciplines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-spring" />
                1,000+ Regional Delegates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-spring" />
                Kano • 19 Dec 2026
              </span>
            </div>
          </div>
        </div>

        {/* Lower Section: Multi-Colored Interactive Pill Cloud (Matching who should attend.png) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-pine uppercase tracking-wider block mb-1">
                Explore Your Pathway
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
                Select Your Craft or Role
              </h3>
            </div>
            <span className="text-xs font-medium text-navy/60 bg-white px-4 py-2 rounded-full border border-neutral-border shadow-xs">
              Click any pill below to preview tailored summit takeaways
            </span>
          </div>

          {/* Interactive Colored Pills Grid */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            {attendeeRoles.map((role) => {
              const isSelected = selectedRole.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group relative px-6 py-3.5 sm:px-7 sm:py-4 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${isSelected ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : "hover:shadow-md"}
                  `}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span className="tracking-tight">{role.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chowdeck-Inspired Interactive Role Spotlight Card */}
          <div className="mt-8 p-6 sm:p-10 rounded-[2rem] bg-white border border-neutral-border/80 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-border">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: selectedRole.bgHex }}
                >
                  {selectedRole.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-pine/70 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      {selectedRole.category}
                    </span>
                    <span className="text-[11px] font-bold text-spring uppercase tracking-wider">
                      Selected Craft
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-pine mt-1 tracking-tight">
                    {selectedRole.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-navy/70">
                  Recommended:
                </span>
                <span className="px-4 py-1.5 rounded-full bg-spring/15 text-pine font-extrabold text-xs uppercase tracking-wide border border-spring/30">
                  {selectedRole.recommendedPass}
                </span>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <h5 className="text-xs font-extrabold text-navy/55 uppercase tracking-wider">
                  What Summit 2.0 Delivers for You
                </h5>
                <p className="text-navy/85 text-base sm:text-lg leading-relaxed font-normal">
                  {selectedRole.takeaway}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-md group"
                >
                  <span>Register as {selectedRole.name}</span>
                  <ArrowRight className="w-4 h-4 text-spring transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
