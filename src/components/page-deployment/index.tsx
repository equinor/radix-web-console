import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { LazyLoadFallback } from '../lazy-load-fallback';
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
}: PageDeploymentProps): React.JSX.Element => (
  <>
    <DocumentTitle
      title={`Deployment ${smallDeploymentName(deploymentName)}`}
    />

    <Suspense fallback={<LazyLoadFallback />}>
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
