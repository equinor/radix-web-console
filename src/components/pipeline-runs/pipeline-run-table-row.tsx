import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

export interface PipelineRunTableRowProps {
  appName: string;
  jobName: string;
  pipelineRun: PipelineRunModel;
}

export const PipelineRunTableRow = ({
  appName,
  jobName,
  pipelineRun,
}: PipelineRunTableRowProps): JSX.Element => {
  const pipelineRunLink = routeWithParams(routes.appPipelineRun, {
    appName: appName,
    jobName: jobName,
    pipelineRunName: pipelineRun.realName,
  });

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={pipelineRunLink} className="pipeline-run-summary__id-section">
          {pipelineRun.name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Typography>{pipelineRun.env}</Typography>
      </Table.Cell>
      <Table.Cell>
        {pipelineRun.started && (
          <>
            <RelativeToNow
              time={pipelineRun.started}
              titlePrefix="Start time"
              capitalize
            />
            <br />
            <Duration
              end={pipelineRun.ended}
              start={pipelineRun.started}
              title="Duration"
            />
          </>
        )}
      </Table.Cell>
      <Table.Cell variant="icon">
        <StatusBadge type={pipelineRun.status}>
          {pipelineRun.status}
        </StatusBadge>
      </Table.Cell>
    </Table.Row>
  );
};

PipelineRunTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineRunTableRowProps>;
