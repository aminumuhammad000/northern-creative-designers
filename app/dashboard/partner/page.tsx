"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Upload,
  Users,
  Download,
  Award,
  Plus,
  Trash2,
  Receipt,
  Check,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

type TabId = "overview" | "assets" | "delegates" | "billing";

interface VipDelegate {
  id: string;
  name: string;
  email: string;
  title: string;
  ticketRef: string;
}

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [assetSubmitted, setAssetSubmitted] = useState(false);
  const [logoFile] = useState<string>("amee_technology_vector_logo.svg");
  const [brandBio, setBrandBio] = useState(
    "Amee Technology Ltd is the Official Software Engineering Partner for NCD Summit 2.0, pioneering digital infrastructure and modern product design across Northern Nigeria."
  );

  const [delegates, setDelegates] = useState<VipDelegate[]>([
    {
      id: "del-1",
      name: "Engr. Farouk Al-Hassan",
      email: "farouk@ameetech.com",
      title: "Chief Executive Officer",
      ticketRef: "NCD26-VIP-9001",
    },
    {
      id: "del-2",
      name: "Amina Yusuf",
      email: "amina.y@ameetech.com",
      title: "VP of Product Engineering",
      ticketRef: "NCD26-VIP-9002",
    },
    {
      id: "del-3",
      name: "Dr. Bashir Bello",
      email: "bashir.b@ameetech.com",
      title: "Director of Technical Growth",
      ticketRef: "NCD26-VIP-9003",
    },
  ]);

  const [newDelegate, setNewDelegate] = useState({ name: "", email: "", title: "" });
  const [isAddingDelegate, setIsAddingDelegate] = useState(false);

  const handleAddDelegate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDelegate.name || !newDelegate.email) return;

    if (delegates.length >= 5) {
      alert("Platinum Sponsor pass allocation limit reached (5 VIP Passes).");
      return;
    }

    const created: VipDelegate = {
      id: `del-${Date.now()}`,
      name: newDelegate.name,
      email: newDelegate.email,
      title: newDelegate.title || "Executive Delegate",
      ticketRef: `NCD26-VIP-${Math.floor(9000 + Math.random() * 999)}`,
    };

    setDelegates([...delegates, created]);
    setNewDelegate({ name: "", email: "", title: "" });
    setIsAddingDelegate(false);
  };

  const handleRemoveDelegate = (id: string) => {
    setDelegates(delegates.filter((d) => d.id !== id));
  };

  const handleSaveAssets = (e: React.FormEvent) => {
    e.preventDefault();
    setAssetSubmitted(true);
    setTimeout(() => setAssetSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      {/* Universal Clean Dashboard Navigation */}
      <DashboardNav
        userRole="partner"
        userName="Amee Technology Ltd"
        badgeLabel="Platinum Sponsor"
      />

      {/* Sub-Nav Tabs Bar with Recognizable Micro-Badges */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: "overview", label: "Sponsorship & Deliverables", micro: "Milestones", icon: Award },
              { id: "assets", label: "Brand Assets & Media", micro: "Logo & Bio", icon: Upload },
              { id: "delegates", label: `VIP Passes`, micro: `${delegates.length}/5 Used`, icon: Users },
              { id: "billing", label: "Invoicing & Agreement", micro: "Paid in Full", icon: Receipt },
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
        {/* ================= TAB 1: OVERVIEW & DELIVERABLES ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
              <div>
                <h1 className="text-xl font-bold text-pine tracking-tight">
                  Amee Technology Ltd — Sponsor Portal
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Tier: Platinum Sponsor • ₦1,000,000 • Official Software &amp; Engineering Partner
                </p>
              </div>

              <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Deliverables 80% Confirmed
              </span>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Assigned Booth</span>
                <p className="font-bold text-pine text-base mt-0.5">Pavilion P-01</p>
                <span className="text-[11px] text-neutral-500">Marketplace Hall</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Executive Panel</span>
                <p className="font-bold text-pine text-base mt-0.5">10:45 AM</p>
                <span className="text-[11px] text-neutral-500">Main Stage</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">VIP Passes</span>
                <p className="font-bold text-pine text-base mt-0.5">{delegates.length} of 5</p>
                <span className="text-[11px] text-neutral-500">Allocated</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Brand Reach</span>
                <p className="font-bold text-pine text-base mt-0.5">1,200+</p>
                <span className="text-[11px] text-neutral-500">Creators &amp; Leads</span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-pine">Sponsorship Deliverables Status</h2>

              <div className="divide-y divide-neutral-100">
                {[
                  {
                    title: "Stage Backdrop & Entrance Arch Branding",
                    desc: "Official logo placement on stage backdrop, entrance banners, and lanyards.",
                    status: "Approved",
                    done: true,
                  },
                  {
                    title: "Speaking Opportunity on Main Panel",
                    desc: "20-minute executive slot: 'Bridging Indigenous Storytelling with Cutting-Edge Modern Craft'.",
                    status: "Confirmed (Speaker: Engr. Farouk)",
                    done: true,
                  },
                  {
                    title: "Prime Marketplace Exhibition Space (P-01)",
                    desc: "Double booth with drape cloth, 2 standard tables, power, and Wi-Fi.",
                    status: "Reserved",
                    done: true,
                  },
                  {
                    title: "Full-Page Profile in Printed Summit Catalogue",
                    desc: "Company feature and editorial in 1,000 physical delegate brochures.",
                    status: "Submitted",
                    done: true,
                  },
                  {
                    title: "Promotional Video Screen Reel",
                    desc: "60-second promo played on auditorium screens during conference breaks.",
                    status: "Pending Link",
                    done: false,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-pine">{item.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            item.done
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{item.desc}</p>
                    </div>

                    <div className="self-start sm:self-center">
                      {item.done ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveTab("assets")}
                          className="px-3 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-700 transition-colors"
                        >
                          Submit Link
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ASSETS & MEDIA ================= */}
        {activeTab === "assets" && (
          <div className="max-w-2xl bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h2 className="text-lg font-bold text-pine">Brand Assets &amp; Catalogue Profile</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Submit files for print brochures and main auditorium screen playback.
              </p>
            </div>

            {assetSubmitted && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Assets saved and forwarded to summit print committee.
              </div>
            )}

            <form onSubmit={handleSaveAssets} className="space-y-5 text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-neutral-700 block">
                  Vector Logo File (.SVG or high-res PNG)
                </label>
                <div className="p-5 border border-dashed border-neutral-300 rounded-xl bg-neutral-50 text-center space-y-1 cursor-pointer hover:bg-neutral-100 transition-colors">
                  <Upload className="w-5 h-5 text-neutral-400 mx-auto" />
                  <p className="text-xs font-semibold text-pine">
                    Current: <span className="font-mono text-neutral-600">{logoFile}</span>
                  </p>
                  <p className="text-[11px] text-neutral-400">Click to replace file</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-neutral-700 block">
                  Catalogue Profile Summary (100 words max)
                </label>
                <textarea
                  rows={3}
                  value={brandBio}
                  onChange={(e) => setBrandBio(e.target.value)}
                  className="w-full p-3 rounded-lg border border-neutral-200 bg-white text-xs text-pine focus:outline-none focus:ring-1 focus:ring-pine resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-neutral-700 block">
                  Promo Video Reel Link (YouTube / Vimeo / Drive)
                </label>
                <input
                  type="url"
                  defaultValue="https://youtube.com/watch?v=ameetech-summit-promo"
                  className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs inline-flex items-center justify-center whitespace-nowrap"
                >
                  Save Brand Assets
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 3: VIP PASSES ================= */}
        {activeTab === "delegates" && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-pine">Corporate VIP Delegate Passes</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  5 VIP passes included with your Platinum tier sponsorship.
                </p>
              </div>

              {delegates.length < 5 && (
                <button
                  onClick={() => setIsAddingDelegate(true)}
                  className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-pine text-white text-xs font-semibold hover:bg-pine-light transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  Assign Pass
                </button>
              )}
            </div>

            {isAddingDelegate && (
              <form onSubmit={handleAddDelegate} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <h3 className="text-xs font-bold text-pine">Assign New VIP Delegate</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={newDelegate.name}
                      onChange={(e) => setNewDelegate({ ...newDelegate, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={newDelegate.email}
                      onChange={(e) => setNewDelegate({ ...newDelegate, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Title</label>
                    <input
                      type="text"
                      placeholder="Role / Title"
                      value={newDelegate.title}
                      onChange={(e) => setNewDelegate({ ...newDelegate, title: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingDelegate(false)}
                    className="h-9 px-3 text-xs font-medium text-neutral-500 hover:text-neutral-800 inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-4 rounded-lg bg-pine text-white text-xs font-semibold inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Issue Pass
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-neutral-100">
              {delegates.map((del) => (
                <div key={del.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-pine">{del.name}</h4>
                      <span className="font-mono text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                        {del.ticketRef}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">{del.title} • {del.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`VIP Ticket dispatched to ${del.email}`)}
                      className="h-8 px-3 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 inline-flex items-center justify-center whitespace-nowrap"
                    >
                      Resend Ticket
                    </button>
                    <button
                      onClick={() => handleRemoveDelegate(del.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: BILLING & AGREEMENT ================= */}
        {activeTab === "billing" && (
          <div className="max-w-2xl bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-pine">Sponsorship Settlement</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Banking confirmation and sponsorship agreement.</p>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Paid in Full
              </span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block">Invoice Ref</span>
                  <p className="font-mono font-semibold text-pine">INV-NCD26-PL-001</p>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block">Amount</span>
                  <p className="font-semibold text-pine">₦1,000,000.00</p>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block">Bank</span>
                  <p className="font-semibold text-neutral-700">KUDA MFB</p>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block">Date</span>
                  <p className="font-semibold text-neutral-700">20 Oct 2026</p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5 text-spring flex-shrink-0" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
