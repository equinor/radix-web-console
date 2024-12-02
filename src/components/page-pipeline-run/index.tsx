import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  useGetTektonPipelineRunQuery,
  useGetTektonPipelineRunTasksQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { routeWithParams, smallJobName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRun } from '../pipeline-run';
import { PipelineRunTasks } from '../pipeline-run-tasks';

interface Props {
  appName: string;
  jobName: string;
  pipelineRunName: string;
}

export function PagePipelineRun({ appName, jobName, pipelineRunName }: Props) {
  const { data: pipelineRun, ...state } = useGetTektonPipelineRunQuery(
    {
      pipelineRunName,
      jobName,
      appName,
    },
    { pollingInterval }
  );
  const { data: tasks, ...taskState } = useGetTektonPipelineRunTasksQuery(
    {
      pipelineRunName,
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
            label: pipelineRun ? `${pipelineRun.env}:${pipelineRun.name}` : '',
          },
        ]}
      />
      <DocumentTitle title={`Pipeline Run ${pipelineRunName}`} />
      <AsyncResource asyncState={state}>
        {pipelineRun && <PipelineRun pipelineRun={pipelineRun} />}
      </AsyncResource>
      <AsyncResource asyncState={taskState}>
        {tasks && pipelineRun && (
          <PipelineRunTasks
            appName={appName}
            jobName={jobName}
            pipelineRun={pipelineRun}
            tasks={tasks}
          />
        )}
      </AsyncResource>
    </>
  );
}
export default withRouteParams(PagePipelineRun);
