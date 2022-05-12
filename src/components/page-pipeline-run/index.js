import React from 'react';
import { Route } from 'react-router';

import DocumentTitle from '../document-title';
import PipelineRun from '../pipeline-run';
import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { Breadcrumb } from '../breadcrumb';
import { routeWithParams, smallPipelineRunName } from '../../utils/string';

export const PipelinePageRun = ({ appName, jobName, pipelineRunName }) => (
  <>
    <Breadcrumb
      links={[
        { label: appName, to: routeWithParams(routes.app, { appName }) },
        {
          label: 'Pipeline Runs',
          to: routeWithParams(routes.appPipelineRuns, { appName }, { jobName }),
        },
        { label: smallPipelineRunName(jobName) },
      ]}
    />
    <DocumentTitle title={`Pipeline Run ${pipelineRunName}`} />
    <Route
      exact
      path={routes.appRun}
      render={() => (
        <PipelineRun
          appName={appName}
          jobName={jobName}
          pipelineRunName={pipelineRunName}
        />
      )}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName'],
  PipelinePageRun
);
