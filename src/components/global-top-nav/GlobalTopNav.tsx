import { TopBar } from '@equinor/eds-core-react'
import { configVariables } from '../../utils/config'
import { HomeLogo } from '../home-logo'
import { ClusterTabs } from './components/ClusterTabs'
import { MobileMenu } from './components/mobile/MobileMenu'
import { NavActions } from './components/NavActions'
import styles from './globalTopNav.module.css'
import type { ClusterEntry } from './globalTopNav.types'
import { StyledToastContainer } from './styled-toaster'

export const GlobalTopNav = () => {
  const radixClusterBase = configVariables.RADIX_DNS_ZONE
  const clusters = Object.entries(configVariables.CLUSTERS) as ClusterEntry[]
  const visibleClusters = clusters.filter(([, cluster]) => {
    const isHiddenDev = cluster.isDev && configVariables.RADIX_CLUSTER_TYPE !== 'development'
    return !isHiddenDev || cluster.baseUrl === radixClusterBase
  })

  return (
    <TopBar className={styles.globalTopNav}>
      <TopBar.Header>
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent className={styles.tabsCell}>
        <ClusterTabs clusters={visibleClusters} activeBaseUrl={radixClusterBase} />
      </TopBar.CustomContent>
      <TopBar.Actions className={styles.navIconLinks}>
        <NavActions />
        <MobileMenu clusters={visibleClusters} activeBaseUrl={radixClusterBase} />
      </TopBar.Actions>
      <StyledToastContainer />
    </TopBar>
  )
}
