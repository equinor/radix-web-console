import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Link } from 'react-router-dom';

export interface PipelineTaskSummaryTableRowProps {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  task: PipelineRunTaskModel;
}

export const PipelineTaskTableRow = (
  props: PipelineTaskSummaryTableRowProps
): JSX.Element => {
  const taskLink: string = routeWithParams(routes.appPipelineRunTask, {
    appName: props.appName,
    jobName: props.jobName,
    pipelineRunName: props.pipelineRunName,
    taskName: props.task.realName,
  });
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>
          <Link to={taskLink} className="task-summary__id-section">
            {props.task.name}
          </Link>
        </Typography>
      </Table.Cell>
      <Table.Cell>
        {props.task.started && (
          <>
            <RelativeToNow
              time={props.task.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={props.task.ended}
              start={props.task.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={props.task.status}>{props.task.status}</StatusBadge>
      </Table.Cell>
    </Table.Row>
  );
};

PipelineTaskTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string.isRequired,
  task: PropTypes.shape(PipelineRunTaskModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineTaskSummaryTableRowProps>;
