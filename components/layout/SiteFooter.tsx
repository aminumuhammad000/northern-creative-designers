import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  CreditCard,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import { footerNavItems } from "@/config/navigation";

export function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="bg-pine text-white pt-16 pb-12 border-t-4 border-spring">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Brand & Organization Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Official Logo on Dark Pine Background */}
            <div className="flex flex-col space-y-2">
              <Link href="/" className="inline-block" aria-label="Northern Creative Designers Home">
                <Image
                  src="/images/brand/logo-footer.png"
                  alt="Northern Creative Designers"
                  width={220}
                  height={68}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
              <p className="text-spring text-xs font-semibold uppercase tracking-wider">
                Summit 2.0 • Roots &amp; Vectors
              </p>
            </div>

            <p className="text-white/80 text-sm leading-relaxed pr-4">
              The premier annual gathering for designers, strategists, developers,
              and visual storytellers across Northern Nigeria. Dedicated to
              bridging indigenous heritage with modern digital craft.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs border border-white/10">
              <ShieldCheck className="w-4 h-4 text-spring" />
              <span className="font-mono">Registered Entity: {eventConfig.secretariat.rcNumber}</span>
            </div>

            {/* Official Secretariat Contacts directly from PDF */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-white/85">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-spring flex-shrink-0" />
                <a
                  href={`mailto:${eventConfig.secretariat.email}`}
                  className="hover:text-spring transition-colors"
                >
                  {eventConfig.secretariat.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{eventConfig.secretariat.phones.join(" • ")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-spring flex-shrink-0" />
                <span>Kano, Northern Nigeria</span>
              </div>
            </div>
          </div>

          {/* Summit Links */}
          <div>
            <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-4">
              Summit
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerNavItems.summit.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-spring transition-colors inline-flex items-center gap-1"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/NCD Summit 26.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spring font-medium hover:underline inline-flex items-center gap-1.5 pt-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  PDF Brochure (17 pgs)
                </a>
              </li>
            </ul>
          </div>

          {/* Participate Links */}
          <div>
            <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-4">
              Participate
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerNavItems.participate.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-spring transition-colors inline-flex items-center gap-1"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secretariat & Banking Channel */}
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-3">
                Official Settlement
              </h4>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1.5 text-xs">
                <p className="font-semibold text-white">
                  {eventConfig.banking.bankName}
                </p>
                <p className="text-white/70">
                  Account: <span className="font-mono text-spring font-bold">{eventConfig.banking.accountNumber}</span>
                </p>
                <p className="text-white/60 text-[11px]">
                  {eventConfig.banking.accountName}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-2">
                Official Socials
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/${eventConfig.secretariat.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-spring hover:text-navy transition-colors text-xs font-medium"
                >
                  {eventConfig.secretariat.handle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            © {currentYear} Northern Creative Designers. All rights reserved.
            Organised by the Executive Committee.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-spring transition-colors">
              Privacy Notice
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-spring transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/voting-rules" className="hover:text-spring transition-colors">
              Voting Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
