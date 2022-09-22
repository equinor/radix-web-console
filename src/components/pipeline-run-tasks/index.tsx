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

import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';

import './style.css';

export interface PipelineRunTaskListProps {
  appName: string;
  jobName: string;
  pipelineRun?: PipelineRunModel;
  tasks: Array<PipelineRunTaskModel>;
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
  const [rows, setRows] = useState<Array<JSX.Element>>([]);
  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');

  useEffect(() => {
    const sortedTasks =
      props.tasks?.slice(0, props.limit ?? props.tasks.length) || [];
    sortedTasks.sort((x, y) =>
      sortCompareDate(x.started, y.started, dateSortDir)
    );

    const tableRows = sortedTasks.map((pipelineTask) => (
      <PipelineTaskTableRow
        key={pipelineTask.name}
        appName={props.appName}
        jobName={props.jobName}
        pipelineRunName={props.pipelineRun.realName}
        task={pipelineTask}
      />
    ));
    setRows(tableRows);
  }, [dateSortDir, props]);

  return rows?.length > 0 ? (
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
        <Table.Body>{rows.map((tableRow) => tableRow)}</Table.Body>
      </Table>
    </div>
  ) : (
    <Typography variant="h4">No pipeline tasks</Typography>
  );
};

PipelineRunTasks.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap),
  tasks: PropTypes.arrayOf(PropTypes.shape(PipelineRunTaskModelValidationMap))
    .isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunTaskListProps>;
