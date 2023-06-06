import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskTableRow } from './pipeline-task-table-row';

import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

import './style.css';

export interface PipelineRunTaskListProps {
  appName: string;
  jobName: string;
  pipelineRun?: PipelineRunModel;
  tasks: Array<PipelineRunTaskModel>;
  limit?: number;
}

export const PipelineRunTasks = ({
  appName,
  jobName,
  tasks,
  limit,
  pipelineRun,
}: PipelineRunTaskListProps): JSX.Element => {
  const [sortedData, setSortedData] = useState(tasks || []);

  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  useEffect(() => {
    setSortedData(
      tableDataSorter(tasks?.slice(0, limit || tasks.length), [
        (x, y) => sortCompareDate(x.started, y.started, dateSort),
      ])
    );
  }, [dateSort, limit, tasks]);

  return sortedData.length > 0 ? (
    <div className="tasks-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSort(getNewSortDir(dateSort))}
            >
              Date/Time
              <TableSortIcon direction={dateSort} />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((x) => (
            <PipelineTaskTableRow
              key={x.name}
              appName={appName}
              jobName={jobName}
              pipelineRunName={pipelineRun.realName}
              task={x}
            />
          ))}
        </Table.Body>
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
