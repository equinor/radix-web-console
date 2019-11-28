import { Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import ConfigStatus from './config-status';

import DocumentTitle from '../document-title';
import GlobalCourtesyNav from '../global-courtesy-nav';
import HomeLogo from '../home-logo';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';

import routes from '../../routes';

import './style.css';

const makeGenericPage = (Page, title) => () => (
  <article className="o-layout-main">
    <DocumentTitle title={title} />
    <header className="o-layout-main__head">
      <HomeLogo />
      <GlobalCourtesyNav />
    </header>
    <div className="o-layout-main__content">
      <div className="o-layout-single">
        <div className="o-layout-single__head">
          <h1 className="o-heading-page">{title}</h1>
        </div>
        <div className="o-layout-single__content">
          <Page />
        </div>
      </div>
    </div>
  </article>
);

export const PageRoot = () => (
  <div className="page-root">
    <div className="o-layout-base">
      <Switch>
        <Route
          component={makeGenericPage(PageAbout, 'About')}
          path={routes.about}
        />
        <Route
          component={makeGenericPage(PageApplications, 'Applications')}
          exact
          path={routes.apps}
        />
        <Route
          component={makeGenericPage(
            PageCreateApplication,
            'Create application'
          )}
          path={routes.appCreate}
        />
        <Route component={PageApplication} path={routes.app} />
      </Switch>

      <Route
        exact
        path={routes.home}
        render={() => <Redirect to={routes.apps} />}
      />
    </div>
    <div className="page-root__notifications">
      <ConfigStatus />
    </div>
  </div>
);

export default PageRoot;
