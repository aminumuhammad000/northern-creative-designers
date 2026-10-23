"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Event Banner */}
      <div className="bg-pine text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
            <span className="font-medium text-white/90">
              Northern Creative Designers Summit 2.0 • 19th December, 2026 • Kano
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span>Theme: Roots & Vectors</span>
            <span>•</span>
            <span className="text-spring font-medium">Attendee Registrations Open</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-border py-3"
            : "bg-white border-b border-neutral-border/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo Lockup with 50% Clear Space */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-spring rounded-lg p-1.5"
            aria-label="Northern Creative Designers Home"
          >
            {/* Symbol Mark on Pine background per App Icon spec */}
            <div className="relative w-11 h-11 flex-shrink-0 bg-pine rounded-lg p-2 flex items-center justify-center border border-pine/20 shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/images/logos/symbol-mark.png"
                alt="Northern Creative Designers Mark"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>

            {/* Official Wordmark in Pine with Summit 2.0 Subtitle */}
            <div className="flex flex-col">
              <Image
                src="/images/logos/wordmark-pine.png"
                alt="Northern Creative Designers"
                width={140}
                height={36}
                className="object-contain h-7 w-auto"
                priority
              />
              <span className="text-[11px] font-medium text-navy/70 flex items-center gap-1.5 mt-0.5">
                <span className="text-tangerine font-bold">Summit 2.0</span>
                <span className="text-neutral-border">•</span>
                <span>Roots & Vectors</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors relative ${
                    isActive
                      ? "text-pine font-semibold bg-pine/5"
                      : "text-navy/80 hover:text-pine hover:bg-neutral-sand"
                  }`}
                >
                  {item.title}
                  {item.badge && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-tangerine/15 text-tangerine">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href="/register"
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Register to Attend
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-pine hover:bg-pine/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-pine" />
            ) : (
              <Menu className="w-6 h-6 text-pine" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-border px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between text-base font-medium px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "text-pine font-semibold bg-spring/10"
                        : "text-navy/90 hover:text-pine hover:bg-neutral-sand"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-tangerine/15 text-tangerine">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-border flex flex-col gap-2">
              <Button href="/register" variant="primary" size="lg" className="w-full">
                Register to Attend
              </Button>
              <Button
                href="/exhibitors/apply"
                variant="outline"
                size="md"
                className="w-full"
              >
                Apply for Exhibition Booth
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-border text-xs text-navy/70 space-y-1">
              <p className="font-semibold text-pine">Northern Creative Designers (RC: 9930022)</p>
              <p>Email: {siteConfig.organization.email}</p>
              <p>Helpline: {siteConfig.organization.phones.join(" • ")}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
