import { Chip, ChipProps } from '@equinor/eds-core-react';
import * as classNames from 'classnames';

import './style.css';

export type StatusBadgeTemplateType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'none'
  | 'default';

export type StatusBadgeTemplateProps = {
  icon?: JSX.Element;
  type?: StatusBadgeTemplateType;
} & ChipProps;

/** StatusBadge template */
export const StatusBadgeTemplate = ({
  className,
  children,
  icon,
  type,
  ...rest
}: StatusBadgeTemplateProps): JSX.Element => (
  <Chip
    className={classNames(
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
