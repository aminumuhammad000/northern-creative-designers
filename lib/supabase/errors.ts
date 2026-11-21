/**
 * Helper to detect network and connectivity errors when communicating
 * with Supabase (such as DNS failure, paused projects, offline development, or ECONNREFUSED).
 */
export function isDatabaseConnectionError(error: unknown): boolean {
  if (!error) return false
  const msg =
    typeof error === 'string'
      ? error
      : (error as any)?.message || (error as any)?.details || (error as any)?.hint || String(error)
  const lower = msg.toLowerCase()
  return (
    lower.includes('fetch failed') ||
    lower.includes('enotfound') ||
    lower.includes('econnrefused') ||
    lower.includes('etimedout') ||
    lower.includes('network') ||
    lower.includes('failed to fetch') ||
    lower.includes('name or service not known') ||
    lower.includes('connection error') ||
    lower.includes('aggregateerror') ||
    lower.includes('nxdomain')
  )
}
