import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import type { PipelineRun as PipelineRunModel } from '../../store/radix-api';
import { getPipelineRunExecutionState } from '../component/execution-state';
import { Duration } from '../time/duration';
import { DurationToNow } from '../time/duration-to-now';
import { RelativeToNow } from '../time/relative-to-now';

interface Props {
  pipelineRun: PipelineRunModel;
}
export function PipelineRun({ pipelineRun }: Props) {
  return (
    <main className="grid grid--gap-large">
      {!pipelineRun ? (
        <Typography variant="h4">No pipeline run…</Typography>
      ) : (
        <section className="grid grid--gap-medium">
          <Typography variant="h4">Overview</Typography>
          <div className="grid grid--gap-medium grid--overview-columns">
            <div className="grid grid--gap-medium">
              <Typography>
                Pipeline run{' '}
                <strong>
                  {pipelineRun.status?.toLowerCase() ?? 'pending'}
                </strong>
              </Typography>
              <Typography>
                {getPipelineRunExecutionState(pipelineRun.status)} pipeline{' '}
                <strong>{pipelineRun.name}</strong>
              </Typography>
              <Typography>
                Environment <strong>{pipelineRun.env}</strong>
              </Typography>
            </div>
            {pipelineRun.started && (
              <div className="grid grid--gap-medium">
                <Typography>
                  Started{' '}
                  <strong>
                    <RelativeToNow time={pipelineRun.started} />
                  </strong>
                </Typography>
                {pipelineRun.ended ? (
                  <Typography>
                    Pipeline run took{' '}
                    <strong>
                      <Duration
                        start={pipelineRun.started}
                        end={pipelineRun.ended}
                      />
                    </strong>
                  </Typography>
                ) : (
                  <Typography>
                    Duration so far is{' '}
                    <strong>
                      <DurationToNow start={pipelineRun.started} />
                    </strong>
                  </Typography>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

PipelineRun.propTypes = {
  pipelineRun: PropTypes.object.isRequired,
};
