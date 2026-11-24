'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { isDatabaseConnectionError } from '@/lib/supabase/errors'
import {
  isLocalDevMode,
  submitLocalExhibitorApplication,
  submitLocalHackathonTeam,
} from '@/lib/supabase/local-db'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { sendHackathonConfirmationEmail, sendExhibitorWelcomeEmail } from '@/lib/email'
import { uploadImage } from '@/lib/cloudinary'

export interface ExhibitorApplicationData {
  businessName: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  category: string
  description: string
  specialRequirements?: string
  enrollmentFee?: string
  paymentProofUrl?: string
  paymentProofFileName?: string
}

export async function uploadPaymentProofAction(base64DataUri: string, fileName?: string) {
  try {
    if (!base64DataUri || typeof base64DataUri !== 'string') {
      return { success: false, error: 'No file data received.' }
    }
    const res = await uploadImage(base64DataUri, 'ncd-summit/payment-proofs')
    if (res.success && res.url) {
      return { success: true, url: res.url, publicId: res.public_id }
    }
    return { success: false, error: 'Failed to upload payment receipt.' }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error uploading payment proof.',
    }
  }
}

export async function submitExhibitorApplicationAction(data: ExhibitorApplicationData) {
  try {
    const trimmedEmail = data.email.trim().toLowerCase()
    const trimmedContact = data.contactPerson.trim()
    const trimmedBusiness = data.businessName.trim()
    const trimmedCategory = data.category.trim()
    const computedFee =
      data.enrollmentFee ||
      (trimmedCategory.toLowerCase().includes('vendor') ? '₦25,000' : '₦30,000')
    const formattedNotes = `[Fee: ${computedFee}] [Proof: ${data.paymentProofUrl || 'Pending'}] [File: ${data.paymentProofFileName || 'None'}]`

    // -------------------------------------------------------------------------
    // 1. Local Development Mode
    // -------------------------------------------------------------------------
    if (isLocalDevMode()) {
      const localResult = submitLocalExhibitorApplication({
        ...data,
        notes: formattedNotes,
      })

      try {
        const cookieStore = await cookies()
        cookieStore.set('ncd_session_email', trimmedEmail, {
          path: '/',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        })
      } catch {}

      sendExhibitorWelcomeEmail({
        email: trimmedEmail,
        contactPerson: trimmedContact,
        businessName: trimmedBusiness,
        category: trimmedCategory,
        applicationId: localResult.id,
        enrollmentFee: computedFee,
        paymentProofUploaded: Boolean(data.paymentProofUrl),
      }).catch((e) => console.warn('[Email Warning] Exhibitor welcome email failed:', e))

      revalidatePath('/dashboard/exhibitor')
      revalidatePath('/admin')
      return { success: true, id: localResult.id, isPreview: false }
    }

    // -------------------------------------------------------------------------
    // 2. Live Supabase Cloud Mode
    // -------------------------------------------------------------------------
    const adminSupabase = createAdminClient()

    // 1. Fetch default active event (with auto-provision fallback)
    let eventId: string | null = null
    const { data: event, error: eventErr } = await adminSupabase
      .from('events')
      .select('id')
      .eq('slug', 'summit-2-0')
      .maybeSingle()

    // Handle database connectivity failure
    if (isDatabaseConnectionError(eventErr)) {
      console.warn('[Supabase Warning] Database unreachable during event lookup. Falling back to local storage.')
      const localFallback = submitLocalExhibitorApplication(data)
      return { success: true, id: localFallback.id, isPreview: false }
    }

    if (event?.id) {
      eventId = event.id
    } else {
      const { data: newEvent, error: newEventErr } = await adminSupabase
        .from('events')
        .insert({
          slug: 'summit-2-0',
          name: 'Northern Creative Designers Summit',
          edition: '2.0',
          theme: 'Roots & Vectors: Shaping the Future of Arewa Design',
          venue: 'Meena Event Centre, Kano, Nigeria',
          city: 'Kano',
          country: 'Nigeria',
          event_date: '2026-12-19 08:30:00+01',
          is_active: true,
          registration_open: true,
          voting_open: false,
        })
        .select('id')
        .maybeSingle()

      if (isDatabaseConnectionError(newEventErr)) {
        const localFallback = submitLocalExhibitorApplication(data)
        return { success: true, id: localFallback.id, isPreview: false }
      }

      eventId = newEvent?.id || '00000000-0000-0000-0000-000000000000'
    }

    // 2. Insert exhibitor application
    const { data: app, error } = await adminSupabase
      .from('exhibitor_applications')
      .insert({
        event_id: eventId,
        business_name: trimmedBusiness,
        contact_person: trimmedContact,
        email: trimmedEmail,
        phone: data.phone.trim(),
        website: data.website?.trim() || null,
        category: trimmedCategory,
        description: data.description.trim(),
        special_requirements: data.specialRequirements?.trim() || null,
        status: 'pending',
        notes: formattedNotes,
      })
      .select('id')
      .single()

    if (error) {
      if (isDatabaseConnectionError(error)) {
        const localFallback = submitLocalExhibitorApplication({
          ...data,
          notes: formattedNotes,
        })
        return { success: true, id: localFallback.id, isPreview: false }
      }
      return { success: false, error: error.message }
    }

    sendExhibitorWelcomeEmail({
      email: trimmedEmail,
      contactPerson: trimmedContact,
      businessName: trimmedBusiness,
      category: trimmedCategory,
      applicationId: app.id,
      enrollmentFee: computedFee,
      paymentProofUploaded: Boolean(data.paymentProofUrl),
    }).catch((e) => console.warn('[Email Warning] Exhibitor welcome email failed:', e))

    return { success: true, id: app.id }
  } catch (err: unknown) {
    if (isDatabaseConnectionError(err)) {
      const computedFee =
        data.enrollmentFee ||
        (data.category.toLowerCase().includes('vendor') ? '₦25,000' : '₦30,000')
      const formattedNotes = `[Fee: ${computedFee}] [Proof: ${data.paymentProofUrl || 'Pending'}] [File: ${data.paymentProofFileName || 'None'}]`
      const localFallback = submitLocalExhibitorApplication({
        ...data,
        notes: formattedNotes,
      })
      return { success: true, id: localFallback.id, isPreview: false }
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit exhibitor application.',
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
  category: string
  portfolioUrl?: string
}

export async function registerHackathonAction(data: HackathonRegistrationData) {
  try {
    const candidateName = data.name.trim()
    const trimmedEmail = data.email.trim().toLowerCase()
    const trimmedPhone = data.phone.trim()
    const trimmedTrack = data.category.trim()
    const orgSuffix = data.organization?.trim() ? ` (${data.organization.trim()})` : ''
    const citySuffix = data.city?.trim() ? ` [${data.city.trim()}]` : ''
    const contestantIdentifier = `${candidateName}${orgSuffix}${citySuffix}`

    const adminSupabase = createAdminClient()

    let hackathonId: string | null = null
    const { data: activeHackathon } = await adminSupabase
      .from('hackathons')
      .select('id')
      .in('status', ['active', 'voting', 'upcoming'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (activeHackathon?.id) {
      hackathonId = activeHackathon.id
    } else {
      const { data: anyHackathon } = await adminSupabase
        .from('hackathons')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (anyHackathon?.id) {
        hackathonId = anyHackathon.id
      }
    }

    if (!hackathonId) {
      hackathonId = 'a0000000-0000-0000-0000-000000000001'
    }

    const { data: team, error } = await adminSupabase
      .from('hackathon_teams')
      .insert({
        hackathon_id: hackathonId,
        team_name: contestantIdentifier,
        lead_name: candidateName,
        lead_email: trimmedEmail,
        lead_phone: trimmedPhone,
        team_size: 1,
        track: trimmedTrack,
        portfolio_url: data.portfolioUrl?.trim() || null,
        status: 'applied',
        project_title: `${candidateName} Stage Sprint Project`,
        short_description: `Individual live stage execution in ${trimmedTrack}.`,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[Hackathon Registration Error] Supabase Insert Failed:', error)
      return { success: false, error: 'Database error registering application: ' + error.message }
    }

    sendHackathonConfirmationEmail({
      email: trimmedEmail,
      fullName: candidateName,
      track: trimmedTrack,
      city: data.city?.trim(),
      organization: data.organization?.trim(),
      registrationId: team?.id,
    }).catch((e) => console.warn('[Email Warning] Hackathon email failed to send:', e))

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    revalidatePath('/hackathon/participants')
    return { success: true, id: team?.id }
  } catch (err: unknown) {
    console.error('[Hackathon Registration Error]', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected database error occurred.',
    }
  }
}

export async function registerHackathonTeamAction(data: any) {
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
