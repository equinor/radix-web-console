import { Route } from 'react-router';
import React from 'react';

import DeploymentOverview from './deployment-overview';

import DocumentTitle from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';
import { smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import PageDeploymentComponent from '../page-deployment-component';
import PageDeploymentJobComponent from '../page-deployment-job-component';

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
      <Route path={routes.appComponent} component={PageDeploymentComponent} />
      <Route
        path={routes.appJobComponent}
        component={PageDeploymentJobComponent}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'deploymentName'],
  PageDeployment
);
