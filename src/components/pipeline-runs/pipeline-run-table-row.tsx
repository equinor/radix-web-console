import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { PipelineRunStatusBadge } from '../status-badges';
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

export const PipelineRunTableRow: FunctionComponent<
  PipelineRunTableRowProps
> = ({ appName, jobName, pipelineRun }) => (
  <Table.Row>
    <Table.Cell>
      <Typography>
        <Link
          className="pipeline-runs__id-section"
          to={routeWithParams(routes.appPipelineRun, {
            appName,
            jobName,
            pipelineRunName: pipelineRun.realName,
          })}
        >
          {pipelineRun.name}
        </Link>
      </Typography>
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
      <PipelineRunStatusBadge status={pipelineRun.status} />
    </Table.Cell>
  </Table.Row>
);

PipelineRunTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap)
    .isRequired as PropTypes.Validator<PipelineRunModel>,
};
