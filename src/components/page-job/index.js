import { Route } from 'react-router';
import React from 'react';

import DocumentTitle from '../document-title';
import JobOverview from '../job-overview';
import PageStep from '../page-step';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageJob = ({ appName, jobName }) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`Pipeline Job ${jobName}`} />
      <Route
        exact
        path={routes.appJob}
        render={() => <JobOverview appName={appName} jobName={jobName} />}
      />
      <Route path={routes.appJobStep} component={PageStep} />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'jobName'], PageJob);
