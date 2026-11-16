"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { sectionLeads, otherTeamMembers } from "@/content/team";
import { TeamAvatar } from "@/components/ui/TeamAvatar";

export function TeamSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="team"
      className="w-full py-20 md:py-28 bg-[#FBFBF9] border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#03D06B] block mb-2">
            Organising Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#013811] tracking-tight">
            Summit Team
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#140949]/70 leading-relaxed">
            The dedicated leads and team members orchestrating Northern Creative Designers Summit 2.0.
          </p>
        </div>

        {/* 1. Leads Grid (Shown by default) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sectionLeads.map((member) => (
            <div
              key={member.id}
              className="group p-6 rounded-2xl bg-white border border-neutral-border hover:border-[#013811]/30 hover:shadow-lg transition-all duration-200 flex items-center gap-4"
            >
              <TeamAvatar
                name={member.name}
                image={member.image}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-[#013811] truncate group-hover:text-[#02571A] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#FF8500] truncate mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Expand / Shrink Toggle Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-border text-[#013811] text-xs sm:text-sm font-bold shadow-sm hover:border-[#013811]/40 hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Show Less" : "View All Team Members"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#03D06B]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#03D06B]" />
            )}
          </button>
        </div>

        {/* 3. Expanded Other Team Members (Smooth reveal below) */}
        {isExpanded && (
          <div className="mt-10 pt-10 border-t border-neutral-border/80 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#140949]/60">
                Additional Team Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {otherTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group p-4 sm:p-5 rounded-xl bg-white border border-neutral-border hover:border-[#03D06B]/50 hover:shadow-md transition-all duration-200 flex items-center gap-3.5"
                >
                  <TeamAvatar
                    name={member.name}
                    image={member.image}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-[#013811] truncate group-hover:text-[#02571A]">
                      {member.name}
                    </h4>
                    <p className="text-xs text-[#140949]/70 truncate mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
