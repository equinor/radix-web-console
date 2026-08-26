import { Button, Icon, Tabs } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { Link } from 'react-router'
import styles from '../globalTopNav.module.css'
import type { ClusterEntry } from '../globalTopNav.types'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'

interface ClusterTabsProps {
  clusters: ClusterEntry[]
  activeBaseUrl: string
}

export const ClusterTabs = (props: ClusterTabsProps) => {
  const { clusters, activeBaseUrl } = props
  const activeCluster = clusters.find(([, cluster]) => cluster.baseUrl === activeBaseUrl)
  const activeTabValue = activeCluster ? activeCluster[0] : ''

  const { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll } = useHorizontalScroll()

  return (
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
          {clusters.map(([name, cluster]) => (
            <Tabs.Tab as={Link} to={cluster.href} value={name} key={name}>
              {name}
            </Tabs.Tab>
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
  )
}
