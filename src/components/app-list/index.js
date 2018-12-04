import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getApplications } from '../../state/new_applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import AppListItem from '../app-list-item';
import { ApplicationSummary } from '../../models';
import './style.css';

const appSorter = (a, b) => a.name.localeCompare(b.name);

export class AppList extends React.Component {
  componentDidMount() {
    this.props.subscribeApplications();
  }

  componentWillUnmount() {
    this.props.unsubscribeApplications();
  }

  render() {
    return <article className="app-list">{this.renderApps()}</article>;
  }

  renderApps() {
    const { apps } = this.props;

    if (!apps) {
      return 'Loading apps…';
    }

    if (!apps.length) {
      return this.renderEmpty();
    }

    return apps
      .sort(appSorter)
      .map(app => <AppListItem app={app} key={app.name} />);
  }

  renderEmpty() {
    return (
      <React.Fragment>
        <div className="app-list__empty-text">
          You don't have any applications yet.
        </div>
        <div className="app-list__empty-text app-list__empty-extra-text">
          Every application you create will appear here.
        </div>
        <div className="app-list__empty-text">
          <Link to={routes.appCreate}>Create new application</Link>
        </div>
      </React.Fragment>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape(ApplicationSummary)).isRequired,
  subscribeApplications: PropTypes.func.isRequired,
  unsubscribeApplications: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  subscribeApplications: () =>
    dispatch(subscriptionActions.subscribeApplications()),
  unsubscribeApplications: () =>
    dispatch(subscriptionActions.unsubscribeApplications()),
});

const mapStateToProps = state => ({
  apps: getApplications(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList);
