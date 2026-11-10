import { APPLY_CONFIG_STEP_INDEX } from './applyConfigPromptPanel.const'
import type { OnboardingStepState } from './applyConfigPromptPanel.types'

export const getOnboardingStepState = (stepIndex: number, hasApplyConfigFailed = false): OnboardingStepState => {
  if (stepIndex < APPLY_CONFIG_STEP_INDEX) return 'done'
  if (stepIndex === APPLY_CONFIG_STEP_INDEX) return hasApplyConfigFailed ? 'failed' : 'current'
  return 'upcoming'
}

/** Turns a repository URL like https://github.com/equinor/my-app into equinor/my-app for display. */
export const getRepositoryDisplayName = (repository: string): string => {
  try {
    return new URL(repository).pathname.replace(/^\/+|\/+$/g, '') || repository
  } catch {
    return repository
  }
}
