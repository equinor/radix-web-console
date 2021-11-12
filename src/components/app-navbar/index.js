import {
  Button,
  Icon,
  List,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import {
  desktop_mac,
  engineering,
  external_link,
  first_page,
  last_page,
  send,
  settings,
  world,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { getEnvironmentNames } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
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

const AppNavbarLink = ({ icon, label, to }) => {
  const labelRender = (
    <>
      {icon && <Icon data={icon} />} {icon && label}
    </>
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
  const [state, setState] = useState(
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
      {toggle ? (
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
            icon={engineering}
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
      ) : (
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
                <Icon data={engineering} />
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

export class AppNavbar extends Component {
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
  envs: getEnvironmentNames(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () => dispatch(subscribeApplication(appName)),
  unsubscribeApplication: () => dispatch(unsubscribeApplication(appName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
