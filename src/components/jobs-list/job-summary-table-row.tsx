import { Tooltip } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import { routes } from '../../router/routes'
import type { JobSummary } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { CompactCopyButton } from '../compact-copy-button'
import { NavigableTable } from '../navigable-table/NavigableTable'
import { RadixJobConditionBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

export const JobSummaryTableRow: FunctionComponent<{
  appName: string
  job: Readonly<JobSummary>
}> = function ({ appName, job }) {
  const sortedEnvironments = [...(job.environments ?? [])].sort((a, b) => a.localeCompare(b))

  return (
    <NavigableTable.Row
      to={routeWithParams(routes.appJob, { appName, jobName: job.name })}
      linkLabel={`Open pipeline job ${job.name.slice(-5)}`}
    >
      <NavigableTable.Cell className="job-summary__id-cell">
        <span>{job.name.slice(-5)}</span>
        <span className="job-summary__id-actions">
          <CompactCopyButton content={job.name} />
        </span>
      </NavigableTable.Cell>
      <NavigableTable.Cell>
        {job.triggeredBy && job.triggeredBy.length > 25 ? (
          <Tooltip placement="top" title={job.triggeredBy}>
            <div>{`${job.triggeredBy.substring(0, 8)}...${job.triggeredBy.slice(-12)}`}</div>
          </Tooltip>
        ) : (
          <div>{job.triggeredBy || 'N/A'}</div>
        )}
      </NavigableTable.Cell>
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
        <div className="job-summary__data-section">
          {sortedEnvironments.map((envName) => (
            <Link
              key={envName}
              className="job-summary__link"
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
