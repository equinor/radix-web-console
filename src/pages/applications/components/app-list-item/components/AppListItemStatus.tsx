import { CircularProgress, Icon, Tooltip, Typography } from '@equinor/eds-core-react'
import { error_outlined } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { UtilizationStatusPopover } from '../../../../../components/status-popover/shared/utilization-status-popover/UtilizationStatusPopover'
import { getApplicationReplicaUtilizations } from '../../../../../components/status-popover/shared/utilization-status-popover/utilizationStatusPopover.utils'
import { VulnerabilityStatusPopover } from '../../../../../components/status-popover/shared/vulnerability-status-popover/VulnerabilityStatusPopover'
import { summarizeApplicationVulnerabilities } from '../../../../../components/status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import type { Environment, JobSummary, ReplicaResourcesUtilizationResponse } from '../../../../../store/radix-api'
import type { ApplicationVulnerabilities, Vulnerability } from '../../../../../store/scan-api'
import { filterFields } from '../../../../../utils/filter-fields'
import styles from '../appListItem.module.css'
import { ApplicationStatusPopover } from './ApplicationStatusPopover'

const visibleKeys: ReadonlyArray<Lowercase<Vulnerability['severity']>> = ['critical', 'high']

interface AppListItemStatusProps {
  latestJob?: JobSummary
  environments?: Environment[]
  isDeleted?: boolean
  isLoading: boolean
  utilization?: ReplicaResourcesUtilizationResponse
  vulnerabilitySummary?: ApplicationVulnerabilities
}

export const AppListItemStatus = (props: AppListItemStatusProps) => {
  const { latestJob, environments, isDeleted, isLoading, utilization, vulnerabilitySummary } = props

  const vulnerabilities = summarizeApplicationVulnerabilities(vulnerabilitySummary)
  const replicaUtilizations = getApplicationReplicaUtilizations(utilization)

  const time = latestJob && (latestJob.status === 'Running' || !latestJob.ended ? latestJob.started : latestJob.ended)

  const latestJobIsChanging = latestJob && (latestJob.status === 'Running' || latestJob.status === 'Stopping')

  return (
    <div className={clsx('grid grid--gap-small', styles.status)}>
      <div className={clsx('grid--gap-small', styles.statusLastJob)}>
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
  )
}
