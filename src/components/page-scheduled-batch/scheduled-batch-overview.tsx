import { Typography } from '@equinor/eds-core-react'
import type { ScheduledBatchSummary } from '../../store/radix-api'
import { smallScheduledBatchName } from '../../utils/string'
import { ComponentDeployment } from '../component/component-deployment'
import { BatchJobStatuses } from '../component/scheduled-job/batch-job-statuses'
import { ProgressStatusBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

type Props = {
  started: string
  finished?: string
}
const ScheduledBatchDuration = ({ started, finished }: Props) => {
  return (
    <>
      <Typography as="span">
        Started{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      {finished && (
        <>
          <Typography as="span">
            Ended{' '}
            <strong>
              <RelativeToNow time={finished} />
            </strong>
          </Typography>
          <Typography as="span">
            Duration{' '}
            <strong>
              <Duration start={started} end={finished} />
            </strong>
          </Typography>
        </>
      )}
    </>
  )
}

type ScheduledBatchOverviewProps = {
  appName: string
  batch: ScheduledBatchSummary
  jobComponentName: string
}
export const ScheduledBatchOverview = ({ appName, batch, jobComponentName }: ScheduledBatchOverviewProps) => (
  <>
    <Typography variant="h4">Overview</Typography>
    <section className="grid grid--gap-medium overview">
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography as="span">
            Job component <strong>{jobComponentName}</strong>
          </Typography>
          <Typography as="span">
            Batch name <strong>{smallScheduledBatchName(batch.name)}</strong>
          </Typography>
          {batch.batchId && (
            <Typography as="span">
              Batch ID <strong>{batch.batchId}</strong>
            </Typography>
          )}
          <ComponentDeployment
            appName={appName}
            componentName={jobComponentName}
            deploymentName={batch.deploymentName}
          />
          {batch.status && (
            <Typography as="span" className="status-title">
              Batch status <ProgressStatusBadge status={batch.status} />
            </Typography>
          )}
          <Typography as="span" className="status-title">
            Jobs statuses
            <BatchJobStatuses jobs={batch.jobList} />
          </Typography>
        </div>
        <div className="grid grid--gap-medium">
          <>
            <Typography as="span">
              Created{' '}
              <strong>
                <RelativeToNow time={batch.created} />
              </strong>
            </Typography>
            {batch.started && <ScheduledBatchDuration started={batch.started} finished={batch.ended} />}
          </>
        </div>
      </div>
    </section>
  </>
)
