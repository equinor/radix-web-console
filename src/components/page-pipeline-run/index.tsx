import * as PropTypes from 'prop-types';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRun } from '../pipeline-run';
import { PipelineRunTasks } from '../pipeline-run-tasks';
import { routes } from '../../routes';
import { routeWithParams, smallJobName } from '../../utils/string';
import {
  useGetTektonPipelineRunQuery,
  useGetTektonPipelineRunTasksQuery,
} from '../../store/radix-api';

interface PagePipelineRunProps {
  appName: string;
  jobName: string;
  pipelineRunName: string;
}

export default function PagePipelineRun({
  appName,
  jobName,
  pipelineRunName,
}: PagePipelineRunProps) {
  const { data: pipelineRun, ...state } = useGetTektonPipelineRunQuery({
    pipelineRunName,
    jobName,
    appName,
  });
  const { data: tasks, ...taskState } = useGetTektonPipelineRunTasksQuery({
    pipelineRunName,
    jobName,
    appName,
  });

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
PagePipelineRun.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string.isRequired,
};
