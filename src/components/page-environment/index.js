import { Route } from 'react-router';
import React from 'react';

import EnvironmentOverview from './environment-overview';

import DocumentTitle from '../document-title';
import PageActiveComponent from '../page-active-component';
import PageActiveScheduledJob from '../page-active-scheduled-job';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageEnvironment = ({ appName, envName }) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`${envName} environment`} />
      <Route
        exact
        path={routes.appEnvironment}
        render={() => (
          <EnvironmentOverview appName={appName} envName={envName} />
        )}
      />
      <Route path={routes.appActiveComponent} component={PageActiveComponent} />
      <Route
        path={routes.appActiveScheduledJob}
        component={PageActiveScheduledJob}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
