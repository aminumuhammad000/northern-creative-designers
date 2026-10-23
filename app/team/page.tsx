import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ShieldCheck, Mail, Phone, Users, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Organising Team & Executive Committee",
  description:
    "Meet the leadership behind Northern Creative Designers and the organisers of Summit 2.0.",
};

export default function TeamPage() {
  const committeeCommittees = [
    {
      title: "Executive Leadership & Governance",
      role: "Strategic Direction, Partnerships & Institutional Alignment",
      description:
        "Responsible for overall summit governance, institutional partnerships across Northern Nigeria, and community standards.",
    },
    {
      title: "Programme & Curriculum Committee",
      role: "Session Curation, Keynotes & Masterclass Direction",
      description:
        "Ensures every keynote, panel, and workshop adheres to our core principle: practical, actionable learning over conventional talk shows.",
    },
    {
      title: "Hackathon & Competition Operations",
      role: "Challenge Architecture, Mentorship & Judging Coordination",
      description:
        "Oversees the Northern Design Hackathon 2.0, track briefs, scoring rubrics, and fair stage execution.",
    },
    {
      title: "Technology & Platform Operations",
      role: "Digital Infrastructure & Systems Management",
      description:
        "Oversees cloud web operations, attendee database records, QR ticketing validation, and live voting platform execution.",
    },
    {
      title: "Exhibition & Creative Showcase Team",
      role: "Marketplace Logistics & Design Exhibition Wall",
      description:
        "Curates physical booth spaces, regional art installations, and vendor partnerships for the summit floor.",
    },
    {
      title: "Community & Attendee Experience",
      role: "Hospitality, Volunteer Coordination & Logistics",
      description:
        "Coordinates smooth on-site check-in, attendee kits, catering, and networking mixers in Kano.",
    },
  ];

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Leadership & Operations"
        title="Organising Team & Executive Committee"
        description="The dedicated practitioners and coordinators driving Northern Creative Designers and delivering Summit 2.0."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Governance Overview */}
        <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-pine/5 text-pine text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-spring" />
              <span>Registered Entity: RC {siteConfig.organization.rcNumber}</span>
            </div>
            <h2 className="text-2xl font-bold text-pine">
              The Northern Creative Designers Executive Committee
            </h2>
            <p className="text-sm text-navy/75 leading-relaxed">
              Founded to empower Northern Nigerian creatives through structured ecosystems,
              sustainable monetization, and regional community pride.
            </p>
          </div>

          <div className="text-xs text-navy/80 space-y-2 p-4 rounded-xl bg-white border border-neutral-border min-w-[260px]">
            <p className="font-semibold text-pine">Official Secretariat</p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-spring" />
              <a href={`mailto:${siteConfig.organization.email}`} className="hover:underline">
                {siteConfig.organization.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-spring" />
              <span>{siteConfig.organization.phones.join(" • ")}</span>
            </p>
          </div>
        </div>

        {/* Committee Functional Structure */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-pine mt-1">
              Summit 2.0 Working Committees
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeCommittees.map((comm, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-spring uppercase tracking-wider">
                    Desk 0{idx + 1}
                  </span>
                  <h4 className="font-bold text-pine text-lg mt-1 mb-1">
                    {comm.title}
                  </h4>
                  <p className="text-xs font-semibold text-tangerine mb-3">
                    {comm.role}
                  </p>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                    {comm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer & Community Callout */}
        <section className="p-8 rounded-2xl bg-pine text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-xl font-bold text-white">
              Join the Summit 2.0 Operational Team
            </h4>
            <p className="text-xs text-white/70">
              Passionate about community development, stage logistics, or attendee hospitality? Join our volunteer corps in Kano.
            </p>
          </div>

          <Button
            href="/contact?subject=volunteer-enquiry"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Volunteer with Us
          </Button>
        </section>
      </div>
    </main>
  );
}
