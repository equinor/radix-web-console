import { slowPollingInterval } from '../../../../store/defaults'
import type { Environment, JobSummary } from '../../../../store/radix-api'
import { useGetApplicationResourcesUtilizationQuery } from '../../../../store/radix-api'
import { useGetApplicationVulnerabilitySummariesQuery } from '../../../../store/scan-api'
import { AppListItem, type AppListItemProps } from './AppListItem'
import { AppListItemStatus } from './components/AppListItemStatus'

interface AppListItemContainerProps {
  appName: AppListItemProps['appName']
  handler: AppListItemProps['handler']
  isFavorite?: AppListItemProps['isFavorite']

  latestJob?: JobSummary
  environments?: Environment[]
  isDeleted?: boolean
  isLoading: boolean
}

/**
 * Renders an app row together with its status. Always fetches the status data
 * (vulnerabilities + resource utilization) — that is the reason this container exists.
 * Use the plain `AppListItem` for rows that should not show status.
 */
export const AppListItemWithStatuses = (props: AppListItemContainerProps) => {
  const { appName, latestJob, environments, handler, isFavorite, isDeleted, isLoading } = props

  const { data: vulnerabilitySummary, isLoading: isVulnSummaryLoading } = useGetApplicationVulnerabilitySummariesQuery(
    { appName },
    { pollingInterval: 0 }
  )

  const { data: utilization, isLoading: isUtilizationLoading } = useGetApplicationResourcesUtilizationQuery(
    { appName },
    { pollingInterval: slowPollingInterval }
  )

  return (
    <AppListItem appName={appName} handler={handler} isFavorite={isFavorite}>
      <AppListItemStatus
        latestJob={latestJob}
        environments={environments}
        isDeleted={isDeleted}
        isLoading={isUtilizationLoading || isVulnSummaryLoading || isLoading}
        utilization={utilization}
        vulnerabilitySummary={vulnerabilitySummary}
      />
    </AppListItem>
  )
}
