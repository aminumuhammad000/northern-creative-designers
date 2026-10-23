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
        {/* Actual Official Logo: Single clean horizontal lockup */}
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

        {/* Right CTA Area: Clean, professional, subtle */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="hidden xl:inline-block text-[11px] font-medium text-navy/50 tracking-wider uppercase">
            19 Dec 2026 • Kano
          </span>

          <Link
            href="/register"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-spring text-navy text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-[#02b25b] hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            Register to Attend
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-pine hover:bg-neutral-sand transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-spring"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-pine transition-transform duration-200 rotate-90" />
          ) : (
            <Menu className="w-5 h-5 text-pine transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-neutral-border px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-pine font-semibold bg-spring/10"
                      : "text-navy/80 hover:text-pine hover:bg-neutral-sand"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-border flex flex-col gap-2">
            <Link
              href="/register"
              className="w-full text-center py-3 rounded-xl bg-spring text-navy font-semibold text-xs uppercase tracking-wider shadow-xs hover:bg-[#02b25b] transition-colors"
            >
              Register to Attend
            </Link>
            <Link
              href="/exhibitors/apply"
              className="w-full text-center py-2.5 rounded-xl border border-neutral-border text-pine text-xs font-medium hover:bg-neutral-sand transition-colors"
            >
              Apply for Exhibition Booth
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
