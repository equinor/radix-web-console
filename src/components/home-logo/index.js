import React from 'react';

import routes from '../../routes';

import './style.css';

const HomeLogo = ({ svgLogo }) => (
  <a href={routes.home} className="home-logo">
    <img
      alt="Omnia Radix web console"
      className="home-logo__img"
      src={svgLogo}
    />
    Omnia Radix
  </a>
);

class LogoFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo() {
    const logo = await import(`./logo-radix.svg`);
    this.setState({ svgLogo: logo.default });
  }

  render() {
    return <HomeLogo svgLogo={this.state.svgLogo} />;
  }
}

export default LogoFetcher;
