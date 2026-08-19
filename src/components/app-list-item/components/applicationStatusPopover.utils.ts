import { getEnvironmentsStatusMeta, getLatestJobStatusMeta } from '../../../domain/status-meta/statusMeta.utils'
import type { Environment, JobSummary } from '../../../store/radix-api'
import type { StatusItem } from '../../status-popover/shared/aggregated-status-popover/aggregatedStatusPopover.types'

/**
 * Builds the aggregated status items for an application: always the environments status,
 * plus the latest job status when a job exists.
 */
export const getApplicationStatusItems = (
  environments: ReadonlyArray<Environment> = [],
  latestJob?: Pick<JobSummary, 'status'>
): StatusItem[] => {
  const environmentsStatus = getEnvironmentsStatusMeta(environments)

  const items: StatusItem[] = [
    { label: 'Environments', alertLevel: environmentsStatus.alertLevel, icon: environmentsStatus.icon },
  ]

  if (latestJob !== undefined) {
    const latestJobStatus = getLatestJobStatusMeta(latestJob)
    items.push({ label: 'Latest job', alertLevel: latestJobStatus.alertLevel, icon: latestJobStatus.icon })
  }

  return items
}
