import type * as CSS from 'csstype'

declare module 'csstype' {
  interface Properties {
    [index: `--${string}`]: any // Allow any CSS Custom Properties
  }
}
