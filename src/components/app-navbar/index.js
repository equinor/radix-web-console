import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
//  faGlobeAfrica,
  faCog,
  faTruck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBadge from '../app-badge';
import StreamRefresh from '../stream-refresh';

import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as applicationState from '../../state/application';
import {
  getAppConfigUrl,
  getAppDeploymentsUrl,
  getAppJobsUrl,
} from '../../utils/routing';

import './style.css';

const AppNavbarLink = ({ icon, label, to }) => {
  const labelRender = icon ? (
    <React.Fragment>
      <FontAwesomeIcon icon={icon} size="lg" /> {label}
    </React.Fragment>
  ) : (
    label
  );
  return (
    <li>
      <NavLink
        to={to}
        activeClassName="app-navbar__link--active"
        className="app-navbar__link"
      >
        {labelRender}
      </NavLink>
    </li>
  );
};

const AppNavbarSection = ({ children, label, split }) => {
  const classNames = classnames('app-navbar__section', {
    'app-navbar__section--splitter': split,
  });

  return (
    <ul className={classNames} aria-label={label}>
      {children}
    </ul>
  );
};

export class AppNavbar extends React.Component {
  componentWillMount() {
    this.props.subscribeApplication(this.props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  render() {
    const { appName } = this.props;

    return (
      <nav
        className="app-navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="app-navbar__section app-navbar__section--splitter">
          <div className="app-navbar__badge">
            <AppBadge appName={appName} size="96" />
            <h2>{appName}</h2>
          </div>
        </div>
        <AppNavbarSection split label="Radix artefacts">
          <AppNavbarLink
            to={getAppJobsUrl(appName)}
            label="Jobs"
            icon={faCog}
          />
          <AppNavbarLink
            to={getAppDeploymentsUrl(appName)}
            label="Deployments"
            icon={faTruck}
          />
        </AppNavbarSection>
        <AppNavbarSection split label="Application config">
          <AppNavbarLink
            to={getAppConfigUrl(appName)}
            label="Configuration"
            icon={faWrench}
          />
        </AppNavbarSection>
        <AppNavbarSection>
          <StreamRefresh />
        </AppNavbarSection>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  envs: applicationState.getEnvironmentNames(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavbar);
