import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#013811",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://summit.northcdesigners.org"),
  title: {
    default: "Northern Creative Designers Summit 2.0 — Roots & Vectors",
    template: "%s | Northern Creative Designers Summit 2.0",
  },
  description:
    "Roots & Vectors: Shaping the Future of Arewa Design. The premier annual gathering for designers, developers, and visual storytellers across Northern Nigeria. 19th December, 2026 • Kano, Nigeria.",
  keywords: [
    "Northern Creative Designers",
    "Arewa Design Summit",
    "Roots and Vectors",
    "Kano Design Summit 2026",
    "African Design Innovation",
    "Northern Nigeria Creatives",
  ],
  authors: [{ name: "Northern Creative Designers", url: "https://northcdesigners.org" }],
  creator: "Northern Creative Designers",
  publisher: "Northern Creative Designers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Northern Creative Designers Summit 2.0 — Roots & Vectors",
    description:
      "Roots & Vectors: Shaping the Future of Arewa Design. 19th December, 2026 • Kano, Nigeria.",
    url: "https://summit.northcdesigners.org",
    type: "website",
    locale: "en_NG",
    siteName: "Northern Creative Designers Summit 2.0",
    images: [
      {
        url: "/images/brand/northern-creative-designers-banner.png",
        width: 1200,
        height: 630,
        alt: "Northern Creative Designers Summit 2.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northern Creative Designers Summit 2.0",
    description: "Roots & Vectors: Shaping the Future of Arewa Design. 19th December, 2026 • Kano, Nigeria.",
    creator: "@northcdesigners",
    images: ["/images/brand/northern-creative-designers-banner.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/icon-512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-navy selection:bg-spring selection:text-navy">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
