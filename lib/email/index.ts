export interface RegistrationEmailPayload {
  email: string
  fullName: string
  referenceCode: string
  ticketToken: string
  creativeRole?: string
  cityState?: string
}

function getRegistrationEmailHtml(payload: RegistrationEmailPayload): string {
  const { fullName, email, referenceCode, ticketToken, creativeRole, cityState } = payload
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northcdesigners.vercel.app'
  const loginUrl = `${siteUrl}/login?email=${encodeURIComponent(email)}`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your NCD Summit 2.0 Registration Pass</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 12px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <!-- Top Green Banner Header -->
          <tr>
            <td style="background-color: #0b3d2c; padding: 32px 32px 28px 32px; text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; background-color: rgba(74, 222, 128, 0.15); color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      Official Access Pass Confirmed
                    </span>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; line-height: 1.25;">
                      Northern Creative Designers
                    </h1>
                    <p style="color: #a7f3d0; font-size: 13px; font-weight: 500; margin: 4px 0 0 0;">
                      Summit 2.0 • Roots &amp; Vectors • Kano, Nigeria
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; color: #1e293b; font-size: 15px; line-height: 1.6;">
              <h2 style="color: #0b3d2c; font-size: 20px; font-weight: 700; margin: 0 0 12px 0;">
                Welcome to Summit 2.0, ${fullName}!
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.65;">
                Your registration has been confirmed and your digital summit pass is ready. Please keep this email and your reference code handy for venue access and badge pickup.
              </p>

              <!-- Access Pass Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 16px; border: 2px dashed #02b25b; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px 20px; text-align: center;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 6px;">
                      Official Pass Reference Code
                    </span>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 800; color: #0b3d2c; letter-spacing: 2px; background-color: #ecfdf5; padding: 10px 16px; border-radius: 12px; display: inline-block; border: 1px solid #a7f3d0; margin-bottom: 12px;">
                      ${referenceCode}
                    </div>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 14px; text-align: left; font-size: 13px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; width: 40%;">Attendee:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #64748b;">Ticket Token:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-family: monospace; font-size: 12px;">${ticketToken}</td>
                      </tr>
                      ${
                        creativeRole
                          ? `
                      <tr>
                        <td style="padding: 4px 0; color: #64748b;">Discipline:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${creativeRole}</td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        cityState
                          ? `
                      <tr>
                        <td style="padding: 4px 0; color: #64748b;">Location:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${cityState}</td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                        <td style="padding: 4px 0; color: #64748b;">Pass Tier:</td>
                        <td style="padding: 4px 0; color: #02b25b; font-weight: 700;">Free Summit Delegate Pass</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Summit Logistics -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                    <strong style="color: #0b3d2c; display: block; margin-bottom: 4px; font-size: 14px;">Event Details:</strong>
                    📅 <strong>Date:</strong> Saturday, 19th December, 2026<br>
                    ⏰ <strong>Doors Open:</strong> 08:30 AM West Africa Time (WAT)<br>
                    📍 <strong>Venue:</strong> Meena Event Centre, Kano, Nigeria
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0 16px 0;">
                <tr>
                  <td align="center">
                    <a href="${loginUrl}" target="_blank" style="display: inline-block; background-color: #0b3d2c; color: #4ade80; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 9999px; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(11, 61, 44, 0.25);">
                      Sign In &amp; Access Your QR Pass &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; color: #64748b; font-size: 12px; text-align: center;">
                Need assistance? Email us at <a href="mailto:support@northcdesigners.com.ng" style="color: #0b3d2c; font-weight: 600;">support@northcdesigners.com.ng</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #475569;">
                Northern Creative Designers (RC: 9930022)
              </p>
              <p style="margin: 0; font-size: 11px;">
                This pass confirmation was sent to ${email}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function getRegistrationEmailText(payload: RegistrationEmailPayload): string {
  const { fullName, email, referenceCode, ticketToken, creativeRole, cityState } = payload
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northcdesigners.vercel.app'
  const loginUrl = `${siteUrl}/login?email=${encodeURIComponent(email)}`

  return `
Hello ${fullName},

Welcome to Northern Creative Designers Summit 2.0 (Roots & Vectors)!
Your registration is confirmed and your official summit access pass is ready.

PASS DETAILS:
- Reference Code: ${referenceCode}
- Ticket Token: ${ticketToken}
- Pass Tier: Free Summit Delegate Pass
${creativeRole ? `- Discipline: ${creativeRole}\n` : ''}${cityState ? `- Location: ${cityState}\n` : ''}
EVENT LOGISTICS:
- Date: Saturday, 19th December, 2026
- Doors Open: 08:30 AM (WAT)
- Venue: Meena Event Centre, Kano, Nigeria

Log in to access and view your digital QR pass anytime:
${loginUrl}

Northern Creative Designers Executive Committee
Contact: support@northcdesigners.com.ng
  `.trim()
}

export async function sendRegistrationConfirmationEmail(payload: RegistrationEmailPayload): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY is not configured. Skipping confirmation email dispatch.')
    return { success: false, error: 'Email service not configured.' }
  }

  const primarySender =
    process.env.RESEND_FROM_EMAIL ||
    process.env.EMAIL_FROM ||
    'Northern Creative Designers <support@northcdesigners.com.ng>'
  const fallbackSender = 'NCD Summit 2.0 <onboarding@resend.dev>'

  const subject = `Your Summit 2.0 Pass Confirmed [${payload.referenceCode}]`
  const html = getRegistrationEmailHtml(payload)
  const text = getRegistrationEmailText(payload)

  const sendWithFrom = async (fromAddress: string) => {
    return await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.email],
        subject,
        html,
        text,
      }),
    })
  }

  try {
    let response = await sendWithFrom(primarySender)
    let responseData = await response.json()

    // If custom domain is not yet verified in Resend, automatically fallback to onboarding@resend.dev
    if (!response.ok && responseData?.message && responseData.message.includes('domain is not verified')) {
      console.warn('[Email] Primary domain not verified in Resend. Retrying with fallback sender...')
      response = await sendWithFrom(fallbackSender)
      responseData = await response.json()
    }

    if (!response.ok) {
      const errMsg = responseData?.message || 'Failed to dispatch email through Resend.'
      console.error('[Email Error]', errMsg)
      return { success: false, error: errMsg }
    }

    console.log(`[Email Success] Pass confirmation email sent to ${payload.email} (ID: ${responseData?.id})`)
    return { success: true, messageId: responseData?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error'
    console.error('[Email Error]', message)
    return { success: false, error: message }
  }
}

export interface HackathonEmailPayload {
  email: string
  fullName: string
  track: string
  city?: string
  organization?: string
  registrationId?: string
}

function getHackathonEmailHtml(payload: HackathonEmailPayload): string {
  const { fullName, email, track, city, organization, registrationId } = payload
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northcdesigners.org'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hackathon 2.0 Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 12px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="background-color: #0b3d2c; padding: 32px 32px 28px 32px; text-align: left;">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; background-color: rgba(74, 222, 128, 0.15); color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                Hackathon 2.0 • Live Sprint
              </span>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; line-height: 1.25;">
                Registration Confirmed!
              </h1>
              <p style="color: #a7f3d0; font-size: 13px; font-weight: 500; margin: 4px 0 0 0;">
                Northern Creative Designers Summit 2.0 • Roots &amp; Vectors
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px 32px; color: #1e293b; font-size: 15px; line-height: 1.6;">
              <h2 style="color: #0b3d2c; font-size: 20px; font-weight: 700; margin: 0 0 12px 0;">
                Welcome, ${fullName}!
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.65;">
                Your individual registration for the <strong>2-Hour Live Stage Design Sprint</strong> has been recorded. Shortlisted finalists will receive the live sprint briefs, tools setup guide, and stage schedule ahead of summit day in Kano.
              </p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 16px; border: 2px dashed #02b25b; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px 20px; text-align: left;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 12px; text-align: center;">
                      Contestant Registration Summary
                    </span>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; width: 35%;">Contestant:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Selected Track:</td>
                        <td style="padding: 6px 0; color: #02b25b; font-weight: 700;">${track} Track</td>
                      </tr>
                      ${city ? `
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">City/State:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${city}</td>
                      </tr>
                      ` : ''}
                      ${organization ? `
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Organization/Studio:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${organization}</td>
                      </tr>
                      ` : ''}
                      ${registrationId ? `
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Entry Reference:</td>
                        <td style="padding: 6px 0; color: #64748b; font-family: monospace; font-size: 11px;">${registrationId}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                    <strong style="color: #0b3d2c; display: block; margin-bottom: 4px; font-size: 14px;">Sprint Schedule &amp; Format:</strong>
                    ⏱️ <strong>Format:</strong> 120-minute on-stage live creative sprint<br>
                    🗳️ <strong>Voting:</strong> Live audience peer voting &amp; Grand Jury evaluation<br>
                    📍 <strong>Venue:</strong> Meena Event Centre, Kano, Nigeria
                  </td>
                </tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}/voting-rules" style="display: inline-block; background-color: #0b3d2c; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none;">
                      View Voting Rules &amp; Guidelines &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              &copy; 2026 Northern Creative Designers Summit. Roots &amp; Vectors.<br>
              <a href="${siteUrl}" style="color: #02b25b; text-decoration: none;">northcdesigners.org</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export async function sendHackathonConfirmationEmail(
  payload: HackathonEmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY is not configured. Skipping confirmation email dispatch.')
    return { success: false, error: 'Email service not configured.' }
  }

  const primarySender =
    process.env.RESEND_FROM_EMAIL ||
    process.env.EMAIL_FROM ||
    'Northern Creative Designers <support@northcdesigners.com.ng>'
  const fallbackSender = 'NCD Summit 2.0 <onboarding@resend.dev>'

  const subject = `Hackathon 2.0 Registration Confirmed [${payload.track} Track]`
  const html = getHackathonEmailHtml(payload)
  const text = `Hi ${payload.fullName},\n\nYour individual registration for Hackathon 2.0 (${payload.track} Track) has been recorded.\n\nEvent: Northern Creative Designers Summit 2.0 - Live Stage Design Sprint\nVenue: Meena Event Centre, Kano, Nigeria\n\nShortlisted finalists will receive briefs and the stage schedule ahead of summit day.`

  const sendWithFrom = async (fromAddress: string) => {
    return await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.email],
        subject,
        html,
        text,
      }),
    })
  }

  try {
    let response = await sendWithFrom(primarySender)
    let responseData = await response.json()

    if (!response.ok && responseData?.message && responseData.message.includes('domain is not verified')) {
      console.warn('[Email] Primary domain not verified in Resend. Retrying with fallback sender...')
      response = await sendWithFrom(fallbackSender)
      responseData = await response.json()
    }

    if (!response.ok) {
      const errMsg = responseData?.message || 'Failed to dispatch email through Resend.'
      console.error('[Email Error]', errMsg)
      return { success: false, error: errMsg }
    }

    console.log(`[Email Success] Hackathon confirmation email sent to ${payload.email} (ID: ${responseData?.id})`)
    return { success: true, messageId: responseData?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error'
    console.error('[Email Error]', message)
    return { success: false, error: message }
  }
}

export interface ExhibitorEmailPayload {
  email: string
  contactPerson: string
  businessName: string
  category: string
  applicationId?: string
  enrollmentFee?: string
  paymentProofUploaded?: boolean
}

function getExhibitorEmailHtml(payload: ExhibitorEmailPayload): string {
  const { contactPerson, businessName, email, category, applicationId, enrollmentFee, paymentProofUploaded } = payload
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northcdesigners.org'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to NCD Summit 2.0 Exhibitor Showcase</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 12px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="background-color: #0b3d2c; padding: 32px 32px 28px 32px; text-align: left;">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; background-color: rgba(74, 222, 128, 0.15); color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                Exhibitor &amp; Marketplace Showcase
              </span>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; line-height: 1.25;">
                Welcome, ${businessName}!
              </h1>
              <p style="color: #a7f3d0; font-size: 13px; font-weight: 500; margin: 4px 0 0 0;">
                Northern Creative Designers Summit 2.0 • Roots &amp; Vectors
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px 32px; color: #1e293b; font-size: 15px; line-height: 1.6;">
              <h2 style="color: #0b3d2c; font-size: 20px; font-weight: 700; margin: 0 0 12px 0;">
                Hello ${contactPerson},
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.65;">
                Thank you for applying to showcase at the <strong>Northern Creative Designers Summit 2.0</strong>. Your application has been successfully received and logged with our curation and partnerships committee.
              </p>

              <!-- Application Summary Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 16px; border: 2px dashed #02b25b; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px 20px; text-align: left;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 12px; text-align: center;">
                      Exhibition Application Summary
                    </span>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; width: 38%;">Brand / Business:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${businessName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Contact Representative:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${contactPerson}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Exhibition Track:</td>
                        <td style="padding: 6px 0; color: #02b25b; font-weight: 700;">${category}</td>
                      </tr>
                      ${enrollmentFee ? `
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Enrollment Fee:</td>
                        <td style="padding: 6px 0; color: #0b3d2c; font-weight: 700;">${enrollmentFee}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Payment Proof:</td>
                        <td style="padding: 6px 0; color: ${paymentProofUploaded ? '#02b25b' : '#d97706'}; font-weight: 600;">
                          ${paymentProofUploaded ? 'Uploaded (Pending Verification)' : 'Pending'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Application Status:</td>
                        <td style="padding: 6px 0; color: #0369a1; font-weight: 600;">Received &amp; In Review</td>
                      </tr>
                      ${applicationId ? `
                      <tr>
                        <td style="padding: 6px 0; color: #64748b;">Reference Code:</td>
                        <td style="padding: 6px 0; color: #64748b; font-family: monospace; font-size: 11px;">${applicationId}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What happens next -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                    <strong style="color: #0b3d2c; display: block; margin-bottom: 6px; font-size: 14px;">Next Steps for Exhibitors:</strong>
                    1. <strong>Curation Review:</strong> Our team reviews setup requirements and product fit within 48 hours.<br>
                    2. <strong>Booth Allocation:</strong> You will be notified with your floor booth number, electrical setup, and load-in timings.<br>
                    3. <strong>Exhibition Day:</strong> Saturday, 19th December, 2026 at Meena Event Centre, Kano, Nigeria.
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}/dashboard/exhibitor" style="display: inline-block; background-color: #0b3d2c; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none;">
                      Access Exhibitor Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              Questions? Reply directly to this email or reach us at <a href="mailto:support@northcdesigners.com.ng" style="color: #02b25b; text-decoration: none;">support@northcdesigners.com.ng</a><br>
              &copy; 2026 Northern Creative Designers Summit. Roots &amp; Vectors.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export async function sendExhibitorWelcomeEmail(
  payload: ExhibitorEmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY is not configured. Skipping welcome email dispatch.')
    return { success: false, error: 'Email service not configured.' }
  }

  const primarySender =
    process.env.RESEND_FROM_EMAIL ||
    process.env.EMAIL_FROM ||
    'Northern Creative Designers <support@northcdesigners.com.ng>'
  const fallbackSender = 'NCD Summit 2.0 <onboarding@resend.dev>'

  const subject = `Welcome to NCD Summit 2.0 Exhibitor Showcase — ${payload.businessName}`
  const html = getExhibitorEmailHtml(payload)
  const text = `Hello ${payload.contactPerson},\n\nThank you for applying to showcase ${payload.businessName} at the Northern Creative Designers Summit 2.0 (${payload.category}).\n\nYour application has been received and is under review. Our partnerships team will follow up within 48 hours regarding your booth setup, load-in passes, and exhibition logistics.\n\nDate: Saturday, 19th December, 2026\nVenue: Meena Event Centre, Kano, Nigeria`

  const sendWithFrom = async (fromAddress: string) => {
    return await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.email],
        subject,
        html,
        text,
      }),
    })
  }

  try {
    let response = await sendWithFrom(primarySender)
    let responseData = await response.json()

    if (!response.ok && responseData?.message && responseData.message.includes('domain is not verified')) {
      console.warn('[Email] Primary domain not verified in Resend. Retrying with fallback sender...')
      response = await sendWithFrom(fallbackSender)
      responseData = await response.json()
    }

    if (!response.ok) {
      const errMsg = responseData?.message || 'Failed to dispatch email through Resend.'
      console.error('[Email Error]', errMsg)
      return { success: false, error: errMsg }
    }

    console.log(`[Email Success] Exhibitor welcome email sent to ${payload.email} (ID: ${responseData?.id})`)
    return { success: true, messageId: responseData?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error'
    console.error('[Email Error]', message)
    return { success: false, error: message }
  }
}

export interface GeneralEmailPayload {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
}

export async function sendGeneralEmail(
  payload: GeneralEmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY is not configured. Skipping email dispatch.')
    return { success: false, error: 'Email service not configured.' }
  }

  const primarySender =
    payload.from ||
    process.env.RESEND_FROM_EMAIL ||
    process.env.EMAIL_FROM ||
    'Northern Creative Designers <support@northcdesigners.com.ng>'
  const fallbackSender = 'NCD Summit 2.0 <onboarding@resend.dev>'

  const toList = Array.isArray(payload.to) ? payload.to : [payload.to]

  const sendWithFrom = async (fromAddress: string) => {
    return await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: fromAddress,
        to: toList,
        subject: payload.subject,
        html: payload.html,
        text: payload.text || payload.html.replace(/<[^>]*>?/gm, ''),
      }),
    })
  }

  try {
    let response = await sendWithFrom(primarySender)
    let responseData = await response.json()

    if (!response.ok && responseData?.message && responseData.message.includes('domain is not verified')) {
      console.warn('[Email] Primary domain not verified in Resend. Retrying with fallback sender...')
      response = await sendWithFrom(fallbackSender)
      responseData = await response.json()
    }

    if (!response.ok) {
      const errMsg = responseData?.message || 'Failed to dispatch email through Resend.'
      console.error('[Email Error]', errMsg)
      return { success: false, error: errMsg }
    }

    console.log(`[Email Success] Email sent to ${toList.join(', ')} (ID: ${responseData?.id})`)
    return { success: true, messageId: responseData?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error'
    console.error('[Email Error]', message)
    return { success: false, error: message }
  }
}

export interface OtpEmailPayload {
  email: string
  code: string
  fullName?: string
  purpose?: string
}

export async function sendOtpEmail(
  payload: OtpEmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { email, code, fullName, purpose = 'Account Verification' } = payload
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northcdesigners.com.ng'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${purpose} Code</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 12px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="background-color: #0b3d2c; padding: 28px 32px; text-align: left;">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; background-color: rgba(74, 222, 128, 0.15); color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                ${purpose}
              </span>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; line-height: 1.25;">
                Northern Creative Designers
              </h1>
              <p style="color: #a7f3d0; font-size: 13px; font-weight: 500; margin: 4px 0 0 0;">
                Summit 2.0 • Roots &amp; Vectors
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px 32px; color: #1e293b; font-size: 15px; line-height: 1.6;">
              <h2 style="color: #0b3d2c; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
                Hello ${fullName ? fullName : 'Delegate'},
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.65;">
                Use the one-time verification code below to authorize your request. This code will expire in 10 minutes.
              </p>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 16px; border: 2px dashed #02b25b; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px 20px; text-align: center;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 8px;">
                      Verification Passcode
                    </span>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 800; color: #0b3d2c; letter-spacing: 6px; background-color: #ecfdf5; padding: 12px 24px; border-radius: 12px; display: inline-block; border: 1px solid #a7f3d0;">
                      ${code}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 16px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                If you did not request this verification code, please ignore this email or contact our security desk immediately at <a href="mailto:support@northcdesigners.com.ng" style="color: #0b3d2c; font-weight: 600;">support@northcdesigners.com.ng</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              &copy; 2026 Northern Creative Designers Summit. Roots &amp; Vectors.<br>
              <a href="${siteUrl}" style="color: #02b25b; text-decoration: none;">northcdesigners.com.ng</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `Hello ${fullName || 'Delegate'},\n\nYour one-time ${purpose} passcode is: ${code}\n\nThis code expires in 10 minutes. If you did not request this code, you can safely ignore this email.\n\nNorthern Creative Designers Summit 2.0\nsupport@northcdesigners.com.ng`

  return await sendGeneralEmail({
    to: email,
    subject: `Your ${purpose} Code: ${code} — NCD Summit 2.0`,
    html,
    text,
  })
}
