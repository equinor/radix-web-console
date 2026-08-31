import { Icon } from '@equinor/eds-core-react'
import type { IconData } from '@equinor/eds-icons'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './mobileMenu.module.css'

interface MobileMenuItemProps {
  readonly icon?: IconData
  readonly active?: boolean
  readonly to?: string
  readonly href?: string
  readonly onClick?: () => void
  readonly children: ReactNode
}

export const MobileMenuItem = (props: MobileMenuItemProps) => {
  const { icon, active, to, href, onClick, children } = props

  const content = (
    <>
      {icon && <Icon data={icon} />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link className={styles.item} to={to} aria-current={active ? 'page' : undefined} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={styles.item} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button className={styles.item} type="button" onClick={onClick}>
      {content}
    </button>
  )
}
