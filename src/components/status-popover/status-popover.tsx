import { Chip, Icon, Popover, type PopoverProps } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import {
  type FunctionComponent,
  type PropsWithChildren,
  type ReactNode,
  useRef,
  useState,
} from 'react'

import './style.css'

export type StatusPopoverType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default'

export type StatusPopoverProps = {
  className?: string
  title?: ReactNode
  icon?: ReactNode
  type?: StatusPopoverType
} & Pick<PopoverProps, 'placement'>

export const StatusPopover: FunctionComponent<
  PropsWithChildren<StatusPopoverProps>
> = ({
  children,
  className,
  title,
  icon = <Icon data={info_circle} />,
  type,
  placement = 'top',
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="status-popover">
      <Popover
        open={popoverOpen}
        anchorEl={containerRef.current}
        placement={placement}
      >
        {title && (
          <Popover.Header>
            <Popover.Title>{title}</Popover.Title>
          </Popover.Header>
        )}
        <Popover.Content className={className}>{children}</Popover.Content>
      </Popover>
      <Chip
        className={`status-popover-chip status-popover-chip-type__${
          type ?? 'default'
        }`}
        ref={containerRef}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {icon}
      </Chip>
    </div>
  )
}
