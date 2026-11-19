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
                Need assistance? Email us at <a href="mailto:support@northcdesigner.com.ng" style="color: #0b3d2c; font-weight: 600;">support@northcdesigner.com.ng</a>
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
Contact: support@northcdesigner.com.ng
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
    'Northern Creative Designers <support@northcdesigner.com.ng>'
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
