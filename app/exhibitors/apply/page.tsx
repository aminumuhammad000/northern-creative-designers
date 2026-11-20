"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, ShoppingBag, CheckCircle, ArrowLeft, Send, Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { submitExhibitorApplicationAction } from "@/app/actions/onboarding";

const EXHIBITOR_CATEGORIES = [
  "Design Agency / Creative Studio",
  "Software, SaaS or Cloud Tool",
  "Hardware & Graphic Tablets",
  "Print & Packaging Enterprise",
  "Educational Academy / Creative Hub",
  "Other Creative Tech Enterprise",
];

const VENDOR_CATEGORIES = [
  "Graphic Apparel, Streetwear & Fashion",
  "Art Prints, Posters & Typography",
  "Handcrafted Goods & Cultural Artifacts",
  "Design Stationery, Books & Zines",
  "Food, Coffee & Specialty Refreshments",
  "Other Creative Retail / Merchandise",
];

export default function ExhibitorApplyPage() {
  const [registrationType, setRegistrationType] = useState<"exhibitor" | "vendor">("exhibitor");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    category: EXHIBITOR_CATEGORIES[0],
    description: "",
    specialRequirements: "",
  });

  const categories = registrationType === "vendor" ? VENDOR_CATEGORIES : EXHIBITOR_CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const payload = {
        ...formData,
        category: `[${registrationType === "vendor" ? "Vendor" : "Exhibitor"}] ${formData.category}`,
      };
      const res = await submitExhibitorApplicationAction(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || "Failed to submit application.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 pb-24 bg-white">
      <PageHeader
        tag="Marketplace & Showcase Registration"
        title="Exhibitor & Vendor Registration"
        description="Select whether you are showcasing creative studio work (Exhibitor) or retailing merchandise/products (Vendor) at the Summit Marketplace in Kano."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Exhibitors & Vendors", href: "/exhibitors" },
          { title: "Apply", href: "/exhibitors/apply" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-sand/60 border border-neutral-border text-center space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-spring/20 text-pine flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle className="w-8 h-8 text-spring" />
            </div>
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold bg-spring text-navy uppercase tracking-wider">
                Registration Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-pine">
                {registrationType === "vendor" ? "Vendor" : "Exhibitor"} Application Received!
              </h2>
              <p className="text-xs sm:text-sm text-navy/75 max-w-lg mx-auto leading-relaxed">
                Thank you for registering. The Northern Creative Designers Secretariat has recorded your profile as an official{" "}
                <strong className="text-pine font-bold">{registrationType === "vendor" ? "Marketplace Vendor" : "Showcase Exhibitor"}</strong>.
                A welcome confirmation email with your registration summary and booth roadmap has been dispatched to{" "}
                <span className="font-semibold text-pine">{formData.email}</span>.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard/exhibitor"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-all shadow-xs"
              >
                Go to Exhibitor & Vendor Portal
              </Link>
              <Link
                href="/exhibitors"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-neutral-border bg-white text-navy text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                Return to Overview
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-border space-y-8 shadow-xs"
          >
            {/* CARD SELECTOR: EXHIBITOR vs VENDOR */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Step 1: Choose Your Participation Role <span className="text-spring font-bold">*</span>
                </label>
                <span className="text-[11px] text-neutral-400 font-medium">Click a card below</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Exhibitor Card */}
                <div
                  onClick={() => {
                    setRegistrationType("exhibitor");
                    setFormData((prev) => ({
                      ...prev,
                      category: EXHIBITOR_CATEGORIES[0],
                    }));
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 text-left relative ${
                    registrationType === "exhibitor"
                      ? "border-spring bg-spring/10 shadow-sm ring-2 ring-spring/30"
                      : "border-neutral-border bg-neutral-sand/30 hover:border-spring/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        registrationType === "exhibitor"
                          ? "bg-pine text-spring shadow-xs"
                          : "bg-neutral-200/80 text-neutral-600"
                      }`}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        registrationType === "exhibitor"
                          ? "border-spring bg-spring text-navy"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {registrationType === "exhibitor" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-pine text-base">Exhibitor Showcase</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pine/10 text-pine uppercase">
                        Studio / Tech
                      </span>
                    </div>
                    <p className="text-xs text-navy/70 mt-1.5 leading-relaxed">
                      For Design Agencies, Creative Studios, Tech &amp; SaaS Tools, Cloud Software, and Media Studios showcasing craft and B2B services.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-pine">
                    <span className="w-1.5 h-1.5 rounded-full bg-spring" />
                    Includes Showcase Booth, Directory &amp; Lead Scanner
                  </div>
                </div>

                {/* Option 2: Vendor Card */}
                <div
                  onClick={() => {
                    setRegistrationType("vendor");
                    setFormData((prev) => ({
                      ...prev,
                      category: VENDOR_CATEGORIES[0],
                    }));
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 text-left relative ${
                    registrationType === "vendor"
                      ? "border-spring bg-spring/10 shadow-sm ring-2 ring-spring/30"
                      : "border-neutral-border bg-neutral-sand/30 hover:border-spring/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        registrationType === "vendor"
                          ? "bg-pine text-spring shadow-xs"
                          : "bg-neutral-200/80 text-neutral-600"
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        registrationType === "vendor"
                          ? "border-spring bg-spring text-navy"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {registrationType === "vendor" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-pine text-base">Vendor &amp; Retailer</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-spring/30 text-pine uppercase">
                        Marketplace
                      </span>
                    </div>
                    <p className="text-xs text-navy/70 mt-1.5 leading-relaxed">
                      For Graphic Apparel, Fashion, Art Prints, Craft &amp; Artifacts, Design Zines, Books, or Food &amp; Beverage stalls selling directly to delegates.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-pine">
                    <span className="w-1.5 h-1.5 rounded-full bg-spring" />
                    Includes Commercial Stall, Staff Badges &amp; POS Space
                  </div>
                </div>
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="border-t border-neutral-border pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-pine">
                  Step 2: {registrationType === "vendor" ? "Vendor Profile Details" : "Exhibitor Profile Details"}
                </h3>
                <span className="text-xs font-semibold text-pine bg-neutral-sand px-3 py-1 rounded-full border border-neutral-200">
                  Shared Portal Access
                </span>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Business / Brand Name <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={registrationType === "vendor" ? "e.g. Arewa Streetwear & Craft" : "e.g. Pixel Pulse Creative Studio"}
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Contact Person Name <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Aliyu or Usman Bello"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Contact Email Address <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@yourbusiness.com"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    WhatsApp / Phone Number <span className="text-spring font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Website or Social Portfolio Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourbrand or website"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    {registrationType === "vendor" ? "Vendor Category" : "Exhibitor Category"} <span className="text-spring font-bold">*</span>
                  </label>
                  <select
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs cursor-pointer"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  {registrationType === "vendor"
                    ? "Items / Products You Plan to Sell at the Summit"
                    : "Products, Tools or Creative Services You Plan to Showcase"}{" "}
                  <span className="text-spring font-bold">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    registrationType === "vendor"
                      ? "List the products, price ranges, and target audience for your retail booth..."
                      : "Describe your studio services, live demos, or tools you will display at your booth..."
                  }
                  className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Power, Equipment or Space Needs <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 220V power outlet, garment rack, extra monitor display stand..."
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                />
              </div>

              <div className="p-4 rounded-2xl bg-spring/10 border border-spring/30 text-xs text-pine space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-spring" />
                  Unified Exhibitor &amp; Vendor Management
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Both Exhibitors and Vendors share our dedicated Marketplace Portal dashboard featuring booth management, catalog items, staff accreditation passes, and real-time delegate lead capture.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-navy/60">
                  By submitting, you agree to comply with the Summit 2.0 Marketplace &amp; Exhibitor Guidelines.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-spring text-navy text-xs font-bold uppercase tracking-wider hover:bg-[#02b25b] hover:shadow-lg transition-all shadow-xs disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <span>Submit {registrationType === "vendor" ? "Vendor" : "Exhibitor"} Registration</span>
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
