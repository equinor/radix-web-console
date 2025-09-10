import { Typography } from '@equinor/eds-core-react'
import type { Step } from '../../store/radix-api'
import { Duration } from '../time/duration'
import { DurationToNow } from '../time/duration-to-now'
import { RelativeToNow } from '../time/relative-to-now'

type Props = {
  taskStep?: Step
}

export function PipelineRunTaskStepOverview({ taskStep }: Props) {
  return (
    <>
      {taskStep?.subPipelineTaskStep && (
        <>
          <Typography variant="h4">Overview</Typography>
          <div className="grid grid--gap-medium grid--overview-columns">
            <div className="grid grid--gap-medium">
              <Typography>
                Pipeline <strong>{taskStep.subPipelineTaskStep.pipelineName}</strong>{' '}
              </Typography>
              <Typography>
                Environment <strong>{taskStep.subPipelineTaskStep.environment}</strong>{' '}
              </Typography>
              <Typography>
                Pipeline Task <strong>{taskStep.subPipelineTaskStep.taskName}</strong>{' '}
              </Typography>
              <Typography>
                Pipeline Step <strong>{taskStep.subPipelineTaskStep.name}</strong>{' '}
              </Typography>
              <Typography>
                Status: <strong>{taskStep.status}</strong>
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
                    Step took{' '}
                    <strong>
                      <Duration start={taskStep.started} end={taskStep.ended} />
                    </strong>
                  </Typography>
                ) : (
                  <Typography>
                    Duration so far is{' '}
                    <strong>
                      <DurationToNow start={taskStep.started} />
                    </strong>
                  </Typography>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
