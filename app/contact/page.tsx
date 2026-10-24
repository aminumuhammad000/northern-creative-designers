"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Secretariat Desk"
        title="Contact & Enquiries"
        description="Reach out to the Northern Creative Designers Executive Committee regarding Summit 2.0."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-pine text-white space-y-6">
              <div>
                <span className="text-spring text-xs font-bold uppercase tracking-wider">
                  Direct Channels
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Official Secretariat
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Our committee responds promptly to attendee queries, speaker proposals,
                  exhibitor submissions, and institutional partnership agreements.
                </p>
              </div>

              <div className="space-y-4 pt-2 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-spring" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Official Email</p>
                    <a
                      href={`mailto:${siteConfig.organization.email}`}
                      className="font-semibold text-white hover:text-spring transition-colors"
                    >
                      {siteConfig.organization.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-spring" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Telephone / WhatsApp</p>
                    <p className="font-semibold text-white">
                      {siteConfig.organization.phones.join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-spring" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Summit Venue City</p>
                    <p className="font-semibold text-white">Kano, Northern Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 text-xs text-white/60">
                Registered Entity: RC {siteConfig.organization.rcNumber}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-neutral-sand border border-neutral-border text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-spring" />
                </div>
                <h3 className="text-2xl font-bold text-pine">
                  Message Dispatched Successfully
                </h3>
                <p className="text-sm text-navy/75 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-pine">{formData.name}</span>.
                  Your message regarding &quot;{formData.subject}&quot; has been logged with the secretariat.
                  We will reply to <span className="font-semibold text-pine">{formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <Button href="/" variant="primary" size="md">
                    Return to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-border space-y-6 shadow-xs"
              >
                <div className="border-b border-neutral-border pb-4">
                  <h3 className="text-xl font-bold text-pine">Send a Message</h3>
                  <p className="text-xs text-navy/70 mt-1">
                    Fill out the form below and an executive coordinator will respond within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Your Name <span className="text-spring font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sani Bello"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Your Email <span className="text-spring font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sani@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="0803 000 0000"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                      Subject / Purpose <span className="text-spring font-bold">*</span>
                    </label>
                    <select
                      className="w-full h-12 px-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs cursor-pointer"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option>General Inquiry</option>
                      <option>Speaker / Workshop Proposal</option>
                      <option>Sponsorship & Partnership</option>
                      <option>Exhibition Booth Inquiry</option>
                      <option>Hackathon Question</option>
                      <option>Media & Press Accreditation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                    Message Details <span className="text-spring font-bold">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details regarding your inquiry..."
                    className="w-full p-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all shadow-2xs resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md" icon={<Send className="w-4 h-4 ml-1.5" />}>
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
