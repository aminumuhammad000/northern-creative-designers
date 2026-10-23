import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { eventConfig } from "@/config/event";

export function RegistrationCTASection() {
  return (
    <section className="w-full py-20 md:py-32 bg-[#FAFAF8] relative overflow-hidden border-b border-neutral-border">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-spring/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="w-full rounded-[3rem] bg-pine text-white p-8 sm:p-16 md:p-20 border border-spring/30 shadow-2xl text-center space-y-10 relative overflow-hidden">
          {/* Subtle Arewa motif watermark inside card */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none select-none">
            <Image
              src="/images/pdf_extracted/arewa_motif_pattern.png"
              alt=""
              width={736}
              height={845}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Chowdeck-Style Giant Call-To-Action Heading */}
          <div className="space-y-5 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.02]">
              Join the Movement Shaping Arewa Design.
            </h2>
            <p className="text-white/85 text-base sm:text-xl md:text-2xl leading-relaxed font-normal">
              Connect with fellow practitioners, master cutting-edge workflows, and showcase your creative vision at the region&apos;s definitive summit.
            </p>
          </div>

          {/* Date & Location Pill matching PDF Cover */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-8 py-3 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-bold tracking-wide">
            <div className="flex items-center gap-2">
              <span className="text-spring font-mono">Date:</span>
              <span>{eventConfig.date}</span>
            </div>
            <span className="text-white/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-tangerine font-mono">Venue:</span>
              <span>{eventConfig.venue}</span>
            </div>
          </div>

          {/* QR Code & Digital Pass Feature (Chowdeck Badge) */}
          <div className="max-w-md mx-auto p-5 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center gap-5 text-left hover:scale-105 transition-transform duration-200 cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex-shrink-0 flex items-center justify-center shadow-md">
              <Image
                src="/images/pdf_extracted/official_summit_qr.png"
                alt="Official Summit QR Verification"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-wider">
                Automated QR Check-in System
              </p>
              <p className="text-xs text-white/75 mt-0.5 leading-relaxed">
                Registered attendees receive a unique cryptographic QR badge for instant physical venue check-in.
              </p>
            </div>
          </div>

          {/* Action Buttons with Scale Motion */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-spring text-navy text-sm font-black tracking-wider uppercase hover:bg-[#02b25b] hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <span>Register to Attend</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href="/NCD Summit 26.pdf"
              className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-white/10 border border-white/30 text-white text-sm font-extrabold tracking-wider uppercase hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Download PDF Brochure</span>
            </Link>
          </div>

          {/* Trust credentials */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-spring" />
              Official Secretariat Portal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-spring" />
              Verified Attendance Certification
            </span>
            <span>•</span>
            <span className="font-mono text-white/70">
              RC: {eventConfig.secretariat.rcNumber}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
