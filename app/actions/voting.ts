'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { uploadImage } from '@/lib/cloudinary'
import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isLocalDevMode, getLocalStore, saveLocalStore } from '@/lib/supabase/local-db'

// -----------------------------------------------------------------------------
// Type Definitions
// -----------------------------------------------------------------------------
export interface FinalistCandidate {
  id: string
  hackathon_id: string
  team_name: string
  lead_name: string
  lead_email: string
  lead_phone: string
  team_size: number
  track: string
  professional_title: string
  avatar_url: string
  project_title: string
  short_description: string
  detailed_description: string
  problem_statement: string
  proposed_solution: string
  target_audience: string
  presentation_url?: string | null
  portfolio_url?: string | null
  status: 'applied' | 'shortlisted' | 'stage_finalist' | 'winner'
  is_winner?: boolean
  winner_badge?: string | null
  votes: number
  percentage: number
  rank?: number
}

export interface HackathonPublicState {
  id: string
  title: string
  status: 'upcoming' | 'active' | 'voting' | 'completed'
  sprint_duration_minutes: number
  voting_duration_minutes: number
  voting_starts_at: string | null
  voting_ends_at: string | null
  is_voting_open: boolean
  remaining_seconds: number
  results_published: boolean
  total_votes: number
  has_voted_team_id: string | null
  voter_token?: string
}

export interface LeaderboardEntry {
  rank: number
  id: string
  team_name: string
  lead_name: string
  professional_title: string
  avatar_url: string
  track: string
  project_title: string
  votes: number
  percentage: number
  is_winner?: boolean
  winner_badge?: string | null
  // Jury & Weighted Scores (only populated when results published)
  jury_score?: number
  audience_score?: number
  final_score?: number
}

export interface JuryScoreInput {
  hackathon_id: string
  team_id: string
  judge_name: string
  judge_email?: string
  cultural_semiotics: number // 0-25
  problem_solution: number   // 0-25
  craft_execution: number    // 0-25
  presentation: number       // 0-25
  feedback?: string
  status?: 'draft' | 'locked'
}

export interface JuryTeamSummary {
  team_id: string
  team_name: string
  lead_name: string
  track: string
  project_title: string
  judge_count: number
  avg_jury_score: number     // 0-100
  audience_votes: number
  audience_score: number     // (votes / totalVotes) * 100
  final_weighted_score: number // (jury * 0.7) + (audience * 0.3)
  rank: number
  is_winner: boolean
  winner_badge?: string | null
  scores: Array<{
    id: string
    judge_name: string
    cultural_semiotics: number
    problem_solution: number
    craft_execution: number
    presentation: number
    total_score: number
    feedback?: string | null
    status: string
  }>
}

const DEFAULT_PUBLIC_STATE: HackathonPublicState = {
  id: '',
  title: 'Northern Design Hackathon 2.0',
  status: 'upcoming',
  sprint_duration_minutes: 120,
  voting_duration_minutes: 20,
  voting_starts_at: null,
  voting_ends_at: null,
  is_voting_open: false,
  remaining_seconds: 0,
  results_published: false,
  total_votes: 0,
  has_voted_team_id: null,
}

// -----------------------------------------------------------------------------
// Database Helper: Authoritative Active/Latest Hackathon in Supabase
// -----------------------------------------------------------------------------
async function getActiveOrLatestHackathon(adminSupabase: ReturnType<typeof createAdminClient>) {
  // 1. Check for active or voting hackathon
  const { data: activeH, error: activeErr } = await adminSupabase
    .from('hackathons')
    .select('*')
    .in('status', ['active', 'voting'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (activeErr) throw activeErr
  if (activeH) return activeH

  // 2. Otherwise get the latest hackathon
  const { data: latestH, error: latestErr } = await adminSupabase
    .from('hackathons')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (latestErr) throw latestErr
  if (latestH) return latestH

  // 3. If hackathons table is empty, auto-initialize the Summit 2.0 hackathon row in Supabase
  const { data: event } = await adminSupabase
    .from('events')
    .select('id')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  let eventId = event?.id
  if (!eventId) {
    const { data: newEvent, error: newEventErr } = await adminSupabase
      .from('events')
      .insert({
        slug: 'summit-2-0',
        name: 'Northern Creative Designers Summit 2.0',
        edition: '2.0',
        theme: 'Roots & Vectors: Pioneering Contemporary African Design Systems',
        venue: 'Kano, Northern Nigeria',
        city: 'Kano',
        country: 'Nigeria',
        event_date: '2026-12-19T09:00:00Z',
        is_active: true,
        registration_open: true,
        voting_open: true,
      })
      .select('id')
      .single()

    if (newEventErr) throw newEventErr
    eventId = newEvent.id
  }

  const { data: createdHackathon, error: createErr } = await adminSupabase
    .from('hackathons')
    .insert({
      id: 'a0000000-0000-0000-0000-000000000001',
      event_id: eventId,
      title: 'Roots & Vectors: 2-Hour Live Stage Design Sprint',
      sprint_duration_minutes: 120,
      voting_duration_minutes: 20,
      status: 'upcoming',
      results_published: false,
    })
    .select('*')
    .single()

  if (createErr) throw createErr
  return createdHackathon
}

// -----------------------------------------------------------------------------
// Helper: Secure Voter Token
// -----------------------------------------------------------------------------
async function getOrCreateVoterToken(): Promise<string> {
  const cookieStore = await cookies()
  let token = cookieStore.get('ncd_voter_token')?.value

  if (!token) {
    token = `voter_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`
    cookieStore.set('ncd_voter_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }

  return token
}

async function getClientIp(): Promise<string> {
  const headerStore = await headers()
  return (
    headerStore.get('cf-connecting-ip') ||
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    '127.0.0.1'
  )
}

// -----------------------------------------------------------------------------
// Helper: Audit Log Dispatcher
// -----------------------------------------------------------------------------
async function logAudit(
  adminSupabase: ReturnType<typeof createAdminClient>,
  hackathonId: string | null,
  action: string,
  actor: string,
  details: any,
  ipAddress?: string
) {
  try {
    await adminSupabase.from('hackathon_audit_logs').insert({
      hackathon_id: hackathonId,
      action,
      actor,
      details,
      ip_address: ipAddress || null,
    })
  } catch {
    // Non-fatal audit log failure
  }
}

// -----------------------------------------------------------------------------
// 1. Get Hackathon Public State
// -----------------------------------------------------------------------------
export async function getHackathonPublicStateAction(): Promise<{
  success: boolean
  state: HackathonPublicState
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return {
        success: true,
        state: DEFAULT_PUBLIC_STATE,
      }
    }

    const voterToken = await getOrCreateVoterToken()

    const [{ count: voteCount, error: vErr }, { data: userVote, error: uvErr }] =
      await Promise.all([
        adminSupabase
          .from('hackathon_votes')
          .select('*', { count: 'exact', head: true })
          .eq('hackathon_id', hackathon.id),
        adminSupabase
          .from('hackathon_votes')
          .select('team_id')
          .eq('hackathon_id', hackathon.id)
          .eq('voter_token', voterToken)
          .maybeSingle(),
      ])

    if (vErr) throw vErr
    if (uvErr) throw uvErr

    const now = Date.now()
    const votingEndsAt = hackathon.voting_ends_at ? new Date(hackathon.voting_ends_at).getTime() : 0
    const isTimerActive = hackathon.status === 'voting' && votingEndsAt > now
    const isVotingOpen = hackathon.status === 'voting' && (votingEndsAt === 0 || votingEndsAt > now)
    const remainingSeconds = isTimerActive ? Math.max(0, Math.floor((votingEndsAt - now) / 1000)) : 0

    return {
      success: true,
      state: {
        id: hackathon.id,
        title: hackathon.title,
        status: hackathon.status as any,
        sprint_duration_minutes: hackathon.sprint_duration_minutes || 120,
        voting_duration_minutes: hackathon.voting_duration_minutes || 20,
        voting_starts_at: hackathon.voting_starts_at ?? null,
        voting_ends_at: hackathon.voting_ends_at ?? null,
        is_voting_open: isVotingOpen,
        remaining_seconds: remainingSeconds,
        results_published: Boolean(hackathon.results_published),
        total_votes: voteCount || 0,
        has_voted_team_id: userVote?.team_id || null,
        voter_token: voterToken,
      },
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] getHackathonPublicStateAction:', err)
    return {
      success: false,
      state: DEFAULT_PUBLIC_STATE,
      error: err instanceof Error ? err.message : 'Database error fetching voting state.',
    }
  }
}

// -----------------------------------------------------------------------------
// 2. Get Finalists List (Filterable, Searchable)
// -----------------------------------------------------------------------------
export async function getHackathonFinalistsAction(options?: {
  track?: string
  search?: string
  includeAllStatuses?: boolean
}): Promise<{
  success: boolean
  finalists: FinalistCandidate[]
  totalVotes: number
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: true, finalists: [], totalVotes: 0 }
    }

    let query = adminSupabase
      .from('hackathon_teams')
      .select('*')
      .eq('hackathon_id', hackathon.id)

    if (!options?.includeAllStatuses) {
      query = query.in('status', ['stage_finalist', 'winner'])
    }

    const [{ data: teamsData, error: tErr }, { data: votesData, error: vErr }] =
      await Promise.all([
        query.order('created_at', { ascending: true }),
        adminSupabase.from('hackathon_votes').select('team_id').eq('hackathon_id', hackathon.id),
      ])

    if (tErr) throw tErr
    if (vErr) throw vErr

    const rawTeams = teamsData || []
    const rawVotes = votesData || []

    const totalVotes = rawVotes.length
    const voteMap = new Map<string, number>()
    rawVotes.forEach((v) => {
      voteMap.set(v.team_id, (voteMap.get(v.team_id) || 0) + 1)
    })

    let finalists: FinalistCandidate[] = rawTeams.map((t) => {
      const count = voteMap.get(t.id) || 0
      const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
      return {
        id: t.id,
        hackathon_id: t.hackathon_id,
        team_name: t.team_name,
        lead_name: t.lead_name,
        lead_email: t.lead_email,
        lead_phone: t.lead_phone,
        team_size: t.team_size || 1,
        track: t.track,
        professional_title: t.professional_title || 'Competitor Designer',
        avatar_url: t.avatar_url || '/images/community/ncd_class_training.jpg',
        project_title: t.project_title || t.team_name,
        short_description: t.short_description || '',
        detailed_description: t.detailed_description || '',
        problem_statement: t.problem_statement || '',
        proposed_solution: t.proposed_solution || '',
        target_audience: t.target_audience || '',
        presentation_url: t.presentation_url || null,
        portfolio_url: t.portfolio_url || null,
        status: t.status as any,
        is_winner: Boolean(t.is_winner),
        winner_badge: t.winner_badge || null,
        votes: count,
        percentage,
      }
    })

    // Apply track filter
    if (options?.track && options.track !== 'all') {
      const trackKey = options.track.toLowerCase()
      finalists = finalists.filter((f) => f.track.toLowerCase().includes(trackKey))
    }

    // Apply search filter
    if (options?.search && options.search.trim()) {
      const term = options.search.trim().toLowerCase()
      finalists = finalists.filter(
        (f) =>
          f.lead_name.toLowerCase().includes(term) ||
          f.team_name.toLowerCase().includes(term) ||
          f.project_title.toLowerCase().includes(term) ||
          f.short_description.toLowerCase().includes(term) ||
          f.track.toLowerCase().includes(term)
      )
    }

    // Rank by votes descending
    finalists.sort((a, b) => b.votes - a.votes)
    finalists.forEach((f, idx) => {
      f.rank = idx + 1
    })

    return {
      success: true,
      finalists,
      totalVotes,
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] getHackathonFinalistsAction:', err)
    return {
      success: false,
      finalists: [],
      totalVotes: 0,
      error: err instanceof Error ? err.message : 'Database error fetching finalists.',
    }
  }
}

// -----------------------------------------------------------------------------
// 3. Get Single Finalist Profile by ID
// -----------------------------------------------------------------------------
export async function getFinalistProfileByIdAction(id: string): Promise<{
  success: boolean
  candidate?: FinalistCandidate
  finalist?: FinalistCandidate
  isVotingOpen?: boolean
  hasVotedForThis?: boolean
  hasVotedTeamId?: string | null
  hackathonState?: HackathonPublicState
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const { data: team, error: tErr } = await adminSupabase
      .from('hackathon_teams')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (tErr) throw tErr
    if (!team) {
      return { success: false, error: 'Participant profile not found in database.' }
    }

    const voterToken = await getOrCreateVoterToken()

    const { data: hackathon, error: hErr } = await adminSupabase
      .from('hackathons')
      .select('*')
      .eq('id', team.hackathon_id)
      .single()

    if (hErr) throw hErr

    const [{ count: totalVotes }, { count: teamVotes }, { data: userVote }] =
      await Promise.all([
        adminSupabase
          .from('hackathon_votes')
          .select('*', { count: 'exact', head: true })
          .eq('hackathon_id', team.hackathon_id),
        adminSupabase
          .from('hackathon_votes')
          .select('*', { count: 'exact', head: true })
          .eq('team_id', team.id),
        adminSupabase
          .from('hackathon_votes')
          .select('team_id')
          .eq('hackathon_id', team.hackathon_id)
          .eq('voter_token', voterToken)
          .maybeSingle(),
      ])

    const now = Date.now()
    const votingEndsAt = hackathon.voting_ends_at ? new Date(hackathon.voting_ends_at).getTime() : 0
    const isTimerActive = hackathon.status === 'voting' && votingEndsAt > now
    const isVotingOpen = hackathon.status === 'voting' && (votingEndsAt === 0 || votingEndsAt > now)
    const remainingSeconds = isTimerActive ? Math.max(0, Math.floor((votingEndsAt - now) / 1000)) : 0

    const total = totalVotes || 0
    const candidateVotes = teamVotes || 0
    const percentage = total > 0 ? Math.round((candidateVotes / total) * 100) : 0

    const candidate: FinalistCandidate = {
      id: team.id,
      hackathon_id: team.hackathon_id,
      team_name: team.team_name,
      lead_name: team.lead_name,
      lead_email: team.lead_email,
      lead_phone: team.lead_phone,
      team_size: team.team_size || 1,
      track: team.track,
      professional_title: team.professional_title || 'Competitor Designer',
      avatar_url: team.avatar_url || '/images/community/ncd_class_training.jpg',
      project_title: team.project_title || team.team_name,
      short_description: team.short_description || '',
      detailed_description: team.detailed_description || '',
      problem_statement: team.problem_statement || '',
      proposed_solution: team.proposed_solution || '',
      target_audience: team.target_audience || '',
      presentation_url: team.presentation_url || null,
      portfolio_url: team.portfolio_url || null,
      status: team.status as any,
      is_winner: Boolean(team.is_winner),
      winner_badge: team.winner_badge || null,
      votes: candidateVotes,
      percentage,
    }

    const hackathonState: HackathonPublicState = {
      id: hackathon.id,
      title: hackathon.title,
      status: hackathon.status as any,
      sprint_duration_minutes: hackathon.sprint_duration_minutes || 120,
      voting_duration_minutes: hackathon.voting_duration_minutes || 20,
      voting_starts_at: hackathon.voting_starts_at ?? null,
      voting_ends_at: hackathon.voting_ends_at ?? null,
      is_voting_open: isVotingOpen,
      remaining_seconds: remainingSeconds,
      results_published: Boolean(hackathon.results_published),
      total_votes: total,
      has_voted_team_id: userVote?.team_id || null,
      voter_token: voterToken,
    }

    const hasVotedForThis = userVote?.team_id === team.id
    const hasVotedTeamId = userVote?.team_id || null

    return {
      success: true,
      candidate,
      finalist: candidate,
      isVotingOpen,
      hasVotedForThis,
      hasVotedTeamId,
      hackathonState,
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] getFinalistProfileByIdAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database error fetching participant profile.',
    }
  }
}

// -----------------------------------------------------------------------------
// 4. Secure Public Vote Action
// -----------------------------------------------------------------------------
export async function castPublicVoteAction(teamId: string): Promise<{
  success: boolean
  message?: string
  hasVotedTeamId?: string
  totalVotes?: number
  updatedVotesForTeam?: number
  error?: string
}> {
  try {
    const voterToken = await getOrCreateVoterToken()
    const clientIp = await getClientIp()
    const now = Date.now()

    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: false, error: 'No active hackathon event found.' }
    }

    // 1. Authoritative voting window checks
    const votingEndsAt = hackathon.voting_ends_at ? new Date(hackathon.voting_ends_at).getTime() : 0
    const isVotingActive = hackathon.status === 'voting' && (votingEndsAt === 0 || votingEndsAt > now)

    if (!isVotingActive) {
      if (hackathon.status === 'upcoming') {
        return { success: false, error: 'Voting has not yet opened for Northern Design Hackathon 2.0.' }
      }
      if (hackathon.status === 'completed' || (votingEndsAt > 0 && votingEndsAt <= now)) {
        return { success: false, error: 'The live voting window has officially closed. No further ballots can be accepted.' }
      }
      return { success: false, error: 'Voting is not currently active.' }
    }

    // 2. Validate contestant eligibility (must be stage_finalist or winner and belong to this hackathon)
    const { data: contestant, error: cErr } = await adminSupabase
      .from('hackathon_teams')
      .select('id, lead_name, team_name, status, hackathon_id')
      .eq('id', teamId)
      .maybeSingle()

    if (cErr) throw cErr
    if (!contestant || contestant.hackathon_id !== hackathon.id) {
      return { success: false, error: 'Selected contestant was not found in this hackathon.' }
    }
    if (contestant.status !== 'stage_finalist' && contestant.status !== 'winner') {
      return { success: false, error: 'Selected contestant is not an active finalist eligible for public votes.' }
    }

    // 3. Prevent duplicate vote for this voterToken
    const { data: existingVote, error: evErr } = await adminSupabase
      .from('hackathon_votes')
      .select('id, team_id')
      .eq('hackathon_id', hackathon.id)
      .eq('voter_token', voterToken)
      .maybeSingle()

    if (evErr) throw evErr
    if (existingVote) {
      return {
        success: false,
        error: 'You have already cast your official vote for this hackathon sprint. Each voter may cast only 1 vote.',
      }
    }

    // 4. Rate-limit protection: throttle rapid vote spam per IP
    const oneMinuteAgo = new Date(now - 60 * 1000).toISOString()
    const { count: ipRecentCount } = await adminSupabase
      .from('hackathon_votes')
      .select('*', { count: 'exact', head: true })
      .eq('hackathon_id', hackathon.id)
      .eq('ip_hash', clientIp)
      .gte('created_at', oneMinuteAgo)

    if ((ipRecentCount || 0) >= 10) {
      return {
        success: false,
        error: 'Too many voting requests received from your network. Please wait a moment.',
      }
    }

    // 5. Database insert
    const { error: insertErr } = await adminSupabase
      .from('hackathon_votes')
      .insert({
        hackathon_id: hackathon.id,
        team_id: teamId,
        voter_token: voterToken,
        ip_hash: clientIp,
      })

    if (insertErr) {
      if (insertErr.code === '23505') {
        return {
          success: false,
          error: 'You have already cast your vote. Duplicate ballots are rejected by server constraints.',
        }
      }
      throw insertErr
    }

    // 6. Record audit log
    await logAudit(
      adminSupabase,
      hackathon.id,
      'cast_vote',
      'public_voter',
      {
        team_id: teamId,
        contestant_name: contestant.lead_name,
        voter_token_prefix: voterToken.substring(0, 10),
      },
      clientIp
    )

    // 7. Fetch verified totals directly from database
    const [{ count: newTotal }, { count: teamTotal }] = await Promise.all([
      adminSupabase
        .from('hackathon_votes')
        .select('*', { count: 'exact', head: true })
        .eq('hackathon_id', hackathon.id),
      adminSupabase
        .from('hackathon_votes')
        .select('*', { count: 'exact', head: true })
        .eq('hackathon_id', hackathon.id)
        .eq('team_id', teamId),
    ])

    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath(`/hackathon/participants/${teamId}`)

    return {
      success: true,
      message: `Official vote confirmed for ${contestant.lead_name}! Thank you for supporting Northern design excellence.`,
      hasVotedTeamId: teamId,
      totalVotes: newTotal || 1,
      updatedVotesForTeam: teamTotal || 1,
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] castPublicVoteAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database failure while recording vote. Please try again.',
    }
  }
}

// -----------------------------------------------------------------------------
// 5. Live Leaderboard Action
// -----------------------------------------------------------------------------
export async function getLiveLeaderboardAction(): Promise<{
  success: boolean
  leaderboard: LeaderboardEntry[]
  totalVotes: number
  votingStatus: string
  isVotingOpen: boolean
  votingEndsAt: string | null
  remainingSeconds: number
  resultsPublished: boolean
  lastUpdated: string
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return {
        success: true,
        leaderboard: [],
        totalVotes: 0,
        votingStatus: 'upcoming',
        isVotingOpen: false,
        votingEndsAt: null,
        remainingSeconds: 0,
        resultsPublished: false,
        lastUpdated: new Date().toLocaleTimeString(),
      }
    }

    const now = Date.now()
    const votingEndsAt = hackathon.voting_ends_at ? new Date(hackathon.voting_ends_at).getTime() : 0
    const isTimerActive = hackathon.status === 'voting' && votingEndsAt > now
    const isVotingOpen = hackathon.status === 'voting' && (votingEndsAt === 0 || votingEndsAt > now)
    const remainingSeconds = isTimerActive ? Math.max(0, Math.floor((votingEndsAt - now) / 1000)) : 0

    // Fetch teams, votes, and jury scores
    const [
      { data: teamsData, error: tErr },
      { data: votesData, error: vErr },
      { data: juryScoresData, error: jErr },
    ] = await Promise.all([
      adminSupabase
        .from('hackathon_teams')
        .select('*')
        .eq('hackathon_id', hackathon.id)
        .in('status', ['stage_finalist', 'winner']),
      adminSupabase
        .from('hackathon_votes')
        .select('team_id')
        .eq('hackathon_id', hackathon.id),
      adminSupabase
        .from('hackathon_jury_scores')
        .select('*')
        .eq('hackathon_id', hackathon.id),
    ])

    if (tErr) throw tErr
    if (vErr) throw vErr
    if (jErr) throw jErr

    const rawTeams = teamsData || []
    const rawVotes = votesData || []
    const rawJuryScores = juryScoresData || []

    const totalVotes = rawVotes.length
    const voteMap = new Map<string, number>()
    rawVotes.forEach((v) => {
      voteMap.set(v.team_id, (voteMap.get(v.team_id) || 0) + 1)
    })

    const juryMap = new Map<string, number[]>()
    rawJuryScores.forEach((s) => {
      const arr = juryMap.get(s.team_id) || []
      arr.push(Number(s.total_score) || 0)
      juryMap.set(s.team_id, arr)
    })

    const resultsPublished = Boolean(hackathon.results_published)

    let entries: LeaderboardEntry[] = rawTeams.map((t) => {
      const count = voteMap.get(t.id) || 0
      const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
      const audienceScore = totalVotes > 0 ? Number(((count / totalVotes) * 100).toFixed(1)) : 0

      const scores = juryMap.get(t.id) || []
      const avgJuryScore =
        scores.length > 0
          ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1))
          : 0

      // Official 70% Jury + 30% Audience Formula
      const finalScore = Number((avgJuryScore * 0.7 + audienceScore * 0.3).toFixed(1))

      return {
        rank: 1,
        id: t.id,
        team_name: t.team_name,
        lead_name: t.lead_name,
        professional_title: t.professional_title || 'Competitor Designer',
        avatar_url: t.avatar_url || '/images/community/ncd_class_training.jpg',
        track: t.track,
        project_title: t.project_title || t.team_name,
        votes: count,
        percentage,
        is_winner: Boolean(t.is_winner),
        winner_badge: t.winner_badge || null,
        jury_score: resultsPublished ? avgJuryScore : undefined,
        audience_score: resultsPublished ? audienceScore : undefined,
        final_score: resultsPublished ? finalScore : undefined,
      }
    })

    if (resultsPublished) {
      entries.sort((a, b) => {
        if ((b.final_score || 0) !== (a.final_score || 0)) {
          return (b.final_score || 0) - (a.final_score || 0)
        }
        if ((b.jury_score || 0) !== (a.jury_score || 0)) {
          return (b.jury_score || 0) - (a.jury_score || 0)
        }
        return b.votes - a.votes
      })
    } else {
      entries.sort((a, b) => b.votes - a.votes)
    }

    entries.forEach((entry, idx) => {
      entry.rank = idx + 1
    })

    return {
      success: true,
      leaderboard: entries,
      totalVotes,
      votingStatus: hackathon.status,
      isVotingOpen,
      votingEndsAt: hackathon.voting_ends_at ?? null,
      remainingSeconds,
      resultsPublished,
      lastUpdated: new Date().toLocaleTimeString(),
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] getLiveLeaderboardAction:', err)
    return {
      success: false,
      leaderboard: [],
      totalVotes: 0,
      votingStatus: 'upcoming',
      isVotingOpen: false,
      votingEndsAt: null,
      remainingSeconds: 0,
      resultsPublished: false,
      lastUpdated: new Date().toLocaleTimeString(),
      error: err instanceof Error ? err.message : 'Database error loading leaderboard.',
    }
  }
}

// -----------------------------------------------------------------------------
// 6. Admin: Set Live Voting Status & Countdown Timer
// -----------------------------------------------------------------------------
export async function adminSetVotingStatusAction(
  status: 'upcoming' | 'active' | 'voting' | 'completed',
  durationMinutes: number = 20
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (isLocalDevMode()) {
      const store = getLocalStore()
      if (store.hackathons && store.hackathons[0]) {
        store.hackathons[0].status = status
        saveLocalStore(store)
      }
      revalidatePath('/hackathon')
      revalidatePath('/hackathon/vote')
      revalidatePath('/admin')
      return {
        success: true,
        message: status === 'voting' ? 'Live voting window opened.' : 'Voting status updated.',
      }
    }

    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: false, error: 'No active hackathon event found.' }
    }

    const updatePayload: any = {
      status,
      voting_duration_minutes: durationMinutes,
    }

    const now = new Date()
    if (status === 'voting') {
      const endsAt = new Date(now.getTime() + durationMinutes * 60 * 1000)
      updatePayload.voting_starts_at = now.toISOString()
      updatePayload.voting_ends_at = endsAt.toISOString()
    } else if (status === 'upcoming') {
      updatePayload.voting_starts_at = null
      updatePayload.voting_ends_at = null
    }

    const { error } = await adminSupabase
      .from('hackathons')
      .update(updatePayload)
      .eq('id', hackathon.id)

    if (error) throw error

    // Audit log
    await logAudit(adminSupabase, hackathon.id, `set_voting_status_${status}`, 'admin', {
      status,
      durationMinutes,
      voting_starts_at: updatePayload.voting_starts_at,
      voting_ends_at: updatePayload.voting_ends_at,
    })

    revalidatePath('/hackathon')
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    return {
      success: true,
      message:
        status === 'voting'
          ? `Live voting window opened for ${durationMinutes} minutes.`
          : `Hackathon voting status updated to '${status}'.`,
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminSetVotingStatusAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database failure updating hackathon voting status.',
    }
  }
}

// -----------------------------------------------------------------------------
// 7. Admin: Update Finalist Profile & Pitch Information
// -----------------------------------------------------------------------------
export async function adminUpdateFinalistAction(
  teamId: string,
  payload: {
    professional_title?: string
    avatar_url?: string
    project_title?: string
    short_description?: string
    detailed_description?: string
    problem_statement?: string
    proposed_solution?: string
    target_audience?: string
    presentation_url?: string
    portfolio_url?: string
    status?: 'applied' | 'shortlisted' | 'stage_finalist' | 'winner'
    is_winner?: boolean
    winner_badge?: string | null
    track?: string
    lead_name?: string
    team_name?: string
  }
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const adminSupabase = createAdminClient()

    const updateFields: any = {}
    if (payload.professional_title !== undefined) updateFields.professional_title = payload.professional_title
    if (payload.avatar_url !== undefined) updateFields.avatar_url = payload.avatar_url
    if (payload.project_title !== undefined) updateFields.project_title = payload.project_title
    if (payload.short_description !== undefined) updateFields.short_description = payload.short_description
    if (payload.detailed_description !== undefined) updateFields.detailed_description = payload.detailed_description
    if (payload.problem_statement !== undefined) updateFields.problem_statement = payload.problem_statement
    if (payload.proposed_solution !== undefined) updateFields.proposed_solution = payload.proposed_solution
    if (payload.target_audience !== undefined) updateFields.target_audience = payload.target_audience
    if (payload.presentation_url !== undefined) updateFields.presentation_url = payload.presentation_url
    if (payload.portfolio_url !== undefined) updateFields.portfolio_url = payload.portfolio_url
    if (payload.status !== undefined) updateFields.status = payload.status
    if (payload.is_winner !== undefined) updateFields.is_winner = payload.is_winner
    if (payload.winner_badge !== undefined) updateFields.winner_badge = payload.winner_badge
    if (payload.track !== undefined) updateFields.track = payload.track
    if (payload.lead_name !== undefined) updateFields.lead_name = payload.lead_name
    if (payload.team_name !== undefined) updateFields.team_name = payload.team_name

    const { error } = await adminSupabase
      .from('hackathon_teams')
      .update(updateFields)
      .eq('id', teamId)

    if (error) throw error

    // Audit log
    await logAudit(adminSupabase, null, 'update_finalist_profile', 'admin', {
      team_id: teamId,
      updated_fields: Object.keys(updateFields),
    })

    revalidatePath('/hackathon/participants')
    revalidatePath(`/hackathon/participants/${teamId}`)
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/admin')

    return {
      success: true,
      message: 'Contestant profile and presentation data successfully saved to Supabase.',
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminUpdateFinalistAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database error updating contestant profile.',
    }
  }
}

// -----------------------------------------------------------------------------
// 8. Admin: Upload Finalist Photo to Persistent Storage
// -----------------------------------------------------------------------------
export async function adminUploadFinalistPhotoAction(
  base64DataUri: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!base64DataUri) {
      return { success: false, error: 'No image data provided.' }
    }

    // 1. Check Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const cloudKey = process.env.CLOUDINARY_API_KEY
    if (cloudName && !cloudName.includes('your-cloud') && cloudKey && !cloudKey.includes('your-')) {
      const res = await uploadImage(base64DataUri, 'ncd-summit/hackathon-finalists')
      if (res.success && res.url) {
        return { success: true, url: res.url }
      }
    }

    // 2. Fallback to Supabase Storage bucket 'hackathon-avatars'
    try {
      const adminSupabase = createAdminClient()
      const matches = base64DataUri.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/)
      if (matches) {
        const mimeType = matches[1]
        const ext = mimeType.split('/')[1] || 'jpg'
        const base64Data = matches[2]
        const buffer = Buffer.from(base64Data, 'base64')
        const fileName = `finalist_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`

        const { error: uploadError } = await adminSupabase.storage
          .from('hackathon-avatars')
          .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true,
          })

        if (!uploadError) {
          const { data: publicUrlData } = adminSupabase.storage
            .from('hackathon-avatars')
            .getPublicUrl(fileName)

          if (publicUrlData?.publicUrl) {
            return { success: true, url: publicUrlData.publicUrl }
          }
        }
      }
    } catch {
      // Storage bucket not configured or error
    }

    return {
      success: false,
      error: 'Image storage service is not configured. Please configure Cloudinary or Supabase Storage credentials in settings.',
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error uploading profile image.',
    }
  }
}

// -----------------------------------------------------------------------------
// 9. Admin: Save Jury Scores across 4 Rubric Criteria
// -----------------------------------------------------------------------------
export async function adminSaveJuryScoreAction(
  input: JuryScoreInput
): Promise<{ success: boolean; message?: string; totalScore?: number; error?: string }> {
  try {
    const adminSupabase = createAdminClient()

    // Validate and clamp each rubric criterion (0-25)
    const cultural = Math.min(25, Math.max(0, Number(input.cultural_semiotics) || 0))
    const problem = Math.min(25, Math.max(0, Number(input.problem_solution) || 0))
    const craft = Math.min(25, Math.max(0, Number(input.craft_execution) || 0))
    const presentation = Math.min(25, Math.max(0, Number(input.presentation) || 0))
    const totalScore = Number((cultural + problem + craft + presentation).toFixed(2))

    const judgeName = input.judge_name.trim()
    if (!judgeName) {
      return { success: false, error: 'Judge name is required.' }
    }

    const { error: upsertErr } = await adminSupabase
      .from('hackathon_jury_scores')
      .upsert(
        {
          hackathon_id: input.hackathon_id,
          team_id: input.team_id,
          judge_name: judgeName,
          judge_email: input.judge_email?.trim() || null,
          cultural_semiotics: cultural,
          problem_solution: problem,
          craft_execution: craft,
          presentation,
          total_score: totalScore,
          feedback: input.feedback?.trim() || null,
          status: input.status || 'draft',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'hackathon_id,team_id,judge_name' }
      )

    if (upsertErr) throw upsertErr

    // Audit log
    await logAudit(adminSupabase, input.hackathon_id, 'save_jury_score', judgeName, {
      team_id: input.team_id,
      total_score: totalScore,
      criteria: { cultural, problem, craft, presentation },
    })

    revalidatePath('/admin')
    revalidatePath('/hackathon/leaderboard')

    return {
      success: true,
      message: `Evaluation recorded for ${judgeName}: ${totalScore}/100 total score.`,
      totalScore,
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminSaveJuryScoreAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database failure while recording jury score.',
    }
  }
}

// -----------------------------------------------------------------------------
// 10. Admin: Get Jury and 70/30 Weighted Final Results
// -----------------------------------------------------------------------------
export async function adminGetJuryAndWeightedResultsAction(): Promise<{
  success: boolean
  summaries: JuryTeamSummary[]
  totalVotes: number
  resultsPublished: boolean
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: true, summaries: [], totalVotes: 0, resultsPublished: false }
    }

    const [
      { data: teamsData, error: tErr },
      { data: votesData, error: vErr },
      { data: scoresData, error: sErr },
    ] = await Promise.all([
      adminSupabase
        .from('hackathon_teams')
        .select('*')
        .eq('hackathon_id', hackathon.id)
        .in('status', ['stage_finalist', 'winner']),
      adminSupabase
        .from('hackathon_votes')
        .select('team_id')
        .eq('hackathon_id', hackathon.id),
      adminSupabase
        .from('hackathon_jury_scores')
        .select('*')
        .eq('hackathon_id', hackathon.id),
    ])

    if (tErr) throw tErr
    if (vErr) throw vErr
    if (sErr) throw sErr

    const rawTeams = teamsData || []
    const rawVotes = votesData || []
    const rawScores = scoresData || []

    const totalVotes = rawVotes.length
    const voteMap = new Map<string, number>()
    rawVotes.forEach((v) => {
      voteMap.set(v.team_id, (voteMap.get(v.team_id) || 0) + 1)
    })

    const scoresByTeam = new Map<string, any[]>()
    rawScores.forEach((s) => {
      const arr = scoresByTeam.get(s.team_id) || []
      arr.push(s)
      scoresByTeam.set(s.team_id, arr)
    })

    const summaries: JuryTeamSummary[] = rawTeams.map((t) => {
      const votes = voteMap.get(t.id) || 0
      const audienceScore = totalVotes > 0 ? Number(((votes / totalVotes) * 100).toFixed(1)) : 0

      const teamScores = scoresByTeam.get(t.id) || []
      const judgeCount = teamScores.length
      const avgJuryScore =
        judgeCount > 0
          ? Number(
              (
                teamScores.reduce((acc, curr) => acc + (Number(curr.total_score) || 0), 0) /
                judgeCount
              ).toFixed(1)
            )
          : 0

      // Official 70% Jury + 30% Audience Formula
      const finalWeightedScore = Number((avgJuryScore * 0.7 + audienceScore * 0.3).toFixed(1))

      return {
        team_id: t.id,
        team_name: t.team_name,
        lead_name: t.lead_name,
        track: t.track,
        project_title: t.project_title || t.team_name,
        judge_count: judgeCount,
        avg_jury_score: avgJuryScore,
        audience_votes: votes,
        audience_score: audienceScore,
        final_weighted_score: finalWeightedScore,
        rank: 1,
        is_winner: Boolean(t.is_winner),
        winner_badge: t.winner_badge || null,
        scores: teamScores.map((s) => ({
          id: s.id,
          judge_name: s.judge_name,
          cultural_semiotics: Number(s.cultural_semiotics) || 0,
          problem_solution: Number(s.problem_solution) || 0,
          craft_execution: Number(s.craft_execution) || 0,
          presentation: Number(s.presentation) || 0,
          total_score: Number(s.total_score) || 0,
          feedback: s.feedback,
          status: s.status,
        })),
      }
    })

    summaries.sort((a, b) => {
      if (b.final_weighted_score !== a.final_weighted_score) {
        return b.final_weighted_score - a.final_weighted_score
      }
      if (b.avg_jury_score !== a.avg_jury_score) {
        return b.avg_jury_score - a.avg_jury_score
      }
      return b.audience_votes - a.audience_votes
    })

    summaries.forEach((s, idx) => {
      s.rank = idx + 1
    })

    return {
      success: true,
      summaries,
      totalVotes,
      resultsPublished: Boolean(hackathon.results_published),
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminGetJuryAndWeightedResultsAction:', err)
    return {
      success: false,
      summaries: [],
      totalVotes: 0,
      resultsPublished: false,
      error: err instanceof Error ? err.message : 'Database failure while computing results.',
    }
  }
}

// -----------------------------------------------------------------------------
// 11. Admin: Publish / Unpublish Official Results
// -----------------------------------------------------------------------------
export async function adminPublishOfficialResultsAction(
  publish: boolean
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: false, error: 'No active hackathon found.' }
    }

    const { error: hErr } = await adminSupabase
      .from('hackathons')
      .update({ results_published: publish })
      .eq('id', hackathon.id)

    if (hErr) throw hErr

    if (publish) {
      const resultsRes = await adminGetJuryAndWeightedResultsAction()
      if (resultsRes.success && resultsRes.summaries.length > 0) {
        for (const item of resultsRes.summaries) {
          const isWinner = item.rank <= 3
          const badge =
            item.rank === 1
              ? 'Grand Champion 1st Place'
              : item.rank === 2
              ? 'First Runner-Up 2nd Place'
              : item.rank === 3
              ? 'Second Runner-Up 3rd Place'
              : null

          await adminSupabase
            .from('hackathon_teams')
            .update({
              is_winner: isWinner,
              winner_badge: badge,
            })
            .eq('id', item.team_id)
        }
      }
    } else {
      await adminSupabase
        .from('hackathon_teams')
        .update({
          is_winner: false,
          winner_badge: null,
        })
        .eq('hackathon_id', hackathon.id)
    }

    // Audit log
    await logAudit(adminSupabase, hackathon.id, publish ? 'publish_official_results' : 'unpublish_official_results', 'admin', {
      results_published: publish,
    })

    revalidatePath('/hackathon')
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    return {
      success: true,
      message: publish
        ? 'Official hackathon results and rankings are now published to the public leaderboard.'
        : 'Official hackathon results have been unpublished. Rankings are now confidential.',
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminPublishOfficialResultsAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database error updating publication state.',
    }
  }
}

// -----------------------------------------------------------------------------
// 12. Admin: Rehearsal Wipe Safety Reset
// -----------------------------------------------------------------------------
export async function adminRehearsalResetVotesAction(
  confirmationText: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (confirmationText.trim() !== 'CONFIRM RESET') {
      return {
        success: false,
        error: "Confirmation text must be exactly 'CONFIRM RESET' to authorize rehearsal vote reset.",
      }
    }

    const adminSupabase = createAdminClient()
    const hackathon = await getActiveOrLatestHackathon(adminSupabase)
    if (!hackathon) {
      return { success: false, error: 'No active hackathon found.' }
    }

    // 1. Delete all votes for this hackathon
    const { error: vDelErr } = await adminSupabase
      .from('hackathon_votes')
      .delete()
      .eq('hackathon_id', hackathon.id)

    if (vDelErr) throw vDelErr

    // 2. Reset hackathon voting state to upcoming
    const { error: hResetErr } = await adminSupabase
      .from('hackathons')
      .update({
        status: 'upcoming',
        voting_starts_at: null,
        voting_ends_at: null,
        results_published: false,
      })
      .eq('id', hackathon.id)

    if (hResetErr) throw hResetErr

    // 3. Clear winner badges
    await adminSupabase
      .from('hackathon_teams')
      .update({
        is_winner: false,
        winner_badge: null,
      })
      .eq('hackathon_id', hackathon.id)

    // 4. Audit log
    await logAudit(adminSupabase, hackathon.id, 'rehearsal_reset_votes', 'admin', {
      timestamp: new Date().toISOString(),
    })

    revalidatePath('/hackathon')
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    return {
      success: true,
      message: 'All test/rehearsal votes have been wiped from Supabase. Voting window reset to upcoming.',
    }
  } catch (err: unknown) {
    console.error('[Hackathon Error] adminRehearsalResetVotesAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Database failure resetting rehearsal votes.',
    }
  }
}
