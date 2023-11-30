import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { JobSummaryTableRow } from './job-summary-table-row';

import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/radix-api/jobs/job-summary';
import {
  dataSorter,
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

import './style.css';

export interface JobsListProps {
  appName: string;
  jobs?: Array<JobSummaryModel>;
  limit?: number;
}

export const JobsList: FunctionComponent<JobsListProps> = ({
  appName,
  jobs,
  limit,
}) => {
  const [sortedData, setSortedData] = useState(jobs || []);

  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  const [envSort, setEnvSort] = useState<sortDirection>();
  const [pipelineSort, setPipelineSort] = useState<sortDirection>();
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

  return sortedData.length > 0 ? (
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
              onClick={() => setPipelineSort(getNewSortDir(pipelineSort, true))}
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
    <>
      <Typography variant="h4">No pipeline jobs yet</Typography>
      <Typography>Push to GitHub to trigger a job</Typography>
    </>
  );
};

JobsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(
    PropTypes.shape(
      JobSummaryModelValidationMap
    ) as PropTypes.Validator<JobSummaryModel>
  ),
  limit: PropTypes.number,
};
