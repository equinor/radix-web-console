import { Table, Typography } from '@equinor/eds-core-react';
import type { PipelineRunTaskStep as PipelineRunTaskStepModel } from '../../store/radix-api';
import { PipelineRunStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

interface Props {
  step: PipelineRunTaskStepModel;
}

export function PipelineTaskStepsTableRow({
  step: { name, status, started, ended },
}: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        <Typography>{name}</Typography>
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
        <PipelineRunStatusBadge status={status ?? 'PipelineRunPending'} />
      </Table.Cell>
    </Table.Row>
  );
}
