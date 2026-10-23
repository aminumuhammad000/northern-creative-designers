import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Participation",
  description: "Terms and conditions for delegates, exhibitors, and participants at Northern Creative Designers Summit 2.0.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Legal & Policies"
        title="Terms of Participation"
        description="Conditions governing attendee registrations, exhibition booths, and hackathon participation at Summit 2.0."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-navy/85 space-y-8 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">1. Registration and Admittance</h2>
          <p>
            Registration grants admission to the physical Summit 2.0 event on 19th December, 2026 in Kano, Nigeria. Each attendee must present a valid digital QR pass or approved booking confirmation at check-in. Passes are personal to the registrant and duplicate transfers without notification are prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">2. Code of Conduct</h2>
          <p>
            Northern Creative Designers maintains an inclusive, safe, and professional environment. Harassment, discrimination, or abusive behaviour toward attendees, staff, volunteers, or partners will result in immediate removal without refund or recourse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">3. Intellectual Property</h2>
          <p>
            Participants and hackathon teams retain full ownership of their original creative assets, codebases, and brand designs created prior to or during the summit. By submitting work to public exhibitions or stage pitches, participants grant Northern Creative Designers permission to document and feature the work in regional event recaps and promotional archives.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-pine">4. Programme Adjustments</h2>
          <p>
            The Executive Committee reserves the right to modify schedule times, keynote presentation sequence, or venue floor arrangements as necessary to ensure a smooth, secure summit experience.
          </p>
        </section>
      </div>
    </main>
  );
}
