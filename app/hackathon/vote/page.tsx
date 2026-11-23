"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Vote,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  QrCode,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Loader2,
  Award,
  Users2,
  X,
  Palette,
  Smartphone,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getHackathonPublicStateAction,
  getHackathonFinalistsAction,
  castPublicVoteAction,
  FinalistCandidate,
  HackathonPublicState,
} from "@/app/actions/voting";
import { generateQrCodeDataUrl } from "@/lib/qr";

function VotingContent() {
  const searchParams = useSearchParams();
  const preselectedContestantId = searchParams.get("contestant");

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<HackathonPublicState | null>(null);
  const [finalists, setFinalists] = useState<FinalistCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<FinalistCandidate | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Voting Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Authoritative countdown timer state
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  // Universal event QR code
  const [eventQrUrl, setEventQrUrl] = useState("");

  const loadData = async () => {
    try {
      const [stateRes, finalistsRes] = await Promise.all([
        getHackathonPublicStateAction(),
        getHackathonFinalistsAction(),
      ]);

      if (stateRes.success && stateRes.state) {
        setState(stateRes.state);
        setRemainingSeconds(stateRes.state.remaining_seconds);
      }

      if (finalistsRes.success && finalistsRes.finalists) {
        setFinalists(finalistsRes.finalists);

        // Preselect if param given
        if (preselectedContestantId) {
          const match = finalistsRes.finalists.find((f) => f.id === preselectedContestantId);
          if (match) setSelectedCandidate(match);
        }
      }
    } catch (err) {
      console.error("Failed to fetch voting state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Generate Universal Event QR code
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://northcdesigner.com.ng";
    generateQrCodeDataUrl(`${siteUrl}/hackathon/vote`, { width: 400 }).then((url) => {
      setEventQrUrl(url);
    });

    // Refresh every 10 seconds from server
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [preselectedContestantId]);

  // Countdown clock tick every second
  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOpenConfirm = (candidate: FinalistCandidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmModal(true);
    setFeedback(null);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await castPublicVoteAction(selectedCandidate.id);
      if (res.success) {
        setFeedback({
          type: "success",
          text: res.message || `Official ballot cast for ${selectedCandidate.lead_name}!`,
        });
        setShowConfirmModal(false);
        setState((prev) => (prev ? { ...prev, has_voted_team_id: selectedCandidate.id } : null));
        await loadData();
      } else {
        setFeedback({
          type: "error",
          text: res.error || "Failed to submit ballot.",
        });
        setShowConfirmModal(false);
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Network error occurred while submitting your vote.",
      });
      setShowConfirmModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center bg-[#FAFAF9]">
        <Loader2 className="w-8 h-8 text-pine animate-spin mb-3" />
        <p className="text-xs font-semibold text-pine uppercase tracking-wider">
          Connecting to Live Voting Arena...
        </p>
      </main>
    );
  }

  const isVotingOpen = Boolean(state?.is_voting_open && remainingSeconds > 0);
  const hasVoted = Boolean(state?.has_voted_team_id);
  const votedCandidate = finalists.find((f) => f.id === state?.has_voted_team_id);

  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      <PageHeader
        tag="Live Ballot"
        title="Live Audience Voting"
        description="Cast your official vote for the Northern Design Hackathon 2.0 stage finalists. Your ballot directly determines 30% of the official winner score."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
          { title: "Live Voting", href: "/hackathon/vote" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Voting Hero & Countdown Header */}
        <div
          className={`p-6 sm:p-10 rounded-3xl text-white shadow-xl transition-all ${
            isVotingOpen
              ? "bg-pine border-2 border-spring"
              : state?.results_published
              ? "bg-[#063B18] border border-white/20"
              : "bg-neutral-800 border border-neutral-700"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {isVotingOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-spring text-[#063B18] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#063B18] animate-ping" />
                    LIVE VOTING WINDOW OPEN
                  </span>
                ) : state?.results_published ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-neutral-900 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    OFFICIAL RESULTS ANNOUNCED
                  </span>
                ) : state?.status === "upcoming" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
                    <Clock className="w-3.5 h-3.5" />
                    VOTING OPENS FOLLOWING STAGE PITCHES
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-200 border border-red-500/40">
                    <Clock className="w-3.5 h-3.5" />
                    20-MINUTE WINDOW EXPIRED
                  </span>
                )}

                <span className="text-xs text-white/70 font-mono">
                  • Kano, 19th December 2026
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isVotingOpen
                  ? "Cast Your Stage Sprint Ballot"
                  : state?.results_published
                  ? "Hackathon Voting Concluded"
                  : state?.status === "upcoming"
                  ? "2-Hour Sprint in Progress"
                  : "Live Voting Window Closed"}
              </h2>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl">
                {isVotingOpen
                  ? "Finalists have completed their 120-minute execution sprint and pitched live on stage. Review the projects below and cast your official vote before time runs out."
                  : state?.results_published
                  ? "The 70% Grand Jury Evaluation and 30% Live Audience votes have been merged into the final rankings. View the full standings on the leaderboard."
                  : state?.status === "upcoming"
                  ? "Competitors are actively executing live on the main stage. The 20-minute voting window will be unlocked by the Technical Desk immediately upon pitch conclusion."
                  : "Thank you for participating! The live audience voting period has concluded. The Technical Desk is now compiling jury scores."}
              </p>
            </div>

            {/* Live Countdown Clock Widget */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center w-full sm:w-56 shadow-inner">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-spring block">
                  Voting Window Remaining
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white block mt-1">
                  {formatCountdown(remainingSeconds)}
                </span>
                <span className="text-[10px] text-white/60 block mt-1">
                  {isVotingOpen ? "Server authoritative countdown" : "Timer inactive"}
                </span>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Link
                  href="/hackathon/leaderboard"
                  className="px-6 py-3.5 rounded-full bg-spring hover:bg-[#02b25b] text-[#063B18] font-black text-xs uppercase tracking-wider text-center transition-all shadow-md active:scale-98"
                >
                  View Live Leaderboard
                </Link>
                <Link
                  href="/hackathon/participants"
                  className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-2xs"
                >
                  Browse Detailed Profiles
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Global Feedback Banner */}
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

        {/* Voted Confirmation Banner */}
        {hasVoted && votedCandidate && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00CB67] text-[#063B18] flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">
                  Your official ballot is confirmed for {votedCandidate.lead_name}
                </h4>
                <p className="text-xs text-emerald-800">
                  Project: "{votedCandidate.project_title}" • Pass Token: <span className="font-mono font-semibold">{state?.voter_token?.slice(0, 14)}...</span>
                </p>
              </div>
            </div>

            <Link
              href="/hackathon/leaderboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#063B18] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#042810] transition-colors"
            >
              <span>Track Standings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Finalist Voting Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
            <div>
              <h3 className="text-xl font-black text-pine tracking-tight">
                Official Stage Finalists ({finalists.length})
              </h3>
              <p className="text-xs text-navy/70">
                Click on any candidate card to review their project details and submit your vote.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-pine">
              1 Vote Per Verified Attendee
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalists.map((candidate) => {
              const isThisVoted = state?.has_voted_team_id === candidate.id;

              return (
                <div
                  key={candidate.id}
                  className={`rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
                    isThisVoted
                      ? "border-[#00CB67] ring-2 ring-[#00CB67]/30 bg-[#F6FFF8]"
                      : "border-neutral-border hover:border-pine/30"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Candidate Identity Header */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 shadow-2xs border border-neutral-border">
                        <Image
                          src={candidate.avatar_url || "/images/community/ncd_class_training.jpg"}
                          alt={candidate.lead_name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-pine/10 text-pine">
                          {candidate.track}
                        </span>
                        <h4 className="font-bold text-pine text-base leading-snug truncate mt-1">
                          {candidate.lead_name}
                        </h4>
                        <p className="text-xs text-navy/60 truncate">
                          {candidate.professional_title}
                        </p>
                      </div>
                    </div>

                    {/* Project Snapshot */}
                    <div className="p-3.5 rounded-2xl bg-neutral-sand/30 border border-neutral-border/70 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-spring uppercase tracking-wider">
                        Concept
                      </span>
                      <h5 className="font-bold text-pine text-xs leading-snug">
                        {candidate.project_title}
                      </h5>
                      <p className="text-[11px] text-navy/70 line-clamp-3 leading-relaxed">
                        {candidate.short_description}
                      </p>
                    </div>

                    {/* Share / Live Votes pill */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <Link
                        href={`/hackathon/participants/${candidate.id}`}
                        className="text-pine font-bold text-[11px] uppercase tracking-wider hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Full Dossier</span>
                      </Link>

                      <span className="font-mono text-neutral-500 text-[11px]">
                        {candidate.votes} votes ({candidate.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Vote CTA */}
                  <div className="pt-4 mt-2 border-t border-neutral-100">
                    <button
                      onClick={() => handleOpenConfirm(candidate)}
                      disabled={hasVoted || !isVotingOpen}
                      className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        isThisVoted
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                          : hasVoted
                          ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed"
                          : !isVotingOpen
                          ? "bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed"
                          : "bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] cursor-pointer hover:shadow"
                      }`}
                    >
                      {isThisVoted ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-700" />
                          <span>Your Vote Recorded</span>
                        </>
                      ) : hasVoted ? (
                        <span>Ballot Cast</span>
                      ) : !isVotingOpen ? (
                        <span>Voting Closed</span>
                      ) : (
                        <>
                          <Vote className="w-4 h-4" />
                          <span>Select &amp; Vote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Universal Event Voting QR Code Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pine/10 text-pine text-xs font-mono font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              Main Auditorium Screen Pass
            </span>
            <h3 className="text-2xl font-black text-pine tracking-tight">
              Share Event Ballot with Audience
            </h3>
            <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
              Display this universal QR code on stage presentation screens, projector slides, or event banners. Attendees scan it to access this live ballot on their mobile smartphones.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              {eventQrUrl && (
                <a
                  href={eventQrUrl}
                  download="NCD_Hackathon_2026_Event_Voting_QR.png"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-border bg-neutral-sand/30 hover:bg-neutral-sand text-pine text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-pine" />
                  <span>Download Projector PNG</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-4 bg-neutral-sand/40 border border-neutral-border rounded-2xl flex flex-col items-center flex-shrink-0">
            {eventQrUrl ? (
              <div className="relative w-48 h-48 bg-white p-2.5 rounded-xl shadow-xs border border-neutral-border">
                <Image
                  src={eventQrUrl}
                  alt="Universal Hackathon Voting QR Code"
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-pine" />
              </div>
            )}
            <span className="text-[11px] font-mono text-neutral-500 mt-2">
              Scan to open live voting ballot
            </span>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-border space-y-5 text-center">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-spring/20 text-pine flex items-center justify-center mx-auto shadow-xs">
              <Vote className="w-7 h-7 text-pine" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-spring">
                Confirm Official Ballot
              </span>
              <h3 className="text-2xl font-black text-pine tracking-tight">
                Vote for {selectedCandidate.lead_name}?
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                You are about to cast your official audience vote for project:
                <br />
                <span className="font-bold text-pine">"{selectedCandidate.project_title}"</span>
              </p>
            </div>

            <div className="p-3 bg-neutral-sand/40 border border-neutral-border/80 rounded-xl text-left text-xs text-neutral-600 space-y-1">
              <p className="font-bold text-pine">Important Note:</p>
              <p>• Each attendee is permitted exactly ONE vote per summit sprint.</p>
              <p>• Once confirmed, your ballot cannot be altered or transferred.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3 rounded-xl border border-neutral-border bg-white text-navy font-bold text-xs uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmVote}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Confirm Vote</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function HackathonVotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
          <Loader2 className="w-8 h-8 text-pine animate-spin" />
        </div>
      }
    >
      <VotingContent />
    </Suspense>
  );
}
