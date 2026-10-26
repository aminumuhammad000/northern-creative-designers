'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export interface AdminMetrics {
  totalRegistrations: number
  totalTickets: number
  checkedInCount: number
  totalExhibitors: number
  totalHackathonTeams: number
  totalVotesCast: number
}

export async function getAdminMetricsAction(): Promise<{
  success: boolean
  metrics?: AdminMetrics
  error?: string
}> {
  try {
    const adminSupabase = createAdminClient()

    const [
      { count: regCount },
      { count: tktCount },
      { count: checkedInCount },
      { count: exhCount },
      { count: teamCount },
      { count: voteCount },
    ] = await Promise.all([
      adminSupabase.from('registrations').select('*', { count: 'exact', head: true }),
      adminSupabase.from('tickets').select('*', { count: 'exact', head: true }),
      adminSupabase.from('tickets').select('*', { count: 'exact', head: true }).eq('checked_in', true),
      adminSupabase.from('exhibitor_applications').select('*', { count: 'exact', head: true }),
      adminSupabase.from('hackathon_teams').select('*', { count: 'exact', head: true }),
      adminSupabase.from('hackathon_votes').select('*', { count: 'exact', head: true }),
    ])

    return {
      success: true,
      metrics: {
        totalRegistrations: regCount || 0,
        totalTickets: tktCount || 0,
        checkedInCount: checkedInCount || 0,
        totalExhibitors: exhCount || 0,
        totalHackathonTeams: teamCount || 0,
        totalVotesCast: voteCount || 0,
      },
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to query admin statistics.',
    }
  }
}

export async function adminSignInAction(email: string, pass: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Authentication failed.',
    }
  }
}
