import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { JobSummaryTableRow } from './job-summary-table-row';

import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/job-summary';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';

import './style.css';

export interface JobsListProps {
  appName: string;
  jobs: Array<JobSummaryModel>;
  limit?: number;
}

function getNewSortDir(
  direction: sortDirection,
  nullable?: boolean
): sortDirection | null {
  if (!direction) {
    return 'ascending';
  }

  if (direction === 'ascending') {
    return 'descending';
  }

  return nullable ? null : 'ascending';
}

function getSortIcon(dir: sortDirection): IconData {
  switch (dir) {
    case 'ascending':
      return chevron_down;
    case 'descending':
      return chevron_up;
    default:
      return unfold_more;
  }
}

export const JobsList = (props: JobsListProps): JSX.Element => {
  const [jobsTableRows, setJobsTableRows] = useState<JSX.Element[]>([]);

  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');
  const [envSortDir, setEnvSortDir] = useState<sortDirection>();
  const [pipelineSortDir, setPipelineSortDir] = useState<sortDirection>();

  useEffect(() => {
    const sortedJobs =
      props?.jobs?.slice(0, props.limit ? props.limit : props.jobs.length) ||
      [];
    sortedJobs
      .sort((x, y) => sortCompareDate(x.created, y.created, dateSortDir))
      .sort((x, y) =>
        sortCompareString(
          x.pipeline,
          y.pipeline,
          pipelineSortDir,
          false,
          () => !!pipelineSortDir
        )
      )
      .sort((x, y) =>
        sortCompareString(
          x.environments?.length > 0 ? x.environments[0] : null,
          y.environments?.length > 0 ? y.environments[0] : null,
          envSortDir,
          false,
          () => !!envSortDir
        )
      );

    const tableRows = sortedJobs.map((job) => (
      <JobSummaryTableRow key={job.name} appName={props.appName} job={job} />
    ));
    setJobsTableRows(tableRows);
  }, [dateSortDir, envSortDir, pipelineSortDir, props]);

  return jobsTableRows?.length > 0 ? (
    <div className="jobs-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSortDir(getNewSortDir(dateSortDir))}
            >
              Date/Time
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(dateSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setEnvSortDir(getNewSortDir(envSortDir, true))}
            >
              Environment
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(envSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() =>
                setPipelineSortDir(getNewSortDir(pipelineSortDir, true))
              }
            >
              Pipeline
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(pipelineSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell>Scan results</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{jobsTableRows.map((tableRow) => tableRow)}</Table.Body>
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
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummaryModelValidationMap))
    .isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<JobsListProps>;
