import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineTaskSummaryModel,
  PipelineTaskSummaryModelValidationMap,
} from '../../models/pipeline-task-summary';

export interface PipelineTaskSummaryTableRowProps {
  appName: string;
  pipelineTask: PipelineTaskSummaryModel;
}

export const PipelineTaskSummaryTableRow = (
  props: PipelineTaskSummaryTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>{props.pipelineTask.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        {props.pipelineTask.started && (
          <>
            <RelativeToNow
              time={props.pipelineTask.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.pipelineTask.ended}
              start={props.pipelineTask.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.pipelineTask.status}>
          {props.pipelineTask.status}
        </StatusBadge>
      </Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );
};

PipelineTaskSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  pipelineTask: PropTypes.shape(PipelineTaskSummaryModelValidationMap)
    .isRequired,
} as PropTypes.ValidationMap<PipelineTaskSummaryTableRowProps>;
