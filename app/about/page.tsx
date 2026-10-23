import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  Compass,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { eventConfig, coreObjectives } from "@/config/event";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About the Summit & Organisation",
  description:
    "Learn about Northern Creative Designers, our mission, vision, and the cultural philosophy powering Summit 2.0: Roots & Vectors.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pb-20">
      <PageHeader
        title="About Northern Creative Designers"
        description="A structured ecosystem dedicated to the advancement, skill acquisition, and global connectivity of creative professionals across Northern Nigeria."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Organisation Overview & RC */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-pine leading-tight">
              A Premier Catalyst for Northern Nigeria&apos;s Creative Economy
            </h2>
            <p className="text-navy/80 text-base leading-relaxed">
              The Northern Creatives Designers Community is an initiative focused on
              the advancement and connectivity of design professionals within Northern
              Nigeria. We provide a structured environment for networking, knowledge
              acquisition, and career advancement.
            </p>
            <p className="text-navy/80 text-base leading-relaxed">
              Our activities encompass the curation of development resources, the
              organization of skill-enhancing workshops, the provision of constructive
              critique mechanisms, and the dissemination of professional opportunities.
              By fostering collaboration and facilitating access to vital resources, we
              are committed to strengthening the design landscape across Arewa.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-pine/5 text-pine text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-spring" />
                <span>Registered Entity (RC: {siteConfig.organization.rcNumber})</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-pine/5 text-pine text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-spring" />
                <span>Founded in Kano, Serving Northern Nigeria</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-neutral-sand border border-neutral-border p-8 space-y-6">
              <div className="w-14 h-14 rounded-xl bg-pine p-2 flex items-center justify-center">
                <Image
                  src="/images/logos/symbol.png"
                  alt="NCD Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-pine">Contact Executive Desk</h3>
                <p className="text-xs text-navy/70 mt-1">
                  Direct inquiries regarding community participation or executive partnerships:
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-navy/80">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-spring flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.organization.email}`}
                    className="hover:underline font-medium"
                  >
                    {siteConfig.organization.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-spring flex-shrink-0" />
                  <span>{siteConfig.organization.phones.join(" • ")}</span>
                </div>
              </div>

              <Button href="/contact" variant="primary" size="sm" className="w-full">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-pine text-white space-y-4">
            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              To be the premier catalyst for a thriving, globally competitive design
              industry in Northern Nigeria, where local talent is recognized as a
              cornerstone of regional innovation and economic development.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border text-navy space-y-4">
            <h3 className="text-2xl font-bold text-pine">Our Vision</h3>
            <p className="text-navy/80 text-sm sm:text-base leading-relaxed">
              To empower Northern Nigerian design professionals by providing a
              structured ecosystem for skill acquisition, collaborative networking, and
              career growth. We are committed to bridging the resource gap and
              fostering an inclusive community where creativity meets professional
              excellence.
            </p>
          </div>
        </section>

        {/* 4 Pillars in Detail */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-pine mt-1">
              Four Beliefs Behind Everything We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreObjectives.map((obj) => (
              <div
                key={obj.id}
                className="p-6 rounded-xl bg-white border border-neutral-border flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-pine text-spring flex items-center justify-center flex-shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-pine text-base mb-1">{obj.title}</h4>
                  <p className="text-sm text-navy/75 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration CTA Banner */}
        <section className="p-8 sm:p-12 rounded-2xl bg-pine text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Join Northern Nigeria&apos;s Creative Journey
            </h3>
            <p className="text-sm text-white/80">
              Registrations for Summit 2.0 in Kano are actively ongoing.
            </p>
          </div>
          <Button href="/register" variant="primary" size="lg" className="flex-shrink-0">
            Register to Attend
          </Button>
        </section>
      </div>
    </main>
  );
}
