import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task-step';

export interface PipelineTaskStepsSummaryTableRowProps {
  step: PipelineRunTaskStepModel;
}

export const PipelineTaskStepsTableRow = ({
  step: { name, status, started, ended },
}: PipelineTaskStepsSummaryTableRowProps): React.JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <Typography>{name}</Typography>
    </Table.Cell>
    <Table.Cell>
      {started && (
        <>
          <RelativeToNow time={started} titlePrefix="Start time" capitalize />
          <br />
          <Duration end={ended} start={started} title="Duration" />
        </>
      )}
    </Table.Cell>
    <Table.Cell variant="icon">
      <PipelineRunStatusBadge status={status} />
    </Table.Cell>
  </Table.Row>
);

PipelineTaskStepsTableRow.propTypes = {
  step: PropTypes.shape(PipelineRunTaskStepModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineTaskStepsSummaryTableRowProps>;
