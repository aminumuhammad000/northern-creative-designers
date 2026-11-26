"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
  Send,
  Check,
  CreditCard,
  Upload,
  FileText,
  Copy,
  AlertCircle,
  Loader2,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  submitExhibitorApplicationAction,
  uploadPaymentProofAction,
} from "@/app/actions/onboarding";

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
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Form State
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

  // Payment Proof State
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [paymentProofName, setPaymentProofName] = useState("");
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [proofError, setProofError] = useState("");

  const enrollmentFee = registrationType === "vendor" ? "₦25,000" : "₦30,000";
  const categories = registrationType === "vendor" ? VENDOR_CATEGORIES : EXHIBITOR_CATEGORIES;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("3004513846");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProofError("");
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      setProofError("File size exceeds 10MB limit. Please choose a smaller file.");
      return;
    }

    // Generate local preview
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPaymentProofPreview(base64);
      setPaymentProofName(file.name);
      setIsUploadingProof(true);

      try {
        const uploadRes = await uploadPaymentProofAction(base64, file.name);
        if (uploadRes.success && uploadRes.url) {
          setPaymentProofUrl(uploadRes.url);
        } else {
          // If server upload failed, fallback to local base64 so registration is not blocked
          setPaymentProofUrl(base64);
        }
      } catch {
        setPaymentProofUrl(base64);
      } finally {
        setIsUploadingProof(false);
      }
    };
    reader.onerror = () => {
      setProofError("Failed to read selected file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProof = () => {
    setPaymentProofUrl("");
    setPaymentProofName("");
    setPaymentProofPreview(null);
    setProofError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!paymentProofUrl && !paymentProofPreview) {
      setErrorMessage("Please upload your bank transfer payment proof before submitting.");
      const proofElement = document.getElementById("payment-proof-section");
      if (proofElement) {
        proofElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        category: `[${registrationType === "vendor" ? "Vendor" : "Exhibitor"}] ${formData.category}`,
        enrollmentFee,
        paymentProofUrl: paymentProofUrl || paymentProofPreview || undefined,
        paymentProofFileName: paymentProofName || "receipt.png",
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
                <strong className="text-pine font-bold">
                  {registrationType === "vendor" ? "Marketplace Vendor" : "Showcase Exhibitor"}
                </strong>{" "}
                with an enrollment fee of <strong className="text-pine font-bold">{enrollmentFee}</strong>.
                Your payment receipt is under administrative verification. A confirmation email with your booth roadmap has been dispatched to{" "}
                <span className="font-semibold text-pine">{formData.email}</span>.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard/exhibitor"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-all shadow-xs"
              >
                Go to Exhibitor &amp; Vendor Portal
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
                <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                  Step 1: Choose Your Participation Role <span className="text-spring font-semibold">*</span>
                </label>
                <span className="text-[11px] text-neutral-400 font-medium">Click a card below</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Exhibitor Card */}
                <div
                  onClick={() => {
                    setRegistrationType("exhibitor");
                    setFormData((prev) => ({
                      ...prev,
                      category: EXHIBITOR_CATEGORIES[0],
                    }));
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-2.5 text-left relative ${
                    registrationType === "exhibitor"
                      ? "border-spring bg-spring/10 shadow-xs ring-1 ring-spring/30"
                      : "border-neutral-border bg-neutral-sand/30 hover:border-spring/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        registrationType === "exhibitor"
                          ? "bg-pine text-spring shadow-xs"
                          : "bg-neutral-200/80 text-neutral-600"
                      }`}
                    >
                      <Store className="w-4 h-4" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        registrationType === "exhibitor"
                          ? "border-spring bg-spring text-navy"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {registrationType === "exhibitor" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <h4 className="font-bold text-pine text-sm sm:text-base">Exhibitor Showcase</h4>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-extrabold text-pine block leading-tight">₦30,000</span>
                      <span className="text-[9px] font-semibold text-navy/60 uppercase tracking-wider block">
                        Enrollment Fee
                      </span>
                    </div>
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
                  className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-2.5 text-left relative ${
                    registrationType === "vendor"
                      ? "border-spring bg-spring/10 shadow-xs ring-1 ring-spring/30"
                      : "border-neutral-border bg-neutral-sand/30 hover:border-spring/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        registrationType === "vendor"
                          ? "bg-pine text-spring shadow-xs"
                          : "bg-neutral-200/80 text-neutral-600"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        registrationType === "vendor"
                          ? "border-spring bg-spring text-navy"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {registrationType === "vendor" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <h4 className="font-bold text-pine text-sm sm:text-base">Vendor &amp; Retailer</h4>
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-extrabold text-pine block leading-tight">₦25,000</span>
                      <span className="text-[9px] font-semibold text-navy/60 uppercase tracking-wider block">
                        Enrollment Fee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: PROFILE DETAILS */}
            <div className="border-t border-neutral-border pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-pine">
                  Step 2: {registrationType === "vendor" ? "Vendor Profile Details" : "Exhibitor Profile Details"}
                </h3>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                    Business / Brand Name <span className="text-spring font-semibold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      registrationType === "vendor"
                        ? "e.g. Arewa Streetwear & Craft"
                        : "e.g. Pixel Pulse Creative Studio"
                    }
                    className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-spring focus:border-transparent transition-all shadow-2xs"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                    Contact Person Name <span className="text-spring font-semibold">*</span>
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
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                    Contact Email Address <span className="text-spring font-semibold">*</span>
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
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                    WhatsApp / Phone Number <span className="text-spring font-semibold">*</span>
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
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
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
                  <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                    {registrationType === "vendor" ? "Vendor Category" : "Exhibitor Category"}{" "}
                    <span className="text-spring font-semibold">*</span>
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
                <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                  {registrationType === "vendor"
                    ? "Items / Products You Plan to Sell at the Summit"
                    : "Products, Tools or Creative Services You Plan to Showcase"}{" "}
                  <span className="text-spring font-semibold">*</span>
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
                <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
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
            </div>

            {/* STEP 3: PAYMENT INSTRUCTIONS & PROOF UPLOAD */}
            <div id="payment-proof-section" className="border-t border-neutral-border pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-pine flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-spring" />
                    Step 3: Enrollment Fee &amp; Payment Proof
                  </h3>
                  <p className="text-xs text-navy/70 mt-0.5">
                    Transfer the enrollment fee to the Summit official account, then attach your receipt below.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-navy/50 uppercase tracking-wider block">Fee Amount</span>
                  <span className="text-lg font-black text-pine">{enrollmentFee}</span>
                </div>
              </div>

              {/* Official Bank Account Details Card */}
              <div className="p-5 rounded-2xl bg-neutral-sand/50 border border-neutral-200/80 space-y-4">
                <div className="border-b border-neutral-200/60 pb-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 block">
                    Designated Payment Account
                  </span>
                  <h4 className="text-sm font-bold text-pine">Northern Creative Designers Summit 2.0</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-neutral-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Bank Name
                    </span>
                    <p className="text-sm font-bold text-pine mt-0.5">KUDA MFB</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Account Number
                      </span>
                      <p className="text-sm font-mono font-bold text-pine mt-0.5">3004513846</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-pine text-[11px] font-semibold transition-colors"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3 h-3 text-spring" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-neutral-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Account Name
                    </span>
                    <p className="text-sm font-bold text-pine mt-0.5 truncate">Northern Creative Designers</p>
                  </div>
                </div>
              </div>

              {/* Upload Proof Input Area */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-pine/80 uppercase tracking-wider block">
                  Upload Proof of Payment (Screenshot or Receipt) <span className="text-spring font-semibold">*</span>
                </label>

                {proofError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{proofError}</span>
                  </div>
                )}

                {paymentProofPreview ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {paymentProofPreview.startsWith("data:image") ? (
                        <img
                          src={paymentProofPreview}
                          alt="Payment Receipt Preview"
                          className="w-14 h-14 object-cover rounded-xl border border-emerald-300 shadow-2xs"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <FileText className="w-7 h-7" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-emerald-900">{paymentProofName || "Payment Receipt"}</span>
                          {isUploadingProof ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                              <Loader2 className="w-2.5 h-2.5 animate-spin" />
                              Uploading...
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                              Attached
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-emerald-700 mt-0.5">
                          {isUploadingProof
                            ? "Optimizing and securing payment voucher..."
                            : "Voucher ready to submit with your application."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-semibold transition-colors">
                        Replace File
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveProof}
                        className="p-1.5 rounded-lg text-emerald-600 hover:text-red-600 hover:bg-white transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-neutral-300 hover:border-spring rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-neutral-sand/20 hover:bg-spring/5 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 group-hover:bg-spring/20 text-neutral-500 group-hover:text-pine flex items-center justify-center transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-pine">
                        Click or drag &amp; drop to upload payment receipt
                      </p>
                      <p className="text-[11px] text-navy/60">
                        Supports PNG, JPG, JPEG, WEBP or PDF (max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      required
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-border flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingProof}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-spring text-navy text-xs font-bold uppercase tracking-wider hover:bg-[#02b25b] hover:shadow-lg transition-all shadow-xs disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <span>
                        Submit {registrationType === "vendor" ? "Vendor" : "Exhibitor"} Registration ({enrollmentFee})
                      </span>
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
