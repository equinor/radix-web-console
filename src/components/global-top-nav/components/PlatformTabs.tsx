import { Button, Icon, Tabs } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import { useMemo } from 'react'
import { Link } from 'react-router'
import styles from '../globalTopNav.module.css'
import type { ClusterEntry } from '../globalTopNav.types'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'

interface PlatformTabsProps {
  readonly clusters: ReadonlyArray<ClusterEntry>
  readonly activeBaseUrl: string
}

// TODO: This should be tested with Playwright e2e tests to ensure proper keyboard navigation and scrolling behavior.
//       Storybook playwright is not enough to capture the tabbing issues we had earlier.
export const PlatformTabs = (props: PlatformTabsProps) => {
  const { clusters, activeBaseUrl } = props
  const activeCluster = clusters.find(([, cluster]) => cluster.baseUrl === activeBaseUrl)
  const activeTabValue = activeCluster ? activeCluster[0] : ''

  const { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll } = useHorizontalScroll()

  // Note: Tabs are not really meant to be used for navigation and gives some
  // interesting issues with keyboard navigation and focus management.
  // This fix keep the Tabs element stable so scroll/edge state changes don't re-render it,
  // which would retrigger EDS Tabs' keyboard focus management and steal focus.
  const tabsList = useMemo(
    () => (
      <Tabs className={styles.tabsScrollArea} activeTab={activeTabValue} scrollable>
        <Tabs.List className={styles.navLinks} ref={scrollContainerRef}>
          {clusters.map(([name, cluster]) => (
            <Tabs.Tab as={Link} to={cluster.href} value={name} key={name}>
              {name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    ),
    [clusters, activeTabValue, scrollContainerRef]
  )

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
      {tabsList}
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
