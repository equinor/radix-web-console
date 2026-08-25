import { Tooltip } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { routes } from '../../router/routes'
import type { JobSummary } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { NavigableTable } from '../navigable-table/NavigableTable'
import { RadixJobConditionBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

import styles from './pipelineJobsTable.module.css'

const TriggeredByCell = (props: { readonly triggeredBy: string | undefined }) => {
  const { triggeredBy = '' } = props

  const isLongText = triggeredBy.length > 25
  const triggeredByDisplay = isLongText
    ? `${triggeredBy.slice(0, 8)}...${triggeredBy.slice(-12)}`
    : triggeredBy || 'N/A'

  if (!isLongText) return triggeredByDisplay

  return (
    <Tooltip placement="top" title={triggeredBy}>
      <span>{triggeredByDisplay}</span>
    </Tooltip>
  )
}

interface PipelineJobsTableRowProps {
  readonly appName: string
  readonly job: Readonly<JobSummary>
}

export const PipelineJobsTableRow = (props: PipelineJobsTableRowProps) => {
  const { appName, job } = props
  const sortedEnvironments = (job.environments ?? []).toSorted((a, b) => a.localeCompare(b))

  const shortenedJobName = job.name.slice(-5)
  const jobStartedDate = job.started ? new Date(job.started) : undefined
  const jobEndedDate = job.ended ? new Date(job.ended) : undefined

  return (
    <NavigableTable.Row
      to={routeWithParams(routes.appJob, { appName, jobName: job.name })}
      linkLabel={`Open pipeline job ${shortenedJobName}`}
    >
      <NavigableTable.Cell>{shortenedJobName}</NavigableTable.Cell>
      <NavigableTable.InteractiveCell>
        <TriggeredByCell triggeredBy={job.triggeredBy} />
      </NavigableTable.InteractiveCell>
      <NavigableTable.Cell>
        {job.started && (
          <>
            <RelativeToNow titlePrefix="Start time" capitalize time={jobStartedDate} />
            <br />
            <Duration title="Duration" start={jobStartedDate} end={jobEndedDate} />
          </>
        )}
      </NavigableTable.Cell>
      <NavigableTable.Cell>
        <div className={styles.environments}>
          {sortedEnvironments.map((envName) => (
            <Link
              key={envName}
              className={styles.environmentLink}
              to={routeWithParams(routes.appEnvironment, { appName, envName })}
            >
              {envName}
            </Link>
          ))}
        </div>
      </NavigableTable.Cell>
      <NavigableTable.Cell variant="icon">
        <RadixJobConditionBadge status={job.status ?? 'Waiting'} />
      </NavigableTable.Cell>
      <NavigableTable.Cell>{job.pipeline}</NavigableTable.Cell>
    </NavigableTable.Row>
  )
}
