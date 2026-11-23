"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QrCode, Download, Share2, Copy, Check, X, ExternalLink } from "lucide-react";
import { generateQrCodeDataUrl } from "@/lib/qr";

interface ContestantQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  projectTitle: string;
  votingUrl: string;
  avatarUrl?: string;
}

export function ContestantQrModal({
  isOpen,
  onClose,
  candidateName,
  projectTitle,
  votingUrl,
  avatarUrl,
}: ContestantQrModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && votingUrl) {
      generateQrCodeDataUrl(votingUrl, { width: 400 }).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [isOpen, votingUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(votingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `NCD_Vote_${candidateName.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareText = encodeURIComponent(
    `Vote for ${candidateName} in Northern Design Hackathon 2.0 at Summit in Kano! Project: "${projectTitle}". Cast your live ballot here:`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-border text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spring/15 text-pine text-[11px] font-mono font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5" />
            Live Ballot QR Pass
          </span>
          <h3 className="text-xl font-black text-pine tracking-tight">
            {candidateName}
          </h3>
          <p className="text-xs text-navy/70 line-clamp-1">
            {projectTitle}
          </p>
        </div>

        {/* QR Code Canvas */}
        <div className="p-4 bg-neutral-sand/40 border border-neutral-border/80 rounded-2xl flex flex-col items-center justify-center">
          {qrDataUrl ? (
            <div className="relative w-56 h-56 bg-white p-3 rounded-xl shadow-xs border border-neutral-border">
              <Image
                src={qrDataUrl}
                alt={`QR code for ${candidateName}`}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-56 h-56 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-pine border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <span className="text-[11px] font-mono text-neutral-500 mt-3">
            Scan with smartphone camera to cast live vote
          </span>
        </div>

        {/* Voting Link input */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl border border-neutral-border bg-neutral-sand/30">
          <input
            type="text"
            readOnly
            value={votingUrl}
            className="w-full text-xs font-mono px-2 text-pine bg-transparent focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-pine text-white text-xs font-bold flex items-center gap-1.5 hover:bg-pine-light transition-colors whitespace-nowrap"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-spring" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleDownloadPng}
            disabled={!qrDataUrl}
            className="w-full py-2.5 px-3 rounded-xl border border-neutral-border bg-white text-pine hover:bg-neutral-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-pine" />
            <span>Download PNG</span>
          </button>

          <a
            href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(votingUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
