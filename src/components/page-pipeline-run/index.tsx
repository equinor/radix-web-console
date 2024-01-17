import * as PropTypes from 'prop-types';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRun } from '../pipeline-run';
import { PipelineRunTasks } from '../pipeline-run-tasks';
import { routes } from '../../routes';
import { routeWithParams, smallJobName } from '../../utils/string';
import { withRouteParams } from '../../utils/router';
import {
  useGetTektonPipelineRunQuery,
  useGetTektonPipelineRunTasksQuery,
} from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';

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
PagePipelineRun.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRunName: PropTypes.string.isRequired,
};
export default withRouteParams(PagePipelineRun);
