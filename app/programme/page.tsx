import React from "react";
import { Metadata } from "next";
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
  Briefcase,
  Trophy,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { eventConfig } from "@/config/event";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Summit Programme & Schedule",
  description:
    "Explore the detailed schedule of Northern Creative Designers Summit 2.0: keynotes, candid panel sessions, 2-Hour live design sprint, client connect corner, and awards.",
};

export default function ProgrammePage() {
  const scheduleItems = [
    {
      time: "08:30 AM - 09:30 AM",
      category: "Arrival & Check-in",
      title: "Attendee Badge Verification & Welcome Networking",
      description:
        "Fast-track QR scanning and credential badge pickup at registration desk. Morning coffee and welcome mixer.",
      icon: <Coffee className="w-5 h-5 text-spring" />,
    },
    {
      time: "09:30 AM - 10:30 AM",
      category: "Keynote Address",
      title: "Roots & Vectors: Northern Design History & Digital Semiotics",
      description:
        "An in-depth historical exploration of traditional Arewa motifs, geometry, typography, and how indigenous storytelling bridges modern global digital products.",
      icon: <Sparkles className="w-5 h-5 text-tangerine" />,
    },
    {
      time: "10:30 AM - 11:45 AM",
      category: "Candid Panel Session",
      title: "The Pricing Matrix: Navigating Regional Budgets vs Global Markets",
      description:
        "Unfiltered panel discussing sustainable pricing, value-based proposals, retainer negotiation, and international freelancing from Northern Nigeria.",
      icon: <Briefcase className="w-5 h-5 text-spring" />,
    },
    {
      time: "11:45 AM - 01:45 PM",
      category: "Live Competition",
      title: "Northern Design Hackathon 2.0: 2-Hour Live Design Sprint",
      description:
        "Finalist teams take the stage to build real-time solutions for live briefs. Audience watches sprints develop on live hall feeds with real-time voting.",
      icon: <Zap className="w-5 h-5 text-tangerine" />,
    },
    {
      time: "01:45 PM - 02:45 PM",
      category: "Networking & Exhibition",
      title: "Client Connect Corner, Summit Marketplace & Lunch",
      description:
        "Dedicated pitch sessions between business founders and designers. Explore partner exhibition booths, portfolio reviews, and refreshments.",
      icon: <Coffee className="w-5 h-5 text-spring" />,
    },
    {
      time: "02:45 PM - 04:00 PM",
      category: "Masterclass Sprint",
      title: "Practical AI Workflow Integration in Modern Brand Craft",
      description:
        "Hands-on demonstration on augmenting vector precision, typography systems, and high-fidelity rendering without losing cultural authenticity.",
      icon: <Sparkles className="w-5 h-5 text-spring" />,
    },
    {
      time: "04:00 PM - 05:30 PM",
      category: "Awards & Finale",
      title: "Summit 2.0 Regional Awards & Hackathon Winner Announcement",
      description:
        "Presentation of trophies, hardware prizes, cash grants (following 2025's ₦100k standard), and closing reflections by the Executive Committee.",
      icon: <Trophy className="w-5 h-5 text-tangerine" />,
    },
  ];

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Full Schedule"
        title="Summit 2.0 Programme"
        description="A high-intensity, practical day designed to elevate your craft, connect you with paying clients, and celebrate Northern design excellence."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-neutral-sand border border-neutral-border">
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-pine">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-spring" />
              <span>{eventConfig.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-tangerine" />
              <span>{eventConfig.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-spring" />
              <span>08:30 AM — 05:30 PM WAT</span>
            </div>
          </div>
          <Button href="/register" variant="primary" size="sm">
            Register for Access
          </Button>
        </div>

        {/* Schedule Timeline */}
        <div className="space-y-6">
          {scheduleItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-start gap-6"
            >
              <div className="md:w-64 flex-shrink-0">
                <span className="inline-block px-2.5 py-1 rounded bg-pine/5 text-pine text-xs font-bold font-mono">
                  {item.time}
                </span>
                <p className="text-xs font-semibold text-spring uppercase tracking-wider mt-2">
                  {item.category}
                </p>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-sand flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-pine">
                    {item.title}
                  </h3>
                </div>
                <p className="text-navy/75 text-sm sm:text-base leading-relaxed pl-11">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note on speaker confirmations */}
        <div className="p-6 rounded-xl bg-white border border-neutral-border text-xs text-navy/70 space-y-1">
          <p className="font-semibold text-pine">
            Official Schedule Notice
          </p>
          <p>
            Times are subject to minor adjustments for stage transitions. Keynote speaker assignments and individual panellists will be published in the Speakers section following executive committee validation.
          </p>
        </div>
      </div>
    </main>
  );
}
