"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNavItems } from "@/config/navigation";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-neutral-border/70 py-3 shadow-[0_2px_12px_rgba(1,56,17,0.04)]"
          : "bg-white border-b border-neutral-border/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Actual Official Logo: Single clean horizontal lockup + RC Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-spring rounded-md py-1 transition-opacity duration-200 hover:opacity-90"
            aria-label="Northern Creative Designers Summit Home"
          >
            <div className="relative h-8 sm:h-9 w-auto flex items-center">
              <Image
                src="/images/brand/logo-header.png"
                alt="Northern Creative Designers"
                width={230}
                height={78}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>
          <span className="hidden xl:inline-flex items-center text-[10px] font-mono tracking-wider text-pine/70 bg-pine/5 border border-pine/10 px-2.5 py-0.5 rounded-full">
            RC: 9930022
          </span>
        </div>

        {/* Desktop Minimalist Navigation with Micro-Interactions */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 group ${
                  isActive ? "text-pine font-semibold" : "text-navy/70 hover:text-pine"
                }`}
              >
                <span>{item.title}</span>

                {/* Micro-interaction: Animated underline glide */}
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-spring rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Minimalist Action CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/NCD Summit 26.pdf"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-pine/20 text-pine text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-pine hover:text-white"
          >
            Brochure
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-spring text-navy text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-[#02b25b] hover:shadow-sm active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            className="p-2 rounded-lg text-pine hover:bg-pine/5 focus:outline-none focus:ring-2 focus:ring-spring"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-pine" />
            ) : (
              <Menu className="w-6 h-6 text-pine" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-border bg-white px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-border/60">
            <span className="text-xs font-bold text-pine uppercase tracking-wider">
              Navigation
            </span>
            <span className="text-[10px] font-mono text-pine/70 bg-pine/5 px-2 py-0.5 rounded-full border border-pine/10">
              RC: 9930022
            </span>
          </div>
          <nav className="flex flex-col space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-pine/5 text-pine font-semibold"
                      : "text-navy/80 hover:bg-pine/5 hover:text-pine"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-neutral-border flex flex-col space-y-2">
            <Link
              href="/NCD Summit 26.pdf"
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full border border-pine/30 text-pine text-xs font-semibold uppercase tracking-wider hover:bg-pine hover:text-white transition-colors"
            >
              Download PDF Brochure
            </Link>
            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-spring text-navy text-xs font-semibold uppercase tracking-wider hover:bg-[#02b25b] transition-colors"
            >
              Register to Attend
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
