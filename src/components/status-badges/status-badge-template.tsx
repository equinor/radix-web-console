import { Chip, ChipProps } from '@equinor/eds-core-react';
import { clsx } from 'clsx';

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
export const StatusBadgeTemplate: (
  props: StatusBadgeTemplateProps
) => React.JSX.Element = ({ className, children, icon, type, ...rest }) => (
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
    {children ?? <></>}
  </Chip>
);
