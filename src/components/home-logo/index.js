import { NavLink } from 'react-router-dom';
import React from 'react';

import { keys as configKeys } from '../../utils/config/keys';
import configHandler from '../../utils/config';
import routes from '../../routes';

import './style.css';

const HomeLogo = ({ svgLogo }) => (
  <NavLink to={routes.home}>
    <img
      alt="Omnia Radix web console"
      className="home-logo__img"
      src={svgLogo}
    />
    <span className="home-logo">Omnia Radix</span>
  </NavLink>
);

class LogoFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo() {
    const clusterType = configHandler.getConfig(configKeys.RADIX_CLUSTER_TYPE);
    const logo = await import(`./logo-radix.svg`);
    this.setState({ svgLogo: logo.default });
  }

  render() {
    return <HomeLogo svgLogo={this.state.svgLogo} />;
  }
}

export default LogoFetcher;
