import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { LazyLoadFallback } from '../lazy-load-fallback';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

const ActiveJobComponentOverview = lazy(
  () => import('./active-job-component-overview')
);
const PageScheduledJob = lazy(() => import('../page-scheduled-job'));
const PageScheduledBatch = lazy(() => import('../page-scheduled-batch'));
const PageSecret = lazy(() => import('../page-secret'));
const PageReplica = lazy(() => import('../page-replica'));

export const PageActiveJobComponent = ({
  appName,
  envName,
  jobComponentName,
}: {
  appName: string;
  envName: string;
  jobComponentName: string;
}): JSX.Element => (
  <>
    <DocumentTitle title={`${jobComponentName} in ${envName}`} />

    <Suspense fallback={<LazyLoadFallback />}>
      <Route
        exact
        path={routes.appActiveJobComponent}
        render={() => (
          <ActiveJobComponentOverview
            appName={appName}
            envName={envName}
            jobComponentName={jobComponentName}
          />
        )}
      />
      <Route path={routes.appReplica} component={PageReplica} />
      <Route path={routes.appScheduledJob} component={PageScheduledJob} />
      <Route path={routes.appScheduledBatch} component={PageScheduledBatch} />
      <Route path={routes.appSecret} component={PageSecret} />
    </Suspense>
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName'],
  PageActiveJobComponent
);
