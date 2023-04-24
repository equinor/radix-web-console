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
  star_filled,
  star_outlined,
  world,
} from '@equinor/eds-icons';
import {
  Dispatch as ReactDispatch,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';

import { AppBadge } from '../app-badge';
import { RootState } from '../../init/store';
import {
  getMemoizedFavouriteApplications,
  toggleFavouriteApp,
} from '../../state/applications-favourite';
import { configVariables } from '../../utils/config';
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
type NavbarProps = { appName: string; links: Array<NavbarLinkItem> };

interface AppNavbarDispatch {
  toggleFavouriteState?: (appName: string) => void;
}

interface AppNavbarState {
  isFavourite?: boolean;
}

export interface AppNavbarProps extends AppNavbarState, AppNavbarDispatch {
  appName: string;
}

const radixClusterType = configVariables.RADIX_CLUSTER_TYPE;

function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, ReactDispatch<T>] {
  const [state, setState] = useState<T>(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const NavbarLink = ({
  collapsed,
  ...link
}: NavbarLinkItem & { collapsed?: boolean }): JSX.Element => {
  const NavbarLinkElement = forwardRef<
    HTMLAnchorElement,
    Parameters<NavLink>[0] & NavbarLinkItem & { collapsed?: boolean }
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
      className="app-navbar__link"
      activeClassName="app-navbar__link--active"
      {...link}
    />
  );
};

const NavbarExpanded = ({
  appName,
  links,
  isFavourite,
  toggleFavouriteState: toggleFavouriteApp = () => {},
}: NavbarProps &
  Pick<
    AppNavbarProps,
    'isFavourite' | 'toggleFavouriteState'
  >): JSX.Element => (
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

    {links.map((link, i) => (
      <NavbarLink key={i} {...link} />
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

const NavbarMinimized = ({ appName, links }: NavbarProps): JSX.Element => (
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

export const AppNavbar = ({
  appName,
  ...rest
}: AppNavbarProps): JSX.Element => {
  const [toggle, setToggle] = usePersistedState('app-nav', false);

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
      {(toggle ? NavbarExpanded : NavbarMinimized)({ ...rest, appName, links })}
    </>
  );
};

function mapStateToProps(
  state: RootState,
  { appName }: AppNavbarProps
): AppNavbarState {
  return {
    isFavourite: !!getMemoizedFavouriteApplications(state).includes(appName),
  };
}

function mapDispatchToProps(dispatch: Dispatch): AppNavbarDispatch {
  return { toggleFavouriteState: (name) => dispatch(toggleFavouriteApp(name)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
