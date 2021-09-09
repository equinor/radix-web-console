import { Route } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import AppNavbar from '../app-navbar';
import AppOverview from '../app-overview';
import DocumentTitle from '../document-title';
import TopNavigation from '../global-top-nav';
import LayoutApp from '../layout-app';
import PageConfiguration from '../page-configuration';
import PageDeployments from '../page-deployments';
import PageDeployment from '../page-deployment';
import PageEnvironment from '../page-environment';
import PageEnvironments from '../page-environments';
import PageBuildSecret from '../page-build-secret';
import PagePrivateImageHub from '../page-private-image-hub';
import PageJob from '../page-pipeline-job';
import PageJobNew from '../page-pipeline-job-new';
import PageJobs from '../page-pipeline-jobs';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

import './style.css';

const AppSidebar = ({ appName }) => (
  <div className="o-layout-main">
    <div className="o-layout-main__content">
      <div className="page-application__sidebar">
        <AppNavbar appName={appName} />
      </div>
    </div>
  </div>
);

export const PageApplication = ({ appName }) => {
  return (
    <div className="o-layout-main">
      <DocumentTitle title={appName} />
      <TopNavigation />
      <LayoutApp sidebar={<AppSidebar appName={appName} />}>
        <div className="o-layout-main__content">
          <div className="page-application__content">
            <div className="o-layout-constrained">
              <Route
                path={routes.app}
                exact
                render={() => <AppOverview appName={appName} />}
              />
              <Route
                path={routes.appJobNew}
                exact
                render={() => <PageJobNew appName={appName} />}
              />
              <Route
                path={routes.appEnvironments}
                exact
                render={() => <PageEnvironments appName={appName} />}
              />
              <Route
                path={routes.appJobs}
                exact
                render={() => <PageJobs appName={appName} />}
              />
              <Route
                path={routes.appDeployments}
                exact
                render={() => <PageDeployments appName={appName} />}
              />
              <Route path={routes.appEnvironment} component={PageEnvironment} />
              <Route path={routes.appJob} component={PageJob} />
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
};

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(['appName'], PageApplication);
