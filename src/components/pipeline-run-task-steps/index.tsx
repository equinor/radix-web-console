import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineTaskStepsTableRow } from './pipeline-task-table-row';
import { sortCompareDate, sortDirection } from '../../utils/sort-utils';

import './style.css';
import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/pipeline-run-task-step';

export interface PipelineRunTaskStepsListProps {
  steps: Array<PipelineRunTaskStepModel>;
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

export const PipelineRunTaskSteps = (
  props: PipelineRunTaskStepsListProps
): JSX.Element => {
  const [tasksTableRows, setTaskStepsTableRows] = useState<JSX.Element[]>([]);
  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');

  useEffect(() => {
    const sortedSteps =
      props?.steps?.slice(0, props.limit ? props.limit : props.steps.length) ||
      [];
    sortedSteps.sort((x, y) =>
      sortCompareDate(x.started, y.started, dateSortDir)
    );

    const tableRows = sortedSteps.map((step) => (
      <PipelineTaskStepsTableRow key={step.name} step={step} />
    ));
    setTaskStepsTableRows(tableRows);
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
                className="step-list-sort-icon"
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

PipelineRunTaskSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape(PipelineRunTaskStepModelValidationMap)
  ),
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunTaskStepsListProps>;
