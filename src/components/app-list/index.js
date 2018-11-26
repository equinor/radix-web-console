import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getApplications } from '../../state/new_applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import AppSummaryShort from '../app-summary/short';
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
      return '🐼 No apps yet 🐼';
    }

    return apps
      .sort(appSorter)
      .map(app => <AppSummaryShort app={app} key={app.name} />);
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
