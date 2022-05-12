import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { ProgressStatus } from '../../models/progress-status';
import './style.css';
import { useState } from 'react';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';

const getExecutionState = (status) => {
  switch (status) {
    case ProgressStatus.Queued:
      return 'will execute';
    case ProgressStatus.Running:
      return 'executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Succeeded:
    case ProgressStatus.Stopped:
      return 'executed';
    default:
      return '';
  }
};

export interface PipelineRunProps {
  appName: string;
  jobName: string;
  pipelineRun?: PipelineRunModel;
}

export const PipelineRun = (props: PipelineRunProps): JSX.Element => {
  const { appName, jobName, pipelineRun } = props;
  const [now, setNow] = useState(new Date());
  return (
    <>
      <main className="grid grid--gap-large">
        <>
          {!pipelineRun ? (
            <Typography variant="h4">No pipeline run…</Typography>
          ) : (
            <>
              <section className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <div className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Pipeline Run {pipelineRun.status.toLowerCase()};{' '}
                      {getExecutionState(pipelineRun.status)} pipeline{' '}
                      <strong>{pipelineRun.pipeline}</strong>
                    </Typography>
                  </div>
                  {pipelineRun.started && (
                    <div className="grid grid--gap-medium">
                      <Typography>
                        Pipeline run started{' '}
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
                              end={pipelineRun.ended | now}
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

PipelineRun.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRun: PropTypes.shape(PipelineRunModelValidationMap),
};

export default PipelineRun;
