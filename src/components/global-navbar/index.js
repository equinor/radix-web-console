import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube,
  faCubes,
  faCog,
  faTruck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getAppConfigUrl,
  getAppDeploymentsUrl,
  getAppEnvsUrl,
  getAppJobsUrl,
  getEnvUrl,
} from '../../utils/routing';

import './style.css';

const ENV_MAX_SHOW = 3;

const GlobalNavbarEnv = (appName, env) =>
  env ? (
    <GlobalNavbarLink
      icon={faCube}
      key={env}
      label={env}
      to={getEnvUrl(appName, env)}
    />
  ) : null;

const GlobalNavbarEnvs = ({ appName, envs }) => {
  const reducedEnvs = envs
    .slice(0, ENV_MAX_SHOW)
    .map(env => GlobalNavbarEnv(appName, env));

  const envDiff = envs.length - reducedEnvs.length;
  const moreEnvs = envDiff ? (
    <GlobalNavbarLink
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

const GlobalNavbarLink = ({ icon, label, to }) => {
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
        activeClassName="global-navbar__link--active"
        className="global-navbar__link"
        exact
      >
        {labelRender}
      </NavLink>
    </li>
  );
};

const GlobalNavbarSection = ({ children, label, split }) => {
  const classNames = classnames('global-navbar__section', {
    'global-navbar__section--splitter': split,
  });

  return (
    <ul className={classNames} aria-label={label}>
      {children}
    </ul>
  );
};

export const GlobalNavbar = ({ appName, envs }) => {
  const envsRender =
    envs && envs.length ? (
      <GlobalNavbarSection split label="Environments">
        <GlobalNavbarEnvs appName={appName} envs={envs} />
      </GlobalNavbarSection>
    ) : null;

  return (
    <nav
      className="global-navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      {envsRender}
      <GlobalNavbarSection split label="Environment details">
        <GlobalNavbarLink
          to={getAppEnvsUrl(appName)}
          label="Environments"
          icon={faCubes}
          isActive
        />
        <GlobalNavbarLink
          to={getAppJobsUrl(appName)}
          label="Jobs"
          icon={faCog}
        />
        <GlobalNavbarLink
          to={getAppDeploymentsUrl(appName)}
          label="Deployments"
          icon={faTruck}
        />
      </GlobalNavbarSection>
      <GlobalNavbarSection label="Environment configuration">
        <GlobalNavbarLink
          to={getAppConfigUrl(appName)}
          label="Configuration"
          icon={faWrench}
        />
      </GlobalNavbarSection>
    </nav>
  );
};

GlobalNavbar.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.array.isRequired,
};
