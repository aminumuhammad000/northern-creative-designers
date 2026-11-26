'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { uploadImage } from '@/lib/cloudinary'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import {
  isLocalDevMode,
  getLocalStore,
  saveLocalStore,
  updateLocalHackathonTeam,
  getLocalHackathonParticipant,
  findLocalHackathonParticipantByEmailAndPhone,
  phonesMatch,
  saveLocalJuryScore,
  getLocalJuryScores,
} from '@/lib/supabase/local-db'
import {
  adminSaveJuryScoreAction,
  adminGetJuryAndWeightedResultsAction,
  JuryScoreInput,
  JuryTeamSummary,
  HackathonPublicState,
  getHackathonPublicStateAction,
} from '@/app/actions/voting'

export interface HackathonParticipantData {
  id: string
  hackathon_id: string
  team_name: string
  lead_name: string
  lead_email: string
  lead_phone: string
  track: string
  team_size: number
  professional_title: string
  avatar_url: string
  project_title: string
  short_description: string
  detailed_description: string
  problem_statement: string
  proposed_solution: string
  target_audience: string
  presentation_url: string | null
  portfolio_url: string | null
  gender?: string | null
  city?: string | null
  organization?: string | null
  status: 'applied' | 'shortlisted' | 'stage_finalist' | 'winner'
  is_winner?: boolean
  winner_badge?: string | null
  votes: number
  rank?: number
}

export interface HackathonParticipantUpdatePayload {
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
  lead_phone?: string
  lead_name?: string
  organization?: string
  city?: string
  track?: string
}

// -----------------------------------------------------------------------------
// 1. Get Current or Looked-up Hackathon Participant Data
// -----------------------------------------------------------------------------
export async function getHackathonParticipantDataAction(emailOrId?: string): Promise<{
  success: boolean
  participant?: HackathonParticipantData
  allParticipants?: Array<{ id: string; lead_name: string; lead_email: string; track: string; project_title: string }>
  hackathonState?: HackathonPublicState
  error?: string
}> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('ncd_hackathon_team_id')?.value
    const emailCookie = cookieStore.get('ncd_session_email')?.value
    const targetIdentifier = emailOrId?.trim() || sessionCookie || emailCookie

    const { state: hackathonState } = await getHackathonPublicStateAction()

    // -------------------------------------------------------------------------
    // A. Local Dev Mode Fallback
    // -------------------------------------------------------------------------
    if (isLocalDevMode()) {
      const store = getLocalStore()
      const teams = store.hackathon_teams || []
      const allParticipants = teams.map((t) => ({
        id: t.id,
        lead_name: t.lead_name,
        lead_email: t.lead_email || '',
        track: t.track,
        project_title: t.project_title || t.team_name,
      }))

      const matchedTeam = targetIdentifier ? getLocalHackathonParticipant(targetIdentifier) : null

      if (!matchedTeam) {
        return {
          success: false,
          hackathonState,
          allParticipants: [],
          error: 'Please sign in with your registered email and phone number to access your dashboard.',
        }
      }

      const votes = store.hackathon_votes?.filter((v) => v.team_id === matchedTeam!.id).length || 0

      const participant: HackathonParticipantData = {
        id: matchedTeam.id,
        hackathon_id: matchedTeam.hackathon_id || hackathonState.id,
        team_name: matchedTeam.team_name,
        lead_name: matchedTeam.lead_name,
        lead_email: matchedTeam.lead_email || '',
        lead_phone: matchedTeam.lead_phone || '',
        track: matchedTeam.track,
        team_size: matchedTeam.team_size || 1,
        professional_title: matchedTeam.professional_title || '',
        avatar_url: matchedTeam.avatar_url || '/images/community/ncd_class_training.jpg',
        project_title: matchedTeam.project_title || '',
        short_description: matchedTeam.short_description || '',
        detailed_description: matchedTeam.detailed_description || '',
        problem_statement: matchedTeam.problem_statement || '',
        proposed_solution: matchedTeam.proposed_solution || '',
        target_audience: matchedTeam.target_audience || '',
        presentation_url: matchedTeam.presentation_url || null,
        portfolio_url: matchedTeam.portfolio_url || null,
        gender: matchedTeam.gender || null,
        city: matchedTeam.city || null,
        organization: matchedTeam.organization || null,
        status: (matchedTeam.status as any) || 'applied',
        is_winner: Boolean(matchedTeam.is_winner),
        winner_badge: matchedTeam.winner_badge || null,
        votes,
      }

      return {
        success: true,
        participant,
        allParticipants,
        hackathonState,
      }
    }

    // -------------------------------------------------------------------------
    // B. Supabase Cloud Mode
    // -------------------------------------------------------------------------
    const adminSupabase = createAdminClient()

    // 1. Fetch active hackathon
    const { data: hackathon } = await adminSupabase
      .from('hackathons')
      .select('id, title, status, voting_ends_at, results_published')
      .in('status', ['active', 'voting', 'upcoming'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const hackathonId = hackathon?.id || hackathonState.id

    // 2. Fetch all participants for switcher/lookup
    const { data: allTeamsData } = await adminSupabase
      .from('hackathon_teams')
      .select('id, lead_name, lead_email, track, project_title')
      .order('created_at', { ascending: false })

    const allParticipants = (allTeamsData || []).map((t) => ({
      id: t.id,
      lead_name: t.lead_name,
      lead_email: t.lead_email || '',
      track: t.track,
      project_title: t.project_title || t.lead_name,
    }))

    // 3. Locate target team
    let teamRecord: any = null

    if (targetIdentifier) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetIdentifier)
      if (isUUID) {
        const { data } = await adminSupabase
          .from('hackathon_teams')
          .select('*')
          .eq('id', targetIdentifier)
          .maybeSingle()
        teamRecord = data
      }

      if (!teamRecord) {
        const { data } = await adminSupabase
          .from('hackathon_teams')
          .select('*')
          .ilike('lead_email', targetIdentifier)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        teamRecord = data
      }
    }

    if (!teamRecord) {
      return {
        success: false,
        hackathonState,
        allParticipants: [],
        error: 'Please sign in with your registered email and phone number to access your dashboard.',
      }
    }

    // Count votes for this team
    const { count: voteCount } = await adminSupabase
      .from('hackathon_votes')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', teamRecord.id)

    const participant: HackathonParticipantData = {
      id: teamRecord.id,
      hackathon_id: teamRecord.hackathon_id || hackathonId,
      team_name: teamRecord.team_name,
      lead_name: teamRecord.lead_name,
      lead_email: teamRecord.lead_email || '',
      lead_phone: teamRecord.lead_phone || '',
      track: teamRecord.track,
      team_size: teamRecord.team_size || 1,
      professional_title: teamRecord.professional_title || '',
      avatar_url: teamRecord.avatar_url || '/images/community/ncd_class_training.jpg',
      project_title: teamRecord.project_title || '',
      short_description: teamRecord.short_description || '',
      detailed_description: teamRecord.detailed_description || '',
      problem_statement: teamRecord.problem_statement || '',
      proposed_solution: teamRecord.proposed_solution || '',
      target_audience: teamRecord.target_audience || '',
      presentation_url: teamRecord.presentation_url || null,
      portfolio_url: teamRecord.portfolio_url || null,
      gender: teamRecord.gender || null,
      city: teamRecord.city || null,
      organization: teamRecord.organization || null,
      status: (teamRecord.status as any) || 'applied',
      is_winner: Boolean(teamRecord.is_winner),
      winner_badge: teamRecord.winner_badge || null,
      votes: voteCount || 0,
    }

    return {
      success: true,
      participant,
      allParticipants,
      hackathonState,
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      const store = getLocalStore()
      const participant = getLocalHackathonParticipant(emailOrId)
      const { state: hackathonState } = await getHackathonPublicStateAction()
      if (participant) {
        return {
          success: true,
          participant: {
            id: participant.id,
            hackathon_id: participant.hackathon_id,
            team_name: participant.team_name,
            lead_name: participant.lead_name,
            lead_email: participant.lead_email || '',
            lead_phone: participant.lead_phone || '',
            track: participant.track,
            team_size: 1,
            professional_title: participant.professional_title || '',
            avatar_url: participant.avatar_url || '/images/community/ncd_class_training.jpg',
            project_title: participant.project_title || '',
            short_description: participant.short_description || '',
            detailed_description: participant.detailed_description || '',
            problem_statement: participant.problem_statement || '',
            proposed_solution: participant.proposed_solution || '',
            target_audience: participant.target_audience || '',
            presentation_url: participant.presentation_url || null,
            portfolio_url: participant.portfolio_url || null,
            status: participant.status as any,
            votes: 0,
          },
          hackathonState,
        }
      }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to fetch participant dashboard data.',
    }
  }
}

// -----------------------------------------------------------------------------
// 2. Update Participant Profile, Project Title, Descriptions & Pitch Details
// -----------------------------------------------------------------------------
export async function updateHackathonParticipantAction(
  teamId: string,
  payload: HackathonParticipantUpdatePayload
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!teamId) {
      return { success: false, error: 'Participant identification missing.' }
    }

    // 1. Local Dev Mode
    if (isLocalDevMode()) {
      const res = updateLocalHackathonTeam(teamId, payload as any)
      if (!res.success) {
        return { success: false, error: res.error }
      }
      revalidatePath('/dashboard/hackathon')
      revalidatePath('/hackathon')
      revalidatePath('/hackathon/participants')
      revalidatePath(`/hackathon/participants/${teamId}`)
      revalidatePath('/dashboard/judge')
      return {
        success: true,
        message: 'Your project details and profile have been saved successfully!',
      }
    }

    // 2. Supabase Cloud Mode
    const adminSupabase = createAdminClient()

    const updateFields: any = {
      updated_at: new Date().toISOString(),
    }

    if (payload.professional_title !== undefined) updateFields.professional_title = payload.professional_title.trim()
    if (payload.avatar_url !== undefined) updateFields.avatar_url = payload.avatar_url.trim()
    if (payload.project_title !== undefined) updateFields.project_title = payload.project_title.trim()
    if (payload.short_description !== undefined) updateFields.short_description = payload.short_description.trim()
    if (payload.detailed_description !== undefined) updateFields.detailed_description = payload.detailed_description.trim()
    if (payload.problem_statement !== undefined) updateFields.problem_statement = payload.problem_statement.trim()
    if (payload.proposed_solution !== undefined) updateFields.proposed_solution = payload.proposed_solution.trim()
    if (payload.target_audience !== undefined) updateFields.target_audience = payload.target_audience.trim()
    if (payload.presentation_url !== undefined) updateFields.presentation_url = payload.presentation_url.trim()
    if (payload.portfolio_url !== undefined) updateFields.portfolio_url = payload.portfolio_url.trim()
    if (payload.lead_phone !== undefined) updateFields.lead_phone = payload.lead_phone.trim()
    if (payload.lead_name !== undefined) updateFields.lead_name = payload.lead_name.trim()
    if (payload.organization !== undefined) updateFields.organization = payload.organization.trim()
    if (payload.city !== undefined) updateFields.city = payload.city.trim()
    if (payload.track !== undefined) updateFields.track = payload.track.trim()

    const { error } = await adminSupabase
      .from('hackathon_teams')
      .update(updateFields)
      .eq('id', teamId)

    if (error) {
      if (isDatabaseConnectionError(error)) {
        updateLocalHackathonTeam(teamId, payload as any)
        return {
          success: true,
          message: 'Saved to resilient local storage.',
        }
      }
      throw error
    }

    revalidatePath('/dashboard/hackathon')
    revalidatePath('/hackathon')
    revalidatePath('/hackathon/participants')
    revalidatePath(`/hackathon/participants/${teamId}`)
    revalidatePath('/dashboard/judge')

    return {
      success: true,
      message: 'Your project brief, pitch deck, and profile details have been successfully updated!',
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      updateLocalHackathonTeam(teamId, payload as any)
      return { success: true, message: 'Saved to resilient local storage.' }
    }
    console.error('[Hackathon Dashboard Error] updateHackathonParticipantAction:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update participant profile.',
    }
  }
}

// -----------------------------------------------------------------------------
// 3. Upload Participant Profile Photo / Avatar
// -----------------------------------------------------------------------------
export async function uploadHackathonParticipantPhotoAction(
  base64DataUri: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!base64DataUri || typeof base64DataUri !== 'string') {
      return { success: false, error: 'No image data received.' }
    }

    // 1. Try Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const cloudKey = process.env.CLOUDINARY_API_KEY
    if (cloudName && !cloudName.includes('your-cloud') && cloudKey && !cloudKey.includes('your-')) {
      const res = await uploadImage(base64DataUri, 'ncd-summit/hackathon-participants')
      if (res.success && res.url) {
        return { success: true, url: res.url }
      }
    }

    // 2. Try Supabase Storage bucket
    try {
      const adminSupabase = createAdminClient()
      const matches = base64DataUri.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/)
      if (matches) {
        const mimeType = matches[1]
        const ext = mimeType.split('/')[1] || 'jpg'
        const base64Data = matches[2]
        const buffer = Buffer.from(base64Data, 'base64')
        const fileName = `participant_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`

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
      // Storage fallback
    }

    // 3. Resilient fallback: return base64 Data URI directly
    if (base64DataUri.startsWith('data:image/')) {
      return { success: true, url: base64DataUri }
    }

    return { success: false, error: 'Failed to process image.' }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error uploading profile image.',
    }
  }
}

// -----------------------------------------------------------------------------
// 4. Set Participant Active Cookie Session
// -----------------------------------------------------------------------------
export async function setParticipantSessionCookieAction(
  teamId: string,
  email?: string
): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies()
    cookieStore.set('ncd_hackathon_team_id', teamId, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    })
    if (email) {
      cookieStore.set('ncd_session_email', email.trim().toLowerCase(), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      })
    }
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function loginHackathonParticipantAction(
  email: string,
  phone: string
): Promise<{ success: boolean; participantId?: string; error?: string }> {
  const trimmedEmail = (email || '').trim().toLowerCase()
  const trimmedPhone = (phone || '').trim()

  if (!trimmedEmail || !trimmedPhone) {
    return { success: false, error: 'Please enter both your email address and phone number.' }
  }

  try {
    if (isLocalDevMode()) {
      const localMatch = findLocalHackathonParticipantByEmailAndPhone(trimmedEmail, trimmedPhone)
      if (!localMatch) {
        return {
          success: false,
          error: 'No hackathon registration found matching that email and phone number.',
        }
      }
      await setParticipantSessionCookieAction(localMatch.id, localMatch.lead_email || trimmedEmail)
      return { success: true, participantId: localMatch.id }
    }

    const adminSupabase = createAdminClient()
    const { data: teams, error } = await adminSupabase
      .from('hackathon_teams')
      .select('id, lead_email, lead_phone')
      .ilike('lead_email', trimmedEmail)
      .order('created_at', { ascending: false })

    if (error) {
      if (isDatabaseConnectionError(error)) {
        const localMatch = findLocalHackathonParticipantByEmailAndPhone(trimmedEmail, trimmedPhone)
        if (localMatch) {
          await setParticipantSessionCookieAction(localMatch.id, localMatch.lead_email || trimmedEmail)
          return { success: true, participantId: localMatch.id }
        }
      }
      return { success: false, error: 'Unable to verify registration. Please try again.' }
    }

    const matched = (teams || []).find((t) => phonesMatch(t.lead_phone, trimmedPhone))
    if (!matched) {
      return {
        success: false,
        error: 'No hackathon registration found matching that email and phone number.',
      }
    }

    await setParticipantSessionCookieAction(matched.id, matched.lead_email || trimmedEmail)
    return { success: true, participantId: matched.id }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      const localMatch = findLocalHackathonParticipantByEmailAndPhone(trimmedEmail, trimmedPhone)
      if (localMatch) {
        await setParticipantSessionCookieAction(localMatch.id, localMatch.lead_email || trimmedEmail)
        return { success: true, participantId: localMatch.id }
      }
    }
    return { success: false, error: 'Failed to access dashboard. Please try again.' }
  }
}

// -----------------------------------------------------------------------------
// 5. Get Judges Decision Portal Data
// -----------------------------------------------------------------------------
export interface JudgeTeamEvaluationItem {
  id: string
  team_name: string
  lead_name: string
  lead_email: string
  track: string
  professional_title: string
  avatar_url: string
  project_title: string
  short_description: string
  detailed_description: string
  problem_statement: string
  proposed_solution: string
  target_audience: string
  presentation_url: string | null
  portfolio_url: string | null
  city: string | null
  status: string
  is_winner?: boolean
  winner_badge?: string | null
  audience_votes: number
  // Current judge's evaluation if already scored
  my_score?: {
    id: string
    cultural_semiotics: number
    problem_solution: number
    craft_execution: number
    presentation: number
    total_score: number
    feedback: string
    status: 'draft' | 'locked'
    updated_at: string
  } | null
  // Overall jury stats
  judge_count: number
  avg_jury_score: number
  final_weighted_score: number
  rank: number
}

export async function getJudgeDashboardDataAction(judgeName: string = 'Judge Aminu Bello'): Promise<{
  success: boolean
  teams: JudgeTeamEvaluationItem[]
  hackathonState?: HackathonPublicState
  judgeName: string
  stats: {
    totalTeams: number
    evaluatedByMe: number
    pendingByMe: number
    totalVotes: number
  }
  error?: string
}> {
  try {
    const safeJudgeName = (judgeName || 'Judge Aminu Bello').trim()
    const { state: hackathonState } = await getHackathonPublicStateAction()

    // -------------------------------------------------------------------------
    // A. Local Dev Mode
    // -------------------------------------------------------------------------
    if (isLocalDevMode()) {
      const store = getLocalStore()
      const rawTeams = store.hackathon_teams || []
      const rawScores = store.hackathon_jury_scores || []
      const rawVotes = store.hackathon_votes || []

      const totalVotes = rawVotes.length
      const voteMap: Record<string, number> = {}
      rawVotes.forEach((v) => {
        voteMap[v.team_id] = (voteMap[v.team_id] || 0) + 1
      })

      const scoresByTeam: Record<string, any[]> = {}
      rawScores.forEach((s) => {
        if (!scoresByTeam[s.team_id]) scoresByTeam[s.team_id] = []
        scoresByTeam[s.team_id].push(s)
      })

      let evaluatedCount = 0

      const teams: JudgeTeamEvaluationItem[] = rawTeams.map((t) => {
        const teamScores = scoresByTeam[t.id] || []
        const myScoreObj = teamScores.find(
          (s) => s.judge_name.trim().toLowerCase() === safeJudgeName.toLowerCase()
        )

        if (myScoreObj) evaluatedCount++

        const votes = voteMap[t.id] || 0
        const audienceScore = totalVotes > 0 ? Number(((votes / totalVotes) * 100).toFixed(1)) : 0
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

        const finalWeightedScore = Number((avgJuryScore * 0.7 + audienceScore * 0.3).toFixed(1))

        return {
          id: t.id,
          team_name: t.team_name,
          lead_name: t.lead_name,
          lead_email: t.lead_email || '',
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
          city: t.city || null,
          status: t.status,
          is_winner: Boolean(t.is_winner),
          winner_badge: t.winner_badge || null,
          audience_votes: votes,
          judge_count: judgeCount,
          avg_jury_score: avgJuryScore,
          final_weighted_score: finalWeightedScore,
          rank: 1,
          my_score: myScoreObj
            ? {
                id: myScoreObj.id,
                cultural_semiotics: myScoreObj.cultural_semiotics,
                problem_solution: myScoreObj.problem_solution,
                craft_execution: myScoreObj.craft_execution,
                presentation: myScoreObj.presentation,
                total_score: myScoreObj.total_score,
                feedback: myScoreObj.feedback || '',
                status: (myScoreObj.status as any) || 'draft',
                updated_at: myScoreObj.updated_at || new Date().toISOString(),
              }
            : null,
        }
      })

      // Sort by final score descending
      teams.sort((a, b) => b.final_weighted_score - a.final_weighted_score || b.avg_jury_score - a.avg_jury_score)
      teams.forEach((t, idx) => {
        t.rank = idx + 1
      })

      return {
        success: true,
        teams,
        hackathonState,
        judgeName: safeJudgeName,
        stats: {
          totalTeams: teams.length,
          evaluatedByMe: evaluatedCount,
          pendingByMe: Math.max(0, teams.length - evaluatedCount),
          totalVotes,
        },
      }
    }

    // -------------------------------------------------------------------------
    // B. Supabase Cloud Mode
    // -------------------------------------------------------------------------
    const adminSupabase = createAdminClient()
    const hackathonId = hackathonState.id

    const [
      { data: teamsData, error: tErr },
      { data: votesData, error: vErr },
      { data: scoresData, error: sErr },
    ] = await Promise.all([
      adminSupabase
        .from('hackathon_teams')
        .select('*')
        .order('created_at', { ascending: true }),
      adminSupabase
        .from('hackathon_votes')
        .select('team_id')
        .eq('hackathon_id', hackathonId),
      adminSupabase
        .from('hackathon_jury_scores')
        .select('*')
        .eq('hackathon_id', hackathonId),
    ])

    if (tErr) throw tErr
    if (vErr) throw vErr
    if (sErr) throw sErr

    const rawTeams = (teamsData || []) as any[]
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

    let evaluatedCount = 0

    const teams: JudgeTeamEvaluationItem[] = rawTeams.map((t) => {
      const teamScores = scoresByTeam.get(t.id) || []
      const myScoreObj = teamScores.find(
        (s) => s.judge_name.trim().toLowerCase() === safeJudgeName.toLowerCase()
      )

      if (myScoreObj) evaluatedCount++

      const votes = voteMap.get(t.id) || 0
      const audienceScore = totalVotes > 0 ? Number(((votes / totalVotes) * 100).toFixed(1)) : 0
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

      const finalWeightedScore = Number((avgJuryScore * 0.7 + audienceScore * 0.3).toFixed(1))

      return {
        id: t.id,
        team_name: t.team_name,
        lead_name: t.lead_name,
        lead_email: t.lead_email || '',
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
        city: t.city || null,
        status: t.status,
        is_winner: Boolean(t.is_winner),
        winner_badge: t.winner_badge || null,
        audience_votes: votes,
        judge_count: judgeCount,
        avg_jury_score: avgJuryScore,
        final_weighted_score: finalWeightedScore,
        rank: 1,
        my_score: myScoreObj
          ? {
              id: myScoreObj.id,
              cultural_semiotics: Number(myScoreObj.cultural_semiotics) || 0,
              problem_solution: Number(myScoreObj.problem_solution) || 0,
              craft_execution: Number(myScoreObj.craft_execution) || 0,
              presentation: Number(myScoreObj.presentation) || 0,
              total_score: Number(myScoreObj.total_score) || 0,
              feedback: myScoreObj.feedback || '',
              status: myScoreObj.status || 'draft',
              updated_at: myScoreObj.updated_at || new Date().toISOString(),
            }
          : null,
      }
    })

    teams.sort((a, b) => b.final_weighted_score - a.final_weighted_score || b.avg_jury_score - a.avg_jury_score)
    teams.forEach((t, idx) => {
      t.rank = idx + 1
    })

    return {
      success: true,
      teams,
      hackathonState,
      judgeName: safeJudgeName,
      stats: {
        totalTeams: teams.length,
        evaluatedByMe: evaluatedCount,
        pendingByMe: Math.max(0, teams.length - evaluatedCount),
        totalVotes,
      },
    }
  } catch (err: unknown) {
    console.error('[Judge Dashboard Error] getJudgeDashboardDataAction:', err)
    return {
      success: false,
      teams: [],
      judgeName,
      stats: { totalTeams: 0, evaluatedByMe: 0, pendingByMe: 0, totalVotes: 0 },
      error: err instanceof Error ? err.message : 'Database error fetching judge dashboard data.',
    }
  }
}

// -----------------------------------------------------------------------------
// 6. Save Judge Evaluation Decision & Rubric Scoring
// -----------------------------------------------------------------------------
export async function saveJudgeEvaluationAction(
  input: JuryScoreInput
): Promise<{ success: boolean; message?: string; totalScore?: number; error?: string }> {
  try {
    const judgeName = input.judge_name?.trim()
    if (!judgeName) {
      return { success: false, error: 'Judge name is required to submit evaluation.' }
    }

    const cultural = Math.min(25, Math.max(0, Number(input.cultural_semiotics) || 0))
    const problem = Math.min(25, Math.max(0, Number(input.problem_solution) || 0))
    const craft = Math.min(25, Math.max(0, Number(input.craft_execution) || 0))
    const presentation = Math.min(25, Math.max(0, Number(input.presentation) || 0))
    const totalScore = Number((cultural + problem + craft + presentation).toFixed(2))

    if (isLocalDevMode()) {
      saveLocalJuryScore({
        hackathon_id: input.hackathon_id,
        team_id: input.team_id,
        judge_name: judgeName,
        judge_email: input.judge_email,
        cultural_semiotics: cultural,
        problem_solution: problem,
        craft_execution: craft,
        presentation,
        total_score: totalScore,
        feedback: input.feedback,
        status: input.status || 'draft',
      })

      revalidatePath('/dashboard/judge')
      revalidatePath('/hackathon/leaderboard')
      revalidatePath('/admin')

      return {
        success: true,
        message: `Evaluation recorded for ${judgeName}: ${totalScore}/100 total score.`,
        totalScore,
      }
    }

    const result = await adminSaveJuryScoreAction({
      ...input,
      judge_name: judgeName,
      cultural_semiotics: cultural,
      problem_solution: problem,
      craft_execution: craft,
      presentation,
      status: input.status || 'draft',
    })

    revalidatePath('/dashboard/judge')
    return result
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to record judge score.',
    }
  }
}
