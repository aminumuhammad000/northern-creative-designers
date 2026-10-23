import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  ArrowRight,
  Download,
  Users,
  Layers,
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
        "Fast-track QR scanning and credential badge pickup at registration desk. Morning coffee and welcome mixer with fellow delegates across 19 Northern states.",
      icon: <Coffee className="w-5 h-5 text-spring" />,
      location: "Main Reception & Networking Atrium",
    },
    {
      time: "09:30 AM - 10:30 AM",
      category: "Keynote Address",
      title: "Roots & Vectors: Northern Design History & Digital Semiotics",
      description:
        "An in-depth historical exploration of traditional Arewa motifs, geometry, typography, and how indigenous storytelling bridges modern global digital products.",
      icon: <Sparkles className="w-5 h-5 text-tangerine" />,
      location: "Main Auditorium Stage",
    },
    {
      time: "10:30 AM - 11:45 AM",
      category: "Candid Panel Session",
      title: "The Pricing Matrix: Navigating Regional Budgets vs Global Markets",
      description:
        "Unfiltered panel discussing sustainable pricing, value-based proposals, retainer negotiation, and international freelancing from Northern Nigeria.",
      icon: <Briefcase className="w-5 h-5 text-spring" />,
      location: "Main Auditorium Stage",
    },
    {
      time: "11:45 AM - 01:45 PM",
      category: "Live Competition",
      title: "Northern Design Hackathon 2.0: 2-Hour Live Design Sprint",
      description:
        "Finalist teams take the stage to build real-time solutions for live briefs. Audience watches sprints develop on live hall feeds with real-time voting.",
      icon: <Zap className="w-5 h-5 text-tangerine" />,
      location: "Hackathon Stage & Live Feeds",
    },
    {
      time: "01:45 PM - 02:45 PM",
      category: "Networking & Exhibition",
      title: "Client Connect Corner, Summit Marketplace & Lunch",
      description:
        "Dedicated pitch sessions between business founders and designers. Explore partner exhibition booths, portfolio reviews, and refreshments.",
      icon: <Coffee className="w-5 h-5 text-spring" />,
      location: "Exhibition Hall & Client Connect Corner",
    },
    {
      time: "02:45 PM - 04:00 PM",
      category: "Masterclass Sprint",
      title: "Practical AI Workflow Integration in Modern Brand Craft",
      description:
        "Hands-on demonstration on augmenting vector precision, typography systems, and high-fidelity rendering without losing cultural authenticity.",
      icon: <Sparkles className="w-5 h-5 text-spring" />,
      location: "Masterclass Workshop Wing",
    },
    {
      time: "04:00 PM - 05:30 PM",
      category: "Awards & Finale",
      title: "Summit 2.0 Regional Awards & Hackathon Winner Announcement",
      description:
        "Presentation of trophies, hardware prizes, cash grants (following 2025's ₦100k standard), and closing reflections by the Executive Committee.",
      icon: <Trophy className="w-5 h-5 text-tangerine" />,
      location: "Main Auditorium Stage",
    },
  ];

  const tracks = [
    {
      name: "Brand & Cultural Systems",
      desc: "Typography, vector geometry, and identity systems inspired by Arewa heritage.",
      color: "bg-pine text-white",
    },
    {
      name: "Product & UI/UX Craft",
      desc: "User research, Figma design systems, accessibility, and high-conversion UX flows.",
      color: "bg-[#071135] text-white",
    },
    {
      name: "Motion, 3D & AI",
      desc: "Cinema 4D, Blender, kinetic branding, and AI-assisted creative workflows.",
      color: "bg-[#453478] text-white",
    },
    {
      name: "Enterprise & Dealmaking",
      desc: "Client Connect Corner, retainer negotiation, and agency commercial growth.",
      color: "bg-[#F39200] text-white",
    },
  ];

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Full Schedule"
        title="Summit 2.0 Programme"
        description="A high-intensity, practical day designed to elevate your craft, connect you with paying clients, and celebrate Northern design excellence."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
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
          <div className="flex items-center gap-3">
            <Link
              href="/NCD Summit 26.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pine/30 text-pine text-xs font-semibold uppercase tracking-wider hover:bg-pine/5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </Link>
            <Button href="/register" variant="primary" size="sm">
              Register for Access
            </Button>
          </div>
        </div>

        {/* Previous Edition vs Upcoming Edition Comparison Row */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
              Programme Evolution
            </h2>
            <p className="text-navy/70 text-sm leading-relaxed max-w-2xl">
              From our physical masterclasses in Summit 1.0 to our expanded multi-stage 2026 conference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Previous Edition */}
            <div className="rounded-3xl overflow-hidden border border-neutral-border bg-white shadow-md flex flex-col group">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/ncd_tutor_presenting.jpg"
                  alt="Summit 1.0 Hands-On Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  Previous: Summit 1.0
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-black text-lg">Intensive Technical Bootcamps</p>
                  <p className="text-white/75 text-xs font-mono">225+ Certified Practitioners Trained</p>
                </div>
              </div>
              <div className="p-6 space-y-2 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  Conducted three dedicated bootcamps across Brand Identity Masterlab, The Design Code, and UI/UX Digital Systems in Kano.
                </p>
                <div className="pt-3 border-t border-neutral-border/60 text-xs font-mono text-pine/80 font-bold">
                  ✦ Physical Labs • Hands-On Mentorship
                </div>
              </div>
            </div>

            {/* Upcoming Edition */}
            <div className="rounded-3xl overflow-hidden border-2 border-spring bg-pine text-white shadow-xl flex flex-col group relative">
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-black/40">
                <Image
                  src="/images/community/ncd_hall_audience.jpg"
                  alt="Summit 2.0 Full Gathering"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-pine/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-spring text-navy text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  Upcoming: 19 December 2026
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-black text-lg">Summit 2.0: Roots &amp; Vectors</p>
                  <p className="text-spring text-xs font-mono font-bold">1,000+ Designers • 3 Stages • Client Connect</p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-pine flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Full-day annual conference combining keynote addresses, unfiltered pricing panels, on-stage live hackathon, and curated exhibition galleries.
                </p>
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-spring uppercase tracking-wider hover:underline"
                  >
                    <span>Claim Your Delegate Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Dedicated Streams */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-pine">
              Four Core Programme Tracks
            </h3>
            <p className="text-xs sm:text-sm text-navy/70">
              Parallel sessions engineered for every discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tracks.map((track, tIdx) => (
              <div
                key={tIdx}
                className={`p-6 rounded-2xl ${track.color} shadow-sm space-y-2 flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80 block mb-2">
                    Track 0{tIdx + 1}
                  </span>
                  <h4 className="font-bold text-base leading-snug">{track.name}</h4>
                  <p className="text-xs opacity-85 leading-relaxed mt-2">{track.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/15 text-[11px] font-mono font-bold">
                  <span>Sessions Included in Pass</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Timeline */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-border">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
                Full Day Timeline
              </h3>
              <p className="text-navy/70 text-xs sm:text-sm mt-1">
                All sessions run on West Africa Time (WAT) at the official Kano summit venue.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-pine/80 bg-pine/5 px-3 py-1 rounded-full border border-pine/10 w-fit">
              7 Curated Programme Modules
            </span>
          </div>

          <div className="space-y-4">
            {scheduleItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-start gap-6"
              >
                <div className="md:w-60 flex-shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-pine/5 text-pine text-xs font-bold font-mono">
                    {item.time}
                  </span>
                  <p className="text-xs font-bold text-spring uppercase tracking-wider mt-2.5">
                    {item.category}
                  </p>
                  <p className="text-[11px] text-navy/50 font-mono mt-1">
                    {item.location}
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-sand flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-pine leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-navy/75 text-xs sm:text-sm leading-relaxed pl-12">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note on confirmations & Registration CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-pine text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Secure Your Place at Summit 2.0
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Admission grants access to all keynote sessions, parallel masterclasses, Client Connect Corner, design exhibition wall, and real-time voting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-spring text-navy text-xs font-bold uppercase tracking-wider hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <span>Register as Attendee</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
