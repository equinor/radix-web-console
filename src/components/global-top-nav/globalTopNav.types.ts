import type { IconData } from '@equinor/eds-icons'

interface Cluster {
  href: string
  baseUrl: string
  isDev?: boolean
  isPlayground?: boolean
}

export type ClusterEntry = [name: string, cluster: Cluster]

export interface NavAction {
  id: string
  icon: IconData
  href: string
  isExternal: boolean
  label: string
  /** Short label for desktop */
  shortLabel?: string
}
