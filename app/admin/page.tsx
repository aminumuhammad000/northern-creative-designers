"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { getAdminMetricsAction, adminSignInAction, AdminMetrics } from "@/app/actions/admin";

export default function AdminPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalRegistrations: 0,
    totalTickets: 0,
    checkedInCount: 0,
    totalExhibitors: 0,
    totalHackathonTeams: 0,
    totalVotesCast: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const res = await getAdminMetricsAction();
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
    }
    fetchStats();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");
    setAuthSuccess(false);

    try {
      const res = await adminSignInAction(email, password);
      if (res.success) {
        setAuthSuccess(true);
      } else {
        setAuthError(res.error || "Invalid staff credentials.");
      }
    } catch {
      setAuthError("An unexpected server authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const adminModules = [
    {
      title: "Registrations & Attendee Badges",
      role: "Registration Staff",
      metric: `${metrics.totalRegistrations} Registered`,
      desc: "Live verified roster in Supabase database.",
      icon: <Users className="w-5 h-5 text-spring" />,
    },
    {
      title: "Fast-Track QR Check-In Scanner",
      role: "Event Staff",
      metric: `${metrics.checkedInCount} Checked In`,
      desc: "Digital ticket validations recorded in real time.",
      icon: <QrCode className="w-5 h-5 text-tangerine" />,
    },
    {
      title: "Exhibitor & Marketplace Desks",
      role: "Exhibitor Manager",
      metric: `${metrics.totalExhibitors} Applications`,
      desc: "Vendor applications queued for booth approval.",
      icon: <Store className="w-5 h-5 text-spring" />,
    },
    {
      title: "Hackathon & Stage Sprints",
      role: "Hackathon Manager",
      metric: `${metrics.totalHackathonTeams} Teams`,
      desc: "Shortlisted 2-Hour Live Stage Sprint teams.",
      icon: <Zap className="w-5 h-5 text-tangerine" />,
    },
    {
      title: "Live Audience Voting Console",
      role: "Super Admin",
      metric: `${metrics.totalVotesCast} Votes`,
      desc: "Live cryptographic votes tallied on stage.",
      icon: <BarChart3 className="w-5 h-5 text-spring" />,
    },
  ];

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Security Perimeter"
        title="Organiser & Administration Portal"
        description="Live event operation control center for the Northern Creative Designers Executive Committee, staff, and judges."
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
                  <p className="text-xs text-navy/60">Live Supabase Auth Control</p>
                </div>
              </div>

              {authSuccess && (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Authenticated successfully. Session initialized.</span>
                </div>
              )}

              {authError && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 font-medium leading-relaxed flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Authorised Staff Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="support@northcdesigner.com.ng"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Staff Passkey / Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Authenticating...
                      </span>
                    ) : (
                      "Sign In to Control Center"
                    )}
                  </Button>
                </div>
              </form>

              <div className="pt-2 text-xs text-navy/60 text-center">
                All staff access events are audited via Supabase Security Logs.
              </div>
            </div>
          </div>

          {/* Right Column: Platform Architecture Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border space-y-4">
              <span className="text-xs font-bold text-spring uppercase tracking-wider">
                Live Summit Operations Engine
              </span>
              <h3 className="text-2xl font-bold text-pine">
                Event Operational Desks
              </h3>
              <p className="text-navy/75 text-sm leading-relaxed">
                Connected directly to the production database to monitor attendee admissions,
                marketplace booths, hackathon voting traffic, and ticket check-ins.
              </p>
            </div>

            <div className="space-y-3">
              {adminModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-neutral-border flex items-start gap-4 hover:border-pine/30 transition-all shadow-2xs"
                >
                  <div className="p-2 rounded-lg bg-neutral-sand">{mod.icon}</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-pine text-sm">{mod.title}</h4>
                      <span className="text-xs font-mono font-bold text-pine bg-spring/20 px-2 py-0.5 rounded border border-spring/30">
                        {mod.metric}
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
