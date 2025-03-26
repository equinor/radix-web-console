import { Table, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import type {
  PipelineRun as PipelineRunModel,
  PipelineRunTask as PipelineRunTaskModel,
} from '../../store/radix-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';
import { PipelineTaskTableRow } from './pipeline-task-table-row';
import './style.css';

interface Props {
  appName: string;
  jobName: string;
  pipelineRun?: PipelineRunModel;
  tasks?: Array<PipelineRunTaskModel>;
  limit?: number;
}
export function PipelineRunTasks({
  appName,
  jobName,
  tasks,
  limit,
  pipelineRun,
}: Props) {
  const [sortedData, setSortedData] = useState(tasks || []);

  const [dateSort, setDateSort] = useState<SortDirection>('descending');
  useEffect(() => {
    setSortedData(
      dataSorter(tasks?.slice(0, limit || tasks?.length), [
        (x, y) => sortCompareDate(x.started, y.started, dateSort),
      ])
    );
  }, [dateSort, limit, tasks]);

  return sortedData.length > 0 ? (
    <div className="pipeline-run-tasks__list grid grid--table-overflow">
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
          {sortedData.map((x, i) => (
            <PipelineTaskTableRow
              key={i}
              pipelineRunName={pipelineRun?.kubeName}
              {...{ appName, jobName, task: x }}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <Typography variant="h4">No pipeline tasks</Typography>
  );
}
