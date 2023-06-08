import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

export interface PipelineRunTableRowProps {
  appName: string;
  jobName: string;
  pipelineRun: PipelineRunModel;
}

export const PipelineRunTableRow = ({
  appName,
  jobName,
  pipelineRun: { name, realName, env, status, started, ended },
}: PipelineRunTableRowProps): JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <Typography>
        <Link
          className="pipeline-runs__id-section"
          to={routeWithParams(routes.appPipelineRun, {
            appName,
            jobName,
            pipelineRunName: realName,
          })}
        >
          {name}
        </Link>
      </Typography>
    </Table.Cell>
    <Table.Cell>
      <Typography>{env}</Typography>
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

PipelineRunTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineRunTableRowProps>;
