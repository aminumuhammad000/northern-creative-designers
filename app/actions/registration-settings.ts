'use server'

import { revalidatePath } from 'next/cache'
import {
  getRegistrationSettings,
  updateRegistrationSetting,
  RegistrationKey,
  RegistrationSettings,
} from '@/lib/registration-settings'

export type { RegistrationKey, RegistrationSettings }

export async function getRegistrationSettingsAction(): Promise<RegistrationSettings> {
  return getRegistrationSettings()
}

export async function adminUpdateRegistrationSettingAction(
  key: RegistrationKey,
  isOpen: boolean
): Promise<{ success: boolean; settings: RegistrationSettings; error?: string }> {
  try {
    const settings = updateRegistrationSetting(key, isOpen)
    revalidatePath('/register')
    revalidatePath('/hackathon/register')
    revalidatePath('/exhibitors/apply')
    revalidatePath('/hackathon')
    revalidatePath('/admin')
    return { success: true, settings }
  } catch (err: unknown) {
    return {
      success: false,
      settings: getRegistrationSettings(),
      error: err instanceof Error ? err.message : 'Failed to update registration setting.',
    }
  }
}
