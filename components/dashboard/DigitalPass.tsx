"use client";

import React, { useState } from "react";
import {
  QrCode,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { eventConfig } from "@/config/event";

interface DigitalPassProps {
  attendee: {
    name: string;
    email: string;
    role: string;
    experience?: string;
    organization?: string;
    cityState: string;
    referenceCode: string;
    ticketToken: string;
    tshirtSize?: string;
    dietary?: string;
    passType?: "DELEGATE" | "VIP" | "SPEAKER" | "EXHIBITOR";
    avatarUrl?: string;
  };
}

export function DigitalPass({ attendee }: DigitalPassProps) {
  const [copied, setCopied] = useState(false);

  const copyReference = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(attendee.referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const initials = attendee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden">
      {/* Top Summit Brand Bar */}
      <div className="bg-pine text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-spring text-xs">
            N
          </div>
          <div>
            <h3 className="font-bold text-xs text-white leading-tight">
              NCD Summit 2.0
            </h3>
            <p className="text-[10px] text-white/70">Roots &amp; Vectors</p>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider bg-spring text-pine px-2.5 py-1 rounded-full">
          {attendee.passType || "Delegate"}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Attendee Image & Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-pine/10 text-pine flex items-center justify-center font-bold text-xl border-2 border-spring/40 flex-shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-pine leading-tight truncate">
              {attendee.name}
            </h2>
            <p className="text-xs font-semibold text-neutral-700 truncate mt-0.5">
              {attendee.role}
            </p>
            <p className="text-[11px] text-neutral-500 truncate mt-0.5">
              {attendee.organization ? `${attendee.organization} • ` : ""}
              {attendee.cityState}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/80 flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs">
            <QrCode className="w-32 h-32 sm:w-36 sm:h-36 text-pine" strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-1.5 w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-pine">
                {attendee.referenceCode}
              </span>
              <button
                type="button"
                onClick={copyReference}
                title="Copy Pass Reference Code"
                className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-pine transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-pine" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium">
              Present this QR code or Pass ID at the entrance for fast check-in
            </p>
          </div>
        </div>

        {/* Essential Summit Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-0.5">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
              Date &amp; Time
            </span>
            <span className="font-semibold text-neutral-800 block">
              Dec 19, 2026
            </span>
            <span className="text-[11px] text-neutral-500 block">
              08:30 AM Doors
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-0.5">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
              Venue
            </span>
            <span className="font-semibold text-neutral-800 block truncate">
              {eventConfig.venue}
            </span>
            <span className="text-[11px] text-neutral-500 block">
              Kano, Nigeria
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
          <button
            type="button"
            onClick={copyReference}
            className="flex-1 h-10 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-pine" />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Copy Pass Code</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 h-10 px-4 rounded-xl bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-spring" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
