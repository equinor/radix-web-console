import { connect } from 'react-redux';
import React, { useState } from 'react';
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

import './style.css';
import { Tooltip, Button, Icon } from '@equinor/eds-core-react';
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

function GetIcon(props) {
  const toggle = props.toggle;
  if (toggle) {
    return <Icon data={first_page} />;
  }
  return <Icon data={last_page} />;
}

function ToggleNavBar(props) {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="app-navbar-collapse app-navbar__section--splitter">
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
          <div className="app-navbar__section app-navbar__section--splitter app-navbar__splash">
            <NavLink to={getAppUrl(props.name)} className="app-navbar__badge">
              <AppBadge appName={props.name} size="96" />
              <h1>{props.name}</h1>
              <h3>CLUSTER: PLACEHOLDER</h3>
            </NavLink>
          </div>
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
          <li>
            <a
              href={urlToAppMonitoring(props.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="app-navbar__link external"
            >
              <Icon data={desktop_mac} />
              Monitoring
              <Icon data={external_link} />
            </a>
          </li>
        </nav>
      )}
      {!toggle && (
        <nav
          className="app-navbar collapsed"
          role="navigation"
          aria-label="Main navigation"
        >
          <Tooltip enterDelay={0} placement="right" title={props.name}>
            <Button
              variant="ghost_icon"
              href={getAppUrl(props.name)}
              className="app-navbar__badge"
            >
              <AppBadge appName={props.name} size="24" />
            </Button>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Environments">
            <Button
              variant="ghost_icon"
              href={getEnvsUrl(props.name)}
              className="app-navbar__link"
            >
              <Icon data={world} />
            </Button>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Pipeline Jobs">
            <Button
              variant="ghost_icon"
              href={getAppJobsUrl(props.name)}
              className="app-navbar__link"
            >
              <Icon data={settings} />
            </Button>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Deployments">
            <Button
              variant="ghost_icon"
              href={getAppDeploymentsUrl(props.name)}
              className="app-navbar__link"
            >
              <Icon data={send} />
            </Button>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Configuration">
            <Button
              variant="ghost_icon"
              href={getAppConfigUrl(props.name)}
              className="app-navbar__link"
            >
              <Icon data={settings} />
            </Button>
          </Tooltip>
          <Tooltip enterDelay={0} placement="right" title="Monitoring">
            <Button
              variant="ghost_icon"
              href={urlToAppMonitoring(props.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="app-navbar__link"
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
