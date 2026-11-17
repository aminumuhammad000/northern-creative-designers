"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    src: "/images/community/ncd_hall_audience.jpg",
    alt: "Northern Creative Designers Summit Audience",
  },
  {
    src: "/images/community/ncd_banner_group.jpg",
    alt: "Northern Creative Designers Community Group",
  },
  {
    src: "/images/community/ncd_class_training.jpg",
    alt: "Design Workshop and Training Session",
  },
  {
    src: "/images/community/ncd_peer_interaction.jpg",
    alt: "Designers Networking and Collaborating",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-[#FAFAF8] pt-20 pb-24 md:pt-28 md:pb-36">
      {/* REAL PHOTOGRAPHIC BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-55" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Balanced Scrim: Keeps background photos clearly recognizable while ensuring crisp text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(250,250,248,0.88)_0%,rgba(250,250,248,0.65)_55%,rgba(250,250,248,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/85 via-transparent to-[#FAFAF8]" />

        {/* Subtle Brand Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(3,208,107,0.10),rgba(250,250,248,0))]" />
      </div>

      {/* Centered Hero Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center relative z-10">
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-pine tracking-[-0.03em] leading-[1.03] font-cabinet">
            Roots &amp; Vectors
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#FF5C00] tracking-[-0.015em] leading-snug">
            Shaping the Future of Arewa Design.
          </p>
        </div>

        <p className="mt-6 sm:mt-7 text-base sm:text-lg md:text-xl text-navy/80 max-w-3xl mx-auto leading-relaxed font-normal">
          The premier annual gathering for designers, strategists, developers, and visual storytellers across Northern Nigeria. Bridging rich cultural heritage with modern digital craft, artificial intelligence, and sustainable commercial pathways.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#03D06B] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(3,208,107,0.30)] hover:bg-[#02b25b] hover:shadow-[0_6px_22px_rgba(3,208,107,0.40)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03D06B]"
          >
            <span>Register to Attend</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/NCD Summit 26.pdf"
            className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#6C5CE7] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(108,92,231,0.25)] hover:bg-[#5a4ad1] hover:shadow-[0_6px_22px_rgba(108,92,231,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7]"
          >
            <span>View Brochure (PDF)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
