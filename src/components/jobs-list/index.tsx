import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { JobSummary } from './job-summary';

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

function getNextSortDirection(
  dir: sortDirection,
  nullable?: boolean
): sortDirection | null {
  if (!dir) {
    return 'ascending';
  }
  if (dir === 'ascending') {
    return 'descending';
  }

  return nullable ? null : 'ascending';
}

const getTableBody = (
  appName: string,
  jobs: JobSummaryModel[],
  limit?: number
): JSX.Element[] =>
  jobs
    .slice(0, limit ? limit : jobs.length)
    .map((job) => <JobSummary key={job.name} appName={appName} job={job} />);

export const JobsList = (props: JobsListProps): JSX.Element => {
  const [jobs, setJobs] = useState<JobSummaryModel[]>([]);
  const [tableBody, setTableBody] = useState<JSX.Element[]>([]);

  const [dateSortDir, setDateSort] = useState<sortDirection>('descending');
  const [envSortDir, setEnvironmentSort] = useState<sortDirection>(null);
  const [pipelineSortDir, setPipelineSort] = useState<sortDirection>(null);

  useEffect(() => {
    const sortedJobs = props?.jobs || [];
    sortedJobs
      .sort((x, y) => sortCompareDate(x.created, y.created, dateSortDir))
      .sort((x, y) =>
        sortCompareString(
          x.environments?.length > 0 ? x.environments[0] : null,
          y.environments?.length > 0 ? y.environments[0] : null,
          envSortDir,
          false,
          () => !!envSortDir
        )
      )
      .sort((x, y) =>
        sortCompareString(
          x.pipeline,
          y.pipeline,
          pipelineSortDir,
          false,
          () => !!pipelineSortDir
        )
      );

    setJobs(sortedJobs);
    setTableBody(getTableBody(props.appName, sortedJobs, props.limit));
  }, [dateSortDir, envSortDir, pipelineSortDir, props]);

  return jobs?.length > 0 ? (
    <div className="jobs-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSort(getNextSortDirection(dateSortDir))}
            >
              Date/Time
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(dateSortDir)}
              />
            </Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() =>
                setEnvironmentSort(getNextSortDirection(envSortDir, true))
              }
            >
              Environment
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(envSortDir)}
              />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() =>
                setPipelineSort(getNextSortDirection(pipelineSortDir, true))
              }
            >
              Pipeline
              <Icon
                className="job-list-sort-icon"
                data={getSortIcon(pipelineSortDir)}
              />
            </Table.Cell>
            <Table.Cell>Scan results</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{tableBody.map((x) => x)}</Table.Body>
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
};
