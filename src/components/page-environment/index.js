import { Route } from 'react-router';
import React from 'react';

import DocumentTitle from '../document-title';
import EnvironmentOverview from '../environment-overview';

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
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
