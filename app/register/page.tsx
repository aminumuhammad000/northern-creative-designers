"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle,
  Calendar,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Send,
  QrCode,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Layers,
  Palette,
  Code2,
  Tv,
  GraduationCap,
  Award,
  Globe,
  Compass,
  Check,
  Copy,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { eventConfig } from "@/config/event";
import { registerAttendeeAction, checkEmailRegisteredAction, RegistrationData } from "@/app/actions/auth";

const DISCIPLINES = [
  {
    id: "uiux",
    title: "UI/UX & Product Design",
    desc: "Design systems, mobile/web UX, wireframing & research",
    icon: Layers,
  },
  {
    id: "brand",
    title: "Visual & Brand Identity",
    desc: "Logomarks, typography, vectors & cultural branding",
    icon: Palette,
  },
  {
    id: "motion",
    title: "Motion & 3D Design",
    desc: "2D/3D animation, visual effects, Blender & rendering",
    icon: Tv,
  },
  {
    id: "code",
    title: "Creative Frontend & Code",
    desc: "Design-to-code, Tailwind, React & interactive web",
    icon: Code2,
  },
  {
    id: "leadership",
    title: "Agency Founder / Lead",
    desc: "Creative direction, studio management & client strategy",
    icon: Award,
  },
  {
    id: "student",
    title: "Student & Emerging Talent",
    desc: "Aspiring creative learning fundamental design craft",
    icon: GraduationCap,
  },
];

const EXPERIENCE_LEVELS = [
  "Beginner / Student",
  "Junior (1-2 years)",
  "Mid-Level (3-5 years)",
  "Senior / Lead (5+ years)",
];

const NORTHERN_STATES = [
  "Kano",
  "Kaduna",
  "Abuja (FCT)",
  "Plateau (Jos)",
  "Bauchi",
  "Katsina",
  "Sokoto",
  "Gombe",
  "Borno (Maiduguri)",
  "Niger",
  "Adamawa (Yola)",
  "Kebbi",
  "Nasarawa",
  "Other Nigerian State",
  "International Attendee",
];

const SUMMIT_TRACKS = [
  { id: "hackathon", label: "Live 2-Hour Design Hackathon & Audience Voting" },
  { id: "masterclasses", label: "Advanced Practical Masterclasses & Sprints" },
  { id: "client_corner", label: "Client Connect & Portfolio Pitch Reviews" },
  { id: "exhibition", label: "Northern Creative Design Exhibition & Wall" },
  { id: "awards", label: "Summit 2.0 Recognition Awards & Dinner" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [confirmedResult, setConfirmedResult] = useState<{
    referenceCode: string;
    ticketToken: string;
  } | null>(null);

  const copyReferenceCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const [formData, setFormData] = useState<RegistrationData & { confirmPassword?: string }>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cityState: "Kano",
    creativeRole: "UI/UX & Product Design",
    experienceLevel: "Mid-Level (3-5 years)",
    organization: "",
    portfolioUrl: "",
    interests: ["masterclasses", "hackathon"],
    tshirtSize: "L",
    dietaryRequirements: "Standard / Halal",
    specialExpectations: "",
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (trackId: string) => {
    const current = formData.interests || [];
    if (current.includes(trackId)) {
      updateField(
        "interests",
        current.filter((id) => id !== trackId)
      );
    } else {
      updateField("interests", [...current, trackId]);
    }
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsAlreadyRegistered(false);

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setErrorMessage("Please enter your full name.");
        return;
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      if (formData.password && formData.password.length < 6) {
        setErrorMessage("Password should be at least 6 characters.");
        return;
      }
      if (formData.password && formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (!formData.phone.trim()) {
        setErrorMessage("Please provide a WhatsApp contact phone number.");
        return;
      }

      // Check if email is already registered before moving to step 2
      setIsSubmitting(true);
      try {
        const check = await checkEmailRegisteredAction(formData.email);
        if (check.isRegistered) {
          setIsAlreadyRegistered(true);
          setErrorMessage(check.message || `An attendee with email ${formData.email} is already registered. Please log in.`);
          setIsSubmitting(false);
          return;
        }
      } catch {
        // proceed if network check fails
      } finally {
        setIsSubmitting(false);
      }

      setCurrentStep(2);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else if (currentStep === 2) {
      if (!formData.creativeRole) {
        setErrorMessage("Please select your primary creative discipline.");
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setIsAlreadyRegistered(false);

    try {
      const response = await registerAttendeeAction(formData);

      if (response.success && response.referenceCode) {
        setConfirmedResult({
          referenceCode: response.referenceCode,
          ticketToken: response.ticketToken || "TKT-VERIFIED-PASS",
        });
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        if (response.alreadyRegistered) {
          setIsAlreadyRegistered(true);
        }
        setErrorMessage(response.error || "Failed to complete registration.");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 pb-24 bg-white">
      <PageHeader
        tag="Attendee Onboarding"
        title="Register to Attend Summit 2.0"
        description="Roots & Vectors: Shaping the Future of Arewa Design. Join creators, studios, and innovators on 19th December, 2026 in Kano."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {confirmedResult ? (
          /* ================= SUCCESS / CONFIRMED PASS STATE ================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Success Greeting */}
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-spring/20 text-pine flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8 text-spring" />
              </div>
              <div className="space-y-1.5">
                <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold bg-spring text-navy uppercase tracking-wider">
                  Registration Confirmed &amp; Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-pine tracking-tight">
                  Welcome to Summit 2.0, {formData.fullName}!
                </h2>
                <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                  Your official digital access pass is ready. We look forward to hosting you in Kano on 19th December, 2026.
                </p>
              </div>
            </div>

            {/* High-Fidelity Perfectly-Fitted Conference Pass Card */}
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden relative">
                {/* Lanyard Top Punch Hole Header */}
                <div className="bg-pine text-white px-6 pt-5 pb-4 relative overflow-hidden">
                  <div className="w-12 h-2 rounded-full bg-white/20 mx-auto mb-3.5 border border-white/10" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-spring text-xs shadow-2xs">
                        N
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-white leading-tight">
                          {eventConfig.name} {eventConfig.edition}
                        </h3>
                        <p className="text-[10px] text-spring/90 font-medium">Roots &amp; Vectors</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider bg-spring text-navy px-2.5 py-1 rounded-full shadow-2xs whitespace-nowrap">
                        {confirmedResult.referenceCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-5">
                  {/* Delegate Profile Overview */}
                  <div className="flex items-center gap-4 pb-4 border-b border-neutral-100">
                    <div className="w-14 h-14 rounded-2xl bg-pine/10 text-pine flex items-center justify-center font-bold text-lg border-2 border-spring/40 flex-shrink-0 shadow-2xs">
                      {formData.fullName
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-pine leading-tight truncate">
                        {formData.fullName}
                      </h3>
                      <p className="text-xs font-semibold text-pine/80 truncate mt-0.5">
                        {formData.creativeRole}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                        {formData.organization ? `${formData.organization} • ` : ""}
                        {formData.cityState}
                      </p>
                    </div>
                  </div>

                  {/* QR Code Validation Area */}
                  <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/80 flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <QrCode className="w-32 h-32 sm:w-36 sm:h-36 text-pine" strokeWidth={1.5} />
                    </div>
                    <div className="text-center space-y-1.5 w-full flex flex-col items-center">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-pine">
                          {confirmedResult.referenceCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyReferenceCode(confirmedResult.referenceCode)}
                          title="Copy Pass Reference Code"
                          className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-pine transition-colors"
                        >
                          {copiedRef ? (
                            <Check className="w-3.5 h-3.5 text-pine" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-neutral-500 font-medium">
                        Present this QR code or Pass ID at the check-in desk
                      </p>
                    </div>
                  </div>

                  {/* Summit Date & Venue Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-0.5">
                      <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                        Date &amp; Time
                      </span>
                      <span className="font-semibold text-neutral-800 block text-xs">
                        {eventConfig.date}
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        08:30 AM Doors
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-0.5">
                      <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                        Venue
                      </span>
                      <span className="font-semibold text-neutral-800 block text-xs truncate">
                        {eventConfig.venue}
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        Kano, Nigeria
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pass Footer */}
                <div className="bg-neutral-50/80 px-6 py-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="font-mono text-[10px] truncate max-w-[200px]">
                    {confirmedResult.ticketToken.substring(0, 18)}...
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Delegate
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Below Pass */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center h-12 px-6 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-all shadow-xs"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2 text-spring" />
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 rounded-full bg-white border border-neutral-300 text-pine text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors shadow-2xs"
              >
                Print / Save Pass
              </button>
            </div>
          </div>
        ) : (
          /* ================= MULTI-STEP ONBOARDING FORM ================= */
          <div className="space-y-8">
            {/* Step Progress Tracker */}
            <div className="p-4 sm:p-6 rounded-2xl bg-neutral-sand border border-neutral-border">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                  { step: 1, label: "Account" },
                  { step: 2, label: "Discipline" },
                  { step: 3, label: "Summit Goals" },
                  { step: 4, label: "Review & Pass" },
                ].map((item, idx) => {
                  const isCompleted = currentStep > item.step;
                  const isCurrent = currentStep === item.step;
                  return (
                    <React.Fragment key={item.step}>
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isCompleted
                              ? "bg-spring text-navy"
                              : isCurrent
                              ? "bg-pine text-white ring-4 ring-spring/30"
                              : "bg-neutral-200 text-neutral-500"
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
                        </div>
                        <span
                          className={`text-[11px] font-semibold tracking-tight hidden sm:block ${
                            isCurrent ? "text-pine font-bold" : "text-navy/60"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {idx < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                            currentStep > idx + 1 ? "bg-spring" : "bg-neutral-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Error / Already Registered Banner */}
            {errorMessage && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm font-medium ${
                  isAlreadyRegistered
                    ? "bg-amber-50 border-amber-300 text-amber-900 shadow-2xs"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isAlreadyRegistered ? "text-amber-600" : "text-red-600"
                    }`}
                  />
                  <div className="flex-1 space-y-2.5">
                    <p className="font-semibold leading-relaxed">{errorMessage}</p>
                    {isAlreadyRegistered && (
                      <div className="pt-1 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/login?email=${encodeURIComponent(formData.email)}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pine hover:bg-pine/90 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <span>Log In to Your Account</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-xs text-amber-800/80">
                          Already have a pass? Sign in to view and download your ticket.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FORM CONTAINER */}
            <form onSubmit={handleNextStep} className="bg-white rounded-3xl border border-neutral-border p-6 sm:p-10 shadow-xs space-y-8">
              {/* STEP 1: ACCOUNT & CONTACT */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-border pb-4">
                    <span className="text-xs font-bold text-spring uppercase tracking-wider">Step 1 of 4</span>
                    <h2 className="text-2xl font-bold text-pine mt-1">Your Account & Contact Information</h2>
                    <p className="text-xs sm:text-sm text-navy/70 mt-1">
                      Create your Northern Creative account to manage your summit ticket, access hackathon voting, and receive real-time updates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2 sm:col-span-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Full Legal Name
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Amina Bello or Ibrahim Mustapha"
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Email Address
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="you@creativestudio.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-0.5">
                        <span className="text-navy/60">Pass &amp; QR code delivered here</span>
                        <Link href="/login" className="text-pine font-bold hover:underline">
                          Already registered? Sign In
                        </Link>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        WhatsApp Contact Phone
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0803 123 4567"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Account Password
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="password"
                          required
                          placeholder="Minimum 6 characters"
                          value={formData.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Confirm Password
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="password"
                          required
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) => updateField("confirmPassword", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Location / State */}
                    <div className="space-y-2 sm:col-span-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Location / State of Residence
                        <span className="text-spring ml-1 font-bold text-sm leading-none">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <select
                          value={formData.cityState}
                          onChange={(e) => updateField("cityState", e.target.value)}
                          className="w-full h-12 pl-10 pr-10 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine transition-all appearance-none shadow-2xs cursor-pointer"
                        >
                          {NORTHERN_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <ChevronRight className="w-4 h-4 text-neutral-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-border">
                    <span className="text-xs text-navy/60">
                      Already registered?{" "}
                      <Link href="/login" className="text-spring font-bold hover:underline">
                        Sign in to Dashboard
                      </Link>
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap"
                    >
                      Continue to Discipline
                      <ArrowRight className="w-4 h-4 ml-2 text-spring flex-shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CREATIVE IDENTITY & PROFESSIONAL PROFILE */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-border pb-4">
                    <span className="text-xs font-bold text-spring uppercase tracking-wider">Step 2 of 4</span>
                    <h2 className="text-2xl font-bold text-pine mt-1">Creative Craft & Professional Profile</h2>
                    <p className="text-xs sm:text-sm text-navy/70 mt-1">
                      Help us tailor sessions, badges, and the summit talent directory to your craft.
                    </p>
                  </div>

                  {/* Discipline Cards */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider">
                      Select Primary Creative Discipline <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DISCIPLINES.map((d) => {
                        const Icon = d.icon;
                        const isSelected = formData.creativeRole === d.title;
                        return (
                          <div
                            key={d.id}
                            onClick={() => updateField("creativeRole", d.title)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                              isSelected
                                ? "border-spring bg-spring/5 shadow-xs"
                                : "border-neutral-border hover:border-spring/50 hover:bg-neutral-sand/50"
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded-xl ${
                                isSelected ? "bg-spring text-navy" : "bg-neutral-100 text-pine"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-pine">{d.title}</h4>
                              <p className="text-xs text-navy/60 leading-relaxed">{d.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider">
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_LEVELS.map((level) => {
                        const isSelected = formData.experienceLevel === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => updateField("experienceLevel", level)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-pine text-spring ring-2 ring-spring shadow-xs"
                                : "bg-neutral-sand border border-neutral-border text-navy/80 hover:border-spring/40"
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Studio / Org & Portfolio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Company / Studio / University
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Freelance, Bayero University, Tech Hub"
                          value={formData.organization}
                          onChange={(e) => updateField("organization", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Portfolio / Social Link
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-spring transition-colors pointer-events-none" />
                        <input
                          type="url"
                          placeholder="Behance, Dribbble, GitHub, or LinkedIn URL"
                          value={formData.portfolioUrl}
                          onChange={(e) => updateField("portfolioUrl", e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-neutral-border gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-neutral-border text-xs font-semibold uppercase tracking-wider text-navy/80 hover:bg-neutral-sand transition-colors whitespace-nowrap"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap"
                    >
                      Continue to Summit Goals
                      <ArrowRight className="w-4 h-4 ml-2 text-spring flex-shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUMMIT GOALS & LOGISTICS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-border pb-4">
                    <span className="text-xs font-bold text-spring uppercase tracking-wider">Step 3 of 4</span>
                    <h2 className="text-2xl font-bold text-pine mt-1">Summit Experience & Preferences</h2>
                    <p className="text-xs sm:text-sm text-navy/70 mt-1">
                      Choose the specific summits tracks you wish to participate in and your delegate merch sizing.
                    </p>
                  </div>

                  {/* Tracks of Interest */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Summit Tracks of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SUMMIT_TRACKS.map((t) => {
                        const isChecked = (formData.interests || []).includes(t.id);
                        return (
                          <div
                            key={t.id}
                            onClick={() => toggleInterest(t.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer text-xs font-medium flex items-center gap-3 transition-colors ${
                              isChecked
                                ? "border-spring bg-spring/10 text-pine font-bold"
                                : "border-neutral-border bg-neutral-sand/50 text-navy/80 hover:border-spring/50"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isChecked ? "bg-spring border-spring text-navy" : "border-neutral-300 bg-white"
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{t.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Merch T-Shirt & Dietary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Delegate T-Shirt Size
                      </label>
                      <div className="relative">
                        <select
                          value={formData.tshirtSize}
                          onChange={(e) => updateField("tshirtSize", e.target.value)}
                          className="w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine transition-all appearance-none shadow-2xs cursor-pointer"
                        >
                          {["S (Small)", "M (Medium)", "L (Large)", "XL (Extra Large)", "2XL (Double Large)"].map(
                            (size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            )
                          )}
                        </select>
                        <ChevronRight className="w-4 h-4 text-neutral-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                        Dietary / Accessibility Needs
                      </label>
                      <div className="relative">
                        <select
                          value={formData.dietaryRequirements}
                          onChange={(e) => updateField("dietaryRequirements", e.target.value)}
                          className="w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine transition-all appearance-none shadow-2xs cursor-pointer"
                        >
                          {["Standard / Halal", "Vegetarian", "No Dietary Restriction", "Wheelchair / Special Access"].map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        </select>
                        <ChevronRight className="w-4 h-4 text-neutral-400 rotate-90 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Special Expectations */}
                  <div className="space-y-2 pt-2 group">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider flex items-center">
                      What is your key expectation or goal for Summit 2.0?
                      <span className="text-navy/40 lowercase text-[11px] font-normal ml-1.5">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Seeking design agency mentorship, connecting with tech startup founders, or competing in the hackathon..."
                      value={formData.specialExpectations}
                      onChange={(e) => updateField("specialExpectations", e.target.value)}
                      className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-sand/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent text-sm font-medium text-pine placeholder:text-neutral-400 transition-all shadow-2xs resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-neutral-border gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-neutral-border text-xs font-semibold uppercase tracking-wider text-navy/80 hover:bg-neutral-sand transition-colors whitespace-nowrap"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap"
                    >
                      Review Registration
                      <ArrowRight className="w-4 h-4 ml-2 text-spring flex-shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM PASS */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-border pb-4">
                    <span className="text-xs font-bold text-spring uppercase tracking-wider">Step 4 of 4</span>
                    <h2 className="text-2xl font-bold text-pine mt-1">Review & Confirm Your Summit Pass</h2>
                    <p className="text-xs sm:text-sm text-navy/70 mt-1">
                      Please verify your information before generating your official Summit 2.0 digital pass.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-6 rounded-2xl bg-neutral-sand border border-neutral-border space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-border pb-3">
                      <span className="text-xs font-bold uppercase text-pine">Attendee Profile</span>
                      <span className="text-xs text-spring font-bold">Free Summit Pass</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-navy/80">
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Full Name</span>
                        <span className="font-bold text-pine text-sm">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Email</span>
                        <span className="font-semibold text-pine">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Discipline & Craft</span>
                        <span className="font-semibold text-pine">{formData.creativeRole}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Experience Level</span>
                        <span className="font-semibold text-pine">{formData.experienceLevel}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">WhatsApp Contact</span>
                        <span className="font-semibold text-pine">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Location</span>
                        <span className="font-semibold text-pine">{formData.cityState}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">Summit Date & Venue</span>
                        <span className="font-semibold text-pine">{eventConfig.date} • {eventConfig.venue}</span>
                      </div>
                      <div>
                        <span className="text-navy/50 block text-[10px] uppercase">T-Shirt Merch Size</span>
                        <span className="font-semibold text-pine">{formData.tshirtSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Code of Conduct */}
                  <div className="p-4 rounded-xl bg-spring/10 border border-spring/30 text-xs text-pine space-y-1">
                    <p className="font-bold">Summit Code of Conduct & Integrity</p>
                    <p className="text-navy/70 leading-relaxed">
                      By registering, you agree to adhere to the summit community guidelines, fair play in hackathon activities, and respectful collaboration across all venues.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-neutral-border gap-4">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-neutral-border text-xs font-semibold uppercase tracking-wider text-navy/80 hover:bg-neutral-sand transition-colors whitespace-nowrap"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFinalSubmit}
                      className="inline-flex items-center justify-center h-12 sm:h-14 px-8 rounded-full bg-spring text-navy text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#02b25b] hover:shadow-lg disabled:opacity-50 transition-all whitespace-nowrap shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin mr-2 flex-shrink-0" />
                          Generating Pass...
                        </>
                      ) : (
                        <>
                          Confirm &amp; Generate Digital Pass
                          <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
