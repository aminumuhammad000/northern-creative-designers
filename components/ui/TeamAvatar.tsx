"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TeamAvatarProps {
  name: string;
  image?: string;
  role?: string;
  isLead?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Brand color palette pairs for deterministic avatar fallback
const avatarPaletteVariants = [
  { bg: "bg-[#013811]", text: "text-[#03D06B]", border: "border-[#03D06B]/30" }, // Pine + Spring
  { bg: "bg-[#140949]", text: "text-[#FF8500]", border: "border-[#FF8500]/30" }, // Navy + Tangerine
  { bg: "bg-[#03D06B]", text: "text-[#013811]", border: "border-[#013811]/20" }, // Spring + Pine
  { bg: "bg-[#FF8500]", text: "text-[#140949]", border: "border-[#140949]/20" }, // Tangerine + Navy
  { bg: "bg-[#02571A]", text: "text-white", border: "border-[#03D06B]/40" },       // Pine Light + White
];

// Deterministic variant picker based on name string
function getAvatarVariant(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarPaletteVariants.length;
  return avatarPaletteVariants[index];
}

const sizeClasses = {
  sm: {
    container: "w-10 h-10 text-sm",
    badge: "w-3.5 h-3.5 text-[8px] -bottom-0.5 -right-0.5",
  },
  md: {
    container: "w-14 h-14 text-xl",
    badge: "w-4 h-4 text-[9px] bottom-0 right-0",
  },
  lg: {
    container: "w-20 h-20 text-3xl",
    badge: "w-5 h-5 text-[10px] bottom-0.5 right-0.5",
  },
  xl: {
    container: "w-24 h-24 text-4xl",
    badge: "w-6 h-6 text-xs bottom-1 right-1",
  },
};

export function TeamAvatar({
  name,
  image,
  role,
  isLead = false,
  size = "lg",
  className = "",
}: TeamAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const variant = getAvatarVariant(name);
  const sizes = sizeClasses[size];

  // Extract the first letter of the person's name
  const firstLetter = (name.trim().charAt(0) || "N").toUpperCase();

  const hasValidImage = Boolean(image && image.trim() !== "" && !imgError);

  return (
    <div className={`relative inline-block select-none flex-shrink-0 ${className}`}>
      <div
        className={`
          ${sizes.container} rounded-2xl md:rounded-3xl flex items-center justify-center font-black overflow-hidden
          shadow-md transition-transform duration-300 group-hover:scale-105 border-2
          ${hasValidImage ? "bg-neutral-100 border-neutral-200" : `${variant.bg} ${variant.text} ${variant.border}`}
        `}
      >
        {hasValidImage ? (
          <Image
            src={image!}
            alt={name}
            width={120}
            height={120}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-cabinet tracking-tight leading-none">
            {firstLetter}
          </span>
        )}
      </div>

      {/* Role / Lead Star Badge */}
      {isLead && (
        <span
          title={`${role || "Lead"}`}
          className={`
            absolute ${sizes.badge} rounded-full bg-[#03D06B] text-[#013811] font-black
            flex items-center justify-center shadow-md ring-2 ring-white
          `}
        >
          ★
        </span>
      )}
    </div>
  );
}
