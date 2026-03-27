import { Button, CircularProgress, Icon, Tooltip, Typography } from '@equinor/eds-core-react'
import { error_outlined, star_filled, star_outlined } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import type { MouseEvent, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../routes'
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
import {
  EnvironmentCardStatus,
  type EnvironmentCardStatusMap,
  EnvironmentVulnerabilityIndicator,
} from '../environments-summary/environment-card-status'
import {
  aggregateComponentStatus,
  aggregateComponentReplicaStatus,
  aggregateDeploymentStatus,
  aggregateVulnerabilitySummaries,
  EnvironmentStatus,
  environmentVulnerabilitySummarizer,
  type VulnerabilitySummary,
} from '../environments-summary/environment-status-utils'

import './style.css'
import { slowPollingInterval } from '../../store/defaults'
import { Severity, UtilizationPopover } from '../utilization-popover/utilization-popover'

export type FavouriteClickedHandler = (event: MouseEvent<HTMLButtonElement>, name: string) => void

export interface AppListItemProps {
  appName: string
  latestJob?: JobSummary
  environments?: Environment[]
  handler: FavouriteClickedHandler
  isPlaceholder?: boolean
  isFavourite?: boolean
  showStatus?: boolean
  isDeleted?: boolean
  isLoading: boolean
}

const visibleKeys: Array<Lowercase<Vulnerability['severity']>> = ['critical', 'high']

export const AppListItem = ({ isLoading, ...props }: AppListItemProps) => {
  const { data: vulnerabilitySummary, isLoading: isVulnSummaryLoading } = useGetApplicationVulnerabilitySummariesQuery(
    { appName: props.appName },
    { pollingInterval: 0, skip: !props.showStatus }
  )

  const { data: utilization, isLoading: isUtilizationLoading } = useGetApplicationResourcesUtilizationQuery(
    { appName: props.appName },
    { pollingInterval: slowPollingInterval, skip: !props.showStatus }
  )

  return (
    <AppListItemLayout
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

export const AppListItemLayout = ({
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
  const vulnerabilities: VulnerabilitySummary = (vulnerabilitySummary ?? []).reduce(
    (obj, x) => aggregateVulnerabilitySummaries([obj, environmentVulnerabilitySummarizer(x)]),
    {}
  )

  const time = latestJob && (latestJob.status === 'Running' || !latestJob.ended ? latestJob.started : latestJob.ended)

  const statusElements = parseAppForStatusElements(latestJob, environments)

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
            <>
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

                        {visibleKeys.some((key) => vulnerabilities[key] > 0) && (
                          <EnvironmentVulnerabilityIndicator
                            title="Vulnerabilities"
                            size={22}
                            summary={filterFields(vulnerabilities, visibleKeys)}
                            visibleKeys={visibleKeys}
                          />
                        )}

                        <UtilizationPopover path={''} utilization={utilization} minimumSeverity={Severity.Warning} />

                        {statusElements && (
                          <EnvironmentCardStatus title="Application status" statusElements={statusElements} />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
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

function parseAppForStatusElements(latestJob?: JobSummary, environments?: Environment[]): EnvironmentCardStatusMap {
  return {
    ...(latestJob && {
      'Latest Job': latestJob.status == 'Failed' ? EnvironmentStatus.Danger : EnvironmentStatus.Consistent,
    }),
    ...(environments && {
      Environments: aggregateEnvironmentStatus(environments),
    }),
  }
}

function aggregateEnvironmentStatus(environments: Environment[]): EnvironmentStatus {
  const components = environments.flatMap((env) => env.activeDeployment?.components ?? [])
  const deployments = environments.filter((env) => env.activeDeployment).map((env) => env.activeDeployment!)

  return Math.max(
    aggregateDeploymentStatus(deployments),
    aggregateComponentStatus(components),
    aggregateComponentReplicaStatus(components)
  )
}
