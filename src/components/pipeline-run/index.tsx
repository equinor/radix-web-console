import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useState } from 'react';

import { getRunExecutionState } from '../component/execution-state';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run';

export interface PipelineRunProps {
  pipelineRun?: PipelineRunModel;
}

export const PipelineRun: FunctionComponent<PipelineRunProps> = ({
  pipelineRun,
}) => {
  const [now] = useState(new Date());

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
                Pipeline run <strong>{pipelineRun.status.toLowerCase()}</strong>
              </Typography>
              <Typography>
                {getRunExecutionState(pipelineRun.status)} pipeline{' '}
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
                      <Duration
                        start={pipelineRun.started}
                        end={pipelineRun.ended ?? now}
                      />
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
};

PipelineRun.propTypes = {
  pipelineRun: PropTypes.shape(
    PipelineRunModelValidationMap
  ) as PropTypes.Validator<PipelineRunModel>,
};
