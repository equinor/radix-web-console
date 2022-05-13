import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';

export interface PipelineTaskSummaryTableRowProps {
  pipelineRunTask: PipelineRunTaskModel;
}

export const PipelineTaskTableRow = (
  props: PipelineTaskSummaryTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>{props.pipelineRunTask.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        {props.pipelineRunTask.started && (
          <>
            <RelativeToNow
              time={props.pipelineRunTask.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.pipelineRunTask.ended}
              start={props.pipelineRunTask.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.pipelineRunTask.status}>
          {props.pipelineRunTask.status}
        </StatusBadge>
      </Table.Cell>
    </Table.Row>
  );
};

PipelineTaskTableRow.propTypes = {
  pipelineRunTask: PropTypes.shape(PipelineRunTaskModelValidationMap)
    .isRequired,
} as PropTypes.ValidationMap<PipelineTaskSummaryTableRowProps>;
