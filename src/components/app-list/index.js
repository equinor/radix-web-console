import { ApplicationSummary } from 'radix-web-console-models';
import { connect } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import AppListItem from '../app-list-item';
import EmptyState from '../empty-state';

import { getApplications } from '../../state/applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import routes from '../../routes';

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
    const { apps } = this.props;

    if (!apps) {
      return 'Loading apps…';
    }

    if (!apps.length) {
      return (
        <article className="app-list">
          <EmptyState
            ctaText="Create application"
            ctaTo={routes.appCreate}
            icon={<FontAwesomeIcon icon={faPlusCircle} size="5x" />}
            title="No applications yet"
          >
            Applications that you create (or have access to) appear here
          </EmptyState>
        </article>
      );
    }

    const appsRender = apps
      .sort(appSorter)
      .map(app => <AppListItem app={app} key={app.name} />);

    return (
      <article className="app-list">
        <div className="app-list__list">
          <Link className="app-list__add-new" to={routes.appCreate}>
            <div className="app-list__add-new-icon">
              <FontAwesomeIcon icon={faPlusCircle} size="4x" />
            </div>
            <span>Create application</span>
          </Link>
          {appsRender}
        </div>
      </article>
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
