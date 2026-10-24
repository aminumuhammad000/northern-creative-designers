"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  QrCode,
  ShieldCheck,
  Printer,
  Share2,
  RotateCw,
  Download,
  Wifi,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
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
  };
}

export function DigitalPass({ attendee }: DigitalPassProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const copyToken = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(attendee.ticketToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Pass for ${attendee.name} (${attendee.referenceCode}) prepared for download.`);
    }, 800);
  };

  const passType = attendee.passType || "DELEGATE";

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-spring animate-pulse" />
          <span className="text-xs font-bold text-pine uppercase tracking-wider">
            Verified Digital Credential
          </span>
          <span className="text-neutral-300 hidden sm:inline">•</span>
          <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
            {attendee.referenceCode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors whitespace-nowrap"
          >
            <RotateCw className="w-3.5 h-3.5 mr-1.5 text-neutral-600 flex-shrink-0" />
            <span>{isFlipped ? "View Front" : "Flip Badge"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-neutral-600 flex-shrink-0" />
            <span className="hidden xs:inline">Print Badge</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-pine text-white text-xs font-semibold hover:bg-pine-light transition-colors shadow-2xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-spring flex-shrink-0" />
            <span>{downloading ? "Preparing..." : "Save Image"}</span>
          </button>
        </div>
      </div>

      {/* Real Badge Container (Realistic 3.5" x 5.5" Lanyard Format) */}
      <div className="flex justify-center py-2">
        <div
          className={`relative w-full max-w-[390px] transition-transform duration-700 [perspective:1200px] select-none`}
        >
          {/* Card wrapper with 3D Flip */}
          <div
            className={`relative w-full rounded-[28px] transition-all duration-700 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* ================================================================= */}
            {/* FRONT OF BADGE                                                    */}
            {/* ================================================================= */}
            <div
              className={`w-full bg-white rounded-[28px] border-2 border-neutral-200/90 shadow-[0_16px_40px_-12px_rgba(1,56,17,0.18)] overflow-hidden relative [backface-visibility:hidden]`}
            >
              {/* Lanyard Slot Punch */}
              <div className="pt-3 pb-2 flex justify-center bg-neutral-50/80 border-b border-neutral-100">
                <div className="w-14 h-2.5 rounded-full bg-neutral-200 border border-neutral-300 shadow-inner flex items-center justify-center">
                  <div className="w-12 h-1 rounded-full bg-neutral-300/80" />
                </div>
              </div>

              {/* Holographic Top Security Foil Strip */}
              <div className="h-2 w-full bg-gradient-to-r from-pine via-spring to-emerald-700" />

              {/* Summit Header Area */}
              <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-pine flex items-center justify-center text-spring font-bold text-sm shadow-xs">
                    N
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-pine tracking-tight leading-tight">
                      NCD Summit 2.0
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-medium">
                      Roots &amp; Vectors • Kano, Nigeria
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[11px] font-bold text-pine bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200 block">
                    {attendee.referenceCode}
                  </span>
                </div>
              </div>

              {/* Attendee Identity Section */}
              <div className="px-6 py-6 text-center space-y-3">
                {/* Photo / Avatar with Security Ring */}
                <div className="relative inline-block mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-100 border-2 border-pine/20 p-1 flex items-center justify-center shadow-xs mx-auto overflow-hidden">
                    <div className="w-full h-full rounded-xl bg-pine text-spring font-cabinet font-extrabold text-2xl flex items-center justify-center">
                      {attendee.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-spring fill-pine" />
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h2 className="text-xl font-cabinet font-extrabold text-pine tracking-tight">
                    {attendee.name}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-700 mt-0.5">
                    {attendee.role}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {attendee.organization || "Independent Creative"} • {attendee.cityState}
                  </p>
                </div>
              </div>

              {/* Category Ribbon */}
              <div className="bg-pine text-white py-2 px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-spring" />
                  <span className="text-xs font-cabinet font-black uppercase tracking-widest text-white">
                    {passType}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-spring">
                  All Access Pass
                </span>
              </div>

              {/* Security Matrix, QR & Barcode */}
              <div className="p-6 bg-neutral-50/50 space-y-4">
                <div className="flex items-center justify-between gap-4 p-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block">
                      SECURITY ENCRYPTED TOKEN
                    </span>
                    <p className="font-mono text-[11px] font-semibold text-pine tracking-wider">
                      {attendee.ticketToken.substring(0, 20)}...
                    </p>
                    <span className="text-[10px] text-neutral-500 block">
                      Gate Entry: <strong className="text-pine font-semibold">Auditorium Main Gate</strong>
                    </span>
                  </div>

                  <div className="p-1.5 bg-white rounded-lg border border-neutral-200 flex-shrink-0 shadow-2xs">
                    <QrCode className="w-14 h-14 text-pine" />
                  </div>
                </div>

                {/* Realistic Linear Barcode */}
                <div className="text-center space-y-1 pt-1">
                  <div className="h-8 flex items-center justify-center gap-[2.5px] px-4 opacity-85">
                    {/* Simulated High-Density Barcode Lines */}
                    {[
                      2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3,
                      1, 4, 2, 1, 3, 2, 4, 1, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3,
                      2, 1, 4, 1, 3, 2, 4, 1, 2, 3,
                    ].map((w, idx) => (
                      <span
                        key={idx}
                        className={`h-full bg-neutral-800 rounded-2xs inline-block`}
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-neutral-400 tracking-widest block">
                    * {attendee.referenceCode} *
                  </span>
                </div>
              </div>

              {/* Microfooter Strip */}
              <div className="px-6 py-2.5 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-500 font-medium">
                <span>Saturday, Dec 19, 2026</span>
                <span>Kano, Nigeria</span>
              </div>
            </div>

            {/* ================================================================= */}
            {/* BACK OF BADGE (LOGISTICS & EMERGENCY INFO)                       */}
            {/* ================================================================= */}
            <div
              className={`w-full bg-white rounded-[28px] border-2 border-neutral-200/90 shadow-[0_16px_40px_-12px_rgba(1,56,17,0.18)] overflow-hidden absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between`}
            >
              {/* Lanyard Slot Punch */}
              <div className="pt-3 pb-2 flex justify-center bg-neutral-50/80 border-b border-neutral-100">
                <div className="w-14 h-2.5 rounded-full bg-neutral-200 border border-neutral-300 shadow-inner flex items-center justify-center">
                  <div className="w-12 h-1 rounded-full bg-neutral-300/80" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-5 text-xs text-neutral-700 flex-1">
                <div className="border-b border-neutral-100 pb-3">
                  <h4 className="font-bold text-pine text-sm uppercase tracking-wider">
                    Delegate Event Guidelines
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Essential on-ground access credentials &amp; contacts
                  </p>
                </div>

                {/* Wi-Fi Details */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-pine text-xs">
                    <Wifi className="w-4 h-4 text-pine" />
                    <span>Summit High-Speed Wi-Fi</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
                    <div>
                      <span className="text-neutral-400 block">Network:</span>
                      <span className="font-mono font-semibold text-neutral-800">NCD-Delegates-5G</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Password:</span>
                      <span className="font-mono font-semibold text-pine">RootsVectors2026</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Milestones */}
                <div className="space-y-2">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-neutral-400 block">
                    Important Timings
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span>Doors &amp; Check-in Open:</span>
                      <strong className="text-pine font-mono">08:30 AM</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span>Keynote Address:</span>
                      <strong className="text-pine font-mono">09:30 AM</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span>Live Design Hackathon:</span>
                      <strong className="text-pine font-mono">12:00 PM</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Summit Awards &amp; Networking:</span>
                      <strong className="text-pine font-mono">04:30 PM</strong>
                    </div>
                  </div>
                </div>

                {/* Secretarial Help Desk */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1 text-[11px]">
                  <span className="font-bold text-pine block">Secretariat Emergency Line</span>
                  <p className="text-neutral-600">
                    Kano Venue Help Desk / Medical / Logistics:
                  </p>
                  <span className="font-mono font-bold text-pine block pt-0.5">
                    +234 703 005 8919 • +234 803 357 3842
                  </span>
                </div>
              </div>

              {/* Microfooter Back */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="inline-flex items-center text-xs font-semibold text-pine hover:text-spring transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                  Flip to Badge Front
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Action Cards */}
      <div className="max-w-[390px] mx-auto grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => alert("Added to Apple Wallet.")}
          className="h-11 px-3 rounded-xl bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-2xs whitespace-nowrap"
        >
          <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.77-12-14.19-6.32-9.46-11.41-20.08-15.27-31.85-3.86-11.78-5.79-22.95-5.79-33.53 0-14.14 3.58-25.75 10.74-34.83 7.16-9.08 16.03-13.75 26.6-14.01 4.79 0 10.3 1.34 16.54 4.02 6.24 2.68 10.01 4.07 11.31 4.17 1.11 0 4.96-1.37 11.55-4.11 6.59-2.74 12.08-3.99 16.47-3.75 13.32.74 23.75 5.74 31.3 15.01-11.58 7.02-17.25 16.63-17 28.84.25 9.77 4.08 17.82 11.5 24.16 7.42 6.33 16.14 10.05 26.15 11.16-2.07 6.31-4.75 12.64-8.03 18.99zM119.22 33.64c0-7.39 2.66-14.24 7.97-20.55 5.31-6.31 11.83-10.46 19.57-12.45.22 1.11.33 2.11.33 3 0 7.39-2.81 14.47-8.43 21.23-5.62 6.76-12.28 10.73-19.98 11.91-.46-1.01-.7-2.06-.7-3.14z" />
          </svg>
          <span>Apple Wallet</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Added to Google Wallet.")}
          className="h-11 px-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors shadow-2xs whitespace-nowrap"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google Wallet</span>
        </button>
      </div>
    </div>
  );
}
