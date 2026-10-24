import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none uppercase tracking-wider whitespace-nowrap flex-shrink-0";

  const sizeStyles = {
    sm: "text-[11px] h-9 px-4 gap-1.5",
    md: "text-xs h-11 sm:h-12 px-6 gap-2",
    lg: "text-xs sm:text-sm h-12 sm:h-14 px-7 sm:px-8 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-spring text-navy hover:bg-[#02b25b] shadow-xs hover:shadow-sm focus-visible:ring-spring focus-visible:ring-offset-white",
    secondary:
      "bg-pine text-white hover:bg-pine-light shadow-xs hover:shadow-sm focus-visible:ring-pine focus-visible:ring-offset-white",
    accent:
      "bg-tangerine text-navy hover:bg-[#e67700] shadow-xs hover:shadow-sm focus-visible:ring-tangerine focus-visible:ring-offset-white",
    outline:
      "border border-pine/30 text-pine hover:bg-white hover:border-pine focus-visible:ring-pine",
    ghost:
      "text-pine hover:bg-neutral-sand focus-visible:ring-pine",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
      {icon}
    </button>
  );
}
