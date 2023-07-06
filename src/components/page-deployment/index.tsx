import { CircularProgress } from '@equinor/eds-core-react';
import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { smallDeploymentName } from '../../utils/string';

const DeploymentOverview = lazy(() => import('./deployment-overview'));
const PageDeploymentComponent = lazy(
  () => import('../page-deployment-component')
);
const PageDeploymentJobComponent = lazy(
  () => import('../page-deployment-job-component')
);

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

    <Suspense
      fallback={
        <div>
          <CircularProgress size={16} /> Loading…
        </div>
      }
    >
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
    </Suspense>
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'deploymentName'],
  PageDeployment
);
