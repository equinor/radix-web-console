import { Typography } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'
import { hasAppliedRadixConfig } from '../../../../domain/radix-config/radixConfig.utils'
import type { Application } from '../../../../store/radix-api'
import { getLatestPipelineJob } from '../../../../utils/pipeline'
import { Banner } from '../../../banner/Banner'
import { PipelineJobLink } from '../../../link/PipelineJobLink'
import { RadixConfigFileLink } from '../../../link/radix-config-file-link'
import { getApplyConfigPromptStatus } from '../../applyConfigPrompt.utils'
import { useApplyRadixConfig } from '../../hooks/use-apply-radix-config'
import { ApplyConfigButton } from '../ApplyConfigButton'
import styles from './applyConfigPromptBanner.module.css'

const BannerHeading = ({ children }: { children: ReactNode }) => (
  <Typography className={styles.title} variant="h4" as="h2">
    {children}
  </Typography>
)

interface ApplyConfigPromptBannerProps {
  readonly application: Pick<Application, 'name' | 'registration' | 'environments' | 'jobs'>
}

/**
 * Compact banner that prompts the user to apply the initial Radix configuration if it has not been applied yet.
 * Reflects whether an apply is already running or has failed. Renders nothing once the configuration is applied.
 */
export const ApplyConfigPromptBanner = (props: ApplyConfigPromptBannerProps) => {
  const { application } = props
  const { applyConfig, isApplying, applyErrorMessage } = useApplyRadixConfig(application.name)

  if (hasAppliedRadixConfig(application)) {
    return null
  }

  const latestJob = getLatestPipelineJob(application.jobs)
  const status = getApplyConfigPromptStatus(latestJob)
  const applyError = applyErrorMessage && <Banner.Message>Failed to apply config. {applyErrorMessage}</Banner.Message>

  if (status === 'in-progress' && latestJob) {
    return (
      <Banner>
        <BannerHeading>Applying your Radix config…</BannerHeading>
        <Banner.Message>
          Pipeline job <PipelineJobLink appName={application.name} job={latestJob} /> is running. Your environments will
          be created as soon as it completes.
        </Banner.Message>
      </Banner>
    )
  }

  if (status === 'failed' && latestJob) {
    return (
      <Banner variant="danger">
        <BannerHeading>Your Radix config could not be applied</BannerHeading>
        <Banner.Message>
          Pipeline job <PipelineJobLink appName={application.name} job={latestJob} /> did not complete, so your
          environments have not been created yet. Open the job to see what went wrong, fix the cause, then apply the
          config again.
        </Banner.Message>
        {applyError}
        <Banner.Actions>
          <ApplyConfigButton onClick={applyConfig} isApplying={isApplying} isRetry />
        </Banner.Actions>
      </Banner>
    )
  }

  return (
    <Banner>
      <BannerHeading>Apply your Radix config to get started</BannerHeading>
      <Banner.Message>
        Radix has not read your <RadixConfigFileLink registration={application.registration} /> yet. Apply it to create
        your environments and start building and deploying.
      </Banner.Message>
      {applyError}
      <Banner.Actions>
        <ApplyConfigButton onClick={applyConfig} isApplying={isApplying} />
      </Banner.Actions>
    </Banner>
  )
}
