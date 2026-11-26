"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowLeft, ArrowRight, Send, Sparkles, User, Mail, Phone, MapPin, Briefcase, Globe, Layers } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { registerHackathonAction } from "@/app/actions/onboarding";
import { loginHackathonParticipantAction } from "@/app/actions/hackathon-dashboard";

export default function HackathonRegisterPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showReturningForm, setShowReturningForm] = useState(false);
  const [returningEmail, setReturningEmail] = useState("");
  const [returningPhone, setReturningPhone] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [returningError, setReturningError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    category: "Brand identity",
    portfolioUrl: "",
  });

  const handleReturningAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setReturningError("");
    setIsLoggingIn(true);
    try {
      const res = await loginHackathonParticipantAction(returningEmail, returningPhone);
      if (res.success) {
        router.push("/dashboard/hackathon");
      } else {
        setReturningError(res.error || "Could not find your hackathon registration.");
      }
    } catch {
      setReturningError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email?.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!formData.phone?.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    if (!formData.gender) {
      setErrorMessage("Please select your gender.");
      return;
    }
    if (!formData.city?.trim()) {
      setErrorMessage("Please enter your location/city.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const res = await registerHackathonAction(formData);
      if (res.success) {
        if ("alreadyRegistered" in res && res.alreadyRegistered) {
          router.push("/dashboard/hackathon");
          return;
        }
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || "Failed to submit hackathon registration.");
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Stage 1: Registration"
        title="Individual Registration"
        description="Register as an individual designer for the 2-Hour Live Design Sprint at the Summit in Kano."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
          { title: "Individual Registration", href: "/hackathon/register" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#F6FFF8] border border-neutral-border text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-spring" />
            </div>
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-pine/10 text-pine text-xs font-bold uppercase tracking-wider">
                {formData.category} Track
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-pine tracking-tight">
                Hackathon Registration Submitted!
              </h2>
              <p className="text-sm text-navy/75 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-pine">{formData.name}</span>. Your individual registration for Hackathon 2.0 has been successfully recorded. A confirmation receipt has been dispatched to{" "}
                <span className="font-semibold text-pine">{formData.email}</span>. Shortlisted finalists will receive the live sprint briefs and setup guide ahead of summit day in Kano.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/dashboard/hackathon" variant="primary" size="md">
                Access Hackathon Dashboard &rarr;
              </Button>
              <Link
                href="/hackathon"
                className="px-5 py-2.5 rounded-full border border-neutral-border bg-white text-navy text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                Hackathon Overview
              </Link>
              <Link
                href="/voting-rules"
                className="px-5 py-2.5 rounded-full border border-neutral-border bg-white text-navy text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                View Voting Rules
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Returning Contestant Access Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F6FFF8] border border-pine/20 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-pine">
                    Already registered for Hackathon 2.0?
                  </p>
                  <p className="text-xs text-navy/70">
                    Enter your registered email and phone number to access your existing contestant dashboard.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowReturningForm(!showReturningForm);
                    setReturningError("");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-pine text-white hover:bg-pine-light text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0 cursor-pointer"
                >
                  <span>{showReturningForm ? "Hide Login" : "Access Existing Dashboard"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {showReturningForm && (
                <form
                  onSubmit={handleReturningAccess}
                  className="pt-4 border-t border-pine/15 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-pine uppercase tracking-wider mb-1">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={returningEmail}
                      onChange={(e) => setReturningEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-border bg-white text-xs text-navy focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-pine uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08012345678"
                      value={returningPhone}
                      onChange={(e) => setReturningPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-border bg-white text-xs text-navy focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="h-10 px-5 rounded-xl bg-spring hover:bg-spring/90 text-navy font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isLoggingIn ? "Verifying..." : "Open Dashboard →"}
                  </button>
                  {returningError && (
                    <p className="sm:col-span-3 text-xs font-medium text-red-600">
                      {returningError}
                    </p>
                  )}
                </form>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-border space-y-8 shadow-sm"
            >
            {/* Form Header */}
            <div className="border-b border-neutral-border pb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-spring/20 text-[#063B18] text-[11px] font-mono font-bold uppercase tracking-wider">
                  Individual Sprint
                </span>
              </div>
              <h3 className="text-2xl font-black text-pine tracking-tight">
                Individual Registration
              </h3>
              <p className="text-xs sm:text-sm text-navy/70 mt-1">
                The Northern Design Hackathon 2.0 is an individual competition. Complete the details below to apply for the live stage sprint.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Name <span className="text-spring font-bold">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ibrahim Umar"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Organization (optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Organization <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                  </label>
                </div>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio, Freelance, or University"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Email <span className="text-spring font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. ibrahim@example.com"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Phone number (WhatsApp preferable) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Phone number <span className="text-neutral-500 font-normal normal-case">(WhatsApp preferable)</span> <span className="text-spring font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Gender & Location (city) Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Gender <span className="text-spring font-bold">*</span>
                  </label>
                  <select
                    required
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs cursor-pointer"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Location (city) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Location (city) <span className="text-spring font-bold">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kano, Kaduna, Abuja..."
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Category - Brand identity or UI/UX */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Category <span className="text-spring font-bold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.category === "Brand identity"
                        ? "border-[#00CB67] bg-[#F6FFF8] shadow-xs"
                        : "border-neutral-border bg-neutral-sand/20 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value="Brand identity"
                      checked={formData.category === "Brand identity"}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="mt-1 text-spring focus:ring-spring"
                    />
                    <div>
                      <p className="font-bold text-sm text-pine">Brand identity</p>
                      <p className="text-xs text-navy/65 mt-0.5">
                        Logo systems, visual identities, typography &amp; cultural brand assets.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.category === "UI/UX"
                        ? "border-[#00CB67] bg-[#F6FFF8] shadow-xs"
                        : "border-neutral-border bg-neutral-sand/20 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value="UI/UX"
                      checked={formData.category === "UI/UX"}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="mt-1 text-spring focus:ring-spring"
                    />
                    <div>
                      <p className="font-bold text-sm text-pine">UI/UX</p>
                      <p className="text-xs text-navy/65 mt-0.5">
                        User interfaces, wireframes, product prototypes &amp; interaction design.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Portfolio <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="url"
                    placeholder="https://behance.net/username, Figma, Dribbble, or Drive link"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                    value={formData.portfolioUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolioUrl: e.target.value })
                    }
                  />
                </div>
                <p className="text-[11px] text-navy/60">
                  Optional: Provide a link to your design portfolio, Behance, or Figma profile.
                </p>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-5 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-navy/60 text-center sm:text-left">
                On-site presence required at Kano summit venue on 19th December, 2026.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-fit inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] text-xs sm:text-sm font-black tracking-wider uppercase shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Registration"}</span>
                <Send className="w-3.5 h-3.5 ml-2 flex-shrink-0" />
              </button>
            </div>
          </form>
          </div>
        )}
      </div>
    </main>
  );
}
