import * as PropTypes from 'prop-types';
import { Route } from 'react-router';

import AppOverview from '../app-overview';
import { DocumentTitle } from '../document-title';
import { GlobalTopNav } from '../global-top-nav';
import { LayoutApp } from '../layout-app';
import PageBuildSecret from '../page-build-secret';
import PageConfiguration from '../page-configuration';
import PageDeployment from '../page-deployment';
import PageDeployments from '../page-deployments';
import PageEnvironment from '../page-environment';
import PageEnvironments from '../page-environments';
import PageJob from '../page-pipeline-job';
import PageJobNew from '../page-pipeline-job-new';
import PageJobs from '../page-pipeline-jobs';
import PagePipelineRun from '../page-pipeline-run';
import PagePipelineRunTask from '../page-pipeline-run-task';
import PagePrivateImageHub from '../page-private-image-hub';
import PageStep from '../page-step';
import { routes } from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';

import './style.css';

export interface PageApplicationProps {
  appName: string;
}

export const PageApplication = ({
  appName,
}: PageApplicationProps): JSX.Element => (
  <div className="o-layout-main">
    <DocumentTitle title={appName} />
    <GlobalTopNav />
    <LayoutApp appName={appName}>
      <div className="o-layout-main__content">
        <div className="page-application__content">
          <div className="o-layout-constrained">
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
