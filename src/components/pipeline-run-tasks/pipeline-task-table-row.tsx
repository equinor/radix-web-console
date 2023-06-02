import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface PipelineTaskSummaryTableRowProps {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  task: PipelineRunTaskModel;
}

export const PipelineTaskTableRow = ({
  appName,
  jobName,
  pipelineRunName,
  task,
}: PipelineTaskSummaryTableRowProps): JSX.Element => {
  const taskLink = routeWithParams(routes.appPipelineRunTask, {
    appName: appName,
    jobName: jobName,
    pipelineRunName: pipelineRunName,
    taskName: task.realName,
  });

  return (
    <Table.Row>
      <Table.Cell>
        <Typography>
          <Link to={taskLink} className="task-summary__id-section">
            {task.name}
          </Link>
        </Typography>
      </Table.Cell>
      <Table.Cell>
        {task.started && (
          <>
            <RelativeToNow
              time={task.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration end={task.ended} start={task.started} title="Duration" />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={task.status}>{task.status}</StatusBadge>
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
