import { Route } from 'react-router';
import React from 'react';

import ActiveJobComponentOverview from './active-job-component-overview';

import DocumentTitle from '../document-title';
import PageSecret from '../page-secret';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';
import PageScheduledJob from '../page-scheduled-job';

export const PageActiveJobComponent = ({
  appName,
  envName,
  jobComponentName,
}) => (
  <React.Fragment>
    <DocumentTitle title={`${jobComponentName} in ${envName}`} />
    <Route
      exact
      path={routes.appActiveJobComponent}
      render={() => (
        <ActiveJobComponentOverview
          appName={appName}
          envName={envName}
          jobComponentName={jobComponentName}
        />
      )}
    />
    <Route path={routes.appScheduledJob} component={PageScheduledJob} />
    <Route path={routes.appSecret} component={PageSecret} />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName'],
  PageActiveJobComponent
);
