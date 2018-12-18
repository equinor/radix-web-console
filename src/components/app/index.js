import { Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import LayoutApp from '../layout-app';
import ConfigStatus from '../config-status';
import GlobalNav from '../global-nav';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';

import routes from '../../routes';

import './style.css';

const AppSidebar = () => (
  <div className="o-layout-main">
    <div className="o-layout-main__head">Sidebar head</div>
    <div className="o-layout-main__content">
      <GlobalNav />
    </div>
  </div>
);

export const App = () => (
  <LayoutApp sidebar={<AppSidebar />}>
    <div className="app">
      <div className="app__content">
        <div className="o-layout-main">
          <div className="o-layout-main__head">Content head</div>
          <div className="o-layout-main__content">
            <div className="app__notice">
              Omnia Radix is currently in alpha state — only information
              classified as "public" can be placed in the cluster
            </div>
            <ConfigStatus />
            <main className="o-layout-container">
              <Switch>
                <Route path={routes.about} component={PageAbout} />
                <Route path={routes.apps} component={PageApplications} exact />
                <Route
                  path={routes.appCreate}
                  component={PageCreateApplication}
                />
                <Route path={routes.app} component={PageApplication} />
              </Switch>

              <Route
                exact
                path={routes.home}
                render={() => <Redirect to={routes.apps} />}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  </LayoutApp>
);

export default App;
