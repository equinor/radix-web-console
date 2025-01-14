import {
  Chip,
  Icon,
  Popover,
  type PopoverProps,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import {
  type PropsWithChildren,
  type ReactNode,
  useRef,
  useState,
} from 'react';

import './style.css';

export type StatusPopoverType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusPopoverProps = {
  title?: ReactNode;
  icon?: ReactNode;
  type?: StatusPopoverType;
  label?: string;
} & Pick<PopoverProps, 'placement'>;

export const StatusPopover = ({
  children,
  title,
  icon = <Icon data={info_circle} />,
  type,
  label,
  placement = 'top',
}: PropsWithChildren<StatusPopoverProps>) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={'status-popover'}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
    >
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
        <Popover.Content>{children}</Popover.Content>
      </Popover>
      <Chip
        ref={containerRef}
        className={`status-popover-chip status-popover-chip-type__${
          type ?? 'default'
        }`}
      >
        {icon}
        {label ? <span>{label}</span> : ''}
      </Chip>
    </div>
  );
};
