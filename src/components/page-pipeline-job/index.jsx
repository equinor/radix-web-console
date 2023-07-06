import { CircularProgress } from '@equinor/eds-core-react';
import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

const JobOverview = lazy(() => import('../job-overview'));

export const PipelinePageJob = ({ appName, jobName }) => (
  <Suspense
    fallback={
      <div>
        <CircularProgress size={16} /> Loading…
      </div>
    }
  >
    <DocumentTitle title={`Pipeline Job ${jobName}`} />

    <Route
      exact
      path={routes.appJob}
      render={() => <JobOverview appName={appName} jobName={jobName} />}
    />
  </Suspense>
);

export default mapRouteParamsToProps(['appName', 'jobName'], PipelinePageJob);
