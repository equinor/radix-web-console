import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check, error_outlined, time } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'
import type { ScheduledJobSummary } from '../../../store/radix-api'
import { StatusBadgeTemplate } from '../../status-badges/status-badge-template'
import type { StatusTooltipTemplateProps } from '../../status-tooltips/status-tooltip-template'

export type BatchJobStatus = 'Running' | 'Succeeded' | 'Failed' | 'Other'

class JobStatuses {
  running = 0
  succeeded = 0
  failed = 0
  other = 0
}

const JobStatusBadgeTemplates = {
  Other: {
    className: 'status-badge-type__warning',
    title: 'Other statuses',
    icon: <Icon data={time} />,
  },
  Running: {
    className: 'status-badge-type__running',
    title: 'Running',
    icon: <CircularProgress />,
  },
  Succeeded: {
    title: 'Succeeded',
    icon: <Icon data={check} />,
  },
  Failed: {
    title: 'Failed',
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
} satisfies Record<BatchJobStatus, StatusTooltipTemplateProps>

const JobConditionBadge: FunctionComponent<{
  status: JobStatuses
}> = ({ status }) => (
  <div className="job-status-container">
    {status.running > 0 && (
      <StatusBadgeTemplate {...JobStatusBadgeTemplates.Running}>{status.running}</StatusBadgeTemplate>
    )}
    {status.succeeded > 0 && (
      <StatusBadgeTemplate {...JobStatusBadgeTemplates.Succeeded}>{status.succeeded}</StatusBadgeTemplate>
    )}
    {status.failed > 0 && (
      <StatusBadgeTemplate {...JobStatusBadgeTemplates.Failed}>{status.failed}</StatusBadgeTemplate>
    )}
    {status.other > 0 && <StatusBadgeTemplate {...JobStatusBadgeTemplates.Other}>{status.other}</StatusBadgeTemplate>}
  </div>
)

export const BatchJobStatuses: FunctionComponent<{
  jobs?: ScheduledJobSummary[]
}> = ({ jobs }) => {
  const batchJobStatuses = new JobStatuses()
  jobs?.map((job) => {
    switch (job.status) {
      case 'Running':
        batchJobStatuses.running = batchJobStatuses.running + 1
        break
      case 'Succeeded':
        batchJobStatuses.succeeded = batchJobStatuses.succeeded + 1
        break
      case 'Failed':
        batchJobStatuses.failed = batchJobStatuses.failed + 1
        break
      default:
        batchJobStatuses.other = batchJobStatuses.other + 1
    }
  })
  return <JobConditionBadge status={batchJobStatuses} />
}
