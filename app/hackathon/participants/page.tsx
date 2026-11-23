"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users2,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Vote,
  Share2,
  Award,
  Clock,
  CheckCircle,
  ExternalLink,
  Layers,
  Palette,
  Smartphone,
  Eye,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContestantQrModal } from "@/components/hackathon/ContestantQrModal";
import {
  getHackathonPublicStateAction,
  getHackathonFinalistsAction,
  castPublicVoteAction,
  FinalistCandidate,
  HackathonPublicState,
} from "@/app/actions/voting";

export default function ParticipantsDirectoryPage() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<HackathonPublicState | null>(null);
  const [finalists, setFinalists] = useState<FinalistCandidate[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Voting feedback
  const [votingId, setVotingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Share / QR Modal
  const [shareCandidate, setShareCandidate] = useState<FinalistCandidate | null>(null);

  const loadData = async () => {
    try {
      const [stateRes, finalistsRes] = await Promise.all([
        getHackathonPublicStateAction(),
        getHackathonFinalistsAction(),
      ]);
      if (stateRes.success && stateRes.state) {
        setState(stateRes.state);
      }
      if (finalistsRes.success && finalistsRes.finalists) {
        setFinalists(finalistsRes.finalists);
      }
    } catch (err) {
      console.error("Failed to load participants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Poll every 10 seconds for voting state updates
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickVote = async (teamId: string, candidateName: string) => {
    if (!state?.is_voting_open) {
      setFeedback({
        type: "error",
        text: state?.status === "completed"
          ? "The 20-minute live voting window has closed."
          : "Voting is not currently active.",
      });
      return;
    }

    setVotingId(teamId);
    setFeedback(null);

    try {
      const res = await castPublicVoteAction(teamId);
      if (res.success) {
        setFeedback({
          type: "success",
          text: res.message || `Official vote recorded for ${candidateName}!`,
        });
        setState((prev) => (prev ? { ...prev, has_voted_team_id: teamId } : null));
        await loadData();
      } else {
        setFeedback({
          type: "error",
          text: res.error || "Failed to submit ballot.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Network error occurred while submitting vote.",
      });
    } finally {
      setVotingId(null);
    }
  };

  // Filtered finalists
  const filtered = finalists.filter((f) => {
    const matchesTrack =
      selectedTrack === "all" ||
      (selectedTrack === "brand" && f.track.toLowerCase().includes("brand")) ||
      (selectedTrack === "uiux" && (f.track.toLowerCase().includes("ui") || f.track.toLowerCase().includes("product")));

    const matchesSearch =
      searchQuery === "" ||
      f.lead_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.project_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.track.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesSearch;
  });

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://northcdesigner.com.ng";

  return (
    <main className="flex-1 pb-24 bg-[#FAFAF9]">
      <PageHeader
        tag="Stage Finalists"
        title="Hackathon Finalist Directory"
        description="Explore the top individual designers competing live on stage at Northern Design Hackathon 2.0 in Kano. Review their creative projects and cast your official vote."
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Hackathon", href: "/hackathon" },
          { title: "Finalists", href: "/hackathon/participants" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Status Callout Banner */}
        {state && (
          <div
            className={`p-5 sm:p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
              state.is_voting_open
                ? "bg-pine text-white border-pine"
                : state.results_published
                ? "bg-[#F6FFF8] text-pine border-[#00CB67]/40"
                : "bg-white text-navy border-neutral-border"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {state.is_voting_open ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-spring text-[#063B18]">
                    <span className="w-2 h-2 rounded-full bg-[#063B18] animate-ping" />
                    LIVE VOTING IN PROGRESS
                  </span>
                ) : state.results_published ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pine text-spring">
                    <Award className="w-3.5 h-3.5" />
                    OFFICIAL WINNERS PUBLISHED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700">
                    <Clock className="w-3.5 h-3.5" />
                    SUMMIT STAGE ARENA
                  </span>
                )}
                {state.has_voted_team_id && (
                  <span className="text-xs font-bold text-spring flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Ballot Cast
                  </span>
                )}
              </div>
              <p
                className={`text-xs sm:text-sm ${
                  state.is_voting_open ? "text-white/80" : "text-navy/70"
                }`}
              >
                {state.is_voting_open
                  ? "Audience voting is live! Vote for your top finalist before the 20-minute countdown expires."
                  : state.results_published
                  ? "The 70% Jury Evaluation and 30% Live Audience Ballot have been calculated. View official rankings on the Leaderboard."
                  : "Finalists build live on stage in Kano (120 minutes). Audience voting unlocks immediately following stage pitches."}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/hackathon/vote"
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-center transition-all shadow-xs ${
                  state.is_voting_open
                    ? "bg-spring text-[#063B18] hover:bg-[#02b25b]"
                    : "bg-pine text-white hover:bg-pine-light"
                }`}
              >
                Go to Voting Ballot
              </Link>
              <Link
                href="/hackathon/leaderboard"
                className="flex-1 md:flex-none px-5 py-2.5 rounded-full border border-neutral-border bg-white text-pine hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider text-center transition-all shadow-2xs"
              >
                Live Leaderboard
              </Link>
            </div>
          </div>
        )}

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
              <Vote className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-neutral-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
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
              All Finalists ({finalists.length})
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

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by designer or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-9 pr-4 rounded-xl border border-neutral-border bg-neutral-sand/20 hover:bg-white focus:bg-white text-xs sm:text-sm font-medium text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 focus:border-pine transition-all"
            />
          </div>
        </div>

        {/* Finalist Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-pine animate-spin mx-auto" />
            <p className="text-xs font-semibold text-pine uppercase tracking-wider">
              Loading Finalist Showcase...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-neutral-border space-y-3">
            <Users2 className="w-12 h-12 text-neutral-300 mx-auto" />
            <h4 className="font-bold text-pine text-lg">No finalists found</h4>
            <p className="text-xs text-navy/70">
              Try adjusting your track filter or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((candidate) => {
              const hasVotedThis = state?.has_voted_team_id === candidate.id;
              const hasVotedOther = Boolean(state?.has_voted_team_id && !hasVotedThis);
              const permanentUrl = `${siteUrl}/hackathon/participants/${candidate.id}`;

              return (
                <div
                  key={candidate.id}
                  className={`rounded-3xl bg-white border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                    hasVotedThis
                      ? "border-[#00CB67] ring-2 ring-[#00CB67]/20"
                      : "border-neutral-border hover:border-pine/30"
                  }`}
                >
                  <div>
                    {/* Top Photo & Badge */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={candidate.avatar_url || "/images/community/ncd_class_training.jpg"}
                        alt={candidate.lead_name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Track Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs border border-white/20">
                          {candidate.track}
                        </span>
                      </div>

                      {/* Winner or Voted Badge */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                        {candidate.is_winner && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-900 shadow-sm flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {candidate.winner_badge || "Winner"}
                          </span>
                        )}
                        {hasVotedThis && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#00CB67] text-[#063B18] shadow-sm flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Your Vote
                          </span>
                        )}
                      </div>

                      {/* Designer Name Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="font-black text-lg sm:text-xl leading-tight">
                          {candidate.lead_name}
                        </h3>
                        <p className="text-white/80 text-xs font-medium truncate">
                          {candidate.professional_title}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-spring">
                          Stage Sprint Concept
                        </span>
                        <h4 className="font-bold text-pine text-base leading-snug mt-0.5">
                          {candidate.project_title}
                        </h4>
                      </div>

                      <p className="text-xs text-navy/75 leading-relaxed line-clamp-3">
                        {candidate.short_description}
                      </p>

                      {/* Vote tally pill */}
                      <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-100">
                        <span className="font-mono text-neutral-500 text-[11px]">
                          Live Audience Share:
                        </span>
                        <span className="font-mono font-bold text-pine">
                          {candidate.votes} votes ({candidate.percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0 border-t border-neutral-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      <Link
                        href={`/hackathon/participants/${candidate.id}`}
                        className="py-2.5 px-3 rounded-xl border border-neutral-border bg-neutral-sand/20 hover:bg-neutral-sand text-pine font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-pine" />
                        <span>View Project</span>
                      </Link>

                      <button
                        onClick={() => setShareCandidate(candidate)}
                        className="py-2.5 px-3 rounded-xl border border-neutral-border bg-white hover:bg-neutral-50 text-pine font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5 text-pine" />
                        <span>Share / QR</span>
                      </button>
                    </div>

                    {/* Quick Vote Button */}
                    <button
                      onClick={() => handleQuickVote(candidate.id, candidate.lead_name)}
                      disabled={hasVotedThis || hasVotedOther || !state?.is_voting_open || votingId === candidate.id}
                      className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        hasVotedThis
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                          : hasVotedOther
                          ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed"
                          : !state?.is_voting_open
                          ? "bg-neutral-100 text-neutral-500 border border-neutral-200 cursor-not-allowed"
                          : "bg-[#00CB67] hover:bg-[#02b25b] text-[#063B18] cursor-pointer"
                      }`}
                    >
                      {votingId === candidate.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting Ballot...</span>
                        </>
                      ) : hasVotedThis ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Vote Recorded</span>
                        </>
                      ) : hasVotedOther ? (
                        <span>Ballot Cast (1 Vote Limit)</span>
                      ) : !state?.is_voting_open ? (
                        <span>Voting Not Active</span>
                      ) : (
                        <>
                          <Vote className="w-3.5 h-3.5" />
                          <span>Vote for {candidate.lead_name.split(" ")[0]}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Share / QR Modal */}
      {shareCandidate && (
        <ContestantQrModal
          isOpen={Boolean(shareCandidate)}
          onClose={() => setShareCandidate(null)}
          candidateName={shareCandidate.lead_name}
          projectTitle={shareCandidate.project_title}
          votingUrl={`${siteUrl}/hackathon/participants/${shareCandidate.id}`}
          avatarUrl={shareCandidate.avatar_url}
        />
      )}
    </main>
  );
}
