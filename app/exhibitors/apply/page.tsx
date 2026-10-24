"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function ExhibitorApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    category: "Design Agency / Studio",
    description: "",
    specialRequirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Applications Open"
        title="Apply for an Exhibition Booth"
        description="Submit your studio or business profile for booth allocation at the Summit Marketplace in Kano."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Exhibitors", href: "/exhibitors" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-sand border border-neutral-border text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-spring" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-pine">
                Exhibitor Application Received
              </h2>
              <p className="text-sm text-navy/75 max-w-lg mx-auto">
                Thank you for applying. The Northern Creative Designers Executive Committee
                reviews all vendor profiles to preserve quality standards. Our secretariat will
                contact <span className="font-semibold text-pine">{formData.email}</span> within
                3 business days with booth specifications and onboarding terms.
              </p>
            </div>
            <div className="pt-4">
              <Button href="/exhibitors" variant="primary" size="md">
                Return to Exhibitor Overview
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-border space-y-8 shadow-sm"
          >
            <div className="border-b border-neutral-border pb-4">
              <h3 className="text-xl font-bold text-pine">
                Exhibitor & Vendor Application Form
              </h3>
              <p className="text-xs text-navy/70 mt-1">
                Please complete all fields. Private financial or contact data will not be shared publicly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Organisation / Business Name <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arewa Creative Studios"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Contact Person Full Name <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Aliyu"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Official Email Address <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@yourbrand.com"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Phone Number (WhatsApp Preferred) <span className="text-spring font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 000 0000"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Website or Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://yourbrand.com"
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Exhibitor Category <span className="text-spring font-bold">*</span>
                </label>
                <select
                  className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Design Agency / Studio</option>
                  <option>Software, SaaS or Cloud Tool</option>
                  <option>Hardware & Graphic Tablets</option>
                  <option>Print & Packaging Vendor</option>
                  <option>Educational Academy / Hub</option>
                  <option>Other Creative Enterprise</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                Brief Description of Products or Services to Showcase <span className="text-spring font-bold">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you plan to exhibit at your booth and your primary audience focus..."
                className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                Special Technical or Electrical Requirements (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Additional 220V power outlets, extra monitor stand..."
                className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                value={formData.specialRequirements}
                onChange={(e) =>
                  setFormData({ ...formData, specialRequirements: e.target.value })
                }
              />
            </div>

            <div className="pt-4 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-navy/60">
                By submitting, you agree to comply with the Summit 2.0 Exhibitor Code of Conduct.
              </p>
              <Button type="submit" variant="primary" size="lg" icon={<Send className="w-4 h-4 ml-2" />}>
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
