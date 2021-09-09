import React from 'react';

import './style.css';

class HomeIcon extends React.Component {
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
    return (
      <img
        alt="Omnia Radix web console"
        className="home-icon"
        src={this.state.svgLogo}
      />
    );
  }
}

export default HomeIcon;
