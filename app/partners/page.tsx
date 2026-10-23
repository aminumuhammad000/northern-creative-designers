import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PartnersSection } from "@/components/sections/PartnersSection";

export const metadata: Metadata = {
  title: "Partners & Sponsors — Northern Creative Designers Summit 2.0",
  description:
    "Partner with Northern Creative Designers Summit 2.0. Explore our sponsorship tiers, lead software partnership with Amee Technology Ltd, and customized in-kind opportunities.",
};

export default function PartnersPage() {
  return (
    <main className="flex-1 pb-16">
      <PageHeader
        tag="Ecosystem Alignment"
        title="Partners & Sponsors"
        description="Co-invest in the future of Northern Nigeria's creative economy. Connect your brand with 500+ design leaders, developers, and tech innovators."
      />
      <PartnersSection showHeader={false} />
    </main>
  );
}
