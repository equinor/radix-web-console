import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { StatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import { Link } from 'react-router-dom';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

export interface PipelineRunTableRowProps {
  appName: string;
  jobName: string;
  pipelineRun: PipelineRunModel;
}

export const PipelineRunTableRow = (
  props: PipelineRunTableRowProps
): JSX.Element => {
  const pipelineRunLink: string = routeWithParams(routes.appPipelineRun, {
    appName: props.appName,
    jobName: props.jobName,
    pipelineRunName: props.pipelineRun.realName,
  });
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={pipelineRunLink} className="pipeline-run-summary__id-section">
          {props.pipelineRun.name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Typography>{props.pipelineRun.env}</Typography>
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
    </Table.Row>
  );
};

PipelineRunTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap).isRequired,
} as PropTypes.ValidationMap<PipelineRunTableRowProps>;
