"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Building2,
  Store,
  LogOut,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { signOutAction } from "@/app/actions/auth";

interface DashboardNavProps {
  userRole?: "attendee" | "partner" | "exhibitor";
  userName?: string;
  badgeLabel?: string;
}

export function DashboardNav({
  userName = "Amina Bello",
  badgeLabel = "Delegate",
}: DashboardNavProps) {
  const pathname = usePathname();

  const portals = [
    {
      title: "Attendee",
      subtitle: "Pass",
      href: "/dashboard",
      icon: Users,
      tooltip: "Attendee pass & personal schedule",
      active: pathname === "/dashboard",
    },
    {
      title: "Partner",
      subtitle: "Sponsor",
      href: "/dashboard/partner",
      icon: Building2,
      tooltip: "Sponsor tier & deliverables portal",
      active: pathname.startsWith("/dashboard/partner"),
    },
    {
      title: "Exhibitor",
      subtitle: "Booth",
      href: "/dashboard/exhibitor",
      icon: Store,
      tooltip: "Marketplace booth & lead scanner",
      active: pathname.startsWith("/dashboard/exhibitor"),
    },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Context */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              title="Return to Public Website"
            >
              <div className="w-8 h-8 rounded-lg bg-pine flex items-center justify-center font-cabinet font-extrabold text-spring text-sm shadow-xs group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-sm text-pine block leading-tight">
                  NCD Summit 2.0
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  Roots &amp; Vectors
                </span>
              </div>
            </Link>

            <span className="text-neutral-300 hidden sm:inline">/</span>

            <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md hidden md:inline-flex items-center gap-1.5">
              <span>{badgeLabel}</span>
            </span>
          </div>

          {/* Center: Segmented Portal Switcher with icon recognition subtitles */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200/70 overflow-x-auto scrollbar-none max-w-full">
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  title={p.tooltip}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs transition-all whitespace-nowrap flex-shrink-0 ${
                    p.active
                      ? "bg-white text-pine font-bold shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 font-medium"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{p.title}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium hidden sm:inline ${
                      p.active
                        ? "bg-pine/10 text-pine"
                        : "bg-neutral-200/60 text-neutral-500"
                    }`}
                  >
                    {p.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right: Date info & User Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50 border border-neutral-200/60 px-3 py-1.5 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>Dec 19, 2026</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-700 font-medium">Kano</span>
            </div>

            {/* User Pill */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pine text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {userName.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-neutral-800 hidden md:block max-w-[120px] truncate">
                {userName}
              </span>
            </div>

            {/* Logout Action */}
            <form action={signOutAction} className="inline">
              <button
                type="submit"
                title="Sign Out of Portal"
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
