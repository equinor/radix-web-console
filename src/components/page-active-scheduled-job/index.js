import { Route } from 'react-router';
import React from 'react';

import ActiveComponentOverview from './active-scheduled-job-overview';

import DocumentTitle from '../document-title';
import PageReplica from '../page-replica';
import PageSecret from '../page-secret';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageActiveScheduledJob = ({ appName, envName, componentName }) => (
  <React.Fragment>
    <DocumentTitle title={`${componentName} in ${envName}`} />
    <Route
      exact
      path={routes.appActiveScheduledJob}
      render={() => (
        <ActiveComponentOverview
          appName={appName}
          componentName={componentName}
          envName={envName}
        />
      )}
    />
    <Route path={routes.appScheduledJobs} component={PageReplica} />
    <Route path={routes.appSecret} component={PageSecret} />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveScheduledJob
);
