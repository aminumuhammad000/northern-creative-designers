"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Search,
  Filter,
  Users,
  Presentation,
  ShieldCheck,
  Star,
  ChevronDown,
  X,
  Loader2,
  Check,
  Sliders,
  Scale,
  Sparkles,
  Trophy,
} from "lucide-react";
import { DashboardSidebar, DashboardTopBar } from "@/components/dashboard/DashboardSidebar";
import {
  getJudgeDashboardDataAction,
  saveJudgeEvaluationAction,
  JudgeTeamEvaluationItem,
} from "@/app/actions/hackathon-dashboard";

const DEFAULT_JUDGES = [
  "Judge Aminu Bello (Creative Director)",
  "Judge Hauwa Ibrahim (Design Lead)",
  "Judge Fatima Garba (Brand Strategist)",
  "Judge Usman Aliyu (Product Engineer)",
];

export default function JudgeDashboardPage() {
  const [selectedJudge, setSelectedJudge] = useState<string>(DEFAULT_JUDGES[0]);
  const [customJudgeInput, setCustomJudgeInput] = useState<string>("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"evaluations" | "deliberation">("evaluations");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<JudgeTeamEvaluationItem[]>([]);
  const [stats, setStats] = useState({
    totalTeams: 0,
    evaluatedByMe: 0,
    pendingByMe: 0,
    totalVotes: 0,
  });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | "Brand identity" | "UI/UX">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "evaluated" | "pending">("all");

  // Active Scoring Modal / Drawer
  const [evaluatingTeam, setEvaluatingTeam] = useState<JudgeTeamEvaluationItem | null>(null);
  const [rubricScores, setRubricScores] = useState({
    cultural_semiotics: 20,
    problem_solution: 20,
    craft_execution: 20,
    presentation: 20,
    feedback: "",
    status: "draft" as "draft" | "locked",
  });
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = async (judge: string) => {
    try {
      setIsLoading(true);
      const res = await getJudgeDashboardDataAction(judge);
      if (res.success) {
        setTeams(res.teams);
        setStats(res.stats);
      }
    } catch (err: unknown) {
      console.error("Error loading judge data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedJudge);
  }, [selectedJudge]);

  const handleOpenEvaluation = (team: JudgeTeamEvaluationItem) => {
    setEvaluatingTeam(team);
    if (team.my_score) {
      setRubricScores({
        cultural_semiotics: team.my_score.cultural_semiotics,
        problem_solution: team.my_score.problem_solution,
        craft_execution: team.my_score.craft_execution,
        presentation: team.my_score.presentation,
        feedback: team.my_score.feedback || "",
        status: team.my_score.status || "draft",
      });
    } else {
      setRubricScores({
        cultural_semiotics: 18,
        problem_solution: 18,
        craft_execution: 18,
        presentation: 18,
        feedback: "",
        status: "draft",
      });
    }
  };

  const currentTotalScore =
    Number(rubricScores.cultural_semiotics) +
    Number(rubricScores.problem_solution) +
    Number(rubricScores.craft_execution) +
    Number(rubricScores.presentation);

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingTeam || isSavingScore) return;

    setIsSavingScore(true);
    setToastMessage(null);

    try {
      const res = await saveJudgeEvaluationAction({
        hackathon_id: "a0000000-0000-0000-0000-000000000001",
        team_id: evaluatingTeam.id,
        judge_name: selectedJudge,
        cultural_semiotics: rubricScores.cultural_semiotics,
        problem_solution: rubricScores.problem_solution,
        craft_execution: rubricScores.craft_execution,
        presentation: rubricScores.presentation,
        feedback: rubricScores.feedback,
        status: rubricScores.status,
      });

      if (res.success) {
        setToastMessage({
          type: "success",
          text: `Score saved for ${evaluatingTeam.lead_name}: ${currentTotalScore}/100 total.`,
        });
        setEvaluatingTeam(null);
        await loadData(selectedJudge);
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage({ type: "error", text: res.error || "Failed to save score." });
      }
    } catch {
      setToastMessage({ type: "error", text: "Network error saving score." });
    } finally {
      setIsSavingScore(false);
    }
  };

  // Filtered Teams
  const filteredTeams = teams.filter((t) => {
    if (trackFilter !== "all" && !t.track.toLowerCase().includes(trackFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter === "evaluated" && !t.my_score) return false;
    if (statusFilter === "pending" && t.my_score) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.lead_name.toLowerCase().includes(q);
      const matchProj = t.project_title.toLowerCase().includes(q);
      const matchCity = (t.city || "").toLowerCase().includes(q);
      return matchName || matchProj || matchCity;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <DashboardSidebar
        portalType="judge"
        portalTitle="Jury Deliberation"
        portalBadge="Official Judge"
        userName={selectedJudge.split(" (")[0]}
        userSubtitle="Executive Jury Panel"
        userEmail="jury@summit.org"
        items={[
          {
            id: "evaluations",
            label: "Contestant Pitches",
            icon: Users,
            badge: `${stats.evaluatedByMe}/${stats.totalTeams}`,
          },
          {
            id: "deliberation",
            label: "Decision Matrix & Rank",
            icon: Scale,
            badge: "70/30 Formula",
          },
        ]}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as any)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar
          title={
            activeTab === "evaluations"
              ? "Official Jury Decision & Scoring Portal"
              : "Consolidated Deliberation Matrix"
          }
          subtitle={`Active Judge: ${selectedJudge}`}
          badgeText="Jury 70% Weight"
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        {toastMessage && (
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
                toastMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Top Judge Selector & Quick Stats */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                Official Judge Identity
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedJudge}
                  onChange={(e) => setSelectedJudge(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-pine focus:outline-none focus:ring-2 focus:ring-pine/20 cursor-pointer"
                >
                  {DEFAULT_JUDGES.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                  {customJudgeInput && <option value={customJudgeInput}>{customJudgeInput}</option>}
                </select>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Or type custom judge name"
                    value={customJudgeInput}
                    onChange={(e) => setCustomJudgeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customJudgeInput.trim()) {
                        setSelectedJudge(customJudgeInput.trim());
                      }
                    }}
                    className="h-9 px-3 rounded-xl border border-neutral-200 text-xs text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                  />
                  {customJudgeInput && (
                    <button
                      type="button"
                      onClick={() => setSelectedJudge(customJudgeInput.trim())}
                      className="h-9 px-3 rounded-xl bg-pine text-white text-[11px] font-bold uppercase tracking-wider"
                    >
                      Set
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800">
                <span className="font-bold text-sm block">{stats.evaluatedByMe}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider">Evaluated by You</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800">
                <span className="font-bold text-sm block">{stats.pendingByMe}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider">Awaiting Evaluation</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700">
                <span className="font-bold text-sm block">{stats.totalTeams}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider">Total Finalists</span>
              </div>
            </div>
          </div>

          {/* ================= TAB 1: CONTESTANT PITCHES ================= */}
          {activeTab === "evaluations" && (
            <div className="space-y-5">
              {/* Filter & Search Bar */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search candidate name, project title, or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={trackFilter}
                    onChange={(e) => setTrackFilter(e.target.value as any)}
                    className="h-10 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-pine cursor-pointer"
                  >
                    <option value="all">All Tracks</option>
                    <option value="Brand identity">Brand Identity</option>
                    <option value="UI/UX">UI/UX Track</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="h-10 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-pine cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Evaluation</option>
                    <option value="evaluated">Already Evaluated</option>
                  </select>
                </div>
              </div>

              {/* Contestants Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTeams.map((team) => {
                  const hasEvaluated = Boolean(team.my_score);
                  return (
                    <div
                      key={team.id}
                      className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                    >
                      <div className="p-5 space-y-4">
                        {/* Header: Avatar + Track + Evaluation Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                              <Image
                                src={team.avatar_url || "/images/community/ncd_class_training.jpg"}
                                alt={team.lead_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-pine truncate">
                                {team.lead_name}
                              </h4>
                              <p className="text-[11px] text-neutral-500 truncate">
                                {team.professional_title}
                              </p>
                              {team.city && (
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  {team.city}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-pine/5 text-pine border border-pine/10 shrink-0">
                            {team.track}
                          </span>
                        </div>

                        {/* Project Title & Brief */}
                        <div className="space-y-1.5">
                          <h5 className="text-xs font-bold text-pine line-clamp-1">
                            {team.project_title}
                          </h5>
                          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                            {team.short_description || team.problem_statement || "Live stage execution in Kano."}
                          </p>
                        </div>

                        {/* Pitch Deck / Presentation Link if Available */}
                        {team.presentation_url && (
                          <a
                            href={team.presentation_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-pine hover:text-spring transition-colors"
                          >
                            <Presentation className="w-3.5 h-3.5" />
                            <span>Inspect Slide Deck / Figma</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between gap-3">
                        {hasEvaluated ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Score: {team.my_score?.total_score}/100</span>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400 font-medium italic">
                            Not evaluated yet
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEvaluation(team)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            hasEvaluated
                              ? "bg-white border border-neutral-300 text-pine hover:bg-neutral-100 shadow-2xs"
                              : "bg-pine text-white hover:bg-pine-light shadow-xs"
                          }`}
                        >
                          {hasEvaluated ? "Edit Score" : "Evaluate"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredTeams.length === 0 && (
                <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-2">
                  <p className="text-sm font-bold text-pine">No candidates match your filter.</p>
                  <p className="text-xs text-neutral-500">
                    Try adjusting your search query or track selection.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: DELIBERATION MATRIX & RANKINGS ================= */}
          {activeTab === "deliberation" && (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs space-y-4">
              <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-pine flex items-center gap-2">
                    <Scale className="w-5 h-5 text-spring" />
                    Consolidated 70/30 Deliberation Matrix
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Official rankings combining 70% weighted Jury Rubric Evaluations and 30% Live Audience Ballots.
                  </p>
                </div>
                <div className="text-xs font-mono text-neutral-500">
                  Total Audience Votes: <span className="font-bold text-pine">{stats.totalVotes}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-50 text-[10px] font-mono uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Candidate &amp; Project</th>
                      <th className="py-3 px-4">Track</th>
                      <th className="py-3 px-4 text-center">Judges Count</th>
                      <th className="py-3 px-4 text-center">Avg Jury (70%)</th>
                      <th className="py-3 px-4 text-center">Audience (30%)</th>
                      <th className="py-3 px-4 text-right">Weighted Final</th>
                      <th className="py-3 px-4 text-center">Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {teams.map((t, idx) => {
                      const isChampion = idx === 0;
                      return (
                        <tr
                          key={t.id}
                          className={`hover:bg-neutral-50/70 transition-colors ${
                            isChampion ? "bg-amber-50/40 font-semibold" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                                idx === 0
                                  ? "bg-amber-400 text-neutral-900 font-black shadow-xs"
                                  : idx === 1
                                  ? "bg-neutral-300 text-neutral-800 font-black"
                                  : idx === 2
                                  ? "bg-amber-700/20 text-amber-900 font-bold"
                                  : "text-neutral-500"
                              }`}
                            >
                              {idx + 1}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 min-w-[200px]">
                            <div className="font-bold text-pine">{t.lead_name}</div>
                            <div className="text-[11px] text-neutral-500 truncate max-w-xs">
                              {t.project_title}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 text-pine">
                              {t.track}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono">{t.judge_count}</td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-pine">
                            {t.avg_jury_score.toFixed(1)} / 100
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono text-neutral-600">
                            {t.audience_votes} votes
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-pine">
                            {t.final_weighted_score.toFixed(1)}
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            {idx === 0 ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-neutral-900">
                                1st Champion
                              </span>
                            ) : idx === 1 ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-800">
                                2nd Place
                              </span>
                            ) : idx === 2 ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                                3rd Place
                              </span>
                            ) : (
                              <span className="text-[11px] text-neutral-400">Finalist</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= SCORING MODAL / EVALUATION SHEET ================= */}
      {evaluatingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pine/70 bg-pine/5 px-2 py-0.5 rounded-full">
                  Official Rubric Scoring Sheet
                </span>
                <h3 className="text-xl font-bold text-pine mt-1">
                  Evaluate: {evaluatingTeam.lead_name}
                </h3>
                <p className="text-xs text-neutral-500">
                  {evaluatingTeam.track} Track • Project: {evaluatingTeam.project_title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEvaluatingTeam(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-pine hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Project Context + 4 Rubric Criteria */}
            <form onSubmit={handleSaveEvaluation} className="p-6 space-y-6 text-xs flex-1">
              {/* Project Brief Snippet */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-pine uppercase tracking-wider">
                    Contestant Pitch Summary
                  </span>
                  {evaluatingTeam.presentation_url && (
                    <a
                      href={evaluatingTeam.presentation_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-pine hover:text-spring"
                    >
                      <span>Open Deck Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-neutral-700 leading-relaxed text-xs">
                  {evaluatingTeam.short_description || evaluatingTeam.problem_statement || "No description provided."}
                </p>
              </div>

              {/* Rubric Criteria (4 x 25 points = 100 points) */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-pine uppercase tracking-wider flex items-center justify-between">
                  <span>Official 4-Rubric Scoring (0 - 25 pts each)</span>
                  <span className="text-sm font-black text-pine bg-spring/20 px-3 py-1 rounded-full">
                    Total: {currentTotalScore} / 100
                  </span>
                </h4>

                {/* 1. Cultural Semiotics & Arewa Identity */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-pine text-xs block">
                        1. Cultural Semiotics &amp; Arewa Identity
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Indigenous storytelling, vernacular type, motif authenticity, and regional nuance.
                      </span>
                    </div>
                    <span className="font-mono font-bold text-sm text-pine ml-3">
                      {rubricScores.cultural_semiotics} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.5"
                    value={rubricScores.cultural_semiotics}
                    onChange={(e) =>
                      setRubricScores({ ...rubricScores, cultural_semiotics: Number(e.target.value) })
                    }
                    className="w-full accent-[#013811] cursor-pointer"
                  />
                </div>

                {/* 2. Problem & Solution Rigor */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-pine text-xs block">
                        2. Problem &amp; Solution Rigor
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Problem framing, strategic relevance to Northern Nigeria, clarity of user value.
                      </span>
                    </div>
                    <span className="font-mono font-bold text-sm text-pine ml-3">
                      {rubricScores.problem_solution} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.5"
                    value={rubricScores.problem_solution}
                    onChange={(e) =>
                      setRubricScores({ ...rubricScores, problem_solution: Number(e.target.value) })
                    }
                    className="w-full accent-[#013811] cursor-pointer"
                  />
                </div>

                {/* 3. Craft & Technical Execution */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-pine text-xs block">
                        3. Craft &amp; Technical Execution
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Visual fidelity, typography hierarchy, layout finesse, color theory, product polish.
                      </span>
                    </div>
                    <span className="font-mono font-bold text-sm text-pine ml-3">
                      {rubricScores.craft_execution} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.5"
                    value={rubricScores.craft_execution}
                    onChange={(e) =>
                      setRubricScores({ ...rubricScores, craft_execution: Number(e.target.value) })
                    }
                    className="w-full accent-[#013811] cursor-pointer"
                  />
                </div>

                {/* 4. Presentation & Clarity */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-pine text-xs block">
                        4. Presentation &amp; Delivery Clarity
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Pitch poise, slide deck elegance, articulate defense of design decisions under pressure.
                      </span>
                    </div>
                    <span className="font-mono font-bold text-sm text-pine ml-3">
                      {rubricScores.presentation} / 25
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.5"
                    value={rubricScores.presentation}
                    onChange={(e) =>
                      setRubricScores({ ...rubricScores, presentation: Number(e.target.value) })
                    }
                    className="w-full accent-[#013811] cursor-pointer"
                  />
                </div>
              </div>

              {/* Qualitative Deliberation Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-pine uppercase tracking-wider block">
                  Judge Feedback &amp; Deliberation Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide qualitative critique, strengths, and recommendations for this competitor..."
                  value={rubricScores.feedback}
                  onChange={(e) => setRubricScores({ ...rubricScores, feedback: e.target.value })}
                  className="w-full p-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-pine focus:outline-none focus:ring-1 focus:ring-pine leading-relaxed"
                />
              </div>

              {/* Status Selector: Draft vs Official Locked */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <div>
                  <span className="font-bold text-pine text-xs block">Decision Status</span>
                  <span className="text-[11px] text-neutral-500">
                    Locking prevents accidental overrides during live deliberations.
                  </span>
                </div>
                <select
                  value={rubricScores.status}
                  onChange={(e) => setRubricScores({ ...rubricScores, status: e.target.value as any })}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-pine cursor-pointer"
                >
                  <option value="draft">Draft Evaluation</option>
                  <option value="locked">Official Locked Decision</option>
                </select>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setEvaluatingTeam(null)}
                  className="px-5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingScore}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-pine hover:bg-pine-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSavingScore ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Decision Score</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
