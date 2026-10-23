import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Notice & Data Protection",
  description: "Northern Creative Designers Summit 2.0 privacy notice and data governance policy.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Governance & Compliance"
        title="Privacy Notice"
        description="How Northern Creative Designers processes attendee, exhibitor, and partner information in compliance with Nigerian Data Protection principles."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 prose prose-slate text-navy/85 space-y-8 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">1. Scope and Organisation</h2>
          <p>
            Northern Creative Designers (RC: {siteConfig.organization.rcNumber}) operates the Summit digital platform. This privacy notice explains how we collect, store, and protect delegate and participant data for Northern Creative Designers Summit 2.0.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">2. Information We Collect</h2>
          <p>We collect only information necessary for summit operations, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Full Name and Professional Creative Discipline</li>
            <li>Contact Information (Email Address and Phone Number)</li>
            <li>City and State of Residence for logistical metrics</li>
            <li>Exhibitor and Hackathon project portfolio links</li>
          </ul>
          <p>We do not store plain-text payment card details or unencrypted passwords.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">3. Technology Infrastructure</h2>
          <p>
            Platform digital services, authentication, and database persistence are hosted on enterprise cloud infrastructure. All data transfers utilize encrypted TLS/HTTPS protocols. Service-role credentials and private keys remain strictly server-side.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">4. Ticket Tokens & QR Code Security</h2>
          <p>
            In accordance with security best practices, attendee QR-code passes contain opaque, cryptographic, unguessable reference tokens rather than raw personal details. Verification occurs strictly on the server against authorised check-in databases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">5. Contact Information</h2>
          <p>
            For data inquiries, access requests, or corrections, contact our privacy desk at{" "}
            <a href={`mailto:${siteConfig.organization.email}`} className="text-pine font-semibold hover:underline">
              {siteConfig.organization.email}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
