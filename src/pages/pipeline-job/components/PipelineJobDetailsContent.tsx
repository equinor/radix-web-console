import { Typography } from '@equinor/eds-core-react'
import type { Job } from '../../../store/radix-api'
import { PipelineJobRerunButton } from './pipeline-job-actions/PipelineJobRerunButton'
import { PipelineJobStopButton } from './pipeline-job-actions/PipelineJobStopButton'
import { PipelineJobStepList } from './pipeline-job-step-list/PipelineJobStepList'
import { PipelineJobWaitingScreen } from './pipeline-job-waiting-screen/PipelineJobWaitingScreen'
import { PipelineJobArtifacts } from './summary/PipelineJobArtifacts'
import { PipelineJobSummary } from './summary/PipelineJobSummary'

interface PipelineJobDetailsContentProps {
  readonly appName: string
  readonly jobName: string
  readonly job?: Job
  readonly repository?: string
  readonly onJobChanged: () => void
  readonly onRerunJob: (newJobName: string) => void
}

export const PipelineJobDetailsContent = (props: PipelineJobDetailsContentProps) => {
  const { appName, jobName, job, repository, onJobChanged, onRerunJob } = props

  if (!job) {
    return <Typography variant="h4">This pipeline job could not be found</Typography>
  }

  const isWaitingToStart = job.status === 'Waiting' || job.status === 'Queued'
  if (isWaitingToStart) {
    return (
      <PipelineJobWaitingScreen status={job.status} appName={appName} jobType={job.pipeline}>
        {/* Makes the job cancellable */}
        <PipelineJobStopButton appName={appName} jobName={jobName} status={job.status} onStopped={onJobChanged} />
      </PipelineJobWaitingScreen>
    )
  }

  return (
    <>
      <PipelineJobStopButton appName={appName} jobName={jobName} status={job.status} onStopped={onJobChanged} />
      <PipelineJobRerunButton appName={appName} jobName={jobName} status={job.status} onRerun={onRerunJob} />

      <PipelineJobSummary appName={appName} job={job} repository={repository} />
      <PipelineJobArtifacts appName={appName} job={job} repository={repository} />

      <section className="grid grid--gap-medium">
        {job.steps && <PipelineJobStepList appName={appName} jobName={jobName} steps={job.steps} />}
      </section>
    </>
  )
}
