import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import type { JobSummary } from '../../store/radix-api'
import { dataSorter, type SortDirection, sortCompareDate, sortCompareString } from '../../utils/sort-utils'
import { getNewSortDir, TableSortIcon } from '../../utils/table-sort-utils'
import { NavigableTable } from '../navigable-table/NavigableTable'
import { JobSummaryTableRow } from './job-summary-table-row'

import './style.css'

interface PipelineJobsTableProps {
  appName: string
  jobs?: Readonly<Array<JobSummary>>
  limit?: number
}

export const PipelineJobsTable = (props: PipelineJobsTableProps) => {
  const { appName, jobs, limit } = props
  const [sortedData, setSortedData] = useState([...(jobs ?? [])])

  const [dateSort, setDateSort] = useState<SortDirection>('descending')
  const [envSort, setEnvSort] = useState<SortDirection>()
  const [pipelineSort, setPipelineSort] = useState<SortDirection>()
  useEffect(() => {
    setSortedData(
      dataSorter(jobs?.slice(0, limit || jobs.length), [
        (x, y) => sortCompareDate(x.created, y.created, dateSort),
        (x, y) => sortCompareString(x.pipeline, y.pipeline, pipelineSort, false, () => !!pipelineSort),
        (x, y) => sortCompareString(x.environments?.[0], y.environments?.[0], envSort, false, () => !!envSort),
      ])
    )
  }, [dateSort, envSort, jobs, limit, pipelineSort])

  return (
    <span className="grid grid--gap-small">
      <Typography variant="h4">Latest pipeline jobs</Typography>
      {sortedData.length > 0 ? (
        <div className="jobs-list grid grid--table-overflow">
          <NavigableTable>
            <NavigableTable.Head>
              <NavigableTable.HeaderRow>
                <NavigableTable.Cell>ID</NavigableTable.Cell>
                <NavigableTable.Cell>Triggered by</NavigableTable.Cell>
                <NavigableTable.Cell sort="none" onClick={() => setDateSort(getNewSortDir(dateSort))}>
                  Date/Time
                  <TableSortIcon direction={dateSort} />
                </NavigableTable.Cell>
                <NavigableTable.Cell sort="none" onClick={() => setEnvSort(getNewSortDir(envSort, true))}>
                  Environment
                  <TableSortIcon direction={envSort} />
                </NavigableTable.Cell>
                <NavigableTable.Cell>Status</NavigableTable.Cell>
                <NavigableTable.Cell sort="none" onClick={() => setPipelineSort(getNewSortDir(pipelineSort, true))}>
                  Pipeline
                  <TableSortIcon direction={pipelineSort} />
                </NavigableTable.Cell>
              </NavigableTable.HeaderRow>
            </NavigableTable.Head>
            <NavigableTable.Body>
              {sortedData.map((x) => (
                <JobSummaryTableRow key={x.name} appName={appName} job={x} />
              ))}
            </NavigableTable.Body>
          </NavigableTable>
        </div>
      ) : (
        <span className="grid grid--gap-small">
          <Typography>No pipeline jobs yet</Typography>
          <Typography>Push to GitHub to trigger a job</Typography>
        </span>
      )}
    </span>
  )
}
