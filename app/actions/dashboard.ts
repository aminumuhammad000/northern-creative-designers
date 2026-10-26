'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
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
    const supabase = await createClient()
    const adminSupabase = createAdminClient()
    const cookieStore = await cookies()

    // 1. Identify User Session
    const { data: { user } } = await supabase.auth.getUser()

    let registration: any = null
    let ticket: any = null

    if (user?.id || user?.email) {
      // Look up by auth user_id or email
      const { data: regByUser } = await adminSupabase
        .from('registrations')
        .select('*, tickets(*)')
        .or(`user_id.eq.${user?.id || '00000000-0000-0000-0000-000000000000'},email.eq.${user?.email || ''}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (regByUser) {
        registration = regByUser
        ticket = regByUser.tickets?.[0] || null
      }
    }

    // Fallback: If not logged in via Auth, look for most recent confirmed registration
    if (!registration) {
      const { data: latestReg } = await adminSupabase
        .from('registrations')
        .select('*, tickets(*)')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (latestReg) {
        registration = latestReg
        ticket = latestReg.tickets?.[0] || null
      }
    }

    // Default attendee object if table is completely empty
    const attendee = {
      id: registration?.id || '00000000-0000-0000-0000-000000000000',
      name: registration?.full_name || 'Summit Delegate',
      email: registration?.email || user?.email || 'delegate@northcdesigner.com.ng',
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
      // Get all shortlisted teams
      const { data: dbTeams } = await adminSupabase
        .from('hackathon_teams')
        .select('id, team_name, track, team_size, lead_name, status')
        .eq('hackathon_id', hackathon.id)

      // Get all cast votes
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
    const adminSupabase = createAdminClient()
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

    // 2. Fetch active hackathon
    const { data: hackathon, error: hError } = await adminSupabase
      .from('hackathons')
      .select('id')
      .eq('status', 'active')
      .maybeSingle()

    if (hError || !hackathon) {
      return { success: false, error: 'Voting is not open or active hackathon was not found.' }
    }

    // 3. Insert vote into database (unique constraint prevents multiple votes per voterToken)
    const { error: voteErr } = await adminSupabase.from('hackathon_votes').insert({
      hackathon_id: hackathon.id,
      team_id: teamId,
      voter_token: voterToken,
    })

    if (voteErr) {
      if (voteErr.code === '23505') {
        // Unique violation
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
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: unknown) {
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
    referenceCode: string
    cityState: string
    ticketToken?: string
  }
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()
    const cleanQuery = query.trim()

    if (!cleanQuery) {
      return { success: false, error: 'Please enter a search query.' }
    }

    // Search by reference_code, email, or full_name
    const { data: reg, error } = await adminSupabase
      .from('registrations')
      .select('*, tickets(ticket_token)')
      .or(`reference_code.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%,full_name.ilike.%${cleanQuery}%`)
      .limit(1)
      .maybeSingle()

    if (error || !reg) {
      // Check if querying by ticket token directly
      const { data: ticket } = await adminSupabase
        .from('tickets')
        .select('*, registrations(*)')
        .ilike('ticket_token', `%${cleanQuery}%`)
        .limit(1)
        .maybeSingle()

      if (ticket?.registrations) {
        const r = ticket.registrations as any
        return {
          success: true,
          delegate: {
            name: r.full_name,
            email: r.email,
            role: r.creative_discipline,
            referenceCode: r.reference_code,
            cityState: r.city_state,
            ticketToken: ticket.ticket_token,
          },
        }
      }

      return { success: false, error: 'No attendee found matching that credential.' }
    }

    return {
      success: true,
      delegate: {
        name: reg.full_name,
        email: reg.email,
        role: reg.creative_discipline,
        referenceCode: reg.reference_code,
        cityState: reg.city_state,
        ticketToken: reg.tickets?.[0]?.ticket_token,
      },
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Search error.',
    }
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
    const adminSupabase = createAdminClient()

    // Fetch confirmed or pending exhibitor application
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
    const adminSupabase = createAdminClient()

    // 1. Get event
    const { data: event } = await adminSupabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .single()

    if (!event) {
      return { success: false, error: 'Event not found.' }
    }

    const referenceCode = `NCD26-VIP-${Math.floor(9000 + Math.random() * 999)}`
    const ticketToken = `TKT-VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // 2. Insert VIP registration
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

    // 3. Insert VIP ticket
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

