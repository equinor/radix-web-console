export interface OnboardingStep {
  readonly id: string
  readonly label: string
}

export type OnboardingStepState = 'done' | 'current' | 'failed' | 'upcoming'
