import type { IconData } from '@equinor/eds-icons'

export interface Cluster {
  href: string
  baseUrl: string
  isDev?: boolean
  isPlayground?: boolean
}

export type ClusterEntry = [name: string, cluster: Cluster]

export interface NavAction {
  id: string
  label: string
  icon: IconData
  href: string
  isExternal: boolean
  // When true the action lives in the mobile menu; otherwise it stays in the top bar.
  showInMobileMenu: boolean
  // Compact top-bar presentation; the mobile menu always uses the full label.
  shortLabel?: string
  iconOnly?: boolean
}
