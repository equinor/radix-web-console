import { Route } from 'react-router';

import DeploymentOverview from './deployment-overview';

import { DocumentTitle } from '../document-title';
import PageDeploymentComponent from '../page-deployment-component';
import PageDeploymentJobComponent from '../page-deployment-job-component';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { smallDeploymentName } from '../../utils/string';

export interface PageDeploymentProps {
  appName: string;
  deploymentName: string;
}

export const PageDeployment = ({
  appName,
  deploymentName,
}: PageDeploymentProps): JSX.Element => (
  <>
    <DocumentTitle
      title={`Deployment ${smallDeploymentName(deploymentName)}`}
    />
    <Route
      exact
      path={routes.appDeployment}
      render={() => (
        <DeploymentOverview appName={appName} deploymentName={deploymentName} />
      )}
    />
    <Route path={routes.appComponent} component={PageDeploymentComponent} />
    <Route
      path={routes.appJobComponent}
      component={PageDeploymentJobComponent}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'deploymentName'],
  PageDeployment
);
