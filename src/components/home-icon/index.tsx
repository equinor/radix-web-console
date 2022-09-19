import { getDayOfYear } from 'date-fns';
import { Component } from 'react';

import './style.css';

function isEasterTime(): boolean {
  const now = new Date();

  const year = now.getFullYear();
  const a = Math.trunc(year % 19);
  const b = Math.trunc(year / 100);
  const c = Math.trunc(year % 100);
  const d = Math.trunc(b / 4);
  const e = Math.trunc(b % 4);
  const f = Math.trunc((b + 8) / 25);
  const g = Math.trunc((b - f + 1) / 3);
  const h = Math.trunc((19 * a + b - d - g + 15) % 30);
  const i = Math.trunc(c / 4);
  const k = Math.trunc(c % 4);
  const l = Math.trunc((32 + 2 * e + 2 * i - h - k) % 7);
  const m = Math.trunc((a + 11 * h + 22 * l) / 451);
  const month = Math.trunc((h + l - 7 * m + 114) / 31);
  const day = Math.trunc(((h + l - 7 * m + 114) % 31) + 1);

  const today = getDayOfYear(now);
  const easter = getDayOfYear(new Date(year, month - 1, day));
  return today > easter - 14 && today < easter + 3;
}

function isAprilFirst(): boolean {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 1;
}

function isHalloween(): boolean {
  const now = new Date();
  return now.getMonth() === 9 && now.getDate() === 31;
}

export class HomeIcon extends Component<{}, { svgLogo: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { svgLogo: '' };
    this.fetchLogo();
  }

  async fetchLogo(): Promise<void> {
    const fileName: string =
      new Date().getMonth() === 11
        ? 'logo-radix-christmas'
        : isEasterTime()
        ? 'logo-radix-easter'
        : isHalloween()
        ? 'logo-radix-halloween'
        : 'logo-radix';

    const logo: typeof import('*.svg') = await import(`./${fileName}.svg`);
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
