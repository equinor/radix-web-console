import * as PropTypes from 'prop-types';

import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  useGetTektonPipelineRunTaskQuery,
  useGetTektonPipelineRunTaskStepsQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { routeWithParams, smallJobName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { PipelineRunTask } from '../pipeline-run-task';
import { PipelineRunTaskStepLog } from '../pipeline-run-task-step-log';
import { PipelineRunTaskSteps } from '../pipeline-run-task-steps';

interface Props {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
}

export function PagePipelineRunTask({
  appName,
  jobName,
  pipelineRunName,
  taskName,
}: Props) {
  const { data: task, ...taskState } = useGetTektonPipelineRunTaskQuery(
    {
      pipelineRunName,
      taskName,
      jobName,
      appName,
    },
    { pollingInterval }
  );
  const { data: steps, ...stepsState } = useGetTektonPipelineRunTaskStepsQuery(
    {
      pipelineRunName,
      taskName,
      jobName,
      appName,
    },
    { pollingInterval }
  );

  return (
    <>
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
          {
            label: 'Run sub-pipeline',
            to: routeWithParams(routes.appJobStep, {
              appName,
              jobName,
              stepName: 'run-pipelines',
            }),
          },
          {
            label: task ? `${task.pipelineRunEnv}:${task.pipelineName}` : '',
            to: routeWithParams(routes.appPipelineRun, {
              appName,
              jobName,
              pipelineRunName,
            }),
          },
          { label: task?.name ?? ' ' },
        ]}
      />

      <AsyncResource asyncState={taskState}>
        {task && <PipelineRunTask task={task} />}
      </AsyncResource>

      <AsyncResource asyncState={stepsState}>
        {steps && (
          <>
            <PipelineRunTaskSteps steps={steps} />
            {steps.map(({ name }, _, { length }) => (
              <PipelineRunTaskStepLog
                key={name}
                appName={appName}
                jobName={jobName}
                pipelineRunName={pipelineRunName}
                taskName={taskName}
                stepName={name}
                title={length > 1 ? `Log for step: ${name}` : 'Log'}
              />
            ))}
          </>
        )}
      </AsyncResource>
    </>
  );
}
PagePipelineRunTask.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
};
export default withRouteParams(PagePipelineRunTask);
