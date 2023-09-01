import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

export interface PipelineTaskSummaryTableRowProps {
  appName: string;
  jobName: string;
  pipelineRunName?: string;
  task: PipelineRunTaskModel;
}

export const PipelineTaskTableRow: FunctionComponent<
  PipelineTaskSummaryTableRowProps
> = ({ appName, jobName, pipelineRunName, task }) => (
  <Table.Row>
    <Table.Cell>
      <Typography>
        {pipelineRunName?.length > 0 ? (
          <Link
            className="pipeline-run-tasks__id-section"
            to={routeWithParams(routes.appPipelineRunTask, {
              appName,
              jobName,
              pipelineRunName,
              taskName: task.realName,
            })}
          >
            {task.name}
          </Link>
        ) : (
          task.name
        )}
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
      <PipelineRunStatusBadge status={task.status} />
    </Table.Cell>
  </Table.Row>
);

PipelineTaskTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string,
  task: PropTypes.shape(PipelineRunTaskModelValidationMap)
    .isRequired as PropTypes.Validator<PipelineRunTaskModel>,
};
