import type { OnboardingStep } from './applyConfigPromptPanel.types'

export const ONBOARDING_STEPS: ReadonlyArray<OnboardingStep> = [
  { id: 'register', label: 'Register application' },
  { id: 'apply-config', label: 'Apply Radix config' },
  { id: 'build-deploy', label: 'Build and deploy' },
] as const

/** Index into ONBOARDING_STEPS of the step the user is on while the config is not applied. */
export const APPLY_CONFIG_STEP_INDEX = 1
