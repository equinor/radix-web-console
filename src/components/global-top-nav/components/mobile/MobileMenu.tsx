import { Button, Icon } from '@equinor/eds-core-react'
import { close, menu } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router'
import type { ClusterEntry } from '../../globalTopNav.types'
import { MobileMenuActions } from './MobileMenuActions'
import styles from './mobileMenu.module.css'

interface MobileMenuProps {
  clusters: ClusterEntry[]
  activeBaseUrl: string
}

export const MobileMenu = (props: MobileMenuProps) => {
  const { clusters, activeBaseUrl } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.mobileMenu}>
      <Button
        variant="ghost_icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <Icon data={isOpen ? close : menu} />
      </Button>
      <nav className={clsx(styles.panel, { [styles.panelOpen]: isOpen })}>
        <ul className={styles.links}>
          {clusters.map(([name, cluster]) => (
            <li key={name}>
              <Link
                to={cluster.href}
                aria-current={cluster.baseUrl === activeBaseUrl ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <MobileMenuActions onNavigate={() => setIsOpen(false)} />
      </nav>
    </div>
  )
}
