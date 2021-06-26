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

import { Button, Scrim, Icon, Dialog } from '@equinor/eds-core-react';
import { add, clear } from '@equinor/eds-icons';

import './style.css';

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
      {/* TODO: Prevent display of button in case of async-error */}
      <Button
        variant="ghost"
        color="primary"
        className="o-heading-page-button"
        onClick={() => setVisibleScrim(true)}
      >
        <Icon data={add} />
        Create new app
      </Button>
      {visibleScrim && (
        <Scrim onClose={handleClose} isDismissable className="scrim">
          <Dialog className="dialog-container">
            <div>
              <h5>Create new app</h5>
              <Button
                variant="ghost"
                className="o-heading-page-button"
                onClick={() => setVisibleScrim(false)}
              >
                <Icon data={clear} />
              </Button>
            </div>
            <Dialog.CustomContent scrollable="true" style={{ height: '70vh' }}>
              <PageCreateApplication />
            </Dialog.CustomContent>
          </Dialog>
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
          <p className="body_short_bold">{title}</p>
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
