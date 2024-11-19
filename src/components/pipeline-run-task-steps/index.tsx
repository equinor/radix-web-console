import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import type { PipelineRunTaskStep as PipelineRunTaskStepModel } from '../../store/radix-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';
import { PipelineTaskStepsTableRow } from './pipeline-task-table-row';

import './style.css';

interface Props {
  steps: Array<PipelineRunTaskStepModel>;
  limit?: number;
}

export function PipelineRunTaskSteps({ steps, limit }: Props) {
  const [dateSort, setDateSort] = useState<SortDirection>('descending');
  const sortedData = useMemo(() => {
    return dataSorter(steps?.slice(0, limit || steps.length), [
      (x, y) => sortCompareDate(x.started, y.started, dateSort),
    ]);
  }, [dateSort, steps, limit]);

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
}

PipelineRunTaskSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
