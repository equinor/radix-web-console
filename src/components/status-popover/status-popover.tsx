import { Chip, Icon, Popover, PopoverProps } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import classNames from 'classnames';
import { ReactNode, useRef, useState } from 'react';

import './style.css';

export type StatusPopoverType = 'success' | 'warning' | 'danger' | 'none';

export interface StatusPopoverProps
  extends Pick<PopoverProps, 'children' | 'className' | 'placement'> {
  title?: ReactNode;
  type?: StatusPopoverType;
  icon?: ReactNode;
}

export const StatusPopover = ({
  children,
  className,
  title,
  type = 'none',
  icon = <Icon data={error_outlined} rotation={180} />,
  ...rest
}: StatusPopoverProps): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const chipRef = useRef<HTMLDivElement>();

  return (
    <div className={classNames('status-popover', { className: !!className })}>
      <Popover open={popoverOpen} anchorEl={chipRef.current} {...rest}>
        {!!title && (
          <Popover.Header>
            <Popover.Title children={title} />
          </Popover.Header>
        )}
        <Popover.Content children={children} />
      </Popover>
      <Chip
        className={`status-popover__chip status-popover__chip-type__${type}`}
        ref={chipRef}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {icon}
      </Chip>
    </div>
  );
};
