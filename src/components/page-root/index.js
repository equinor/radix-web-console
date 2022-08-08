import { Typography } from '@equinor/eds-core-react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DocumentTitle from '../document-title';
import { GlobalTopNav } from '../global-top-nav';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import { PageApplications } from '../page-applications';
import { routes } from '../../routes';

import './style.css';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const makeGenericPage = (Page, title) => () =>
  (
    <article className="o-layout-main">
      <DocumentTitle title={title} />
      <GlobalTopNav />
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

export const PageRoot = () => {
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect
  );
  const { accounts } = useMsal();
  if (accounts.length === 0) {
    return <></>;
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
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
    </div>
  );
};

export default PageRoot;
