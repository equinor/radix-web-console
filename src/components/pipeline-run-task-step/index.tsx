import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useGetTektonPipelineRunTaskStepQuery } from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import AsyncResource from '../async-resource/async-resource';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

export interface Props {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  stepName: string;
}

export function PipelineRunTaskStep({
  appName,
  jobName,
  pipelineRunName,
  taskName,
  stepName,
}: Props) {
  const [now] = useState(new Date());
  const { data: taskStep, ...stepState } = useGetTektonPipelineRunTaskStepQuery(
    { appName, jobName, pipelineRunName, taskName, stepName },
    {
      skip: !appName || !jobName || !pipelineRunName || !taskName || !stepName,
      pollingInterval: 5000,
    }
  );

  return (
    <AsyncResource asyncState={stepState}>
      <div className="grid grid--gap-large">
        {!taskStep ? (
          <Typography variant="h4">No task step…</Typography>
        ) : (
          <section className="grid grid--gap-medium">
            <Typography variant="h4">Overview</Typography>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <Typography>
                  Step <strong>{taskStep.status?.toLowerCase()}</strong>
                </Typography>
                <Typography>
                  {/*{getStepTaskRunExecutionState(taskStep.status)} step{' '}*/}
                  <strong>{taskStep.name}</strong>
                </Typography>
              </div>
              {taskStep.started && (
                <div className="grid grid--gap-medium">
                  <Typography>
                    Started{' '}
                    <strong>
                      <RelativeToNow time={taskStep.started} />
                    </strong>
                  </Typography>
                  {taskStep.ended ? (
                    <Typography>
                      Task took{' '}
                      <strong>
                        <Duration
                          start={taskStep.started}
                          end={taskStep.ended}
                        />
                      </strong>
                    </Typography>
                  ) : (
                    <Typography>
                      Duration so far is{' '}
                      <strong>
                        <Duration
                          start={taskStep.started}
                          end={taskStep.ended ?? now}
                        />
                      </strong>
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </AsyncResource>
  );
}
export default withRouteParams(PipelineRunTaskStep);
