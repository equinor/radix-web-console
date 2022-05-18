import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ProgressStatus } from '../../models/progress-status';
import './style.css';
import { useState } from 'react';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';

const getExecutionState = (status) => {
  switch (status) {
    case ProgressStatus.Queued:
      return 'will execute';
    case ProgressStatus.Running:
      return 'Executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Succeeded:
    case ProgressStatus.Stopped:
      return 'Executed';
    default:
      return '';
  }
};

export interface PipelineRunTaskProps {
  task?: PipelineRunTaskModel;
}

export const PipelineRunTask = (props: PipelineRunTaskProps): JSX.Element => {
  const { task } = props;
  const [now, setNow] = useState(new Date());
  return (
    <>
      <main className="grid grid--gap-large">
        <>
          {!task ? (
            <Typography variant="h4">No task…</Typography>
          ) : (
            <>
              <section className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <div className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Task <strong>{task.status.toLowerCase()};</strong>
                    </Typography>
                    <Typography>
                      {getExecutionState(task.status)} task{' '}
                      <strong>{task.name}</strong>
                    </Typography>
                  </div>
                  {task.started && (
                    <div className="grid grid--gap-medium">
                      <Typography>
                        Task started{' '}
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
                            <Duration
                              start={task.started}
                              end={task.ended ?? now}
                            />
                          </strong>
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </>
      </main>
    </>
  );
};

PipelineRunTask.propTypes = {
  task: PropTypes.shape(PipelineRunTaskModelValidationMap),
};

export default PipelineRunTask;
