import { CircularProgress } from '@equinor/eds-core-react';
import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

const EnvironmentOverview = lazy(() => import('./environment-overview'));
const PageActiveComponent = lazy(() => import('../page-active-component'));
const PageActiveJobComponent = lazy(
  () => import('../page-active-job-component')
);

export const PageEnvironment = ({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): JSX.Element => (
  <>
    <DocumentTitle title={`${envName} environment`} />

    <Suspense
      fallback={
        <div>
          <CircularProgress size={16} /> Loading…
        </div>
      }
    >
      <Route
        exact
        path={routes.appEnvironment}
        render={() => (
          <EnvironmentOverview appName={appName} envName={envName} />
        )}
      />
      <Route path={routes.appActiveComponent} component={PageActiveComponent} />
      <Route
        path={routes.appActiveJobComponent}
        component={PageActiveJobComponent}
      />
    </Suspense>
  </>
);

export default mapRouteParamsToProps(['appName', 'envName'], PageEnvironment);
