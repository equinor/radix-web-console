import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface PipelineTaskSummaryTableRowProps {
  appName: string;
  jobName: string;
  pipelineRunName?: string;
  task: PipelineRunTaskModel;
}

export const PipelineTaskTableRow = ({
  appName,
  jobName,
  pipelineRunName,
  task: { name, realName, status, started, ended },
}: PipelineTaskSummaryTableRowProps): JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <Typography>
        {pipelineRunName?.length > 0 ? (
          <Link
            className="task-summary__id-section"
            to={routeWithParams(routes.appPipelineRunTask, {
              appName,
              jobName,
              pipelineRunName,
              taskName: realName,
            })}
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </Typography>
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
      <StatusBadge type={status}>{status}</StatusBadge>
    </Table.Cell>
  </Table.Row>
);

PipelineTaskTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string,
  task: PropTypes.shape(PipelineRunTaskModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineTaskSummaryTableRowProps>;
