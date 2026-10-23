import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNavItems } from "@/config/navigation";

export function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="bg-pine text-white pt-16 pb-12 border-t-4 border-spring">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Brand & Organization Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo in White on Pine background (Strict Brand Guideline Compliance) */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 shadow-xs">
                <Image
                  src="/images/logos/symbol-mark.png"
                  alt="Northern Creative Designers Mark"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/logos/wordmark-white.png"
                  alt="Northern Creative Designers"
                  width={150}
                  height={40}
                  className="object-contain h-7 w-auto"
                />
                <p className="text-spring text-xs font-semibold uppercase tracking-wider mt-1">
                  Summit 2.0 • Roots & Vectors
                </p>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed pr-4">
              The premier annual gathering for designers, strategists, developers,
              and visual storytellers across Northern Nigeria. Dedicated to
              bridging indigenous heritage with cutting-edge digital craft.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-white/90 text-xs border border-white/10">
              <ShieldCheck className="w-4 h-4 text-spring" />
              <span>Registered Entity: RC 9930022</span>
            </div>

            {/* Official Contact Details */}
            <div className="space-y-2 pt-2 text-sm text-white/85">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-spring flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.organization.email}`}
                  className="hover:text-spring transition-colors"
                >
                  {siteConfig.organization.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-spring flex-shrink-0" />
                <span>{siteConfig.organization.phones.join(" • ")}</span>
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
            <ul className="space-y-2.5 text-sm">
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
            </ul>
          </div>

          {/* Participate Links */}
          <div>
            <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-4">
              Participate
            </h4>
            <ul className="space-y-2.5 text-sm">
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

          {/* Summit Desk & Socials */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-3">
                Secretariat Desk
              </h4>
              <div className="p-3.5 rounded-lg bg-navy/60 border border-white/10 space-y-2">
                <p className="font-semibold text-white text-xs">
                  Northern Creative Designers
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  Dedicated to empowering Northern Nigeria&apos;s creative talent and establishing world-class design standards.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs text-spring hover:underline font-medium pt-1"
                >
                  Contact Secretariat
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-spring uppercase tracking-wider mb-2">
                Official Socials
              </h4>
              <p className="text-xs text-white/75 mb-2">
                Follow all live updates and announcements:
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <a
                  href={siteConfig.organization.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-spring hover:text-navy transition-colors text-xs"
                >
                  @northcdesigners
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
