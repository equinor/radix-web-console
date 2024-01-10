import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskStepsTableRow } from './pipeline-task-table-row';
import { PipelineRunTaskStep as PipelineRunTaskStepModel } from '../../store/radix-api';
import {
  dataSorter,
  sortCompareDate,
  sortDirection,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

import './style.css';

interface Props {
  steps: Array<PipelineRunTaskStepModel>;
  limit?: number;
}

export function PipelineRunTaskSteps({ steps, limit }: Props) {
  const [sortedData, setSortedData] = useState(steps || []);

  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  useEffect(() => {
    setSortedData(
      dataSorter(steps?.slice(0, limit || steps.length), [
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
}

PipelineRunTaskSteps.propTypes = {
  steps: PropTypes.object.isRequired,
  limit: PropTypes.number,
};
