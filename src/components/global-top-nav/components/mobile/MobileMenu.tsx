import { Button, Icon } from '@equinor/eds-core-react'
import { close, menu } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { useState } from 'react'
import type { ClusterEntry } from '../../globalTopNav.types'
import { MobileMenuActions } from './MobileMenuActions'
import { MobileMenuItem } from './MobileMenuItem'
import styles from './mobileMenu.module.css'

interface MobileMenuProps {
  readonly clusters: ReadonlyArray<ClusterEntry>
  readonly activeBaseUrl: string
}

export const MobileMenu = (props: MobileMenuProps) => {
  const { clusters, activeBaseUrl } = props
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Toggle the mobile menu open or closed.
   * Prevents the user from scrolling the page when the menu is open.
   */
  const toggleMenu = () => {
    const nextOpen = !isOpen
    setIsOpen(nextOpen)

    const scroller = document.querySelector<HTMLElement>('.page-root-layout-base')
    if (scroller) {
      scroller.style.overflow = nextOpen ? 'hidden' : ''
    }
  }

  return (
    <div className={styles.mobileMenu}>
      <Button
        variant="ghost_icon"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <Icon data={isOpen ? close : menu} />
      </Button>
      <nav className={clsx(styles.panel, { [styles.panelOpen]: isOpen })}>
        <section className={styles.clusters}>
          {clusters.map(([name, cluster]) => (
            <MobileMenuItem
              key={name}
              to={cluster.href}
              active={cluster.baseUrl === activeBaseUrl}
              onClick={toggleMenu}
            >
              {name}
            </MobileMenuItem>
          ))}
        </section>
        <MobileMenuActions onNavigate={toggleMenu} />
      </nav>
    </div>
  )
}
