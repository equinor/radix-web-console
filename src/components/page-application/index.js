import { Route } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import AppNavbar from '../app-navbar';
import AppOverview from '../app-overview';
import DocumentTitle from '../document-title';
import GlobalCourtesyNav from '../global-courtesy-nav';
import GlobalNav from '../global-nav';
import HomeLogo from '../home-logo';
import LayoutApp from '../layout-app';
import PageConfiguration from '../page-configuration';
import PageDeployments from '../page-deployments';
import PageDeployment from '../page-deployment';
import PageEnvironment from '../page-environment';
import PageEnvironments from '../page-environments';
import PageBuildSecret from '../page-build-secret';
import PagePrivateImageHub from '../page-private-image-hub';
import PageJob from '../page-job';
import PageJobNew from '../page-job-new';
import PageJobs from '../page-jobs';

import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

import './style.css';

const AppSidebar = ({ appName }) => (
  <div className="o-layout-main">
    <div className="o-layout-main__head">
      <HomeLogo />
    </div>
    <div className="o-layout-main__content">
      <div className="page-application__sidebar">
        <AppNavbar appName={appName} />
      </div>
    </div>
  </div>
);

export const PageApplication = ({ appName }) => {
  return (
    <LayoutApp sidebar={<AppSidebar appName={appName} />}>
      <DocumentTitle title={appName} />
      <div className="o-layout-main">
        <div className="o-layout-main__head">
          <div className="page-application__header-nav">
            <GlobalNav />
            <GlobalCourtesyNav />
          </div>
        </div>
        <div className="o-layout-main__content">
          <div className="page-application__content">
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
  );
};

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(['appName'], PageApplication);
