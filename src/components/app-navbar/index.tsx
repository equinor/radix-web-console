import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import {
  type IconData,
  desktop_mac,
  engineering,
  external_link,
  first_page,
  last_page,
  send,
  settings,
  star_filled,
  star_outlined,
  world,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import { type FunctionComponent, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

import { configVariables } from '../../utils/config';
import { urlToAppMonitoring } from '../../utils/monitoring';
import {
  getAppConfigUrl,
  getAppDeploymentsUrl,
  getAppJobsUrl,
  getAppUrl,
  getEnvsUrl,
} from '../../utils/routing';
import { AppBadge } from '../app-badge';

import './style.css';
import { uniq } from 'lodash';
import useLocalStorage from '../../effects/use-local-storage';

type NavbarLinkItem = {
  label: string;
  to: string;
  icon: IconData;
  collapsed?: boolean;
};
type NavbarProps = { appName: string; links: Array<NavbarLinkItem> };

export interface AppNavbarProps {
  appName: string;
}

const radixClusterType = configVariables.RADIX_CLUSTER_TYPE;

const NavbarLink = ({ collapsed, ...link }: NavbarLinkItem) => {
  const NavbarLinkElement = forwardRef<
    HTMLAnchorElement,
    Parameters<typeof NavLink>[0] & NavbarLinkItem & { collapsed?: boolean }
  >(({ collapsed, icon, label, ...rest }, ref) => (
    <NavLink {...rest} ref={ref}>
      {collapsed ? (
        <Button variant="ghost_icon" color="secondary">
          <Icon data={icon} />
        </Button>
      ) : (
        <Typography variant="drawer_inactive" group="navigation">
          <Icon data={icon} /> {label}
        </Typography>
      )}
    </NavLink>
  ));

  return collapsed ? (
    <Tooltip title={link.label} placement="right" enterDelay={0}>
      <NavbarLinkElement {...link} collapsed />
    </Tooltip>
  ) : (
    <NavbarLinkElement
      className={({ isActive }) =>
        clsx('app-navbar__link', { 'app-navbar__link--active': isActive })
      }
      {...link}
    />
  );
};

const NavbarExpanded = ({ appName, links }: NavbarProps) => {
  const [favourites, setFacourites] = useLocalStorage<Array<string>>(
    'favouriteApplications',
    []
  );
  const isFavourite = favourites.includes(appName);
  const toggleFavouriteApp = (app: string) => {
    if (isFavourite) {
      setFacourites((old) => old.filter((a) => a !== app));
    } else {
      setFacourites((old) => uniq([...old, app]));
    }
  };

  return (
    <nav className="app-navbar" role="navigation" aria-label="Main navigation">
      <span className="grid app-navbar__splash">
        <NavLink to={getAppUrl(appName)} className="app-navbar__splash--icon">
          <AppBadge appName={appName} size={96} />
          <div className="grid grid--gap-small">
            <Typography variant="h5" token={{ textAlign: 'center' }}>
              {appName}
            </Typography>
            <Typography variant="overline" token={{ textAlign: 'center' }}>
              CLUSTER: {radixClusterType}
            </Typography>
          </div>
        </NavLink>

        <Tooltip
          title={`${isFavourite ? 'Remove from' : 'Add to'} favourites`}
          placement="right"
          enterDelay={0}
        >
          <Button
            className="app-navbar__splash--button"
            variant="ghost_icon"
            onClick={() => toggleFavouriteApp(appName)}
          >
            <Icon data={isFavourite ? star_filled : star_outlined} />
          </Button>
        </Tooltip>
      </span>

      {links.map((link) => (
        <NavbarLink key={link.to} {...link} />
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
};

const NavbarMinimized = ({ appName, links }: NavbarProps) => (
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
      <NavbarLink key={i} {...link} collapsed />
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

export const AppNavbar: FunctionComponent<AppNavbarProps> = ({ appName }) => {
  const [toggle, setToggle] = useLocalStorage('app-nav', false);

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

export default AppNavbar;
