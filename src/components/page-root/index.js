import { Route, Redirect, Switch } from 'react-router-dom';
import { React, useState } from 'react';

import ConfigStatus from './config-status';

import DocumentTitle from '../document-title';
import PageAbout from '../page-about';
import PageApplication from '../page-application';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';
import TopNavigation from '../global-top-nav';
import routes from '../../routes';

import { Button, Scrim, Icon } from '@equinor/eds-core-react';
import { add, clear } from '@equinor/eds-icons';

import './style.css';

Icon.add({
  add,
  clear,
});

function CreateNewAppButton() {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const handleClose = (event, closed) => {
    if (closed) {
      setVisibleScrim(closed);
    } else {
      setVisibleScrim(!visibleScrim);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        color="primary"
        className="o-heading-page-button"
        onClick={() => setVisibleScrim(true)}
      >
        <Icon name="add" />
        Create new app
      </Button>
      {visibleScrim && (
        <Scrim onClose={handleClose} isDismissable>
          <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <div>
              {/* TODO: Prevent display of button in case of async-error */}
              <h1 className="o-heading-page">Create new app</h1>
              <Button
                variant="ghost"
                className="o-heading-page-button"
                onClick={() => setVisibleScrim(false)}
              >
                <Icon name="clear" />
              </Button>
            </div>
            <PageCreateApplication />
          </div>
        </Scrim>
      )}
    </>
  );
}

const makeGenericPage = (Page, title) => () => (
  <article className="o-layout-main">
    <DocumentTitle title={title} />
    <TopNavigation />
    <div className="o-layout-main__content">
      <div className="o-layout-single">
        <div className="o-layout-single__head">
          <h1 className="o-heading-page">{title}</h1>
          {title === 'Applications' && <CreateNewAppButton />}
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
