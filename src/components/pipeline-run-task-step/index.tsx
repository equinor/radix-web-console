import { Typography } from '@equinor/eds-core-react';
import { routes } from '../../routes';
import { useGetTektonPipelineRunTaskStepQuery } from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { routeWithParams, smallJobName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRunTaskStepLog } from '../pipeline-run-task-step-log';
import { Duration } from '../time/duration';
import { DurationToNow } from '../time/duration-to-now';
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
  const { data: taskStep, ...stepState } = useGetTektonPipelineRunTaskStepQuery(
    { appName, jobName, pipelineRunName, taskName, stepName },
    {
      skip: !appName || !jobName || !pipelineRunName || !taskName || !stepName,
      pollingInterval: 5000,
    }
  );

  return (
    <>
      <DocumentTitle title={stepName} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Pipeline Jobs',
            to: routeWithParams(routes.appJobs, { appName }),
          },
          {
            label: smallJobName(jobName),
            to: routeWithParams(routes.appJob, { appName, jobName }),
          },
        ]}
      />

      {!taskStep?.subPipelineTaskStep ? (
        <Typography>No step…</Typography>
      ) : (
        <>
          <section className="grid grid--gap-medium">
            <Typography variant="h4">Overview</Typography>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <Typography>
                  Pipeline{' '}
                  <strong>
                    {taskStep.subPipelineTaskStep.pipelineName}
                  </strong>{' '}
                </Typography>
                <Typography>
                  Environment{' '}
                  <strong>
                    {taskStep.subPipelineTaskStep.environment}
                  </strong>{' '}
                </Typography>
                <Typography>
                  Pipeline Task{' '}
                  <strong>{taskStep.subPipelineTaskStep.taskName}</strong>{' '}
                </Typography>
                <Typography>
                  Pipeline Step{' '}
                  <strong>{taskStep.subPipelineTaskStep.name}</strong>{' '}
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
                        <DurationToNow start={taskStep.started} />
                      </strong>
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </section>
          <section>
            <AsyncResource asyncState={stepState}>
              <PipelineRunTaskStepLog
                appName={appName}
                jobName={jobName}
                pipelineRunName={taskStep.subPipelineTaskStep.pipelineRunName}
                taskName={taskStep.subPipelineTaskStep.kubeName}
                stepName={taskStep.subPipelineTaskStep.name}
                title={'Log'}
              />
            </AsyncResource>
          </section>
        </>
      )}
    </>
  );
}
export default withRouteParams(PipelineRunTaskStep);
