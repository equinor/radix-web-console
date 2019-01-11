import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeAfrica,
  faCubes,
  // faCog,
  // faTruck,
  // faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import StreamRefresh from '../stream-refresh';

import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as applicationState from '../../state/application';
import {
  // getAppConfigUrl,
  // getAppDeploymentsUrl,
  getAppEnvsUrl,
  // getAppJobsUrl,
  getEnvUrl,
} from '../../utils/routing';

import './style.css';

const ENV_MAX_SHOW = 3;

const AppNavbarEnv = (appName, env) =>
  env ? (
    <AppNavbarLink
      icon={faGlobeAfrica}
      key={env}
      label={env}
      to={getEnvUrl(appName, env)}
    />
  ) : null;

const AppNavbarEnvs = ({ appName, envs }) => {
  const reducedEnvs = envs
    .slice(0, ENV_MAX_SHOW)
    .map(env => AppNavbarEnv(appName, env));

  const envDiff = envs.length - reducedEnvs.length;
  const moreEnvs = envDiff ? (
    <AppNavbarLink
      icon={faCubes}
      to={getAppEnvsUrl(appName)}
      label={`(${envDiff} more)`}
    />
  ) : null;

  return (
    <React.Fragment>
      {reducedEnvs}
      {moreEnvs}
    </React.Fragment>
  );
};

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
    const { appName, envs } = this.props;
    const envsRender =
      envs && envs.length ? (
        <AppNavbarSection split label="Environments">
          <AppNavbarEnvs appName={appName} envs={envs} />
        </AppNavbarSection>
      ) : null;

    return (
      <nav
        className="app-navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        {envsRender}
        {/*
        <AppNavbarSection split label="Environment details">
          <AppNavbarLink
            to={getAppEnvsUrl(appName)}
            label="Environments"
            icon={faCubes}
            isActive
          />
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
        <AppNavbarSection label="Environment configuration">
          <AppNavbarLink
            to={getAppConfigUrl(appName)}
            label="Configuration"
            icon={faWrench}
          />
        </AppNavbarSection>
        */}
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
