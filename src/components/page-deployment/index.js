import { Route } from 'react-router';
import React from 'react';

import DeploymentOverview from '../deployment-overview';
import DocumentTitle from '../document-title';
import PageComponent from '../page-component';

import { mapRouteParamsToProps } from '../../utils/routing';
import { smallDeploymentName } from '../../utils/string';
import routes from '../../routes';

export const PageDeployment = ({ appName, deploymentName }) => {
  return (
    <React.Fragment>
      <DocumentTitle
        title={`Deployment ${smallDeploymentName(deploymentName)}`}
      />
      <Route
        exact
        path={routes.appDeployment}
        render={() => (
          <DeploymentOverview
            appName={appName}
            deploymentName={deploymentName}
          />
        )}
      />
      <Route path={routes.appComponent} component={PageComponent} />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'deploymentName'],
  PageDeployment
);
