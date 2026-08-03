import type { Environment, JobSummary } from '../../../../../../../store/radix-api'
import { getEnvironmentsStatusMeta, getLatestJobStatusMeta } from '../domain/statusMeta.utils'
import { AggregatedStatusPopover } from './aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from './aggregated-status-popover/aggregatedStatusPopover.types'

interface ApplicationStatusPopoverProps {
  environments?: Environment[]
  latestJob?: Pick<JobSummary, 'status'>
}

/**
 * Goes through the list of environments for one application and the latest job, and finds the most severe status,
 * then renders a popover with the aggregated status and a list of all items.
 * If the list of environments is empty, returns null.
 */
export const ApplicationStatusPopover = (props: ApplicationStatusPopoverProps) => {
  const { environments, latestJob } = props

  const latestJobStatus = getLatestJobStatusMeta(latestJob)
  const environmentsStatus = getEnvironmentsStatusMeta(environments ?? [])

  const items: StatusItem[] = [
    { label: 'Latest job', alertLevel: latestJobStatus.alertLevel, icon: latestJobStatus.icon },
    { label: 'Environments', alertLevel: environmentsStatus.alertLevel, icon: environmentsStatus.icon },
  ]

  return <AggregatedStatusPopover title="Application status" items={items} />
}
