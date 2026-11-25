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
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Edit3,
  Camera,
  UploadCloud,
  Eye,
  EyeOff,
  Sliders,
  Award,
  Vote,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { ContestantQrModal } from "@/components/hackathon/ContestantQrModal";
import {
  getHackathonPublicStateAction,
  getHackathonFinalistsAction,
  adminSetVotingStatusAction,
  adminUpdateFinalistAction,
  adminUploadFinalistPhotoAction,
  adminSaveJuryScoreAction,
  adminGetJuryAndWeightedResultsAction,
  adminPublishOfficialResultsAction,
  adminRehearsalResetVotesAction,
  FinalistCandidate,
  HackathonPublicState,
  JuryTeamSummary,
  JuryScoreInput,
} from "@/app/actions/voting";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // Comprehensive Hackathon Command Center States
  const [hackathonSubTab, setHackathonSubTab] = useState<
    "overview" | "finalists" | "voting" | "jury" | "results" | "audit"
  >("overview");
  const [hackathonState, setHackathonState] = useState<HackathonPublicState | null>(null);
  const [fullFinalists, setFullFinalists] = useState<FinalistCandidate[]>([]);
  const [jurySummaries, setJurySummaries] = useState<JuryTeamSummary[]>([]);
  const [candidateFilterTrack, setCandidateFilterTrack] = useState<string>("all");
  const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>("");

  // Editing Candidate Modal State
  const [editingCandidate, setEditingCandidate] = useState<FinalistCandidate | null>(null);
  const [editForm, setEditForm] = useState({
    lead_name: "",
    professional_title: "",
    track: "UI/UX & Mobile Products",
    project_title: "",
    short_description: "",
    detailed_description: "",
    problem_statement: "",
    proposed_solution: "",
    target_audience: "",
    presentation_url: "",
    portfolio_url: "",
    avatar_url: "",
    status: "stage_finalist" as "applied" | "shortlisted" | "stage_finalist" | "winner",
    is_winner: false,
    winner_badge: "",
  });
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Jury Scoring Modal State
  const [scoringCandidate, setScoringCandidate] = useState<FinalistCandidate | null>(null);
  const [scoringForm, setScoringForm] = useState<JuryScoreInput>({
    hackathon_id: "",
    team_id: "",
    judge_name: "Lead Grand Juror",
    judge_email: "jury@northcdesigner.com.ng",
    cultural_semiotics: 20,
    problem_solution: 20,
    craft_execution: 20,
    presentation: 20,
    feedback: "",
    status: "draft",
  });
  const [isSavingScore, setIsSavingScore] = useState(false);

  // Rehearsal Reset Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmationInput, setResetConfirmationInput] = useState("");
  const [isResettingVotes, setIsResettingVotes] = useState(false);

  // Candidate QR Modal in Admin
  const [adminQrCandidate, setAdminQrCandidate] = useState<FinalistCandidate | null>(null);

  // Live Voting Controls
  const [votingDurationInput, setVotingDurationInput] = useState<number>(20);
  const [isChangingVotingStatus, setIsChangingVotingStatus] = useState(false);
  const [hackathonActionFeedback, setHackathonActionFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
      const [res, hStateRes, finalistsRes, juryRes] = await Promise.all([
        getAdminFullDataAction(),
        getHackathonPublicStateAction(),
        getHackathonFinalistsAction({ includeAllStatuses: true }),
        adminGetJuryAndWeightedResultsAction(),
      ]);

      if (res.success && res.metrics) {
        setMetrics(res.metrics);
        setRegistrations(res.registrations || []);
        setExhibitors(res.exhibitors || []);
        setHackathonTeams(res.hackathonTeams || []);
      }

      if (hStateRes.success && hStateRes.state) {
        setHackathonState(hStateRes.state);
        setVotingDurationInput(hStateRes.state.voting_duration_minutes || 20);
      }

      if (finalistsRes.success && finalistsRes.finalists) {
        setFullFinalists(finalistsRes.finalists);
      }

      if (juryRes.success && juryRes.summaries) {
        setJurySummaries(juryRes.summaries);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchHackathonAdminData = async () => {
    try {
      const [hStateRes, finalistsRes, juryRes] = await Promise.all([
        getHackathonPublicStateAction(),
        getHackathonFinalistsAction({ includeAllStatuses: true }),
        adminGetJuryAndWeightedResultsAction(),
      ]);

      if (hStateRes.success && hStateRes.state) {
        setHackathonState(hStateRes.state);
      }
      if (finalistsRes.success && finalistsRes.finalists) {
        setFullFinalists(finalistsRes.finalists);
      }
      if (juryRes.success && juryRes.summaries) {
        setJurySummaries(juryRes.summaries);
      }
    } catch (err) {
      console.error("Failed to reload hackathon data", err);
    }
  };

  // 1. Voting status change
  const handleSetVotingStatus = async (
    status: "upcoming" | "active" | "voting" | "completed",
    duration = votingDurationInput
  ) => {
    setIsChangingVotingStatus(true);
    setHackathonActionFeedback(null);
    try {
      const res = await adminSetVotingStatusAction(status, duration);
      if (res.success) {
        setHackathonActionFeedback({
          type: "success",
          text: res.message || `Voting status switched to ${status.toUpperCase()}!`,
        });
        await fetchHackathonAdminData();
      } else {
        setHackathonActionFeedback({
          type: "error",
          text: res.error || "Failed to update voting status.",
        });
      }
    } catch {
      setHackathonActionFeedback({
        type: "error",
        text: "Error connecting to server to change voting status.",
      });
    } finally {
      setIsChangingVotingStatus(false);
    }
  };

  // 2. Open Candidate Edit Modal
  const handleOpenEditCandidate = (candidate: FinalistCandidate) => {
    setEditingCandidate(candidate);
    setEditForm({
      lead_name: candidate.lead_name || "",
      professional_title: candidate.professional_title || "",
      track: candidate.track || "UI/UX & Mobile Products",
      project_title: candidate.project_title || "",
      short_description: candidate.short_description || "",
      detailed_description: candidate.detailed_description || "",
      problem_statement: candidate.problem_statement || "",
      proposed_solution: candidate.proposed_solution || "",
      target_audience: candidate.target_audience || "",
      presentation_url: candidate.presentation_url || "",
      portfolio_url: candidate.portfolio_url || "",
      avatar_url: candidate.avatar_url || "",
      status: candidate.status,
      is_winner: Boolean(candidate.is_winner),
      winner_badge: candidate.winner_badge || "",
    });
  };

  // 3. Save Candidate Profile Updates
  const handleSaveCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;
    setIsSavingCandidate(true);
    setHackathonActionFeedback(null);

    try {
      const res = await adminUpdateFinalistAction(editingCandidate.id, {
        ...editForm,
        team_name: `${editForm.lead_name} (${editForm.project_title || "Project"})`,
      });

      if (res.success) {
        setHackathonActionFeedback({
          type: "success",
          text: `Finalist profile for ${editForm.lead_name} successfully updated!`,
        });
        setEditingCandidate(null);
        await fetchHackathonAdminData();
      } else {
        setHackathonActionFeedback({
          type: "error",
          text: res.error || "Failed to update candidate profile.",
        });
      }
    } catch {
      setHackathonActionFeedback({
        type: "error",
        text: "Error saving candidate profile.",
      });
    } finally {
      setIsSavingCandidate(false);
    }
  };

  // 4. Upload photo via Cloudinary
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await adminUploadFinalistPhotoAction(base64);
        if (res.success && res.url) {
          setEditForm((prev) => ({ ...prev, avatar_url: res.url! }));
        } else {
          alert(res.error || "Failed to upload image.");
        }
      } catch (err) {
        alert("Upload error.");
      } finally {
        setIsUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // 5. Open Scoring Modal
  const handleOpenScoring = (candidate: FinalistCandidate) => {
    setScoringCandidate(candidate);
    const existingSummary = jurySummaries.find((s) => s.team_id === candidate.id);
    const existingScore = existingSummary?.scores?.[0];

    setScoringForm({
      hackathon_id: candidate.hackathon_id || hackathonState?.id || "a0000000-0000-0000-0000-000000000001",
      team_id: candidate.id,
      judge_name: existingScore?.judge_name || "Lead Grand Juror",
      judge_email: "jury@northcdesigner.com.ng",
      cultural_semiotics: existingScore?.cultural_semiotics || 20,
      problem_solution: existingScore?.problem_solution || 20,
      craft_execution: existingScore?.craft_execution || 20,
      presentation: existingScore?.presentation || 20,
      feedback: existingScore?.feedback || "",
      status: "draft",
    });
  };

  // 6. Submit Jury Score
  const handleSaveJuryScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoringCandidate) return;
    setIsSavingScore(true);
    setHackathonActionFeedback(null);

    try {
      const res = await adminSaveJuryScoreAction(scoringForm);
      if (res.success) {
        setHackathonActionFeedback({
          type: "success",
          text: `Score saved (${res.totalScore}/100) for ${scoringCandidate.lead_name}!`,
        });
        setScoringCandidate(null);
        await fetchHackathonAdminData();
      } else {
        setHackathonActionFeedback({
          type: "error",
          text: res.error || "Failed to save jury score.",
        });
      }
    } catch {
      setHackathonActionFeedback({
        type: "error",
        text: "Error recording jury evaluation.",
      });
    } finally {
      setIsSavingScore(false);
    }
  };

  // 7. Publish Official 70/30 Results
  const handlePublishOfficialResults = async (publish: boolean) => {
    const confirmMsg = publish
      ? "Are you sure you want to officially PUBLISH the 70/30 weighted winners to the public leaderboard and participant showcase?"
      : "Unpublish results and revert leaderboard to audience vote tallies?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await adminPublishOfficialResultsAction(publish);
      if (res.success) {
        setHackathonActionFeedback({
          type: "success",
          text: res.message || "Results publishing status updated!",
        });
        await fetchHackathonAdminData();
      } else {
        setHackathonActionFeedback({
          type: "error",
          text: res.error || "Failed to toggle result publication.",
        });
      }
    } catch {
      setHackathonActionFeedback({
        type: "error",
        text: "Error communicating with server.",
      });
    }
  };

  // 8. Rehearsal Reset
  const handleResetVotes = async () => {
    if (resetConfirmationInput !== "CONFIRM RESET") {
      alert("Please type 'CONFIRM RESET' exactly to authorize.");
      return;
    }

    setIsResettingVotes(true);
    setHackathonActionFeedback(null);
    try {
      const res = await adminRehearsalResetVotesAction(resetConfirmationInput);
      if (res.success) {
        setHackathonActionFeedback({
          type: "success",
          text: res.message || "Rehearsal votes reset successfully!",
        });
        setShowResetModal(false);
        setResetConfirmationInput("");
        await fetchFullData();
      } else {
        setHackathonActionFeedback({
          type: "error",
          text: res.error || "Failed to reset rehearsal votes.",
        });
      }
    } catch {
      setHackathonActionFeedback({
        type: "error",
        text: "Server error during vote wipe.",
      });
    } finally {
      setIsResettingVotes(false);
    }
  };

  // 9. Export Hackathon Votes CSV
  const handleExportHackathonVotesCSV = () => {
    if (fullFinalists.length === 0) {
      alert("No hackathon finalists found.");
      return;
    }

    const headers = [
      "Candidate Name",
      "Professional Title",
      "Track",
      "Project Title",
      "Current Status",
      "Audience Votes",
      "Audience Percentage",
    ];

    const rows = fullFinalists.map((f) => [
      `"${f.lead_name}"`,
      `"${f.professional_title}"`,
      `"${f.track}"`,
      `"${f.project_title}"`,
      `"${f.status}"`,
      f.votes,
      `"${f.percentage}%"`,
    ]);

    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `NCD_Hackathon_Audience_Votes_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 10. Export Official Weighted Results CSV
  const handleExportOfficialResultsCSV = () => {
    if (jurySummaries.length === 0) {
      alert("No weighted results calculated yet.");
      return;
    }

    const headers = [
      "Official Rank",
      "Finalist Name",
      "Track",
      "Project Title",
      "Avg Jury Score (70% weight)",
      "Audience Votes",
      "Audience Score (30% weight)",
      "Final Weighted Score (100%)",
      "Winner Tag",
    ];

    const rows = jurySummaries.map((s) => [
      s.rank,
      `"${s.lead_name}"`,
      `"${s.track}"`,
      `"${s.project_title}"`,
      s.avg_jury_score,
      s.audience_votes,
      `${s.audience_score}%`,
      s.final_weighted_score,
      `"${s.winner_badge || ""}"`,
    ]);

    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `NCD_Hackathon_Official_Results_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // If Not Authenticated: Render Executive Sign-In
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#02210a] via-[#011406] to-[#010903] text-white px-4 py-12 relative overflow-hidden selection:bg-spring selection:text-pine">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[320px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[280px] h-[280px] bg-spring/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Brand header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block transition-transform duration-300 hover:scale-105 mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-spring rounded-lg p-1"
              aria-label="Return to Summit Portal"
            >
              <Image
                src="/images/brand/logo-footer.png"
                alt="Northern Creative Designers"
                width={240}
                height={76}
                className="h-9 sm:h-10 w-auto object-contain mx-auto"
                priority
              />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-spring text-xs font-semibold tracking-wider uppercase border border-white/10 mb-3 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operations Control Gateway</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Executive Administration
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Authorized Summit 2.0 personnel &amp; venue ops only
            </p>
          </div>

          {/* Login Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
            {authError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-medium leading-relaxed flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="support@northcdesigner.com.ng"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 focus:bg-white/10 text-sm font-medium text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-spring/40 focus:border-spring transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                  Security Passkey
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter passkey..."
                    className="w-full h-12 pl-10 pr-11 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 focus:bg-white/10 text-sm font-medium text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-spring/40 focus:border-spring transition-all font-mono tracking-wider"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/80 transition-colors focus:outline-none"
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
                  className="w-full h-12 rounded-xl bg-spring hover:bg-spring/90 text-navy font-bold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(74,222,128,0.25)] hover:shadow-[0_6px_20px_rgba(74,222,128,0.35)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                TLS 1.3 Encrypted
              </span>
              <span className="font-mono text-white/40">RC: 9930022</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-white/50 hover:text-spring transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr; Return to Summit Homepage</span>
            </Link>
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
                  Live Operations
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
                        <th className="py-3 px-4">Fee &amp; Payment Proof</th>
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
                            {(() => {
                              const isVendor = ex.category?.toLowerCase().includes("vendor");
                              const feeMatch = ex.notes?.match(/\[Fee:\s*([^\]]+)\]/);
                              const proofMatch = ex.notes?.match(/\[Proof:\s*([^\]]+)\]/);
                              const feeText = feeMatch ? feeMatch[1] : (isVendor ? "₦25,000" : "₦30,000");
                              const proofUrl = proofMatch && proofMatch[1] !== "Pending" && proofMatch[1] !== "None" ? proofMatch[1] : null;

                              return (
                                <div className="space-y-1">
                                  <span className="font-extrabold text-pine text-xs block">{feeText}</span>
                                  {proofUrl ? (
                                    <a
                                      href={proofUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                                    >
                                      <span>View Receipt ↗</span>
                                    </a>
                                  ) : (
                                    <span className="text-[10px] text-amber-700 font-medium block">No proof attached</span>
                                  )}
                                </div>
                              );
                            })()}
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

        {/* TAB 5: HACKATHON COMMAND CENTER */}
        {activeTab === "hackathon" && (
          <div className="space-y-6">
            {/* Hackathon Top Bar Banner */}
            <div className="p-6 rounded-3xl bg-pine text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-spring text-[#063B18]">
                    Command Center
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    Northern Design Hackathon 2.0 (Roots &amp; Vectors)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  Live Voting &amp; Competition Operations
                </h2>
                <p className="text-xs text-white/80 mt-0.5">
                  Manage stage finalists, control the 20-minute live voting window, input jury scores, and publish official 70/30 weighted winners.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/hackathon/vote"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-spring text-[#063B18] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#02b25b] transition-all shadow-xs"
                >
                  <Vote className="w-3.5 h-3.5" />
                  <span>Public Ballot</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </Link>

                <Link
                  href="/hackathon/leaderboard"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-white/20"
                >
                  <Trophy className="w-3.5 h-3.5 text-spring" />
                  <span>Leaderboard</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </Link>

                <button
                  onClick={fetchHackathonAdminData}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Refresh Hackathon Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hackathon Action Feedback Banner */}
            {hackathonActionFeedback && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in ${
                  hackathonActionFeedback.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {hackathonActionFeedback.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span>{hackathonActionFeedback.text}</span>
              </div>
            )}

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
              {[
                { id: "overview", label: "Overview & Status", icon: Zap },
                { id: "finalists", label: `Contestants (${fullFinalists.length})`, icon: Users },
                { id: "voting", label: "Live Voting Controls", icon: Vote },
                { id: "jury", label: "Jury Scoring (70%)", icon: Award },
                { id: "results", label: "Weighted Results (70/30)", icon: Trophy },
                { id: "audit", label: "Rehearsal & Reset", icon: RotateCcw },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = hackathonSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setHackathonSubTab(tab.id as any)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-pine text-white shadow-2xs"
                        : "text-neutral-600 hover:text-pine hover:bg-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 1: OVERVIEW & STATUS                                   */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "overview" && (
              <div className="space-y-6">
                {/* Metrics 4-grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Stage Finalists
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-pine font-mono block">
                      {fullFinalists.filter((f) => f.status === "stage_finalist" || f.status === "winner").length}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Approved for on-stage live sprint
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Audience Ballots
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono block">
                      {hackathonState?.total_votes || 0}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Verified audience votes cast
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Voting Status
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          hackathonState?.status === "voting"
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-amber-500"
                        }`}
                      />
                      <span className="text-base font-black text-pine uppercase font-mono">
                        {hackathonState?.status || "upcoming"}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      {hackathonState?.status === "voting" ? "20-minute window open" : "Ballot accepting closed"}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Official Results
                    </span>
                    <span
                      className={`text-base font-black uppercase font-mono block mt-1 ${
                        hackathonState?.results_published ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {hackathonState?.results_published ? "Published" : "Unpublished"}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {hackathonState?.results_published ? "Public can see 70/30 winners" : "Confidential/internal"}
                    </span>
                  </div>
                </div>

                {/* Live Voting Window Quick Launcher */}
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-pine">
                        Quick Voting Window Switcher
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Controls authoritative server time for audience ballot submissions.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={votingDurationInput}
                        onChange={(e) => setVotingDurationInput(Number(e.target.value) || 20)}
                        className="w-16 h-9 px-2 rounded-lg border border-neutral-200 text-xs font-mono font-bold text-center"
                      />
                      <span className="text-xs text-neutral-500 font-medium">Minutes</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                    <button
                      onClick={() => handleSetVotingStatus("upcoming")}
                      disabled={isChangingVotingStatus}
                      className="py-3 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Prepare (Upcoming)</span>
                    </button>

                    <button
                      onClick={() => handleSetVotingStatus("voting", votingDurationInput)}
                      disabled={isChangingVotingStatus}
                      className="py-3 px-4 rounded-xl bg-pine hover:bg-pine-light text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 text-spring" />
                      <span>Start {votingDurationInput}-Min Voting</span>
                    </button>

                    <button
                      onClick={() => handleSetVotingStatus("completed")}
                      disabled={isChangingVotingStatus}
                      className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>Close Voting Now</span>
                    </button>

                    <button
                      onClick={() => handlePublishOfficialResults(!hackathonState?.results_published)}
                      className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                        hackathonState?.results_published
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18]"
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{hackathonState?.results_published ? "Unpublish Results" : "Publish 70/30 Winners"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 2: CONTESTANT & PROJECT PROFILES                       */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "finalists" && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search contestant by name, project, track..."
                      value={candidateSearchQuery}
                      onChange={(e) => setCandidateSearchQuery(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    {["all", "brand", "uiux"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setCandidateFilterTrack(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                          candidateFilterTrack === t
                            ? "bg-pine text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {t === "all" ? "All Tracks" : t === "brand" ? "Brand Identity" : "UI/UX"}
                      </button>
                    ))}

                    <button
                      onClick={handleExportHackathonVotesCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV Export</span>
                    </button>
                  </div>
                </div>

                {/* Finalists Cards */}
                {fullFinalists.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-2">
                    <Users className="w-10 h-10 text-neutral-300 mx-auto" />
                    <p className="text-sm font-bold text-pine">No contestants registered yet</p>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Applications submitted via the hackathon registration form will appear here for review, profile editing, and stage finalist approval.
                    </p>
                  </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fullFinalists
                    .filter((c) => {
                      const matchTrack =
                        candidateFilterTrack === "all" ||
                        (candidateFilterTrack === "brand" && c.track.toLowerCase().includes("brand")) ||
                        (candidateFilterTrack === "uiux" && (c.track.toLowerCase().includes("ui") || c.track.toLowerCase().includes("product")));

                      const matchSearch =
                        !candidateSearchQuery ||
                        c.lead_name.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
                        c.project_title.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
                        c.track.toLowerCase().includes(candidateSearchQuery.toLowerCase());

                      return matchTrack && matchSearch;
                    })
                    .map((candidate) => (
                      <div
                        key={candidate.id}
                        className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                              <Image
                                src={candidate.avatar_url || "/images/community/ncd_class_training.jpg"}
                                alt={candidate.lead_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700">
                                  {candidate.track}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    candidate.status === "stage_finalist"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : candidate.status === "winner"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-neutral-100 text-neutral-600"
                                  }`}
                                >
                                  {candidate.status.replace("_", " ").toUpperCase()}
                                </span>
                              </div>
                              <h4 className="font-bold text-pine text-base leading-snug mt-1 truncate">
                                {candidate.lead_name}
                              </h4>
                              <p className="text-[11px] text-neutral-500 truncate">
                                {candidate.professional_title}
                              </p>
                            </div>
                          </div>

                          {/* Project details snippet */}
                          <div className="p-3 bg-neutral-50 rounded-xl space-y-1 text-xs">
                            <span className="font-bold text-pine block truncate">
                              {candidate.project_title}
                            </span>
                            <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                              {candidate.short_description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="font-mono text-neutral-500 text-[11px]">Audience Votes:</span>
                            <span className="font-mono font-bold text-pine">
                              {candidate.votes} ({candidate.percentage}%)
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-neutral-100 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleOpenEditCandidate(candidate)}
                              className="py-2 px-3 rounded-xl bg-neutral-sand/40 hover:bg-neutral-sand text-pine font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-200"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-pine" />
                              <span>Edit Details</span>
                            </button>

                            <button
                              onClick={() => setAdminQrCandidate(candidate)}
                              className="py-2 px-3 rounded-xl bg-white hover:bg-neutral-50 text-pine font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-200"
                            >
                              <QrCode className="w-3.5 h-3.5 text-pine" />
                              <span>QR Pass</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleOpenScoring(candidate)}
                              className="py-1.5 px-3 rounded-xl bg-pine hover:bg-pine-light text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <Award className="w-3.5 h-3.5 text-spring" />
                              <span>Jury Score</span>
                            </button>

                            {candidate.status !== "stage_finalist" ? (
                              <button
                                onClick={async () => {
                                  await adminUpdateFinalistAction(candidate.id, { status: "stage_finalist" });
                                  await fetchHackathonAdminData();
                                }}
                                className="py-1.5 px-3 rounded-xl bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] font-bold text-xs transition-colors"
                              >
                                Promote to Finalist
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  await adminUpdateFinalistAction(candidate.id, { status: "shortlisted" });
                                  await fetchHackathonAdminData();
                                }}
                                className="py-1.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold text-xs transition-colors"
                              >
                                Demote
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 3: LIVE VOTING CONTROLS & ANALYTICS                    */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "voting" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-pine">
                        Live Voting Console &amp; Real-Time Analytics
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Total valid ballots: <span className="font-bold text-pine font-mono">{hackathonState?.total_votes || 0}</span>
                      </p>
                    </div>

                    <button
                      onClick={handleExportHackathonVotesCSV}
                      className="px-4 py-2 rounded-xl bg-spring hover:bg-[#02b25b] text-[#063B18] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Audience Votes CSV</span>
                    </button>
                  </div>

                  {/* Real-time Tally progress per finalist */}
                  <div className="space-y-4">
                    {fullFinalists
                      .filter((f) => f.status === "stage_finalist" || f.status === "winner")
                      .sort((a, b) => b.votes - a.votes)
                      .map((candidate, idx) => (
                        <div key={candidate.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-xs text-neutral-400">
                                #{idx + 1}
                              </span>
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                                <Image
                                  src={candidate.avatar_url || "/images/community/ncd_class_training.jpg"}
                                  alt={candidate.lead_name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-pine text-xs sm:text-sm">
                                  {candidate.lead_name}
                                </h4>
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  {candidate.track} • {candidate.project_title}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-mono font-black text-pine text-sm sm:text-base">
                                {candidate.votes} votes
                              </span>
                              <span className="text-xs font-mono text-neutral-500 ml-2">
                                ({candidate.percentage}%)
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                              style={{ width: `${candidate.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 4: JURY SCORING (70% WEIGHT)                           */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "jury" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="text-base font-bold text-pine">
                      Grand Jury Rubric Evaluation Console
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Jury scores comprise 70% of official final standings across 4 official criteria: Cultural Semiotics (25), Problem-Solution Fit (25), Craft &amp; Execution (25), and Presentation Clarity (25).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fullFinalists
                      .filter((f) => f.status === "stage_finalist" || f.status === "winner")
                      .map((candidate) => {
                        const summary = jurySummaries.find((s) => s.team_id === candidate.id);
                        return (
                          <div
                            key={candidate.id}
                            className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-neutral-700 border border-neutral-200">
                                  {candidate.track}
                                </span>
                                <span className="text-xs font-mono font-bold text-pine">
                                  {summary?.judge_count || 0} evaluations
                                </span>
                              </div>

                              <h4 className="font-bold text-pine text-base leading-snug">
                                {candidate.lead_name}
                              </h4>
                              <p className="text-xs text-neutral-600 truncate">
                                {candidate.project_title}
                              </p>

                              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between">
                                <span className="text-xs text-neutral-500 font-medium">Avg Jury Score:</span>
                                <span className="text-lg font-black font-mono text-pine">
                                  {summary?.avg_jury_score || 0} / 100
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleOpenScoring(candidate)}
                              className="w-full py-2 rounded-xl bg-pine hover:bg-pine-light text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <Award className="w-3.5 h-3.5 text-spring" />
                              <span>Input / Update Jury Marks</span>
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 5: WEIGHTED RESULTS & WINNERS (70/30)                  */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "results" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-pine">
                        Official Weighted Rankings (70% Jury + 30% Audience)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Formula: <span className="font-mono font-semibold text-pine">(Jury Score × 0.70) + (Audience Share % × 0.30)</span>. First tie-breaker: Jury evaluation.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportOfficialResultsCSV}
                        className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={() => handlePublishOfficialResults(!hackathonState?.results_published)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                          hackathonState?.results_published
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18]"
                        }`}
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{hackathonState?.results_published ? "Unpublish Results" : "Publish Official Winners"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Standings Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-4">Rank</th>
                          <th className="py-3 px-4">Finalist &amp; Project</th>
                          <th className="py-3 px-4">Track</th>
                          <th className="py-3 px-4 text-center">Jury Avg (70%)</th>
                          <th className="py-3 px-4 text-center">Audience (30%)</th>
                          <th className="py-3 px-4 text-right">Combined Score</th>
                          <th className="py-3 px-4 text-right">Winner Tag</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {jurySummaries.map((summary) => (
                          <tr
                            key={summary.team_id}
                            className={`hover:bg-neutral-50/70 transition-colors ${
                              summary.rank === 1 ? "bg-amber-50/30" : ""
                            }`}
                          >
                            <td className="py-3 px-4 font-mono font-black text-sm text-pine">
                              {summary.rank === 1 ? "🥇 1" : summary.rank === 2 ? "🥈 2" : summary.rank === 3 ? "🥉 3" : `#${summary.rank}`}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-neutral-900 block text-xs sm:text-sm">
                                {summary.lead_name}
                              </span>
                              <span className="text-[11px] text-neutral-500 block truncate">
                                {summary.project_title}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-mono">
                                {summary.track}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-pine">
                              {summary.avg_jury_score} / 100
                              <span className="text-[10px] text-neutral-400 block font-normal">
                                ({summary.judge_count} judges)
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                              {summary.audience_score}%
                              <span className="text-[10px] text-neutral-400 block font-normal">
                                ({summary.audience_votes} votes)
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-sm sm:text-base text-pine">
                              {summary.final_weighted_score} / 100
                            </td>
                            <td className="py-3 px-4 text-right">
                              {summary.winner_badge ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-900">
                                  {summary.winner_badge}
                                </span>
                              ) : (
                                <span className="text-[11px] text-neutral-400 font-mono">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUBTAB 6: REHEARSAL & RESET CONTROLS                          */}
            {/* ------------------------------------------------------------- */}
            {hackathonSubTab === "audit" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="text-base font-bold text-pine flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      Testing &amp; Rehearsal Vote Reset
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Enables technical staff to test the 20-minute voting window, QR code scanning, and live leaderboard before the event day.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Safety Safeguard Notice:
                    </p>
                    <p>
                      Resetting votes will permanently delete all test ballots from the database, reset the hackathon status to "upcoming", and cancel the active voting window. Contestant profiles and jury scores remain intact.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowResetModal(true)}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Authorize Rehearsal Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MODAL 1: EDIT CANDIDATE PROFILE & PROJECT DETAILS             */}
            {/* ------------------------------------------------------------- */}
            {editingCandidate && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-border space-y-6 max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setEditingCandidate(null)}
                    className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>

                  <div className="border-b border-neutral-100 pb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-spring">
                      Contestant Dossier
                    </span>
                    <h3 className="text-xl font-black text-pine tracking-tight">
                      Edit Profile &amp; Project Information
                    </h3>
                  </div>

                  <form onSubmit={handleSaveCandidate} className="space-y-4 text-xs">
                    {/* Photo Uploader */}
                    <div className="space-y-2">
                      <label className="font-bold text-pine uppercase tracking-wider block">
                        Profile Photograph
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                          {editForm.avatar_url ? (
                            <Image
                              src={editForm.avatar_url}
                              alt="Avatar"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Camera className="w-6 h-6 text-neutral-400 m-auto mt-5" />
                          )}
                        </div>

                        <div className="space-y-1 flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            disabled={isUploadingPhoto}
                            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pine file:text-white hover:file:bg-pine-light cursor-pointer"
                          />
                          <p className="text-[11px] text-neutral-400">
                            Upload portrait photo (optimizes to Cloudinary) or paste URL below.
                          </p>
                        </div>
                      </div>
                      <input
                        type="url"
                        placeholder="Or direct image URL (https://...)"
                        value={editForm.avatar_url}
                        onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-pine"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editForm.lead_name}
                          onChange={(e) => setEditForm({ ...editForm, lead_name: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-pine"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Professional Designation *</label>
                        <input
                          type="text"
                          required
                          value={editForm.professional_title}
                          onChange={(e) => setEditForm({ ...editForm, professional_title: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-pine"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Competition Track *</label>
                        <select
                          value={editForm.track}
                          onChange={(e) => setEditForm({ ...editForm, track: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-pine"
                        >
                          <option value="Brand Identity Systems">Brand Identity Systems</option>
                          <option value="UI/UX & Mobile Products">UI/UX & Mobile Products</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={editForm.project_title}
                          onChange={(e) => setEditForm({ ...editForm, project_title: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-pine"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-pine uppercase tracking-wider block">Short Project Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={editForm.short_description}
                        onChange={(e) => setEditForm({ ...editForm, short_description: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-pine"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-pine uppercase tracking-wider block">Problem Statement</label>
                      <textarea
                        rows={2}
                        value={editForm.problem_statement}
                        onChange={(e) => setEditForm({ ...editForm, problem_statement: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-pine"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-pine uppercase tracking-wider block">Proposed Solution</label>
                      <textarea
                        rows={2}
                        value={editForm.proposed_solution}
                        onChange={(e) => setEditForm({ ...editForm, proposed_solution: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-pine"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Figma / Slides Presentation URL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={editForm.presentation_url}
                          onChange={(e) => setEditForm({ ...editForm, presentation_url: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-pine"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-pine uppercase tracking-wider block">Portfolio / Behance URL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={editForm.portfolio_url}
                          onChange={(e) => setEditForm({ ...editForm, portfolio_url: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-pine"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCandidate(null)}
                        className="py-2.5 px-4 rounded-xl border border-neutral-200 text-neutral-600 font-bold text-xs"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSavingCandidate}
                        className="py-2.5 px-6 rounded-xl bg-pine hover:bg-pine-light text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
                      >
                        {isSavingCandidate ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MODAL 2: JURY EVALUATION SCORE SHEET                         */}
            {/* ------------------------------------------------------------- */}
            {scoringCandidate && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-border space-y-6">
                  <button
                    onClick={() => setScoringCandidate(null)}
                    className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>

                  <div className="border-b border-neutral-100 pb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-spring">
                      70% Grand Jury Evaluation Rubric
                    </span>
                    <h3 className="text-xl font-black text-pine tracking-tight">
                      Score: {scoringCandidate.lead_name}
                    </h3>
                    <p className="text-xs text-neutral-500 truncate">
                      {scoringCandidate.project_title}
                    </p>
                  </div>

                  <form onSubmit={handleSaveJuryScore} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-pine uppercase tracking-wider block">Judge Name *</label>
                      <input
                        type="text"
                        required
                        value={scoringForm.judge_name}
                        onChange={(e) => setScoringForm({ ...scoringForm, judge_name: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-pine"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-neutral-50 rounded-xl space-y-1">
                        <label className="font-bold text-pine block">
                          Cultural Semiotics (0-25)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={25}
                          value={scoringForm.cultural_semiotics}
                          onChange={(e) =>
                            setScoringForm({ ...scoringForm, cultural_semiotics: Number(e.target.value) || 0 })
                          }
                          className="w-full h-9 px-2 rounded-lg border border-neutral-200 font-mono font-bold text-center text-sm"
                        />
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-xl space-y-1">
                        <label className="font-bold text-pine block">
                          Problem-Solution Fit (0-25)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={25}
                          value={scoringForm.problem_solution}
                          onChange={(e) =>
                            setScoringForm({ ...scoringForm, problem_solution: Number(e.target.value) || 0 })
                          }
                          className="w-full h-9 px-2 rounded-lg border border-neutral-200 font-mono font-bold text-center text-sm"
                        />
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-xl space-y-1">
                        <label className="font-bold text-pine block">
                          Craft &amp; Execution (0-25)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={25}
                          value={scoringForm.craft_execution}
                          onChange={(e) =>
                            setScoringForm({ ...scoringForm, craft_execution: Number(e.target.value) || 0 })
                          }
                          className="w-full h-9 px-2 rounded-lg border border-neutral-200 font-mono font-bold text-center text-sm"
                        />
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-xl space-y-1">
                        <label className="font-bold text-pine block">
                          Presentation Clarity (0-25)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={25}
                          value={scoringForm.presentation}
                          onChange={(e) =>
                            setScoringForm({ ...scoringForm, presentation: Number(e.target.value) || 0 })
                          }
                          className="w-full h-9 px-2 rounded-lg border border-neutral-200 font-mono font-bold text-center text-sm"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-pine/10 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-pine">Calculated Total (0-100):</span>
                      <span className="text-xl font-mono font-black text-pine">
                        {scoringForm.cultural_semiotics +
                          scoringForm.problem_solution +
                          scoringForm.craft_execution +
                          scoringForm.presentation}{" "}
                        / 100
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-pine uppercase tracking-wider block">Juror Feedback</label>
                      <textarea
                        rows={2}
                        placeholder="Constructive feedback for the designer..."
                        value={scoringForm.feedback || ""}
                        onChange={(e) => setScoringForm({ ...scoringForm, feedback: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-pine"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setScoringCandidate(null)}
                        className="py-2.5 px-4 rounded-xl border border-neutral-200 text-neutral-600 font-bold text-xs"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSavingScore}
                        className="py-2.5 px-6 rounded-xl bg-pine hover:bg-pine-light text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
                      >
                        {isSavingScore ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Recording...</span>
                          </>
                        ) : (
                          <span>Submit Evaluation</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MODAL 3: REHEARSAL WIPE SAFETY CONFIRMATION                   */}
            {/* ------------------------------------------------------------- */}
            {showResetModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-border space-y-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-pine tracking-tight">
                      Authorize Rehearsal Vote Wipe
                    </h3>
                    <p className="text-xs text-navy/70 leading-relaxed">
                      This action will delete all test ballots currently recorded in the database and reset the voting window. Type <span className="font-mono font-bold text-red-600">CONFIRM RESET</span> below to proceed.
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="CONFIRM RESET"
                    value={resetConfirmationInput}
                    onChange={(e) => setResetConfirmationInput(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-red-300 text-center font-mono font-bold text-xs text-red-700 uppercase"
                  />

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetModal(false);
                        setResetConfirmationInput("");
                      }}
                      className="py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleResetVotes}
                      disabled={resetConfirmationInput !== "CONFIRM RESET" || isResettingVotes}
                      className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-40"
                    >
                      {isResettingVotes ? "Wiping..." : "Execute Reset"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* QR Modal for Admin */}
            {adminQrCandidate && (
              <ContestantQrModal
                isOpen={Boolean(adminQrCandidate)}
                onClose={() => setAdminQrCandidate(null)}
                candidateName={adminQrCandidate.lead_name}
                projectTitle={adminQrCandidate.project_title}
                votingUrl={`${
                  typeof window !== "undefined" ? window.location.origin : "https://northcdesigner.com.ng"
                }/hackathon/participants/${adminQrCandidate.id}`}
                avatarUrl={adminQrCandidate.avatar_url}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
