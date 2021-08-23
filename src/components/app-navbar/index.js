import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBadge from '../app-badge';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as applicationState from '../../state/application';
import {
  getAppConfigUrl,
  getAppDeploymentsUrl,
  getAppJobsUrl,
  getAppUrl,
  getEnvsUrl,
} from '../../utils/routing';
import { urlToAppMonitoring } from '../../utils/monitoring';
import { keys as configKeys } from '../../utils/config/keys';
import configHandler from '../../utils/config';

import './style.css';
import {
  Tooltip,
  Button,
  Icon,
  Typography,
  List,
} from '@equinor/eds-core-react';
import {
  first_page,
  last_page,
  world,
  send,
  settings,
  desktop_mac,
  external_link,
} from '@equinor/eds-icons';

// Use local icon until it is available in EDS.
const engineering_black_24dp = {
  name: 'engineering_black_24dp',
  prefix: '',
  height: '24',
  width: '24',
  svgPathData:
    'M9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM3 19C3.22 18.28 6.31 17 9 17C11.7 17 14.8 18.29 15 19H3Z M4.74 9H5C5 11.21 6.79 13 9 13C11.21 13 13 11.21 13 9H13.26C13.53 9 13.75 8.78 13.75 8.51V8.49C13.75 8.22 13.53 8 13.26 8H13C13 6.52 12.19 5.25 11 4.55V5.5C11 5.78 10.78 6 10.5 6C10.22 6 10 5.78 10 5.5V4.14C9.68 4.06 9.35 4 9 4C8.65 4 8.32 4.06 8 4.14V5.5C8 5.78 7.78 6 7.5 6C7.22 6 7 5.78 7 5.5V4.55C5.81 5.25 5 6.52 5 8H4.74C4.47 8 4.25 8.22 4.25 8.49V8.52C4.25 8.78 4.47 9 4.74 9ZM11 9C11 10.1 10.1 11 9 11C7.9 11 7 10.1 7 9H11Z M21.9801 6.23L22.9101 5.4L22.1601 4.1L20.9701 4.49C20.8301 4.38 20.6701 4.29 20.5001 4.22L20.2501 3H18.7501L18.5001 4.22C18.3301 4.29 18.1701 4.38 18.0201 4.49L16.8401 4.1L16.0901 5.4L17.0201 6.23C17.0001 6.4 17.0001 6.58 17.0201 6.75L16.0901 7.6L16.8401 8.9L18.0401 8.52C18.1701 8.62 18.3201 8.7 18.4701 8.77L18.7501 10H20.2501L20.5201 8.78C20.6801 8.71 20.8201 8.63 20.9601 8.53L22.1501 8.91L22.9001 7.61L21.9701 6.76C22.0001 6.57 21.9901 6.4 21.9801 6.23ZM19.5001 7.75C18.8101 7.75 18.2501 7.19 18.2501 6.5C18.2501 5.81 18.8101 5.25 19.5001 5.25C20.1901 5.25 20.7501 5.81 20.7501 6.5C20.7501 7.19 20.1901 7.75 19.5001 7.75Z M19.4001 10.79L18.5501 11.07C18.4501 10.99 18.3401 10.93 18.2201 10.88L18.0401 10H16.9701L16.7901 10.87C16.6701 10.92 16.5501 10.99 16.4501 11.06L15.6101 10.78L15.0701 11.71L15.7301 12.3C15.7201 12.43 15.7201 12.55 15.7301 12.67L15.0701 13.28L15.6101 14.21L16.4701 13.94C16.5701 14.01 16.6701 14.07 16.7801 14.12L16.9601 15H18.0301L18.2201 14.13C18.3301 14.08 18.4401 14.02 18.5401 13.95L19.3901 14.22L19.9301 13.29L19.2701 12.68C19.2801 12.55 19.2801 12.43 19.2701 12.31L19.9301 11.72L19.4001 10.79ZM17.5001 13.39C17.0101 13.39 16.6101 12.99 16.6101 12.5C16.6101 12.01 17.0101 11.61 17.5001 11.61C17.9901 11.61 18.3901 12.01 18.3901 12.5C18.3901 12.99 17.9901 13.39 17.5001 13.39Z',
};

const AppNavbarLink = ({ icon, label, to }) => {
  const labelRender = icon ? (
    <React.Fragment>
      <Icon data={icon} /> {label}
    </React.Fragment>
  ) : (
    label
  );
  return (
    <List.Item>
      <NavLink
        to={to}
        activeClassName="app-navbar__link--active"
        className="app-navbar__link"
      >
        <Typography group="navigation" variant="drawer_inactive">
          {labelRender}
        </Typography>
      </NavLink>
    </List.Item>
  );
};

const radixClusterType = configHandler.getConfig(configKeys.RADIX_CLUSTER_TYPE);

function GetIcon(props) {
  const toggle = props.toggle;
  if (toggle) {
    return <Icon data={first_page} />;
  }
  return <Icon data={last_page} />;
}

function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function ToggleNavBar(props) {
  const [toggle, setToggle] = usePersistedState('app-nav', false);

  return (
    <>
      <div className="app-navbar-collapse">
        <Button variant="ghost_icon" onClick={() => setToggle(!toggle)}>
          <GetIcon toggle={toggle} />
        </Button>
      </div>
      {toggle && (
        <nav
          className="app-navbar"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink to={getAppUrl(props.name)} className="app-navbar__splash">
            <AppBadge appName={props.name} size="96" />
            <div className="grid grid--gap-small app-navbar--details">
              <Typography variant="h5" token={{ textAlign: 'center' }}>
                {props.name}
              </Typography>
              <Typography variant="overline" token={{ textAlign: 'center' }}>
                CLUSTER: {radixClusterType}
              </Typography>
            </div>
          </NavLink>
          <AppNavbarLink
            to={getEnvsUrl(props.name)}
            label="Environments"
            icon={world}
          />
          <AppNavbarLink
            to={getAppJobsUrl(props.name)}
            label="Pipeline Jobs"
            icon={engineering_black_24dp}
          />
          <AppNavbarLink
            to={getAppDeploymentsUrl(props.name)}
            label="Deployments"
            icon={send}
          />
          <AppNavbarLink
            to={getAppConfigUrl(props.name)}
            label="Configuration"
            icon={settings}
          />
          <List.Item>
            <Typography
              link
              href={urlToAppMonitoring(props.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="app-navbar__link"
              color="currentColor"
            >
              <Typography group="navigation" variant="drawer_inactive">
                <Icon data={desktop_mac} /> Monitoring
              </Typography>
              <Icon data={external_link} style={{ justifySelf: 'right' }} />
            </Typography>
          </List.Item>
        </nav>
      )}
      {!toggle && (
        <nav
          className="app-navbar collapsed"
          role="navigation"
          aria-label="Main navigation"
        >
          <Tooltip enterDelay={0} placement="right" title={props.name}>
            <NavLink to={getAppUrl(props.name)}>
              <Button variant="ghost_icon" color="secondary">
                <AppBadge appName={props.name} size="24" />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Environments">
            <NavLink to={getEnvsUrl(props.name)}>
              <Button variant="ghost_icon" color="secondary">
                <Icon data={world} />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Pipeline Jobs">
            <NavLink to={getAppJobsUrl(props.name)}>
              <Button variant="ghost_icon" color="secondary">
                <Icon data={engineering_black_24dp} />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Deployments">
            <NavLink to={getAppDeploymentsUrl(props.name)}>
              <Button variant="ghost_icon" color="secondary">
                <Icon data={send} />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Configuration">
            <NavLink to={getAppConfigUrl(props.name)}>
              <Button variant="ghost_icon" color="secondary">
                <Icon data={settings} />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Monitoring">
            <Button
              variant="ghost_icon"
              href={urlToAppMonitoring(props.name)}
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
            >
              <Icon data={desktop_mac} />
            </Button>
          </Tooltip>
        </nav>
      )}
    </>
  );
}

export class AppNavbar extends React.Component {
  render() {
    const { appName } = this.props;

    return (
      <>
        <ToggleNavBar name={appName} />
      </>
    );
  }
}

AppNavbar.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.array.isRequired,
};
NavLink.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state) => ({
  envs: applicationState.getEnvironmentNames(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
