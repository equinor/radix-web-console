import { Route, Redirect, Switch } from 'react-router-dom';
import { React } from 'react';

import ConfigStatus from './config-status';

import DocumentTitle from '../document-title';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import PageApplications from '../page-applications';
import TopNavigation from '../global-top-nav';
import routes from '../../routes';

import { Typography } from '@equinor/eds-core-react';

import './style.css';

const makeGenericPage = (Page, title) => () => (
  <article className="o-layout-main">
    <DocumentTitle title={title} />
    <TopNavigation />
    <div className="o-layout-main__content">
      <div className="o-layout-single">
        <div className="o-layout-single__head">
          <Typography variant="body_short_bold">{title}</Typography>
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
        <Route component={PageApplications} exact path={routes.apps} />
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
