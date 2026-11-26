"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Sparkles,
  ArrowRight,
  Loader2,
  Send,
  ExternalLink,
  Eye,
  EyeOff,
  Menu,
  X,
  Vote,
  SlidersHorizontal,
  Unlock,
  Trash2,
} from "lucide-react";
import {
  getAdminFullDataAction,
  toggleTicketCheckInAction,
  fastTrackCheckInAction,
  updateExhibitorAction,
  updateHackathonTeamAction,
  deleteRegistrationAction,
  deleteExhibitorAction,
  deleteHackathonTeamAction,
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
import {
  getHackathonPublicStateAction,
  adminSetVotingStatusAction,
  HackathonPublicState,
} from "@/app/actions/voting";
import {
  getRegistrationSettingsAction,
  adminUpdateRegistrationSettingAction,
  RegistrationKey,
  RegistrationSettings,
} from "@/app/actions/registration-settings";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"attendees" | "checkin" | "email" | "exhibitors" | "hackathon" | "controls">("attendees");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [regSettings, setRegSettings] = useState<RegistrationSettings>({
    attendee_open: true,
    hackathon_open: true,
    exhibitor_open: true,
    updated_at: "",
  });
  const [togglingKey, setTogglingKey] = useState<RegistrationKey | null>(null);

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
  const [hackathonState, setHackathonState] = useState<HackathonPublicState | null>(null);

  // Search & Filtering for Attendees
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInFilter, setCheckInFilter] = useState<"all" | "checked_in" | "not_checked_in">("all");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [expandedAttendeeId, setExpandedAttendeeId] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Fast Check-In State
  const [checkInInput, setCheckInInput] = useState("");
  const [checkInStatus, setCheckInStatus] = useState<{
    type: "success" | "warning" | "error" | null;
    message: string;
    attendee?: AdminRegistration | null;
  }>({ type: null, message: "" });
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Broadcast Email State
  const [emailRecipientType, setEmailRecipientType] = useState<
    | "all_users"
    | "individual"
    | "all_attendees"
    | "checked_in_only"
    | "all_exhibitors"
    | "all_hackathon"
    | "all_partners"
    | "custom_list"
  >("all_users");
  const [emailIndividualAddress, setEmailIndividualAddress] = useState("");
  const [emailIndividualName, setEmailIndividualName] = useState("");
  const [emailCustomList, setEmailCustomList] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailDispatchResult, setEmailDispatchResult] = useState<SendEmailResult | null>(null);

  // Check existing session on mount
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
      const [res, hRes, rSettings] = await Promise.all([
        getAdminFullDataAction(),
        getHackathonPublicStateAction(),
        getRegistrationSettingsAction(),
      ]);

      if (res.success) {
        if (res.metrics) setMetrics(res.metrics);
        if (res.registrations) setRegistrations(res.registrations);
        if (res.exhibitors) setExhibitors(res.exhibitors);
        if (res.hackathonTeams) setHackathonTeams(res.hackathonTeams);
      }
      if (hRes.success && hRes.state) {
        setHackathonState(hRes.state);
      }
      if (rSettings) {
        setRegSettings(rSettings);
      }
    } catch (err) {
      console.error("Failed to load operations data:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleToggleRegistration = async (key: RegistrationKey, nextOpen: boolean) => {
    setTogglingKey(key);
    try {
      const res = await adminUpdateRegistrationSettingAction(key, nextOpen);
      if (res.success) {
        setRegSettings(res.settings);
      }
    } finally {
      setTogglingKey(null);
    }
  };

  const handleDeleteAttendee = async (attendee: AdminRegistration) => {
    if (!window.confirm(`Delete registration for ${attendee.full_name} (${attendee.email})? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteRegistrationAction(attendee.id);
      if (res.success) {
        const wasCheckedIn = Boolean(attendee.ticket?.checked_in);
        setRegistrations((prev) => prev.filter((r) => r.id !== attendee.id));
        setMetrics((prev) => ({
          ...prev,
          totalRegistrations: Math.max(0, prev.totalRegistrations - 1),
          totalTickets: Math.max(0, prev.totalTickets - (attendee.ticket ? 1 : 0)),
          checkedInCount: Math.max(0, prev.checkedInCount - (wasCheckedIn ? 1 : 0)),
        }));
      }
    });
  };

  const handleDeleteExhibitor = async (ex: AdminExhibitor) => {
    if (!window.confirm(`Delete exhibitor record for ${ex.business_name}? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteExhibitorAction(ex.id);
      if (res.success) {
        setExhibitors((prev) => prev.filter((e) => e.id !== ex.id));
        setMetrics((prev) => ({
          ...prev,
          totalExhibitors: Math.max(0, prev.totalExhibitors - 1),
        }));
      }
    });
  };

  const handleDeleteHackathonTeam = async (team: AdminHackathonTeam) => {
    if (!window.confirm(`Delete hackathon record for ${team.lead_name || team.team_name}? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      const res = await deleteHackathonTeamAction(team.id);
      if (res.success) {
        setHackathonTeams((prev) => prev.filter((t) => t.id !== team.id));
        setMetrics((prev) => ({
          ...prev,
          totalHackathonTeams: Math.max(0, prev.totalHackathonTeams - 1),
        }));
      }
    });
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
    try {
      await adminSignOutAction();
    } catch {
      // non-fatal
    }
    sessionStorage.removeItem("ncd_admin_session");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  // 1-Click Ticket Check-In Toggle
  const handleToggleCheckIn = async (attendee: AdminRegistration) => {
    const ticketId = attendee.ticket?.id || attendee.id;
    const isCurrentlyChecked = Boolean(attendee.ticket?.checked_in);
    const nextStatus = !isCurrentlyChecked;

    startTransition(async () => {
      const res = await toggleTicketCheckInAction(ticketId, nextStatus);
      if (res.success) {
        setRegistrations((prev) =>
          prev.map((reg) => {
            if (reg.id === attendee.id) {
              return {
                ...reg,
                ticket: reg.ticket
                  ? {
                      ...reg.ticket,
                      checked_in: nextStatus,
                      checked_in_at: nextStatus ? new Date().toISOString() : null,
                    }
                  : {
                      id: `tkt_${reg.id}`,
                      registration_id: reg.id,
                      ticket_token: reg.reference_code,
                      qr_code_url: "",
                      checked_in: nextStatus,
                      checked_in_at: nextStatus ? new Date().toISOString() : null,
                    },
              };
            }
            return reg;
          })
        );
        setMetrics((prev) => ({
          ...prev,
          checkedInCount: nextStatus
            ? prev.checkedInCount + 1
            : Math.max(0, prev.checkedInCount - 1),
        }));
      }
    });
  };

  // Fast-Track Gate Admission Submission
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
            message: `Notice: ${res.attendee.full_name} was ALREADY checked in.`,
            attendee: res.attendee,
          });
        } else {
          setCheckInStatus({
            type: "success",
            message: `Verified: ${res.attendee.full_name} successfully checked in!`,
            attendee: res.attendee,
          });
          // Update local view
          setRegistrations((prev) =>
            prev.map((r) =>
              r.id === res.attendee?.id
                ? {
                    ...r,
                    ticket: r.ticket
                      ? { ...r.ticket, checked_in: true, checked_in_at: new Date().toISOString() }
                      : {
                          id: `tkt_${r.id}`,
                          registration_id: r.id,
                          ticket_token: r.reference_code,
                          qr_code_url: "",
                          checked_in: true,
                          checked_in_at: new Date().toISOString(),
                        },
                  }
                : r
            )
          );
          setMetrics((prev) => ({ ...prev, checkedInCount: prev.checkedInCount + 1 }));
        }
        setCheckInInput("");
      } else {
        setCheckInStatus({
          type: "error",
          message: res.error || "No matching attendee ticket or reference code found.",
        });
      }
    } catch {
      setCheckInStatus({
        type: "error",
        message: "Network failure validating admission credential.",
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Update Exhibitor Status & Booth
  const handleUpdateExhibitor = async (id: string, status: string, assignedBooth?: string) => {
    startTransition(async () => {
      const res = await updateExhibitorAction(id, status, assignedBooth);
      if (res.success) {
        setExhibitors((prev) =>
          prev.map((e) =>
            e.id === id
              ? {
                  ...e,
                  status,
                  assigned_booth: assignedBooth !== undefined ? assignedBooth : e.assigned_booth,
                }
              : e
          )
        );
      }
    });
  };

  // Update Hackathon Team Status
  const handleUpdateHackathonTeam = async (id: string, status: string) => {
    startTransition(async () => {
      const res = await updateHackathonTeamAction(id, status);
      if (res.success) {
        setHackathonTeams((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
      }
    });
  };

  // Toggle Hackathon Live Voting Window
  const handleToggleVotingStatus = async (newStatus: "voting" | "upcoming" | "completed") => {
    startTransition(async () => {
      const res = await adminSetVotingStatusAction(newStatus, 20);
      if (res.success) {
        setHackathonState((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
        await fetchFullData();
      }
    });
  };

  // Send Broadcast Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject.trim() || !emailMessage.trim()) return;

    setIsSendingEmail(true);
    setEmailDispatchResult(null);

    const payload: SendEmailPayload = {
      recipientType: emailRecipientType,
      individualEmail: emailIndividualAddress,
      individualName: emailIndividualName,
      customEmails: emailCustomList,
      subject: emailSubject,
      message: emailMessage,
    };

    try {
      const res = await sendAdminEmailAction(payload);
      setEmailDispatchResult(res);
      if (res.success) {
        setEmailSubject("");
        setEmailMessage("");
        setEmailIndividualAddress("");
        setEmailIndividualName("");
      }
    } catch (err: unknown) {
      setEmailDispatchResult({
        success: false,
        sentCount: 0,
        failedCount: 0,
        totalRecipients: 0,
        error: err instanceof Error ? err.message : "Dispatch error",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      "Reference Code",
      "Full Name",
      "Email",
      "Phone",
      "Discipline",
      "Experience",
      "City/State",
      "Organization",
      "T-Shirt Size",
      "Dietary",
      "Checked In",
      "Checked In At",
      "Ticket Token",
      "Registration Date",
    ];

    const rows = registrations.map((r) => [
      `"${r.reference_code}"`,
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.creative_discipline}"`,
      `"${r.experience_level}"`,
      `"${r.city_state}"`,
      `"${(r.organization || "").replace(/"/g, '""')}"`,
      `"${r.tshirt_size || ""}"`,
      `"${r.dietary_requirements || ""}"`,
      r.ticket?.checked_in ? "YES" : "NO",
      `"${r.ticket?.checked_in_at || ""}"`,
      `"${r.ticket?.ticket_token || ""}"`,
      `"${r.created_at || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `NCD_Summit_Attendees_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter attendees
  const filteredAttendees = useMemo(() => {
    return registrations.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.reference_code.toLowerCase().includes(q) ||
        r.city_state.toLowerCase().includes(q) ||
        (r.creative_discipline && r.creative_discipline.toLowerCase().includes(q)) ||
        (r.ticket?.ticket_token && r.ticket.ticket_token.toLowerCase().includes(q));

      const isChecked = Boolean(r.ticket?.checked_in);
      const matchesCheckIn =
        checkInFilter === "all" ||
        (checkInFilter === "checked_in" && isChecked) ||
        (checkInFilter === "not_checked_in" && !isChecked);

      const matchesDiscipline =
        disciplineFilter === "all" || r.creative_discipline === disciplineFilter;

      return matchesSearch && matchesCheckIn && matchesDiscipline;
    });
  }, [registrations, searchQuery, checkInFilter, disciplineFilter]);

  const uniqueDisciplines = useMemo(() => {
    const set = new Set<string>();
    registrations.forEach((r) => {
      if (r.creative_discipline) set.add(r.creative_discipline);
    });
    return Array.from(set).sort();
  }, [registrations]);

  const checkInPercentage =
    metrics.totalRegistrations > 0
      ? Math.round((metrics.checkedInCount / metrics.totalRegistrations) * 100)
      : 0;

  const customEmailCount = useMemo(() => {
    return emailCustomList
      .split(/[\s,;]+/)
      .map((e) => e.trim())
      .filter((e) => e.includes("@")).length;
  }, [emailCustomList]);

  const allUniqueUsersCount = useMemo(() => {
    const set = new Set<string>();
    registrations.forEach((r) => r.email && set.add(r.email.toLowerCase()));
    exhibitors.forEach((e) => e.email && set.add(e.email.toLowerCase()));
    hackathonTeams.forEach((t) => t.lead_email && set.add(t.lead_email.toLowerCase()));
    return set.size;
  }, [registrations, exhibitors, hackathonTeams]);

  const estimatedRecipientsCount = (() => {
    switch (emailRecipientType) {
      case "all_users":
        return allUniqueUsersCount;
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
      case "all_partners":
      case "custom_list":
        return customEmailCount;
      default:
        return 0;
    }
  })();

  // ---------------------------------------------------------------------------
  // View 1: If Not Authenticated -> Executive Login Portal
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full flex flex-col bg-white text-navy selection:bg-spring selection:text-pine">
        {/* Top-Left Brand Logo */}
        <header className="w-full px-6 sm:px-10 pt-6 flex items-center justify-start">
          <Link
            href="/"
            className="inline-block transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring rounded-lg p-1"
            aria-label="Return to Summit Portal"
          >
            <Image
              src="/images/brand/logo-header.png"
              alt="Northern Creative Designers"
              width={200}
              height={64}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-pine tracking-tight">
                Executive Administration
              </h1>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-border shadow-sm space-y-6">
              {authError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="support@northcdesigner.com.ng"
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-50/50 hover:bg-white focus:bg-white text-sm font-medium text-navy placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-spring/40 focus:border-spring transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Security Passkey
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter passkey..."
                      className="w-full h-12 pl-10 pr-11 rounded-xl border border-neutral-border bg-neutral-50/50 hover:bg-white focus:bg-white text-sm font-medium text-navy placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-spring/40 focus:border-spring transition-all font-mono tracking-wider"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-navy transition-colors focus:outline-none"
                      aria-label={showPassword ? "Hide passkey" : "Show passkey"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoadingAuth}
                    className="w-full h-12 rounded-xl bg-spring hover:bg-spring/90 text-navy font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoadingAuth ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-navy" />
                        <span>Authenticating Credentials...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-navy" />
                        <span>Authenticate &amp; Enter Portal</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-navy/60 hover:text-pine transition-colors inline-flex items-center gap-1.5"
              >
                <span>&larr; Return to Summit Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // View 2: Authenticated -> Admin Portal with Modern Left Sidebar
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row text-navy font-sans antialiased">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#021f13] text-white px-4 py-3.5 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/brand/logo-footer.png"
            alt="NCD"
            width={140}
            height={44}
            className="h-6 w-auto object-contain"
          />
          <span className="text-[10px] uppercase font-bold text-spring tracking-wider">
            Ops
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Modern Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 lg:w-60 bg-[#021f13] text-white flex flex-col border-r border-white/10 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:flex-shrink-0 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header in Sidebar */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <Link href="/" className="inline-block" aria-label="Summit Portal Home">
            <Image
              src="/images/brand/logo-footer.png"
              alt="Northern Creative Designers"
              width={160}
              height={50}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-white/60 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="p-3 flex-1 space-y-1 overflow-hidden">
          <button
            onClick={() => {
              setActiveTab("attendees");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "attendees"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Attendees</span>
            <span
              className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === "attendees" ? "bg-navy/15 text-navy" : "bg-white/10 text-white/90"
              }`}
            >
              {registrations.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("checkin");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "checkin"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <QrCode className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Venue Check-In</span>
            <span
              className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === "checkin" ? "bg-navy/15 text-navy" : "bg-white/10 text-white/90"
              }`}
            >
              {metrics.checkedInCount}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("email");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "email"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Broadcast Email</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("exhibitors");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "exhibitors"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Store className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Exhibitors</span>
            <span
              className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === "exhibitors" ? "bg-navy/15 text-navy" : "bg-white/10 text-white/90"
              }`}
            >
              {exhibitors.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("hackathon");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "hackathon"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Hackathon Teams</span>
            <span
              className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === "hackathon" ? "bg-navy/15 text-navy" : "bg-white/10 text-white/90"
              }`}
            >
              {hackathonTeams.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("controls");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left ${
              activeTab === "controls"
                ? "bg-spring text-navy shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 truncate">Reg. Controls</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 bg-[#01140b] space-y-2.5 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={fetchFullData}
              disabled={isLoadingData}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors border border-white/10"
              title="Refresh database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? "animate-spin" : ""}`} />
              <span>Sync</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={registrations.length === 0}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-spring hover:bg-spring/90 text-navy text-xs font-bold transition-all shadow-2xs disabled:opacity-50"
              title="Export attendees to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="min-w-0 pr-2">
              <p className="font-bold text-white truncate text-xs">Operations Desk</p>
              <p className="text-white/50 truncate text-[10px] font-mono">
                support@northcdesigner.com.ng
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors flex-shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        {/* Clean Top Navigation Bar */}
        <header className="bg-white border-b border-neutral-200/90 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-pine tracking-tight">
              {activeTab === "attendees" && "Attendee Management & Pass Directory"}
              {activeTab === "checkin" && "Venue Gate Admission Check-In"}
              {activeTab === "email" && "Official Email Communications Desk"}
              {activeTab === "exhibitors" && "Marketplace & Exhibitor Management"}
              {activeTab === "hackathon" && "Live Stage Design Sprint Teams"}
              {activeTab === "controls" && "Registration Access Controls"}
            </h1>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* KPI Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("attendees");
                setCheckInFilter("all");
              }}
              className={`p-5 rounded-2xl bg-white border text-left shadow-2xs space-y-2 transition-all cursor-pointer hover:border-pine/40 hover:shadow-sm ${
                activeTab === "attendees" ? "border-pine ring-1 ring-pine/20" : "border-neutral-200/90"
              }`}
            >
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
              <p className="text-[11px] text-neutral-500">Live summit registrations</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("checkin")}
              className={`p-5 rounded-2xl bg-white border text-left shadow-2xs space-y-2 transition-all cursor-pointer hover:border-emerald-500/40 hover:shadow-sm ${
                activeTab === "checkin" ? "border-emerald-500 ring-1 ring-emerald-500/20" : "border-neutral-200/90"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Venue Checked-In
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
                  ({checkInPercentage}%)
                </span>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${checkInPercentage}%` }}
                />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("exhibitors")}
              className={`p-5 rounded-2xl bg-white border text-left shadow-2xs space-y-2 transition-all cursor-pointer hover:border-amber-500/40 hover:shadow-sm ${
                activeTab === "exhibitors" ? "border-amber-500 ring-1 ring-amber-500/20" : "border-neutral-200/90"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Exhibitors
                </span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Store className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-pine font-mono">
                  {metrics.totalExhibitors}
                </span>
                <span className="text-xs text-neutral-500 font-medium">Brands</span>
              </div>
              <p className="text-[11px] text-neutral-500">Marketplace showcases</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("hackathon")}
              className={`p-5 rounded-2xl bg-white border text-left shadow-2xs space-y-2 transition-all cursor-pointer hover:border-indigo-500/40 hover:shadow-sm ${
                activeTab === "hackathon" ? "border-indigo-500 ring-1 ring-indigo-500/20" : "border-neutral-200/90"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Hackathon Teams
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
              <p className="text-[11px] text-neutral-500">Stage sprint entries</p>
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

                  {uniqueDisciplines.length > 0 && (
                    <select
                      value={disciplineFilter}
                      onChange={(e) => setDisciplineFilter(e.target.value)}
                      className="h-8 px-2.5 rounded-lg border border-neutral-200 bg-neutral-100 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-1 focus:ring-pine"
                    >
                      <option value="all">All Roles</option>
                      {uniqueDisciplines.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Attendees Table */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
                {filteredAttendees.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <Users className="w-12 h-12 text-neutral-300 mx-auto" />
                    <h4 className="font-bold text-neutral-700 text-base">
                      {registrations.length === 0
                        ? "No delegates registered yet"
                        : "No attendees match your query"}
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      {registrations.length === 0
                        ? "New registrations from the public portal will appear here in real time."
                        : "Try adjusting your search terms or filter selection."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">Delegate</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Pass Reference</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Discipline / Role</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">City</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Admission Status</th>
                          <th className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
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
                                <td className="py-3.5 px-4 sm:px-6 align-middle">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-pine/10 text-pine flex items-center justify-center font-bold text-xs flex-shrink-0">
                                      {initials}
                                    </div>
                                    <div className="min-w-0 max-w-[200px]">
                                      <span className="font-bold text-neutral-900 block truncate">
                                        {attendee.full_name}
                                      </span>
                                      <span className="text-[11px] text-neutral-500 block truncate">
                                        {attendee.email}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200">
                                    <span className="font-mono text-xs font-bold text-pine">
                                      {attendee.reference_code}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(attendee.reference_code)}
                                      className="text-neutral-400 hover:text-pine transition-colors"
                                      title="Copy reference code"
                                    >
                                      {copiedToken === attendee.reference_code ? (
                                        <Check className="w-3 h-3 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 align-middle">
                                  <span className="font-medium text-neutral-800 block truncate max-w-[180px]">
                                    {attendee.creative_discipline}
                                  </span>
                                  <span className="text-[10px] text-neutral-500 block truncate max-w-[180px]">
                                    {attendee.experience_level}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 whitespace-nowrap align-middle font-medium text-neutral-700">
                                  {attendee.city_state}
                                </td>

                                <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                                  {isCheckedIn ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      Checked In
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                      Admit Pending
                                    </span>
                                  )}
                                </td>

                                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap align-middle">
                                  <div className="inline-flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => handleToggleCheckIn(attendee)}
                                      disabled={isPending}
                                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                        isCheckedIn
                                          ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                                      }`}
                                    >
                                      {isCheckedIn ? "Undo" : "Admit"}
                                    </button>

                                    <button
                                      onClick={() =>
                                        setExpandedAttendeeId(isExpanded ? null : attendee.id)
                                      }
                                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                                      title="View pass details"
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </button>

                                    <button
                                      onClick={() => handleDeleteAttendee(attendee)}
                                      disabled={isPending}
                                      className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
                                      title="Delete attendee record"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {isExpanded && (
                                <tr className="bg-neutral-50/90 border-b border-neutral-200">
                                  <td colSpan={6} className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                      <div className="space-y-1">
                                        <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] block">
                                          Contact &amp; Phone
                                        </span>
                                        <p className="font-medium text-neutral-800">{attendee.phone}</p>
                                        {attendee.organization && (
                                          <p className="text-neutral-600">Org: {attendee.organization}</p>
                                        )}
                                      </div>

                                      <div className="space-y-1">
                                        <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] block">
                                          Venue Logistics
                                        </span>
                                        <p className="text-neutral-700">
                                          T-Shirt: <span className="font-semibold text-neutral-900">{attendee.tshirt_size || "Standard"}</span>
                                        </p>
                                        <p className="text-neutral-700">
                                          Dietary: <span className="font-semibold text-neutral-900">{attendee.dietary_requirements || "Standard"}</span>
                                        </p>
                                      </div>

                                      <div className="space-y-1">
                                        <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] block">
                                          Digital Ticket Token
                                        </span>
                                        <p className="font-mono text-[11px] text-pine bg-white p-2 rounded-lg border border-neutral-200 truncate">
                                          {attendee.ticket?.ticket_token || "Token Generated at Gateway"}
                                        </p>
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

          {/* TAB 2: FAST-TRACK CHECK-IN */}
          {activeTab === "checkin" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-pine/10 text-pine flex items-center justify-center mx-auto">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-pine">Venue Admission Fast Check-In</h3>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Type or scan the Attendee Reference Code (e.g. <span className="font-mono text-pine font-bold">NCD26-14GP-1728</span>) or Ticket Token to validate delegates at the door.
                  </p>
                </div>

                <form onSubmit={handleFastCheckInSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. NCD26-... or Ticket Token"
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
                          <div>
                            Discipline: <span className="font-medium text-neutral-800">{checkInStatus.attendee.creative_discipline}</span>
                          </div>
                          <div>
                            City: <span className="font-medium text-neutral-800">{checkInStatus.attendee.city_state}</span>
                          </div>
                          <div>
                            T-Shirt: <span className="font-medium text-neutral-800">{checkInStatus.attendee.tshirt_size || "N/A"}</span>
                          </div>
                          <div>
                            Dietary: <span className="font-medium text-neutral-800">{checkInStatus.attendee.dietary_requirements || "Standard"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BROADCAST EMAIL */}
          {activeTab === "email" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-pine text-white flex items-center justify-center">
                      <Send className="w-6 h-6 text-spring" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pine">Official Broadcast Communications</h3>
                      <p className="text-xs text-neutral-500">
                        Dispatched through verified domain via Resend (<span className="font-mono text-pine">support@northcdesigners.com.ng</span>)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-neutral-100 px-3.5 py-1.5 rounded-xl border border-neutral-200 text-xs">
                    <span className="text-neutral-500 font-medium">Audience:</span>
                    <span className="font-bold text-pine">
                      {estimatedRecipientsCount} Recipient{estimatedRecipientsCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {emailDispatchResult && (
                  <div
                    className={`p-4 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                      emailDispatchResult.success
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {emailDispatchResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block">
                        {emailDispatchResult.success ? "Dispatch Successful" : "Dispatch Failed"}
                      </span>
                      <span>{emailDispatchResult.message || emailDispatchResult.error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendEmail} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Target Audience
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "all_users", label: "All Users" },
                        { id: "all_attendees", label: "All Delegates" },
                        { id: "checked_in_only", label: "Checked-In" },
                        { id: "all_hackathon", label: "Hackathon" },
                        { id: "all_exhibitors", label: "Exhibitors" },
                        { id: "all_partners", label: "Partners" },
                        { id: "individual", label: "Individual" },
                        { id: "custom_list", label: "Custom List" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setEmailRecipientType(item.id as any)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            emailRecipientType === item.id
                              ? "bg-pine text-white border-pine shadow-xs"
                              : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(emailRecipientType === "all_partners" || emailRecipientType === "custom_list") && (
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {emailRecipientType === "all_partners"
                          ? "Partner Email Addresses (comma or newline separated)"
                          : "Recipient Email Addresses (comma or newline separated)"}
                      </label>
                      <textarea
                        rows={3}
                        placeholder="partner1@company.com, partner2@agency.com"
                        value={emailCustomList}
                        onChange={(e) => setEmailCustomList(e.target.value)}
                        className="w-full p-3 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                      />
                    </div>
                  )}

                  {emailRecipientType === "individual" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-700 block">Recipient Email</label>
                        <input
                          type="email"
                          required
                          placeholder="delegate@example.com"
                          value={emailIndividualAddress}
                          onChange={(e) => setEmailIndividualAddress(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-700 block">Recipient Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Fatima Aliyu"
                          value={emailIndividualName}
                          onChange={(e) => setEmailIndividualName(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Email Subject Line
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Important Venue Check-In Information for Summit 2.0"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Message Content
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Type your official summit announcement or operational instructions here..."
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full p-4 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSendingEmail || estimatedRecipientsCount === 0}
                      className="w-full sm:w-auto px-8 h-12 rounded-xl bg-pine hover:bg-pine/90 text-white font-bold text-sm transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Emails via Resend...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-spring" />
                          <span>Send Broadcast ({estimatedRecipientsCount} Recipients)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: EXHIBITORS */}
          {activeTab === "exhibitors" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
                {exhibitors.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <Store className="w-12 h-12 text-neutral-300 mx-auto" />
                    <h4 className="font-bold text-neutral-700 text-base">No exhibitor applications yet</h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Brand showcase applications submitted via the Exhibitor Portal will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">Brand / Company</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Contact Person</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Category</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Booth Assignment</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Review Status</th>
                          <th className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {exhibitors.map((ex) => (
                          <tr key={ex.id} className="hover:bg-neutral-50/60 transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 align-middle">
                              <span className="font-bold text-neutral-900 block truncate max-w-[180px]">{ex.business_name}</span>
                              {ex.website && (
                                <a
                                  href={ex.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-pine hover:underline truncate block max-w-[180px]"
                                >
                                  {ex.website}
                                </a>
                              )}
                            </td>
                            <td className="py-3.5 px-4 align-middle">
                              <span className="font-medium text-neutral-800 block truncate max-w-[180px]">{ex.contact_person}</span>
                              <span className="text-[11px] text-neutral-500 block truncate max-w-[180px]">{ex.email}</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                              <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                                {ex.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                              <span className="font-mono text-xs font-bold text-pine">
                                {ex.assigned_booth || "Unassigned"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
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
                            <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap align-middle">
                              <div className="inline-flex items-center justify-end gap-2">
                                {ex.status !== "approved" && (
                                  <button
                                    onClick={() =>
                                      handleUpdateExhibitor(
                                        ex.id,
                                        "approved",
                                        "Booth " + Math.floor(10 + Math.random() * 90)
                                      )
                                    }
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs"
                                  >
                                    Approve
                                  </button>
                                )}
                                {ex.status !== "rejected" && (
                                  <button
                                    onClick={() => handleUpdateExhibitor(ex.id, "rejected")}
                                    className="px-2.5 py-1.5 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs"
                                  >
                                    Reject
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteExhibitor(ex)}
                                  disabled={isPending}
                                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
                                  title="Delete exhibitor record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
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
            <div className="space-y-5">
              {/* Competition Operations Card */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pine text-spring">
                      Stage Design Sprint
                    </span>
                    <span className="text-xs text-neutral-500">Roots &amp; Vectors 2.0</span>
                  </div>
                  <h3 className="text-lg font-bold text-pine">Live Voting &amp; Contestant Management</h3>
                  <p className="text-xs text-neutral-500">
                    Control the stage voting window and manage contestant approval statuses.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    disabled={togglingKey === "hackathon_open"}
                    onClick={() => handleToggleRegistration("hackathon_open", !regSettings.hackathon_open)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 ${
                      regSettings.hackathon_open
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {regSettings.hackathon_open ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Close Registration</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Reopen Registration</span>
                      </>
                    )}
                  </button>

                  {hackathonState?.status === "voting" ? (
                    <button
                      onClick={() => handleToggleVotingStatus("completed")}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5"
                    >
                      <Vote className="w-3.5 h-3.5" />
                      <span>Close Live Voting</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleVotingStatus("voting")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5"
                    >
                      <Vote className="w-3.5 h-3.5" />
                      <span>Open Live Voting Window</span>
                    </button>
                  )}

                  <Link
                    href="/hackathon/vote"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center gap-1 border border-neutral-200 transition-colors"
                  >
                    <span>Public Ballot</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    href="/hackathon/leaderboard"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center gap-1 border border-neutral-200 transition-colors"
                  >
                    <span>Leaderboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Hackathon Contestants Table */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
                {hackathonTeams.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <Zap className="w-12 h-12 text-neutral-300 mx-auto" />
                    <h4 className="font-bold text-neutral-700 text-base">No hackathon contestants yet</h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Registrations from the Hackathon Sprint entry form will appear here in real time.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">Team / Project</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Track</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Team Lead</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Contact</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Team Size</th>
                          <th className="py-3.5 px-4 whitespace-nowrap">Review Status</th>
                          <th className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {hackathonTeams.map((team) => (
                          <tr key={team.id} className="hover:bg-neutral-50/60 transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 align-middle">
                              <span className="font-bold text-neutral-900 block truncate max-w-[170px]">{team.team_name}</span>
                              {team.portfolio_url && (
                                <a
                                  href={team.portfolio_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-pine hover:underline truncate block"
                                >
                                  Portfolio ↗
                                </a>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                              <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                                {team.track}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle font-semibold text-neutral-800">
                              {team.lead_name}
                            </td>
                            <td className="py-3.5 px-4 text-[11px] text-neutral-600 align-middle">
                              <span className="block truncate max-w-[170px]">{team.lead_email}</span>
                              <span className="block text-neutral-400 whitespace-nowrap">{team.lead_phone}</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle font-mono font-bold text-pine">
                              {team.team_size} Members
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap align-middle">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  team.status === "shortlisted" || team.status === "approved" || team.status === "stage_finalist"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : team.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {team.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap align-middle">
                              <div className="inline-flex items-center justify-end gap-2">
                                {team.status !== "shortlisted" && team.status !== "stage_finalist" && (
                                  <button
                                    onClick={() => handleUpdateHackathonTeam(team.id, "shortlisted")}
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs"
                                  >
                                    Shortlist
                                  </button>
                                )}
                                {team.status !== "rejected" && (
                                  <button
                                    onClick={() => handleUpdateHackathonTeam(team.id, "rejected")}
                                    className="px-2.5 py-1.5 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs"
                                  >
                                    Reject
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteHackathonTeam(team)}
                                  disabled={isPending}
                                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
                                  title="Delete hackathon record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
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

          {/* TAB 6: REGISTRATION ACCESS CONTROLS */}
          {activeTab === "controls" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h3 className="text-lg font-bold text-pine">Public Registration Forms</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Open or close any registration portal. Closed forms remain visible on the site with inputs disabled and a closed notice.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(
                    [
                      {
                        key: "hackathon_open" as RegistrationKey,
                        title: "Hackathon 2.0 Registration",
                        route: "/hackathon/register",
                        desc: "Individual 2-hour live design sprint registration.",
                      },
                      {
                        key: "attendee_open" as RegistrationKey,
                        title: "Summit Attendee Registration",
                        route: "/register",
                        desc: "Delegate summit pass & onboarding registration.",
                      },
                      {
                        key: "exhibitor_open" as RegistrationKey,
                        title: "Exhibitor & Vendor Registration",
                        route: "/exhibitors/apply",
                        desc: "Marketplace booth & vendor stand applications.",
                      },
                    ] as const
                  ).map((item) => {
                    const isOpen = regSettings[item.key];
                    const isUpdating = togglingKey === item.key;
                    return (
                      <div
                        key={item.key}
                        className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isOpen
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {isOpen ? "Open" : "Closed"}
                            </span>
                            <Link
                              href={item.route}
                              target="_blank"
                              className="text-[11px] font-mono text-pine hover:underline inline-flex items-center gap-1"
                            >
                              <span>{item.route}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                          <h4 className="font-bold text-pine text-sm">{item.title}</h4>
                          <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                        </div>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleToggleRegistration(item.key, !isOpen)}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
                            isOpen
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white"
                          }`}
                        >
                          {isUpdating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : isOpen ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <Unlock className="w-3.5 h-3.5" />
                          )}
                          <span>{isOpen ? "Close Registration" : "Open Registration"}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
