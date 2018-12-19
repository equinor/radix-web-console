import { Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import ConfigStatus from '../config-status';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';
import AuthWrapper from '../auth-wrapper';
import HomeLogo from '../home-logo';
import GlobalCourtesyNav from '../global-courtesy-nav';

import routes from '../../routes';

import './style.css';

const makeGenericPage = Page => () => (
  <article className="o-layout-main">
    <header className="o-layout-main__head">
      <HomeLogo />
      <GlobalCourtesyNav />
    </header>
    <div className="o-layout-main__content">
      <div className="o-layout-container">
        <Page />
      </div>
    </div>
  </article>
);

export const PageRoot = () => (
  <div className="o-layout-base">
    <AuthWrapper>
      <Switch>
        <Route component={makeGenericPage(PageAbout)} path={routes.about} />
        <Route
          component={makeGenericPage(PageApplications)}
          exact
          path={routes.apps}
        />
        <Route
          component={makeGenericPage(PageCreateApplication)}
          path={routes.appCreate}
        />
        <Route component={PageApplication} path={routes.app} />
      </Switch>

      <Route
        exact
        path={routes.home}
        render={() => <Redirect to={routes.apps} />}
      />
    </AuthWrapper>
  </div>
);

export default PageRoot;

/*
<ConfigStatus />

          <div className="app__notice">
            Omnia Radix is currently in alpha state — only information
            classified as "public" can be placed in the cluster
          </div>
*/
