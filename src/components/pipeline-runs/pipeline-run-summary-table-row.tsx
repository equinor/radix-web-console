import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunSummaryModel,
  PipelineRunSummaryModelValidationMap,
} from '../../models/pipeline-run-summary';
import { PipelineTasks } from '../pipeline-tasks';
export interface PipelineRunSummaryTableRowProps {
  appName: string;
  pipelineRun: PipelineRunSummaryModel;
}

export const PipelineRunSummaryTableRow = (
  props: PipelineRunSummaryTableRowProps
): JSX.Element => {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>{props.pipelineRun.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        {props.pipelineRun.started && (
          <>
            <RelativeToNow
              time={props.pipelineRun.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.pipelineRun.ended}
              start={props.pipelineRun.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.pipelineRun.status}>
          {props.pipelineRun.status}
        </StatusBadge>
      </Table.Cell>
      <Table.Cell>
        {props.pipelineRun.tasks && (
          <PipelineTasks
            appName={props.appName}
            pipelineTasks={props.pipelineRun.tasks}
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

PipelineRunSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunSummaryModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineRunSummaryTableRowProps>;
