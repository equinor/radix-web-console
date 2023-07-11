import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { Typography } from '@equinor/eds-core-react';
import { ComponentPropsWithRef, ExoticComponent, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DocumentTitle } from '../document-title';
import { GlobalTopNav } from '../global-top-nav';
import { LazyLoadFallback } from '../lazy-load-fallback';
import { routes } from '../../routes';

import './style.css';

const PageAbout = lazy(() => import('../page-about'));
const PageApplication = lazy(() => import('../page-application'));
const PageApplications = lazy(() => import('../page-applications'));

const makeGenericPage =
  (
    Page:
      | (() => JSX.Element)
      | ExoticComponent<ComponentPropsWithRef<() => JSX.Element>>,
    title: string
  ): (() => JSX.Element) =>
  () =>
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

export const PageRoot = (): JSX.Element => {
  useMsalAuthentication(InteractionType.Redirect);
  const { accounts } = useMsal();
  if (accounts.length === 0) {
    return <></>;
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
        <Suspense fallback={<LazyLoadFallback />}>
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
        </Suspense>
      </div>
    </div>
  );
};

export default PageRoot;
