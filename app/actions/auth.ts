'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface RegistrationData {
  fullName: string
  email: string
  password?: string
  phone: string
  cityState: string
  creativeRole: string
  experienceLevel: string
  organization?: string
  portfolioUrl?: string
  interests?: string[]
  tshirtSize?: string
  dietaryRequirements?: string
  specialExpectations?: string
}

export async function registerAttendeeAction(data: RegistrationData) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const isMock = !supabaseUrl || supabaseUrl.includes('your-project')

    // Generate cryptographic-style unique summit pass reference
    const referenceCode = `NCD26-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    const ticketToken = `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

    if (isMock) {
      // In demo mode when Supabase credentials are still default placeholders
      return {
        success: true,
        referenceCode,
        ticketToken,
        message: 'Registration created in local preview mode. Add production Supabase keys to .env.local to persist directly to database.',
        data,
      }
    }

    const supabase = await createClient()

    // 1. Create Auth Account if password provided
    let userId: string | null = null
    if (data.password) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
            role: 'attendee',
          },
        },
      })

      if (authError && !authError.message.includes('already registered')) {
        return { success: false, error: authError.message }
      }

      userId = authData?.user?.id || null
    }

    // 2. Fetch default active event
    const { data: event } = await supabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .maybeSingle()

    const eventId = event?.id || '00000000-0000-0000-0000-000000000000'

    // 3. Insert Registration Record
    const { data: reg, error: regError } = await supabase
      .from('registrations')
      .insert({
        user_id: userId,
        event_id: eventId,
        reference_code: referenceCode,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        creative_discipline: data.creativeRole,
        experience_level: data.experienceLevel,
        city_state: data.cityState,
        organization: data.organization || null,
        portfolio_url: data.portfolioUrl || null,
        interests: data.interests || null,
        tshirt_size: data.tshirtSize || 'L',
        dietary_requirements: data.dietaryRequirements || null,
        special_expectations: data.specialExpectations || null,
        status: 'confirmed',
      })
      .select('id')
      .single()

    if (regError) {
      return { success: false, error: regError.message }
    }

    // 4. Generate Ticket Record
    if (reg?.id) {
      await supabase.from('tickets').insert({
        event_id: eventId,
        registration_id: reg.id,
        ticket_token: ticketToken,
        status: 'valid',
      })
    }

    revalidatePath('/dashboard')
    return {
      success: true,
      referenceCode,
      ticketToken,
      data,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected registration error occurred.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const isMock = !supabaseUrl || supabaseUrl.includes('your-project')

  if (isMock) {
    // In mock/preview mode, simulate sign-in to demonstrate the dashboard
    return { success: true, redirectUrl: '/dashboard' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, redirectUrl: '/dashboard' }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed.'
    return { success: false, error: message }
  }
}

export async function signOutAction() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const isMock = !supabaseUrl || supabaseUrl.includes('your-project')

  if (!isMock) {
    try {
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
  }

  redirect('/login')
}
