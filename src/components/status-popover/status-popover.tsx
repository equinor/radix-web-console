import { Chip, Icon, Popover, type PopoverProps } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import { type PropsWithChildren, type ReactNode, useEffect, useId, useRef, useState } from 'react'

import './style.css'

export type StatusPopoverType = 'success' | 'warning' | 'danger' | 'none' | 'default'

export type StatusPopoverProps = {
  readonly title?: ReactNode
  readonly icon?: ReactNode
  readonly type?: StatusPopoverType
  readonly label?: string
  readonly disablePopover?: boolean
} & Pick<PopoverProps, 'placement'>

export const StatusPopover = ({
  children,
  title,
  icon = <Icon data={info_circle} />,
  type,
  label,
  disablePopover,
  placement = 'top',
}: PropsWithChildren<StatusPopoverProps>) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentId = useId()

  const open = popoverOpen && !disablePopover

  const showPopover = () => setPopoverOpen(true)
  const hidePopover = () => setPopoverOpen(false)
  const togglePopover = () => setPopoverOpen((isOpen) => !isOpen)

  // With no visible label the chip is icon-only, so it needs an accessible name from the title.
  const iconOnlyLabel = !label && typeof title === 'string' ? title : undefined

  // WCAG: content shown on hover/focus must be dismissible with Escape.
  useEffect(() => {
    if (!open) return
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPopoverOpen(false)
    }
    window.addEventListener('keydown', dismissOnEscape)
    return () => window.removeEventListener('keydown', dismissOnEscape)
  }, [open])

  return (
    <div className="status-popover">
      <Popover open={open} anchorEl={containerRef.current} placement={placement}>
        {title && (
          <Popover.Header>
            <Popover.Title>{title}</Popover.Title>
          </Popover.Header>
        )}
        <Popover.Content id={contentId}>{children}</Popover.Content>
      </Popover>
      <Chip
        ref={containerRef}
        className={`status-popover-chip status-popover-chip-type__${type ?? 'default'}`}
        onClick={disablePopover ? undefined : togglePopover}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        onFocus={showPopover}
        onBlur={hidePopover}
        aria-haspopup={disablePopover ? undefined : 'dialog'}
        aria-expanded={disablePopover ? undefined : open}
        aria-controls={open ? contentId : undefined}
        aria-label={iconOnlyLabel}
      >
        {icon}
        {label && <span>{label}</span>}
      </Chip>
    </div>
  )
}
