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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Organisation / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arewa Creative Studios"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Contact Person Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Aliyu"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@yourbrand.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Phone Number (WhatsApp Preferred) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 000 0000"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Website or Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://yourbrand.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Exhibitor Category *
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
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
              <label className="text-xs font-bold text-pine uppercase tracking-wider">
                Brief Description of Products or Services to Showcase *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you plan to exhibit at your booth and your primary audience focus..."
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider">
                Special Technical or Electrical Requirements (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Additional 220V power outlets, extra monitor stand..."
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
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
              <Button type="submit" variant="primary" size="lg" icon={<Send className="w-4 h-4" />}>
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
