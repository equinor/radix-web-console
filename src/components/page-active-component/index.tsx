import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { LazyLoadFallback } from '../lazy-load-fallback';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

const ActiveComponentOverview = lazy(
  () => import('./active-component-overview')
);
const PageOAuthAuxiliaryReplica = lazy(() => import('../page-oauth-replica'));
const PageReplica = lazy(() => import('../page-replica'));
const PageSecret = lazy(() => import('../page-secret'));

export const PageActiveComponent = ({
  appName,
  envName,
  componentName,
}: {
  appName: string;
  envName: string;
  componentName: string;
}): React.JSX.Element => (
  <>
    <DocumentTitle title={`${componentName} in ${envName}`} />

    <Suspense fallback={<LazyLoadFallback />}>
      <Route
        exact
        path={routes.appActiveComponent}
        render={() => (
          <ActiveComponentOverview
            appName={appName}
            componentName={componentName}
            envName={envName}
          />
        )}
      />
      <Route path={routes.appReplica} component={PageReplica} />
      <Route
        path={routes.appOAuthAuxiliaryReplica}
        component={PageOAuthAuxiliaryReplica}
      />
      <Route path={routes.appSecret} component={PageSecret} />
    </Suspense>
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveComponent
);
