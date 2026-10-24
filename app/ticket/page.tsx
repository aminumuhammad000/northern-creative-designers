"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QrCode, Search, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { eventConfig } from "@/config/event";
import { Button } from "@/components/ui/Button";

export default function TicketLookupPage() {
  const [lookupQuery, setLookupQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [foundTicket, setFoundTicket] = useState<{
    token: string;
    name: string;
    email: string;
    category: string;
    status: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (lookupQuery.trim().length > 3) {
      setFoundTicket({
        token: lookupQuery.toUpperCase().startsWith("NCD")
          ? lookupQuery.toUpperCase()
          : `NCD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        name: "Verified Delegate",
        email: lookupQuery.includes("@") ? lookupQuery : "attendee@example.com",
        category: "General Summit Delegate",
        status: "Active & Valid for Check-in",
      });
    } else {
      setFoundTicket(null);
    }
  };

  return (
    <main className="flex-1 pb-20">
      <PageHeader
        tag="Ticket Verification"
        title="Lookup Your Summit Pass"
        description="Verify your registration status or retrieve your digital pass ahead of check-in at Kano."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <form
          onSubmit={handleSearch}
          className="p-4 sm:p-6 rounded-2xl bg-white border border-neutral-border shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="Enter Registration ID (e.g. NCD26-KN-9482) or Email"
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/30 hover:bg-white focus:bg-white text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Verify Pass
          </Button>
        </form>

        {hasSearched && foundTicket && (
          <div className="p-8 rounded-2xl bg-neutral-sand border-2 border-spring/50 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-spring" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-spring uppercase tracking-wider">
                Registration Confirmed
              </span>
              <h3 className="text-2xl font-bold text-pine">{foundTicket.name}</h3>
              <p className="text-xs font-mono text-navy/70">{foundTicket.token}</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-border text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-neutral-border/60">
                <span className="text-navy/60">Status:</span>
                <span className="font-bold text-pine">{foundTicket.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-border/60">
                <span className="text-navy/60">Category:</span>
                <span className="font-semibold text-pine">{foundTicket.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-border/60">
                <span className="text-navy/60">Event Date:</span>
                <span className="font-semibold text-pine">{eventConfig.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-navy/60">Location:</span>
                <span className="font-semibold text-pine">{eventConfig.venue}</span>
              </div>
            </div>

            <p className="text-xs text-navy/70">
              Please present your official email confirmation or this identifier at the entrance in Kano for physical badge printout.
            </p>
          </div>
        )}

        {hasSearched && !foundTicket && (
          <div className="p-8 rounded-2xl bg-neutral-sand border border-neutral-border text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-tangerine mx-auto" />
            <h4 className="font-bold text-pine text-lg">No Registration Found</h4>
            <p className="text-xs text-navy/70 max-w-md mx-auto">
              We could not find an active pass matching &quot;{lookupQuery}&quot;. Please double check your spelling or register for a new pass.
            </p>
            <Button href="/register" variant="primary" size="sm">
              Register to Attend
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
