import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube,
  faCubes,
  faCog,
  faGlobe,
  faTruck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

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
  const classNames = classnames('global-navbar__link', {
    'global-navbar__link--has-icon': icon,
  });

  const labelRender = icon ? (
    <React.Fragment>
      <FontAwesomeIcon icon={icon} /> {label}
    </React.Fragment>
  ) : (
    label
  );
  return (
    <NavLink
      to={to}
      activeClassName="global-navbar__link--active"
      className={classNames}
    >
      {labelRender}
    </NavLink>
  );
};

const GlobalNavbarSection = ({ children, split }) => {
  const classNames = classnames('global-navbar__section', {
    'global-navbar__section--splitter': split,
  });

  return <div className={classNames}>{children}</div>;
};

export const GlobalNavbar = ({ appName, envs }) => {
  return (
    <div className="global-navbar">
      <GlobalNavbarSection split>
        <GlobalNavbarEnvs appName={appName} envs={envs} />
      </GlobalNavbarSection>
      <GlobalNavbarSection split>
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
      <GlobalNavbarSection>
        <GlobalNavbarLink
          to={getAppConfigUrl(appName)}
          label="Configuration"
          icon={faWrench}
        />
      </GlobalNavbarSection>
    </div>
  );
};
