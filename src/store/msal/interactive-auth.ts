import { InteractionRequiredAuthError } from '@azure/msal-browser'

type TokenProvider = { getAccessToken: () => Promise<string> }

/**
 * This file is the source of truth for deciding "is this auth session dead, or just a hiccup?".
 */

/**
 * List of error codes/messages that mean "the user needs to log in again".
 *
 * Note timed_out / monitor_window_timeout — A bit misleading used here.
 * The hidden silent-renewal iframe never came back in time. It's what we see
 * when the token endpoint keeps rejecting the expired refresh token, so we
 * treat it as "time to log in again" rather than looping forever.
 */
const INTERACTION_REQUIRED_SIGNALS = [
  'refresh_token_expired', // the refresh token is done, nothing left to renew with
  'no_account_error', // MSAL has no account to renew for
  'interaction_required', // User must manually sign in
  'login_required', // User must manually sign in
  'invalid_grant', // the refresh token is done, nothing left to renew with
  'aadsts70043', // the refresh token is done, nothing left to renew with
  'timed_out', // the hidden silent-renewal iframe never came back in time
  'monitor_window_timeout', // the hidden silent-renewal iframe never came back in time
]

/**
 * Checks if an error is one of the MSAL errors that means "the user needs to log in again".
 */
export function requiresInteractiveLogin(error: unknown): boolean {
  // Friendly error from MSAL that means "the user needs to log in again"
  if (error instanceof InteractionRequiredAuthError) {
    return true
  }

  if (typeof error !== 'object' || error === null) {
    return false
  }

  // Fallback to checking the error name, error code, and message, because
  // some of these (looking at you, `BrowserAuthError: timed_out`)
  // don't arrive as that nice typed error...
  const parts: Array<string> = []
  if ('name' in error && typeof error.name === 'string') parts.push(error.name)
  if ('errorCode' in error && typeof error.errorCode === 'string') parts.push(error.errorCode)
  if ('message' in error && typeof error.message === 'string') parts.push(error.message)

  const errorText = parts.join(' ').toLowerCase()
  return INTERACTION_REQUIRED_SIGNALS.some((signal) => errorText.includes(signal))
}

// The first "you need to log in again" error we hit, cached so later calls fail fast.
// NOTE: this only resets on a full page load. That's fine because every re-auth path
// today is a hard navigation. If a popup-based login is ever added it
// won't reload the page, so it would need to clear this flag explicitly.
let terminalAuthError: unknown = null

/**
 * Gets an access token for an API call.
 * Before returning, checks if we've already hit a terminal auth error and throws it again if so,
 * preventing any further API calls from being made until the user re-authenticates.
 * This prevents an endless loop of failed API calls when the refresh token has expired.
 */
export async function acquireAccessToken(authProvider: TokenProvider): Promise<string> {
  if (terminalAuthError) {
    throw terminalAuthError
  }

  try {
    return await authProvider.getAccessToken()
  } catch (error) {
    if (requiresInteractiveLogin(error)) {
      terminalAuthError = error
    }
    throw error
  }
}
