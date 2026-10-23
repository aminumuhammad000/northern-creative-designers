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
  // Brand color contrast pairs:
  // - Primary: Spring (#03D06B) background with Navy (#140949) text (8.8:1 AAA)
  // - Secondary: Pine (#013811) background with White (#FFFFFF) text (13.3:1 AAA)
  // - Accent: Tangerine (#FF8500) background with Navy (#140949) text (7.4:1 AAA)
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-spring text-navy hover:bg-[#02b25b] shadow-sm hover:shadow-md focus-visible:ring-spring focus-visible:ring-offset-white",
    secondary:
      "bg-pine text-white hover:bg-pine-light shadow-sm hover:shadow-md focus-visible:ring-pine focus-visible:ring-offset-white",
    accent:
      "bg-tangerine text-navy hover:bg-[#e67700] shadow-sm hover:shadow-md focus-visible:ring-tangerine focus-visible:ring-offset-white",
    outline:
      "border-2 border-pine text-pine hover:bg-pine/5 focus-visible:ring-pine",
    ghost:
      "text-pine hover:bg-pine/5 focus-visible:ring-pine",
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
