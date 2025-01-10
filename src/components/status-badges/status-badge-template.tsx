import { Chip, type ChipProps } from '@equinor/eds-core-react';
import { clsx } from 'clsx';

import './style.css';
import { type ForwardedRef, type PropsWithChildren, forwardRef } from 'react';

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
export const StatusBadgeTemplate = forwardRef(
  (
    {
      className,
      children,
      icon,
      type,
      ...rest
    }: PropsWithChildren<StatusBadgeTemplateProps>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Chip
        ref={ref}
        className={clsx(
          'status-badge',
          `status-badge-type__${type ?? 'default'}`,
          { center: !icon || !children },
          className ? { [className]: true } : undefined
        )}
        {...rest}
      >
        {icon ?? <></>}
        <div className="status-badge-content">{children}</div>
      </Chip>
    );
  }
);
