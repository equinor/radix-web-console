import type { JobSummary } from '../../../../store/radix-api'
import { Banner } from '../../../banner/Banner'
import { PipelineJobLink } from '../../../link/PipelineJobLink'
import type { ApplyConfigPromptStatus } from '../../applyConfigPrompt.types'

interface ApplyConfigStatusBannerProps {
  readonly appName: string
  readonly status: ApplyConfigPromptStatus
  readonly latestJob?: JobSummary
}

/** Tells the user how the latest apply attempt is going. Renders nothing until a job exists. */
export const ApplyConfigStatusBanner = (props: ApplyConfigStatusBannerProps) => {
  const { appName, status, latestJob } = props

  if (!latestJob || status === 'not-started') {
    return null
  }

  const jobLink = <PipelineJobLink appName={appName} job={latestJob} />

  if (status === 'in-progress') {
    return (
      <Banner>
        <Banner.Title>Applying your Radix config…</Banner.Title>
        <Banner.Message>
          Pipeline job {jobLink} is running. Your environments will show up here as soon as it completes.
        </Banner.Message>
      </Banner>
    )
  }

  return (
    <Banner variant="danger">
      <Banner.Title>Your Radix config could not be applied</Banner.Title>
      <Banner.Message>
        Pipeline job {jobLink} did not complete. Open it to see what went wrong, fix the cause, then apply the config
        again.
      </Banner.Message>
    </Banner>
  )
}
