import { Button, Icon } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { NAV_ACTIONS } from '../globalTopNav.const'
import type { NavAction } from '../globalTopNav.types'
import styles from './navActions.module.css'

interface NavActionButtonProps {
  readonly action: NavAction
  readonly className?: string
  readonly onClick?: () => void
}

/**
 * Renders a navigation action button with an icon and optional short label.
 * Since the top navigation bar is a bit cramped, only the short label is displayed when available.
 */
const NavActionButton = (props: NavActionButtonProps) => {
  const { action, className, onClick } = props

  const linkProps = action.isExternal
    ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
    : { as: Link, to: action.href }

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={onClick}
      title={action.label}
      aria-label={action.label}
      {...linkProps}
    >
      <Icon data={action.icon} />
      {action.shortLabel}
    </Button>
  )
}

export const NavActions = () => (
  <nav className={styles.navActions} aria-label="Site actions">
    <ul>
      {NAV_ACTIONS.map((action) => (
        <li key={action.id}>
          <NavActionButton action={action} />
        </li>
      ))}
    </ul>
  </nav>
)
