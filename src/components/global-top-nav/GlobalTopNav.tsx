import { Button, Icon, Tabs, TopBar } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { configVariables } from '../../utils/config'
import { HomeLogo } from '../home-logo'
import { MobileMenu } from './components/MobileMenu'
import { NavActions } from './components/NavActions'
import { TabItemTemplate } from './components/TabItemTemplate'
import styles from './globalTopNav.module.css'
import type { ClusterEntry } from './globalTopNav.types'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import { StyledToastContainer } from './styled-toaster'

const DOCUMENTATION_TAB_VALUE = 'documentation'

export const GlobalTopNav = () => {
  const radixClusterBase = configVariables.RADIX_DNS_ZONE
  const clusters = Object.entries(configVariables.CLUSTERS) as ClusterEntry[]
  const visibleClusters = clusters.filter(([, cluster]) => {
    const isHiddenDev = cluster.isDev && configVariables.RADIX_CLUSTER_TYPE !== 'development'
    return !isHiddenDev || cluster.baseUrl === radixClusterBase
  })

  const activeCluster = visibleClusters.find(([, cluster]) => cluster.baseUrl === radixClusterBase)
  const activeTabValue = activeCluster ? activeCluster[0] : DOCUMENTATION_TAB_VALUE

  const { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll } = useHorizontalScroll()

  return (
    <TopBar className={styles.globalTopNav}>
      <TopBar.Header>
        <HomeLogo />
      </TopBar.Header>
      <TopBar.CustomContent className={styles.tabsCell}>
        <div className={styles.tabsWrapper}>
          {canScroll && (
            <Button
              className={styles.tabScrollButton}
              variant="ghost_icon"
              onClick={() => scrollBy('left')}
              aria-hidden="true"
              tabIndex={-1}
              disabled={isStartReached}
            >
              <Icon data={chevron_left} />
            </Button>
          )}
          <Tabs className={styles.tabsScrollArea} activeTab={activeTabValue} scrollable>
            <Tabs.List className={styles.navLinks} ref={scrollContainerRef}>
              {visibleClusters.map(([name, cluster]) => (
                <TabItemTemplate href={cluster.href} value={name} key={name}>
                  {name}
                </TabItemTemplate>
              ))}
            </Tabs.List>
          </Tabs>
          {canScroll && (
            <Button
              className={styles.tabScrollButton}
              variant="ghost_icon"
              onClick={() => scrollBy('right')}
              aria-hidden="true"
              tabIndex={-1}
              disabled={isEndReached}
            >
              <Icon data={chevron_right} />
            </Button>
          )}
        </div>
      </TopBar.CustomContent>
      <TopBar.Actions className={styles.navIconLinks}>
        <NavActions />
        <MobileMenu clusters={visibleClusters} activeBaseUrl={radixClusterBase} />
      </TopBar.Actions>
      <StyledToastContainer />
    </TopBar>
  )
}
