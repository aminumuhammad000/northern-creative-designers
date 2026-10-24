"use client";

import React, { useState } from "react";
import {
  Store,
  CheckCircle,
  Users,
  Plus,
  Trash2,
  ScanLine,
  Mail,
  FileSpreadsheet,
  PackageCheck,
  Check,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

type TabId = "booth" | "products" | "staff" | "leads";

interface StaffPass {
  id: string;
  name: string;
  phone: string;
  role: string;
  ticketRef: string;
}

interface CapturedLead {
  id: string;
  name: string;
  email: string;
  role: string;
  notes: string;
  scannedAt: string;
}

export default function ExhibitorDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("booth");
  const [scanInput, setScanInput] = useState("");
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);

  const [staffList, setStaffList] = useState<StaffPass[]>([
    {
      id: "st-1",
      name: "Kabir Sanusi",
      phone: "0803 123 4567",
      role: "Lead Specialist",
      ticketRef: "NCD26-EXH-1201",
    },
    {
      id: "st-2",
      name: "Hauwa Mustapha",
      phone: "0802 987 6543",
      role: "Booth Coordinator",
      ticketRef: "NCD26-EXH-1202",
    },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", phone: "", role: "" });
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const [products, setProducts] = useState([
    {
      id: "prod-1",
      title: "Handcrafted Arewa Graphic Apparel",
      category: "Merchandise",
      price: "₦8,500 - ₦15,000",
      status: "In Stock",
    },
    {
      id: "prod-2",
      title: "Northern Geometric Art Prints (Framed)",
      category: "Art Prints",
      price: "₦12,000 - ₦25,000",
      status: "Display",
    },
    {
      id: "prod-3",
      title: "Design Studio Consultation Voucher",
      category: "Services",
      price: "Complimentary Audit",
      status: "Active",
    },
  ]);

  const [capturedLeads, setCapturedLeads] = useState<CapturedLead[]>([
    {
      id: "lead-1",
      name: "Amina Bello",
      email: "amina.bello@example.com",
      role: "UI/UX Designer",
      notes: "Interested in custom vector illustration kit for agency client.",
      scannedAt: "10:15 AM",
    },
    {
      id: "lead-2",
      name: "Ibrahim Mustapha",
      email: "ibrahim.m@creativelab.ng",
      role: "Brand Strategist",
      notes: "Looking to partner on physical exhibition print runs.",
      scannedAt: "11:42 AM",
    },
  ]);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const newLead: CapturedLead = {
      id: `lead-${Date.now()}`,
      name: scanInput.includes("@") ? scanInput.split("@")[0] : scanInput,
      email: scanInput.includes("@") ? scanInput : `${scanInput.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      role: "Summit Attendee",
      notes: "Scanned at Booth #M-12 during summit networking hours.",
      scannedAt: "Just now",
    };

    setCapturedLeads([newLead, ...capturedLeads]);
    setScanSuccess(`Lead captured: ${newLead.name}`);
    setScanInput("");
    setTimeout(() => setScanSuccess(null), 3000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone) return;

    if (staffList.length >= 3) {
      alert("Exhibitor booth pass limit reached (3 staff badges maximum).");
      return;
    }

    const created: StaffPass = {
      id: `st-${Date.now()}`,
      name: newStaff.name,
      phone: newStaff.phone,
      role: newStaff.role || "Booth Specialist",
      ticketRef: `NCD26-EXH-${Math.floor(1200 + Math.random() * 99)}`,
    };

    setStaffList([...staffList, created]);
    setNewStaff({ name: "", phone: "", role: "" });
    setIsAddingStaff(false);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role,Notes,ScannedAt"]
        .concat(
          capturedLeads.map(
            (l) => `"${l.name}","${l.email}","${l.role}","${l.notes}","${l.scannedAt}"`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NCD_Summit_Booth_M12_Leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      {/* Universal Clean Dashboard Navigation */}
      <DashboardNav
        userRole="exhibitor"
        userName="Arewa Creative Studio"
        badgeLabel="Booth #M-12"
      />

      {/* Sub-Nav Tabs Bar with Recognizable Micro-Badges */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: "booth", label: "Booth Specs & Setup", micro: "Booth #M-12", icon: Store },
              { id: "products", label: `Showcase Items`, micro: `${products.length} Products`, icon: PackageCheck },
              { id: "staff", label: `Staff Passes`, micro: `${staffList.length}/3 Active`, icon: Users },
              { id: "leads", label: `Lead Scanner`, micro: "Live QR", icon: ScanLine },
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
        {/* ================= TAB 1: BOOTH SPECS ================= */}
        {activeTab === "booth" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
              <div>
                <h1 className="text-xl font-bold text-pine tracking-tight">
                  Arewa Creative Studio &amp; Apparel
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Category: Graphic Merch &amp; Art • Assigned Space: Booth #M-12
                </p>
              </div>

              <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Booth Approved &amp; Reserved
              </span>
            </div>

            {/* Quick Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Location</span>
                <p className="font-bold text-pine text-base mt-0.5">Booth #M-12</p>
                <span className="text-[11px] text-neutral-500">Ground Floor</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Setup Time</span>
                <p className="font-bold text-pine text-base mt-0.5">Fri, 4:00 PM</p>
                <span className="text-[11px] text-neutral-500">18th Dec 2026</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Wi-Fi</span>
                <p className="font-bold text-pine text-base mt-0.5">NCD-Market</p>
                <span className="text-[11px] text-neutral-500 font-mono">Summit2026Pass</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Power Supply</span>
                <p className="font-bold text-pine text-base mt-0.5">13A Dual Socket</p>
                <span className="text-[11px] text-neutral-500">Continuous Feed</span>
              </div>
            </div>

            {/* Equipment & Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-3">
                <h2 className="text-sm font-bold text-pine">Provided Booth Equipment</h2>
                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <Check className="w-3.5 h-3.5 text-pine flex-shrink-0" />
                    <span>1 Standard 6ft Display Table with Black Drape</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <Check className="w-3.5 h-3.5 text-pine flex-shrink-0" />
                    <span>2 Exhibitor Chairs</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <Check className="w-3.5 h-3.5 text-pine flex-shrink-0" />
                    <span>Printed Studio Fascia Signboard</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-3">
                <h2 className="text-sm font-bold text-pine">Marketplace Timetable</h2>
                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="flex justify-between p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span>Exhibitor Load-In:</span>
                    <span className="font-mono text-neutral-700">Fri, Dec 18 • 4:00 PM</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span>Floor Opens:</span>
                    <span className="font-mono text-neutral-700">Sat, Dec 19 • 8:30 AM</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span>Peak Hours:</span>
                    <span className="font-mono text-pine font-semibold">1:00 PM – 2:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-pine">Showcase Products &amp; Merchandise</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Items on display for direct sales and delegate inquiries.
                </p>
              </div>

              <button
                onClick={() => {
                  const title = prompt("Enter product / service title:");
                  if (!title) return;
                  const price = prompt("Enter price or description:", "₦10,000");
                  setProducts([
                    ...products,
                    {
                      id: `prod-${Date.now()}`,
                      title,
                      category: "Display Item",
                      price: price || "Custom",
                      status: "Added",
                    },
                  ]);
                }}
                className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-pine text-white text-xs font-semibold hover:bg-pine-light transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {p.category}
                    </span>
                    <h3 className="text-sm font-semibold text-pine mt-2">{p.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{p.price}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-medium">{p.status}</span>
                    <button
                      onClick={() => setProducts(products.filter((item) => item.id !== p.id))}
                      className="text-neutral-400 hover:text-red-500 p-1 rounded hover:bg-neutral-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: STAFF PASSES ================= */}
        {activeTab === "staff" && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-pine">Exhibitor Staff Badges ({staffList.length}/3)</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Allocated badges for your team members on the floor.
                </p>
              </div>

              {staffList.length < 3 && (
                <button
                  onClick={() => setIsAddingStaff(true)}
                  className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-pine text-white text-xs font-semibold hover:bg-pine-light transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  Add Staff Pass
                </button>
              )}
            </div>

            {isAddingStaff && (
              <form onSubmit={handleAddStaff} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <h3 className="text-xs font-bold text-pine">Register Booth Staff</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-pine uppercase tracking-wider block">Role</label>
                    <input
                      type="text"
                      placeholder="Role"
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingStaff(false)}
                    className="h-9 px-3 text-xs font-medium text-neutral-500 hover:text-neutral-800 inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-4 rounded-lg bg-pine text-white text-xs font-semibold inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Save Pass
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-neutral-100">
              {staffList.map((st) => (
                <div key={st.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-pine">{st.name}</h4>
                      <span className="font-mono text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                        {st.ticketRef}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">{st.role} • {st.phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Staff QR Ticket sent via WhatsApp to ${st.phone}`)}
                      className="h-8 px-3 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 inline-flex items-center justify-center whitespace-nowrap"
                    >
                      Send Pass
                    </button>
                    <button
                      onClick={() => setStaffList(staffList.filter((item) => item.id !== st.id))}
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

        {/* ================= TAB 4: LEADS SCANNER ================= */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-pine">Attendee Lead Scanner</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Scan badge QR codes or enter reference codes to collect contacts on the floor.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors whitespace-nowrap"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-neutral-500 flex-shrink-0" />
                Export CSV ({capturedLeads.length})
              </button>
            </div>

            <form onSubmit={handleSimulateScan} className="flex gap-2">
              <div className="relative flex-1">
                <ScanLine className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter name, email, or badge reference (e.g. NCD26-KN-9482)"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap inline-flex items-center justify-center"
              >
                Capture Lead
              </button>
            </form>

            {scanSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {scanSuccess}
              </div>
            )}

            <div className="divide-y divide-neutral-100">
              {capturedLeads.map((l) => (
                <div key={l.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-pine">{l.name}</h4>
                      <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {l.role}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-0.5">{l.notes}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{l.email} • {l.scannedAt}</p>
                  </div>

                  <a
                    href={`mailto:${l.email}`}
                    className="self-start sm:self-center h-8 px-3 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 inline-flex items-center justify-center whitespace-nowrap gap-1"
                  >
                    <Mail className="w-3 h-3 text-neutral-400" />
                    Email
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
