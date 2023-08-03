import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { LazyLoadFallback } from '../lazy-load-fallback';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

const JobOverview = lazy(() => import('../job-overview'));

export const PipelinePageJob = ({ appName, jobName }) => (
  <Suspense fallback={<LazyLoadFallback />}>
    <DocumentTitle title={`Pipeline Job ${jobName}`} />

    <Route
      exact
      path={routes.appJob}
      render={() => <JobOverview appName={appName} jobName={jobName} />}
    />
  </Suspense>
);

export default mapRouteParamsToProps(['appName', 'jobName'], PipelinePageJob);
