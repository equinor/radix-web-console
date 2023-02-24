import { Chip, Icon, Popover, PopoverProps } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { ReactNode, useRef, useState } from 'react';

import './style.css';

export type StatusPopoverType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusPopoverProps = {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  icon?: ReactNode;
  type?: StatusPopoverType;
} & Pick<PopoverProps, 'placement'>;

export const StatusPopover = ({
  children,
  className,
  title,
  icon = <Icon data={info_circle} />,
  type,
  placement = 'top',
}: StatusPopoverProps): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const chipRef = useRef<HTMLDivElement>(null);

  return (
    <div className="status-popover">
      <Popover
        open={popoverOpen}
        anchorEl={chipRef.current}
        placement={placement}
      >
        {!!title && (
          <Popover.Header>
            <Popover.Title children={title} />
          </Popover.Header>
        )}
        <Popover.Content className={className}>{children}</Popover.Content>
      </Popover>
      <Chip
        className={`status-popover-chip status-popover-chip-type__${
          type ?? 'default'
        }`}
        ref={chipRef}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {icon}
      </Chip>
    </div>
  );
};
