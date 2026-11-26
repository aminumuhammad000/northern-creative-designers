import fs from 'fs'
import path from 'path'

export interface LocalUser {
  id: string
  email: string
  password?: string
  fullName: string
  phone: string
  role: string
  createdAt: string
}

export interface LocalRegistration {
  id: string
  user_id: string | null
  event_id: string
  reference_code: string
  full_name: string
  email: string
  phone: string
  creative_discipline: string
  experience_level: string
  city_state: string
  organization?: string | null
  portfolio_url?: string | null
  interests?: string[] | null
  tshirt_size: string
  dietary_requirements?: string | null
  special_expectations?: string | null
  status: string
  created_at: string
}

export interface LocalTicket {
  id: string
  event_id: string
  registration_id: string
  ticket_token: string
  status: string
  checked_in: boolean
  checked_in_at: string | null
  created_at: string
}

export interface LocalExhibitor {
  id: string
  event_id: string
  business_name: string
  contact_person: string
  email: string
  phone: string
  website?: string | null
  category: string
  description: string
  special_requirements?: string | null
  status: string
  assigned_booth: string
  notes?: string | null
  created_at: string
}

export interface LocalHackathonTeam {
  id: string
  hackathon_id: string
  team_name: string
  track: string
  team_size: number
  lead_name: string
  lead_email?: string | null
  lead_phone?: string | null
  gender?: string | null
  city?: string | null
  organization?: string | null
  portfolio_url?: string | null
  project_title?: string | null
  short_description?: string | null
  detailed_description?: string | null
  problem_statement?: string | null
  proposed_solution?: string | null
  target_audience?: string | null
  presentation_url?: string | null
  professional_title?: string | null
  avatar_url?: string | null
  is_winner?: boolean
  winner_badge?: string | null
  status: string
  created_at: string
}

export interface LocalJuryScore {
  id: string
  hackathon_id: string
  team_id: string
  judge_name: string
  judge_email?: string | null
  cultural_semiotics: number
  problem_solution: number
  craft_execution: number
  presentation: number
  total_score: number
  feedback?: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface LocalVote {
  id: string
  hackathon_id: string
  team_id: string
  voter_token: string
  created_at: string
}

export interface LocalEvent {
  id: string
  slug: string
  name: string
  edition: string
  theme: string
  subtheme: string
  venue: string
  city: string
  country: string
  event_date: string
  is_active: boolean
  registration_open: boolean
  voting_open: boolean
}

export interface LocalHackathon {
  id: string
  event_id: string
  title: string
  status: string
  results_published?: boolean
}

export interface LocalStoreData {
  events: LocalEvent[]
  hackathons: LocalHackathon[]
  hackathon_teams: LocalHackathonTeam[]
  hackathon_votes: LocalVote[]
  hackathon_jury_scores?: LocalJuryScore[]
  users: LocalUser[]
  registrations: LocalRegistration[]
  tickets: LocalTicket[]
  exhibitor_applications: LocalExhibitor[]
}

const DEFAULT_EVENT_ID = 'e0000000-0000-0000-0000-000000000001'
const DEFAULT_HACKATHON_ID = 'h0000000-0000-0000-0000-000000000001'

const INITIAL_DATA: LocalStoreData = {
  events: [
    {
      id: DEFAULT_EVENT_ID,
      slug: 'summit-2-0',
      name: 'Northern Creative Designers Summit',
      edition: '2.0',
      theme: 'Roots & Vectors: Shaping the Future of Arewa Design',
      subtheme: 'Bridging Indigenous Storytelling with Cutting-Edge Modern Craft',
      venue: 'Meena Event Centre, Kano, Nigeria',
      city: 'Kano',
      country: 'Nigeria',
      event_date: '2026-12-19 08:30:00+01',
      is_active: true,
      registration_open: true,
      voting_open: true,
    },
  ],
  hackathons: [
    {
      id: DEFAULT_HACKATHON_ID,
      event_id: DEFAULT_EVENT_ID,
      title: 'Roots & Vectors: 2-Hour Live Stage Design Sprint',
      status: 'active',
    },
  ],
  hackathon_teams: [],
  hackathon_votes: [],
  hackathon_jury_scores: [],
  users: [],
  registrations: [],
  tickets: [],
  exhibitor_applications: [],
}

let inMemoryCache: LocalStoreData | null = null

function getStoreFilePath(): string {
  return path.join(process.cwd(), '.data', 'local-db.json')
}

export function isLocalDevMode(): boolean {
  if (process.env.LOCAL_DEV_MODE === 'true' || process.env.NEXT_PUBLIC_LOCAL_DEV_MODE === 'true') {
    return true
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('your-project') || url.includes('placeholder') || url.includes('uvuieeecydsopraqiliq')) {
    return true
  }
  return false
}

export function getLocalStore(): LocalStoreData {
  if (inMemoryCache) {
    return inMemoryCache
  }

  const filePath = getStoreFilePath()
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      const parsed = JSON.parse(content)
      inMemoryCache = {
        ...INITIAL_DATA,
        ...parsed,
        events: parsed.events?.length ? parsed.events : INITIAL_DATA.events,
        hackathons: parsed.hackathons?.length ? parsed.hackathons : INITIAL_DATA.hackathons,
        hackathon_teams: parsed.hackathon_teams?.length ? parsed.hackathon_teams : INITIAL_DATA.hackathon_teams,
      }
      return inMemoryCache!
    }
  } catch (err) {
    console.warn('[Local DB] Error reading local-db.json, initializing fresh store:', err)
  }

  inMemoryCache = JSON.parse(JSON.stringify(INITIAL_DATA))
  saveLocalStore(inMemoryCache!)
  return inMemoryCache!
}

export function saveLocalStore(data: LocalStoreData): void {
  inMemoryCache = data
  try {
    const filePath = getStoreFilePath()
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.warn('[Local DB] Unable to persist local-db.json to disk (filesystem may be read-only):', err)
  }
}

// -----------------------------------------------------------------------------
// Attendee Registration & Lookup
// -----------------------------------------------------------------------------

export interface LocalRegisterAttendeeParams {
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

export function registerLocalAttendee(data: LocalRegisterAttendeeParams) {
  const store = getLocalStore()
  const trimmedEmail = data.email.trim().toLowerCase()

  // 1. Check existing registration
  const existing = store.registrations.find((r) => r.email.toLowerCase() === trimmedEmail)
  if (existing) {
    return {
      success: false as const,
      alreadyRegistered: true,
      error: `This email (${trimmedEmail}) is already registered for Summit 2.0. Please log in to view your pass.`,
      referenceCode: existing.reference_code,
    }
  }

  // 2. Create or find User
  let userId: string | null = null
  let user = store.users.find((u) => u.email.toLowerCase() === trimmedEmail)
  if (!user && data.password) {
    userId = `usr_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
    user = {
      id: userId,
      email: trimmedEmail,
      password: data.password.trim(),
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      role: 'attendee',
      createdAt: new Date().toISOString(),
    }
    store.users.push(user)
  } else if (user) {
    userId = user.id
  }

  // 3. Generate Reference Code and Ticket Token
  const referenceCode = `NCD26-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
  const ticketToken = `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
  const registrationId = `reg_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
  const ticketId = `tkt_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`

  const now = new Date().toISOString()
  const registration: LocalRegistration = {
    id: registrationId,
    user_id: userId,
    event_id: DEFAULT_EVENT_ID,
    reference_code: referenceCode,
    full_name: data.fullName.trim(),
    email: trimmedEmail,
    phone: data.phone.trim(),
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
    created_at: now,
  }

  const ticket: LocalTicket = {
    id: ticketId,
    event_id: DEFAULT_EVENT_ID,
    registration_id: registrationId,
    ticket_token: ticketToken,
    status: 'valid',
    checked_in: false,
    checked_in_at: null,
    created_at: now,
  }

  store.registrations.unshift(registration)
  store.tickets.unshift(ticket)
  saveLocalStore(store)

  return {
    success: true as const,
    referenceCode,
    ticketToken,
    registrationId,
    data: registration,
  }
}

export function checkLocalEmailRegistered(email: string): { isRegistered: boolean; referenceCode?: string } {
  const store = getLocalStore()
  const trimmed = email.trim().toLowerCase()
  const found = store.registrations.find((r) => r.email.toLowerCase() === trimmed)
  return {
    isRegistered: !!found,
    referenceCode: found?.reference_code,
  }
}

export function authenticateLocalUser(email: string, pass: string): {
  success: boolean
  user?: LocalUser | { email: string; fullName: string; role: string }
  isExhibitor?: boolean
  error?: string
} {
  const store = getLocalStore()
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedPass = pass.trim()

  // 1. Check user accounts
  const user = store.users.find((u) => u.email.toLowerCase() === trimmedEmail)
  if (user) {
    if (!user.password || user.password === trimmedPass) {
      return { success: true, user }
    }
  }

  // 2. Check registrations (allow login if email registered)
  const reg = store.registrations.find((r) => r.email.toLowerCase() === trimmedEmail)
  if (reg) {
    return {
      success: true,
      user: {
        email: reg.email,
        fullName: reg.full_name,
        role: 'attendee',
      },
    }
  }

  // 3. Check exhibitors
  const exhibitor = store.exhibitor_applications.find((e) => e.email.toLowerCase() === trimmedEmail)
  if (exhibitor) {
    return {
      success: true,
      isExhibitor: true,
      user: {
        email: exhibitor.email,
        fullName: exhibitor.contact_person,
        role: 'exhibitor',
      },
    }
  }

  // 4. In local development mode, if user registered previously or enters valid format, permit sign-in
  if (trimmedPass.length >= 4) {
    return {
      success: true,
      user: {
        email: trimmedEmail,
        fullName: trimmedEmail.split('@')[0],
        role: 'attendee',
      },
    }
  }

  return { success: false, error: 'Invalid email or password.' }
}

export function getLocalAttendeeData(sessionEmail?: string | null) {
  const store = getLocalStore()
  let registration: LocalRegistration | null = null

  if (sessionEmail) {
    const trimmed = sessionEmail.trim().toLowerCase()
    registration = store.registrations.find((r) => r.email.toLowerCase() === trimmed) || null
  }

  // If no registration matched by session email, pick the latest registered attendee
  if (!registration && store.registrations.length > 0) {
    registration = store.registrations[0]
  }

  const ticket = registration
    ? store.tickets.find((t) => t.registration_id === registration?.id) || null
    : null

  const attendee = {
    id: registration?.id || 'reg-preview-001',
    name: registration?.full_name || 'Summit Delegate',
    email: registration?.email || sessionEmail || 'delegate@northcdesigner.com.ng',
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

  const hackathon = store.hackathons[0] || null
  const totalVotes = store.hackathon_votes.length

  const voteCounts: Record<string, number> = {}
  store.hackathon_votes.forEach((v) => {
    voteCounts[v.team_id] = (voteCounts[v.team_id] || 0) + 1
  })

  const teams = store.hackathon_teams.map((t) => {
    const count = voteCounts[t.id] || 0
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

  return {
    attendee,
    hackathon,
    teams,
    totalVotes,
  }
}

export function updateLocalAttendeeProfile(
  identifier: string,
  profile: { fullName?: string; creativeRole?: string; cityState?: string; organization?: string }
) {
  const store = getLocalStore()
  const lower = identifier.toLowerCase()
  const reg = store.registrations.find((r) => r.id === identifier || r.email.toLowerCase() === lower)

  if (reg) {
    if (profile.fullName) reg.full_name = profile.fullName
    if (profile.creativeRole) reg.creative_discipline = profile.creativeRole
    if (profile.cityState) reg.city_state = profile.cityState
    if (profile.organization !== undefined) reg.organization = profile.organization
    saveLocalStore(store)
    return { success: true, registration: reg }
  }

  return { success: true }
}

export function castLocalHackathonVote(hackathonId: string, teamId: string, voterToken: string) {
  const store = getLocalStore()

  // Check if voter already cast a vote
  const existingVote = store.hackathon_votes.find(
    (v) => v.hackathon_id === hackathonId && v.voter_token === voterToken
  )

  if (existingVote) {
    existingVote.team_id = teamId
  } else {
    store.hackathon_votes.push({
      id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      hackathon_id: hackathonId,
      team_id: teamId,
      voter_token: voterToken,
      created_at: new Date().toISOString(),
    })
  }

  saveLocalStore(store)
  return { success: true, hasVotedTeamId: teamId }
}

export function submitLocalExhibitorApplication(data: {
  businessName: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  category: string
  description: string
  specialRequirements?: string
  notes?: string
}) {
  const store = getLocalStore()
  const id = `exh_${Math.random().toString(36).substring(2, 7)}_${Date.now()}`
  const exhibitor: LocalExhibitor = {
    id,
    event_id: DEFAULT_EVENT_ID,
    business_name: data.businessName.trim(),
    contact_person: data.contactPerson.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    website: data.website || null,
    category: data.category.trim(),
    description: data.description.trim(),
    special_requirements: data.specialRequirements || null,
    status: 'pending',
    assigned_booth: `Booth #M-${Math.floor(10 + Math.random() * 40)}`,
    notes: data.notes || null,
    created_at: new Date().toISOString(),
  }

  store.exhibitor_applications.unshift(exhibitor)
  saveLocalStore(store)

  return { success: true, id, exhibitor }
}

export function submitLocalHackathonTeam(data: {
  teamName: string
  track: string
  teamSize?: number
  leadName: string
  leadEmail?: string
  leadPhone?: string
  gender?: string
  city?: string
  organization?: string
  portfolioUrl?: string
}) {
  const store = getLocalStore()
  const id = `t_${Math.random().toString(36).substring(2, 7)}_${Date.now()}`
  const hackathonId = store.hackathons?.[0]?.id || DEFAULT_HACKATHON_ID
  const team: LocalHackathonTeam = {
    id,
    hackathon_id: hackathonId,
    team_name: data.teamName.trim(),
    track: data.track.trim(),
    team_size: data.teamSize || 1,
    lead_name: data.leadName.trim(),
    lead_email: data.leadEmail ? data.leadEmail.trim() : null,
    lead_phone: data.leadPhone ? data.leadPhone.trim() : null,
    gender: data.gender ? data.gender.trim() : null,
    city: data.city ? data.city.trim() : null,
    organization: data.organization ? data.organization.trim() : null,
    portfolio_url: data.portfolioUrl ? data.portfolioUrl.trim() : null,
    project_title: `${data.leadName.trim()} Stage Sprint Project`,
    short_description: `Individual live stage execution in ${data.track.trim()}.`,
    status: 'applied',
    created_at: new Date().toISOString(),
  }

  store.hackathon_teams.unshift(team)
  saveLocalStore(store)

  return { success: true, id, team }
}

export function getLocalAdminData() {
  const store = getLocalStore()
  const ticketMap = new Map(store.tickets.map((t) => [t.registration_id, t]))

  const registrations = store.registrations.map((r) => {
    const ticket = ticketMap.get(r.id)
    return {
      ...r,
      ticket: ticket
        ? {
            id: ticket.id,
            ticket_token: ticket.ticket_token,
            checked_in: ticket.checked_in,
            checked_in_at: ticket.checked_in_at,
          }
        : null,
    }
  })

  const checkedInCount = store.tickets.filter((t) => t.checked_in).length

  const metrics = {
    totalRegistrations: registrations.length,
    totalTickets: store.tickets.length,
    checkedInCount,
    totalExhibitors: store.exhibitor_applications.length,
    totalHackathonTeams: store.hackathon_teams.length,
    totalVotesCast: store.hackathon_votes.length,
  }

  return {
    metrics,
    registrations,
    exhibitors: store.exhibitor_applications,
    hackathonTeams: store.hackathon_teams,
  }
}

export function toggleLocalTicketCheckIn(ticketId: string, checkedIn: boolean) {
  const store = getLocalStore()
  const ticket = store.tickets.find((t) => t.id === ticketId || t.registration_id === ticketId)
  if (ticket) {
    ticket.checked_in = checkedIn
    ticket.checked_in_at = checkedIn ? new Date().toISOString() : null
    saveLocalStore(store)
    return { success: true, ticket }
  }
  return { success: false, error: 'Ticket not found.' }
}

export function fastTrackLocalCheckIn(query: string) {
  const store = getLocalStore()
  const q = query.trim().toLowerCase()

  // Match by ticket token, reference code, email, or name
  let matchedReg = store.registrations.find(
    (r) =>
      r.reference_code.toLowerCase() === q ||
      r.email.toLowerCase() === q ||
      r.full_name.toLowerCase().includes(q)
  )

  let matchedTicket = matchedReg
    ? store.tickets.find((t) => t.registration_id === matchedReg?.id)
    : store.tickets.find((t) => t.ticket_token.toLowerCase() === q)

  if (!matchedTicket && !matchedReg) {
    return { success: false, error: 'No matching ticket or registration found.' }
  }

  if (matchedTicket) {
    matchedTicket.checked_in = true
    matchedTicket.checked_in_at = new Date().toISOString()
    saveLocalStore(store)
  }

  return {
    success: true,
    attendee: matchedReg,
    ticket: matchedTicket,
  }
}

export function updateLocalHackathonTeam(
  id: string,
  payload: Partial<LocalHackathonTeam>
) {
  const store = getLocalStore()
  const lower = id.toLowerCase()
  const team = store.hackathon_teams.find(
    (t) => t.id === id || (t.lead_email && t.lead_email.toLowerCase() === lower)
  )

  if (!team) {
    return { success: false, error: 'Hackathon team not found in local database.' }
  }

  if (payload.professional_title !== undefined) team.professional_title = payload.professional_title
  if (payload.avatar_url !== undefined) team.avatar_url = payload.avatar_url
  if (payload.project_title !== undefined) team.project_title = payload.project_title
  if (payload.short_description !== undefined) team.short_description = payload.short_description
  if (payload.detailed_description !== undefined) team.detailed_description = payload.detailed_description
  if (payload.problem_statement !== undefined) team.problem_statement = payload.problem_statement
  if (payload.proposed_solution !== undefined) team.proposed_solution = payload.proposed_solution
  if (payload.target_audience !== undefined) team.target_audience = payload.target_audience
  if (payload.presentation_url !== undefined) team.presentation_url = payload.presentation_url
  if (payload.portfolio_url !== undefined) team.portfolio_url = payload.portfolio_url
  if (payload.lead_phone !== undefined) team.lead_phone = payload.lead_phone
  if (payload.city !== undefined) team.city = payload.city
  if (payload.organization !== undefined) team.organization = payload.organization
  if (payload.status !== undefined) team.status = payload.status
  if (payload.track !== undefined) team.track = payload.track
  if (payload.lead_name !== undefined) team.lead_name = payload.lead_name
  if (payload.team_name !== undefined) team.team_name = payload.team_name

  saveLocalStore(store)
  return { success: true, team }
}

export function getLocalHackathonParticipant(identifier?: string | null) {
  const store = getLocalStore()
  if (!store.hackathon_teams || store.hackathon_teams.length === 0) {
    return null
  }

  if (identifier) {
    const q = identifier.trim().toLowerCase()
    const found = store.hackathon_teams.find(
      (t) =>
        t.id.toLowerCase() === q ||
        (t.lead_email && t.lead_email.toLowerCase() === q) ||
        t.lead_name.toLowerCase().includes(q)
    )
    if (found) return found
  }

  return store.hackathon_teams[0] || null
}

export function saveLocalJuryScore(input: {
  hackathon_id: string
  team_id: string
  judge_name: string
  judge_email?: string
  cultural_semiotics: number
  problem_solution: number
  craft_execution: number
  presentation: number
  total_score: number
  feedback?: string
  status?: string
}) {
  const store = getLocalStore()
  if (!store.hackathon_jury_scores) {
    store.hackathon_jury_scores = []
  }

  const existingIdx = store.hackathon_jury_scores.findIndex(
    (s) =>
      s.hackathon_id === input.hackathon_id &&
      s.team_id === input.team_id &&
      s.judge_name.trim().toLowerCase() === input.judge_name.trim().toLowerCase()
  )

  const scoreRecord: LocalJuryScore = {
    id: existingIdx >= 0 ? store.hackathon_jury_scores[existingIdx].id : `score_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    hackathon_id: input.hackathon_id,
    team_id: input.team_id,
    judge_name: input.judge_name.trim(),
    judge_email: input.judge_email || null,
    cultural_semiotics: input.cultural_semiotics,
    problem_solution: input.problem_solution,
    craft_execution: input.craft_execution,
    presentation: input.presentation,
    total_score: input.total_score,
    feedback: input.feedback || null,
    status: input.status || 'draft',
    created_at: existingIdx >= 0 ? store.hackathon_jury_scores[existingIdx].created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  if (existingIdx >= 0) {
    store.hackathon_jury_scores[existingIdx] = scoreRecord
  } else {
    store.hackathon_jury_scores.push(scoreRecord)
  }

  saveLocalStore(store)
  return { success: true, score: scoreRecord }
}

export function getLocalJuryScores(hackathonId?: string) {
  const store = getLocalStore()
  const scores = store.hackathon_jury_scores || []
  if (hackathonId) {
    return scores.filter((s) => s.hackathon_id === hackathonId)
  }
  return scores
}
