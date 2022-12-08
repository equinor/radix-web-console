import { Route } from 'react-router';

import ActiveJobComponentOverview from './active-job-component-overview';

import { DocumentTitle } from '../document-title';
import PageScheduledJob from '../page-scheduled-job';
import PageScheduledBatch from '../page-scheduled-batch';
import PageSecret from '../page-secret';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import PageReplica from '../page-replica';

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
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName'],
  PageActiveJobComponent
);
