import {
  Chip,
  Icon,
  Popover,
  PopoverProps,
  PopoverTitleProps,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { ReactNode, useRef, useState } from 'react';

import './style.css';

export type StatusPopoverType = 'success' | 'warning' | 'danger' | 'none';

export type StatusPopoverProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  type?: StatusPopoverType;
} & Pick<PopoverProps, 'placement'> &
  Pick<PopoverTitleProps, 'title'>;

export const StatusPopover = ({
  children,
  className,
  title,
  icon = <Icon data={info_circle} />,
  type = 'none',
  ...rest
}: StatusPopoverProps): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const chipRef = useRef<HTMLDivElement>();

  return (
    <div className="status-popover">
      <Popover open={popoverOpen} anchorEl={chipRef.current} {...rest}>
        {!!title && (
          <Popover.Header>
            <Popover.Title children={title} />
          </Popover.Header>
        )}
        <Popover.Content className={className}>{children}</Popover.Content>
      </Popover>
      <Chip
        className={`status-popover-chip status-popover-chip-type__${type}`}
        ref={chipRef}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {icon}
      </Chip>
    </div>
  );
};
