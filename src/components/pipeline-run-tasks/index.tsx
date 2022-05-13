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

export const PipelineRunTasks = (
  props: PipelineRunTaskListProps
): JSX.Element => {
  const [tasksTableRows, setTasksTableRows] = useState<JSX.Element[]>([]);
  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');

  useEffect(() => {
    const sortedTasks =
      props?.pipelineRunTasks?.slice(
        0,
        props.limit ? props.limit : props.pipelineRunTasks.length
      ) || [];
    sortedTasks.sort((x, y) =>
      sortCompareDate(x.started, y.started, dateSortDir)
    );

    const tableRows = sortedTasks.map((pipelineTask) => (
      <PipelineTaskTableRow
        key={pipelineTask.name}
        pipelineRunTask={pipelineTask}
      />
    ));
    setTasksTableRows(tableRows);
  }, [dateSortDir, props]);

  return tasksTableRows?.length > 0 ? (
    <div className="tasks-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSortDir(getNewSortDir(dateSortDir))}
            >
              Date/Time
              <Icon
                className="pipeline-run-list-sort-icon"
                data={getSortIcon(dateSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{tasksTableRows.map((tableRow) => tableRow)}</Table.Body>
      </Table>
    </div>
  ) : (
    <>
      <Typography variant="h4">No pipeline tasks</Typography>
    </>
  );
};

PipelineRunTasks.propTypes = {
  pipelineRunTasks: PropTypes.arrayOf(
    PropTypes.shape(PipelineRunTaskModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunTaskListProps>;
