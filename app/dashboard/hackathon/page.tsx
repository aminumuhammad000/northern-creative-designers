"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Trophy,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Globe,
  FileText,
  Lightbulb,
  Target,
  Presentation,
  User,
  Vote,
  Clock,
  Share2,
  Copy,
  Check,
  Loader2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { DashboardSidebar, DashboardTopBar } from "@/components/dashboard/DashboardSidebar";
import {
  getHackathonParticipantDataAction,
  updateHackathonParticipantAction,
  uploadHackathonParticipantPhotoAction,
  setParticipantSessionCookieAction,
  HackathonParticipantData,
} from "@/app/actions/hackathon-dashboard";

type TabId = "project" | "profile" | "voting";

export default function HackathonParticipantDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("project");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Participant Data
  const [participant, setParticipant] = useState<HackathonParticipantData | null>(null);
  const [allParticipants, setAllParticipants] = useState<
    Array<{ id: string; lead_name: string; lead_email: string; track: string; project_title: string }>
  >([]);
  const [hackathonState, setHackathonState] = useState<any>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    project_title: "",
    short_description: "",
    detailed_description: "",
    problem_statement: "",
    proposed_solution: "",
    target_audience: "",
    presentation_url: "",
    portfolio_url: "",
    professional_title: "",
    avatar_url: "",
    lead_name: "",
    lead_phone: "",
    organization: "",
    city: "",
    track: "Brand identity",
  });

  // Switcher Lookup
  const [searchEmail, setSearchEmail] = useState("");

  const loadData = async (identifier?: string) => {
    try {
      setIsLoading(true);
      const res = await getHackathonParticipantDataAction(identifier);
      if (res.success && res.participant) {
        setParticipant(res.participant);
        setAllParticipants(res.allParticipants || []);
        setHackathonState(res.hackathonState || null);

        setFormData({
          project_title: res.participant.project_title || "",
          short_description: res.participant.short_description || "",
          detailed_description: res.participant.detailed_description || "",
          problem_statement: res.participant.problem_statement || "",
          proposed_solution: res.participant.proposed_solution || "",
          target_audience: res.participant.target_audience || "",
          presentation_url: res.participant.presentation_url || "",
          portfolio_url: res.participant.portfolio_url || "",
          professional_title: res.participant.professional_title || "",
          avatar_url: res.participant.avatar_url || "",
          lead_name: res.participant.lead_name || "",
          lead_phone: res.participant.lead_phone || "",
          organization: res.participant.organization || "",
          city: res.participant.city || "",
          track: res.participant.track || "Brand identity",
        });
      } else {
        setAllParticipants(res.allParticipants || []);
        setHackathonState(res.hackathonState || null);
      }
    } catch (err: unknown) {
      console.error("Failed to load hackathon participant dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectParticipant = async (id: string, email: string) => {
    await setParticipantSessionCookieAction(id, email);
    await loadData(id);
  };

  const handleLookupByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail.trim()) return;
    await loadData(searchEmail.trim());
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ type: "error", text: "Image is larger than 5MB. Please choose a smaller photo." });
      return;
    }

    setIsUploadingPhoto(true);
    setFeedback(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const uploadRes = await uploadHackathonParticipantPhotoAction(base64);
        const finalUrl = uploadRes.success && uploadRes.url ? uploadRes.url : base64;

        setFormData((prev) => ({ ...prev, avatar_url: finalUrl }));
        setParticipant((prev) => (prev ? { ...prev, avatar_url: finalUrl } : prev));

        if (participant?.id) {
          const saveRes = await updateHackathonParticipantAction(participant.id, { avatar_url: finalUrl });
          if (!saveRes.success) {
            setFeedback({ type: "error", text: saveRes.error || "Photo uploaded but failed to save to profile." });
            return;
          }
        }
        setFeedback({ type: "success", text: "Profile photograph uploaded and saved successfully!" });
      } catch {
        setFeedback({ type: "error", text: "Failed to upload image. Please try again." });
      } finally {
        setIsUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant?.id || isSaving) return;

    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await updateHackathonParticipantAction(participant.id, formData);
      if (res.success) {
        setParticipant((prev) => (prev ? { ...prev, ...formData } : null));
        setFeedback({
          type: "success",
          text: "Project brief, presentation link, and profile saved successfully!",
        });
        setTimeout(() => setFeedback(null), 5000);
      } else {
        setFeedback({ type: "error", text: res.error || "Failed to save updates." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyPublicLink = () => {
    if (!participant) return;
    const url = `${window.location.origin}/hackathon/participants/${participant.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-8 h-8 text-pine animate-spin mb-3" />
        <p className="text-xs font-semibold text-pine uppercase tracking-wider">
          Connecting to Hackathon Stage Database...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Participant Sidebar */}
      <DashboardSidebar
        portalType="hackathon"
        portalTitle="Sprint Portal"
        portalBadge="Finalist"
        userName={participant?.lead_name || "Hackathon Competitor"}
        userSubtitle={participant?.track ? `${participant.track} Track` : "Designer"}
        userEmail={participant?.lead_email || "competitor@hackathon.org"}
        items={[
          { id: "project", label: "Project & Presentation", icon: Presentation },
          { id: "profile", label: "Profile & Avatar", icon: User },
          { id: "voting", label: "Stage Voting & Ballot", icon: Vote, badge: participant?.votes ? `${participant.votes}` : undefined },
        ]}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as TabId)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar
          title={
            activeTab === "project"
              ? "Project Brief & Stage Presentation"
              : activeTab === "profile"
              ? "Designer Profile & Avatar"
              : "Live Stage Voting & Public Link"
          }
          subtitle={participant?.lead_name || "Hackathon Contestant"}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        {/* Global Feedback Banner */}
        {feedback && (
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
                feedback.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          </div>
        )}

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Contestant Status Overview Banner */}
          {participant && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pine to-[#034d1b] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-spring/40 bg-white/10 shrink-0">
                  <Image
                    src={formData.avatar_url || "/images/community/ncd_class_training.jpg"}
                    alt={participant.lead_name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-spring text-[#063B18]">
                      {participant.track}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 text-white">
                      {participant.status.replace("_", " ")}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mt-1 text-white truncate">
                    {formData.project_title || participant.lead_name}
                  </h2>
                  <p className="text-xs text-white/80 truncate">
                    {participant.lead_name}{participant.city ? ` • ${participant.city}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Link
                  href={`/hackathon/participants/${participant.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Public Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleCopyPublicLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-spring" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 1: PROJECT & PRESENTATION BRIEF ================= */}
          {activeTab === "project" && (
            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <Presentation className="w-5 h-5 text-spring" />
                    Project Brief &amp; Presentation Assets
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Judges and the live voting audience will evaluate your stage pitch using these details.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-60 shrink-0 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Project Brief</span>
                </button>
              </div>

              <div className="space-y-5 text-xs">
                {/* Project Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Project Title <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Qalam: Vernacular Calligraphy System for Contemporary Arewa Packaging"
                    value={formData.project_title}
                    onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>

                {/* Short Pitch / Elevator Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Elevator Pitch / Short Summary <span className="text-spring font-bold">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. A modular brand identity incorporating Northern geometric patterns and modern typography for export-ready agricultural cooperatives in Kano."
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs leading-relaxed"
                  />
                </div>

                {/* Grid: Presentation URL & Portfolio URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Stage Presentation / Pitch Deck Link <span className="text-spring font-bold">*</span>
                    </label>
                    <div className="relative">
                      <Presentation className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="url"
                        placeholder="https://figma.com/proto/... or Google Slides, Canva, Drive"
                        value={formData.presentation_url}
                        onChange={(e) => setFormData({ ...formData, presentation_url: e.target.value })}
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Personal Portfolio / Behance URL
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="url"
                        placeholder="https://behance.net/yourprofile or portfolio website"
                        value={formData.portfolio_url}
                        onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-tangerine" />
                    Problem Statement &amp; Regional Context
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the regional, commercial, or cultural design problem you identified in Northern Nigeria..."
                    value={formData.problem_statement}
                    onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs leading-relaxed"
                  />
                </div>

                {/* Proposed Solution */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-spring" />
                    Proposed Solution &amp; Cultural Semiotics
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detail your design methodology, typography choices, semiotic motifs, and how this solves the problem..."
                    value={formData.proposed_solution}
                    onChange={(e) => setFormData({ ...formData, proposed_solution: e.target.value })}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs leading-relaxed"
                  />
                </div>

                {/* Target Audience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Target Audience / Stakeholders
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Local textile artisans, Northern tech hubs, youth creatives, agribusiness cooperatives"
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Project Brief</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 2: PROFILE & AVATAR UPLOAD ================= */}
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <User className="w-5 h-5 text-spring" />
                    Contestant Profile &amp; Photo
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Your avatar and title will appear on the public ballot, live stage displays, and leaderboard.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-60 shrink-0 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Profile</span>
                </button>
              </div>

              {/* Photo Upload Card */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-pine/30 bg-neutral-200 shrink-0 shadow-sm">
                  <Image
                    src={formData.avatar_url || "/images/community/ncd_class_training.jpg"}
                    alt={formData.lead_name || "Profile Photo"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-pine/70 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-pine">Profile Photograph / Avatar</h4>
                  <p className="text-xs text-neutral-500">
                    High-resolution portrait (square 1:1 ratio recommended, max 5MB).
                  </p>
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingPhoto ? "Uploading..." : "Upload New Photo"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Full Name <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lead_name}
                    onChange={(e) => setFormData({ ...formData, lead_name: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>

                {/* Professional Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Typeface & Brand Designer"
                    value={formData.professional_title}
                    onChange={(e) => setFormData({ ...formData, professional_title: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>

                {/* Email (Locked) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Registered Email (Locked)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={participant?.lead_email || ""}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-100 text-xs text-neutral-500 cursor-not-allowed"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.lead_phone}
                    onChange={(e) => setFormData({ ...formData, lead_phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>

                {/* Studio / Organization */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Studio / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Freelance, Studio Arewa, or University"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kano, Kaduna, Abuja, Sokoto"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 3: STAGE VOTING & PUBLIC BALLOT ================= */}
          {activeTab === "voting" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-neutral-100 pb-4">
                  <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <Vote className="w-5 h-5 text-spring" />
                    Stage Voting Status &amp; Ballot Link
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Share your public voting link with peers, attendees, and followers to earn audience ballot votes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Audience Votes Received
                    </span>
                    <p className="text-2xl font-black text-pine">{participant?.votes || 0}</p>
                    <span className="text-[11px] text-neutral-600">30% of final weighted score</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Stage Voting Window
                    </span>
                    <p className="text-lg font-bold text-pine">
                      {hackathonState?.is_voting_open ? "Voting is LIVE" : "Window Upcoming"}
                    </p>
                    <span className="text-[11px] text-neutral-600">20-minute live voting period</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Judging Evaluation
                    </span>
                    <p className="text-lg font-bold text-pine">70% Weight</p>
                    <span className="text-[11px] text-neutral-600">4-rubric jury deliberation</span>
                  </div>
                </div>

                {/* Shareable Link Box */}
                {participant && (
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <span className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Your Official Public Contestant Profile
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={typeof window !== "undefined" ? `${window.location.origin}/hackathon/participants/${participant.id}` : `/hackathon/participants/${participant.id}`}
                        className="flex-1 h-11 px-3.5 rounded-xl border border-neutral-200 bg-white font-mono text-xs text-neutral-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPublicLink}
                        className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-spring" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? "Copied" : "Copy"}</span>
                      </button>
                      <Link
                        href={`/hackathon/participants/${participant.id}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl border border-pine text-pine hover:bg-pine/5 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
