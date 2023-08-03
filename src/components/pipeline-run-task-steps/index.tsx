import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskStepsTableRow } from './pipeline-task-table-row';

import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task-step';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

import './style.css';

export interface PipelineRunTaskStepsListProps {
  steps: Array<PipelineRunTaskStepModel>;
  limit?: number;
}

export const PipelineRunTaskSteps = ({
  steps,
  limit,
}: PipelineRunTaskStepsListProps): React.JSX.Element => {
  const [sortedData, setSortedData] = useState(steps || []);

  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  useEffect(() => {
    setSortedData(
      tableDataSorter(steps?.slice(0, limit || steps.length), [
        (x, y) => sortCompareDate(x.started, y.started, dateSort),
      ])
    );
  }, [dateSort, limit, steps]);

  return sortedData.length > 0 ? (
    <div className="pipeline-run-task-steps__list grid grid--table-overflow">
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
          {sortedData.map((step, i) => (
            <PipelineTaskStepsTableRow key={i} step={step} />
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <Typography variant="h4">No pipeline tasks</Typography>
  );
};

PipelineRunTaskSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape(PipelineRunTaskStepModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunTaskStepsListProps>;
