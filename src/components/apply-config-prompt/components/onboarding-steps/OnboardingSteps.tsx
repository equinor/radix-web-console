import { Icon, Typography } from '@equinor/eds-core-react'
import { check, close } from '@equinor/eds-icons'
import clsx from 'clsx'
import { ONBOARDING_STEPS } from '../panel/applyConfigPromptPanel.const'
import { getOnboardingStepState } from '../panel/applyConfigPromptPanel.utils'

import styles from './onboardingSteps.module.css'

interface OnboardingStepsProps {
  /** Shows the apply-config step in an error state. */
  readonly hasApplyConfigFailed?: boolean
}

/** Horizontal progress indicator for the onboarding journey: register → apply config → build and deploy. */
export const OnboardingSteps = (props: OnboardingStepsProps) => {
  const { hasApplyConfigFailed = false } = props

  return (
    <ol className={styles.steps} aria-label="Onboarding progress">
      {ONBOARDING_STEPS.map((step, stepIndex) => {
        const stepState = getOnboardingStepState(stepIndex, hasApplyConfigFailed)
        const isCurrent = stepState === 'current' || stepState === 'failed'

        return (
          <li
            key={step.id}
            className={clsx(styles.step, styles[stepState])}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className={styles.marker} aria-hidden="true">
              {stepState === 'done' && <Icon data={check} size={16} />}
              {stepState === 'failed' && <Icon data={close} size={16} />}
              {(stepState === 'current' || stepState === 'upcoming') && stepIndex + 1}
            </span>
            <Typography variant="body_short" as="span" className={styles.label}>
              {step.label}
              {stepState === 'failed' && <span className={styles.visuallyHidden}> (failed)</span>}
            </Typography>
          </li>
        )
      })}
    </ol>
  )
}
