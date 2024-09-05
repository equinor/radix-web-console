import { Chip, type ChipProps } from '@equinor/eds-core-react';
import { clsx } from 'clsx';
import type React from 'react';

import './style.css';

export type StatusBadgeTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusBadgeTemplateProps = {
  icon?: React.JSX.Element;
  type?: StatusBadgeTemplateType;
} & ChipProps;

/** StatusBadge template */
export function StatusBadgeTemplate({
  className,
  children,
  icon,
  type,
  ...rest
}: StatusBadgeTemplateProps) {
  return (
    <Chip
      className={clsx(
        'status-badge',
        `status-badge-type__${type ?? 'default'}`,
        { center: !icon },
        { [className]: !!className }
      )}
      {...rest}
    >
      {icon ?? <></>}
      <div className="status-badge-content">{children}</div>
    </Chip>
  );
}
