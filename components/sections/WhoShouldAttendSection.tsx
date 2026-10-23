"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Building,
  Briefcase,
  Brush,
  Palette,
  Layers,
  Video,
  Compass,
  Sparkles,
  Laptop,
  Share2,
  Code,
  Users,
} from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  colorClass: string;
  bgHex: string;
  textClass: string;
  icon: React.ReactNode;
  category: string;
  takeaway: string;
  recommendedPass: string;
  row: number;
}

const attendeeRoles: RoleItem[] = [
  // Row 1
  {
    id: "founders",
    name: "Founders",
    colorClass: "bg-[#071135] text-white hover:bg-[#0d1d4f]",
    bgHex: "#071135",
    textClass: "text-white",
    icon: <Building className="w-4 h-4 text-spring" />,
    category: "Leadership & Enterprise",
    takeaway: "Scout top Arewa design & engineering talent, source vetted agencies, and unlock strategic branding for regional growth.",
    recommendedPass: "VIP / Corporate Pass",
    row: 1,
  },
  {
    id: "business-owners",
    name: "Business Owners",
    colorClass: "bg-[#071135] text-white hover:bg-[#0d1d4f]",
    bgHex: "#071135",
    textClass: "text-white",
    icon: <Briefcase className="w-4 h-4 text-tangerine" />,
    category: "Commercial & Growth",
    takeaway: "Direct access to the Client Connect Corner for face-to-face contract dealmaking and brand modernization.",
    recommendedPass: "VIP / Corporate Pass",
    row: 1,
  },
  {
    id: "illustrators-artists",
    name: "Illustrators & Artists",
    colorClass: "bg-[#453478] text-white hover:bg-[#594399]",
    bgHex: "#453478",
    textClass: "text-white",
    icon: <Brush className="w-4 h-4 text-spring" />,
    category: "Visual Arts & Illustration",
    takeaway: "Showcase original cultural artwork on the physical Design Exhibition Wall and explore commercial merch licensing.",
    recommendedPass: "Delegate Pass + Exhibition",
    row: 1,
  },

  // Row 2
  {
    id: "visual-graphic",
    name: "Visual & Graphic Designers",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8367db]",
    bgHex: "#7154CB",
    textClass: "text-white",
    icon: <Palette className="w-4 h-4 text-spring" />,
    category: "Brand Systems & Print",
    takeaway: "Master Arewa typography, scalable vector identity systems, packaging, and high-margin pricing frameworks.",
    recommendedPass: "Standard Delegate Pass",
    row: 2,
  },
  {
    id: "industrial-product",
    name: "Industrial & Product Designers",
    colorClass: "bg-[#F39200] text-white hover:bg-[#ff9e0f]",
    bgHex: "#F39200",
    textClass: "text-white",
    icon: <Layers className="w-4 h-4 text-[#071135]" />,
    category: "Hardware & Physical Craft",
    takeaway: "Connect digital design craft with physical manufacturing, ergonomics, and regional industrial fabrication.",
    recommendedPass: "Standard Delegate Pass",
    row: 2,
  },

  // Row 3
  {
    id: "motion-animation",
    name: "Motion, Animation & Media Designers",
    colorClass: "bg-[#00CC67] text-white hover:bg-[#02de72]",
    bgHex: "#00CC67",
    textClass: "text-white",
    icon: <Video className="w-4 h-4 text-white" />,
    category: "Motion & Synthetic Media",
    takeaway: "Learn kinetic typography, Cinema 4D workflows, and AI-assisted animation pipelines for broadcast and advertising.",
    recommendedPass: "Standard Delegate Pass",
    row: 3,
  },
  {
    id: "brand-strategists",
    name: "Brand Strategists",
    colorClass: "bg-[#7154CB] text-white hover:bg-[#8367db]",
    bgHex: "#7154CB",
    textClass: "text-white",
    icon: <Compass className="w-4 h-4 text-tangerine" />,
    category: "Strategic Communications",
    takeaway: "Frameworks for regional brand positioning, high-stakes client pitches, and cultural narrative monetization.",
    recommendedPass: "Standard Delegate Pass",
    row: 3,
  },

  // Row 4
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel Designers",
    colorClass: "bg-[#013811] text-white hover:bg-[#025219]",
    bgHex: "#013811",
    textClass: "text-white",
    icon: <Sparkles className="w-4 h-4 text-spring" />,
    category: "Textiles & Wearable Craft",
    takeaway: "Bridge traditional Northern textile patterns, dyeing techniques, and modern streetwear graphics.",
    recommendedPass: "Standard Delegate Pass",
    row: 4,
  },
  {
    id: "digital-ui-ux",
    name: "Digital, UI/UX & Web Designers",
    colorClass: "bg-[#F39200] text-white hover:bg-[#ff9e0f]",
    bgHex: "#F39200",
    textClass: "text-white",
    icon: <Laptop className="w-4 h-4 text-white" />,
    category: "Digital Product Craft",
    takeaway: "Figma design systems, international accessibility benchmarks, and real-time live sprint competition in the Hackathon.",
    recommendedPass: "Hackathon Contestant / Delegate",
    row: 4,
  },

  // Row 5
  {
    id: "social-managers",
    name: "Social Managers",
    colorClass: "bg-[#00CC67] text-white hover:bg-[#02de72]",
    bgHex: "#00CC67",
    textClass: "text-white",
    icon: <Share2 className="w-4 h-4 text-white" />,
    category: "Content & Distribution",
    takeaway: "Visual storytelling frameworks, high-engagement content strategy, and viral Northern cultural campaigns.",
    recommendedPass: "Standard Delegate Pass",
    row: 5,
  },
  {
    id: "product-designers",
    name: "Product Designers",
    colorClass: "bg-[#00CC67] text-white hover:bg-[#02de72]",
    bgHex: "#00CC67",
    textClass: "text-white",
    icon: <Code className="w-4 h-4 text-white" />,
    category: "Full-Cycle Product",
    takeaway: "From problem definition and usability testing to developer handoff and scalable design token architectures.",
    recommendedPass: "Hackathon Contestant / Delegate",
    row: 5,
  },
  {
    id: "and-many-more",
    name: "And Many More...",
    colorClass: "bg-[#013811] text-white hover:bg-[#025219]",
    bgHex: "#013811",
    textClass: "text-white",
    icon: <Users className="w-4 h-4 text-spring" />,
    category: "Creative Community",
    takeaway: "Design students, creative enthusiasts, copywriters, 3D artists, and all visual practitioners shaping Northern innovation.",
    recommendedPass: "General Admission",
    row: 5,
  },
];

export function WhoShouldAttendSection() {
  const [selectedRole, setSelectedRole] = useState<RoleItem>(attendeeRoles[0]);

  return (
    <section
      id="who-should-attend"
      className="py-20 md:py-32 bg-[#F8FFF8] border-b border-neutral-border relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-spring/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-tangerine/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
            Who Should Attend?
          </h2>
          <p className="text-navy/75 text-base sm:text-lg font-normal leading-relaxed">
            Tailored pathways engineered for every creative discipline across Northern Nigeria.
          </p>
        </div>

        {/* Outer Card Container (Faithfully adapted to who to expecxt full section.png) */}
        <div className="rounded-[2.5rem] bg-[#F8FFF8] bg-[radial-gradient(#00CC67_1.75px,transparent_1.75px)] [background-size:20px_20px] border border-neutral-border/70 shadow-2xl overflow-hidden relative">
          
          {/* Top Banner (Deep Pine with Arewa Motif Pattern Overlay) */}
          <div className="p-8 sm:p-12 md:p-16 bg-[#013811] text-white relative overflow-hidden">
            {/* Subtle Arewa Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
              <Image
                src="/images/pdf_extracted/arewa_motif_pattern.png"
                alt="Arewa Motif Pattern"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
              <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed text-center">
                Whether you are an emerging creative building your foundational skills,
                an established practitioner expanding into international markets, or a
                business owner seeking top-tier creative talent, Northern Creative
                Designers Summit 2.0 is your platform to connect, grow, and shape the
                future of Arewa design.
              </p>
            </div>
          </div>

          {/* Middle: Saturated Multi-Colored Pills Grid */}
          <div className="p-8 sm:p-12 md:p-16 space-y-4">
            
            {/* Row 1 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {attendeeRoles.filter(r => r.row === 1).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${selectedRole.id === role.id ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span>{role.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {attendeeRoles.filter(r => r.row === 2).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${selectedRole.id === role.id ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span>{role.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {attendeeRoles.filter(r => r.row === 3).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${selectedRole.id === role.id ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span>{role.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Row 4 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {attendeeRoles.filter(r => r.row === 4).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${selectedRole.id === role.id ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span>{role.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Row 5 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {attendeeRoles.filter(r => r.row === 5).map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`
                    group px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-sm sm:text-base
                    transition-all duration-300 ease-out cursor-pointer shadow-sm
                    hover:scale-105 hover:-rotate-1 active:scale-95
                    ${role.colorClass}
                    ${selectedRole.id === role.id ? "ring-4 ring-spring/50 scale-105 shadow-xl -translate-y-1" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </span>
                    <span>{role.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Role Interactive Takeaway Feedback Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-[2rem] bg-white border border-neutral-border shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-border/60">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: selectedRole.bgHex }}
                  >
                    {selectedRole.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-pine/70 bg-pine/5 px-2.5 py-0.5 rounded-full border border-pine/10">
                      {selectedRole.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-pine mt-0.5 tracking-tight">
                      {selectedRole.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-navy/60 font-medium">Pass:</span>
                  <span className="px-3 py-1 rounded-full bg-spring/15 text-pine font-extrabold text-xs uppercase tracking-wide border border-spring/30">
                    {selectedRole.recommendedPass}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-navy/85 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {selectedRole.takeaway}
                </p>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pine hover:bg-[#024a18] text-white text-xs font-extrabold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-sm flex-shrink-0"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4 text-spring" />
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Section: Real Cutout Portrait of Northern Designers with MacBooks */}
          <div className="relative pt-6 overflow-hidden flex justify-center items-end">
            
            {/* 3D Vector Metallic Graphic on the Bottom Right */}
            <div className="hidden lg:block absolute bottom-2 right-4 w-52 h-52 z-10 pointer-events-none transition-transform duration-700 hover:-rotate-6 hover:scale-105">
              <Image
                src="/images/pdf_extracted/vector_3d_hook.png"
                alt="Vector 3D Graphic"
                width={220}
                height={220}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Real Northern Designers with MacBooks */}
            <div className="relative z-10 w-full max-w-2xl px-4 flex justify-center">
              <div className="relative w-full aspect-[1408/768] max-h-[360px] sm:max-h-[440px]">
                <Image
                  src="/images/pdf_extracted/attendees_portraits.png"
                  alt="Northern Creative Designers Summit Attendees"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
