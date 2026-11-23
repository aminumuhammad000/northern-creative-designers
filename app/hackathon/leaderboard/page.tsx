"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Award,
  Vote,
  Clock,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Filter,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Palette,
  Smartphone,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getLiveLeaderboardAction,
  LeaderboardEntry,
} from "@/app/actions/voting";

export default function HackathonLeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votingStatus, setVotingStatus] = useState<string>("upcoming");
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [votingEndsAt, setVotingEndsAt] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [resultsPublished, setResultsPublished] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [networkError, setNetworkError] = useState(false);

  // Filter state
  const [selectedTrack, setSelectedTrack] = useState<string>("all");

  // Projector / Fullscreen Mode
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchLeaderboard = async () => {
    try {
      const res = await getLiveLeaderboardAction();
      if (res.success) {
        setLeaderboard(res.leaderboard);
        setTotalVotes(res.totalVotes);
        setVotingStatus(res.votingStatus);
        setIsVotingOpen(res.isVotingOpen);
        setVotingEndsAt(res.votingEndsAt);
        setRemainingSeconds(res.remainingSeconds);
        setResultsPublished(res.resultsPublished);
        setLastUpdated(res.lastUpdated);
        setNetworkError(false);
      } else {
        setNetworkError(true);
      }
    } catch {
      setNetworkError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Live polling every 3.5 seconds
    const interval = setInterval(fetchLeaderboard, 3500);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown local tick
  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const toggleProjectorMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsProjectorMode(true);
      }).catch(() => {
        setIsProjectorMode(!isProjectorMode);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsProjectorMode(false);
      }).catch(() => {
        setIsProjectorMode(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsProjectorMode(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Filter by track
  const filteredLeaderboard = leaderboard.filter((item) => {
    if (selectedTrack === "all") return true;
    if (selectedTrack === "brand") return item.track.toLowerCase().includes("brand");
    if (selectedTrack === "uiux") {
      return item.track.toLowerCase().includes("ui") || item.track.toLowerCase().includes("product");
    }
    return true;
  });

  const getMedalBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-900 font-black text-sm flex items-center justify-center shadow-md border-2 border-amber-300">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-300 text-neutral-900 font-black text-sm flex items-center justify-center shadow-md border-2 border-slate-200">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-sm flex items-center justify-center shadow-md border-2 border-amber-600">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-neutral-100 text-pine font-mono font-bold text-xs flex items-center justify-center border border-neutral-border">
            #{rank}
          </div>
        );
    }
  };

  // =========================================================================
  // PROJECTOR / STAGE MODE (High-contrast, auditorium fullscreen presentation)
  // =========================================================================
  if (isProjectorMode) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-[#041F0D] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto font-sans"
      >
        {/* Top Stage Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-spring text-[#063B18] font-black text-lg flex items-center justify-center shadow-lg">
              NCD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Northern Design Hackathon 2.0
                </h1>
                {isVotingOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-spring text-[#063B18] shadow-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#063B18]" />
                    LIVE STAGE VOTING
                  </span>
                ) : resultsPublished ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-neutral-900 shadow-sm">
                    🏆 OFFICIAL WINNERS PUBLISHED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
                    VOTING CONCLUDED
                  </span>
                )}
              </div>
              <p className="text-white/70 text-xs font-mono mt-0.5">
                Meena Event Centre, Kano • Roots &amp; Vectors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isVotingOpen && (
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-spring uppercase tracking-wider block">
                  Voting Window Clock
                </span>
                <span className="text-3xl font-mono font-black text-white">
                  {formatCountdown(remainingSeconds)}
                </span>
              </div>
            )}

            <div className="text-right">
              <span className="text-[11px] font-mono font-bold text-white/60 uppercase tracking-wider block">
                Total Ballots
              </span>
              <span className="text-3xl font-mono font-black text-spring">
                {totalVotes}
              </span>
            </div>

            <button
              onClick={toggleProjectorMode}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Exit Projector Mode"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Projector Leaderboard Big Rows */}
        <div className="my-auto py-8 space-y-4 max-w-6xl mx-auto w-full">
          {filteredLeaderboard.map((item, idx) => {
            const isFirst = item.rank === 1;
            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all flex items-center justify-between gap-6 shadow-xl ${
                  isFirst
                    ? "bg-gradient-to-r from-pine to-[#094A23] border-spring ring-2 ring-spring/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {/* Left: Medal, Photo, Name */}
                <div className="flex items-center gap-5 min-w-0">
                  <div className="text-2xl font-black font-mono w-10 text-center text-spring">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${item.rank}`}
                  </div>

                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 border-2 border-white/20">
                    <Image
                      src={item.avatar_url || "/images/community/ncd_class_training.jpg"}
                      alt={item.lead_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 text-spring">
                        {item.track}
                      </span>
                      {item.is_winner && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-900">
                          {item.winner_badge || "Champion"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight truncate mt-1">
                      {item.lead_name}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm truncate">
                      {item.project_title}
                    </p>
                  </div>
                </div>

                {/* Right: Score or Votes & Percentage */}
                <div className="flex items-center gap-8 flex-shrink-0 text-right">
                  {resultsPublished && item.final_score !== undefined ? (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider block">
                        Final Score (70/30)
                      </span>
                      <span className="text-3xl sm:text-4xl font-mono font-black text-spring">
                        {item.final_score}
                      </span>
                      <span className="text-[10px] text-white/60 block">
                        Jury: {item.jury_score} • Aud: {item.audience_score}%
                      </span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-spring block">
                        {item.votes}
                      </span>
                      <span className="text-xs font-mono text-white/70">
                        {item.percentage}% share
                      </span>
                    </div>
                  )}

                  <div className="w-32 sm:w-48 bg-white/10 h-3.5 rounded-full overflow-hidden hidden md:block">
                    <div
                      className="bg-spring h-full rounded-full transition-all duration-700"
                      style={{
                        width: resultsPublished
                          ? `${item.final_score || 0}%`
                          : `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Projector Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-white/60">
          <span>Official Ballot Engine • Audited by NCD Technical Desk</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-spring animate-pulse" />
            Live sync: {lastUpdated || "Connected"}
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STANDARD AUDIENCE VIEW
  // =========================================================================
  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      <PageHeader
        tag="Real-Time Arena"
        title="Live Hackathon Leaderboard"
        description="Live audience vote tallies and official competition standings for Northern Design Hackathon 2.0. Updates automatically every 3 seconds."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
          { title: "Leaderboard", href: "/hackathon/leaderboard" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Control & Status Row */}
        <div className="p-6 sm:p-8 rounded-3xl bg-pine text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {isVotingOpen ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-spring text-[#063B18] shadow-sm animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#063B18]" />
                  LIVE VOTING ACTIVE
                </span>
              ) : resultsPublished ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-neutral-900 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  OFFICIAL FINAL RESULTS
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
                  <Clock className="w-3.5 h-3.5" />
                  VOTING WINDOW CLOSED
                </span>
              )}

              <span className="text-xs text-white/70 font-mono">
                • {totalVotes} total verified votes cast
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {resultsPublished
                ? "Official Competition Results (70% Jury + 30% Audience)"
                : "Live Audience Voting Standings"}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              {resultsPublished
                ? "Grand Champions and track winners calculated according to the official weighted scoring formula."
                : "Rankings based purely on live audience ballots submitted during the 20-minute stage sprint window."}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Projector Mode CTA */}
            <button
              onClick={toggleProjectorMode}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all shadow-xs"
            >
              <Maximize2 className="w-4 h-4 text-spring" />
              <span>Projector Mode</span>
            </button>

            <Link
              href="/hackathon/vote"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-spring hover:bg-[#02b25b] text-[#063B18] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              <Vote className="w-4 h-4" />
              <span>Cast Vote</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar & Live indicator */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-neutral-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" /> Track:
            </span>
            <button
              onClick={() => setSelectedTrack("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTrack === "all"
                  ? "bg-pine text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setSelectedTrack("brand")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedTrack === "brand"
                  ? "bg-pine text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Brand Identity</span>
            </button>
            <button
              onClick={() => setSelectedTrack("uiux")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedTrack === "uiux"
                  ? "bg-pine text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>UI/UX &amp; Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Auto-updating
            </span>
            <span>•</span>
            <span>Last sync: {lastUpdated || "Live"}</span>
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="bg-white rounded-3xl border border-neutral-border shadow-xs overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {filteredLeaderboard.map((item) => {
              const isTop = item.rank <= 3;

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-neutral-50/70 ${
                    item.rank === 1 ? "bg-amber-50/30" : ""
                  }`}
                >
                  {/* Left Column: Rank, Avatar, Name & Track */}
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div className="flex-shrink-0">
                      {getMedalBadge(item.rank)}
                    </div>

                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-border shadow-2xs">
                      <Image
                        src={item.avatar_url || "/images/community/ncd_class_training.jpg"}
                        alt={item.lead_name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-pine/10 text-pine">
                          {item.track}
                        </span>
                        {item.is_winner && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-900 shadow-2xs">
                            {item.winner_badge || "Grand Champion"}
                          </span>
                        )}
                      </div>

                      <h3 className="font-black text-pine text-base sm:text-lg leading-snug mt-1 truncate">
                        {item.lead_name}
                      </h3>

                      <p className="text-xs text-navy/70 truncate">
                        {item.project_title}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Vote Counts & Animated Progress */}
                  <div className="flex flex-col sm:items-end justify-center gap-1.5 flex-shrink-0 sm:w-72">
                    <div className="flex items-baseline justify-between sm:justify-end gap-2 w-full">
                      {resultsPublished && item.final_score !== undefined ? (
                        <div className="text-right">
                          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider mr-2">
                            Final Score:
                          </span>
                          <span className="font-mono font-black text-pine text-xl">
                            {item.final_score} / 100
                          </span>
                          <div className="text-[10px] font-mono text-neutral-400">
                            Jury: {item.jury_score} (70%) • Audience: {item.audience_score}% (30%)
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="font-mono font-black text-pine text-lg sm:text-xl">
                            {item.votes} <span className="text-xs font-normal text-neutral-500">votes</span>
                          </span>
                          <span className="text-xs font-mono font-bold text-spring bg-pine/10 px-2 py-0.5 rounded-full">
                            {item.percentage}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#00CB67] h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: resultsPublished
                            ? `${item.final_score || 0}%`
                            : `${item.percentage}%`,
                        }}
                      />
                    </div>

                    <Link
                      href={`/hackathon/participants/${item.id}`}
                      className="text-[11px] font-bold text-pine hover:text-spring transition-colors inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>View Dossier</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scoring Composition Explainer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-sand border border-neutral-border text-xs sm:text-sm text-navy/75 space-y-3">
          <h4 className="font-bold text-pine text-sm uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-tangerine" />
            Official Scoring Governance
          </h4>
          <p className="leading-relaxed">
            Northern Design Hackathon 2.0 uses a weighted formula to determine official champions:
            <span className="font-bold text-pine"> 70% Grand Jury Evaluation</span> (scored across Cultural Semiotics, Problem-Solution Fit, Craft, and Presentation) +
            <span className="font-bold text-pine"> 30% Live Audience Ballot</span>.
            Audience rankings shown above reflect verified ballots cast during the live summit window.
          </p>
        </div>
      </div>
    </main>
  );
}
