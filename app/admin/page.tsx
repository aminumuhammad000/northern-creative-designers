"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Users,
  QrCode,
  Store,
  Zap,
  Search,
  Download,
  Check,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
  LogOut,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Tag,
  Building,
  Shirt,
  Sparkles,
  ArrowRight,
  Loader2,
  Send,
  FileText,
  UserCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  getAdminFullDataAction,
  toggleTicketCheckInAction,
  fastTrackCheckInAction,
  updateExhibitorAction,
  updateHackathonTeamAction,
  adminSignInAction,
  adminSignOutAction,
  sendAdminEmailAction,
  SendEmailPayload,
  SendEmailResult,
  AdminMetrics,
  AdminRegistration,
  AdminExhibitor,
  AdminHackathonTeam,
} from "@/app/actions/admin";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState("support@northcdesigner.com.ng");
  const [password, setPassword] = useState("NCDSummit2026!");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"attendees" | "checkin" | "email" | "exhibitors" | "hackathon">("attendees");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalRegistrations: 0,
    totalTickets: 0,
    checkedInCount: 0,
    totalExhibitors: 0,
    totalHackathonTeams: 0,
    totalVotesCast: 0,
  });
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [exhibitors, setExhibitors] = useState<AdminExhibitor[]>([]);
  const [hackathonTeams, setHackathonTeams] = useState<AdminHackathonTeam[]>([]);

  // Attendee Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInFilter, setCheckInFilter] = useState<"all" | "checked_in" | "not_checked_in">("all");
  const [expandedAttendeeId, setExpandedAttendeeId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fast Check-In Tool State
  const [checkInInput, setCheckInInput] = useState("");
  const [checkInStatus, setCheckInStatus] = useState<{
    type: "success" | "warning" | "error" | null;
    message: string;
    attendee?: AdminRegistration;
  }>({ type: null, message: "" });
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Email Communications State
  const [emailRecipientType, setEmailRecipientType] = useState<
    "individual" | "all_attendees" | "checked_in_only" | "all_exhibitors" | "all_hackathon"
  >("all_attendees");
  const [emailIndividualAddress, setEmailIndividualAddress] = useState("");
  const [emailIndividualName, setEmailIndividualName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSendStatus, setEmailSendStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const emailPresets = [
    {
      name: "Venue Arrival & Pass Reminder",
      subject: "NCD Summit 2.0 — Important Venue Admission & Gate Details",
      body: `We are thrilled to welcome you to the Northern Creative Designers Summit 2.0 this Saturday, 19th December, 2026 at Meena Event Centre, Kano.\n\nDoors open promptly at 08:30 AM.\n\nPlease have your Digital Pass QR Code or Pass Reference ID ready on your smartphone for rapid door check-in.\n\nWe look forward to seeing you at the keynote and creative sessions!`,
    },
    {
      name: "Summit Schedule & Masterclasses",
      subject: "NCD Summit 2.0 — Live Masterclasses & Stage Sprint Lineup",
      body: `Here are key event highlights for Summit 2.0:\n\n- 08:30 AM: Registration Desk & Fast-Track Badge Verification\n- 09:30 AM: Opening Keynote: Roots & Vectors in Northern Design\n- 11:00 AM: Specialized Tracks in UI/UX, Motion, & Brand Systems\n- 02:00 PM: 2-Hour Live Stage Sprint Finalists & Audience Voting\n- 04:30 PM: Awards Showcase & Networking\n\nVenue: Meena Event Centre, Kano.`,
    },
    {
      name: "Exhibitor & Marketplace Brief",
      subject: "NCD Summit 2.0 — Exhibitor Booth Setup & Marketplace Guidelines",
      body: `Dear Partner & Exhibitor,\n\nWe look forward to featuring your brand at the Summit 2.0 Design & Tech Marketplace.\n\nBooth setup begins at 07:00 AM on Saturday, 19th December, 2026 at Meena Event Centre, Kano.\n\nPlease report to the Exhibitor Welcome Desk upon arrival for your booth tags and Wi-Fi access credentials.`,
    },
  ];

  // Check saved session on mount
  useEffect(() => {
    const savedSession = sessionStorage.getItem("ncd_admin_session");
    if (savedSession === "active") {
      setIsAuthenticated(true);
      fetchFullData();
    }
  }, []);

  const fetchFullData = async () => {
    setIsLoadingData(true);
    try {
      const res = await getAdminFullDataAction();
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
        setRegistrations(res.registrations || []);
        setExhibitors(res.exhibitors || []);
        setHackathonTeams(res.hackathonTeams || []);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingAuth(true);
    setAuthError("");

    try {
      const res = await adminSignInAction(email, password);
      if (res.success) {
        sessionStorage.setItem("ncd_admin_session", "active");
        setIsAuthenticated(true);
        await fetchFullData();
      } else {
        setAuthError(res.error || "Invalid staff credentials.");
      }
    } catch {
      setAuthError("An unexpected server authentication error occurred.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("ncd_admin_session");
    await adminSignOutAction();
    setIsAuthenticated(false);
  };

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  // Toggle Check-In for an Attendee
  const handleToggleCheckIn = async (attendee: AdminRegistration) => {
    if (!attendee.ticket) {
      alert("No active ticket record found for this attendee.");
      return;
    }

    const newCheckedIn = !attendee.ticket.checked_in;
    const ticketId = attendee.ticket.id;

    // Optimistic UI update
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === attendee.id && reg.ticket) {
          return {
            ...reg,
            ticket: {
              ...reg.ticket,
              checked_in: newCheckedIn,
              checked_in_at: newCheckedIn ? new Date().toISOString() : null,
            },
          };
        }
        return reg;
      })
    );

    setMetrics((prev) => ({
      ...prev,
      checkedInCount: prev.checkedInCount + (newCheckedIn ? 1 : -1),
    }));

    startTransition(async () => {
      const res = await toggleTicketCheckInAction(ticketId, newCheckedIn);
      if (!res.success) {
        alert(res.error || "Failed to update check-in status.");
        fetchFullData();
      }
    });
  };

  // Fast Check-In Handler
  const handleFastCheckInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInInput.trim()) return;

    setIsCheckingIn(true);
    setCheckInStatus({ type: null, message: "" });

    try {
      const res = await fastTrackCheckInAction(checkInInput.trim());
      if (res.success && res.attendee) {
        if (res.status === "already_checked_in") {
          setCheckInStatus({
            type: "warning",
            message: res.message || "Attendee has already checked in.",
            attendee: res.attendee,
          });
        } else {
          setCheckInStatus({
            type: "success",
            message: res.message || "Successfully checked in!",
            attendee: res.attendee,
          });
          fetchFullData();
        }
      } else {
        setCheckInStatus({
          type: "error",
          message: res.error || "No attendee matching that code was found.",
        });
      }
    } catch {
      setCheckInStatus({
        type: "error",
        message: "Network error during fast check-in verification.",
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Open Email Composer pre-filled for an Individual Attendee
  const handleOpenEmailForAttendee = (attendee: AdminRegistration) => {
    setEmailRecipientType("individual");
    setEmailIndividualAddress(attendee.email);
    setEmailIndividualName(attendee.full_name);
    setEmailSubject(`NCD Summit 2.0 — Official Update for ${attendee.full_name}`);
    setEmailMessage(
      `Dear ${attendee.full_name},\n\nWe are writing regarding your registration for the Northern Creative Designers Summit 2.0 (Pass Reference: ${attendee.reference_code}).\n\n`
    );
    setEmailSendStatus({ type: null, message: "" });
    setActiveTab("email");
  };

  // Send Email Handler
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);
    setEmailSendStatus({ type: null, message: "" });

    try {
      const res = await sendAdminEmailAction({
        recipientType: emailRecipientType,
        individualEmail: emailIndividualAddress,
        individualName: emailIndividualName,
        subject: emailSubject,
        message: emailMessage,
      });

      if (res.success) {
        setEmailSendStatus({
          type: "success",
          message: res.message || `Dispatched to ${res.sentCount} recipient(s) successfully!`,
        });
      } else {
        setEmailSendStatus({
          type: "error",
          message: res.error || "Failed to dispatch email.",
        });
      }
    } catch {
      setEmailSendStatus({
        type: "error",
        message: "An unexpected communication error occurred while dispatching email.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Update Exhibitor status
  const handleUpdateExhibitor = async (id: string, status: string, booth?: string) => {
    startTransition(async () => {
      const res = await updateExhibitorAction(id, status, booth);
      if (res.success) {
        setExhibitors((prev) =>
          prev.map((ex) => (ex.id === id ? { ...ex, status, assigned_booth: booth || ex.assigned_booth } : ex))
        );
      } else {
        alert(res.error || "Failed to update exhibitor.");
      }
    });
  };

  // Update Hackathon Team status
  const handleUpdateHackathonTeam = async (id: string, status: string) => {
    startTransition(async () => {
      const res = await updateHackathonTeamAction(id, status);
      if (res.success) {
        setHackathonTeams((prev) =>
          prev.map((tm) => (tm.id === id ? { ...tm, status } : tm))
        );
      } else {
        alert(res.error || "Failed to update team.");
      }
    });
  };

  // Filtered Attendees
  const filteredAttendees = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        searchQuery === "" ||
        reg.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.reference_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reg.creative_discipline && reg.creative_discipline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reg.city_state && reg.city_state.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reg.organization && reg.organization.toLowerCase().includes(searchQuery.toLowerCase()));

      const isCheckedIn = Boolean(reg.ticket?.checked_in);
      const matchesCheckIn =
        checkInFilter === "all" ||
        (checkInFilter === "checked_in" && isCheckedIn) ||
        (checkInFilter === "not_checked_in" && !isCheckedIn);

      return matchesSearch && matchesCheckIn;
    });
  }, [registrations, searchQuery, checkInFilter]);

  // Export Attendees to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert("No attendee records available to export.");
      return;
    }

    const headers = [
      "Reference Code",
      "Full Name",
      "Email",
      "Phone",
      "Role / Discipline",
      "City / State",
      "Organization",
      "T-Shirt Size",
      "Dietary Requirements",
      "Checked In",
      "Check-in Timestamp",
      "Ticket Token",
      "Registration Date",
    ];

    const rows = registrations.map((r) => [
      `"${r.reference_code}"`,
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.creative_discipline || ""}"`,
      `"${r.city_state || ""}"`,
      `"${(r.organization || "").replace(/"/g, '""')}"`,
      `"${r.tshirt_size || ""}"`,
      `"${r.dietary_requirements || ""}"`,
      r.ticket?.checked_in ? "YES" : "NO",
      `"${r.ticket?.checked_in_at || ""}"`,
      `"${r.ticket?.ticket_token || ""}"`,
      `"${r.created_at || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NCD_Summit_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If Not Authenticated: Render Staff Sign-In
  if (!isAuthenticated) {
    return (
      <main className="flex-1 pb-20">
        <PageHeader
          tag="Security Perimeter"
          title="Summit Operations Portal"
          description="Live administration and venue admission control center for Northern Creative Designers."
        />

        <div className="max-w-md mx-auto px-4 pt-12">
          <div className="p-8 rounded-3xl bg-white border border-neutral-border shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-border pb-4">
              <div className="w-12 h-12 rounded-2xl bg-pine text-white flex items-center justify-center shadow-sm">
                <Lock className="w-6 h-6 text-spring" />
              </div>
              <div>
                <h3 className="font-bold text-pine text-lg">Staff Authentication</h3>
                <p className="text-xs text-navy/60">Live Supabase Database Admin</p>
              </div>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium leading-relaxed flex items-start gap-2">
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
                  className="w-full h-12"
                  disabled={isLoadingAuth}
                >
                  {isLoadingAuth ? (
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

            <div className="pt-2 p-3 bg-neutral-sand/60 rounded-xl border border-neutral-200/80 text-[11px] text-navy/70 space-y-1">
              <span className="font-bold text-pine block">Staff Access Help:</span>
              <p>Email: <span className="font-mono text-pine">support@northcdesigner.com.ng</span></p>
              <p>Passkey: <span className="font-mono text-pine">NCDSummit2026!</span></p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Calculate percentage checked in
  const checkInPercentage =
    metrics.totalRegistrations > 0
      ? Math.round((metrics.checkedInCount / metrics.totalRegistrations) * 100)
      : 0;

  // Calculate recipient count for the selected audience
  const estimatedRecipientsCount = (() => {
    switch (emailRecipientType) {
      case "individual":
        return emailIndividualAddress.trim() ? 1 : 0;
      case "all_attendees":
        return registrations.length;
      case "checked_in_only":
        return registrations.filter((r) => r.ticket?.checked_in).length;
      case "all_exhibitors":
        return exhibitors.length;
      case "all_hackathon":
        return hackathonTeams.length;
      default:
        return 0;
    }
  })();

  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      {/* Top Admin Sticky Bar */}
      <div className="bg-pine text-white border-b border-pine/80 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-spring text-sm border border-white/15">
              NCD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base text-white tracking-tight">
                  Summit 2.0 Command Center
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Supabase &amp; Resend
                </span>
              </div>
              <p className="text-[11px] text-white/70">
                Kano, 19th December 2026 • Roots &amp; Vectors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchFullData}
              disabled={isLoadingData}
              title="Refresh live data"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors border border-white/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-spring hover:bg-spring/90 text-navy text-xs font-bold transition-all shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              title="Sign out of staff portal"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-200 text-xs font-semibold transition-colors border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* KPI Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Attendees */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Total Registered
              </span>
              <div className="p-2 rounded-xl bg-pine/10 text-pine">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-pine font-mono">
                {metrics.totalRegistrations}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Delegates</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Verified attendee passes issued
            </p>
          </div>

          {/* Checked-In Stats */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Checked In
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <QrCode className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                {metrics.checkedInCount}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                ({checkInPercentage}% of total)
              </span>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${checkInPercentage}%` }}
              />
            </div>
          </div>

          {/* Exhibitor Applications */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Exhibitors &amp; Partners
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-pine font-mono">
                {metrics.totalExhibitors}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Partners</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Design market and brand showcases
            </p>
          </div>

          {/* Hackathon Teams */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Stage Sprints
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-pine font-mono">
                {metrics.totalHackathonTeams}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Teams</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              2-Hour Live Stage Finalists
            </p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("attendees")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "attendees"
                ? "bg-pine text-white shadow-sm"
                : "text-neutral-600 hover:text-pine hover:bg-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Attendees ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("checkin")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "checkin"
                ? "bg-pine text-white shadow-sm"
                : "text-neutral-600 hover:text-pine hover:bg-white"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Fast Check-In</span>
          </button>

          <button
            onClick={() => setActiveTab("email")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "email"
                ? "bg-pine text-white shadow-sm"
                : "text-neutral-600 hover:text-pine hover:bg-white"
            }`}
          >
            <Send className="w-4 h-4 text-spring" />
            <span>Send Email Broadcast</span>
          </button>

          <button
            onClick={() => setActiveTab("exhibitors")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "exhibitors"
                ? "bg-pine text-white shadow-sm"
                : "text-neutral-600 hover:text-pine hover:bg-white"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Exhibitors ({exhibitors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("hackathon")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "hackathon"
                ? "bg-pine text-white shadow-sm"
                : "text-neutral-600 hover:text-pine hover:bg-white"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Hackathon ({hackathonTeams.length})</span>
          </button>
        </div>

        {/* TAB 1: ATTENDEES */}
        {activeTab === "attendees" && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, ref code, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl border border-neutral-200 bg-neutral-sand/20 hover:bg-white focus:bg-white text-xs sm:text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                <button
                  onClick={() => setCheckInFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    checkInFilter === "all"
                      ? "bg-neutral-800 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  All ({registrations.length})
                </button>
                <button
                  onClick={() => setCheckInFilter("not_checked_in")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    checkInFilter === "not_checked_in"
                      ? "bg-amber-500 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Pending ({registrations.filter((r) => !r.ticket?.checked_in).length})
                </button>
                <button
                  onClick={() => setCheckInFilter("checked_in")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    checkInFilter === "checked_in"
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Checked In ({registrations.filter((r) => r.ticket?.checked_in).length})
                </button>
              </div>
            </div>

            {/* Attendees Table / List */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
              {filteredAttendees.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Users className="w-12 h-12 text-neutral-300 mx-auto" />
                  <h4 className="font-bold text-neutral-700 text-base">No attendees match your query</h4>
                  <p className="text-xs text-neutral-500">
                    Try adjusting your search terms or filter selection.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4 sm:px-6">Delegate</th>
                        <th className="py-3.5 px-4">Pass Reference</th>
                        <th className="py-3.5 px-4">Discipline / Role</th>
                        <th className="py-3.5 px-4">City</th>
                        <th className="py-3.5 px-4">Admission Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredAttendees.map((attendee) => {
                        const isCheckedIn = Boolean(attendee.ticket?.checked_in);
                        const isExpanded = expandedAttendeeId === attendee.id;
                        const initials = attendee.full_name
                          .split(" ")
                          .filter(Boolean)
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();

                        return (
                          <React.Fragment key={attendee.id}>
                            <tr className="hover:bg-neutral-50/60 transition-colors">
                              {/* Delegate Info */}
                              <td className="py-3.5 px-4 sm:px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-pine/10 text-pine flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    {initials}
                                  </div>
                                  <div className="min-w-0">
                                    <span className="font-bold text-neutral-900 block truncate">
                                      {attendee.full_name}
                                    </span>
                                    <span className="text-[11px] text-neutral-500 block truncate">
                                      {attendee.email}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Pass Reference */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200">
                                  <span className="font-mono text-xs font-bold text-pine">
                                    {attendee.reference_code}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(attendee.reference_code)}
                                    title="Copy reference code"
                                    className="text-neutral-400 hover:text-pine p-0.5"
                                  >
                                    {copiedCode === attendee.reference_code ? (
                                      <Check className="w-3 h-3 text-pine" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </td>

                              {/* Discipline / Role */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="text-neutral-800 font-medium block">
                                  {attendee.creative_discipline}
                                </span>
                                {attendee.organization && (
                                  <span className="text-[10px] text-neutral-500 block truncate">
                                    {attendee.organization}
                                  </span>
                                )}
                              </td>

                              {/* City */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="font-medium text-neutral-700">
                                  {attendee.city_state}
                                </span>
                              </td>

                              {/* Admission Status */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                {isCheckedIn ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Checked In
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    Pending Door
                                  </span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5 sm:space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEmailForAttendee(attendee)}
                                  className="px-2.5 py-1.5 rounded-lg text-neutral-600 hover:text-pine hover:bg-neutral-100 border border-neutral-200 transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                                  title="Send direct email to this delegate"
                                >
                                  <Mail className="w-3.5 h-3.5 text-pine" />
                                  <span className="hidden xl:inline">Email</span>
                                </button>

                                <button
                                  onClick={() => handleToggleCheckIn(attendee)}
                                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-2xs ${
                                    isCheckedIn
                                      ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300"
                                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  }`}
                                >
                                  {isCheckedIn ? "Undo" : "Check In"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedAttendeeId(isExpanded ? null : attendee.id)
                                  }
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors inline-block"
                                  title="View details"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              </td>
                            </tr>

                            {/* Expanded Details Drawer */}
                            {isExpanded && (
                              <tr className="bg-neutral-50/90 border-b border-neutral-200">
                                <td colSpan={6} className="p-4 sm:p-5">
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                        Contact Info
                                      </span>
                                      <p className="flex items-center gap-1.5 text-neutral-700">
                                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                                        {attendee.phone}
                                      </p>
                                      <p className="flex items-center gap-1.5 text-neutral-700">
                                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                                        {attendee.email}
                                      </p>
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                        Logistics &amp; Merch
                                      </span>
                                      <p className="flex items-center gap-1.5 text-neutral-700">
                                        <Shirt className="w-3.5 h-3.5 text-neutral-400" />
                                        T-Shirt: {attendee.tshirt_size || "Not specified"}
                                      </p>
                                      <p className="text-neutral-700">
                                        Dietary: {attendee.dietary_requirements || "None"}
                                      </p>
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                        Ticket Metadata
                                      </span>
                                      <p className="font-mono text-[11px] text-neutral-600 truncate">
                                        Token: {attendee.ticket?.ticket_token || "N/A"}
                                      </p>
                                      {attendee.ticket?.checked_in_at && (
                                        <p className="text-[11px] text-emerald-700 font-medium">
                                          Checked in:{" "}
                                          {new Date(attendee.ticket.checked_in_at).toLocaleTimeString(
                                            [],
                                            { hour: "2-digit", minute: "2-digit" }
                                          )}
                                        </p>
                                      )}
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                                        Portfolio &amp; Interests
                                      </span>
                                      {attendee.portfolio_url ? (
                                        <a
                                          href={attendee.portfolio_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-pine font-bold hover:underline block truncate"
                                        >
                                          {attendee.portfolio_url}
                                        </a>
                                      ) : (
                                        <p className="text-neutral-400 italic">No portfolio provided</p>
                                      )}
                                      {attendee.interests && attendee.interests.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1">
                                          {attendee.interests.map((it, idx) => (
                                            <span
                                              key={idx}
                                              className="px-2 py-0.5 rounded bg-white text-neutral-600 text-[10px] border border-neutral-200"
                                            >
                                              {it}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FAST-TRACK CHECK-IN DESK */}
        {activeTab === "checkin" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-md space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-pine/10 text-pine flex items-center justify-center mx-auto">
                  <QrCode className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-pine">
                  Venue Admission Fast Check-In
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Type or scan the Attendee Reference Code (e.g., <span className="font-mono text-pine font-bold">NCD26-14GP-1728</span>) or Ticket Token to instantly check in delegates at the Kano venue door.
                </p>
              </div>

              <form onSubmit={handleFastCheckInSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. NCD26-14GP-1728 or TKT-..."
                    value={checkInInput}
                    onChange={(e) => setCheckInInput(e.target.value)}
                    className="w-full h-14 pl-5 pr-32 rounded-2xl border-2 border-neutral-200 hover:border-pine focus:border-pine text-base sm:text-lg font-mono font-bold text-pine focus:outline-none focus:ring-4 focus:ring-pine/10 transition-all uppercase placeholder:normal-case placeholder:font-sans placeholder:text-neutral-400 placeholder:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingIn || !checkInInput.trim()}
                    className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-pine hover:bg-pine/90 text-white font-bold text-xs transition-all disabled:opacity-50 shadow-2xs flex items-center gap-1.5"
                  >
                    {isCheckingIn ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Validate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Status Display Card */}
              {checkInStatus.type && (
                <div
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    checkInStatus.type === "success"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : checkInStatus.type === "warning"
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-red-50 border-red-300 text-red-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {checkInStatus.type === "success" && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    )}
                    {checkInStatus.type === "warning" && (
                      <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    )}
                    {checkInStatus.type === "error" && (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm">{checkInStatus.message}</h4>
                    </div>
                  </div>

                  {checkInStatus.attendee && (
                    <div className="p-4 bg-white/90 rounded-xl border border-neutral-200/80 text-xs text-neutral-800 space-y-2">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                        <span className="font-bold text-sm text-pine">
                          {checkInStatus.attendee.full_name}
                        </span>
                        <span className="font-mono text-xs font-bold text-pine bg-spring/30 px-2 py-0.5 rounded">
                          {checkInStatus.attendee.reference_code}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600">
                        <div>Discipline: <span className="font-medium text-neutral-800">{checkInStatus.attendee.creative_discipline}</span></div>
                        <div>City: <span className="font-medium text-neutral-800">{checkInStatus.attendee.city_state}</span></div>
                        <div>T-Shirt: <span className="font-medium text-neutral-800">{checkInStatus.attendee.tshirt_size || "N/A"}</span></div>
                        <div>Dietary: <span className="font-medium text-neutral-800">{checkInStatus.attendee.dietary_requirements || "Standard"}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EMAIL COMMUNICATIONS & BROADCAST */}
        {activeTab === "email" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-pine text-white flex items-center justify-center">
                    <Send className="w-6 h-6 text-spring" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pine">Official Email Communications</h3>
                    <p className="text-xs text-neutral-500">
                      Send branded summit updates to individual delegates, all attendees, or partners via Resend.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-neutral-sand/50 px-3.5 py-1.5 rounded-xl border border-neutral-200/80 text-xs">
                  <span className="text-neutral-500 font-medium">Target Audience:</span>
                  <span className="font-bold text-pine">
                    {estimatedRecipientsCount} Recipient{estimatedRecipientsCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              {emailSendStatus.type && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    emailSendStatus.type === "success"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-red-50 border-red-300 text-red-800"
                  }`}
                >
                  {emailSendStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">
                      {emailSendStatus.type === "success" ? "Emails Dispatched" : "Dispatch Notice"}
                    </h4>
                    <p className="mt-0.5">{emailSendStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendEmail} className="space-y-5">
                {/* 1. Recipient Audience Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    1. Select Target Recipient Audience
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setEmailRecipientType("all_attendees")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        emailRecipientType === "all_attendees"
                          ? "bg-pine text-white border-pine shadow-sm"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <Users className="w-4 h-4 mb-1.5 opacity-80" />
                      <div className="font-bold text-xs leading-tight">All Attendees</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{registrations.length} registered</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailRecipientType("checked_in_only")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        emailRecipientType === "checked_in_only"
                          ? "bg-pine text-white border-pine shadow-sm"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 mb-1.5 opacity-80" />
                      <div className="font-bold text-xs leading-tight">Checked In</div>
                      <div className="text-[10px] opacity-75 mt-0.5">
                        {registrations.filter((r) => r.ticket?.checked_in).length} at venue
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailRecipientType("all_exhibitors")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        emailRecipientType === "all_exhibitors"
                          ? "bg-pine text-white border-pine shadow-sm"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <Store className="w-4 h-4 mb-1.5 opacity-80" />
                      <div className="font-bold text-xs leading-tight">Exhibitors</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{exhibitors.length} partners</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailRecipientType("all_hackathon")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        emailRecipientType === "all_hackathon"
                          ? "bg-pine text-white border-pine shadow-sm"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <Zap className="w-4 h-4 mb-1.5 opacity-80" />
                      <div className="font-bold text-xs leading-tight">Hackathon</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{hackathonTeams.length} teams</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailRecipientType("individual")}
                      className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
                        emailRecipientType === "individual"
                          ? "bg-pine text-white border-pine shadow-sm"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <Mail className="w-4 h-4 mb-1.5 opacity-80" />
                      <div className="font-bold text-xs leading-tight">Individual</div>
                      <div className="text-[10px] opacity-75 mt-0.5">Single recipient</div>
                    </button>
                  </div>
                </div>

                {/* Individual Recipient Inputs */}
                {emailRecipientType === "individual" && (
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                        Recipient Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. delegate@example.com"
                        value={emailIndividualAddress}
                        onChange={(e) => setEmailIndividualAddress(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                        Recipient Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aminu Muhammad"
                        value={emailIndividualName}
                        onChange={(e) => setEmailIndividualName(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                      />
                    </div>
                  </div>
                )}

                {/* 2. One-Click Quick Templates */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Quick Message Templates (1-Click)
                    </label>
                    <span className="text-[11px] text-neutral-400">Click to autofill subject &amp; body</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {emailPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setEmailSubject(preset.subject);
                          setEmailMessage(preset.body);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-sand/40 hover:bg-neutral-sand border border-neutral-200 text-xs font-semibold text-pine transition-all flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-pine/70" />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Email Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Email Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Important Summit 2.0 Venue Guide & Gate Schedule"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-neutral-sand/20 hover:bg-white focus:bg-white text-sm font-semibold text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  />
                </div>

                {/* 4. Message Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={7}
                    placeholder="Type your official announcement or message here..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-neutral-200 bg-neutral-sand/20 hover:bg-white focus:bg-white text-xs sm:text-sm font-normal text-neutral-800 focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all leading-relaxed shadow-2xs resize-y"
                  />
                  <p className="text-[11px] text-neutral-400">
                    The message will automatically be styled with the official NCD Summit 2.0 brand header, event details, and executive footer.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full h-12 flex items-center justify-center gap-2 shadow-md"
                    disabled={isSendingEmail || estimatedRecipientsCount === 0}
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching through Resend...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          Send Email to {estimatedRecipientsCount} Recipient
                          {estimatedRecipientsCount !== 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: EXHIBITORS */}
        {activeTab === "exhibitors" && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-pine text-base">Marketplace Exhibitors &amp; Partners</h3>
                <p className="text-xs text-neutral-500">
                  Review creative brand applications, approve booths, and allocate exhibition slots.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {exhibitors.length} Total Applications
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
              {exhibitors.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Store className="w-12 h-12 text-neutral-300 mx-auto" />
                  <h4 className="font-bold text-neutral-700 text-base">No exhibitor applications yet</h4>
                  <p className="text-xs text-neutral-500">
                    When brands submit applications on the Exhibitor portal, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4 sm:px-6">Brand / Company</th>
                        <th className="py-3 px-4">Contact Person</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Booth Assignment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {exhibitors.map((ex) => (
                        <tr key={ex.id} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="py-3 px-4 sm:px-6">
                            <span className="font-bold text-neutral-900 block">{ex.business_name}</span>
                            {ex.website && (
                              <a
                                href={ex.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-pine hover:underline truncate block"
                              >
                                {ex.website}
                              </a>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-neutral-800 block">{ex.contact_person}</span>
                            <span className="text-[11px] text-neutral-500 block">{ex.email}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                              {ex.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-xs font-bold text-pine">
                              {ex.assigned_booth || "Unassigned"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                ex.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : ex.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {ex.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {ex.status !== "approved" && (
                              <button
                                onClick={() => handleUpdateExhibitor(ex.id, "approved", "Booth A-" + Math.floor(10 + Math.random() * 90))}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                              >
                                Approve
                              </button>
                            )}
                            {ex.status !== "rejected" && (
                              <button
                                onClick={() => handleUpdateExhibitor(ex.id, "rejected")}
                                className="px-2.5 py-1 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs"
                              >
                                Reject
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: HACKATHON TEAMS */}
        {activeTab === "hackathon" && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-pine text-base">Stage Sprint Hackathon Teams</h3>
                <p className="text-xs text-neutral-500">
                  Manage the 2-Hour Live Stage Finalists and voting eligibility for the live summit arena.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {hackathonTeams.length} Sprint Teams
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hackathonTeams.map((team) => (
                <div
                  key={team.id}
                  className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {team.track}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          team.status === "stage_finalist"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {team.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-bold text-pine text-base leading-snug">
                      {team.team_name}
                    </h4>

                    <div className="text-xs text-neutral-600 space-y-1">
                      <p>Lead: <span className="font-semibold text-neutral-800">{team.lead_name}</span></p>
                      <p>Email: <span className="font-medium text-neutral-600">{team.lead_email}</span></p>
                      <p>Team Size: <span className="font-medium text-neutral-800">{team.team_size} members</span></p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                    {team.status !== "stage_finalist" ? (
                      <button
                        onClick={() => handleUpdateHackathonTeam(team.id, "stage_finalist")}
                        className="w-full py-1.5 rounded-lg bg-pine hover:bg-pine/90 text-white font-bold text-xs transition-colors"
                      >
                        Promote to Stage Finalist
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateHackathonTeam(team.id, "shortlisted")}
                        className="w-full py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-colors"
                      >
                        Demote to Shortlisted
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
