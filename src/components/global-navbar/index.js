import React from 'react';
import classnames from 'classnames';

import './style.css';

const ENV_MAX_SHOW = 3;

const GlobalNavbarEnv = env =>
  env ? <GlobalNavbarLink key={env} label={env} /> : null;

const GlobalNavbarEnvs = ({ envs }) => {
  const reducedEnvs = envs
    .slice(0, ENV_MAX_SHOW)
    .map(env => GlobalNavbarEnv(env));

  const envDiff = envs.length - reducedEnvs.length;
  const moreEnvs = envDiff ? (
    <GlobalNavbarLink label={`(${envDiff} more)`} />
  ) : null;

  return (
    <React.Fragment>
      {reducedEnvs}
      {moreEnvs}
    </React.Fragment>
  );
};

const GlobalNavbarLink = ({ isActive, label }) => {
  const classNames = classnames('global-navbar__link', {
    'global-navbar__link--active': isActive,
  });

  return (
    <div className={classNames}>
      <a href="#todo">{label}</a>
    </div>
  );
};

const GlobalNavbarSection = ({ children, split }) => {
  const classNames = classnames('global-navbar__section', {
    'global-navbar__section--splitter': split,
  });

  return <div className={classNames}>{children}</div>;
};

export const GlobalNavbar = ({ envs }) => {
  return (
    <div className="global-navbar">
      <GlobalNavbarSection split>
        <GlobalNavbarEnvs envs={envs} />
      </GlobalNavbarSection>
      <GlobalNavbarSection split>
        <GlobalNavbarLink label="Environments" isActive />
        <GlobalNavbarLink label="Jobs" />
        <GlobalNavbarLink label="Deployments" />
      </GlobalNavbarSection>
      <GlobalNavbarSection>
        <GlobalNavbarLink label="Configuration" />
      </GlobalNavbarSection>
    </div>
  );
};
