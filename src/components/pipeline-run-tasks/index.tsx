import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskTableRow } from './pipeline-task-table-row';
import { PipelineRunTaskModelValidationMap } from '../../models/pipeline-run-task';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';

import './style.css';
import { PipelineRunTaskModel } from '../../models/pipeline-run-task';

export interface PipelineRunTaskListProps {
  appName: string;
  pipelineRunTasks: Array<PipelineRunTaskModel>;
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

export const PipelineRunTasks = (props: PipelineRunTaskListProps): JSX.Element => {
  const [jobsTableRows, setJobsTableRows] = useState<JSX.Element[]>([]);
  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');

  useEffect(() => {
    const sortedJobs =
      props?.pipelineRunTasks?.slice(
        0,
        props.limit ? props.limit : props.pipelineRunTasks.length
      ) || [];
    sortedJobs.sort((x, y) =>
      sortCompareDate(x.started, y.started, dateSortDir)
    );

    const tableRows = sortedJobs.map((pipelineTask) => (
      <PipelineTaskTableRow
        key={pipelineTask.name}
        appName={props.appName}
        pipelineRunTask={pipelineTask}
      />
    ));
    setJobsTableRows(tableRows);
  }, [dateSortDir, props]);

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

PipelineRunTasks.propTypes = {
  appName: PropTypes.string.isRequired,
  pipelineRunTasks: PropTypes.arrayOf(
    PropTypes.shape(PipelineRunTaskModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunTaskListProps>;
