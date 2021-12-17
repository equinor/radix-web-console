import { Component } from 'react';

import './style.css';

export class HomeIcon extends Component<{}, { svgLogo: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo(): Promise<void> {
    const logo = await import(`./logo-radix-christmas.svg`);
    this.setState({ svgLogo: logo.default });
  }

  override render() {
    return (
      <img alt="Omnia Radix" className="home-icon" src={this.state.svgLogo} />
    );
  }
}
