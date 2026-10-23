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
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Official Horizontal Logo */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-spring rounded-md py-1 transition-opacity duration-200 hover:opacity-90"
          aria-label="Northern Creative Designers Summit Home"
        >
          <div className="relative h-8 sm:h-9 w-auto flex items-center">
            <Image
              src="/images/brand/logo-header.png"
              alt="Northern Creative Designers"
              width={220}
              height={74}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Minimalist Professional Navigation (4 Core Items) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 group ${
                  isActive ? "text-pine font-bold" : "text-navy/70 hover:text-pine"
                }`}
              >
                <span>{item.title}</span>

                {/* Subtle animated underline glide on hover */}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] bg-spring rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Single Sleek Action CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-spring text-navy text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#02b25b] hover:shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring focus-visible:ring-offset-2"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
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
        <div className="md:hidden border-b border-neutral-border bg-white px-5 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-pine/5 text-pine font-bold"
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
              href="/register"
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-spring text-navy text-xs font-bold uppercase tracking-wider hover:bg-[#02b25b] transition-colors"
            >
              Register to Attend
            </Link>
            <Link
              href="/NCD Summit 26.pdf"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-pine/30 text-pine text-xs font-semibold uppercase tracking-wider hover:bg-pine hover:text-white transition-colors"
            >
              Download PDF Brochure
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
