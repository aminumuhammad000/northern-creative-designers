"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Calendar,
  QrCode,
  User,
  ExternalLink,
  Clock,
  Bookmark,
  BookmarkCheck,
  FileText,
  Flame,
  Copy,
  ThumbsUp,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DigitalPass } from "@/components/dashboard/DigitalPass";

type TabId = "pass" | "schedule" | "hackathon" | "toolkit" | "profile";

export default function ParticipantDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("pass");
  const [scheduleFilter, setScheduleFilter] = useState<string>("all");
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>([
    "session-keynote",
    "session-hackathon",
    "session-pricing",
  ]);
  const [hasVotedTeam, setHasVotedTeam] = useState<string | null>(null);
  const [voteTally, setVoteTally] = useState<Record<string, number>>({
    "team-1": 142,
    "team-2": 118,
    "team-3": 96,
  });
  const [directoryOptIn, setDirectoryOptIn] = useState(true);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Mock verified attendee data
  const attendee = {
    name: "Amina Bello",
    email: "amina.bello@example.com",
    role: "UI/UX & Product Designer",
    experience: "Mid-Level (3-5 years)",
    organization: "Bayero Tech Innovation Lab",
    cityState: "Kano, Nigeria",
    referenceCode: "NCD26-KN-9482",
    ticketToken: "TKT-NCD26-948201-CRYPTOPASS",
    tshirtSize: "Medium",
    dietary: "Standard / Halal",
    interests: ["Live Design Hackathon", "Masterclasses", "Client Connect Corner"],
  };

  const toggleBookmark = (sessionId: string) => {
    if (bookmarkedSessions.includes(sessionId)) {
      setBookmarkedSessions(bookmarkedSessions.filter((id) => id !== sessionId));
    } else {
      setBookmarkedSessions([...bookmarkedSessions, sessionId]);
    }
  };

  const copyCouponCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2500);
    }
  };

  const handleCastVote = (teamId: string) => {
    if (hasVotedTeam) return;
    setHasVotedTeam(teamId);
    setVoteTally((prev) => ({
      ...prev,
      [teamId]: (prev[teamId] || 0) + 1,
    }));
  };

  const totalVotes = Object.values(voteTally).reduce((a, b) => a + b, 0);

  const ALL_SESSIONS = [
    {
      id: "session-keynote",
      time: "09:30 AM - 10:30 AM",
      title: "Opening Keynote: Roots & Vectors — Shaping the Future of Arewa Design",
      speaker: "Keynote Speaker to be announced",
      venue: "Main Auditorium",
      category: "keynote",
      tag: "Keynote",
    },
    {
      id: "session-panel-1",
      time: "10:45 AM - 11:45 AM",
      title: "Panel: Bridging Indigenous Storytelling with Cutting-Edge Modern Craft",
      speaker: "Leading Northern Design Directors & Creative Agency Founders",
      venue: "Main Auditorium",
      category: "panel",
      tag: "Panel",
    },
    {
      id: "session-hackathon",
      time: "12:00 PM - 02:00 PM",
      title: "2-Hour Live Design Hackathon Final Stage Sprint",
      speaker: "Shortlisted Design Teams Live on Stage",
      venue: "Hackathon Stage",
      category: "hackathon",
      tag: "Hackathon",
    },
    {
      id: "session-pricing",
      time: "02:30 PM - 03:30 PM",
      title: "Masterclass: Sustainable Pricing, Client Negotiation & Pitching from Arewa",
      speaker: "Creative Business Strategists",
      venue: "Workshop Lab A",
      category: "masterclass",
      tag: "Masterclass",
    },
    {
      id: "session-tech",
      time: "03:30 PM - 04:15 PM",
      title: "Design Systems & Code: Building Scalable UI Kits with Figma and Tailwind",
      speaker: "Software & Design Engineering Specialists",
      venue: "Workshop Lab B",
      category: "masterclass",
      tag: "Masterclass",
    },
    {
      id: "session-awards",
      time: "04:30 PM - 05:45 PM",
      title: "Summit 2.0 Recognition Awards, Hackathon Winners & Closing Networking",
      speaker: "NCD Executive Committee & VIP Sponsors",
      venue: "Main Auditorium",
      category: "awards",
      tag: "Awards Ceremony",
    },
  ];

  const filteredSessions =
    scheduleFilter === "all"
      ? ALL_SESSIONS
      : ALL_SESSIONS.filter((s) => s.category === scheduleFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      {/* Universal Clean Dashboard Navigation */}
      <DashboardNav
        userRole="attendee"
        userName={attendee.name}
        badgeLabel="Delegate"
      />

      {/* Sub-Nav Tabs Bar with Recognizable Micro-Badges */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: "pass", label: "QR Pass", micro: "Check-in", icon: QrCode },
              { id: "schedule", label: "My Schedule", micro: "6 Sessions", icon: Calendar },
              { id: "hackathon", label: "Hackathon & Voting", micro: "Vote Live", icon: Flame },
              { id: "toolkit", label: "Delegate Toolkit", micro: "Free Perks", icon: FileText },
              { id: "profile", label: "Profile & Settings", micro: "Directory", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`inline-flex items-center gap-2 py-3.5 text-xs transition-all whitespace-nowrap border-b-2 ${
                    isActive
                      ? "border-pine text-pine font-bold"
                      : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 font-medium"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      isActive
                        ? "bg-pine/10 text-pine font-semibold"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {tab.micro}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: DIGITAL PASS ================= */}
        {activeTab === "pass" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: The Real Professional Conference Digital Pass with 3D Flip & Wallet actions */}
              <div className="lg:col-span-7">
                <DigitalPass
                  attendee={{
                    ...attendee,
                    passType: "DELEGATE",
                  }}
                />
              </div>

              {/* Right Column: Status & Logistics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-pine uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-spring" />
                    Registration Checklist
                  </h3>

                  <div className="space-y-2.5 text-xs text-neutral-600">
                    <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                      <span>Admission:</span>
                      <span className="font-semibold text-pine">Verified</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                      <span>Merch T-Shirt:</span>
                      <span className="font-semibold text-pine">Size {attendee.tshirtSize}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                      <span>Hackathon Vote:</span>
                      <span className="font-semibold text-pine">1 Vote Token Issued</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span>Dietary:</span>
                      <span className="font-semibold text-pine">{attendee.dietary}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-pine uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    Venue Arrival Information
                  </h4>
                  <div className="space-y-2 text-xs text-neutral-600">
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Date:</span>
                      <span className="font-semibold text-neutral-800">{eventConfig.date}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Check-in Opens:</span>
                      <span className="font-semibold text-pine">08:30 AM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Entrance:</span>
                      <span className="font-semibold text-neutral-800">Auditorium Main Gate</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">City / State:</span>
                      <span className="font-semibold text-neutral-800">{eventConfig.city}, Nigeria</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-5 space-y-2">
                  <h4 className="text-xs font-bold text-pine uppercase tracking-wider">
                    Need Help On Event Day?
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Have questions regarding Kano hotel bookings or venue directions? Reach the Secretariat directly.
                  </p>
                  <a
                    href="https://wa.me/2347030058919"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-pine hover:text-spring transition-colors pt-1"
                  >
                    Contact Secretariat on WhatsApp
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SCHEDULE & SESSIONS ================= */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
                <div>
                  <h2 className="text-lg font-bold text-pine">Conference Masterclasses &amp; Schedule</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Select and save workshops to plan your day in Kano on December 19, 2026.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
                  {[
                    { id: "all", label: "All" },
                    { id: "keynote", label: "Keynotes" },
                    { id: "panel", label: "Panels" },
                    { id: "hackathon", label: "Hackathon" },
                    { id: "masterclass", label: "Masterclasses" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setScheduleFilter(f.id)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        scheduleFilter === f.id
                          ? "bg-white text-pine font-semibold shadow-2xs"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-neutral-100">
                {filteredSessions.map((session) => {
                  const isSaved = bookmarkedSessions.includes(session.id);
                  return (
                    <div
                      key={session.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                            {session.time}
                          </span>
                          <span className="text-[10px] font-semibold uppercase text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                            {session.tag}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-pine">{session.title}</h3>
                        <p className="text-xs text-neutral-500">
                          {session.speaker} • <span className="text-neutral-700 font-medium">{session.venue}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => toggleBookmark(session.id)}
                        className={`inline-flex items-center justify-center h-9 px-3.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap self-start sm:self-center flex-shrink-0 ${
                          isSaved
                            ? "bg-pine text-white"
                            : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 mr-1.5 text-spring" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
                            Add to Plan
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HACKATHON & VOTING ================= */}
        {activeTab === "hackathon" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
                <div>
                  <h2 className="text-lg font-bold text-pine">2-Hour Live Stage Sprint &amp; Audience Vote</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Shortlisted finalists compete live on stage in Kano. Cast your 1 delegate vote below.
                  </p>
                </div>
                {hasVotedTeam && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Vote Recorded
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    id: "team-1",
                    name: "Team Arewa Heritage UI",
                    track: "UI/UX & Mobile Products",
                    members: "3 Designers (Kano & Kaduna)",
                    pitch: "Modular design tokens and UI components inspired by traditional Hausa geometric architecture.",
                  },
                  {
                    id: "team-2",
                    name: "Vector Craft Studio",
                    track: "Brand Identity Systems",
                    members: "2 Designers (Abuja)",
                    pitch: "Translating Northern indigenous leathercraft patterns into modern corporate vector identities.",
                  },
                  {
                    id: "team-3",
                    name: "Northern Motion Lab",
                    track: "3D & Interactive Motion",
                    members: "3 Creators (Plateau & Bauchi)",
                    pitch: "Interactive 3D cultural web repository preserving and animating historical Arewa storytelling.",
                  },
                ].map((team) => {
                  const votes = voteTally[team.id] || 0;
                  const percent = Math.round((votes / (totalVotes || 1)) * 100);
                  const isVoted = hasVotedTeam === team.id;

                  return (
                    <div
                      key={team.id}
                      className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                        isVoted
                          ? "border-pine bg-neutral-50 shadow-2xs"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                          {team.track}
                        </span>
                        <h3 className="font-bold text-pine text-sm">{team.name}</h3>
                        <p className="text-xs text-neutral-600 leading-relaxed">{team.pitch}</p>
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-neutral-100">
                        <div className="flex justify-between text-[11px] font-medium text-neutral-600">
                          <span>Audience Votes</span>
                          <span className="font-semibold text-pine">{votes} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div
                            className="h-full bg-pine transition-all duration-300 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <button
                          type="button"
                          disabled={hasVotedTeam !== null}
                          onClick={() => handleCastVote(team.id)}
                          className={`w-full h-10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                            isVoted
                              ? "bg-pine text-white shadow-2xs"
                              : hasVotedTeam
                              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                              : "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {isVoted ? "Your Vote" : "Vote for Team"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: TOOLKIT & PERKS ================= */}
        {activeTab === "toolkit" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                id: "perk-vectors",
                title: "Arewa Vector & Geometric Motifs Pack",
                desc: "High-resolution SVG and vector asset library of authentic Northern motifs and textures ready for Figma and Illustrator.",
                badge: "Asset Bundle",
                code: "NCD-AREWA-VECTOR-2026",
              },
              {
                id: "perk-fonts",
                title: "Northern Calligraphy & Display Fonts",
                desc: "Modern display typography crafted for regional poster design, apparel, and cultural branding.",
                badge: "Font License",
                code: "SUMMIT2-AJAMI-TYPO",
              },
              {
                id: "perk-templates",
                title: "Client Proposal & Pricing Contract Kits",
                desc: "Standardized service agreement templates, design sprint estimation formulas, and client onboarding question briefs.",
                badge: "Templates",
                code: "NCD-PROPOSAL-KIT",
              },
              {
                id: "perk-discounts",
                title: "Design Software & Cloud Credits",
                desc: "Summit-exclusive 50% discount vouchers on prototyping, UI design plugins, and web hosting partners.",
                badge: "Discount Code",
                code: "NORTH-CREATIVE-50OFF",
              },
            ].map((perk) => {
              const isCopied = copiedCoupon === perk.code;

              return (
                <div
                  key={perk.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {perk.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-pine">{perk.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{perk.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-neutral-700 bg-neutral-50 px-2.5 py-1 rounded-md border border-neutral-200">
                      {perk.code}
                    </span>
                    <button
                      onClick={() => copyCouponCode(perk.code)}
                      className="h-8 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-pine transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap flex-shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      {isCopied ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 5: PROFILE & SETTINGS ================= */}
        {activeTab === "profile" && (
          <div className="max-w-2xl bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h2 className="text-lg font-bold text-pine">Delegate Profile Settings</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Update your details and public directory presence for the summit.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="space-y-0.5 pr-4">
                  <span className="font-bold text-pine text-xs block">Directory Visibility</span>
                  <span className="text-neutral-500 text-[11px]">
                    Allow other attendees and recruiters to view your discipline and portfolio.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDirectoryOptIn(!directoryOptIn)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                    directoryOptIn ? "bg-pine" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white shadow-xs block absolute top-1 transition-transform ${
                      directoryOptIn ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    defaultValue={attendee.name}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">Email (Confirmed)</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={attendee.email}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-100/70 text-xs text-neutral-400 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">Primary Discipline</label>
                  <input
                    type="text"
                    defaultValue={attendee.role}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">Location / State</label>
                  <input
                    type="text"
                    defaultValue={attendee.cityState}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => alert("Profile changes saved.")}
                  className="h-10 px-6 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs inline-flex items-center justify-center whitespace-nowrap"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
