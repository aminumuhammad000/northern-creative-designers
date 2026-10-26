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

export interface HackathonTeamData {
  teamName: string
  leadName: string
  leadEmail: string
  leadPhone: string
  teamSize: string
  track: string
  portfolioUrl: string
  teamSummary: string
}

export async function registerHackathonTeamAction(data: HackathonTeamData) {
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

    // 2. Insert team
    const { data: team, error } = await adminSupabase
      .from('hackathon_teams')
      .insert({
        hackathon_id: hackathon.id,
        team_name: data.teamName,
        lead_name: data.leadName,
        lead_email: data.leadEmail,
        lead_phone: data.leadPhone,
        team_size: parseInt(data.teamSize, 10) || 2,
        track: data.track,
        portfolio_url: data.portfolioUrl || null,
        status: 'applied',
      })
      .select('id')
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, id: team.id }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit team registration.',
    }
  }
}
