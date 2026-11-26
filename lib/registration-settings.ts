import fs from 'fs'
import path from 'path'

export type RegistrationKey = 'attendee_open' | 'hackathon_open' | 'exhibitor_open'

export interface RegistrationSettings {
  attendee_open: boolean
  hackathon_open: boolean
  exhibitor_open: boolean
  updated_at: string
}

const DEFAULT_SETTINGS: RegistrationSettings = {
  attendee_open: true,
  hackathon_open: true,
  exhibitor_open: true,
  updated_at: new Date().toISOString(),
}

let cachedSettings: RegistrationSettings | null = null

function getSettingsFilePath(): string {
  return path.join(process.cwd(), '.data', 'registration-settings.json')
}

export function getRegistrationSettings(): RegistrationSettings {
  if (cachedSettings) {
    return cachedSettings
  }

  const filePath = getSettingsFilePath()
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8')
      const parsed = JSON.parse(raw)
      cachedSettings = {
        attendee_open: parsed.attendee_open !== false,
        hackathon_open: parsed.hackathon_open !== false,
        exhibitor_open: parsed.exhibitor_open !== false,
        updated_at: parsed.updated_at || new Date().toISOString(),
      }
      return cachedSettings
    }
  } catch (err) {
    console.warn('[Registration Settings] Failed to read settings file, using defaults:', err)
  }

  cachedSettings = { ...DEFAULT_SETTINGS }
  return cachedSettings
}

export function updateRegistrationSetting(
  key: RegistrationKey,
  isOpen: boolean
): RegistrationSettings {
  const current = getRegistrationSettings()
  const updated: RegistrationSettings = {
    ...current,
    [key]: Boolean(isOpen),
    updated_at: new Date().toISOString(),
  }
  cachedSettings = updated

  try {
    const filePath = getSettingsFilePath()
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8')
  } catch (err) {
    console.warn('[Registration Settings] Failed to persist settings file:', err)
  }

  return updated
}
