import React from 'react';
import { Route } from 'react-router';

import ActiveJobComponentOverview from './active-job-component-overview';

import DocumentTitle from '../document-title';
import PageScheduledJob from '../page-scheduled-job';
import PageSecret from '../page-secret';

import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageActiveJobComponent = ({
  appName,
  envName,
  jobComponentName,
}) => (
  <>
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
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName'],
  PageActiveJobComponent
);
