'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import {
  isLocalDevMode,
  getLocalAttendeeData,
  castLocalHackathonVote,
  updateLocalAttendeeProfile,
  getLocalStore,
} from '@/lib/supabase/local-db'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface AttendeeDashboardData {
  attendee: {
    id: string
    name: string
    email: string
    role: string
    experience: string
    organization: string
    cityState: string
    referenceCode: string
    ticketToken: string
    tshirtSize: string
    dietary: string
    interests: string[]
  }
  hackathon: {
    id: string
    title: string
    status: string
  } | null
  teams: Array<{
    id: string
    name: string
    track: string
    teamSize: number
    leadName: string
    status: string
    votes: number
    percentage: number
  }>
  hasVotedTeamId: string | null
  totalVotes: number
}

export async function getAttendeeDashboardDataAction(): Promise<{
  success: boolean
  data?: AttendeeDashboardData
  error?: string
}> {
  try {
    const cookieStore = await cookies()
    const sessionEmail = cookieStore.get('ncd_session_email')?.value

    // -------------------------------------------------------------------------
    // 1. Local Development Mode
    // -------------------------------------------------------------------------
    if (isLocalDevMode()) {
      const localData = getLocalAttendeeData(sessionEmail)
      let voterToken = cookieStore.get('ncd_voter_token')?.value
      let hasVotedTeamId: string | null = null

      if (voterToken && localData.hackathon?.id) {
        const store = getLocalStore()
        const existingVote = store.hackathon_votes.find(
          (v) => v.hackathon_id === localData.hackathon?.id && v.voter_token === voterToken
        )
        if (existingVote) {
          hasVotedTeamId = existingVote.team_id
        }
      }

      return {
        success: true,
        data: {
          attendee: localData.attendee,
          hackathon: localData.hackathon,
          teams: localData.teams,
          hasVotedTeamId,
          totalVotes: localData.totalVotes,
        },
      }
    }

    // -------------------------------------------------------------------------
    // 2. Live Supabase Cloud Mode
    // -------------------------------------------------------------------------
    const supabase = await createClient()
    const adminSupabase = createAdminClient()

    // 1. Identify User Session
    let userEmail: string | undefined = sessionEmail
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) userEmail = user.email
    } catch {
      // Session fallback to cookie
    }

    let registration: any = null
    let ticket: any = null

    if (userEmail) {
      const { data: regByUser, error: regErr } = await adminSupabase
        .from('registrations')
        .select('*, tickets(*)')
        .ilike('email', userEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (isDatabaseConnectionError(regErr)) {
        throw regErr
      }

      if (regByUser) {
        registration = regByUser
        ticket = regByUser.tickets?.[0] || null
      }
    }

    // Fallback: If not logged in via Auth, look for most recent confirmed registration
    if (!registration) {
      const { data: latestReg, error: latestErr } = await adminSupabase
        .from('registrations')
        .select('*, tickets(*)')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (isDatabaseConnectionError(latestErr)) {
        throw latestErr
      }

      if (latestReg) {
        registration = latestReg
        ticket = latestReg.tickets?.[0] || null
      }
    }

    // Default attendee object if table is completely empty
    const attendee = {
      id: registration?.id || '00000000-0000-0000-0000-000000000000',
      name: registration?.full_name || 'Attendee',
      email: registration?.email || userEmail || 'delegate@northcdesigner.com.ng',
      role: registration?.creative_discipline || 'UI/UX & Product Design',
      experience: registration?.experience_level || 'Mid-Level (3-5 years)',
      organization: registration?.organization || 'Northern Creative Studio',
      cityState: registration?.city_state || 'Kano, Nigeria',
      referenceCode: registration?.reference_code || 'NCD26-DELEGATE',
      ticketToken: ticket?.ticket_token || 'TKT-VALID-PASS',
      tshirtSize: registration?.tshirt_size || 'L',
      dietary: registration?.dietary_requirements || 'Standard / Halal',
      interests: registration?.interests || ['Live Design Hackathon', 'Masterclasses'],
    }

    // 2. Fetch Active Hackathon & Competing Teams
    const { data: hackathon } = await adminSupabase
      .from('hackathons')
      .select('id, title, status')
      .eq('status', 'active')
      .maybeSingle()

    let teams: any[] = []
    let totalVotes = 0
    let voteCountsByTeam: Record<string, number> = {}

    if (hackathon?.id) {
      const { data: dbTeams } = await adminSupabase
        .from('hackathon_teams')
        .select('id, team_name, track, team_size, lead_name, status')
        .eq('hackathon_id', hackathon.id)

      const { data: votes } = await adminSupabase
        .from('hackathon_votes')
        .select('team_id, voter_token')
        .eq('hackathon_id', hackathon.id)

      if (votes) {
        totalVotes = votes.length
        votes.forEach((v) => {
          voteCountsByTeam[v.team_id] = (voteCountsByTeam[v.team_id] || 0) + 1
        })
      }

      teams = (dbTeams || []).map((t) => {
        const count = voteCountsByTeam[t.id] || 0
        const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
        return {
          id: t.id,
          name: t.team_name,
          track: t.track,
          teamSize: t.team_size,
          leadName: t.lead_name,
          status: t.status,
          votes: count,
          percentage,
        }
      })
    }

    // 3. Determine if current client has already voted
    let voterToken = cookieStore.get('ncd_voter_token')?.value
    let hasVotedTeamId: string | null = null

    if (voterToken && hackathon?.id) {
      const { data: existingVote } = await adminSupabase
        .from('hackathon_votes')
        .select('team_id')
        .eq('hackathon_id', hackathon.id)
        .eq('voter_token', voterToken)
        .maybeSingle()

      if (existingVote) {
        hasVotedTeamId = existingVote.team_id
      }
    }

    return {
      success: true,
      data: {
        attendee,
        hackathon: hackathon || null,
        teams,
        hasVotedTeamId,
        totalVotes,
      },
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      console.warn('[Supabase Warning] Database unreachable. Providing local attendee data.')
      const cookieStore = await cookies()
      const sessionEmail = cookieStore.get('ncd_session_email')?.value
      const localData = getLocalAttendeeData(sessionEmail)
      return {
        success: true,
        data: {
          attendee: localData.attendee,
          hackathon: localData.hackathon,
          teams: localData.teams,
          hasVotedTeamId: null,
          totalVotes: localData.totalVotes,
        },
      }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to fetch dashboard data.',
    }
  }
}

export async function castHackathonVoteAction(teamId: string): Promise<{
  success: boolean
  hasVotedTeamId?: string
  totalVotes?: number
  teams?: AttendeeDashboardData['teams']
  error?: string
}> {
  try {
    const cookieStore = await cookies()

    // 1. Get or create voter token in cookies
    let voterToken = cookieStore.get('ncd_voter_token')?.value
    if (!voterToken) {
      voterToken = `voter_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`
      cookieStore.set('ncd_voter_token', voterToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }

    if (isLocalDevMode()) {
      const store = getLocalStore()
      const activeHackathon = store.hackathons[0]
      const hId = activeHackathon?.id || 'h0000000-0000-0000-0000-000000000001'
      castLocalHackathonVote(hId, teamId, voterToken)
      const updated = getLocalAttendeeData()
      revalidatePath('/dashboard')
      return {
        success: true,
        hasVotedTeamId: teamId,
        totalVotes: updated.totalVotes,
        teams: updated.teams,
      }
    }

    const adminSupabase = createAdminClient()

    // 2. Fetch active hackathon
    const { data: hackathon, error: hError } = await adminSupabase
      .from('hackathons')
      .select('id')
      .eq('status', 'active')
      .maybeSingle()

    if (hError || !hackathon) {
      return { success: false, error: 'Voting is not open or active hackathon was not found.' }
    }

    // 3. Insert vote into database
    const { error: voteErr } = await adminSupabase.from('hackathon_votes').insert({
      hackathon_id: hackathon.id,
      team_id: teamId,
      voter_token: voterToken,
    })

    if (voteErr) {
      if (voteErr.code === '23505') {
        return { success: false, error: 'You have already cast your vote for this stage sprint.' }
      }
      return { success: false, error: voteErr.message }
    }

    // 4. Return updated tallies
    const { data: dbTeams } = await adminSupabase
      .from('hackathon_teams')
      .select('id, team_name, track, team_size, lead_name, status')
      .eq('hackathon_id', hackathon.id)

    const { data: allVotes } = await adminSupabase
      .from('hackathon_votes')
      .select('team_id')
      .eq('hackathon_id', hackathon.id)

    const totalVotes = allVotes?.length || 0
    const counts: Record<string, number> = {}
    allVotes?.forEach((v) => {
      counts[v.team_id] = (counts[v.team_id] || 0) + 1
    })

    const updatedTeams = (dbTeams || []).map((t) => {
      const count = counts[t.id] || 0
      const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
      return {
        id: t.id,
        name: t.team_name,
        track: t.track,
        teamSize: t.team_size,
        leadName: t.lead_name,
        status: t.status,
        votes: count,
        percentage,
      }
    })

    revalidatePath('/dashboard')
    return {
      success: true,
      hasVotedTeamId: teamId,
      totalVotes,
      teams: updatedTeams,
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      const cookieStore = await cookies()
      const voterToken = cookieStore.get('ncd_voter_token')?.value || 'local-voter'
      castLocalHackathonVote('h0000000-0000-0000-0000-000000000001', teamId, voterToken)
      const updated = getLocalAttendeeData()
      revalidatePath('/dashboard')
      return {
        success: true,
        hasVotedTeamId: teamId,
        totalVotes: updated.totalVotes,
        teams: updated.teams,
      }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to cast vote.',
    }
  }
}

export async function updateAttendeeProfileAction(
  registrationId: string,
  updates: {
    fullName: string
    creativeRole: string
    cityState: string
    organization?: string
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    if (isLocalDevMode()) {
      updateLocalAttendeeProfile(registrationId, updates)
      revalidatePath('/dashboard')
      return { success: true }
    }

    const adminSupabase = createAdminClient()

    const { error } = await adminSupabase
      .from('registrations')
      .update({
        full_name: updates.fullName,
        creative_discipline: updates.creativeRole,
        city_state: updates.cityState,
        organization: updates.organization || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', registrationId)

    if (error) {
      if (isDatabaseConnectionError(error)) {
        updateLocalAttendeeProfile(registrationId, updates)
        revalidatePath('/dashboard')
        return { success: true }
      }
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      updateLocalAttendeeProfile(registrationId, updates)
      revalidatePath('/dashboard')
      return { success: true }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update profile.',
    }
  }
}

export async function searchDelegateBadgeAction(query: string): Promise<{
  success: boolean
  delegate?: {
    name: string
    email: string
    role: string
    cityState: string
    referenceCode: string
  }
  error?: string
}> {
  try {
    const q = query.trim().toLowerCase()
    if (!q) return { success: false, error: 'Query is empty.' }

    if (isLocalDevMode()) {
      const store = getLocalStore()
      const found = store.registrations.find(
        (r) =>
          r.reference_code.toLowerCase() === q ||
          r.email.toLowerCase() === q ||
          r.full_name.toLowerCase().includes(q)
      )
      if (found) {
        return {
          success: true,
          delegate: {
            name: found.full_name,
            email: found.email,
            role: found.creative_discipline,
            cityState: found.city_state || 'Kano, Nigeria',
            referenceCode: found.reference_code,
          },
        }
      }
      return { success: false, error: 'No matching delegate badge found.' }
    }

    const adminSupabase = createAdminClient()
    const { data: reg, error } = await adminSupabase
      .from('registrations')
      .select('full_name, email, creative_discipline, city_state, reference_code')
      .or(`reference_code.ilike.%${q}%,email.ilike.%${q}%,full_name.ilike.%${q}%`)
      .limit(1)
      .maybeSingle()

    if (error || !reg) {
      return { success: false, error: 'No matching delegate badge found.' }
    }

    return {
      success: true,
      delegate: {
        name: reg.full_name,
        email: reg.email,
        role: reg.creative_discipline,
        cityState: reg.city_state || 'Kano, Nigeria',
        referenceCode: reg.reference_code,
      },
    }
  } catch {
    return { success: false, error: 'Lookup failed.' }
  }
}

export async function getExhibitorDashboardDataAction(): Promise<{
  success: boolean
  exhibitor?: {
    id: string
    businessName: string
    contactPerson: string
    email: string
    phone: string
    category: string
    description: string
    status: string
    assignedBooth: string
  }
  error?: string
}> {
  try {
    const cookieStore = await cookies()
    const sessionEmail = cookieStore.get('ncd_session_email')?.value

    if (isLocalDevMode()) {
      const store = getLocalStore()
      const app =
        store.exhibitor_applications.find(
          (e) => e.email.toLowerCase() === (sessionEmail || '').toLowerCase()
        ) || store.exhibitor_applications[0]

      if (app) {
        return {
          success: true,
          exhibitor: {
            id: app.id,
            businessName: app.business_name,
            contactPerson: app.contact_person,
            email: app.email,
            phone: app.phone,
            category: app.category,
            description: app.description,
            status: app.status,
            assignedBooth: app.assigned_booth,
          },
        }
      }

      return {
        success: true,
        exhibitor: {
          id: 'exh-0',
          businessName: 'Arewa Creative Studio & Apparel',
          contactPerson: 'Hadiza Sani',
          email: sessionEmail || 'vendor@northcdesigner.com.ng',
          phone: '0803 0058 919',
          category: 'Design Agency / Studio',
          description: 'Contemporary Northern craft, branding & apparel.',
          status: 'approved',
          assignedBooth: 'Booth #M-12',
        },
      }
    }

    const adminSupabase = createAdminClient()
    const { data: app, error } = await adminSupabase
      .from('exhibitor_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !app) {
      return {
        success: true,
        exhibitor: {
          id: 'exh-0',
          businessName: 'Arewa Creative Studio & Apparel',
          contactPerson: 'Hadiza Sani',
          email: 'vendor@northcdesigner.com.ng',
          phone: '0803 0058 919',
          category: 'Design Agency / Studio',
          description: 'Contemporary Northern craft, branding & apparel.',
          status: 'approved',
          assignedBooth: 'Booth #M-12',
        },
      }
    }

    return {
      success: true,
      exhibitor: {
        id: app.id,
        businessName: app.business_name,
        contactPerson: app.contact_person,
        email: app.email,
        phone: app.phone,
        category: app.category,
        description: app.description,
        status: app.status,
        assignedBooth: app.assigned_booth || 'Booth #M-12',
      },
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      console.warn('[Supabase Warning] Database unreachable. Providing fallback exhibitor dashboard.')
      return {
        success: true,
        exhibitor: {
          id: 'exh-0',
          businessName: 'Arewa Creative Studio & Apparel',
          contactPerson: 'Hadiza Sani',
          email: 'vendor@northcdesigner.com.ng',
          phone: '0803 0058 919',
          category: 'Design Agency / Studio',
          description: 'Contemporary Northern craft, branding & apparel.',
          status: 'approved',
          assignedBooth: 'Booth #M-12',
        },
      }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to fetch exhibitor data.',
    }
  }
}

export interface VipDelegateData {
  id?: string
  name: string
  email: string
  title: string
  ticketRef?: string
}

export async function assignVipPassAction(data: VipDelegateData): Promise<{
  success: boolean
  delegate?: VipDelegateData
  error?: string
}> {
  try {
    const referenceCode = `NCD26-VIP-${Math.floor(9000 + Math.random() * 999)}`
    const ticketToken = `TKT-VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    if (isLocalDevMode()) {
      const store = getLocalStore()
      const id = `vip_${Date.now()}`
      store.registrations.unshift({
        id,
        user_id: null,
        event_id: 'e0000000-0000-0000-0000-000000000001',
        reference_code: referenceCode,
        full_name: data.name,
        email: data.email,
        phone: 'VIP Sponsor Delegate',
        creative_discipline: data.title || 'Corporate VIP Delegate',
        experience_level: 'Executive',
        city_state: 'Kano, Nigeria',
        tshirt_size: 'XL',
        status: 'confirmed',
        created_at: new Date().toISOString(),
      })
      store.tickets.unshift({
        id: `tkt_${id}`,
        event_id: 'e0000000-0000-0000-0000-000000000001',
        registration_id: id,
        ticket_token: ticketToken,
        status: 'valid',
        checked_in: false,
        checked_in_at: null,
        created_at: new Date().toISOString(),
      })
      return {
        success: true,
        delegate: {
          id,
          name: data.name,
          email: data.email,
          title: data.title || 'Executive Delegate',
          ticketRef: referenceCode,
        },
      }
    }

    const adminSupabase = createAdminClient()
    const { data: event } = await adminSupabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .single()

    if (!event) {
      return { success: false, error: 'Event not found.' }
    }

    const { data: reg, error: regError } = await adminSupabase
      .from('registrations')
      .insert({
        event_id: event.id,
        reference_code: referenceCode,
        full_name: data.name,
        email: data.email,
        phone: 'VIP Sponsor Delegate',
        creative_discipline: data.title || 'Corporate VIP Delegate',
        experience_level: 'Executive',
        city_state: 'Kano, Nigeria',
        status: 'confirmed',
      })
      .select('id')
      .single()

    if (regError) {
      return { success: false, error: regError.message }
    }

    await adminSupabase.from('tickets').insert({
      event_id: event.id,
      registration_id: reg.id,
      ticket_token: ticketToken,
      status: 'valid',
    })

    return {
      success: true,
      delegate: {
        id: reg.id,
        name: data.name,
        email: data.email,
        title: data.title || 'Executive Delegate',
        ticketRef: referenceCode,
      },
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to issue VIP pass.',
    }
  }
}

export async function removeVipPassAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (isLocalDevMode()) {
      const store = getLocalStore()
      store.registrations = store.registrations.filter((r) => r.id !== id)
      store.tickets = store.tickets.filter((t) => t.registration_id !== id)
      return { success: true }
    }

    const adminSupabase = createAdminClient()
    await adminSupabase.from('registrations').delete().eq('id', id)
    return { success: true }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to remove VIP pass.',
    }
  }
}
