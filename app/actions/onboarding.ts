'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export interface ExhibitorApplicationData {
  businessName: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  category: string
  description: string
  specialRequirements?: string
}

export async function submitExhibitorApplicationAction(data: ExhibitorApplicationData) {
  try {
    const adminSupabase = createAdminClient()

    // 1. Fetch default active event
    const { data: event, error: eventErr } = await adminSupabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .maybeSingle()

    if (eventErr || !event) {
      return { success: false, error: 'Summit event not found.' }
    }

    // 2. Insert exhibitor application
    const { data: app, error } = await adminSupabase
      .from('exhibitor_applications')
      .insert({
        event_id: event.id,
        business_name: data.businessName,
        contact_person: data.contactPerson,
        email: data.email,
        phone: data.phone,
        website: data.website || null,
        category: data.category,
        description: data.description,
        special_requirements: data.specialRequirements || null,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, id: app.id }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit application.',
    }
  }
}

export interface HackathonRegistrationData {
  name: string
  organization?: string
  email: string
  phone: string
  gender: string
  city: string
  category: string // 'Brand Identity' | 'UI/UX'
  portfolioUrl: string
}

// Backward compatibility interface
export type HackathonTeamData = HackathonRegistrationData

export async function registerHackathonAction(data: HackathonRegistrationData) {
  try {
    const adminSupabase = createAdminClient()

    // 1. Fetch active hackathon
    const { data: hackathon, error: hackathonErr } = await adminSupabase
      .from('hackathons')
      .select('id')
      .eq('status', 'active')
      .maybeSingle()

    if (hackathonErr || !hackathon) {
      return { success: false, error: 'Active hackathon not found.' }
    }

    // 2. Prepare contestant identifier and details
    const candidateName = data.name.trim()
    const orgSuffix = data.organization?.trim() ? ` (${data.organization.trim()})` : ""
    const citySuffix = data.city?.trim() ? ` [${data.city.trim()}]` : ""
    const contestantIdentifier = `${candidateName}${orgSuffix}${citySuffix}`

    // 3. Insert individual contestant
    const { data: team, error } = await adminSupabase
      .from('hackathon_teams')
      .insert({
        hackathon_id: hackathon.id,
        team_name: contestantIdentifier,
        lead_name: candidateName,
        lead_email: data.email.trim().toLowerCase(),
        lead_phone: data.phone.trim(),
        team_size: 1, // Individual registration
        track: data.category.trim(),
        portfolio_url: data.portfolioUrl.trim() || null,
        status: 'applied',
      })
      .select('id')
      .single()

    if (error) {
      // Handle potential unique constraint collision on team_name
      if (error.code === '23505') {
        const fallbackIdentifier = `${candidateName}${citySuffix} - ${Date.now().toString().slice(-4)}`
        const { data: retryTeam, error: retryError } = await adminSupabase
          .from('hackathon_teams')
          .insert({
            hackathon_id: hackathon.id,
            team_name: fallbackIdentifier,
            lead_name: candidateName,
            lead_email: data.email.trim().toLowerCase(),
            lead_phone: data.phone.trim(),
            team_size: 1,
            track: data.category.trim(),
            portfolio_url: data.portfolioUrl.trim() || null,
            status: 'applied',
          })
          .select('id')
          .single()

        if (retryError) {
          return { success: false, error: retryError.message }
        }
        return { success: true, id: retryTeam.id }
      }
      return { success: false, error: error.message }
    }

    return { success: true, id: team.id }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit registration.',
    }
  }
}

// Backward compatibility alias
export async function registerHackathonTeamAction(data: any) {
  // Map legacy fields if passed
  const formattedData: HackathonRegistrationData = {
    name: data.name || data.leadName || '',
    organization: data.organization || '',
    email: data.email || data.leadEmail || '',
    phone: data.phone || data.leadPhone || '',
    gender: data.gender || 'Not Specified',
    city: data.city || data.location || 'Kano',
    category: data.category || data.track || 'Brand Identity',
    portfolioUrl: data.portfolioUrl || '',
  }
  return registerHackathonAction(formattedData)
}
