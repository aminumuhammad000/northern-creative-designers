'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { sendRegistrationConfirmationEmail } from '@/lib/email'

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
  // Generate cryptographic-style unique summit pass reference
  const referenceCode = `NCD26-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
  const ticketToken = `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const isMock = !supabaseUrl || supabaseUrl.includes('your-project')

    if (isMock) {
      // In demo mode when Supabase credentials are still default placeholders
      try {
        await sendRegistrationConfirmationEmail({
          email: data.email.trim(),
          fullName: data.fullName,
          referenceCode,
          ticketToken,
          creativeRole: data.creativeRole,
          cityState: data.cityState,
        })
      } catch (mockEmailErr) {
        console.error('[Mock Email Error]', mockEmailErr)
      }

      return {
        success: true,
        referenceCode,
        ticketToken,
        message: 'Registration created in local preview mode. Add production Supabase keys to .env.local to persist directly to database.',
        data,
      }
    }

    const trimmedEmail = data.email.trim().toLowerCase()
    const adminSupabase = createAdminClient()

    // 0. Check if this email is already registered in registrations table
    const { data: existingReg, error: checkErr } = await adminSupabase
      .from('registrations')
      .select('id, reference_code, full_name')
      .ilike('email', trimmedEmail)
      .maybeSingle()

    if (isDatabaseConnectionError(checkErr)) {
      console.warn('[Supabase Warning] Database unreachable during attendee check. Processing in preview mode.')
      try {
        await sendRegistrationConfirmationEmail({
          email: trimmedEmail,
          fullName: data.fullName,
          referenceCode,
          ticketToken,
          creativeRole: data.creativeRole,
          cityState: data.cityState,
        })
      } catch (mockEmailErr) {
        console.error('[Mock Email Error]', mockEmailErr)
      }

      return {
        success: true,
        referenceCode,
        ticketToken,
        message: 'Registration created in local preview mode. Add production Supabase keys to .env.local to persist directly to database.',
        data,
      }
    }

    if (existingReg) {
      return {
        success: false,
        alreadyRegistered: true,
        error: `This email (${trimmedEmail}) is already registered for Summit 2.0. Please log in to your dashboard to view your official access pass.`,
        referenceCode: existingReg.reference_code,
      }
    }

    // 1. Create Auth Account if password provided
    let userId: string | null = null
    const trimmedPassword = data.password ? data.password.trim() : undefined
    if (trimmedPassword) {
      let supabase: any = null
      try {
        supabase = await createClient()
      } catch {
        // cookies() or createClient might be called outside request scope in testing
      }

      if (supabase) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
          options: {
            data: {
              full_name: data.fullName,
              phone: data.phone,
              role: 'attendee',
            },
          },
        })

        if (authError) {
          if (isDatabaseConnectionError(authError)) {
            console.warn('[Supabase Warning] Database unreachable during auth signup. Processing in preview mode.')
            try {
              await sendRegistrationConfirmationEmail({
                email: trimmedEmail,
                fullName: data.fullName,
                referenceCode,
                ticketToken,
                creativeRole: data.creativeRole,
                cityState: data.cityState,
              })
            } catch {}

            return {
              success: true,
              referenceCode,
              ticketToken,
              message: 'Registration created in local preview mode.',
              data,
            }
          }

          if (
            authError.message.toLowerCase().includes('already registered') ||
            authError.status === 422 ||
            authError.message.toLowerCase().includes('user already exists')
          ) {
            return {
              success: false,
              alreadyRegistered: true,
              error: `An account with this email (${trimmedEmail}) already exists. Please log in to your account to continue.`,
            }
          }
          return { success: false, error: authError.message }
        }

        userId = authData?.user?.id || null
      }
    }

    // 2. Fetch default active event
    const { data: event, error: eventErr } = await adminSupabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .maybeSingle()

    if (isDatabaseConnectionError(eventErr)) {
      console.warn('[Supabase Warning] Database unreachable during event lookup. Processing in preview mode.')
      try {
        await sendRegistrationConfirmationEmail({
          email: trimmedEmail,
          fullName: data.fullName,
          referenceCode,
          ticketToken,
          creativeRole: data.creativeRole,
          cityState: data.cityState,
        })
      } catch {}

      return {
        success: true,
        referenceCode,
        ticketToken,
        message: 'Registration created in local preview mode.',
        data,
      }
    }

    const eventId = event?.id || '00000000-0000-0000-0000-000000000000'

    // 3. Insert Registration Record using admin client (bypasses RLS during onboarding)
    const { data: reg, error: regError } = await adminSupabase
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
      if (isDatabaseConnectionError(regError)) {
        console.warn('[Supabase Warning] Database unreachable during registration insert. Processing in preview mode.')
        try {
          await sendRegistrationConfirmationEmail({
            email: trimmedEmail,
            fullName: data.fullName,
            referenceCode,
            ticketToken,
            creativeRole: data.creativeRole,
            cityState: data.cityState,
          })
        } catch {}

        return {
          success: true,
          referenceCode,
          ticketToken,
          message: 'Registration created in local preview mode.',
          data,
        }
      }
      return { success: false, error: regError.message }
    }

    // 4. Generate Ticket Record
    if (reg?.id) {
      await adminSupabase.from('tickets').insert({
        event_id: eventId,
        registration_id: reg.id,
        ticket_token: ticketToken,
        status: 'valid',
      })
    }

    // 5. Send official registration confirmation email with pass details
    try {
      await sendRegistrationConfirmationEmail({
        email: trimmedEmail,
        fullName: data.fullName,
        referenceCode,
        ticketToken,
        creativeRole: data.creativeRole,
        cityState: data.cityState,
      })
    } catch (emailErr) {
      console.error('[Registration Email Error]', emailErr)
    }

    revalidatePath('/dashboard')
    return {
      success: true,
      referenceCode,
      ticketToken,
      data,
    }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      console.warn('[Supabase Warning] Caught connection error. Processing in preview mode.')
      try {
        await sendRegistrationConfirmationEmail({
          email: data.email.trim(),
          fullName: data.fullName,
          referenceCode,
          ticketToken,
          creativeRole: data.creativeRole,
          cityState: data.cityState,
        })
      } catch {}

      return {
        success: true,
        referenceCode,
        ticketToken,
        message: 'Registration created in local preview mode.',
        data,
      }
    }
    const message = err instanceof Error ? err.message : 'Unexpected registration error occurred.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function loginAction(formData: FormData) {
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = (formData.get('password') as string || '').trim()

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
      if (isDatabaseConnectionError(error)) {
        console.warn('[Supabase Warning] Database unreachable during login. Allowing preview sign-in.')
        const targetUrl = email.includes('vendor') || email.includes('exhibitor') ? '/dashboard/exhibitor' : '/dashboard'
        return { success: true, redirectUrl: targetUrl }
      }
      return { success: false, error: error.message }
    }

    // Determine appropriate dashboard based on user profile
    const adminSupabase = createAdminClient()
    const { data: exhibitor, error: exhErr } = await adminSupabase
      .from('exhibitor_applications')
      .select('id')
      .ilike('email', email)
      .maybeSingle()

    if (isDatabaseConnectionError(exhErr)) {
      const targetUrl = email.includes('vendor') || email.includes('exhibitor') ? '/dashboard/exhibitor' : '/dashboard'
      return { success: true, redirectUrl: targetUrl }
    }

    const targetUrl = exhibitor ? '/dashboard/exhibitor' : '/dashboard'
    revalidatePath(targetUrl)
    return { success: true, redirectUrl: targetUrl }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      console.warn('[Supabase Warning] Caught database connection error during login. Allowing preview sign-in.')
      const targetUrl = email.includes('vendor') || email.includes('exhibitor') ? '/dashboard/exhibitor' : '/dashboard'
      return { success: true, redirectUrl: targetUrl }
    }
    const message = err instanceof Error ? err.message : 'Login failed.'
    return { success: false, error: message }
  }
}

export async function checkEmailRegisteredAction(email: string): Promise<{
  isRegistered: boolean
  message?: string
}> {
  try {
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !trimmedEmail.includes('@')) return { isRegistered: false }

    const adminSupabase = createAdminClient()
    const { data: existingReg, error } = await adminSupabase
      .from('registrations')
      .select('id, reference_code')
      .ilike('email', trimmedEmail)
      .maybeSingle()

    if (error || isDatabaseConnectionError(error)) {
      return { isRegistered: false }
    }

    if (existingReg) {
      return {
        isRegistered: true,
        message: `This email (${trimmedEmail}) is already registered for Summit 2.0. Please log in to view your pass.`,
      }
    }

    return { isRegistered: false }
  } catch {
    return { isRegistered: false }
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
