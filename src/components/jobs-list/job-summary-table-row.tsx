import { Table, Tooltip } from '@equinor/eds-core-react'
import { type FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../routes'
import type { JobSummary } from '../../store/radix-api'
import { copyToClipboard, routeWithParams } from '../../utils/string'
import { CommitHash } from '../commit-hash'
import { RadixJobConditionBadge } from '../status-badges'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

export const JobSummaryTableRow: FunctionComponent<{
  appName: string
  job: Readonly<JobSummary>
}> = function ({ appName, job }) {
  const [copyTitle, setCopyTitle] = useState(job.name)

  const handleCopy = (text: string) => {
    copyToClipboard(text)
    setCopyTitle('Copied')
  }

  return (
    <Table.Row>
      <Table.Cell>
        <Link className="job-summary__id-section" to={routeWithParams(routes.appJob, { appName, jobName: job.name })}>
          {job.triggeredBy && job.triggeredBy.length > 25 ? (
            <Tooltip placement="top" title={job.triggeredBy}>
              <div>{`${job.triggeredBy.substring(0, 8)}...${job.triggeredBy.slice(-12)}`}</div>
            </Tooltip>
          ) : (
            <div>{job.triggeredBy || 'N/A'}</div>
          )}
          <CommitHash commit={job.commitID ?? ''} />
        </Link>
      </Table.Cell>
      <Table.Cell className="pipeline-name" onClick={() => handleCopy(job.name)}>
        <Tooltip placement="top" title={copyTitle} enterDelay={300}>
          <div onMouseLeave={() => setCopyTitle(job.name)}>{`${job.name.slice(-5)}`}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        {job.started && (
          <>
            <RelativeToNow titlePrefix="Start time" capitalize time={new Date(job.started)} />
            <br />
            <Duration title="Duration" start={new Date(job.started)} end={job.ended && new Date(job.ended)} />
          </>
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="job-summary__data-section">
          {[...(job.environments ?? [])].sort().map((envName, i) => (
            <Link
              key={i}
              className="job-summary__link"
              to={routeWithParams(routes.appEnvironment, { appName, envName })}
            >
              {envName}
            </Link>
          ))}
        </div>
      </Table.Cell>
      <Table.Cell variant="icon">
        <RadixJobConditionBadge status={job.status ?? 'Waiting'} />
      </Table.Cell>
      <Table.Cell>{job.pipeline}</Table.Cell>
    </Table.Row>
  )
}
