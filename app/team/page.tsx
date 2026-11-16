import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Mail, Phone, ArrowRight, Crown, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { sectionLeads, otherTeamMembers } from "@/content/team";
import { TeamAvatar } from "@/components/ui/TeamAvatar";

export const metadata: Metadata = {
  title: "Summit Team & Leadership",
  description:
    "Meet the leads and committee members driving Northern Creative Designers Summit 2.0.",
};

export default function TeamPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Leadership & Operations"
        title="Summit 2.0 Team"
        description="The dedicated leads and practitioners directing Northern Creative Designers Summit 2.0."
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

        {/* Section Leads */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-pine text-spring">
              <Crown className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-pine">
                Summit Leads
              </h3>
              <p className="text-xs text-navy/60">
                Core leadership directing operations and project delivery
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionLeads.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-white border border-neutral-border hover:border-pine/30 shadow-sm flex items-center gap-4"
              >
                <TeamAvatar
                  name={member.name}
                  image={member.image}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-pine truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-tangerine truncate mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Other Team Members */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-pine/10 text-pine">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-pine">
                Team Members
              </h3>
              <p className="text-xs text-navy/60">
                Operational specialists and coordinators supporting execution
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTeamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-xl bg-white border border-neutral-border hover:border-spring/50 shadow-sm flex items-center gap-3.5"
              >
                <TeamAvatar
                  name={member.name}
                  image={member.image}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-pine text-sm truncate">
                    {member.name}
                  </h5>
                  <p className="text-xs text-navy/70 truncate mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteer Callout */}
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
