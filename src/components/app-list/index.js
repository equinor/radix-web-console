import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AppListItem from '../app-list-item';
import EmptyState from '../empty-state';
import AsyncResource from '../async-resource';

import { getApplications } from '../../state/applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import applicationSummaryModel from '../../models/application-summary';

import './style.css';

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

export class AppList extends React.Component {
  componentDidMount() {
    this.props.subscribeApplications();
  }

  componentWillUnmount() {
    this.props.unsubscribeApplications();
  }

  render() {
    const { apps } = this.props;

    const appsRender = apps
      .sort(appSorter)
      .map((app) => <AppListItem app={app} key={app.name} />);

    return (
      <article className="app-list">
        <AsyncResource resource="APPS" loading={loading}>
          {apps.length > 0 && (
            <div className="app-list__list">{appsRender}</div>
          )}
          {apps.length === 0 && (
            <EmptyState title="No applications yet">
              Applications that you create (or have access to) appear here
            </EmptyState>
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
