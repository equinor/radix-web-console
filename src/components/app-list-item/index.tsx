import { Button, CircularProgress, Icon, Tooltip, Typography } from '@equinor/eds-core-react'
import { error_outlined, star_filled, star_outlined } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import type { MouseEvent, PropsWithChildren } from 'react'
import { Link } from 'react-router'

import { routes } from '../../router/routes'
import {
  type Environment,
  type JobSummary,
  type ReplicaResourcesUtilizationResponse,
  useGetApplicationResourcesUtilizationQuery,
} from '../../store/radix-api'
import {
  type ApplicationVulnerabilities,
  useGetApplicationVulnerabilitySummariesQuery,
  type Vulnerability,
} from '../../store/scan-api'
import { filterFields } from '../../utils/filter-fields'
import { routeWithParams } from '../../utils/string'
import { AppBadge } from '../app-badge'

import './style.css'
import { slowPollingInterval } from '../../store/defaults'
import { UtilizationStatusPopover } from '../status-popover/shared/utilization-status-popover/UtilizationStatusPopover'
import { getApplicationReplicaUtilizations } from '../status-popover/shared/utilization-status-popover/utilizationStatusPopover.utils'
import { VulnerabilityStatusPopover } from '../status-popover/shared/vulnerability-status-popover/VulnerabilityStatusPopover'
import { summarizeApplicationVulnerabilities } from '../status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import { ApplicationStatusPopover } from './components/ApplicationStatusPopover'

export type FavouriteClickedHandler = (event: MouseEvent<HTMLButtonElement>, name: string) => void

interface AppListItemProps {
  appName: string
  latestJob?: JobSummary
  environments?: Environment[]
  handler: FavouriteClickedHandler
  isPlaceholder?: boolean
  isFavourite?: boolean
  isLoading: boolean
  showStatus?: boolean
  isDeleted?: boolean
}

const visibleKeys: ReadonlyArray<Lowercase<Vulnerability['severity']>> = ['critical', 'high']

export const AppListItemContainer = ({ isLoading, ...props }: AppListItemProps) => {
  const { data: vulnerabilitySummary, isLoading: isVulnSummaryLoading } = useGetApplicationVulnerabilitySummariesQuery(
    { appName: props.appName },
    { pollingInterval: 0, skip: !props.showStatus }
  )

  const { data: utilization, isLoading: isUtilizationLoading } = useGetApplicationResourcesUtilizationQuery(
    { appName: props.appName },
    { pollingInterval: slowPollingInterval, skip: !props.showStatus }
  )

  return (
    <AppListItem
      utilization={utilization}
      vulnerabilitySummary={vulnerabilitySummary}
      isLoading={isUtilizationLoading || isVulnSummaryLoading || isLoading}
      {...props}
    />
  )
}

export type AppListItemLayoutProps = {
  appName: string
  latestJob?: JobSummary
  environments?: Environment[]
  handler: FavouriteClickedHandler
  isPlaceholder?: boolean
  isFavourite?: boolean
  showStatus?: boolean
  isLoading: boolean
  isDeleted?: boolean
  utilization?: ReplicaResourcesUtilizationResponse
  vulnerabilitySummary?: ApplicationVulnerabilities
}

export const AppListItem = ({
  latestJob,
  environments,
  isDeleted,
  appName,
  isLoading,
  handler,
  showStatus,
  isPlaceholder,
  isFavourite,
  utilization,
  vulnerabilitySummary,
}: AppListItemLayoutProps) => {
  const vulnerabilities = summarizeApplicationVulnerabilities(vulnerabilitySummary)
  const replicaUtilizations = getApplicationReplicaUtilizations(utilization)

  const time = latestJob && (latestJob.status === 'Running' || !latestJob.ended ? latestJob.started : latestJob.ended)

  const latestJobIsChanging = latestJob && (latestJob.status === 'Running' || latestJob.status === 'Stopping')

  return (
    <WElement
      className={clsx('app-list-item', {
        'app-list-item--placeholder': isPlaceholder,
      })}
      appName={appName}
      isPlaceholder={isPlaceholder}
    >
      <div className="app-list-item--area">
        <div className="app-list-item--area-icon">
          <AppBadge appName={appName} size={40} />
        </div>
        <div className="grid app-list-item--area-details">
          <div className="app-list-item--details">
            <Typography className="app-list-item--details-title" variant="h6">
              {appName}
            </Typography>
            <div className="app-list-item--details-favourite">
              <Button variant="ghost_icon" onClick={(e) => handler(e, appName)}>
                <Icon data={isFavourite ? star_filled : star_outlined} />
              </Button>
            </div>
          </div>

          {showStatus && (
            <div className="grid grid--gap-small app-list-status">
              <div className="app-list-status--last-job grid--gap-small">
                {isDeleted && !isLoading && (
                  <div>
                    <Tooltip title="This application does not exist">
                      <Icon data={error_outlined} />
                    </Tooltip>
                  </div>
                )}
                {(!isDeleted || isLoading) && (
                  <>
                    <div>
                      {time && (
                        <Typography style={{ fontWeight: 400 }}>
                          {formatDistanceToNow(new Date(time), {
                            addSuffix: true,
                          })}
                        </Typography>
                      )}
                    </div>

                    <div className="grid grid--gap-x-small grid--auto-columns">
                      {(latestJobIsChanging || isLoading) && (
                        <CircularProgress
                          // @ts-expect-error the other status icons are 22px, we should match it
                          size={22}
                        />
                      )}

                      {!isLoading && (
                        <>
                          {visibleKeys.some((key) => vulnerabilities[key] > 0) && (
                            <VulnerabilityStatusPopover summary={filterFields(vulnerabilities, visibleKeys)} />
                          )}
                          <UtilizationStatusPopover
                            replicaUtilizations={replicaUtilizations}
                            showLabel={false}
                            minimumSeverity="Warning"
                          />
                          <ApplicationStatusPopover environments={environments} latestJob={latestJob} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </WElement>
  )
}

type WElementProps = {
  appName: string
  isPlaceholder?: boolean
  className: string
}
const WElement = ({ appName, isPlaceholder, className, children }: PropsWithChildren<WElementProps>) => {
  if (isPlaceholder) return <div className={className}>{children}</div>

  return (
    <Link className={className} to={routeWithParams(routes.app, { appName })}>
      {children}
    </Link>
  )
}
