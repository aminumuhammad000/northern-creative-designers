'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import { uploadImage } from '@/lib/cloudinary'
import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

// Type Definitions
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

// -----------------------------------------------------------------------------
// Local JSON Storage Fallback (Ensures 100% functionality during local dev/preview)
// -----------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), '.data')
const DB_FILE = path.join(DATA_DIR, 'hackathon-db.json')

function getInitialLocalData() {
  const defaultHackathonId = 'a0000000-0000-0000-0000-000000000001'
  return {
    hackathons: [
      {
        id: defaultHackathonId,
        event_id: '00000000-0000-0000-0000-000000000000',
        title: 'Roots & Vectors: 2-Hour Live Stage Design Sprint',
        sprint_duration_minutes: 120,
        voting_duration_minutes: 20,
        voting_starts_at: null,
        voting_ends_at: null,
        status: 'voting', // default open in preview mode so user can test immediately
        results_published: false,
        is_rehearsal: false,
      },
    ],
    teams: [
      {
        id: 'b0000000-0000-0000-0000-000000000001',
        hackathon_id: defaultHackathonId,
        team_name: 'Fatima Sani (Arewa Heritage UI)',
        lead_name: 'Fatima Sani',
        lead_email: 'fatima.sani@example.com',
        lead_phone: '0803 111 2233',
        team_size: 1,
        track: 'UI/UX & Mobile Products',
        professional_title: 'Lead Product & Interaction Designer',
        avatar_url: '/images/community/ncd_student_showcase.jpg',
        project_title: 'Kano Heritage UI: Hausa Motif Design System',
        short_description: 'An accessible, culturally-grounded design system translating indigenous Hausa architecture into scalable mobile interfaces.',
        detailed_description: 'Kano Heritage UI digitizes Northern Nigerian geometric patterns and decorative wall motifs (Zanen Gida) into WCAG-compliant design tokens, icon sets, and React components tailored for financial and e-commerce apps across the Sahel region.',
        problem_statement: 'Modern Northern Nigerian fintech apps lack localized cultural resonance and accessibility for bilingual Hausa-English speakers.',
        proposed_solution: 'A unified vector design kit with typography optimized for Arewa cultural identity and high-contrast accessibility.',
        target_audience: 'Northern Nigerian digital product designers, mobile app builders, and regional technology startups.',
        presentation_url: 'https://figma.com/@ncd_heritage_ui',
        portfolio_url: 'https://behance.net/fatimasani',
        status: 'stage_finalist',
        is_winner: false,
        winner_badge: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 'b0000000-0000-0000-0000-000000000002',
        hackathon_id: defaultHackathonId,
        team_name: 'Aliyu Umar (Vector Craft Studio)',
        lead_name: 'Aliyu Umar',
        lead_email: 'aliyu.umar@example.com',
        lead_phone: '0803 444 5566',
        team_size: 1,
        track: 'Brand Identity Systems',
        professional_title: 'Brand Identity & Visual Typographer',
        avatar_url: '/images/community/ncd_class_training.jpg',
        project_title: 'Tafarki Craft: Contemporary Leather Branding',
        short_description: 'A contemporary visual identity and sustainable packaging system rooted in centuries-old Kano tannery craftsmanship.',
        detailed_description: 'Tafarki Craft synthesizes traditional vegetal tanning textures, stamp marks, and Arabic-Hausa calligraphic vectors into an export-ready brand packaging suite for artisan tanners.',
        problem_statement: 'Generational Northern leathercraft artisans struggle to access global luxury markets due to obsolete packaging and unstandardized visual identities.',
        proposed_solution: 'A modern luxury branding standard with QR-verified authenticity certificates, tactile box packaging, and localized typography.',
        target_audience: 'Artisanal leather cooperatives, fashion designers, and international luxury craft distributors.',
        presentation_url: 'https://behance.net/gallery/tafarki_craft',
        portfolio_url: 'https://dribbble.com/aliyu-craft',
        status: 'stage_finalist',
        is_winner: false,
        winner_badge: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 'b0000000-0000-0000-0000-000000000003',
        hackathon_id: defaultHackathonId,
        team_name: 'Zainab Abubakar (Northern Motion Lab)',
        lead_name: 'Zainab Abubakar',
        lead_email: 'zainab.abubakar@example.com',
        lead_phone: '0803 777 8899',
        team_size: 1,
        track: 'UI/UX & Mobile Products',
        professional_title: 'Creative Director & 3D Interactive Specialist',
        avatar_url: '/images/community/ncd_peer_interaction.jpg',
        project_title: 'Arewa Archives: 3D Folklore Interactive',
        short_description: 'An immersive web-based 3D digital museum preserving historical Northern artifacts, folklore, and textiles.',
        detailed_description: 'Arewa Archives brings classical Sahelian artifacts, royal regalia, and oral histories to life through real-time WebGL interactive 3D models and spatial audio recordings.',
        problem_statement: 'Historical Arewa cultural relics are scattered and under-documented in digital educational curricula for youth.',
        proposed_solution: 'An open web-based 3D repository optimized for low-bandwidth mobile devices with interactive Hausa audio guides.',
        target_audience: 'Students, cultural researchers, museums, and the global African diaspora.',
        presentation_url: 'https://arewa-archives.example.com',
        portfolio_url: 'https://artstation.com/zainab-3d',
        status: 'stage_finalist',
        is_winner: false,
        winner_badge: null,
        created_at: new Date().toISOString(),
      },
    ],
    votes: [] as Array<{
      id: string
      hackathon_id: string
      team_id: string
      voter_token: string
      ip_hash?: string
      created_at: string
    }>,
    jury_scores: [] as Array<JuryScoreInput & { id: string; total_score: number; created_at: string; updated_at: string }>,
    audit_logs: [] as Array<{
      id: string
      hackathon_id: string
      action: string
      actor: string
      details: any
      ip_address: string
      created_at: string
    }>,
  }
}

function readLocalDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialLocalData()
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8')
      return initial
    }
    const content = fs.readFileSync(DB_FILE, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    console.warn('[Local DB Warning] Error accessing local JSON store, resetting to initial state:', err)
    return getInitialLocalData()
  }
}

function writeLocalDb(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error('[Local DB Error] Failed to write local JSON store:', err)
  }
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return url && !url.includes('your-project') && !url.includes('localhost:54321')
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
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('cf-connecting-ip') ||
    headerStore.get('x-real-ip') ||
    '127.0.0.1'
  )
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
    const voterToken = await getOrCreateVoterToken()

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()

        // Fetch active/voting hackathon
        const { data: hackathon, error: hErr } = await adminSupabase
          .from('hackathons')
          .select('*')
          .in('status', ['active', 'voting', 'upcoming', 'completed'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (hErr) throw hErr

        if (hackathon) {
          // Check votes count
          const { count: voteCount } = await adminSupabase
            .from('hackathon_votes')
            .select('*', { count: 'exact', head: true })
            .eq('hackathon_id', hackathon.id)

          // Check if current voter already voted
          const { data: userVote } = await adminSupabase
            .from('hackathon_votes')
            .select('team_id')
            .eq('hackathon_id', hackathon.id)
            .eq('voter_token', voterToken)
            .maybeSingle()

          // Calculate authoritative time remaining
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
              voting_starts_at: hackathon.voting_starts_at,
              voting_ends_at: hackathon.voting_ends_at,
              is_voting_open: isVotingOpen,
              remaining_seconds: remainingSeconds,
              results_published: Boolean(hackathon.results_published),
              total_votes: voteCount || 0,
              has_voted_team_id: userVote?.team_id || null,
              voter_token: voterToken,
            },
          }
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local resilient fallback for public state:', dbErr)
        }
      }
    }

    // Local JSON Fallback
    const localDb = readLocalDb()
    const hackathon = localDb.hackathons[0] || getInitialLocalData().hackathons[0]
    const userVote = localDb.votes.find(
      (v: any) => v.hackathon_id === hackathon.id && v.voter_token === voterToken
    )

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
        status: hackathon.status,
        sprint_duration_minutes: hackathon.sprint_duration_minutes || 120,
        voting_duration_minutes: hackathon.voting_duration_minutes || 20,
        voting_starts_at: hackathon.voting_starts_at,
        voting_ends_at: hackathon.voting_ends_at,
        is_voting_open: isVotingOpen,
        remaining_seconds: remainingSeconds,
        results_published: Boolean(hackathon.results_published),
        total_votes: localDb.votes.filter((v: any) => v.hackathon_id === hackathon.id).length,
        has_voted_team_id: userVote ? userVote.team_id : null,
        voter_token: voterToken,
      },
    }
  } catch (err: unknown) {
    return {
      success: false,
      state: {
        id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Roots & Vectors: 2-Hour Live Stage Design Sprint',
        status: 'voting',
        sprint_duration_minutes: 120,
        voting_duration_minutes: 20,
        voting_starts_at: null,
        voting_ends_at: null,
        is_voting_open: true,
        remaining_seconds: 1200,
        results_published: false,
        total_votes: 0,
        has_voted_team_id: null,
      },
      error: err instanceof Error ? err.message : 'Failed to query hackathon state',
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
    let rawTeams: any[] = []
    let rawVotes: any[] = []
    let hackathonId = 'a0000000-0000-0000-0000-000000000001'

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { data: h } = await adminSupabase
          .from('hackathons')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (h?.id) hackathonId = h.id

        let query = adminSupabase.from('hackathon_teams').select('*').eq('hackathon_id', hackathonId)

        if (!options?.includeAllStatuses) {
          query = query.in('status', ['stage_finalist', 'winner'])
        }

        const [{ data: teamsData, error: tErr }, { data: votesData, error: vErr }] = await Promise.all([
          query.order('created_at', { ascending: true }),
          adminSupabase.from('hackathon_votes').select('team_id').eq('hackathon_id', hackathonId),
        ])

        if (tErr) throw tErr
        if (vErr) throw vErr

        if (teamsData && teamsData.length > 0) {
          rawTeams = teamsData
          rawVotes = votesData || []
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local resilient fallback for finalists:', dbErr)
        }
      }
    }

    if (rawTeams.length === 0) {
      const localDb = readLocalDb()
      hackathonId = localDb.hackathons[0]?.id || hackathonId
      rawTeams = localDb.teams.filter((t: any) => {
        if (options?.includeAllStatuses) return true
        return t.status === 'stage_finalist' || t.status === 'winner'
      })
      rawVotes = localDb.votes.filter((v: any) => v.hackathon_id === hackathonId)
    }

    // Tally votes
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
        hackathon_id: t.hackathon_id || hackathonId,
        team_name: t.team_name,
        lead_name: t.lead_name,
        lead_email: t.lead_email,
        lead_phone: t.lead_phone,
        team_size: t.team_size || 1,
        track: t.track,
        professional_title: t.professional_title || 'Competitor Designer',
        avatar_url: t.avatar_url || '/images/community/ncd_class_training.jpg',
        project_title: t.project_title || t.team_name,
        short_description: t.short_description || t.pitch || '2-Hour Live Stage Sprint Project',
        detailed_description: t.detailed_description || t.pitch || '',
        problem_statement: t.problem_statement || '',
        proposed_solution: t.proposed_solution || '',
        target_audience: t.target_audience || '',
        presentation_url: t.presentation_url || null,
        portfolio_url: t.portfolio_url || null,
        status: t.status,
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
    return {
      success: false,
      finalists: [],
      totalVotes: 0,
      error: err instanceof Error ? err.message : 'Failed to query finalists.',
    }
  }
}

// -----------------------------------------------------------------------------
// 3. Get Finalist By ID (for dedicated profile /hackathon/participants/[id])
// -----------------------------------------------------------------------------
export async function getFinalistProfileByIdAction(id: string): Promise<{
  success: boolean
  finalist?: FinalistCandidate
  isVotingOpen: boolean
  hasVotedForThis: boolean
  hasVotedTeamId: string | null
  error?: string
}> {
  try {
    const { state } = await getHackathonPublicStateAction()
    const { finalists } = await getHackathonFinalistsAction({ includeAllStatuses: true })

    const candidate = finalists.find((f) => f.id === id)
    if (!candidate) {
      return {
        success: false,
        isVotingOpen: false,
        hasVotedForThis: false,
        hasVotedTeamId: null,
        error: 'Finalist profile not found.',
      }
    }

    return {
      success: true,
      finalist: candidate,
      isVotingOpen: state.is_voting_open,
      hasVotedForThis: state.has_voted_team_id === candidate.id,
      hasVotedTeamId: state.has_voted_team_id,
    }
  } catch (err: unknown) {
    return {
      success: false,
      isVotingOpen: false,
      hasVotedForThis: false,
      hasVotedTeamId: null,
      error: err instanceof Error ? err.message : 'Error fetching finalist profile.',
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

    // 1. Fetch public state & ensure voting is active
    const { state } = await getHackathonPublicStateAction()

    if (!state.is_voting_open) {
      if (state.status === 'upcoming') {
        return { success: false, error: 'Voting has not yet opened for Northern Design Hackathon 2.0.' }
      }
      return { success: false, error: 'The 20-minute live voting window has officially closed.' }
    }

    if (state.voting_ends_at && new Date(state.voting_ends_at).getTime() < now) {
      return { success: false, error: 'The 20-minute live voting deadline has expired. No further votes are accepted.' }
    }

    // 2. Validate contestant eligibility (must be stage_finalist or winner)
    const { finalists } = await getHackathonFinalistsAction({ includeAllStatuses: true })
    const candidate = finalists.find((f) => f.id === teamId)

    if (!candidate || (candidate.status !== 'stage_finalist' && candidate.status !== 'winner')) {
      return { success: false, error: 'Selected contestant is not an active stage finalist eligible for audience votes.' }
    }

    // 3. Prevent duplicate votes
    if (state.has_voted_team_id) {
      return {
        success: false,
        error: 'You have already cast your official vote for this hackathon sprint. Each voter may cast only 1 vote.',
      }
    }

    const hackathonId = state.id

    // Try Supabase insert
    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { error: insertErr } = await adminSupabase.from('hackathon_votes').insert({
          hackathon_id: hackathonId,
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

        // Fetch updated counts
        const { count: newTotal } = await adminSupabase
          .from('hackathon_votes')
          .select('*', { count: 'exact', head: true })
          .eq('hackathon_id', hackathonId)

        const { count: teamTotal } = await adminSupabase
          .from('hackathon_votes')
          .select('*', { count: 'exact', head: true })
          .eq('hackathon_id', hackathonId)
          .eq('team_id', teamId)

        revalidatePath('/hackathon/vote')
        revalidatePath('/hackathon/leaderboard')
        revalidatePath('/hackathon/participants')
        revalidatePath(`/hackathon/participants/${teamId}`)

        return {
          success: true,
          message: `Official vote confirmed for ${candidate.lead_name}! Thank you for supporting Northern design excellence.`,
          hasVotedTeamId: teamId,
          totalVotes: newTotal || 1,
          updatedVotesForTeam: teamTotal || 1,
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store fallback for vote cast:', dbErr)
        }
      }
    }

    // Local JSON store fallback
    const localDb = readLocalDb()
    const existing = localDb.votes.find(
      (v: any) => v.hackathon_id === hackathonId && v.voter_token === voterToken
    )

    if (existing) {
      return {
        success: false,
        error: 'You have already cast your official vote. Duplicate ballots are rejected.',
      }
    }

    localDb.votes.push({
      id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      hackathon_id: hackathonId,
      team_id: teamId,
      voter_token: voterToken,
      ip_hash: clientIp,
      created_at: new Date().toISOString(),
    })
    writeLocalDb(localDb)

    const newTotal = localDb.votes.filter((v: any) => v.hackathon_id === hackathonId).length
    const teamTotal = localDb.votes.filter(
      (v: any) => v.hackathon_id === hackathonId && v.team_id === teamId
    ).length

    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath(`/hackathon/participants/${teamId}`)

    return {
      success: true,
      message: `Official vote recorded for ${candidate.lead_name}! Your ballot has been registered on the live leaderboard.`,
      hasVotedTeamId: teamId,
      totalVotes: newTotal,
      updatedVotesForTeam: teamTotal,
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An error occurred while submitting your ballot.',
    }
  }
}

// -----------------------------------------------------------------------------
// 5. Get Realtime Leaderboard Standings
// -----------------------------------------------------------------------------
export async function getLiveLeaderboardAction(): Promise<{
  success: boolean
  leaderboard: LeaderboardEntry[]
  totalVotes: number
  votingStatus: 'upcoming' | 'active' | 'voting' | 'completed'
  isVotingOpen: boolean
  votingEndsAt: string | null
  remainingSeconds: number
  resultsPublished: boolean
  lastUpdated: string
  error?: string
}> {
  try {
    const { state } = await getHackathonPublicStateAction()
    const { finalists, totalVotes } = await getHackathonFinalistsAction()

    const now = Date.now()
    const votingEndsAt = state.voting_ends_at ? new Date(state.voting_ends_at).getTime() : 0
    const isVotingOpen = state.status === 'voting' && (votingEndsAt === 0 || votingEndsAt > now)
    const remainingSeconds = isVotingOpen && votingEndsAt > 0 ? Math.max(0, Math.floor((votingEndsAt - now) / 1000)) : 0

    // If results are published, include jury and weighted score calculations
    let jurySummaryMap = new Map<string, { jury_score: number; audience_score: number; final_score: number }>()

    if (state.results_published) {
      const { summaries } = await adminGetJuryAndWeightedResultsAction()
      summaries.forEach((s) => {
        jurySummaryMap.set(s.team_id, {
          jury_score: s.avg_jury_score,
          audience_score: s.audience_score,
          final_score: s.final_weighted_score,
        })
      })
    }

    const leaderboard: LeaderboardEntry[] = finalists.map((f, index) => {
      const juryData = jurySummaryMap.get(f.id)
      return {
        rank: index + 1,
        id: f.id,
        team_name: f.team_name,
        lead_name: f.lead_name,
        professional_title: f.professional_title,
        avatar_url: f.avatar_url,
        track: f.track,
        project_title: f.project_title,
        votes: f.votes,
        percentage: f.percentage,
        is_winner: f.is_winner,
        winner_badge: f.winner_badge,
        jury_score: juryData?.jury_score,
        audience_score: juryData?.audience_score,
        final_score: juryData?.final_score,
      }
    })

    // If results published, rank by final_score descending; otherwise rank by audience votes
    if (state.results_published && jurySummaryMap.size > 0) {
      leaderboard.sort((a, b) => (b.final_score || 0) - (a.final_score || 0))
      leaderboard.forEach((item, idx) => {
        item.rank = idx + 1
      })
    } else {
      leaderboard.sort((a, b) => b.votes - a.votes)
      leaderboard.forEach((item, idx) => {
        item.rank = idx + 1
      })
    }

    return {
      success: true,
      leaderboard,
      totalVotes,
      votingStatus: state.status,
      isVotingOpen,
      votingEndsAt: state.voting_ends_at,
      remainingSeconds,
      resultsPublished: state.results_published,
      lastUpdated: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }
  } catch (err: unknown) {
    return {
      success: false,
      leaderboard: [],
      totalVotes: 0,
      votingStatus: 'upcoming',
      isVotingOpen: false,
      votingEndsAt: null,
      remainingSeconds: 0,
      resultsPublished: false,
      lastUpdated: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Failed to query live leaderboard.',
    }
  }
}

// -----------------------------------------------------------------------------
// 6. Admin: Set Voting Window & Status Controls
// -----------------------------------------------------------------------------
export async function adminSetVotingStatusAction(
  status: 'upcoming' | 'active' | 'voting' | 'completed',
  durationMinutes = 20
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const clientIp = await getClientIp()
    const now = new Date()
    let startsAt: string | null = null
    let endsAt: string | null = null

    if (status === 'voting') {
      startsAt = now.toISOString()
      endsAt = new Date(now.getTime() + durationMinutes * 60 * 1000).toISOString()
    } else if (status === 'upcoming') {
      startsAt = null
      endsAt = null
    }

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { data: h } = await adminSupabase
          .from('hackathons')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (h?.id) {
          const updatePayload: any = {
            status,
            voting_duration_minutes: durationMinutes,
            updated_at: now.toISOString(),
          }
          if (status === 'voting') {
            updatePayload.voting_starts_at = startsAt
            updatePayload.voting_ends_at = endsAt
          } else if (status === 'upcoming') {
            updatePayload.voting_starts_at = null
            updatePayload.voting_ends_at = null
          }

          const { error: updateErr } = await adminSupabase.from('hackathons').update(updatePayload).eq('id', h.id)
          if (updateErr) throw updateErr

          // Log audit
          await adminSupabase.from('hackathon_audit_logs').insert({
            hackathon_id: h.id,
            action: `VOTING_STATUS_CHANGED_${status.toUpperCase()}`,
            actor: 'admin',
            details: { status, durationMinutes, startsAt, endsAt },
            ip_address: clientIp,
          })
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for admin status update:', dbErr)
        }
      }
    }

    // Local JSON update
    const localDb = readLocalDb()
    if (localDb.hackathons[0]) {
      localDb.hackathons[0].status = status
      localDb.hackathons[0].voting_duration_minutes = durationMinutes
      if (status === 'voting') {
        localDb.hackathons[0].voting_starts_at = startsAt
        localDb.hackathons[0].voting_ends_at = endsAt
      } else if (status === 'upcoming') {
        localDb.hackathons[0].voting_starts_at = null
        localDb.hackathons[0].voting_ends_at = null
      }
    }
    localDb.audit_logs.push({
      id: `audit_${Date.now()}`,
      hackathon_id: localDb.hackathons[0]?.id || 'a0000000-0000-0000-0000-000000000001',
      action: `VOTING_STATUS_CHANGED_${status.toUpperCase()}`,
      actor: 'admin',
      details: { status, durationMinutes, startsAt, endsAt },
      ip_address: clientIp,
      created_at: now.toISOString(),
    })
    writeLocalDb(localDb)

    revalidatePath('/hackathon')
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    const actionText =
      status === 'voting'
        ? `Live voting window ACTIVE for ${durationMinutes} minutes!`
        : status === 'completed'
        ? 'Live voting window CLOSED.'
        : 'Hackathon reset to upcoming (voting disabled).'

    return { success: true, message: actionText }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update voting status.',
    }
  }
}

// -----------------------------------------------------------------------------
// 7. Admin: Update Finalist Profile & Project Details
// -----------------------------------------------------------------------------
export async function adminUpdateFinalistAction(
  teamId: string,
  updates: Partial<FinalistCandidate>
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const clientIp = await getClientIp()

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const payload: any = {
          team_name: updates.team_name,
          lead_name: updates.lead_name,
          lead_email: updates.lead_email,
          lead_phone: updates.lead_phone,
          track: updates.track,
          professional_title: updates.professional_title,
          avatar_url: updates.avatar_url,
          project_title: updates.project_title,
          short_description: updates.short_description,
          detailed_description: updates.detailed_description,
          problem_statement: updates.problem_statement,
          proposed_solution: updates.proposed_solution,
          target_audience: updates.target_audience,
          presentation_url: updates.presentation_url,
          portfolio_url: updates.portfolio_url,
          status: updates.status,
          is_winner: updates.is_winner,
          winner_badge: updates.winner_badge,
        }

        // Remove undefined keys
        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k])

        const { error: updateErr } = await adminSupabase.from('hackathon_teams').update(payload).eq('id', teamId)
        if (updateErr) throw updateErr

        await adminSupabase.from('hackathon_audit_logs').insert({
          hackathon_id: updates.hackathon_id || null,
          action: 'FINALIST_PROFILE_UPDATED',
          actor: 'admin',
          details: { teamId, updates },
          ip_address: clientIp,
        })
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for finalist update:', dbErr)
        }
      }
    }

    // Local JSON update
    const localDb = readLocalDb()
    const target = localDb.teams.find((t: any) => t.id === teamId)
    if (target) {
      Object.assign(target, updates)
      writeLocalDb(localDb)
    }

    revalidatePath('/hackathon/participants')
    revalidatePath(`/hackathon/participants/${teamId}`)
    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/admin')

    return { success: true, message: 'Finalist details updated successfully.' }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update finalist profile.',
    }
  }
}

// -----------------------------------------------------------------------------
// 8. Admin: Upload Finalist Photo to Cloudinary
// -----------------------------------------------------------------------------
export async function adminUploadFinalistPhotoAction(
  base64DataUri: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!base64DataUri) {
      return { success: false, error: 'No image data provided.' }
    }

    const res = await uploadImage(base64DataUri, 'ncd-summit/hackathon-finalists')
    if (res.success && res.url) {
      return { success: true, url: res.url }
    }

    return { success: false, error: res.error || 'Cloudinary upload failed.' }
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
    const clientIp = await getClientIp()

    // Clamp scores
    const c1 = Math.min(25, Math.max(0, Number(input.cultural_semiotics) || 0))
    const c2 = Math.min(25, Math.max(0, Number(input.problem_solution) || 0))
    const c3 = Math.min(25, Math.max(0, Number(input.craft_execution) || 0))
    const c4 = Math.min(25, Math.max(0, Number(input.presentation) || 0))
    const total = c1 + c2 + c3 + c4

    const scoreRecord = {
      hackathon_id: input.hackathon_id,
      team_id: input.team_id,
      judge_name: input.judge_name.trim(),
      judge_email: input.judge_email?.trim() || null,
      cultural_semiotics: c1,
      problem_solution: c2,
      craft_execution: c3,
      presentation: c4,
      total_score: total,
      feedback: input.feedback?.trim() || null,
      status: input.status || 'draft',
      updated_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { error: upsertErr } = await adminSupabase
          .from('hackathon_jury_scores')
          .upsert(scoreRecord as any, { onConflict: 'hackathon_id, team_id, judge_name' })

        if (upsertErr) throw upsertErr

        await adminSupabase.from('hackathon_audit_logs').insert({
          hackathon_id: input.hackathon_id,
          action: 'JURY_SCORE_SAVED',
          actor: input.judge_name,
          details: scoreRecord,
          ip_address: clientIp,
        })
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for jury score:', dbErr)
        }
      }
    }

    // Local JSON update
    const localDb = readLocalDb()
    const existingIdx = localDb.jury_scores.findIndex(
      (s: any) =>
        s.hackathon_id === input.hackathon_id &&
        s.team_id === input.team_id &&
        s.judge_name.toLowerCase() === input.judge_name.toLowerCase().trim()
    )

    if (existingIdx >= 0) {
      localDb.jury_scores[existingIdx] = {
        ...localDb.jury_scores[existingIdx],
        ...scoreRecord,
      }
    } else {
      localDb.jury_scores.push({
        id: `jury_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...scoreRecord,
        created_at: new Date().toISOString(),
      })
    }
    writeLocalDb(localDb)

    revalidatePath('/admin')
    revalidatePath('/hackathon/leaderboard')

    return {
      success: true,
      message: `Score recorded (${total}/100) for ${input.judge_name}!`,
      totalScore: total,
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to save jury score.',
    }
  }
}

// -----------------------------------------------------------------------------
// 10. Admin: Calculate 70% Jury + 30% Audience Weighted Results
// -----------------------------------------------------------------------------
export async function adminGetJuryAndWeightedResultsAction(): Promise<{
  success: boolean
  summaries: JuryTeamSummary[]
  error?: string
}> {
  try {
    const { finalists, totalVotes } = await getHackathonFinalistsAction({ includeAllStatuses: false })

    let rawScores: any[] = []

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { data: scores, error: sErr } = await adminSupabase.from('hackathon_jury_scores').select('*')
        if (sErr) throw sErr
        if (scores) rawScores = scores
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for jury summary:', dbErr)
        }
      }
    }

    if (rawScores.length === 0) {
      const localDb = readLocalDb()
      rawScores = localDb.jury_scores || []
    }

    const summaries: JuryTeamSummary[] = finalists.map((team) => {
      const teamScores = rawScores.filter((s: any) => s.team_id === team.id)
      const judgeCount = teamScores.length
      const avgJury =
        judgeCount > 0
          ? Math.round(
              (teamScores.reduce((acc: number, s: any) => acc + Number(s.total_score || 0), 0) / judgeCount) * 10
            ) / 10
          : 0

      // Audience Score Formula: (votes / totalVotes) * 100
      const audienceScore = totalVotes > 0 ? Math.round((team.votes / totalVotes) * 100 * 10) / 10 : 0

      // Weighted Final Score: (Jury * 0.70) + (Audience * 0.30)
      const finalScore = Math.round((avgJury * 0.7 + audienceScore * 0.3) * 10) / 10

      return {
        team_id: team.id,
        team_name: team.team_name,
        lead_name: team.lead_name,
        track: team.track,
        project_title: team.project_title,
        judge_count: judgeCount,
        avg_jury_score: avgJury,
        audience_votes: team.votes,
        audience_score: audienceScore,
        final_weighted_score: finalScore,
        rank: 0,
        is_winner: Boolean(team.is_winner),
        winner_badge: team.winner_badge,
        scores: teamScores.map((s: any) => ({
          id: s.id,
          judge_name: s.judge_name,
          cultural_semiotics: s.cultural_semiotics,
          problem_solution: s.problem_solution,
          craft_execution: s.craft_execution,
          presentation: s.presentation,
          total_score: s.total_score,
          feedback: s.feedback,
          status: s.status,
        })),
      }
    })

    // Rank finalists by final_weighted_score descending. First tie-breaker: avg_jury_score. Second: audience_votes.
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
    }
  } catch (err: unknown) {
    return {
      success: false,
      summaries: [],
      error: err instanceof Error ? err.message : 'Failed to calculate weighted results.',
    }
  }
}

// -----------------------------------------------------------------------------
// 11. Admin: Publish Official Competition Results
// -----------------------------------------------------------------------------
export async function adminPublishOfficialResultsAction(
  publish: boolean
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const clientIp = await getClientIp()
    const { summaries } = await adminGetJuryAndWeightedResultsAction()

    if (publish && summaries.length === 0) {
      return { success: false, error: 'Cannot publish results: No stage finalists available.' }
    }

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { data: h } = await adminSupabase
          .from('hackathons')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (h?.id) {
          await adminSupabase.from('hackathons').update({ results_published: publish }).eq('id', h.id)

          // Mark winners if publishing
          if (publish && summaries.length > 0) {
            // Rank 1: Grand Champion
            const topTeam = summaries[0]
            await adminSupabase
              .from('hackathon_teams')
              .update({ is_winner: true, winner_badge: 'Overall Grand Champion' })
              .eq('id', topTeam.team_id)

            // Category winners
            const brandWinner = summaries.find((s) => s.track.toLowerCase().includes('brand'))
            if (brandWinner && brandWinner.team_id !== topTeam.team_id) {
              await adminSupabase
                .from('hackathon_teams')
                .update({ is_winner: true, winner_badge: 'Best Brand Identity System' })
                .eq('id', brandWinner.team_id)
            }

            const uiWinner = summaries.find((s) => s.track.toLowerCase().includes('ui'))
            if (uiWinner && uiWinner.team_id !== topTeam.team_id) {
              await adminSupabase
                .from('hackathon_teams')
                .update({ is_winner: true, winner_badge: 'Best UI/UX Prototype' })
                .eq('id', uiWinner.team_id)
            }
          }

          await adminSupabase.from('hackathon_audit_logs').insert({
            hackathon_id: h.id,
            action: publish ? 'OFFICIAL_RESULTS_PUBLISHED' : 'OFFICIAL_RESULTS_UNPUBLISHED',
            actor: 'admin',
            details: { publish, topRanking: summaries[0]?.team_name },
            ip_address: clientIp,
          })
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for results publishing:', dbErr)
        }
      }
    }

    // Local JSON update
    const localDb = readLocalDb()
    if (localDb.hackathons[0]) {
      localDb.hackathons[0].results_published = publish
    }
    if (publish && summaries.length > 0) {
      const topId = summaries[0].team_id
      localDb.teams.forEach((t: any) => {
        if (t.id === topId) {
          t.is_winner = true
          t.winner_badge = 'Overall Grand Champion'
        }
      })
    }
    localDb.audit_logs.push({
      id: `audit_${Date.now()}`,
      hackathon_id: localDb.hackathons[0]?.id || 'a0000000-0000-0000-0000-000000000001',
      action: publish ? 'OFFICIAL_RESULTS_PUBLISHED' : 'OFFICIAL_RESULTS_UNPUBLISHED',
      actor: 'admin',
      details: { publish },
      ip_address: clientIp,
      created_at: new Date().toISOString(),
    })
    writeLocalDb(localDb)

    revalidatePath('/hackathon')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    return {
      success: true,
      message: publish
        ? 'Official 70/30 weighted results have been PUBLISHED to the public leaderboard and participant directory!'
        : 'Official results unpublished. Audience view restored to voting leaderboard.',
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to publish results.',
    }
  }
}

// -----------------------------------------------------------------------------
// 12. Admin: Rehearsal & Reset Votes (Strict safety verification)
// -----------------------------------------------------------------------------
export async function adminRehearsalResetVotesAction(
  confirmationText: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const clientIp = await getClientIp()

    if (confirmationText !== 'CONFIRM RESET') {
      return {
        success: false,
        error: 'Confirmation phrase did not match. Type "CONFIRM RESET" exactly to authorize test wipe.',
      }
    }

    if (isSupabaseConfigured()) {
      try {
        const adminSupabase = createAdminClient()
        const { data: h } = await adminSupabase
          .from('hackathons')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (h?.id) {
          // Delete votes for this hackathon
          await adminSupabase.from('hackathon_votes').delete().eq('hackathon_id', h.id)
          // Reset status
          await adminSupabase.from('hackathons').update({
            status: 'upcoming',
            voting_starts_at: null,
            voting_ends_at: null,
            results_published: false,
          }).eq('id', h.id)

          await adminSupabase.from('hackathon_audit_logs').insert({
            hackathon_id: h.id,
            action: 'REHEARSAL_VOTES_RESET',
            actor: 'admin',
            details: { resetAt: new Date().toISOString() },
            ip_address: clientIp,
          })
        }
      } catch (dbErr) {
        if (!isDatabaseConnectionError(dbErr)) {
          console.warn('[Supabase Warning] Using local store for rehearsal reset:', dbErr)
        }
      }
    }

    // Local JSON update
    const localDb = readLocalDb()
    localDb.votes = []
    if (localDb.hackathons[0]) {
      localDb.hackathons[0].status = 'upcoming'
      localDb.hackathons[0].voting_starts_at = null
      localDb.hackathons[0].voting_ends_at = null
      localDb.hackathons[0].results_published = false
    }
    localDb.audit_logs.push({
      id: `audit_${Date.now()}`,
      hackathon_id: localDb.hackathons[0]?.id || 'a0000000-0000-0000-0000-000000000001',
      action: 'REHEARSAL_VOTES_RESET',
      actor: 'admin',
      details: { resetAt: new Date().toISOString() },
      ip_address: clientIp,
      created_at: new Date().toISOString(),
    })
    writeLocalDb(localDb)

    revalidatePath('/hackathon/vote')
    revalidatePath('/hackathon/leaderboard')
    revalidatePath('/hackathon/participants')
    revalidatePath('/admin')

    return {
      success: true,
      message: 'Rehearsal reset complete: All test votes wiped and hackathon reset to upcoming state.',
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Rehearsal reset failed.',
    }
  }
}
