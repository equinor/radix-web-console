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
    if (this.props.subscribeApplications) {
      this.props.subscribeApplications();
    }
  }

  componentWillUnmount() {
    this.props.unsubscribeApplications();
  }

  render() {
    const { apps } = this.props;

    return (
      <article className="app-list">
        {apps.length > 0 &&
          apps
            .sort(appSorter)
            .map(app => <AppSummaryShort app={app} key={app.name} />)}
        {apps.length === 0 && '🐼 No apps yet 🐼'}
      </article>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape(ApplicationSummary)),
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
