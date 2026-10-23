import React from "react";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  centered?: boolean;
  theme?: "light" | "dark" | "pine";
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  description,
  centered = false,
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const isPine = theme === "pine";

  return (
    <div
      className={`max-w-3xl ${
        centered ? "mx-auto text-center items-center" : "text-left"
      } ${className}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            isDark || isPine
              ? "bg-spring/20 text-spring border border-spring/30"
              : "bg-pine/5 text-pine border border-pine/15"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-spring" />
          {tag}
        </div>
      )}
      <h2
        className={`type-heading ${
          isDark || isPine ? "text-white" : "text-pine"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            isDark
              ? "text-white/80"
              : isPine
              ? "text-white/85"
              : "text-navy/75"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
