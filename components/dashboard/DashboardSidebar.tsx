"use client";

import React from "react";
import Link from "next/link";
import { LogOut, ExternalLink, X, ShieldCheck } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";

export interface DashboardSidebarItem<T extends string = string> {
  id: T;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
}

interface DashboardSidebarProps<T extends string = string> {
  portalType: "attendee" | "exhibitor_vendor" | "partner" | "hackathon" | "judge";
  portalTitle: string;
  portalBadge: string;
  userName?: string;
  userSubtitle?: string;
  userEmail?: string;
  items: DashboardSidebarItem<T>[];
  activeTab: T;
  onSelectTab: (tabId: T) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function DashboardSidebar<T extends string = string>({
  portalType,
  portalTitle,
  portalBadge,
  userName = "Attendee",
  userSubtitle,
  userEmail,
  items,
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps<T>) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "NC";
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-pine select-none">
      {/* 1. Header / Brand Mark */}
      <div className="p-5 border-b border-neutral-200/80 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          title="Return to Public Summit Site"
        >
          <div className="w-9 h-9 rounded-xl bg-pine flex items-center justify-center font-cabinet font-extrabold text-spring text-base shadow-xs group-hover:scale-105 transition-transform shrink-0">
            N
          </div>
          <div className="min-w-0">
            <span className="font-bold text-sm text-pine block leading-tight truncate">
              NCD Summit 2.0
            </span>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-spring/20 text-pine uppercase tracking-wider">
              {portalBadge}
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. User Context Card */}
      <div className="p-4 border-b border-neutral-100 bg-neutral-sand/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pine text-spring font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs border border-spring/30">
            {getInitials(userName)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-pine truncate leading-tight">
              {userName}
            </h4>
            {userSubtitle && (
              <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                {userSubtitle}
              </p>
            )}
            {userEmail && (
              <p className="text-[10px] text-neutral-400 truncate">
                {userEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation Links (Side Menu) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          {portalTitle}
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs transition-all text-left group ${
                isActive
                  ? "bg-pine text-white font-bold shadow-xs"
                  : "text-neutral-600 hover:text-pine hover:bg-neutral-100/80 font-medium"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-spring" : "text-neutral-400 group-hover:text-pine"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                    isActive
                      ? "bg-spring text-navy"
                      : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Bottom Footer Actions */}
      <div className="p-3 border-t border-neutral-200/80 space-y-1 bg-white">
        <Link
          href="/"
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-neutral-600 hover:text-pine hover:bg-neutral-100/80 font-medium transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-neutral-400 shrink-0" />
          <span>Public Website</span>
        </Link>

        <form action={signOutAction} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </form>

        <div className="pt-2 px-3 flex items-center justify-between text-[10px] text-neutral-400">
          <span>Dec 19, 2026</span>
          <span className="flex items-center gap-1 font-semibold text-pine">
            <ShieldCheck className="w-3 h-3 text-spring" /> Verified Pass
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed on the left) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-neutral-200 h-screen sticky top-0 shrink-0 z-30 shadow-2xs">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Responsive slide-out) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export function DashboardTopBar({
  title,
  subtitle,
  badgeText,
  onOpenMobile,
}: {
  title: string;
  subtitle?: string;
  badgeText?: string;
  onOpenMobile: () => void;
}) {
  return (
    <div className="h-16 px-4 sm:px-8 border-b border-neutral-200/90 bg-white flex items-center justify-between gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          className="md:hidden p-2 rounded-xl text-neutral-600 hover:text-pine hover:bg-neutral-100 transition-colors shrink-0"
          aria-label="Open sidebar menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-pine truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-neutral-500 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-pine border border-neutral-200">
          19 Dec 2026 • Kano
        </span>
        {badgeText && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-spring text-navy shadow-2xs">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
