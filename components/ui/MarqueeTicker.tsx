"use client";

import React from "react";

interface MarqueeTickerProps {
  theme?: "pine" | "spring" | "dark" | "sand";
  reverse?: boolean;
  speed?: "normal" | "slow" | "fast";
  items?: string[];
  className?: string;
}

const defaultItems = [
  "ROOTS & VECTORS",
  "19TH DECEMBER, 2026",
  "KANO, NIGERIA",
  "1,000+ CREATIVE INNOVATORS",
  "2-HOUR LIVE SPRINT",
  "₦1.5M PRIZE POOL",
  "DESIGN EXHIBITION WALL",
  "SUMMIT 2.0 AWARDS",
  "CLIENT CONNECT CORNER",
  "AREWA DESIGN EXCELLENCE",
  "RC: 9930022",
];

export function MarqueeTicker({
  theme = "pine",
  reverse = false,
  items = defaultItems,
  className = "",
}: MarqueeTickerProps) {
  const themeStyles = {
    pine: "bg-pine text-white border-y border-pine/40",
    spring: "bg-spring text-navy border-y border-spring-hover/40",
    dark: "bg-navy text-spring border-y border-white/10",
    sand: "bg-[#FAFAF8] text-pine border-y border-neutral-border",
  };

  const dotColors = {
    pine: "text-spring",
    spring: "text-pine",
    dark: "text-spring",
    sand: "text-tangerine",
  };

  // We repeat items 4 times to ensure seamless infinite looping on all screen sizes
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-3.5 select-none ${themeStyles[theme]} ${className}`}
      aria-hidden="true"
    >
      <div
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4 flex-shrink-0"
          >
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase font-sans">
              {item}
            </span>
            <span className={`text-xs font-black ${dotColors[theme]}`}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
