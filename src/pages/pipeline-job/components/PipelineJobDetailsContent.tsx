import { Typography } from '@equinor/eds-core-react'
import type { Job } from '../../../store/radix-api'
import { RerunJobButton } from './actions/RerunJobButton'
import { StopJobButton } from './actions/StopJobButton'
import { PipelineJobWaiting } from './pipeline-job-waiting/PipelineJobWaiting'
import { StepsList } from './steps/StepsList'
import { JobArtifacts } from './summary/JobArtifacts'
import { JobSummary } from './summary/JobSummary'

interface PipelineJobDetailsContentProps {
  readonly appName: string
  readonly jobName: string
  readonly job?: Job
  readonly repository?: string
  readonly onJobChanged: () => void
}

export const PipelineJobDetailsContent = (props: PipelineJobDetailsContentProps) => {
  const { appName, jobName, job, repository, onJobChanged } = props

  if (!job) {
    return <Typography variant="h4">This pipeline job could not be found</Typography>
  }

  const isWaitingToStart = job.status === 'Waiting' || job.status === 'Queued'
  if (isWaitingToStart) {
    return <PipelineJobWaiting status={job.status} appName={appName} jobType={job.pipeline} />
  }

  return (
    <>
      <StopJobButton appName={appName} jobName={jobName} status={job.status} onStopped={onJobChanged} />
      <RerunJobButton appName={appName} jobName={jobName} status={job.status} />

      <JobSummary appName={appName} job={job} repository={repository} />
      <JobArtifacts appName={appName} job={job} repository={repository} />

      <section className="grid grid--gap-medium">
        {job.steps && <StepsList appName={appName} jobName={jobName} steps={job.steps} />}
      </section>
    </>
  )
}
