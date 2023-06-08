import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';

import { getExecutionState } from '../component/execution-state';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task';

export interface PipelineRunTaskProps {
  task?: PipelineRunTaskModel;
}

export const PipelineRunTask = ({
  task,
}: PipelineRunTaskProps): JSX.Element => {
  const [now] = useState(new Date());
  return (
    <main className="grid grid--gap-large">
      {!task ? (
        <Typography variant="h4">No task…</Typography>
      ) : (
        <section className="grid grid--gap-medium">
          <Typography variant="h4">Overview</Typography>
          <div className="grid grid--gap-medium grid--overview-columns">
            <div className="grid grid--gap-medium">
              <Typography>
                Task <strong>{task.status.toLowerCase()}</strong>
              </Typography>
              <Typography>
                {getExecutionState(task.status)} task{' '}
                <strong>{task.name}</strong>
              </Typography>
            </div>
            {task.started && (
              <div className="grid grid--gap-medium">
                <Typography>
                  Started{' '}
                  <strong>
                    <RelativeToNow time={task.started} />
                  </strong>
                </Typography>
                {task.ended ? (
                  <Typography>
                    Task took{' '}
                    <strong>
                      <Duration start={task.started} end={task.ended} />
                    </strong>
                  </Typography>
                ) : (
                  <Typography>
                    Duration so far is{' '}
                    <strong>
                      <Duration start={task.started} end={task.ended ?? now} />
                    </strong>
                  </Typography>
                )}
              </div>
            )}
          </div>
          {task.statusMessage?.length > 0 && (
            <div className="grid grid--gap-medium grid--overview-columns">
              <Typography>Status message {task.statusMessage}</Typography>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

PipelineRunTask.propTypes = {
  task: PropTypes.shape(PipelineRunTaskModelValidationMap),
} as PropTypes.ValidationMap<PipelineRunTaskProps>;
