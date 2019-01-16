import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import AppNavbar from '../app-navbar';
import AppOverview from '../app-overview';
import GlobalCourtesyNav from '../global-courtesy-nav';
import GlobalNav from '../global-nav';
import HomeLogo from '../home-logo';
import LayoutApp from '../layout-app';
import PageEnvironment from '../page-environment';
import PageJobs from '../page-jobs';
import PageJob from '../page-job';

import * as applicationState from '../../state/application';
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

export const PageApplication = ({ appName, appState }) => {
  if (appState && appState.isDeleted) {
    return <Redirect to={routes.home} />;
  }

  return (
    <LayoutApp sidebar={<AppSidebar appName={appName} />}>
      <div className="o-layout-main">
        <div className="o-layout-main__head">
          <div className="page-application__header-nav">
            <GlobalNav />
            <GlobalCourtesyNav />
          </div>
        </div>
        <div className="o-layout-main__content">
          <div className="page-application__content">
            <Route path={routes.app} exact render={() => <AppOverview appName={appName} />} />
            <Route path={routes.appJobs} exact render={() => <PageJobs appName={appName} />} />
            <Route path={routes.appEnvironment} component={PageEnvironment} />
            <Route path={routes.appJob} component={PageJob} />
          </div>
        </div>
      </div>
    </LayoutApp>
  );
};

const mapStateToProps = state => ({
  appState: applicationState.getApplicationState(state),
});

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
  appState: PropTypes.object,
};

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps)(PageApplication)
);
