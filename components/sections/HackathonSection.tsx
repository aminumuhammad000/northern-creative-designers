"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function HackathonSection() {
  return (
    <section
      id="hackathon"
      className="py-20 md:py-32 bg-white border-b border-neutral-border relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Heading matching live hacker.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-8 sm:mb-12">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pine tracking-tight leading-tight">
              Live Hackathon &amp;<br />Audience Voting.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="type-body text-navy/70 text-sm sm:text-base leading-relaxed">
              Experience high-intensity real-time creative problem-solving. Finalists pitch live on stage, with judges and the registered audience voting in real time.
            </p>
          </div>
        </div>

        {/* Unified Hackathon Card matching live hacker.png */}
        <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#F6FFF8] border border-neutral-border/70 p-4 sm:p-6 md:p-8 shadow-sm">
          
          {/* Main Focus Photo */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-black/10">
            <Image
              src="/images/community/hackathon_audience_focus.jpg"
              alt="Northern Design Hackathon Live Audience and Participants"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Details & Copy */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-navy tracking-tight">
              Northern Design Hackathon 1.0
            </h3>
            <span className="text-xs sm:text-sm font-mono font-bold text-pine sm:text-right">
              ₦100,000 Cash Prizes Awarded
            </span>
          </div>

          <p className="text-xs sm:text-sm text-navy/70 leading-relaxed font-normal mb-6 sm:mb-8">
            120-minute live stage execution. Teams of 2–4 build under constraints with real-time jury evaluation and audience voting.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/hackathon/register"
              className="w-full sm:flex-[3] md:flex-[4] py-3 sm:py-3.5 px-6 rounded-full bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] text-xs font-black tracking-wider uppercase text-center transition-all shadow-sm active:scale-98"
            >
              APPLY FOR HACKATHON
            </Link>
            <Link
              href="/voting-rules"
              className="w-full sm:flex-[1] py-3 sm:py-3.5 px-6 rounded-full bg-white hover:bg-neutral-50 text-[#063B18] border border-neutral-border text-xs font-bold tracking-wider uppercase text-center transition-all shadow-xs active:scale-98 whitespace-nowrap"
            >
              HACKATHON RULES
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
