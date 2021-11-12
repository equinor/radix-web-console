import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import {
  desktop_mac,
  engineering,
  external_link,
  first_page,
  IconData,
  last_page,
  send,
  settings,
  world,
} from '@equinor/eds-icons';
import { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { RootState } from '../../init/store';
import { getEnvironmentNames } from '../../state/application';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';
import { urlToAppMonitoring } from '../../utils/monitoring';
import {
  getAppConfigUrl,
  getAppDeploymentsUrl,
  getAppJobsUrl,
  getAppUrl,
  getEnvsUrl,
} from '../../utils/routing';

import './style.css';

type NavbarLinkItem = { label: string; to: string; icon: IconData };

interface AppNavbarEnvs {
  envs: Array<string>;
}

export interface AppNavbarProps extends AppNavbarEnvs {
  appName: string;
}

const radixClusterType: string = configHandler.getConfig(
  configKeys.RADIX_CLUSTER_TYPE
);

function usePersistedState<T>(key: string, defaultValue: T): [T, Dispatch<T>] {
  const [state, setState] = useState<T>(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function NavbarLink(
  link: NavbarLinkItem & { collapsed?: boolean }
): JSX.Element {
  const navElement = (
    <NavLink
      to={link.to}
      {...(link.collapsed
        ? undefined
        : {
            activeClassName: 'app-navbar__link--active',
            className: 'app-navbar__link',
          })}
    >
      {link.collapsed ? (
        <Button variant="ghost_icon" color="secondary">
          <Icon data={link.icon} />
        </Button>
      ) : (
        <Typography variant="drawer_inactive" group="navigation">
          <Icon data={link.icon} /> {link.label}
        </Typography>
      )}
    </NavLink>
  );

  return link.collapsed ? (
    <Tooltip title={link.label} placement="right" enterDelay={0}>
      {navElement}
    </Tooltip>
  ) : (
    navElement
  );
}

const NavbarExpanded = ({
  appName,
  links,
}: {
  appName: string;
  links: Array<NavbarLinkItem>;
}): JSX.Element => (
  <nav className="app-navbar" role="navigation" aria-label="Main navigation">
    <NavLink to={getAppUrl(appName)} className="app-navbar__splash">
      <AppBadge appName={appName} size={96} />
      <div className="grid grid--gap-small app-navbar--details">
        <Typography variant="h5" token={{ textAlign: 'center' }}>
          {appName}
        </Typography>
        <Typography variant="overline" token={{ textAlign: 'center' }}>
          CLUSTER: {radixClusterType}
        </Typography>
      </div>
    </NavLink>
    {links.map((link, i) => (
      <NavbarLink label={link.label} icon={link.icon} to={link.to} key={i} />
    ))}
    <Typography
      link
      className="app-navbar__link"
      href={urlToAppMonitoring(appName)}
      color="currentColor"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Typography variant="drawer_inactive" group="navigation">
        <Icon data={desktop_mac} /> Monitoring
      </Typography>
      <Icon data={external_link} style={{ justifySelf: 'right' }} />
    </Typography>
  </nav>
);

const NavbarMinimized = ({
  appName,
  links,
}: {
  appName: string;
  links: Array<NavbarLinkItem>;
}): JSX.Element => (
  <nav
    className="app-navbar collapsed"
    role="navigation"
    aria-label="Main navigation"
  >
    <Tooltip title={appName} placement="right" enterDelay={0}>
      <NavLink to={getAppUrl(appName)}>
        <Button variant="ghost_icon" color="secondary">
          <AppBadge appName={appName} size={24} />
        </Button>
      </NavLink>
    </Tooltip>
    {links.map((link, i) => (
      <NavbarLink
        label={link.label}
        icon={link.icon}
        to={link.to}
        collapsed
        key={i}
      />
    ))}
    <Tooltip title="Monitoring" placement="right" enterDelay={0}>
      <Typography
        link
        href={urlToAppMonitoring(appName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost_icon" color="secondary">
          <Icon data={desktop_mac} />
        </Button>
      </Typography>
    </Tooltip>
  </nav>
);

export const AppNavbar = (props: AppNavbarProps): JSX.Element => {
  const { appName } = props;
  const [toggle, setToggle] = usePersistedState<boolean>('app-nav', false);

  const links: Array<NavbarLinkItem> = [
    { label: 'Environments', to: getEnvsUrl(appName), icon: world },
    { label: 'Pipeline Jobs', to: getAppJobsUrl(appName), icon: engineering },
    { label: 'Deployments', to: getAppDeploymentsUrl(appName), icon: send },
    { label: 'Configuration', to: getAppConfigUrl(appName), icon: settings },
  ];

  return (
    <>
      <div className="app-navbar-collapse">
        <Button variant="ghost_icon" onClick={() => setToggle(!toggle)}>
          <Icon data={toggle ? first_page : last_page} />
        </Button>
      </div>
      {toggle ? (
        <NavbarExpanded appName={appName} links={links} />
      ) : (
        <NavbarMinimized appName={appName} links={links} />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState): AppNavbarEnvs => ({
  envs: getEnvironmentNames(state),
});

export default connect(mapStateToProps)(AppNavbar);
