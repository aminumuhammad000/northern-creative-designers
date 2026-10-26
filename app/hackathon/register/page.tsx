"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { registerHackathonTeamAction } from "@/app/actions/onboarding";

export default function HackathonRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const res = await registerHackathonTeamAction(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || "Failed to submit team registration.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
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

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Team Name <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vector Arewa"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Team Lead Full Name <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Umar"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.leadName}
                  onChange={(e) =>
                    setFormData({ ...formData, leadName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Team Lead Email <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="lead@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.leadEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, leadEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Team Lead WhatsApp Phone <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.leadPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, leadPhone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Number of Team Members <span className="text-spring font-bold">*</span>
                </label>
                <select
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs cursor-pointer"
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
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Preferred Challenge Track <span className="text-spring font-bold">*</span>
                </label>
                <select
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs cursor-pointer"
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
              <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                Portfolio or Past Project Links <span className="text-spring font-bold">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://behance.net/yourteam or GitHub link"
                className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                value={formData.portfolioUrl}
                onChange={(e) =>
                  setFormData({ ...formData, portfolioUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                Team Skillsets & Motivation <span className="text-spring font-bold">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly state your team's background (e.g. 1 UI designer, 1 illustrator, 1 developer) and why you want to compete..."
                className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs resize-none"
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
              <Button type="submit" variant="primary" size="lg" icon={<Send className="w-4 h-4 ml-2" />}>
                Submit Team Registration
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
