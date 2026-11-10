import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { external_link } from '@equinor/eds-icons'
import { useId } from 'react'
import { Link } from 'react-router'
import { externalUrls } from '../../../../externalUrls'
import { routes } from '../../../../router/routes'
import type { Application, JobSummary } from '../../../../store/radix-api'
import { routeWithParams } from '../../../../utils/string'
import { getApplyConfigPromptStatus } from '../../applyConfigPrompt.utils'
import { ApplyConfigButton } from '../ApplyConfigButton'
import { RadixConfigSource } from '../config-source/RadixConfigSource'
import { OnboardingSteps } from '../onboarding-steps/OnboardingSteps'
import { ApplyConfigJobBanner } from './ApplyConfigJobBanner'
import styles from './applyConfigPromptPanel.module.css'

export interface ApplyConfigPromptPanelProps {
  readonly application: Pick<Application, 'name' | 'registration'>
  /** Most recent pipeline job, used to tell whether an apply is running or has failed. */
  readonly latestJob?: JobSummary
  readonly onApplyConfig: () => void
  readonly isApplying?: boolean
  readonly applyErrorMessage?: string
}

/**
 * Hero panel shown on the application overview while the Radix config has not been applied.
 * Explains where the user is in the onboarding journey, what Radix will read, and what to do next.
 */
export const ApplyConfigPromptPanel = (props: ApplyConfigPromptPanelProps) => {
  const { application, latestJob, onApplyConfig, isApplying = false, applyErrorMessage } = props
  const titleId = useId()

  const status = getApplyConfigPromptStatus(latestJob)
  const configurationPageUrl = routeWithParams(routes.appConfig, { appName: application.name })

  return (
    <section className={styles.panel} aria-labelledby={titleId}>
      <OnboardingSteps hasApplyConfigFailed={status === 'failed'} />

      <header className={styles.header}>
        <Typography id={titleId} variant="h2" as="h2">
          Apply your Radix config to get started
        </Typography>
        <Typography className={styles.bodyText}>
          Radix has not read your config file yet. Applying it creates your environments so you can start building and
          deploying.
        </Typography>
      </header>

      <RadixConfigSource registration={application.registration} />

      <ApplyConfigJobBanner appName={application.name} status={status} latestJob={latestJob} />

      {status === 'not-started' && (
        <Typography className={styles.bodyText}>
          Radix needs the deploy key in your repository to read the config. If you haven't added it yet, you'll find it
          on the{' '}
          <Typography as={Link} to={configurationPageUrl} link>
            Configuration page
          </Typography>
          .
        </Typography>
      )}

      {applyErrorMessage && (
        <Typography color="danger" role="alert">
          Failed to apply config. {applyErrorMessage}
        </Typography>
      )}

      <div className={styles.actions}>
        {status !== 'in-progress' && (
          <ApplyConfigButton onClick={onApplyConfig} isApplying={isApplying} isRetry={status === 'failed'} />
        )}

        <Button variant="ghost" href={externalUrls.referenceRadixConfig} target="_blank" rel="noopener noreferrer">
          Radix config reference
          <Icon data={external_link} size={16} />
        </Button>
      </div>
    </section>
  )
}
