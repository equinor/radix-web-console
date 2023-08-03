import * as PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import { DocumentTitle } from '../document-title';
import { GlobalTopNav } from '../global-top-nav';
import { LayoutApp } from '../layout-app';
import { LazyLoadFallback } from '../lazy-load-fallback';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

import './style.css';

const AppOverview = lazy(() => import('../app-overview'));
const PageBuildSecret = lazy(() => import('../page-build-secret'));
const PageConfiguration = lazy(() => import('../page-configuration'));
const PageDeployment = lazy(() => import('../page-deployment'));
const PageDeployments = lazy(() => import('../page-deployments'));
const PageEnvironment = lazy(() => import('../page-environment'));
const PageEnvironments = lazy(() => import('../page-environments'));
const PageJob = lazy(() => import('../page-pipeline-job'));
const PageJobNew = lazy(() => import('../page-pipeline-job-new'));
const PageJobs = lazy(() => import('../page-pipeline-jobs'));
const PagePipelineRun = lazy(() => import('../page-pipeline-run'));
const PagePipelineRunTask = lazy(() => import('../page-pipeline-run-task'));
const PagePrivateImageHub = lazy(() => import('../page-private-image-hub'));
const PageStep = lazy(() => import('../page-step'));

export interface PageApplicationProps {
  appName: string;
}

export const PageApplication = ({
  appName,
}: PageApplicationProps): React.JSX.Element => (
  <div className="o-layout-main">
    <DocumentTitle title={appName} />
    <GlobalTopNav />

    <LayoutApp appName={appName}>
      <div className="o-layout-main__content">
        <div className="page-application__content">
          <div className="o-layout-constrained">
            <Suspense fallback={<LazyLoadFallback />}>
              <Route path={routes.app} exact render={() => <AppOverview />} />
              <Route
                path={routes.appJobNew}
                exact
                render={() => <PageJobNew />}
              />
              <Route
                path={routes.appEnvironments}
                exact
                render={() => <PageEnvironments />}
              />
              <Route path={routes.appJobs} exact render={() => <PageJobs />} />
              <Route
                path={routes.appDeployments}
                exact
                render={() => <PageDeployments />}
              />
              <Route path={routes.appEnvironment} component={PageEnvironment} />
              <Route path={routes.appJob} component={PageJob} />
              <Route path={routes.appJobStep} component={PageStep} />
              <Route path={routes.appPipelineRun} component={PagePipelineRun} />
              <Route
                path={routes.appPipelineRunTask}
                component={PagePipelineRunTask}
              />
              <Route path={routes.appDeployment} component={PageDeployment} />
              <Route
                path={routes.appPrivateImageHub}
                component={PagePrivateImageHub}
              />
              <Route path={routes.appBuildSecret} component={PageBuildSecret} />
              <Route
                path={routes.appConfig}
                exact
                component={PageConfiguration}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </LayoutApp>
  </div>
);

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<PageApplicationProps>;

export default mapRouteParamsToProps(['appName'], PageApplication);
