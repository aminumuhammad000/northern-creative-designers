"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Users,
  QrCode,
  Store,
  Zap,
  BarChart3,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export default function AdminPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(
      "Administrative credentials are provisioned by the Executive Committee and will be activated alongside the Phase 2 Supabase authentication release."
    );
  };

  const adminModules = [
    {
      title: "Registrations & Attendee Badges",
      role: "Registration Staff",
      desc: "Search, filter, manage dietary flags, and export attendee rosters.",
      icon: <Users className="w-5 h-5 text-spring" />,
    },
    {
      title: "Fast-Track QR Check-In Scanner",
      role: "Event Staff",
      desc: "Camera-assisted mobile scanner to validate digital passes at Kano venue.",
      icon: <QrCode className="w-5 h-5 text-tangerine" />,
    },
    {
      title: "Exhibitor & Marketplace Desks",
      role: "Exhibitor Manager",
      desc: "Review vendor applications, assign booth spaces, and trigger approval notices.",
      icon: <Store className="w-5 h-5 text-spring" />,
    },
    {
      title: "Hackathon & Stage Sprints",
      role: "Hackathon Manager",
      desc: "Manage team rosters, challenge rubrics, judge scoring, and timer sync.",
      icon: <Zap className="w-5 h-5 text-tangerine" />,
    },
    {
      title: "Live Audience Voting Console",
      role: "Super Admin",
      desc: "Open and close the live ballot window, monitor vote traffic, and detect anomalies.",
      icon: <BarChart3 className="w-5 h-5 text-spring" />,
    },
  ];

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Security Perimeter"
        title="Organiser & Administration Portal"
        description="Centralised management system for the Northern Creative Designers Executive Committee, event staff, and judges."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Secure Login Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-white border border-neutral-border shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-neutral-border pb-4">
                <div className="w-10 h-10 rounded-lg bg-pine text-white flex items-center justify-center">
                  <Lock className="w-5 h-5 text-spring" />
                </div>
                <div>
                  <h3 className="font-bold text-pine text-lg">Staff Authentication</h3>
                  <p className="text-xs text-navy/60">Restricted to authorised organisers</p>
                </div>
              </div>

              {authError && (
                <div className="p-3.5 rounded-lg bg-tangerine/10 border border-tangerine/30 text-xs text-pine font-medium leading-relaxed flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-tangerine flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleSimulatedLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider">
                    Authorised Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@northcdesigners.org"
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:border-spring transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider">
                    Password / Passkey
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:border-spring transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full">
                  Sign In to Control Center
                </Button>
              </form>

              <div className="pt-2 text-xs text-navy/60 text-center">
                Access attempts are logged for audit compliance.
              </div>
            </div>
          </div>

          {/* Right Column: Platform Architecture Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-4">
              <span className="text-xs font-bold text-spring uppercase tracking-wider">
                Role-Based Access Control Architecture
              </span>
              <h3 className="text-2xl font-bold text-pine">
                Event Operational Desks
              </h3>
              <p className="text-navy/75 text-sm leading-relaxed">
                The summit administration engine is designed on least-privilege principles,
                enabling segmented operations across registration clerks, hackathon juries,
                exhibitor leads, and executive supervisors.
              </p>
            </div>

            <div className="space-y-3">
              {adminModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-neutral-border flex items-start gap-4 hover:border-pine/30 transition-all"
                >
                  <div className="p-2 rounded-lg bg-neutral-sand">{mod.icon}</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-pine text-sm">{mod.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-pine/5 text-pine">
                        {mod.role}
                      </span>
                    </div>
                    <p className="text-xs text-navy/70 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
