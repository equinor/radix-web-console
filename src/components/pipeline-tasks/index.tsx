import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskSummaryTableRow } from './pipeline-task-summary-table-row';
import { PipelineTaskSummaryModelValidationMap } from '../../models/pipeline-task-summary';
import {
  sortCompareDate,
  // sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';

import './style.css';
import { PipelineTaskSummaryModel } from '../../models/pipeline-task-summary';

export interface PipelineTaskListProps {
  appName: string;
  pipelineTasks: Array<PipelineTaskSummaryModel>;
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

export const PipelineTasks = (props: PipelineTaskListProps): JSX.Element => {
  const [jobsTableRows, setJobsTableRows] = useState<JSX.Element[]>([]);

  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');
  // const [envSortDir, setEnvSortDir] = useState<sortDirection>();
  // const [pipelineSortDir, setPipelineSortDir] = useState<sortDirection>();

  useEffect(() => {
    const sortedJobs =
      props?.pipelineTasks?.slice(
        0,
        props.limit ? props.limit : props.pipelineTasks.length
      ) || [];
    sortedJobs.sort((x, y) =>
      sortCompareDate(x.started, y.started, dateSortDir)
    );
    /*      .sort((x, y) =>
        sortCompareString(
          x.environments?.length > 0 ? x.environments[0] : null,
          y.environments?.length > 0 ? y.environments[0] : null,
          envSortDir,
          false,
          () => !!envSortDir
        )
      )*/

    const tableRows = sortedJobs.map((pipelineTask) => (
      <PipelineTaskSummaryTableRow
        key={pipelineTask.name}
        appName={props.appName}
        pipelineTask={pipelineTask}
      />
    ));
    setJobsTableRows(tableRows);
  }, [dateSortDir, /*envSortDir, */ props]);

  return jobsTableRows?.length > 0 ? (
    <div className="jobs-list grid grid--table-overflow">
      <Table>
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

PipelineTasks.propTypes = {
  appName: PropTypes.string.isRequired,
  pipelineTasks: PropTypes.arrayOf(
    PropTypes.shape(PipelineTaskSummaryModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineTaskListProps>;
