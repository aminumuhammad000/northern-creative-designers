"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function HackathonRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    teamSize: "2",
    track: "Cultural Heritage & Modern Digital Identity",
    portfolioUrl: "",
    teamSummary: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Stage 1: Registration"
        title="Register for Hackathon 2.0"
        description="Register your team for the 2-Hour Live Design Sprint at the Summit in Kano."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-sand border border-neutral-border text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-spring" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-pine">
                Hackathon Registration Submitted!
              </h2>
              <p className="text-sm text-navy/75 max-w-lg mx-auto">
                Team <span className="font-semibold text-pine">{formData.teamName}</span> has been
                registered for committee qualification. We have dispatched a confirmation receipt to{" "}
                <span className="font-semibold text-pine">{formData.leadEmail}</span>. Shortlisted teams
                will receive challenge briefs and setup instructions 7 days before summit day.
              </p>
            </div>
            <div className="pt-4">
              <Button href="/hackathon" variant="primary" size="md">
                Return to Hackathon Overview
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-border space-y-8 shadow-sm"
          >
            <div className="border-b border-neutral-border pb-4">
              <h3 className="text-xl font-bold text-pine">
                Team Registration Details
              </h3>
              <p className="text-xs text-navy/70 mt-1">
                Teams may consist of 2 to 4 members with complementary skills (UI, graphics, strategy, frontend).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vector Arewa"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Team Lead Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Umar"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.leadName}
                  onChange={(e) =>
                    setFormData({ ...formData, leadName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Team Lead Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="lead@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.leadEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, leadEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Team Lead WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.leadPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, leadPhone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Number of Team Members *
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.teamSize}
                  onChange={(e) =>
                    setFormData({ ...formData, teamSize: e.target.value })
                  }
                >
                  <option value="2">2 Members</option>
                  <option value="3">3 Members</option>
                  <option value="4">4 Members</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Preferred Challenge Track *
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.track}
                  onChange={(e) =>
                    setFormData({ ...formData, track: e.target.value })
                  }
                >
                  <option>Cultural Heritage & Modern Digital Identity</option>
                  <option>Product Design for Emerging Markets</option>
                  <option>AI-Augmented Visual Storytelling</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider">
                Portfolio or Past Project Links *
              </label>
              <input
                type="url"
                required
                placeholder="https://behance.net/yourteam or GitHub link"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                value={formData.portfolioUrl}
                onChange={(e) =>
                  setFormData({ ...formData, portfolioUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider">
                Team Skillsets & Motivation *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly state your team's background (e.g. 1 UI designer, 1 illustrator, 1 developer) and why you want to compete..."
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                value={formData.teamSummary}
                onChange={(e) =>
                  setFormData({ ...formData, teamSummary: e.target.value })
                }
              />
            </div>

            <div className="pt-4 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-navy/60">
                Participation requires on-site attendance at Kano venue on 19th December, 2026.
              </p>
              <Button type="submit" variant="primary" size="lg" icon={<Send className="w-4 h-4" />}>
                Submit Team Registration
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
