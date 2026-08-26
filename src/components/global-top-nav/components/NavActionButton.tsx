import { Button, Icon } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import type { NavAction } from '../globalTopNav.types'

interface NavActionButtonProps {
  action: NavAction
  className?: string
  onClick?: () => void
  // Top-bar presentation: use the short label, or icon-only when the action opts in.
  compact?: boolean
}

export const NavActionButton = (props: NavActionButtonProps) => {
  const { action, className, onClick, compact } = props
  const iconOnly = compact === true && action.iconOnly === true
  const label = compact ? (action.shortLabel ?? action.label) : action.label

  const content = iconOnly ? (
    <Icon data={action.icon} />
  ) : (
    <>
      <Icon data={action.icon} />
      {label}
    </>
  )

  const iconOnlyLabel = iconOnly ? action.label : undefined

  const linkProps = action.isExternal ? { href: action.href, target: '_blank' } : { as: Link, to: action.href }

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={onClick}
      title={iconOnlyLabel}
      aria-label={iconOnlyLabel}
      {...linkProps}
    >
      {content}
    </Button>
  )
}
