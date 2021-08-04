import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AppListItem from '../app-list-item';
import AsyncResource from '../async-resource';

import { getApplications } from '../../state/applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import applicationSummaryModel from '../../models/application-summary';
import PageCreateApplication from '../page-create-application';

import './style.css';
import {
  Button,
  Dialog,
  Divider,
  Icon,
  Scrim,
  Typography,
} from '@equinor/eds-core-react';
import { add, clear } from '@equinor/eds-icons';

const appSorter = (a, b) => a.name.localeCompare(b.name);

const LoadingItem = () => {
  return <AppListItem app={{ isPlaceHolder: true }} />;
};

const loading = (
  <div className="app-list__list">
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
  </div>
);

function CreateNewAppButton() {
  const [visibleScrim, setVisibleScrim] = React.useState(false);
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
        <Icon data={add} />
        Create new app
      </Button>
      {visibleScrim && (
        <Scrim onClose={handleClose} isDismissable className="scrim">
          <Dialog className="dialog-container">
            <div className="dialog__header">
              <h5>Create new app</h5>
              <Button
                variant="ghost"
                className="o-heading-page-button"
                onClick={() => setVisibleScrim(false)}
              >
                <Icon data={clear} />
              </Button>
            </div>
            <div>
              <Divider />
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

export class AppList extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler(e, appName) {
    e.preventDefault();

    let favourites = JSON.parse(localStorage.getItem('favouriteApplications'));

    if (favourites.includes(appName)) {
      favourites = favourites.filter((name) => name !== appName);
    } else {
      favourites = [...favourites, appName];
    }
    localStorage.setItem('favouriteApplications', JSON.stringify(favourites));
    this.setState({
      favourites: favourites,
    });
  }

  componentDidMount() {
    this.props.subscribeApplications();
  }

  componentWillUnmount() {
    this.props.unsubscribeApplications();
  }

  render() {
    const { apps } = this.props;
    const favouriteApps =
      JSON.parse(localStorage.getItem('favouriteApplications')) || '';

    const appsRender = apps
      .sort(appSorter)
      .map((app) => (
        <AppListItem app={app} key={app.name} handler={this.handler} />
      ));

    const favouriteAppsRender =
      favouriteApps.length > 0 ? (
        apps
          .filter((app) => favouriteApps.includes(app.name))
          .sort(appSorter)
          .map((app) => (
            <AppListItem app={app} key={app.name} handler={this.handler} />
          ))
      ) : (
        <Typography variant="body_short">No favourites</Typography>
      );

    return (
      <article className="app-list">
        <AsyncResource resource="APPS" loading={loading}>
          {apps.length > 0 && (
            <>
              <div className="favourites app-list--multi-header">
                <Typography variant="body_short_bold">Favourites</Typography>
                <div>
                  <CreateNewAppButton />
                </div>
                <div className="app-list__list">{favouriteAppsRender}</div>
              </div>
              <div className="all_apps">
                <Typography variant="body_short_bold">
                  All applications
                </Typography>
                <div className="app-list__list">{appsRender}</div>
              </div>
            </>
          )}
          {apps.length === 0 && (
            <div>
              <div className="app-list--multi-header">
                <div className="grid grid--gap-small">
                  <Typography variant="h4">No applications yet</Typography>
                  <Typography variant="body_short">
                    Applications that you create (or have access to) appear here
                  </Typography>
                </div>
                <div>
                  <CreateNewAppButton />
                </div>
              </div>
            </div>
          )}
        </AsyncResource>
      </article>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape(applicationSummaryModel)).isRequired,
  subscribeApplications: PropTypes.func.isRequired,
  unsubscribeApplications: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  subscribeApplications: () =>
    dispatch(subscriptionActions.subscribeApplications()),
  unsubscribeApplications: () =>
    dispatch(subscriptionActions.unsubscribeApplications()),
});

const mapStateToProps = (state) => ({
  apps: getApplications(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
