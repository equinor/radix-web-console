import { Tooltip } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { routes } from '../../router/routes'
import type { JobSummary } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { CompactCopyButton } from '../compact-copy-button'
import { NavigableTable } from '../navigable-table/NavigableTable'
import { RadixJobConditionBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

const TriggeredByCell = (props: { readonly triggeredBy: string | undefined }) => {
  const { triggeredBy = '' } = props
  const isTextLong = triggeredBy.length > 25
  const triggeredByDisplay = isTextLong
    ? `${triggeredBy.slice(0, 8)}...${triggeredBy.slice(-12)}`
    : triggeredBy || 'N/A'

  return isTextLong ? (
    <Tooltip placement="top" title={triggeredBy}>
      <span>{triggeredByDisplay}</span>
    </Tooltip>
  ) : (
    triggeredByDisplay
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

  return (
    <NavigableTable.Row
      to={routeWithParams(routes.appJob, { appName, jobName: job.name })}
      linkLabel={`Open pipeline job ${shortenedJobName}`}
    >
      <NavigableTable.Cell className="pipeline-jobs-table__id-cell">
        <span>{shortenedJobName}</span>
        <span className="pipeline-jobs-table__id-actions">
          <CompactCopyButton content={job.name} />
        </span>
      </NavigableTable.Cell>
      <NavigableTable.InteractiveCell>
        <TriggeredByCell triggeredBy={job.triggeredBy} />
      </NavigableTable.InteractiveCell>
      <NavigableTable.Cell>
        {job.started && (
          <>
            <RelativeToNow titlePrefix="Start time" capitalize time={new Date(job.started)} />
            <br />
            <Duration title="Duration" start={new Date(job.started)} end={job.ended && new Date(job.ended)} />
          </>
        )}
      </NavigableTable.Cell>
      <NavigableTable.Cell>
        <div className="pipeline-jobs-table__environments">
          {sortedEnvironments.map((envName) => (
            <Link
              key={envName}
              className="pipeline-jobs-table__environment-link"
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
