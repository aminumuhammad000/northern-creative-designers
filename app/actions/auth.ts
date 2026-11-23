'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import {
  isLocalDevMode,
  registerLocalAttendee,
  checkLocalEmailRegistered,
  authenticateLocalUser,
} from '@/lib/supabase/local-db'
import { cookies } from 'next/headers'
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
  const trimmedEmail = data.email.trim().toLowerCase()
  const trimmedFullName = data.fullName.trim()

  // ---------------------------------------------------------------------------
  // 1. Local Development Mode / Offline Persistence
  // ---------------------------------------------------------------------------
  if (isLocalDevMode()) {
    const localRes = registerLocalAttendee({
      fullName: trimmedFullName,
      email: trimmedEmail,
      password: data.password,
      phone: data.phone,
      cityState: data.cityState,
      creativeRole: data.creativeRole,
      experienceLevel: data.experienceLevel,
      organization: data.organization,
      portfolioUrl: data.portfolioUrl,
      interests: data.interests,
      tshirtSize: data.tshirtSize,
      dietaryRequirements: data.dietaryRequirements,
      specialExpectations: data.specialExpectations,
    })

    if (!localRes.success) {
      return {
        success: false,
        alreadyRegistered: localRes.alreadyRegistered,
        error: localRes.error,
        referenceCode: localRes.referenceCode,
      }
    }

    // Set local session cookie so dashboard and ticket pages identify the user immediately
    try {
      const cookieStore = await cookies()
      cookieStore.set('ncd_session_email', trimmedEmail, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    } catch {
      // Safe to ignore if outside request context
    }

    // Send confirmation email if Resend is configured
    try {
      await sendRegistrationConfirmationEmail({
        email: trimmedEmail,
        fullName: trimmedFullName,
        referenceCode: localRes.referenceCode,
        ticketToken: localRes.ticketToken,
        creativeRole: data.creativeRole,
        cityState: data.cityState,
      })
    } catch (mockEmailErr) {
      console.warn('[Local Email Notice] Could not send email (optional in local dev):', mockEmailErr)
    }

    revalidatePath('/dashboard')
    revalidatePath('/admin')

    return {
      success: true,
      referenceCode: localRes.referenceCode,
      ticketToken: localRes.ticketToken,
      message: 'Registration created and persisted to local database (.data/local-db.json).',
      data,
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Live Supabase Cloud Mode
  // ---------------------------------------------------------------------------
  const referenceCode = `NCD26-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
  const ticketToken = `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  try {
    const adminSupabase = createAdminClient()

    // 0. Check if this email is already registered in registrations table
    const { data: existingReg, error: checkErr } = await adminSupabase
      .from('registrations')
      .select('id, reference_code, full_name')
      .ilike('email', trimmedEmail)
      .maybeSingle()

    if (isDatabaseConnectionError(checkErr)) {
      console.warn('[Supabase Warning] Database unreachable during attendee check. Falling back to local storage.')
      const localFallback = registerLocalAttendee({
        fullName: trimmedFullName,
        email: trimmedEmail,
        password: data.password,
        phone: data.phone,
        cityState: data.cityState,
        creativeRole: data.creativeRole,
        experienceLevel: data.experienceLevel,
        organization: data.organization,
        portfolioUrl: data.portfolioUrl,
        interests: data.interests,
        tshirtSize: data.tshirtSize,
        dietaryRequirements: data.dietaryRequirements,
        specialExpectations: data.specialExpectations,
      })

      try {
        const cookieStore = await cookies()
        cookieStore.set('ncd_session_email', trimmedEmail, {
          path: '/',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        })
      } catch {}

      return {
        success: true,
        referenceCode: localFallback.referenceCode || referenceCode,
        ticketToken: localFallback.ticketToken || ticketToken,
        message: 'Registration created in resilient local mode.',
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
            console.warn('[Supabase Warning] Database unreachable during auth signup. Falling back to local storage.')
            const localFallback = registerLocalAttendee(data)
            return {
              success: true,
              referenceCode: localFallback.referenceCode || referenceCode,
              ticketToken: localFallback.ticketToken || ticketToken,
              message: 'Registration created in resilient local mode.',
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
      console.warn('[Supabase Warning] Database unreachable during event lookup. Falling back to local storage.')
      const localFallback = registerLocalAttendee(data)
      return {
        success: true,
        referenceCode: localFallback.referenceCode || referenceCode,
        ticketToken: localFallback.ticketToken || ticketToken,
        message: 'Registration created in resilient local mode.',
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
        console.warn('[Supabase Warning] Database unreachable during registration insert. Falling back to local storage.')
        const localFallback = registerLocalAttendee(data)
        return {
          success: true,
          referenceCode: localFallback.referenceCode || referenceCode,
          ticketToken: localFallback.ticketToken || ticketToken,
          message: 'Registration created in resilient local mode.',
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
      console.warn('[Supabase Warning] Caught connection error. Falling back to local storage.')
      const localFallback = registerLocalAttendee(data)
      return {
        success: true,
        referenceCode: localFallback.referenceCode || referenceCode,
        ticketToken: localFallback.ticketToken || ticketToken,
        message: 'Registration created in resilient local mode.',
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
  const email = ((formData.get('email') as string) || '').trim().toLowerCase()
  const password = ((formData.get('password') as string) || '').trim()

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' }
  }

  // ---------------------------------------------------------------------------
  // 1. Local Development Mode Login
  // ---------------------------------------------------------------------------
  if (isLocalDevMode()) {
    const authResult = authenticateLocalUser(email, password)
    if (!authResult.success) {
      return { success: false, error: authResult.error || 'Invalid email or password.' }
    }

    try {
      const cookieStore = await cookies()
      cookieStore.set('ncd_session_email', email, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    } catch {}

    const targetUrl =
      authResult.isExhibitor || email.includes('vendor') || email.includes('exhibitor')
        ? '/dashboard/exhibitor'
        : '/dashboard'
    return { success: true, redirectUrl: targetUrl }
  }

  // ---------------------------------------------------------------------------
  // 2. Live Supabase Login
  // ---------------------------------------------------------------------------
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (isDatabaseConnectionError(error)) {
        console.warn('[Supabase Warning] Database unreachable during login. Allowing local sign-in.')
        try {
          const cookieStore = await cookies()
          cookieStore.set('ncd_session_email', email, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
          })
        } catch {}
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
      console.warn('[Supabase Warning] Caught database connection error during login. Allowing local sign-in.')
      try {
        const cookieStore = await cookies()
        cookieStore.set('ncd_session_email', email, {
          path: '/',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        })
      } catch {}
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

    if (isLocalDevMode()) {
      const localCheck = checkLocalEmailRegistered(trimmedEmail)
      if (localCheck.isRegistered) {
        return {
          isRegistered: true,
          message: `This email (${trimmedEmail}) is already registered for Summit 2.0. Please log in to view your pass.`,
        }
      }
      return { isRegistered: false }
    }

    const adminSupabase = createAdminClient()
    const { data: existingReg, error } = await adminSupabase
      .from('registrations')
      .select('id, reference_code')
      .ilike('email', trimmedEmail)
      .maybeSingle()

    if (error || isDatabaseConnectionError(error)) {
      const localCheck = checkLocalEmailRegistered(trimmedEmail)
      if (localCheck.isRegistered) {
        return {
          isRegistered: true,
          message: `This email (${trimmedEmail}) is already registered for Summit 2.0. Please log in to view your pass.`,
        }
      }
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
  try {
    const cookieStore = await cookies()
    cookieStore.delete('ncd_session_email')
  } catch {}

  if (!isLocalDevMode()) {
    try {
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
  }

  redirect('/login')
}
