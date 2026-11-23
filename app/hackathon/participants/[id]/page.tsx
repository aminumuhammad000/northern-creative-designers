"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Vote,
  Share2,
  CheckCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
  QrCode,
  Download,
  Copy,
  Check,
  AlertCircle,
  Award,
  Layers,
  Palette,
  Smartphone,
  Globe,
  Loader2,
  FileText,
  Target,
  Sparkles,
  Users2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getFinalistProfileByIdAction,
  castPublicVoteAction,
  FinalistCandidate,
} from "@/app/actions/voting";
import { generateQrCodeDataUrl } from "@/lib/qr";

export default function IndividualParticipantPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState<FinalistCandidate | null>(null);
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [hasVotedForThis, setHasVotedForThis] = useState(false);
  const [hasVotedTeamId, setHasVotedTeamId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Voting interaction
  const [isVoting, setIsVoting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // QR & Share
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://northcdesigner.com.ng";
  const votingUrl = `${siteUrl}/hackathon/participants/${id}`;

  const loadProfile = async () => {
    if (!id) return;
    try {
      const res = await getFinalistProfileByIdAction(id);
      if (res.success && res.finalist) {
        setCandidate(res.finalist);
        setIsVotingOpen(res.isVotingOpen ?? false);
        setHasVotedForThis(res.hasVotedForThis ?? false);
        setHasVotedTeamId(res.hasVotedTeamId ?? null);
      } else {
        setErrorMsg(res.error || "Contestant not found.");
      }
    } catch {
      setErrorMsg("Failed to connect to Summit server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  useEffect(() => {
    if (votingUrl) {
      generateQrCodeDataUrl(votingUrl, { width: 400 }).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [votingUrl]);

  const handleVote = async () => {
    if (!candidate || !isVotingOpen) return;
    setIsVoting(true);
    setFeedback(null);

    try {
      const res = await castPublicVoteAction(candidate.id);
      if (res.success) {
        setFeedback({
          type: "success",
          text: res.message || `Official vote registered for ${candidate.lead_name}!`,
        });
        setHasVotedForThis(true);
        setHasVotedTeamId(candidate.id);
        await loadProfile();
      } else {
        setFeedback({
          type: "error",
          text: res.error || "Failed to record ballot.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Network error occurred while submitting ballot.",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(votingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl || !candidate) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `Vote_${candidate.lead_name.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center bg-[#FAFAF9]">
        <Loader2 className="w-8 h-8 text-pine animate-spin mb-3" />
        <p className="text-xs font-semibold text-pine uppercase tracking-wider">
          Loading Contestant Profile...
        </p>
      </main>
    );
  }

  if (errorMsg || !candidate) {
    return (
      <main className="flex-1 pb-20 bg-[#FAFAF9]">
        <PageHeader
          tag="Not Found"
          title="Contestant Profile"
          description="The requested hackathon finalist could not be located."
        />
        <div className="max-w-xl mx-auto px-4 pt-12 text-center space-y-4">
          <div className="p-8 rounded-3xl bg-white border border-neutral-border space-y-4 shadow-sm">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="font-bold text-pine text-lg">{errorMsg || "Finalist Not Found"}</h3>
            <p className="text-xs text-navy/70">
              Please check the URL or return to the finalist showcase directory.
            </p>
            <Link
              href="/hackathon/participants"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pine text-white text-xs font-bold uppercase tracking-wider hover:bg-pine-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const hasVotedOther = Boolean(hasVotedTeamId && !hasVotedForThis);
  const shareText = encodeURIComponent(
    `Vote for ${candidate.lead_name} in Northern Design Hackathon 2.0 at Summit in Kano! Project: "${candidate.project_title}". Cast your live ballot here:`
  );

  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      <PageHeader
        tag="Finalist Showcase"
        title={candidate.lead_name}
        description={`${candidate.professional_title} • ${candidate.track}`}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
          { title: "Finalists", href: "/hackathon/participants" },
          { title: candidate.lead_name, href: `/hackathon/participants/${candidate.id}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <Link
            href="/hackathon/participants"
            className="inline-flex items-center gap-2 text-xs font-bold text-pine hover:text-spring transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Finalists</span>
          </Link>

          <Link
            href="/hackathon/leaderboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy/70 hover:text-pine transition-colors uppercase tracking-wider"
          >
            <span>View Live Leaderboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Feedback message banner */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: PROJECT BREAKDOWN */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project Hero Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-border shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-pine text-spring">
                  {candidate.track}
                </span>
                {candidate.is_winner && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {candidate.winner_badge || "Grand Winner"}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-pine tracking-tight leading-snug">
                {candidate.project_title}
              </h2>

              <p className="text-sm sm:text-base text-navy/80 leading-relaxed font-normal">
                {candidate.short_description}
              </p>

              {/* External presentation or portfolio links */}
              {(candidate.presentation_url || candidate.portfolio_url) && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {candidate.presentation_url && (
                    <a
                      href={candidate.presentation_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-sand/40 hover:bg-neutral-sand border border-neutral-border text-xs font-bold text-pine transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-pine" />
                      <span>View Presentation / Figma Slides</span>
                      <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                    </a>
                  )}
                  {candidate.portfolio_url && (
                    <a
                      href={candidate.portfolio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-sand/40 hover:bg-neutral-sand border border-neutral-border text-xs font-bold text-pine transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-pine" />
                      <span>Designer Portfolio</span>
                      <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* In-Depth Problem Statement & Solution */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-border shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-pine font-bold text-xs uppercase tracking-wider font-mono">
                  <Target className="w-4 h-4 text-tangerine" />
                  Problem Statement
                </div>
                <h3 className="text-base sm:text-lg font-bold text-pine">
                  What Regional Challenge Does This Address?
                </h3>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  {candidate.problem_statement ||
                    "Northern Nigerian creative industries and regional consumers require scalable, localized digital solutions tailored to cultural contexts, indigenous typography, and Sahelian aesthetics."}
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-6 space-y-2">
                <div className="flex items-center gap-2 text-pine font-bold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-spring" />
                  Proposed Solution &amp; Craft
                </div>
                <h3 className="text-base sm:text-lg font-bold text-pine">
                  The Creative &amp; Technical Execution
                </h3>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  {candidate.proposed_solution ||
                    candidate.detailed_description ||
                    "A modular, WCAG-accessible execution designed live during the 120-minute sprint at Summit in Kano. Engineered under real constraints for enterprise scalability."}
                </p>
              </div>

              {candidate.target_audience && (
                <div className="border-t border-neutral-100 pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-pine font-bold text-xs uppercase tracking-wider font-mono">
                    <Users2 className="w-4 h-4 text-pine" />
                    Target Audience &amp; Beneficiaries
                  </div>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                    {candidate.target_audience}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLS: VOTING, PHOTOGRAPH & QR CODE */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contestant Identity & Voting Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-border shadow-xs space-y-6">
              {/* Photo */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
                <Image
                  src={candidate.avatar_url || "/images/community/ncd_class_training.jpg"}
                  alt={candidate.lead_name}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-spring block">
                    Finalist Contestant
                  </span>
                  <h3 className="font-black text-xl leading-tight">
                    {candidate.lead_name}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {candidate.professional_title}
                  </p>
                </div>
              </div>

              {/* Live Tally Bar */}
              <div className="p-4 rounded-2xl bg-neutral-sand/40 border border-neutral-border/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-pine uppercase tracking-wider">Audience Votes:</span>
                  <span className="font-mono font-black text-pine text-base">
                    {candidate.votes} votes ({candidate.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00CB67] h-full rounded-full transition-all duration-700"
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>

              {/* Vote CTA Button */}
              <button
                onClick={handleVote}
                disabled={hasVotedForThis || hasVotedOther || !isVotingOpen || isVoting}
                className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  hasVotedForThis
                    ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-400 cursor-default"
                    : hasVotedOther
                    ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed"
                    : !isVotingOpen
                    ? "bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed"
                    : "bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] cursor-pointer hover:shadow-lg active:scale-98"
                }`}
              >
                {isVoting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Official Ballot...</span>
                  </>
                ) : hasVotedForThis ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Your Official Ballot Recorded</span>
                  </>
                ) : hasVotedOther ? (
                  <span>Ballot Already Cast for Another Finalist</span>
                ) : !isVotingOpen ? (
                  <span>Voting Window Closed</span>
                ) : (
                  <>
                    <Vote className="w-4 h-4" />
                    <span>Cast Your Official Vote</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-navy/60 text-center leading-normal">
                Audience ballot constitutes 30% of the final Northern Design Hackathon 2.0 evaluation. One vote per attendee pass.
              </p>
            </div>

            {/* Permanent QR Code Card */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-border shadow-xs text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <QrCode className="w-4 h-4 text-pine" />
                <h4 className="font-bold text-pine text-sm uppercase tracking-wider">
                  Permanent Contestant QR Pass
                </h4>
              </div>

              <div className="p-3 bg-neutral-sand/30 border border-neutral-border rounded-2xl inline-block mx-auto">
                {qrDataUrl ? (
                  <div className="relative w-44 h-44 bg-white p-2 rounded-xl shadow-2xs border border-neutral-border">
                    <Image
                      src={qrDataUrl}
                      alt={`QR code to vote for ${candidate.lead_name}`}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-pine" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2 px-3 rounded-xl border border-neutral-border bg-neutral-sand/20 hover:bg-neutral-sand text-pine text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-spring" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Link Copied" : "Copy Link"}</span>
                </button>

                <button
                  onClick={handleDownloadQr}
                  disabled={!qrDataUrl}
                  className="flex-1 py-2 px-3 rounded-xl border border-neutral-border bg-neutral-sand/20 hover:bg-neutral-sand text-pine text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-pine" />
                  <span>Download QR</span>
                </button>
              </div>

              {/* Social Share Grid */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-2">
                <a
                  href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(votingUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#20ba59] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(votingUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-neutral-800 transition-colors"
                >
                  <span>Share on X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
