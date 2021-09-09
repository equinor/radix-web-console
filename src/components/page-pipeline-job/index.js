import React from 'react';
import { Route } from 'react-router';

import DocumentTitle from '../document-title';
import JobOverview from '../job-overview';
import PageStep from '../page-step';
import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PipelinePageJob = ({ appName, jobName }) => (
  <>
    <DocumentTitle title={`Pipeline Job ${jobName}`} />
    <Route
      exact
      path={routes.appJob}
      render={() => <JobOverview appName={appName} jobName={jobName} />}
    />
    <Route path={routes.appJobStep} component={PageStep} />
  </>
);

export default mapRouteParamsToProps(['appName', 'jobName'], PipelinePageJob);
