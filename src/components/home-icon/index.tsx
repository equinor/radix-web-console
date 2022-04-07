import { getDayOfYear, getMonth, getYear } from 'date-fns';
import { Component } from 'react';

import './style.css';

function isEasterTime() {
  const year = getYear(new Date());
  const a: number = Math.trunc(year % 19);
  const b: number = Math.trunc(year / 100);
  const c: number = Math.trunc(year % 100);
  const d: number = Math.trunc(b / 4);
  const e: number = Math.trunc(b % 4);
  const f: number = Math.trunc((b + 8) / 25);
  const g: number = Math.trunc((b - f + 1) / 3);
  const h: number = Math.trunc((19 * a + b - d - g + 15) % 30);
  const i: number = Math.trunc(c / 4);
  const k: number = Math.trunc(c % 4);
  const l: number = Math.trunc((32 + 2 * e + 2 * i - h - k) % 7);
  const m: number = Math.trunc((a + 11 * h + 22 * l) / 451);
  const month: number = Math.trunc((h + l - 7 * m + 114) / 31);
  const day: number = Math.trunc(((h + l - 7 * m + 114) % 31) + 1);

  return (
    getDayOfYear(new Date()) >
      getDayOfYear(new Date(year, month - 1, day)) - 14 &&
    getDayOfYear(new Date()) < getDayOfYear(new Date(year, month - 1, day)) + 3
  );
}

function isAprilFirst() {
  const year = getYear(new Date());
  return getDayOfYear(new Date()) === getDayOfYear(new Date(year, 3, 1));
}

export class HomeIcon extends Component<{}, { svgLogo: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo(): Promise<void> {
    const fileName =
      getMonth(new Date()) === 11
        ? 'logo-radix-christmas'
        : isEasterTime()
        ? 'logo-radix-easter'
        : 'logo-radix';

    const logo = await import('./' + fileName + '.svg');
    this.setState({ svgLogo: logo.default });
  }

  override render() {
    return (
      <img
        alt="Omnia Radix"
        className="home-icon"
        src={this.state.svgLogo}
        style={{ transform: isAprilFirst() && 'rotate(180deg)' }}
      />
    );
  }
}
