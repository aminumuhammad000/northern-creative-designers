import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Download,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import { Button } from "@/components/ui/Button";

export function RegistrationCTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAF8] relative overflow-hidden border-b border-neutral-border">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-spring/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-pine text-white p-8 sm:p-14 border border-spring/30 shadow-lg text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
            <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
            <span>Registration Now Open • Summit 2.0</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Join the Movement Shaping Arewa Design
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
              Connect with fellow practitioners, master cutting-edge workflows, and showcase your creative vision at the region&apos;s definitive summit.
            </p>
          </div>

          {/* Date & Location Pill matching PDF Cover */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-2.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="text-spring font-bold">Date:</span>
              <span>{eventConfig.date}</span>
            </div>
            <span className="text-white/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-tangerine font-bold">Venue:</span>
              <span>{eventConfig.venue}</span>
            </div>
          </div>

          {/* QR Code & Digital Pass Feature */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-5 text-left">
            <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex-shrink-0 flex items-center justify-center shadow-sm">
              <Image
                src="/images/pdf_extracted/official_summit_qr.png"
                alt="Official Summit QR Verification"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Automated QR Check-in System
              </p>
              <p className="text-xs text-white/75 mt-0.5 leading-relaxed">
                Registered attendees receive a unique cryptographic QR badge for instant physical venue check-in.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              href="/register"
              variant="primary"
              size="lg"
            >
              Register to Attend
            </Button>
            <Button
              href="/NCD Summit 26.pdf"
              variant="outline"
              size="lg"
              className="text-white border-white/40 hover:bg-white/10"
            >
              Download PDF Brochure
            </Button>
          </div>

          {/* Trust credentials */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-spring" />
              Official Secretariat Portal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
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
