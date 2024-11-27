import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { type FunctionComponent, useEffect, useState } from 'react';

import { JobSummaryTableRow } from './job-summary-table-row';

import type { JobSummary } from '../../store/radix-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
  sortCompareString,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

import './style.css';

export interface JobsListProps {
  appName: string;
  jobs?: Readonly<Array<JobSummary>>;
  limit?: number;
}

export const JobsList: FunctionComponent<JobsListProps> = ({
  appName,
  jobs,
  limit,
}) => {
  const [sortedData, setSortedData] = useState([...(jobs ?? [])]);

  const [dateSort, setDateSort] = useState<SortDirection>('descending');
  const [envSort, setEnvSort] = useState<SortDirection>();
  const [pipelineSort, setPipelineSort] = useState<SortDirection>();
  useEffect(() => {
    setSortedData(
      dataSorter(jobs?.slice(0, limit || jobs.length), [
        (x, y) => sortCompareDate(x.created, y.created, dateSort),
        (x, y) =>
          sortCompareString(
            x.pipeline,
            y.pipeline,
            pipelineSort,
            false,
            () => !!pipelineSort
          ),
        (x, y) =>
          sortCompareString(
            x.environments?.[0],
            y.environments?.[0],
            envSort,
            false,
            () => !!envSort
          ),
      ])
    );
  }, [dateSort, envSort, jobs, limit, pipelineSort]);

  return (
    <span className="grid grid--gap-small">
      <Typography variant="h4">Latest pipeline jobs</Typography>
      {sortedData.length > 0 ? (
        <div className="jobs-list grid grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell
                  sort="none"
                  onClick={() => setDateSort(getNewSortDir(dateSort))}
                >
                  Date/Time
                  <TableSortIcon direction={dateSort} />
                </Table.Cell>
                <Table.Cell
                  sort="none"
                  onClick={() => setEnvSort(getNewSortDir(envSort, true))}
                >
                  Environment
                  <TableSortIcon direction={envSort} />
                </Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell
                  sort="none"
                  onClick={() =>
                    setPipelineSort(getNewSortDir(pipelineSort, true))
                  }
                >
                  Pipeline
                  <TableSortIcon direction={pipelineSort} />
                </Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sortedData.map((x) => (
                <JobSummaryTableRow key={x.name} appName={appName} job={x} />
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <span className="grid grid--gap-small">
          <Typography>No pipeline jobs yet</Typography>
          <Typography>Push to GitHub to trigger a job</Typography>
        </span>
      )}
    </span>
  );
};

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.object as PropTypes.Validator<JobSummary>),
  limit: PropTypes.number,
};
