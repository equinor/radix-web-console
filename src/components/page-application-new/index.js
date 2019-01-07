import { Route } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import AppOverview from '../app-overview';

import Breadcrumb from '../breadcrumb';
import GlobalCourtesyNav from '../global-courtesy-nav';
import AppNavbar from '../app-navbar';
import GlobalTitle from '../global-title';
import HomeLogo from '../home-logo';
import LayoutApp from '../layout-app';
import PageEnvironment from '../page-environment';
import PageJob from '../page-job';

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

export const PageApplication = ({ appName }) => (
  <LayoutApp sidebar={<AppSidebar appName={appName} />}>
    <div className="o-layout-main">
      <div className="o-layout-main__head">
        <GlobalTitle title={appName} />
        <GlobalCourtesyNav />
      </div>
      <div className="o-layout-main__content">
        <main className="page-application__content">
          <Breadcrumb
            links={[
              {
                label: 'radix-web-console',
                to: '/applications/radix-web-console',
              },
            ]}
          />

          <Route path={routes.app} exact render={() => <AppOverview appName={appName} />} />
          <Route path={routes.appEnvironment} component={PageEnvironment} />
          <Route path={routes.appJob} component={PageJob} />
        </main>
      </div>
    </div>
  </LayoutApp>
);

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(['appName'], PageApplication);
