import { AggregatedStatusPopover } from '../../../../../components/status-popover/shared/aggregated-status-popover/AggregatedStatusPopover'
import type { Environment, JobSummary } from '../../../../../store/radix-api'
import { getApplicationStatusItems } from './applicationStatusPopover.utils'

interface ApplicationStatusPopoverProps {
  readonly environments?: ReadonlyArray<Environment>
  readonly latestJob?: Pick<JobSummary, 'status'>
}

/**
 * Goes through the list of environments for one application and the latest job, and finds the most severe status,
 * then renders a popover with the aggregated status and a list of all items.
 */
export const ApplicationStatusPopover = (props: ApplicationStatusPopoverProps) => {
  const { environments, latestJob } = props

  const items = getApplicationStatusItems(environments, latestJob)

  return <AggregatedStatusPopover title="Application status" items={items} />
}
