import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import type { PipelineRunTask as PipelineRunTaskModel } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';

interface Props {
  appName: string;
  jobName: string;
  pipelineRunName?: string;
  task: PipelineRunTaskModel;
}

export function PipelineTaskTableRow({
  appName,
  jobName,
  pipelineRunName,
  task,
}: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        {pipelineRunName && pipelineRunName.length > 0 && (
          <Typography
            link
            as={Link}
            token={{ textDecoration: 'none' }}
            to={routeWithParams(routes.appPipelineRunTask, {
              appName,
              jobName,
              pipelineRunName,
              taskName: task.realName,
            })}
          >
            {task.name}
          </Typography>
        )}
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
        <PipelineRunStatusBadge status={task.status ?? 'PipelineRunPending'} />
      </Table.Cell>
    </Table.Row>
  );
}

PipelineTaskTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string,
  task: PropTypes.object
    .isRequired as PropTypes.Validator<PipelineRunTaskModel>,
};
