import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';
import { PipelineRunTask as PipelineRunTaskModel } from '../../store/radix-api';

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
        <Typography
          {...(pipelineRunName?.length > 0 && {
            as: Link,
            to: routeWithParams(routes.appPipelineRunTask, {
              appName,
              jobName,
              pipelineRunName,
              taskName: task.realName,
            }),
            link: true,
            token: { textDecoration: 'none' },
          })}
        >
          {task.name}
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
}

PipelineTaskTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string,
  task: PropTypes.object
    .isRequired as PropTypes.Validator<PipelineRunTaskModel>,
};
