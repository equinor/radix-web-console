import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/pipeline-run-task-step';

export interface PipelineTaskStepsSummaryTableRowProps {
  step: PipelineRunTaskStepModel;
}

export const PipelineTaskStepsTableRow = (
  props: PipelineTaskStepsSummaryTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>{props.step.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        {props.step.started && (
          <>
            <RelativeToNow
              time={props.step.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.step.ended}
              start={props.step.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.step.status}>{props.step.status}</StatusBadge>
      </Table.Cell>
    </Table.Row>
  );
};

PipelineTaskStepsTableRow.propTypes = {
  step: PropTypes.shape(PipelineRunTaskStepModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineTaskStepsSummaryTableRowProps>;
