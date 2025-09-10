import { clsx } from 'clsx'
import { getDayOfYear } from 'date-fns'
import { Component } from 'react'

import './style.css'

function isEasterTime(date: Date): boolean {
  const year = date.getFullYear()
  const a = Math.trunc(year % 19)
  const b = Math.trunc(year / 100)
  const c = Math.trunc(year % 100)
  const d = Math.trunc(b / 4)
  const e = Math.trunc(b % 4)
  const f = Math.trunc((b + 8) / 25)
  const g = Math.trunc((b - f + 1) / 3)
  const h = Math.trunc((19 * a + b - d - g + 15) % 30)
  const i = Math.trunc(c / 4)
  const k = Math.trunc(c % 4)
  const l = Math.trunc((32 + 2 * e + 2 * i - h - k) % 7)
  const m = Math.trunc((a + 11 * h + 22 * l) / 451)
  const month = Math.trunc((h + l - 7 * m + 114) / 31)
  const day = Math.trunc(((h + l - 7 * m + 114) % 31) + 1)

  const today = getDayOfYear(date)
  const easter = getDayOfYear(new Date(year, month - 1, day))
  return today > easter - 14 && today < easter + 3
}

function isAprilFirst(date: Date): boolean {
  return date.getMonth() === 3 && date.getDate() === 1
}

function isHalloween(date: Date): boolean {
  return date.getMonth() === 9 && date.getDate() === 31
}

function isDecember(date: Date): boolean {
  return date.getMonth() === 11
}

export class HomeIcon extends Component<{ style?: React.CSSProperties }, { svgLogo?: string }> {
  private isLoaded: boolean

  constructor(props: { style?: React.CSSProperties }) {
    super(props)
    this.state = {}
    this.isLoaded = true
  }

  private async fetchLogo(date: Date): Promise<typeof import('*.svg')> {
    const filename = isEasterTime(date)
      ? 'logo-radix-easter'
      : isHalloween(date)
        ? 'logo-radix-halloween'
        : isDecember(date)
          ? 'logo-radix-christmas'
          : 'logo-radix'
    return await import(`./logos/${filename}.svg`)
  }

  override componentDidMount() {
    this.fetchLogo(new Date())
      .then((logo) => this.isLoaded && this.setState({ svgLogo: logo.default }))
      .catch(() => void 0) // noop
  }

  override componentWillUnmount() {
    this.isLoaded = false
  }

  override render() {
    return (
      <img
        alt=""
        className={clsx('home-icon', {
          'home-icon--401': isAprilFirst(new Date()),
        })}
        style={this.props.style}
        src={this.state.svgLogo}
      />
    )
  }
}
