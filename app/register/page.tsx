"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  Calendar,
  MapPin,
  ShieldCheck,
  Send,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { eventConfig } from "@/config/event";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    creativeRole: "Visual & Graphic Designer",
    experienceLevel: "Mid-Level (2-4 years)",
    cityState: "Kano",
    specialExpectations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate secure formatted registration code
    const generatedCode = `NCD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketRef(generatedCode);
    setSubmitted(true);
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Attendee Onboarding"
        title="Register to Attend Summit 2.0"
        description="Secure your access pass to the Northern Creative Designers Summit 2.0 on 19th December, 2026 in Kano."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-sand border-2 border-spring/50 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-spring" />
            </div>

            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-spring text-navy uppercase tracking-wider">
                Registration Confirmed
              </span>
              <h2 className="text-3xl font-bold text-pine">
                Welcome to Summit 2.0, {formData.fullName}!
              </h2>
              <p className="text-sm text-navy/75 max-w-lg mx-auto">
                Your seat has been reserved for Northern Creative Designers Summit 2.0 in Kano.
              </p>
            </div>

            {/* Generated Ticket Reference Card */}
            <div className="max-w-md mx-auto p-6 rounded-xl bg-white border border-neutral-border text-left space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-border pb-3">
                <span className="text-xs font-semibold text-navy/60">Registration Identifier</span>
                <span className="text-sm font-bold text-spring font-mono bg-pine px-2 py-0.5 rounded">
                  {ticketRef}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-navy/80">
                <div className="flex justify-between">
                  <span className="text-navy/60">Registered Name:</span>
                  <span className="font-semibold text-pine">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Confirmation Email:</span>
                  <span className="font-semibold text-pine">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Event Date:</span>
                  <span className="font-semibold text-pine">{eventConfig.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Venue Location:</span>
                  <span className="font-semibold text-pine">{eventConfig.venue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-border flex items-center gap-3 text-xs text-pine font-medium">
                <QrCode className="w-5 h-5 text-spring flex-shrink-0" />
                <span>
                  Your personalized digital QR pass will be delivered to your inbox ahead of check-in.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button href="/" variant="primary" size="md">
                Return to Homepage
              </Button>
              <Button href="/programme" variant="outline" size="md">
                Explore Event Programme
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-border space-y-8 shadow-sm"
          >
            <div className="border-b border-neutral-border pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-pine">
                  Delegate Information
                </h3>
                <p className="text-xs text-navy/70 mt-1">
                  Complete this form to reserve your summit credentials and badge.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pine/5 text-xs font-semibold text-pine">
                <Calendar className="w-3.5 h-3.5 text-spring" />
                <span>19th Dec 2026 • Kano</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aminu Bello"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Email Address (For QR Ticket Delivery) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="aminu@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Phone Number (WhatsApp Active) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0803 123 4567"
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Current City & State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kano, Kaduna, Abuja, etc."
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.cityState}
                  onChange={(e) =>
                    setFormData({ ...formData, cityState: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Primary Creative Discipline *
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.creativeRole}
                  onChange={(e) =>
                    setFormData({ ...formData, creativeRole: e.target.value })
                  }
                >
                  <option>Visual & Graphic Designer</option>
                  <option>Brand Identity Designer</option>
                  <option>Digital, UI/UX & Web Designer</option>
                  <option>Industrial & Product Designer</option>
                  <option>Motion, Animation & Media Designer</option>
                  <option>Illustrator & Digital Artist</option>
                  <option>Fashion & Apparel Designer</option>
                  <option>Founder, Agency Head or Business Owner</option>
                  <option>Design Student or Enthusiast</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider">
                  Experience Level *
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, experienceLevel: e.target.value })
                  }
                >
                  <option>Emerging Creator (&lt; 2 years)</option>
                  <option>Mid-Level Practitioner (2-4 years)</option>
                  <option>Senior Designer / Art Director (5+ years)</option>
                  <option>Agency Founder / Business Executive</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pine uppercase tracking-wider">
                What are you most excited to learn or achieve at Summit 2.0? (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Masterclass on AI vectors, connecting with paying clients at the Client Connect Corner, meeting peers..."
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-border bg-neutral-sand/50 text-sm focus:bg-white focus:border-spring transition-colors"
                value={formData.specialExpectations}
                onChange={(e) =>
                  setFormData({ ...formData, specialExpectations: e.target.value })
                }
              />
            </div>

            <div className="pt-4 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-navy/60">
                <ShieldCheck className="w-4 h-4 text-spring flex-shrink-0" />
                <span>Protected by Northern Creative Designers Privacy Charter</span>
              </div>
              <Button type="submit" variant="primary" size="lg" icon={<Send className="w-4 h-4" />}>
                Complete Registration
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
