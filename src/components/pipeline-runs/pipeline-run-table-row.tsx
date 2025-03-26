import { Table, Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { PipelineRun as PipelineRunModel } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import './style.css';

interface Props {
  appName: string;
  jobName: string;
  pipelineRun: PipelineRunModel;
}

export function PipelineRunTableRow({ appName, jobName, pipelineRun }: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography
          className="pipeline-runs__id-section"
          as={Link}
          to={routeWithParams(routes.appPipelineRun, {
            appName,
            jobName,
            pipelineRunName: pipelineRun.kubeName,
          })}
          link
          token={{ textDecoration: 'none' }}
        >
          {pipelineRun.name}
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
        <PipelineRunStatusBadge
          status={pipelineRun.status ?? 'PipelineRunPending'}
        />
      </Table.Cell>
    </Table.Row>
  );
}
