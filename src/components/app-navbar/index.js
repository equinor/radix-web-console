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
            icon={settings}
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
                <Icon data={settings} />
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
