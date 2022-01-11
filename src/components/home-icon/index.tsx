import { getMonth } from 'date-fns';
import { Component } from 'react';

import './style.css';

export class HomeIcon extends Component<{}, { svgLogo: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo(): Promise<void> {
    const fileName =
      getMonth(new Date()) === 11 ? 'logo-radix-christmas' : 'logo-radix';

    const logo = await import('./' + fileName + '.svg');
    this.setState({ svgLogo: logo.default });
  }

  override render() {
    return (
      <img alt="Omnia Radix" className="home-icon" src={this.state.svgLogo} />
    );
  }
}
