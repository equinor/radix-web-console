import { Route } from 'react-router';
import React from 'react';

import DocumentTitle from '../document-title';
import EnvironmentOverview from '../environment-overview';
import PageActiveComponent from '../page-active-component';

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
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
